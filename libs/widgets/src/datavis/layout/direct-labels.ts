import type { Annotations } from 'plotly.js-basic-dist-min';
import type { ChartAxis, ChartModel, ChartSeries } from '../models/chart.model';
import { findLastDataPointIndex } from '../models/series';
import { formatValue } from './value-format';

/** Witruimte tussen einde van de inner chart en het label in pixels. */
export const DIRECT_LABEL_OFFSET = 12;
/** De laatste waarde in elk label wordt bold weergegeven. */
export const LABEL_VALUE_WEIGHT = 700;

/** De waarde van het laatste datapunt op de as; daar, aan het einde van de lijn, hoort het label van de reeks. */
export function findLastValue(series: ChartSeries, xAxisType: ChartAxis['type']): number | undefined {
    const index = findLastDataPointIndex(series, xAxisType);
    if (index === -1) return undefined;
    return series.y[index];
}

export type DirectLabelText = { name: string; value: string; lastValue: number };

/** De max hoeveelheid breedte de direct label mogen innemen.
 * Op een smal; scherm (of bij zeer lange label namen) verdwijnt het label
 * en komt er een legende boven de grafiek. */
export const MAX_LABEL_SHARE = 0.25;

export function isTooWideForDirectLabels(labelWidth: number, plotWidth: number): boolean {
    return labelWidth > plotWidth * MAX_LABEL_SHARE;
}

export function buildDirectLabelText(
    series: ChartSeries,
    xAxisType: ChartAxis['type'],
    decimals: number,
): DirectLabelText | undefined {
    const lastValue = findLastValue(series, xAxisType);
    if (lastValue === undefined) return undefined;
    return { name: series.name, value: formatValue(lastValue, decimals), lastValue };
}

/** Plotly leest de tekst van een annotatie als HTML; een naam als "A<B" kan
 *  geen tag worden. */
function escapeLabelText(text: string): string {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function buildDirectLabels(
    model: ChartModel,
    labelColors: readonly string[],
    decimals: number,
): Partial<Annotations>[] {
    return model.series.flatMap((series, index): Partial<Annotations>[] => {
        const label = buildDirectLabelText(series, model.meta.x.type, decimals);
        if (!label) return []; // alleen onderbrekingen: geen label
        return [
            {
                xref: 'paper',
                x: 1,
                y: label.lastValue,
                text: `${escapeLabelText(label.name)} <b>${label.value}</b>`,
                showarrow: false,
                xanchor: 'left',
                // Links in het vak: Plotly centreert anders binnen een breedte die het na een wissel van vet naar
                // normaal niet altijd opnieuw meet, en dan staan de labels niet meer onder elkaar.
                align: 'left',
                xshift: DIRECT_LABEL_OFFSET,
                font: { color: labelColors[index % labelColors.length] },
            },
        ];
    });
}
