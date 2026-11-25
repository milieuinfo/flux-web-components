import { findModel, isOpenData, type ChartMeta, type ChartModel } from './chart.model';

const MODEL: ChartModel = {
    meta: {
        sources: [{ title: 'Vlaamse Milieumaatschappij' }],
        x: { type: 'number' },
        y: { type: 'number', unit: 'µg/m³' },
    },
    series: [{ name: 'Gent', x: Float64Array.from([2020, 2021]), y: Float64Array.from([10, 12]) }],
};

describe('jest - widgets - findModel', () => {
    it('should return the model for data', () => {
        expect(findModel({ status: 'data', model: MODEL })).toBe(MODEL);
    });

    it('should return the model for partial data', () => {
        expect(findModel({ status: 'partial', model: MODEL })).toBe(MODEL);
    });

    it('should return null while loading, when empty and on an error', () => {
        expect(findModel({ status: 'loading' })).toBeNull();
        expect(findModel({ status: 'empty' })).toBeNull();
        expect(findModel({ status: 'error', problems: ['De bron antwoordde niet.'] })).toBeNull();
    });

    it('should return null without a data state', () => {
        expect(findModel(undefined)).toBeNull();
    });
});

describe('jest - widgets - isOpenData', () => {
    const meta = (sources: ChartMeta['sources'], fromData?: boolean): ChartMeta => ({
        ...MODEL.meta,
        sources,
        isOpenData: fromData,
    });

    it('should follow the records when they all say so', () => {
        expect(isOpenData(meta([{ isOpenData: true }, { isOpenData: true }], false))).toBe(true);
    });

    it('should not be open data when one record says it is not', () => {
        expect(isOpenData(meta([{ isOpenData: true }, { isOpenData: false }], true))).toBe(false);
    });

    it('should follow the data when a record does not say', () => {
        expect(isOpenData(meta([{ isOpenData: true }, { title: 'Eigen' }], true))).toBe(true);
        expect(isOpenData(meta([{ title: 'Eigen' }]))).toBe(false);
    });
});
