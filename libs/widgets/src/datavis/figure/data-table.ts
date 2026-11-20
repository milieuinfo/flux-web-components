import { buildAxisTitle } from '../layout/axis-titles';
import { collectPositions } from '../layout/hover-positions';
import { formatPosition } from '../layout/time-format';
import { countDecimalsInData, formatValue } from '../layout/value-format';
import type { ChartModel } from '../models/chart.model';
import { findValueAt } from '../models/series';

export interface DataTable {
    /** het Caption van de tabel: Wat de waarden zijn, de eenheid, ... */
    caption: string;
    rowHeaderTitle: string;
    columns: string[];
    rows: { header: string; cells: string[] }[];
    hasGaps: boolean;
}

const FALLBACK_CAPTION = 'Cijfers bij de grafiek';
const GAP_CELL = '';

export function buildDataTable(model: ChartModel): DataTable {
    const decimals = countDecimalsInData(model);
    const rows = collectPositions(model).map((position) => ({
        header: formatPosition(model.meta.x, position),
        cells: model.series.map((series) => formatTableValue(findValueAt(series, position), decimals)),
    }));
    // Achteraf afgeleid uit de rijen, niet bijgehouden tijdens het opbouwen: dan kunnen ze niet uit elkaar lopen.
    const hasGaps = rows.some((row) => row.cells.includes(GAP_CELL));
    return {
        caption: buildAxisTitle(model.meta.y) ?? FALLBACK_CAPTION,
        rowHeaderTitle: buildAxisTitle(model.meta.x) ?? '',
        columns: model.series.map((series) => series.name),
        rows,
        hasGaps,
    };
}

function formatTableValue(value: number | null, decimals: number): string {
    if (value === null) return GAP_CELL;
    return formatValue(value, decimals);
}
