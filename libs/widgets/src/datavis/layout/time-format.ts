import type { LayoutAxis } from 'plotly.js-basic-dist-min';
import type { ChartAxis } from '../models/chart.model';

/** Een x-waarde: een getal (op een tijdas: milliseconden sinds 1970) of een categorie. */
export type Position = number | string;

const padToTwoDigits = (value: number) => String(value).padStart(2, '0');

/** Lokale tijd als YYYY-MM-DD HH:MM:SS. */
export function toLocalDateTime(milliseconds: number): string {
    const date = new Date(milliseconds);
    const day = `${date.getFullYear()}-${padToTwoDigits(date.getMonth() + 1)}-${padToTwoDigits(date.getDate())}`;
    return `${day} ${padToTwoDigits(date.getHours())}:${padToTwoDigits(date.getMinutes())}:${padToTwoDigits(date.getSeconds())}`;
}

export function formatPosition(axis: ChartAxis, position: Position): string {
    if (axis.type !== 'time' || typeof position !== 'number') return String(position);
    const date = new Date(position);
    const day = `${padToTwoDigits(date.getDate())}/${padToTwoDigits(date.getMonth() + 1)}/${date.getFullYear()}`;
    return `${day} ${padToTwoDigits(date.getHours())}:${padToTwoDigits(date.getMinutes())}`;
}

export function toPlotlyX(axis: ChartAxis, values: Float64Array | string[]): (number | string)[] {
    if (axis.type === 'time' && values instanceof Float64Array) return Array.from(values, toLocalDateTime);
    return Array.from<number | string>(values);
}

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export const timeAxis: Partial<LayoutAxis> = {
    type: 'date',
    hoverformat: '%d/%m/%Y %H:%M',
    // Plotly neemt de eerste stop waar de afstand tussen de ticks in valt, grenzen inbegrepen: ticks per dag horen
    // bij de dagen, dus de uren stoppen net onder een dag.
    tickformatstops: [
        { dtickrange: [null, DAY_IN_MS - 1], value: '%H:%M' },
        { dtickrange: [DAY_IN_MS, 'M1'], value: '%d/%m' },
        { dtickrange: ['M1', null], value: '%m/%Y' },
    ],
};
