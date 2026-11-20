import type { ChartSeries } from './chart.model';
import { findLastDataPointIndex, findValueAt } from './series';

const buildSeries = (x: number[] | string[], y: number[]): ChartSeries => ({
    name: 'Meetpunt Gent',
    x: typeof x[0] === 'string' ? (x as string[]) : Float64Array.from(x as number[]),
    y: Float64Array.from(y),
});

describe('jest - widgets - findValueAt', () => {
    it('should give the value at that x', () => {
        expect(findValueAt(buildSeries([2020, 2021, 2022], [12.5, 13.1, 12.8]), 2021)).toBe(13.1);
    });

    it('should give the value at a category', () => {
        expect(findValueAt(buildSeries(['Gent', 'Aalst'], [4, 7]), 'Aalst')).toBe(7);
    });

    it('should give null for a gap', () => {
        expect(findValueAt(buildSeries([2020, 2021, 2022], [12.5, NaN, 12.8]), 2021)).toBeNull();
    });

    it('should give null for an x the series does not have', () => {
        expect(findValueAt(buildSeries([2020, 2021, 2022], [12.5, 13.1, 12.8]), 2019)).toBeNull();
    });
});

describe('jest - widgets - findLastDataPointIndex', () => {
    it('should give the largest x on a number or time axis, also when x is not sorted', () => {
        expect(findLastDataPointIndex(buildSeries([2022, 2020, 2021], [12.8, 12.5, 13.1]), 'number')).toBe(0);
    });

    it('should skip a gap at the end', () => {
        expect(findLastDataPointIndex(buildSeries([2020, 2021, 2022], [12.5, 13.1, NaN]), 'time')).toBe(1);
    });

    it('should give the last in the data on a category axis', () => {
        expect(findLastDataPointIndex(buildSeries(['Gent', 'Aalst', 'Brugge'], [4, 7, 5]), 'category')).toBe(2);
    });

    it('should give -1 for a series with only gaps', () => {
        expect(findLastDataPointIndex(buildSeries([2020, 2021], [NaN, NaN]), 'number')).toBe(-1);
    });
});
