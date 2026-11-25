import { BaseLitElement, registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent, VlIconComponent, VlLinkComponent, VlTextComponent } from '@domg-wc/components/atom';
import { VlAlert, VlPopoverComponent } from '@domg-wc/components/block';
import { CSSResult, html, nothing, PropertyValues, TemplateResult } from 'lit';
import { ContextConsumer } from '@lit/context';
import { createDataChangeEvent } from '../events/data-change.event';
import { sourceContext } from '../source/source-context';
import {
    findModel,
    isOpenData,
    nameSource,
    type ChartModel,
    type ChartSource,
    type DataState,
} from '../models/chart.model';
import { metadataCatalogue } from '../models/metadata-catalogue';
import { classifyDataState } from '../models/classify-data-state';
import { findSourceWarnings } from '../models/validate-chart-model';
import { vlChartFluxStyles } from './vl-chart.flux-css';
import Plotly from 'plotly.js-basic-dist-min';
import type { Layout, PlotData } from 'plotly.js-basic-dist-min';
import { property, query, state } from 'lit/decorators.js';
import { chartDefaults, type ChartMargin } from './vl-chart.defaults';
import { buildPlotLayout } from './plot-layout';
import { readChartSpec, type ChartSpec } from './chart-spec';
import { buildPngWithFurniture, PNG_SCALE } from './png-export';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { buildAxisTitle } from '../layout/axis-titles';
import { findTooltipHalf } from '../layout/hover-positions';
import {
    describeOutOfRangeReferences,
    describeReference,
    findOutOfRangeArrow,
    placeReferences,
    type PlacedReferences,
} from '../layout/reference-lines';
import { ChartInteractionController } from './chart-interaction.controller';
import { ReferenceTagsController, REFERENCES_CHANGE } from './reference-tags.controller';
import { VlChartReference } from './vl-chart-reference.component';
import { categoricalPalette, type PaletteColor } from './vl-chart.palette';
import { labelSources, OPEN_DATA_LABEL, renderSourceRow } from './source-row';

registerWebComponents([
    VlAlert,
    VlButtonComponent,
    VlChartReference,
    VlIconComponent,
    VlLinkComponent,
    VlPopoverComponent,
    VlTextComponent,
]);

const LOADING_MESSAGE = 'Grafiek wordt geladen.';
const EMPTY_MESSAGE = 'Geen gegevens voor deze selectie.';
const ERROR_MESSAGE = 'Deze grafiek kan nu niet getoond worden.';
const CHART_ROLE_DESCRIPTION = 'grafiek';
const KEYBOARD_HINT = 'Gebruik de pijltjestoetsen links en rechts om de waarden te lezen.';
export const UNIT_INFO_LABEL = 'Uitleg bij de eenheid';
const REFERENCE_DESCRIPTION_LABELS = { one: 'Referentielijn', many: 'Referentielijnen' };
/** vl-popover zoekt zijn knop met `for` in het document: met meer grafieken op een pagina moet elk id uniek zijn. */
let unitInfoCount = 0;

/** Basisklasse voor elk grafiektype: toestand van de data, messages,
 * tooltip en tekenen (zie `#draw`) worden binnen deze klasse geregeld.
 * Een speficieke grafiektype (bv. VlChartLine) vult `buildTrace` in. */
export abstract class VlChart extends BaseLitElement {
    static get styles(): CSSResult[] {
        return [vlChartFluxStyles];
    }

    // --- properties
    @property({ attribute: false }) data?: ChartModel;

