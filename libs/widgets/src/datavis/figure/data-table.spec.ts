import type { ChartModel, ChartSeries } from '../models/chart.model';
import { buildDataTable } from './data-table';

const buildSeries = (name: string, x: number[], y: number[]): ChartSeries => ({
    name,
    x: Float64Array.from(x),
    y: Float64Array.from(y),
});

const buildModel = (series: ChartSeries[]): ChartModel => ({
    meta: {
        sources: [{ title: 'Vlaamse Milieumaatschappij' }],
        x: { type: 'number', title: 'Jaar' },
        y: { type: 'number', title: 'Concentratie', unit: 'µg/m³' },
    },
    series,
});

describe('jest - widgets - buildDataTable', () => {
    it('should give one row per x and one column per series', () => {
        const table = buildDataTable(
            buildModel([
                buildSeries('Meetpunt Gent', [2020, 2021], [12.5, 13]),
                buildSeries('Meetpunt Antwerpen', [2020, 2021], [15.2, 14.7]),
            ]),
        );

        expect(table.rowHeaderTitle).toBe('Jaar');
        expect(table.columns).toEqual(['Meetpunt Gent', 'Meetpunt Antwerpen']);
        expect(table.rows).toEqual([
            { header: '2020', cells: ['12,5', '15,2'] },
            { header: '2021', cells: ['13,0', '14,7'] },
        ]);
    });

    it('should name what the values are, with their unit', () => {
        const table = buildDataTable(buildModel([buildSeries('Meetpunt Gent', [2020], [12.5])]));

        expect(table.caption).toBe('Concentratie (µg/m³)');
    });

    it('should fall back to a general caption without title and unit', () => {
        const model = buildModel([buildSeries('Meetpunt Gent', [2020], [12.5])]);
        model.meta.y = { type: 'number' };

        expect(buildDataTable(model).caption).toBe('Cijfers bij de grafiek');
    });

    it('should leave a cell empty for a gap or a missing x', () => {
        const table = buildDataTable(
            buildModel([
                buildSeries('Meetpunt Gent', [2020, 2021], [12.5, NaN]),
                buildSeries('Meetpunt Antwerpen', [2020], [15.2]),
            ]),
        );

        expect(table.rows[1]).toEqual({ header: '2021', cells: ['', ''] });
        expect(table.hasGaps).toBe(true);
    });

    it('should report no gaps for complete data', () => {
        const table = buildDataTable(buildModel([buildSeries('Meetpunt Gent', [2020, 2021], [12.5, 13])]));

        expect(table.hasGaps).toBe(false);
    });
});
