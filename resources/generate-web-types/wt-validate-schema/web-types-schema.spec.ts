import componentsWebTypes from '../../../libs/components/components.web-types.json';
import formWebTypes from '../../../libs/form/form.web-types.json';
import mapWebTypes from '../../../libs/map/map.web-types.json';
import sectionsWebTypes from '../../../libs/sections/sections.web-types.json';
import webTypesSchema from './web-types.schema.json';

const zSchema = require('z-schema');
const schemaValidator = new zSchema();

describe('valideer de gegenereerde web-types tov het schema', () => {
    it('components - valideer de web-types tov het schema', () => {
        expect(schemaValidator.validate(componentsWebTypes, webTypesSchema)).toEqual(true);
        expect(schemaValidator.getLastErrors()).toBeNull();
    });
    it('form - valideer de web-types tov het schema', () => {
        expect(schemaValidator.validate(formWebTypes, webTypesSchema)).toEqual(true);
        expect(schemaValidator.getLastErrors()).toBeNull();
    });
    it('map - valideer de web-types tov het schema', () => {
        expect(schemaValidator.validate(mapWebTypes, webTypesSchema)).toEqual(true);
        expect(schemaValidator.getLastErrors()).toBeNull();
    });
    it('sections - valideer de web-types tov het schema', () => {
        expect(schemaValidator.validate(sectionsWebTypes, webTypesSchema)).toEqual(true);
        expect(schemaValidator.getLastErrors()).toBeNull();
    });
});
