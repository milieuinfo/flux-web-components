import type { ChartAxis, ChartMeta, ChartModel } from '../models/chart.model';

export interface ChartModelJson {
    meta: ChartMeta;
    series: { name: string; x: (number | string)[]; y: (number | null)[] }[];
}

/** Zet het antwoord van een bron om naar het ChartModel. */
export function parseChartModelJson(input: unknown): ChartModel {
    if (!isChartModelJson(input)) throw new Error('Het antwoord van de bron heeft niet de vorm { meta, series: [] }.');
    return {
        meta: input.meta,
        series: input.series.map((series) => ({
            name: series.name,
            x: parsePositions(input.meta.x, series.x),
            y: Float64Array.from(series.y, (value) => value ?? NaN),
        })),
    };
}

function isChartModelJson(input: unknown): input is ChartModelJson {
    const candidate = input as ChartModelJson | null;
    return typeof candidate?.meta?.x === 'object' && Array.isArray(candidate.series);
}

function parsePositions(axis: ChartAxis, values: (number | string)[]): Float64Array | string[] {
    if (axis.type === 'category') return values.map(String);
    if (axis.type === 'time') {
        return Float64Array.from(values, (value) => (typeof value === 'number' ? value : Date.parse(value)));
    }
    return Float64Array.from(values, Number);
}
