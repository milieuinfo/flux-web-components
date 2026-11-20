import type { ChartModel, ChartSeries } from '../models/chart.model';
import { buildLineTraces, buildMarkerSizes } from './line-traces';

const buildSeries = (name: string, y: number[]): ChartSeries => ({
    name,
    x: Float64Array.from([2020, 2021, 2022]),
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

const colors = ['#387ffc', '#968807'];
// Bewust niet wit: zo bewijst de test dat de achtergrond van de grafiek doorkomt.
const backgroundColor = '#f7f9fc';

describe('jest - widgets - buildLineTraces', () => {
    it('should build one line per series', () => {
        const model = buildModel([
            buildSeries('Meetpunt Gent', [12.5, 13.1, 12.8]),
            buildSeries('Meetpunt Antwerpen', [15.2, 14.7, 14.9]),
        ]);

        const traces = buildLineTraces(model, colors, backgroundColor);

        expect(traces.map((trace) => trace.name)).toEqual(['Meetpunt Gent', 'Meetpunt Antwerpen']);
        expect(traces.every((trace) => trace.mode === 'lines+markers')).toBe(true);
    });

    it('should pass the x and y values of the series', () => {
        const traces = buildLineTraces(
            buildModel([buildSeries('Meetpunt Gent', [12.5, 13.1, 12.8])]),
            colors,
            backgroundColor,
        );

        expect(traces[0].x).toEqual([2020, 2021, 2022]);
        expect(traces[0].y).toEqual([12.5, 13.1, 12.8]);
    });

    it('should turn a gap into null and not connect over it', () => {
        const traces = buildLineTraces(
            buildModel([buildSeries('Meetpunt Gent', [12.5, NaN, 12.8])]),
            colors,
            backgroundColor,
        );

        expect(traces[0].y).toEqual([12.5, null, 12.8]);
        expect(traces[0].connectgaps).toBe(false);
    });

    it('should build no lines for a model without series', () => {
        expect(buildLineTraces(buildModel([]), colors, backgroundColor)).toEqual([]);
    });

    it('should give each series the next color of the palette', () => {
        const model = buildModel([
            buildSeries('Meetpunt Gent', [12.5, 13.1, 12.8]),
            buildSeries('Meetpunt Antwerpen', [15.2, 14.7, 14.9]),
        ]);

        const traces = buildLineTraces(model, colors, backgroundColor);

        expect(traces.map((trace) => trace.line?.color)).toEqual(colors);
    });

    it('should fill the markers with the chart background and a border in the color of the series', () => {
        const [trace] = buildLineTraces(
            buildModel([buildSeries('Meetpunt Gent', [12.5, 13.1, 12.8])]),
            colors,
            backgroundColor,
        );

        expect(trace.marker?.color).toBe(backgroundColor);
        expect(trace.marker?.line?.color).toBe('#387ffc');
    });

    it('should not clip the markers at the edges of the plot', () => {
        const [trace] = buildLineTraces(
            buildModel([buildSeries('Meetpunt Gent', [12.5, 13.1, 12.8])]),
            colors,
            backgroundColor,
        );

        expect(trace.cliponaxis).toBe(false);
    });
});

describe('jest - widgets - buildMarkerSizes', () => {
    /** x loopt 0, 1, 2, ... zoals de waarden: gesorteerd. */
    const sortedSeries = (y: number[]): ChartSeries => ({
        name: 'Meetpunt Gent',
        x: Float64Array.from(y, (_, index) => index),
        y: Float64Array.from(y),
    });

    it('should only mark the last point', () => {
        expect(buildMarkerSizes(sortedSeries([1, 2, 3]), 'number')).toEqual([0, 0, 7]);
    });

    it('should mark the last point with a value when the series ends in a gap', () => {
        expect(buildMarkerSizes(sortedSeries([1, 2, NaN]), 'number')).toEqual([0, 7, 0]);
    });

    it('should mark a point between two gaps, because no line reaches it', () => {
        expect(buildMarkerSizes(sortedSeries([1, NaN, 2, NaN, 3, 4]), 'number')).toEqual([7, 0, 7, 0, 0, 7]);
    });

    it('should mark the point at the largest x, where the direct label is, also when x is not sorted', () => {
        const unsorted: ChartSeries = {
            name: 'Meetpunt Gent',
            x: Float64Array.from([2022, 2020, 2021]),
            y: Float64Array.from([12.8, 12.5, 13.1]),
        };

        expect(buildMarkerSizes(unsorted, 'number')).toEqual([7, 0, 0]);
    });
});

describe('jest - widgets - buildLineTraces - series index', () => {
    it('should draw one trace per series, in the order of the model, for the hover', () => {
        const model = buildModel([
            buildSeries('Meetpunt Gent', [12.5, 13.1, 12.8]),
            buildSeries('Meetpunt Antwerpen', [15.2, 14.7, 14.9]),
        ]);

        expect(buildLineTraces(model, colors, backgroundColor).map((trace) => trace.name)).toEqual([
            'Meetpunt Gent',
            'Meetpunt Antwerpen',
        ]);
    });
});
