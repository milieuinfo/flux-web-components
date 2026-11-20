import type { ChartModel } from '../models/chart.model';
import type { ChartSpec } from './chart-spec';
import { buildPlotLayout, type PlotLayoutInput } from './plot-layout';
import { chartDefaults } from './vl-chart.defaults';

const spec: ChartSpec = {
    fontFamily: 'Flanders Art Sans',
    fontSize: 14,
    textColor: '#333',
    gridColor: '#ddd',
    axisColor: '#666',
    referenceColor: '#222',
    backgroundColor: '#fff',
};

const buildModel = (xType: 'number' | 'time' = 'number'): ChartModel => ({
    meta: {
        sources: [{ title: 'Vlaamse Milieumaatschappij' }],
        x: { type: xType, title: 'Jaar' },
        y: { type: 'number', unit: 'µg/m³' },
    },
    series: [{ name: 'Meetpunt Gent', x: Float64Array.from([2020, 2021, 2022]), y: Float64Array.from([12, 15, 13]) }],
});

const buildInput = (overrides: Partial<PlotLayoutInput> = {}): PlotLayoutInput => ({
    model: buildModel(),
    spec,
    valueScale: { range: [0, 20], step: 5 },
    margin: chartDefaults.margin,
    chartLayout: {},
    references: [],
    size: { width: 600, height: 300 },
    ...overrides,
});

describe('jest - widgets - buildPlotLayout', () => {
    it('should take the measured size and the margin of the chart type', () => {
        const layout = buildPlotLayout(buildInput({ margin: { top: 1, right: 2, bottom: 3, left: 4 } }));

        expect(layout.width).toBe(600);
        expect(layout.height).toBe(300);
        expect(layout.margin).toEqual({ t: 1, r: 2, b: 3, l: 4 });
    });

    it('should draw the value axis from the value scale, with Dutch separators', () => {
        const layout = buildPlotLayout(buildInput());

        expect(layout.yaxis?.range).toEqual([0, 20]);
        expect(layout.yaxis?.dtick).toBe(5);
        expect(layout.separators).toBe(',.');
    });

    it('should title the position axis, but not a time axis', () => {
        expect(buildPlotLayout(buildInput()).xaxis?.title).toMatchObject({ text: 'Jaar' });
        expect(buildPlotLayout(buildInput({ model: buildModel('time') })).xaxis?.title).toMatchObject({
            text: undefined,
        });
    });

    it('should add the layout of the chart type, and draw a grid line on the top edge', () => {
        const layout = buildPlotLayout(buildInput({ chartLayout: { annotations: [{ text: 'Meetpunt Gent' }] } }));

        expect(layout.annotations?.map((annotation) => annotation.text)).toEqual(['Meetpunt Gent']);
        expect(layout.shapes?.map((shape) => shape.y0)).toEqual([20]);
    });

    it('should draw a reference line after the labels and shapes of the chart type', () => {
        const layout = buildPlotLayout(
            buildInput({
                chartLayout: { annotations: [{ text: 'Meetpunt Gent' }] },
                references: [{ value: 10, label: 'Streefwaarde', isInView: true }],
            }),
        );

        expect(layout.annotations?.map((annotation) => annotation.text)).toEqual([
            'Meetpunt Gent',
            'Streefwaarde: 10\u00A0µg/m³',
        ]);
        expect(layout.shapes?.map((shape) => shape.line?.dash)).toEqual([undefined, 'dash']);
    });

    it('should step whole numbers on an axis of years', () => {
        expect(buildPlotLayout(buildInput()).xaxis).toMatchObject({ tick0: 0, dtick: 1 });
    });
});
