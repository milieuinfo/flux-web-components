import type { ChartModel, ChartSeries } from '../models/chart.model';
import { buildEdgeGridLines, buildPositionRange, buildPositionStep, buildValueScale } from './axis-ranges';

const buildValueRange = (model: ChartModel) => buildValueScale(model).range;

const buildSeries = (name: string, y: number[], x: number[] = [2020, 2021, 2022]): ChartSeries => ({
    name,
    x: Float64Array.from(x),
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

describe('jest - widgets - buildValueScale', () => {
    it('should start at 0 and round the highest value up to a round step', () => {
        expect(buildValueRange(buildModel([buildSeries('Meetpunt Gent', [12.5, 15.2, 12.8])]))).toEqual([0, 20]);
    });

    it('should leave a value that is already on a round step', () => {
        expect(buildValueRange(buildModel([buildSeries('Meetpunt Gent', [5, 10, 8])]))).toEqual([0, 10]);
    });

    it('should end at 0 and round the lowest value down when all values are negative', () => {
        expect(buildValueRange(buildModel([buildSeries('Meetpunt Gent', [-0.3, -0.13, -0.2])]))).toEqual([-0.3, 0]);
    });

    it('should round both ends when values are on both sides of 0', () => {
        expect(buildValueRange(buildModel([buildSeries('Meetpunt Gent', [-3.2, 4.1, 7.6])]))).toEqual([-4, 8]);
    });

    it('should round large values to a large step', () => {
        expect(buildValueRange(buildModel([buildSeries('Obscurionweg 91', [125000.5, 131000.25])]))).toEqual([
            0, 150000,
        ]);
    });

    it('should take all series into account', () => {
        const model = buildModel([
            buildSeries('Meetpunt Gent', [3, 4, 5]),
            buildSeries('Meetpunt Antwerpen', [6, 9.1, 7]),
        ]);

        expect(buildValueRange(model)).toEqual([0, 10]);
    });

    it('should skip gaps', () => {
        expect(buildValueRange(buildModel([buildSeries('Meetpunt Gent', [NaN, 3.4, NaN])]))).toEqual([0, 4]);
    });

    it('should keep at most six steps between the grid lines', () => {
        expect(buildValueScale(buildModel([buildSeries('Meetpunt Gent', [12.5, 15.2, 12.8])]))).toEqual({
            range: [0, 20],
            step: 5,
        });
        expect(buildValueScale(buildModel([buildSeries('Meetpunt Gent', [0.28, 0.45, 0.31])]))).toEqual({
            range: [0, 0.5],
            step: 0.1,
        });
    });

    it('should give [0, 0] when all values are 0', () => {
        expect(buildValueRange(buildModel([buildSeries('Meetpunt Gent', [0, 0, 0])]))).toEqual([0, 0]);
    });
});

describe('jest - widgets - buildPositionRange', () => {
    it('should run from the first to the last x value over all series', () => {
        const model = buildModel([
            buildSeries('Meetpunt Gent', [1, 2], [2019, 2021]),
            buildSeries('Meetpunt Antwerpen', [1, 2], [2020, 2023]),
        ]);

        expect(buildPositionRange(model)).toEqual([2019, 2023]);
    });

    it('should give no range for categories', () => {
        const model = buildModel([{ name: 'Meetpunt Gent', x: ['a', 'b'], y: Float64Array.from([1, 2]) }]);

        expect(buildPositionRange(model)).toBeUndefined();
    });
});

describe('jest - widgets - buildEdgeGridLines', () => {
    it('should draw a line on the top edge but not on 0, where the zero line is', () => {
        expect(buildEdgeGridLines([0, 20], '#ccc').map((line) => line.y0)).toEqual([20]);
    });

    it('should draw both edges when the values go below 0', () => {
        expect(buildEdgeGridLines([-10, 20], '#ccc').map((line) => line.y0)).toEqual([-10, 20]);
    });

    it('should draw only the bottom edge when the values stay below 0', () => {
        expect(buildEdgeGridLines([-10, 0], '#ccc').map((line) => line.y0)).toEqual([-10]);
    });
});

describe('jest - widgets - buildPositionStep', () => {
    const years = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i);
    const modelOver = (x: number[]) =>
        buildModel([
            buildSeries(
                'Meetpunt Gent',
                x.map(() => 1),
                x,
            ),
        ]);

    it('should step a whole year for a few years, never half a year', () => {
        expect(buildPositionStep(modelOver([2020, 2021, 2022]))).toBe(1);
        expect(buildPositionStep(modelOver(years(2018, 2024)))).toBe(1);
    });

    it('should take a round number of years for a long span', () => {
        expect(buildPositionStep(modelOver(years(2010, 2024)))).toBe(5);
        expect(buildPositionStep(modelOver(years(1950, 2024)))).toBe(20);
    });

    it('should step 1 for a single position', () => {
        expect(buildPositionStep(modelOver([2024]))).toBe(1);
    });

    it('should leave positions that are not whole numbers to Plotly', () => {
        expect(buildPositionStep(modelOver([0.5, 1, 1.5]))).toBeUndefined();
    });

    it('should leave time and categories alone', () => {
        const time = modelOver([Date.parse('2026-01-01'), Date.parse('2026-01-02')]);
        time.meta.x = { type: 'time' };

        expect(buildPositionStep(time)).toBeUndefined();
    });
});
