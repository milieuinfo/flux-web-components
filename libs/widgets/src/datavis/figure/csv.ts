import { buildAxisTitle } from '../layout/axis-titles';
import { collectPositions } from '../layout/hover-positions';
import { toLocalDateTime } from '../layout/time-format';
import type { ChartModel } from '../models/chart.model';
import { findValueAt } from '../models/series';

const BYTE_ORDER_MARK = '\uFEFF'; // Excel leest eenheid zonder niet als UTF-8.

/** De data gemodelleerd als CSV (RFC 4180). */
export function buildCsv(model: ChartModel): string {
    const unit = model.meta.y.unit;
    const header = [
        buildAxisTitle(model.meta.x) ?? '',
        ...model.series.map((series) => (unit ? `${series.name} (${unit})` : series.name)),
    ].map(quoteCsvField);
    const rows = collectPositions(model).map((position) => [
        formatCsvPosition(model, position),
        ...model.series.map((series) => formatCsvValue(findValueAt(series, position))),
    ]);
    return BYTE_ORDER_MARK + [header, ...rows].map((fields) => fields.join(',')).join('\r\n');
}

function formatCsvPosition(model: ChartModel, position: number | string): string {
    if (typeof position === 'string') return quoteCsvField(position);
    return model.meta.x.type === 'time' ? toLocalDateTime(position) : String(position);
}

function formatCsvValue(value: number | null): string {
    if (value === null) return '';
    return String(value);
}

function quoteCsvField(text: string): string {
    return `"${text.replace(/"/g, '""')}"`;
}