    // --- states and fields
    /** Begint op 'loading' tot er data wordt geladen of een error is. */
    @state() protected dataState: DataState = { status: 'loading' };
    @query('.plot') private plotElement!: HTMLDivElement;
    #drawnModel: ChartModel | null = null;
    #unitInfoId = `unit-info-${++unitInfoCount}`;
    #sourceState: DataState | null = null;
    #sourceWarnings = new Set<string>();
    #source = new ContextConsumer(this, { context: sourceContext, subscribe: true });
    #resizeObserver = new ResizeObserver(() => this.#draw());
    #referenceTags = new ReferenceTagsController(this);
    #interaction = new ChartInteractionController(this, {
        readModel: () => this.model,
        readPlotElement: () => this.plotElement,
        readSeriesColor: (seriesIndex) => this.seriesColor(seriesIndex),
    });

    connectedCallback(): void {
        super.connectedCallback();
        // Bij de eerste keer bestaat .plot pas na de eerste render.
        this.updateComplete.then(() => this.#resizeObserver.observe(this.plotElement));
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.#resizeObserver.disconnect();
        Plotly.purge(this.plotElement); // ruimt de listeners en het geheugen van Plotly op
        this.#drawnModel = null;
    }

    // Lit roept updated op vóór render:
    // https://lit.dev/docs/components/lifecycle/#willupdate
    protected willUpdate(changed: PropertyValues<this>): void {
        const sourceState = this.#source.value?.dataState;
        if (changed.has('data') && this.data) {
            this.#showDataState(classifyDataState(this.data));
        } else if (!this.data && sourceState && sourceState !== this.#sourceState) {
            // De bron heeft de toestand al bepaald (laden, fout, ...); de grafiek neemt ze over.
            this.#sourceState = sourceState;
            this.#showDataState(sourceState);
        }
    }

    #showDataState(dataState: DataState): void {
        // Een pijlfunctie: `metadataCatalogue.completeSourcesFromCache` los doorgeven verliest `this`.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#callbacks
        const shown = withSources(dataState, (sources) => metadataCatalogue.completeSourcesFromCache(sources));
        this.dataState = shown;
        this.#interaction.reset();
        const model = findModel(shown);
        if (!model?.meta.sources.some((source) => source.metadataId && !source.title)) return;
        metadataCatalogue.completeSources(model.meta.sources).then((sources) => {
            if (this.dataState === shown) this.dataState = withSources(shown, () => sources);
        });
    }

    protected get model(): ChartModel | null {
        return findModel(this.dataState);
    }

    protected get isReloading(): boolean {
        return this.dataState.status === 'loading' && this.#drawnModel !== null;
    }

    protected get shownModel(): ChartModel | null {
        return this.model ?? (this.isReloading ? this.#drawnModel : null);
    }

    // Lit roept updated op ná render: pas dan staat `.plot` in de DOM en kan Plotly erin tekenen.
    // https://lit.dev/docs/components/lifecycle/#updated
    protected updated(changed: PropertyValues): void {
        if (changed.has('dataState') || changed.has(REFERENCES_CHANGE)) this.#draw();
        if (changed.has('dataState')) {
            if (this.dataState.status === 'error') {
                console.warn(`<${this.localName}>: ${this.dataState.problems.join(' ')}`);
            }
            this.#warnAboutSources();
            this.dispatchEvent(createDataChangeEvent(this.dataState));
        }
    }

    render(): TemplateResult {
        return html`
            ${this.#renderStateMessage()} ${this.#renderUnit()} ${this.#renderReferenceNotes()} ${this.renderLegend()}
            <div class=${classMap({ 'plot-frame': true, 'is-reloading': this.isReloading })}>
                <div
                    class="plot"
                    ?hidden=${this.#isPlotHidden}
                    aria-busy=${this.isReloading ? 'true' : nothing}
                    tabindex=${this.model ? 0 : nothing}
                    role="group"
                    aria-roledescription=${CHART_ROLE_DESCRIPTION}
                    aria-label=${this.#plotLabel ?? nothing}
                    aria-describedby=${this.#referenceTags.references.length > 0
                        ? 'keyboard-hint references'
                        : 'keyboard-hint'}
                    @keydown=${this.#interaction.onKeydown}
                    @pointerdown=${this.#interaction.onPointerDown}
                    @pointerup=${this.#interaction.onPointerUp}
                    @blur=${this.#interaction.onBlur}
                ></div>
                ${this.#renderHover()}
            </div>
            <p id="keyboard-hint" hidden>${KEYBOARD_HINT}</p>
            ${this.#renderReferenceDescription()}
            <p class="visually-hidden" aria-live="polite">${this.#interaction.announcement}</p>
            ${renderSourceRow(this.shownModel?.meta)}
        `;
    }

    get #isPlotHidden(): boolean {
        return !this.model && !this.isReloading;
    }

    /** De schermlezer bestempelt de grafiek naar zijn waarden, bv.
     *  "Magnetische fluxdichtheid (µT)". */
    get #plotLabel(): string | undefined {
        return this.model ? buildAxisTitle(this.model.meta.y) : undefined;
    }

    #warnAboutSources(): void {
        const model = this.model;
        if (!model) return;
        for (const warning of findSourceWarnings(model)) {
            if (this.#sourceWarnings.has(warning)) continue;
            this.#sourceWarnings.add(warning);
            console.warn(`<${this.localName}>: ${warning}`);
        }
    }

    /** Rendert de eenheid en bijhorende eenheid informatieknop. */
    #renderUnit(): TemplateResult | typeof nothing {
        const model = this.shownModel;
        const unit = model && buildAxisTitle(model.meta.y);
        if (!unit) return nothing;
        const unitInfo = model.meta.y.unitInfo;
        if (!unitInfo) return html`<p class="unit">${unit}</p>`;
        return html`<div class="unit">
            <span>${unit}</span>
            <vl-button id=${this.#unitInfoId} icon="info-circle" ghost label=${UNIT_INFO_LABEL}></vl-button>
            <vl-popover for=${this.#unitInfoId} trigger="click" placement="bottom-start">
                <p class="unit-info">${unitInfo}</p>
            </vl-popover>
        </div>`;
    }

    /** De referentielijnen buiten het bereik van de waarde-as worden
     * als string boven de grafiek weergegeven.
     * @example ↑ EU-referentieniveau: 100 µT. */
    #renderReferenceNotes(): TemplateResult | typeof nothing {
        const model = this.shownModel;
        if (!model) return nothing;
        const { valueScale, outOfRange } = this.#placeReferences(model);
        if (outOfRange.length === 0) return nothing;
        return html`<ul class="reference-notes">
            ${outOfRange.map(
                (reference) =>
                    html`<li>
                        <span aria-hidden="true">${findOutOfRangeArrow(reference, valueScale)}</span>
                        ${describeReference(reference, model.meta.y.unit)}
                    </li>`,
            )}
        </ul>`;
    }

    #renderReferenceDescription(): TemplateResult | typeof nothing {
        const references = this.#referenceTags.references;
        if (references.length === 0) return nothing;
        const unit = this.shownModel?.meta.y.unit;
        const label = references.length === 1 ? REFERENCE_DESCRIPTION_LABELS.one : REFERENCE_DESCRIPTION_LABELS.many;
        const lines = references.map((reference) => describeReference(reference, unit));
        return html`<p id="references" hidden>${label}: ${lines.join('; ')}.</p>`;
    }

    /** Crosshair, stippen en tooltip, in HTML over de plot. */
    #renderHover(): TemplateResult | typeof nothing {
        const hover = this.#interaction.hover;
        if (!hover) return nothing;
        const { x, area } = hover;
        return html`<div class="hover" aria-hidden="true">
            <span
                class="crosshair"
                style=${styleMap({ left: `${x}px`, top: `${area.top}px`, height: `${area.height}px` })}
            ></span>
            ${hover.dots.map(
                (dot) =>
                    html`<span
                        class="hover-dot"
                        style=${styleMap({ left: `${x}px`, top: `${dot.y}px`, backgroundColor: dot.color })}
                    ></span>`,
            )}
            <div class="tooltip" style=${styleMap(hover.tooltipPosition)}>
                <p class="tooltip-title">
                    <strong>${hover.title}</strong>
                    ${hover.unit ? html`<span class="tooltip-unit">${hover.unit}</span>` : nothing}
                </p>
                <table>
                    ${hover.rows.map(
                        (row) =>
                            html`<tr class=${classMap({ 'no-value': row.value === null })}>
                                <td>
                                    <span
                                        class="swatch"
                                        style=${styleMap({ backgroundColor: this.seriesColor(row.seriesIndex) })}
                                    ></span
                                    >${row.name}
                                </td>
                                <td class="tooltip-value">${row.label}</td>
                            </tr>`,
                    )}
                </table>
            </div>
        </div>`;
    }

    #renderStateMessage(): TemplateResult | typeof nothing {
        switch (this.dataState.status) {
            case 'loading':
                return html`<div class="state-message" role="status">
                    ${this.isReloading ? nothing : html`<div class="skeleton" aria-hidden="true"></div>`}
                    <span class="visually-hidden">${LOADING_MESSAGE}</span>
                </div>`;
            case 'empty':
                return html`<div class="state-message"><vl-alert type="info">${EMPTY_MESSAGE}</vl-alert></div>`;
            case 'error':
                return html`<div class="state-message"><vl-alert type="error">${ERROR_MESSAGE}</vl-alert></div>`;
            default:
                return nothing;
        }
    }

    // --- export
    async buildPng(title = ''): Promise<Blob | null> {
        const model = this.model;
        if (!model) return null;
        const { clientWidth: width, clientHeight: height } = this.plotElement;
        const url = await Plotly.toImage(this.plotElement, { format: 'png', width, height, scale: PNG_SCALE });
        return buildPngWithFurniture(
            { url, width, height },
            {
                title,
                unit: buildAxisTitle(model.meta.y) ?? '',
                referenceNotes: describeOutOfRangeReferences(this.#placeReferences(model), model.meta.y.unit),
                sourceLabel: labelSources(model.meta.sources),
                sources: model.meta.sources.map((source) => ({
                    title: nameSource(source),
                    owner: source.owner,
                    metadataId: source.metadataId,
                })),
                openDataLabel: isOpenData(model.meta) ? OPEN_DATA_LABEL : '',
            },
            readChartSpec(this.plotElement),
        );
    }

    // --- hooks for chart types
    /** Een grafiektype zet een legende boven de grafiek zetten als er geen
     *  plaats is voor de labels. */
    protected renderLegend(): TemplateResult | typeof nothing {
        return nothing;
    }

    protected get plotWidth(): number {
        return this.plotElement.clientWidth;
    }

    /** Haalt de afmetingen van de plot op voor de layout wordt gerendert om
     *  te bepalen of er direct labels nodig zijn of een legende. */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected beforeLayout(_model: ChartModel, _spec: ChartSpec): void {}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected buildMargin(_model: ChartModel, _spec: ChartSpec): ChartMargin {
        return chartDefaults.margin;
    }

    /** Wat een grafiektype aan de layout toevoegt, bv. directe labels. */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected buildChartLayout(_model: ChartModel, _spec: ChartSpec): Partial<Layout> {
        return {};
    }

    /** De kleur voor de lijn en dot van reeks `seriesIndex`. */
    protected seriesColor(seriesIndex: number): string {
        return this.#paletteColorOf(seriesIndex).line;
    }

    /** De kleur van tekst over reeks `seriesIndex`, bv. het directe label. */
    protected seriesLabelColor(seriesIndex: number): string {
        return this.#paletteColorOf(seriesIndex).label;
    }

    /** Na laatste kleur begin het palette opnieuw. */
    #paletteColorOf(seriesIndex: number): PaletteColor {
        return categoricalPalette[seriesIndex % categoricalPalette.length];
    }

    /** De traces van dit type grafiek: lijnen, bars, area, ... */
    protected abstract buildTraces(model: ChartModel, spec: ChartSpec): Partial<PlotData>[];

    // --- drawing
    /** Tekent bij nieuwe data, nieuwe referenties en een andere maat. De
     *  volgorde is voor elk grafiektype dezelfde; de type grafiek bepaalt
     *  alleen de hooks. */
    #draw(): void {
        const model = this.model;
        if (!model) return;
        this.#drawnModel = model;
        const spec = readChartSpec(this.plotElement);
        this.beforeLayout(model, spec);
        const traces = this.buildTraces(model, spec);
        const { valueScale, inRange } = this.#placeReferences(model);
        const layout = buildPlotLayout({
            model,
            spec,
            valueScale,
            margin: this.buildMargin(model, spec),
            chartLayout: this.buildChartLayout(model, spec),
            references: inRange,
            size: { width: this.plotElement.clientWidth, height: this.plotElement.clientHeight },
        });
        this.#interaction.startNewDrawing(findTooltipHalf(model, valueScale.range));
        Plotly.react(this.plotElement, traces, layout, { displayModeBar: false }).then(() =>
            this.#interaction.bindToPlot(),
        );
    }

    #placeReferences(model: ChartModel): PlacedReferences {
        return placeReferences(model, this.#referenceTags.references);
    }
}

/** Vult bronnen van de data aan. */
function withSources(dataState: DataState, complete: (sources: ChartSource[]) => ChartSource[]): DataState {
    if (!('model' in dataState)) return dataState;
    const { model } = dataState;
    return { ...dataState, model: { ...model, meta: { ...model.meta, sources: complete(model.meta.sources) } } };
}
