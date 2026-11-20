import type { ChartModel, ChartSeries } from '../models/chart.model';
import {
    buildHoverSummary,
    collectPositions,
    describePosition,
    findNearestPositionIndex,
    findTooltipHalf,
    toPlotlyPosition,
} from './hover-positions';

const buildSeries = (name: string, x: number[], y: number[]): ChartSeries => ({
    name,
    x: Float64Array.from(x),
    y: Float64Array.from(y),
});

const buildModel = (series: ChartSeries[], type: 'number' | 'category' | 'time' = 'number'): ChartModel => ({
    meta: {
        sources: [{ title: 'Vlaamse Milieumaatschappij' }],
        x: { type, title: 'Jaar' },
        y: { type: 'number', unit: 'µg/m³' },
    },
    series,
});

describe('jest - widgets - collectPositions', () => {
    it('should list every x once, in ascending order', () => {
        const model = buildModel([
            buildSeries('Meetpunt Gent', [2021, 2022], [1, 2]),
            buildSeries('Meetpunt Antwerpen', [2020, 2021], [3, 4]),
        ]);

        expect(collectPositions(model)).toEqual([2020, 2021, 2022]);
    });

    it('should keep categories in the order they first appear', () => {
        const model = buildModel(
            [{ name: 'Gemeenten', x: ['Gent', 'Aalst'], y: Float64Array.from([1, 2]) }],
            'category',
        );

        expect(collectPositions(model)).toEqual(['Gent', 'Aalst']);
    });
});

describe('jest - widgets - toPlotlyPosition', () => {
    it('should use the number itself on a number axis', () => {
        expect(toPlotlyPosition(buildModel([]), 2021)).toBe(2021);
    });

    it('should use the category itself on a category axis', () => {
        expect(toPlotlyPosition(buildModel([], 'category'), 'Aalst')).toBe('Aalst');
    });

    it('should use the same local time as the traces on a time axis', () => {
        const time = new Date(2026, 7, 28, 15, 30).getTime();

        expect(toPlotlyPosition(buildModel([], 'time'), time)).toBe('2026-08-28 15:30:00');
    });
});

describe('jest - widgets - buildHoverSummary', () => {
    const model = buildModel([
        buildSeries('Meetpunt Gent', [2020, 2021], [12.5, 11.9]),
        buildSeries('Meetpunt Brugge', [2020], [9.1]),
        buildSeries('Meetpunt Antwerpen', [2020, 2021], [15.2, 13.8]),
    ]);

    it('should give the x as title and the unit once', () => {
        const summary = buildHoverSummary(model, 2021, 1);

        expect(summary.title).toBe('2021');
        expect(summary.unit).toBe('µg/m³');
    });

    it('should list the series from high to low, without unit, gaps last', () => {
        const { rows } = buildHoverSummary(model, 2021, 1);

        expect(rows.map((row) => [row.name, row.label])).toEqual([
            ['Meetpunt Antwerpen', '13,8'],
            ['Meetpunt Gent', '11,9'],
            ['Meetpunt Brugge', 'geen gegevens'],
        ]);
    });

    it('should keep the index of the series, for its color', () => {
        expect(buildHoverSummary(model, 2021, 1).rows.map((row) => row.seriesIndex)).toEqual([2, 0, 1]);
    });
});

describe('jest - widgets - describePosition - time', () => {
    it('should read a time as a Belgian date and time', () => {
        const time = new Date(2026, 7, 28, 15, 30).getTime();
        const model = buildModel([buildSeries('ELF_L_0004', [time], [0.28])], 'time');

        expect(describePosition(model, time, 2)).toBe('28/08/2026 15:30: ELF_L_0004 0,28\u00A0µg/m³');
    });
});

describe('jest - widgets - describePosition', () => {
    it('should read every series with value and unit', () => {
        const model = buildModel([
            buildSeries('Meetpunt Gent', [2021], [11.9]),
            buildSeries('Meetpunt Antwerpen', [2021], [13.8]),
        ]);

        expect(describePosition(model, 2021, 1)).toBe(
            '2021: Meetpunt Gent 11,9\u00A0µg/m³, Meetpunt Antwerpen 13,8\u00A0µg/m³',
        );
    });

    it('should say when a series has no value there', () => {
        const model = buildModel([
            buildSeries('Meetpunt Gent', [2020, 2021], [12.5, NaN]),
            buildSeries('Meetpunt Antwerpen', [2020], [15.2]),
        ]);

        expect(describePosition(model, 2021, 1)).toBe(
            '2021: Meetpunt Gent geen gegevens, Meetpunt Antwerpen geen gegevens',
        );
    });
});

describe('jest - widgets - findTooltipHalf', () => {
    it('should put the tooltip at the bottom when most values are in the upper half', () => {
        const model = buildModel([buildSeries('Meetpunt Gent', [1, 2, 3], [15, 16, 4])]);

        expect(findTooltipHalf(model, [0, 20])).toBe('bottom');
    });

    it('should put the tooltip at the top when most values are in the lower half', () => {
        const model = buildModel([buildSeries('Meetpunt Gent', [1, 2, 3], [5, 6, 16])]);

        expect(findTooltipHalf(model, [0, 20])).toBe('top');
    });

    it('should count every series and skip the gaps', () => {
        const model = buildModel([
            buildSeries('Meetpunt Gent', [1, 2], [15, NaN]),
            buildSeries('Meetpunt Antwerpen', [1, 2], [16, NaN]),
        ]);

        expect(findTooltipHalf(model, [0, 20])).toBe('bottom');
    });
});

describe('jest - widgets - findNearestPositionIndex', () => {
    it('should give the x drawn closest to the tap', () => {
        expect(findNearestPositionIndex([40, 140, 240], 170)).toBe(1);
    });

    it('should give the first or last x for a tap beyond the edge', () => {
        expect(findNearestPositionIndex([40, 140, 240], 0)).toBe(0);
        expect(findNearestPositionIndex([40, 140, 240], 500)).toBe(2);
    });

    it('should give -1 without any x', () => {
        expect(findNearestPositionIndex([], 100)).toBe(-1);
    });
});
