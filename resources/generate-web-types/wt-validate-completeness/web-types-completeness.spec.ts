import {
    componentWCNameCount,
    componentWCWithoutWT,
    componentWTNameCount,
    componentWTWithoutWC,
} from './compare-wc-wt-components';
import {
    elementWCNameCount,
    elementWCWithoutWT,
    elementWTNameCount,
    elementWTWithoutWC,
} from './compare-wc-wt-elements';
import { formWCNameCount, formWCWithoutWT, formWTNameCount, formWTWithoutWC } from './compare-wc-wt-form';
import { mapWCNameCount, mapWCWithoutWT, mapWTNameCount, mapWTWithoutWC } from './compare-wc-wt-map';
import { qlikWCNameCount, qlikWCWithoutWT, qlikWTNameCount, qlikWTWithoutWC } from './compare-wc-wt-qlik';
import {
    sectionWCNameCount,
    sectionWCWithoutWT,
    sectionWTNameCount,
    sectionWTWithoutWC,
} from './compare-wc-wt-sections';

describe('valideer de volledigheid van de gegenereerde web-types', () => {
    // beforeAll(() => {
    //     jest.spyOn(console, 'log').mockImplementation(() => {});
    // });
    it('elements - valideer de volledigheid van de web-types', () => {
        expect(elementWCNameCount).toEqual(66);
        expect(elementWTNameCount).toEqual(66);
        expect(elementWCWithoutWT).toStrictEqual([]);
        expect(elementWTWithoutWC).toStrictEqual([]);
    });
    it('components - valideer de volledigheid van de web-types', () => {
        expect(componentWCNameCount).toEqual(92);
        expect(componentWTNameCount).toEqual(73);
        expect(componentWCWithoutWT).toStrictEqual([]);
        expect(componentWTWithoutWC).toStrictEqual([]);
    });
    it('form - valideer de volledigheid van de web-types', () => {
        expect(formWCNameCount).toEqual(13);
        expect(formWTNameCount).toEqual(13);
        expect(formWCWithoutWT).toStrictEqual([]);
        expect(formWTWithoutWC).toStrictEqual([]);
    });
    it('map - valideer de volledigheid van de web-types', () => {
        expect(mapWCNameCount).toEqual(45);
        expect(mapWTNameCount).toEqual(40);
        expect(mapWCWithoutWT).toStrictEqual([]);
        expect(mapWTWithoutWC).toStrictEqual([]);
    });
    it('qlik - valideer de volledigheid van de web-types', () => {
        expect(qlikWCNameCount).toEqual(4);
        expect(qlikWTNameCount).toEqual(3);
        expect(qlikWCWithoutWT).toStrictEqual([]);
        expect(qlikWTWithoutWC).toStrictEqual([]);
    });
    it('sections - valideer de volledigheid van de web-types', () => {
        expect(sectionWCNameCount).toEqual(13);
        expect(sectionWTNameCount).toEqual(13);
        expect(sectionWCWithoutWT).toStrictEqual([]);
        expect(sectionWTWithoutWC).toStrictEqual([]);
    });
});
