import { BaseLitElement, registerWebComponents, webComponent } from '@domg-wc/common';
import { VlTextComponent, VlTitleComponent } from '@domg-wc/components/atom';
import { ContextProvider } from '@lit/context';
import { CSSResult, html, nothing, PropertyValues, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { VlChart } from '../chart/vl-chart.component';
import { DATA_CHANGE_EVENT } from '../events/data-change.event';
import { findModel } from '../models/chart.model';
import { VlDataControls } from './vl-data-controls.component';
import { VlDataDownload } from './vl-data-download.component';
import { VlDataFullscreen } from './vl-data-fullscreen.component';
import { hasAboutDetails } from './about-data';
import { VlDataAbout } from './vl-data-about.component';
import { VlDataReadingGuide } from './vl-data-reading-guide.component';
import { figureContext, type FigureState } from './figure-context';
import { VlDataTable } from './vl-data-table.component';
import { dataFigureDefaults } from './vl-data-figure.defaults';
import { vlDataFigureFluxStyles } from './vl-data-figure.flux-css';

registerWebComponents([
    VlDataAbout,
    VlDataControls,
    VlDataDownload,
    VlDataFullscreen,
    VlDataReadingGuide,
    VlDataTable,
    VlTextComponent,
    VlTitleComponent,
]);

/**
 * Zet rond één grafiek een kop, controls, een tabel en uitleg, altijd in dezelfde volgorde. De onderdelen lezen de
 * toestand van de grafiek via `figureContext`.
 *
 * @slot - Plaats hier de grafiek, bv. vl-chart-line.
 * @slot controls - Extra controls naast de kop. Een vl-data-controls komt hier vanzelf en vervangt de standaardknoppen.
 * @slot filters - Wat bepaalt welke data de grafiek toont. Een vl-data-period komt hier vanzelf.
 * @slot explanations - Uitleg onder de grafiek. vl-data-table, vl-data-reading-guide en vl-data-about komen hier vanzelf.
 */
@webComponent('vl-data-figure')
export class VlDataFigure extends BaseLitElement {
    static get styles(): CSSResult[] {
        return [vlDataFigureFluxStyles];
    }

    // --- attributes
    @property() headline = dataFigureDefaults.headline;
    @property({ attribute: 'headline-level' }) headlineLevel = dataFigureDefaults.headlineLevel;
    @property() subtitle = dataFigureDefaults.subtitle;

    // --- states and fields
    @state() private hasOwnControls = false;
    @state() private hasOwnTable = false;
    @state() private hasOwnAbout = false;
    #provider = new ContextProvider(this, {
        context: figureContext,
        initialValue: {
            dataState: { status: 'loading' },
            visual: null,
            headline: '',
            element: this,
            isFullscreen: false,
        },
    });
    #onFullscreenChange = () => this.#shareFigureState({ isFullscreen: document.fullscreenElement === this });

    constructor() {
        super();
        // De visual meldt elke toestand; de figuur geeft ze door aan wie de context leest.
        this.addEventListener(DATA_CHANGE_EVENT, (event) => {
            this.#shareFigureState({ dataState: event.detail, visual: event.target as VlChart });
            this.requestUpdate(); // of "Over deze data" er standaard staat, hangt af van de data
        });
    }

    connectedCallback(): void {
        super.connectedCallback();
        document.addEventListener('fullscreenchange', this.#onFullscreenChange);
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        document.removeEventListener('fullscreenchange', this.#onFullscreenChange);
    }

    protected updated(changed: PropertyValues<this>): void {
        if (changed.has('headline')) this.#shareFigureState({ headline: this.headline.replace(/\s+/g, ' ').trim() });
    }

    render(): TemplateResult {
        return html`<figure>
            <div class="header">
                ${this.#renderCaption()}
                <div class="controls">
                    <slot name="controls" @slotchange=${this.#onContentChange}></slot>
                    ${this.hasOwnControls ? nothing : this.#renderDefaultControls()}
                </div>
            </div>
            <slot name="filters"></slot>
            <slot @slotchange=${this.#onContentChange}></slot>
            <div class="explanations">
                ${this.hasOwnTable ? nothing : html`<vl-data-table></vl-data-table>`}
                <slot name="explanations" @slotchange=${this.#onContentChange}></slot>
                ${this.#showsDefaultAbout ? html`<vl-data-about></vl-data-about>` : nothing}
            </div>
        </figure>`;
    }

    #renderCaption(): TemplateResult | typeof nothing {
        if (!this.headline && !this.subtitle) return nothing;
        return html`<figcaption>
            ${this.headline
                ? html`<vl-title class="headline" type=${this.headlineLevel} appearance="h3" no-space-bottom
                      >${this.headline}</vl-title
                  >`
                : nothing}
            ${this.subtitle ? html`<vl-text class="subtitle" annotation>${this.subtitle}</vl-text>` : nothing}
        </figcaption>`;
    }

    get #showsDefaultAbout(): boolean {
        const model = findModel(this.#provider.value.dataState);
        return !this.hasOwnAbout && model !== null && hasAboutDetails(model.meta);
    }

    #renderDefaultControls(): TemplateResult {
        return html`<vl-data-controls>
            <vl-data-download format="png"></vl-data-download>
            <vl-data-fullscreen></vl-data-fullscreen>
        </vl-data-controls>`;
    }

    #shareFigureState(update: Partial<FigureState>): void {
        this.#provider.setValue({ ...this.#provider.value, ...update });
    }

    #onContentChange(): void {
        this.hasOwnControls = this.querySelector(':scope > vl-data-controls') !== null;
        this.hasOwnTable = this.querySelector(':scope > vl-data-table') !== null;
        this.hasOwnAbout = this.querySelector(':scope > vl-data-about') !== null;
    }
}
