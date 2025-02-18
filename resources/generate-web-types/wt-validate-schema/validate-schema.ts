import componentsWebTypes from '../../../libs/components/components.web-types.json';
import elementsWebTypes from '../../../libs/elements/elements.web-types.json';
import formWebTypes from '../../../libs/form/form.web-types.json';
import mapWebTypes from '../../../libs/map/map.web-types.json';
import sectionsWebTypes from '../../../libs/sections/sections.web-types.json';
import webTypesSchema from './web-types.schema.json';

const zSchema = require('z-schema');
const schemaValidator = new zSchema();

console.log('components - schema valid:', schemaValidator.validate(componentsWebTypes, webTypesSchema));
console.log('components - schema errors', schemaValidator.getLastErrors());

console.log('elements - schema valid:', schemaValidator.validate(elementsWebTypes, webTypesSchema));
console.log('elements - schema errors', schemaValidator.getLastErrors());

console.log('form - schema valid:', schemaValidator.validate(formWebTypes, webTypesSchema));
console.log('form - schema errors', schemaValidator.getLastErrors());

console.log('map - schema valid:', schemaValidator.validate(mapWebTypes, webTypesSchema));
console.log('map - schema errors', schemaValidator.getLastErrors());

console.log('sections - schema valid:', schemaValidator.validate(sectionsWebTypes, webTypesSchema));
console.log('sections - schema errors', schemaValidator.getLastErrors());
