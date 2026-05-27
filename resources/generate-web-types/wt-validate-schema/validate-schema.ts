import componentsAtomWebTypes from '../../../libs/components/atom/atom.web-types.json';
import componentsBasicWebTypes from '../../../libs/components/block/block.web-types.json';
import componentsComplianceWebTypes from '../../../libs/components/compliance/compliance.web-types.json';
import componentsFormWebTypes from '../../../libs/components/form/form.web-types.json';
import mapWebTypes from '../../../libs/map/map.web-types.json';
import webTypesSchema from './web-types.schema.json';

const zSchema = require('z-schema');
const schemaValidator = new zSchema();

console.log('components-atom - schema valid:', schemaValidator.validate(componentsAtomWebTypes, webTypesSchema));
console.log('components-atom - schema errors', schemaValidator.getLastErrors());

console.log('components-basic - schema valid:', schemaValidator.validate(componentsBasicWebTypes, webTypesSchema));
console.log('components-basic - schema errors', schemaValidator.getLastErrors());

console.log(
    'components-compliance - schema valid:',
    schemaValidator.validate(componentsComplianceWebTypes, webTypesSchema)
);
console.log('components-compliance - schema errors', schemaValidator.getLastErrors());

console.log('components-form - schema valid:', schemaValidator.validate(componentsFormWebTypes, webTypesSchema));
console.log('components-form - schema errors', schemaValidator.getLastErrors());

console.log('map - schema valid:', schemaValidator.validate(mapWebTypes, webTypesSchema));
console.log('map - schema errors', schemaValidator.getLastErrors());
