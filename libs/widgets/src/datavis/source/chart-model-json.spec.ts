import type { ChartMeta } from '../models/chart.model';
import { parseChartModelJson } from './chart-model-json';
import { buildRequestUrl } from './request-url';

const meta = (type: 'number' | 'time' | 'category'): ChartMeta => ({
    sources: [{ title: 'Departement Omgeving' }],
    x: { type },
    y: { type: 'number', unit: 'µT' },
});

describe('jest - widgets - parseChartModelJson', () => {
    it('should turn null into a gap', () => {
        const model = parseChartModelJson({
            meta: meta('number'),
            series: [{ name: 'A', x: [2020, 2021], y: [1, null] }],
        });

        expect(Array.from(model.series[0].y)).toEqual([1, NaN]);
    });

    it('should read ISO times as milliseconds', () => {
        const model = parseChartModelJson({
            meta: meta('time'),
            series: [{ name: 'A', x: ['2026-08-28T15:30:00+02:00', 1788010200000], y: [0.28, 0.3] }],
        });

        expect(Array.from(model.series[0].x as Float64Array)).toEqual([
            Date.parse('2026-08-28T15:30:00+02:00'),
            1788010200000,
        ]);
    });

    it('should keep categories as text', () => {
        const model = parseChartModelJson({ meta: meta('category'), series: [{ name: 'A', x: ['Gent'], y: [1] }] });

        expect(model.series[0].x).toEqual(['Gent']);
    });

    it('should refuse an answer with another shape', () => {
        expect(() => parseChartModelJson({ data: [] })).toThrow('{ meta, series: [] }');
    });
});

describe('jest - widgets - buildRequestUrl', () => {
    const range = { from: new Date(Date.UTC(2026, 7, 27, 22)), to: new Date(Date.UTC(2026, 7, 28, 22)) };

    it('should add the period as from and to', () => {
        const url = new URL(buildRequestUrl('https://api.example/sensors/ELF_L_0004', range));

        expect(url.searchParams.get('from')).toBe('2026-08-27T22:00:00.000Z');
        expect(url.searchParams.get('to')).toBe('2026-08-28T22:00:00.000Z');
    });

    it('should keep the parameters that are already there', () => {
        const url = new URL(buildRequestUrl('https://api.example/observations?sensor=ELF_L_0004', range));

        expect(url.searchParams.get('sensor')).toBe('ELF_L_0004');
    });
});
