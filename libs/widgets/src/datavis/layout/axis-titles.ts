import type { ChartAxis } from '../models/chart.model';

/** Titel van een as: naam en eenheid samen, bv. "Concentratie (µg/m³)". */
export function buildAxisTitle(axis: ChartAxis): string | undefined {
    if (axis.title && axis.unit) return `${axis.title} (${axis.unit})`;
    return axis.title || axis.unit || undefined;
}
