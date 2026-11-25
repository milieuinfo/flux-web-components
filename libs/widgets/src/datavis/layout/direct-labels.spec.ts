import type { ChartModel, ChartSeries } from '../models/chart.model';
import { buildDirectLabels, findLastValue, isTooWideForDirectLabels } from './direct-labels';

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

const labelColors = ['#2667d8', '#7b7005'];

describe('jest - widgets - findLastValue', () => {
    it('should give the last value', () => {
        expect(findLastValue(buildSeries('Meetpunt Gent', [12.5, 13.1, 12.8]), 'number')).toBe(12.8);
    });

    it('should skip a gap at the end', () => {
        expect(findLastValue(buildSeries('Meetpunt Gent', [12.5, 13.1, NaN]), 'number')).toBe(13.1);
    });

    it('should give nothing for a series with only gaps', () => {
        expect(findLastValue(buildSeries('Meetpunt Gent', [NaN, NaN, NaN]), 'number')).toBeUndefined();
    });
});

describe('jest - widgets - buildDirectLabels', () => {
    it('should label the value at the largest x, like the latest-value tile, also when x is not sorted', () => {
        const unsorted: ChartSeries = {
            name: 'Meetpunt Gent',
            x: Float64Array.from([2022, 2020, 2021]),
            y: Float64Array.from([12.8, 12.5, 13.1]),
        };

        const labels = buildDirectLabels(buildModel([unsorted]), labelColors, 1);

        expect(labels.map(({ text, y }) => ({ text, y }))).toEqual([{ text: 'Meetpunt Gent <b>12,8</b>', y: 12.8 }]);
    });

    it('should place the name and last value of each series at the height of that value, right of the chart', () => {
        const model = buildModel([
            buildSeries('Meetpunt Gent', [12.5, 13.1, 12.8]),
            buildSeries('Meetpunt Antwerpen', [15.2, 14.7, 14.9]),
        ]);

        const labels = buildDirectLabels(model, labelColors, 1);

        expect(labels.map(({ text, y }) => ({ text, y }))).toEqual([
            { text: 'Meetpunt Gent <b>12,8</b>', y: 12.8 },
            { text: 'Meetpunt Antwerpen <b>14,9</b>', y: 14.9 },
        ]);
        expect(labels.every((label) => label.xref === 'paper' && label.x === 1 && label.xanchor === 'left')).toBe(true);
    });

    it('should color each label with the label color of its series', () => {
        const model = buildModel([
            buildSeries('Meetpunt Gent', [12.5, 13.1, 12.8]),
            buildSeries('Meetpunt Antwerpen', [15.2, 14.7, 14.9]),
        ]);

        expect(buildDirectLabels(model, labelColors, 1).map((label) => label.font?.color)).toEqual(labelColors);
    });

    it('should show the last value with as many decimals as the chart, skipping a gap at the end', () => {
        const model = buildModel([buildSeries('Meetpunt Gent', [12.5, 1250, NaN])]);

        expect(buildDirectLabels(model, labelColors, 2)[0].text).toBe('Meetpunt Gent <b>1.250,00</b>');
    });

    it('should not let a name become HTML', () => {
        const model = buildModel([buildSeries('A<b>B & C', [1, 2, 3])]);

        expect(buildDirectLabels(model, labelColors, 0)[0].text).toBe('A&lt;b&gt;B &amp; C <b>3</b>');
    });

    it('should keep the colour of each series, also after a series without values', () => {
        const model = buildModel([
            buildSeries('Meetpunt Gent', [NaN, NaN, NaN]),
            buildSeries('Meetpunt Antwerpen', [1, 2, 3]),
        ]);

        const labels = buildDirectLabels(model, ['#2667d8', '#687483'], 0);

        expect(labels.map((label) => [label.text, label.font?.color])).toEqual([
            ['Meetpunt Antwerpen <b>3</b>', '#687483'],
        ]);
    });

    it('should give no label to a series without values', () => {
        const model = buildModel([buildSeries('Meetpunt Gent', [NaN, NaN, NaN])]);

        expect(buildDirectLabels(model, labelColors, 1)).toEqual([]);
    });
});

describe('jest - widgets - isTooWideForDirectLabels', () => {
    it('should keep direct labels that leave enough room for the lines', () => {
        expect(isTooWideForDirectLabels(200, 1000)).toBe(false);
    });

    it('should give up direct labels that take too much of the width', () => {
        expect(isTooWideForDirectLabels(250, 400)).toBe(true);
    });

    it('should give up direct labels that take more than a quarter of a narrow plot', () => {
        expect(isTooWideForDirectLabels(130, 480)).toBe(true);
    });
});
