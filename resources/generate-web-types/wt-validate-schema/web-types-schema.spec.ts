import componentsAtomWebTypes from '../../../libs/components/src/atom/atom.web-types.json';
import componentsBasicWebTypes from '../../../libs/components/src/block/block.web-types.json';
import componentsComplianceWebTypes from '../../../libs/components/src/compliance/compliance.web-types.json';
import componentsFormWebTypes from '../../../libs/components/src/form/form.web-types.json';
import mapWebTypes from '../../../libs/map/map.web-types.json';
import webTypesSchema from './web-types.schema.json';

const zSchema = require('z-schema');
const schemaValidator = new zSchema();

describe('jest - generate-web-types - web-types-schema', () => {
    it('components-atom - valideer de web-types tov het schema', () => {
        expect(schemaValidator.validate(componentsAtomWebTypes, webTypesSchema)).toEqual(true);
        expect(schemaValidator.getLastErrors()).toBeNull();
    });
    it('components-basic - valideer de web-types tov het schema', () => {
        expect(schemaValidator.validate(componentsBasicWebTypes, webTypesSchema)).toEqual(true);
        expect(schemaValidator.getLastErrors()).toBeNull();
    });
    it('components-compliance - valideer de web-types tov het schema', () => {
        expect(schemaValidator.validate(componentsComplianceWebTypes, webTypesSchema)).toEqual(true);
        expect(schemaValidator.getLastErrors()).toBeNull();
    });
    it('components-form - valideer de web-types tov het schema', () => {
        expect(schemaValidator.validate(componentsFormWebTypes, webTypesSchema)).toEqual(true);
        expect(schemaValidator.getLastErrors()).toBeNull();
    });
    it('map - valideer de web-types tov het schema', () => {
        expect(schemaValidator.validate(mapWebTypes, webTypesSchema)).toEqual(true);
        expect(schemaValidator.getLastErrors()).toBeNull();
    });
});
