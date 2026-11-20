import type { ChartAxis, ChartSeries } from './chart.model';

// Vragen aan één reeks, op één plek om dezelfde data te leveren aan tabel, CSV,
// tooltip en directe labels.

export function findValueAt(series: ChartSeries, position: number | string): number | null {
    // `indexOf` van een gewone array, omdat `x` ook een Float64Array kan zijn die geen tekst kent.
    const index = Array.prototype.indexOf.call(series.x, position);
    if (index === -1) return null;
    const value = series.y[index];
    if (Number.isNaN(value)) return null;
    return value;
}

export function findLastDataPointIndex(series: ChartSeries, xAxisType: ChartAxis['type']): number {
    let lastIndex = -1;
    for (let index = 0; index < series.y.length; index++) {
        if (Number.isNaN(series.y[index])) continue;
        const isFirstDataPoint = lastIndex === -1;
        // Categorieën staan op de as in de volgorde van de data: een later datapunt staat ook verder.
        const isFurtherOnAxis = xAxisType === 'category' || Number(series.x[index]) > Number(series.x[lastIndex]);
        if (isFirstDataPoint || isFurtherOnAxis) lastIndex = index;
    }
    return lastIndex;
}
