import type { Shape } from 'plotly.js-basic-dist-min';
import type { ChartModel } from '../models/chart.model';
import { removeFloatNoise } from './value-format';

/** Maximum stappen tussen de rasterlijnen. */
const MAX_TICK_STEPS = 6;
/** Afgeronde stappen: 1, 2 of 5 maal een macht van 10. */
const NICE_FACTORS = [1, 2, 5, 10];

/** Het bereik en de stap tussen de rasterlijnen van de waarde-as. */
export type ValueScale = { range: [number, number]; step: number };

/** De kleinste afgeronde stap waarmee  bereik in MAX_TICK_STEPS stappen
 *  past. */
function findNiceScale(lowest: number, highest: number): ValueScale {
    const powerOfTen = 10 ** Math.floor(Math.log10((highest - lowest) / MAX_TICK_STEPS));
    for (const factor of NICE_FACTORS) {
        const step = removeFloatNoise(factor * powerOfTen);
        const range: [number, number] = [
            removeFloatNoise(Math.floor(lowest / step) * step),
            removeFloatNoise(Math.ceil(highest / step) * step),
        ];
        if (Math.round((range[1] - range[0]) / step) <= MAX_TICK_STEPS) return { range, step };
    }
    const step = 10 * powerOfTen;
    return { range: [Math.floor(lowest / step) * step, Math.ceil(highest / step) * step], step };
}

/** Waarde-as: altijd met 0 waarde weergegeven.
 *  De uiteinden worden afgerond naar een ronde stap (zoals in d3 `.nice()`)  */
export function buildValueScale(model: ChartModel, extraValues: readonly number[] = []): ValueScale {
    let lowest = 0;
    let highest = 0;
    for (const value of [...extraValues, ...model.series.flatMap((series) => Array.from(series.y))]) {
        if (Number.isNaN(value)) continue;
        lowest = Math.min(lowest, value);
        highest = Math.max(highest, value);
    }
    if (lowest === highest) return { range: [lowest, highest], step: 1 }; // alles 0: niets om af te ronden
    return findNiceScale(lowest, highest);
}

/** Positie-as: van de eerste tot de laatste x. Categorieën (tekst) hebben geen bereik; die laat Plotly zelf staan. */
export function buildPositionRange(model: ChartModel): [number, number] | undefined {
    const numericPositions = model.series.flatMap((series) =>
        series.x instanceof Float64Array ? Array.from(series.x) : [],
    );
    return numericPositions.length > 0 ? [Math.min(...numericPositions), Math.max(...numericPositions)] : undefined;
}

/** De stap tussen de ticks van een getallenas met alleen gehele posities. */
export function buildPositionStep(model: ChartModel): number | undefined {
    if (model.meta.x.type !== 'number') return undefined;
    const range = buildPositionRange(model);
    const positions = model.series.flatMap((series) => Array.from(series.x as Float64Array));
    if (!range || !positions.every(Number.isInteger)) return undefined;
    const span = range[1] - range[0];
    if (span === 0) return 1;
    const powerOfTen = 10 ** Math.max(0, Math.floor(Math.log10(span / MAX_TICK_STEPS)));
    for (const factor of NICE_FACTORS) {
        if (span / (factor * powerOfTen) <= MAX_TICK_STEPS) return factor * powerOfTen;
    }
    return 10 * powerOfTen;
}

/** De rasterlijnen op de rand van de waarde-as. */
export function buildEdgeGridLines(range: readonly [number, number], color: string): Partial<Shape>[] {
    return range
        .filter((value) => value !== 0)
        .map((value) => ({
            type: 'line',
            layer: 'below',
            xref: 'paper',
            x0: 0,
            x1: 1,
            yref: 'y',
            y0: value,
            y1: value,
            line: { color, width: 1 },
        }));
}
