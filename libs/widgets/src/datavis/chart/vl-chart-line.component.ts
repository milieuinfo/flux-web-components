import { webComponent } from '@domg-wc/common';
import { html, nothing, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { Layout, PlotData } from 'plotly.js-basic-dist-min';
import type { ChartModel } from '../models/chart.model';
import {
    buildDirectLabels,
    buildDirectLabelText,
    DIRECT_LABEL_OFFSET,
    isTooWideForDirectLabels,
    LABEL_VALUE_WEIGHT,
} from '../layout/direct-labels';
import { buildLineTraces } from '../layout/line-traces';
import { countDecimalsInData } from '../layout/value-format';
import { measureTextWidth } from './measure-text';
import { VlChart } from './vl-chart.component';
import { chartDefaults, type ChartMargin } from './vl-chart.defaults';
import type { ChartSpec } from './chart-spec';

/**
 * Lijngrafiek met één lijn per reeks. Het label en de laatste waarde staan rechts aan het einde van de lijn. Een
 * vl-chart-reference in het element tekent een referentielijn.
 *
 * @fires vl-data-change - Bij elke nieuwe toestand van de data, met `detail: DataState`.
 */
@webComponent('vl-chart-line')
export class VlChartLine extends VlChart {
    // --- states and fields
    @state() private isLegendShown = false;

    protected buildTraces(model: ChartModel, spec: ChartSpec): Partial<PlotData>[] {
        const colors = model.series.map((_, index) => this.seriesColor(index));
        return buildLineTraces(model, colors, spec.backgroundColor);
    }

    protected beforeLayout(model: ChartModel, spec: ChartSpec): void {
        this.isLegendShown = this.#areDirectLabelsTooWide(model, spec);
    }

    #areDirectLabelsTooWide(model: ChartModel, spec: ChartSpec): boolean {
        const labelsWidth = DIRECT_LABEL_OFFSET + this.#measureWidestDirectLabel(model, spec);
        return isTooWideForDirectLabels(labelsWidth, this.plotWidth);
    }

    protected buildMargin(model: ChartModel, spec: ChartSpec): ChartMargin {
        if (this.isLegendShown) return chartDefaults.margin;
        const widest = Math.ceil(this.#measureWidestDirectLabel(model, spec));
        const right = DIRECT_LABEL_OFFSET + widest + chartDefaults.margin.right;
        return { ...chartDefaults.margin, right };
    }

    #measureWidestDirectLabel(model: ChartModel, spec: ChartSpec): number {
        const decimals = countDecimalsInData(model);
        const widths = model.series.map((series) => {
            const label = buildDirectLabelText(series, model.meta.x.type, decimals);
            if (!label) return 0;
            const nameWidth = measureTextWidth(`${label.name} `, spec);
            const valueWidth = measureTextWidth(label.value, spec, LABEL_VALUE_WEIGHT);
            return nameWidth + valueWidth;
        });
        return Math.max(0, ...widths);
    }

    protected buildChartLayout(model: ChartModel): Partial<Layout> {
        const labelColors = model.series.map((_, index) => this.seriesLabelColor(index));
        return {
            showlegend: false,
            annotations: this.isLegendShown ? [] : buildDirectLabels(model, labelColors, countDecimalsInData(model)),
        };
    }

    /** De legende wordt enkel gerenderd als de directe labels meer dan
     * een kwart van de breedte zouden innemen. */
    protected renderLegend(): TemplateResult | typeof nothing {
        const model = this.shownModel; // blijft staan tijdens herladen
        if (!this.isLegendShown || !model) return nothing;
        const decimals = countDecimalsInData(model);
        return html`<ul class="legend">
            ${model.series.map((series, index) => {
                const label = buildDirectLabelText(series, model.meta.x.type, decimals);
                return html`<li>
                    <span class="swatch" style=${styleMap({ backgroundColor: this.seriesColor(index) })}></span
                    >${series.name}${label ? html` <b>${label.value}</b>` : nothing}
                </li>`;
            })}
        </ul>`;
    }
}
