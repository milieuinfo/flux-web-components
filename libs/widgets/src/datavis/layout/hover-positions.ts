import type { ChartModel } from '../models/chart.model';
import { findValueAt } from '../models/series';
import { formatPosition, toLocalDateTime, type Position } from './time-format';
import { formatValue } from './value-format';

const NO_VALUE_LABEL = 'geen gegevens';

export type { Position };

/** Alle x-waarden van de grafiek */
export function collectPositions(model: ChartModel): Position[] {
    const positions = new Set<Position>();
    for (const series of model.series) {
        for (const x of series.x) positions.add(x);
    }
    const ordered = [...positions];
    return model.meta.x.type === 'category' ? ordered : ordered.sort((a, b) => Number(a) - Number(b));
}

export function toPlotlyPosition(model: ChartModel, position: Position): number | string {
    return model.meta.x.type === 'time' && typeof position === 'number' ? toLocalDateTime(position) : position;
}

export type HoverRow = { seriesIndex: number; name: string; value: number | null; label: string };
export type HoverSummary = { title: string; unit?: string; rows: HoverRow[] };

/** De tooltip. */
export function buildHoverSummary(model: ChartModel, position: Position, decimals: number): HoverSummary {
    const rows = model.series.map((series, seriesIndex): HoverRow => {
        const value = findValueAt(series, position);
        return {
            seriesIndex,
            name: series.name,
            value,
            label: value === null ? NO_VALUE_LABEL : formatValue(value, decimals),
        };
    });
    // Een onderbreking telt als lager dan elke waarde; twee onderbrekingen blijven in hun volgorde (-Infinity - -Infinity is NaN).
    rows.sort((a, b) => (a.value === b.value ? 0 : (b.value ?? -Infinity) - (a.value ?? -Infinity)));
    return { title: formatPosition(model.meta.x, position), unit: model.meta.y.unit, rows };
}

/** Tooltip voor screenreaders */
export function describePosition(model: ChartModel, position: Position, decimals: number): string {
    const unit = model.meta.y.unit;
    const values = model.series.map((series) => {
        const value = findValueAt(series, position);
        const valueText = value === null ? NO_VALUE_LABEL : formatValue(value, decimals, unit);
        return `${series.name} ${valueText}`;
    });
    return `${formatPosition(model.meta.x, position)}: ${values.join(', ')}`;
}

export function findNearestPositionIndex(pixelXs: readonly number[], x: number): number {
    let nearest = { index: -1, distance: Infinity };
    pixelXs.forEach((pixelX, index) => {
        const distance = Math.abs(pixelX - x);
        if (distance < nearest.distance) nearest = { index, distance };
    });
    return nearest.index;
}

/** Rekent waar het minste punten staan op de grafiek.
 *  daar wordt de tooltip uiteindelijk getekend om zo weinig mogelijk andere
 *  lijnen en punten te bedekken. */
export function findTooltipHalf(model: ChartModel, valueRange: readonly [number, number]): 'top' | 'bottom' {
    const middle = (valueRange[0] + valueRange[1]) / 2;
    let upper = 0;
    let lower = 0;
    for (const series of model.series) {
        for (const value of series.y) {
            if (Number.isNaN(value)) continue;
            if (value > middle) upper += 1;
            else lower += 1;
        }
    }
    return upper > lower ? 'bottom' : 'top';
}
