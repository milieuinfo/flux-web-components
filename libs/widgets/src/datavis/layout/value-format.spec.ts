import type { ChartModel, ChartSeries } from '../models/chart.model';
import { buildValueFormat, countDecimalsInData, formatValue } from './value-format';

const buildSeries = (name: string, y: number[]): ChartSeries => ({
    name,
    x: Float64Array.from(y.map((_, i) => 2020 + i)),
    y: Float64Array.from(y),
});

const buildModel = (series: ChartSeries[]): ChartModel => ({
    meta: {
        sources: [{ title: 'Vlaamse Milieumaatschappij' }],
        x: { type: 'number', title: 'Jaar' },
        y: { type: 'number', unit: 'µg/m³' },
    },
    series,
});

describe('jest - widgets - countDecimalsInData', () => {
    it('should give 0 for whole numbers', () => {
        expect(countDecimalsInData(buildModel([buildSeries('Meetpunt Gent', [12, 15, 13])]))).toBe(0);
    });

    it('should take the most decimals of all series', () => {
        const model = buildModel([buildSeries('Meetpunt Gent', [12.5, 13]), buildSeries('Meetpunt Antwerpen', [0.25])]);

        expect(countDecimalsInData(model)).toBe(2);
    });

    it('should ignore rounding noise', () => {
        expect(countDecimalsInData(buildModel([buildSeries('Meetpunt Gent', [0.1 + 0.2])]))).toBe(1);
    });

    it('should ignore gaps', () => {
        expect(countDecimalsInData(buildModel([buildSeries('Meetpunt Gent', [12.5, NaN])]))).toBe(1);
    });

    it('should show at most 3 decimals', () => {
        expect(countDecimalsInData(buildModel([buildSeries('Meetpunt Gent', [Math.PI])]))).toBe(3);
    });
});

describe('jest - widgets - buildValueFormat', () => {
    it('should group thousands and fix the decimals', () => {
        expect(buildValueFormat(1)).toBe(',.1f');
    });
});

describe('jest - widgets - formatValue', () => {
    it('should use a decimal comma and a thousands dot', () => {
        expect(formatValue(1250.5, 1)).toBe('1.250,5');
    });

    it('should pad to the same number of decimals', () => {
        expect(formatValue(13, 1)).toBe('13,0');
    });

    it('should keep the unit on the same line as the number', () => {
        expect(formatValue(13, 1, 'µg/m³')).toBe('13,0\u00A0µg/m³');
    });
});
