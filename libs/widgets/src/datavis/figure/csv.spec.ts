import type { ChartModel, ChartSeries } from '../models/chart.model';
import { buildCsv } from './csv';

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

const lines = (csv: string) => csv.replace(/^\uFEFF/, '').split('\r\n');

describe('jest - widgets - buildCsv', () => {
    it('should start with a byte order mark for Excel', () => {
        expect(buildCsv(buildModel([buildSeries('Meetpunt Gent', [2020], [12.5])])).startsWith('\uFEFF')).toBe(true);
    });

    it('should give one row per x and one column per series, with the unit in the header', () => {
        const csv = buildCsv(
            buildModel([
                buildSeries('Meetpunt Gent', [2020, 2021], [12.5, 13]),
                buildSeries('Meetpunt Antwerpen', [2020, 2021], [15.2, 14.7]),
            ]),
        );

        expect(lines(csv)).toEqual([
            '"Jaar","Meetpunt Gent (µg/m³)","Meetpunt Antwerpen (µg/m³)"',
            '2020,12.5,15.2',
            '2021,13,14.7',
        ]);
    });

    it('should leave a cell empty for a gap', () => {
        const csv = buildCsv(buildModel([buildSeries('Meetpunt Gent', [2020, 2021], [12.5, NaN])]));

        expect(lines(csv)[2]).toBe('2021,');
    });

    it('should escape quotes in names', () => {
        const csv = buildCsv(buildModel([buildSeries('Meetpunt "De Haan"', [2020], [1])]));

        expect(lines(csv)[0]).toContain('"Meetpunt ""De Haan"" (µg/m³)"');
    });

    it('should quote categories', () => {
        const model = buildModel([{ name: 'Neerslag', x: ['Gent, centrum'], y: Float64Array.from([800]) }]);
        model.meta.x = { type: 'category', title: 'Gemeente' };

        expect(lines(buildCsv(model))[1]).toBe('"Gent, centrum",800');
    });
});
