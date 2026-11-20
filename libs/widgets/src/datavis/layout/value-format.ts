import type { ChartModel } from '../models/chart.model';

const MAX_DECIMALS = 3;

export function removeFloatNoise(value: number): number {
    return Number(value.toPrecision(12));
}

/** Hoeveel cijfers na de komma één waarde heeft, bv. 0 voor 100 en 1 voor 0,4. Hoogstens MAX_DECIMALS. */
export function countDecimalsInValue(value: number): number {
    // Zonder ruis: 0.1 + 0.2 heeft anders 17 decimalen.
    const [, fraction = ''] = String(removeFloatNoise(value)).split('.');
    return Math.min(fraction.length, MAX_DECIMALS);
}

/** Cijfers na de komma: kiest het meeste van alle waarden,
 *  zodat 12,5 en 13 als 12,5 en 13,0 naast elkaar staan en kolommen
 *  in de tooltip uitlijnen.*/
export function countDecimalsInData(model: ChartModel): number {
    let decimals = 0;
    for (const series of model.series) {
        for (const value of series.y) {
            if (!Number.isNaN(value)) decimals = Math.max(decimals, countDecimalsInValue(value));
        }
    }
    return decimals;
}

export function buildValueFormat(decimals: number): string {
    return `,.${decimals}f`;
}

/** Tussen getal en eenheid: een harde spatie, zodat de waarde en eenheid
 *  niet over twee regels breken. */
export const UNIT_SEPARATOR = '\u00A0';

export function appendUnit(valueLabel: string, unit?: string): string {
    if (!unit) return valueLabel;
    return `${valueLabel}${UNIT_SEPARATOR}${unit}`;
}

export function formatValue(value: number, decimals: number, unit?: string): string {
    const number = new Intl.NumberFormat('nl-BE', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(value);
    return appendUnit(number, unit);
}
