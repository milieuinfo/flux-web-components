import type { ChartModel, ChartSeries } from './chart.model';
import { classifyDataState } from './classify-data-state';

const buildSeries = (name: string, y: number[]): ChartSeries => ({
    name,
    x: Float64Array.from([2020, 2021, 2022]),
    y: Float64Array.from(y),
});

const buildModel = (series: ChartSeries[], sources = [{ title: 'Vlaamse Milieumaatschappij' }]): ChartModel => ({
    meta: {
        sources,
        x: { type: 'number', title: 'Jaar' },
        y: { type: 'number', unit: 'µg/m³' },
    },
    series,
});

describe('jest - widgets - classifyDataState', () => {
    it('should classify a complete model as data', () => {
        const model = buildModel([buildSeries('Meetpunt Gent', [12.5, 13.1, 12.8])]);

        expect(classifyDataState(model)).toEqual({ status: 'data', model });
    });

    it('should classify a model without series as empty', () => {
        expect(classifyDataState(buildModel([]))).toEqual({ status: 'empty' });
    });

    it('should classify a model with a gap as partial', () => {
        const model = buildModel([buildSeries('Meetpunt Gent', [12.5, NaN, 12.8])]);

        expect(classifyDataState(model)).toEqual({ status: 'partial', model });
    });

    it('should classify a model as partial when only one of its series has a gap', () => {
        const model = buildModel([
            buildSeries('Meetpunt Gent', [12.5, 13.1, 12.8]),
            buildSeries('Meetpunt Antwerpen', [15.2, NaN, 14.9]),
        ]);

        expect(classifyDataState(model)).toEqual({ status: 'partial', model });
    });

    it('should classify a series without any values as partial, because the series exists', () => {
        const model = buildModel([buildSeries('Meetpunt Gent', [NaN, NaN, NaN])]);

        expect(classifyDataState(model)).toEqual({ status: 'partial', model });
    });

    it('should classify an invalid model as error, with the problems from the validation', () => {
        const state = classifyDataState(buildModel([buildSeries('Meetpunt Gent', [12.5, 13.1, 12.8])], []));

        expect(state.status).toBe('error');
        expect(state).toEqual({ status: 'error', problems: [expect.stringMatching(/bron/)] });
    });

    it('should classify a model without source as error, even without series', () => {
        // zonder bron is de grafiek fout, ook als er (nog) niets te tonen is
        expect(classifyDataState(buildModel([], [])).status).toBe('error');
    });

    it('should classify input that is not shaped like a model as error', () => {
        expect(classifyDataState({ series: [] } as unknown as ChartModel).status).toBe('error');
    });
});
