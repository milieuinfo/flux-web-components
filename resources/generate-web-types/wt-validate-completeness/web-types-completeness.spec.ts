import {
    componentsAtomWCNameCount,
    componentsAtomWCWithoutWT,
    componentsAtomWTNameCount,
    componentsAtomWTWithoutWC,
} from './compare-wc-wt-components-atom';
import {
    componentsBlockWCNameCount,
    componentsBlockWCWithoutWT,
    componentsBlockWTNameCount,
    componentsBlockWTWithoutWC,
} from './compare-wc-wt-components-block';
import {
    componentsComplianceWCNameCount,
    componentsComplianceWCWithoutWT,
    componentsComplianceWTNameCount,
    componentsComplianceWTWithoutWC,
} from './compare-wc-wt-components-compliance';
import {
    componentsFormWCNameCount,
    componentsFormWCWithoutWT,
    componentsFormWTNameCount,
    componentsFormWTWithoutWC,
} from './compare-wc-wt-components-form';
import { mapWCNameCount, mapWCWithoutWT, mapWTNameCount, mapWTWithoutWC } from './compare-wc-wt-map';

describe('jest - generate-web-types - web-types-completeness', () => {
    // beforeAll(() => {
    //     jest.spyOn(console, 'log').mockImplementation(() => {});
    // });
    it('components-atom - valideer de volledigheid van de web-types', () => {
        expect(componentsAtomWCNameCount).toEqual(7);
        expect(componentsAtomWTNameCount).toEqual(6);
        expect(componentsAtomWCWithoutWT).toStrictEqual([]);
        expect(componentsAtomWTWithoutWC).toStrictEqual([]);
    });
    it('components-block - valideer de volledigheid van de web-types', () => {
        expect(componentsBlockWCNameCount).toEqual(70);
        expect(componentsBlockWTNameCount).toEqual(75);
        expect(componentsBlockWCWithoutWT).toStrictEqual([]);
        expect(componentsBlockWTWithoutWC).toStrictEqual([]);
    });
    it('components-compliance - valideer de volledigheid van de web-types', () => {
        expect(componentsComplianceWCNameCount).toEqual(15);
        expect(componentsComplianceWTNameCount).toEqual(13);
        expect(componentsComplianceWCWithoutWT).toStrictEqual([]);
        expect(componentsComplianceWTWithoutWC).toStrictEqual([]);
    });
    it('components-form - valideer de volledigheid van de web-types', () => {
        expect(componentsFormWCNameCount).toEqual(14);
        expect(componentsFormWTNameCount).toEqual(14);
        expect(componentsFormWCWithoutWT).toStrictEqual([]);
        expect(componentsFormWTWithoutWC).toStrictEqual([]);
    });
    it('map - valideer de volledigheid van de web-types', () => {
        expect(mapWCNameCount).toEqual(46);
        expect(mapWTNameCount).toEqual(41);
        expect(mapWCWithoutWT).toStrictEqual([]);
        expect(mapWTWithoutWC).toStrictEqual([]);
    });
});
