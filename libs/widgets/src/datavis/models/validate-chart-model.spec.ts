import type { ChartModel, ChartSeries, ChartSource } from './chart.model';
import { findSourceWarnings, MAX_SERIES, validateChartModel } from './validate-chart-model';

const buildSeries = (overrides: Partial<ChartSeries> = {}): ChartSeries => ({
    name: 'Meetpunt Gent',
    x: Float64Array.from([2020, 2021, 2022]),
    y: Float64Array.from([12.5, 13.1, 12.8]),
    ...overrides,
});

const buildModel = (
    overrides: { sources?: ChartSource[]; unit?: string; series?: ChartSeries[] } = {},
): ChartModel => ({
    meta: {
        sources: overrides.sources ?? [{ title: 'Vlaamse Milieumaatschappij' }],
        x: { type: 'number', title: 'Jaar' },
        y: { type: 'number', unit: 'unit' in overrides ? overrides.unit : 'µg/m³' },
    },
    series: overrides.series ?? [buildSeries()],
});

describe('jest - widgets - validateChartModel', () => {
    it('should report no problems for a complete model', () => {
        expect(validateChartModel(buildModel())).toEqual([]);
    });

    it('should report a missing source', () => {
        const problems = validateChartModel(buildModel({ sources: [] }));

        expect(problems).toHaveLength(1);
        expect(problems[0]).toMatch(/bron/);
    });

    it('should report a source with neither a title nor a record', () => {
        expect(validateChartModel(buildModel({ sources: [{ title: '' }] }))).toHaveLength(1);
    });

    it('should accept a source with just its record: the title comes from the catalogue', () => {
        expect(validateChartModel(buildModel({ sources: [{ metadataId: '449f14d5' }] }))).toEqual([]);
    });

    it('should report a missing unit on the value axis', () => {
        const problems = validateChartModel(buildModel({ unit: undefined }));

        expect(problems).toHaveLength(1);
        expect(problems[0]).toMatch(/eenheid/);
    });

    it('should not report a missing unit when there are no series', () => {
        // zonder reeksen is de toestand 'empty', geen 'error'
        expect(validateChartModel(buildModel({ unit: undefined, series: [] }))).toEqual([]);
    });

    it('should report every problem at once', () => {
        expect(validateChartModel(buildModel({ sources: [], unit: undefined }))).toHaveLength(2);
    });

    it('should report a series whose x and y differ in length, by name', () => {
        const series = buildSeries({ y: Float64Array.from([12.5, 13.1]) });

        const problems = validateChartModel(buildModel({ series: [series] }));

        expect(problems).toHaveLength(1);
        expect(problems[0]).toMatch(/Meetpunt Gent/);
    });

    it('should report a series with an x value that is not a number, by name', () => {
        const series = buildSeries({ x: Float64Array.from([2020, NaN, 2022]) });

        const problems = validateChartModel(buildModel({ series: [series] }));

        expect(problems).toHaveLength(1);
        expect(problems[0]).toMatch(/Meetpunt Gent/);
    });

    it('should accept a missing y value, because that is a gap', () => {
        const series = buildSeries({ y: Float64Array.from([12.5, NaN, 12.8]) });

        expect(validateChartModel(buildModel({ series: [series] }))).toEqual([]);
    });

    it('should accept as many series as there are colors', () => {
        const series = Array.from({ length: MAX_SERIES }, (_, index) => buildSeries({ name: `Meetpunt ${index + 1}` }));

        expect(validateChartModel(buildModel({ series }))).toEqual([]);
    });

    it('should report more series than there are colors', () => {
        const series = Array.from({ length: MAX_SERIES + 1 }, (_, index) =>
            buildSeries({ name: `Meetpunt ${index + 1}` }),
        );

        const problems = validateChartModel(buildModel({ series }));

        expect(problems).toHaveLength(1);
        expect(problems[0]).toMatch(/7 reeksen/);
    });

    it('should report one problem when the input is not shaped like a model', () => {
        const problems = validateChartModel({ series: [] } as unknown as ChartModel);

        expect(problems).toHaveLength(1);
    });
});

describe('jest - widgets - findSourceWarnings', () => {
    it('should warn about every source without a record in the catalogue', () => {
        const model = buildModel({ sources: [{ title: 'Stikstof', metadataId: '449f14d5' }, { title: 'Eigen' }] });

        const warnings = findSourceWarnings(model);

        expect(warnings).toHaveLength(1);
        expect(warnings[0]).toMatch(/'Eigen'.*metadataId/);
    });
});
