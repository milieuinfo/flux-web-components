import componentsAtomMetaDataJson from './json/components-atom.meta-data.json';
import componentsBlockMetaDataJson from './json/components-block.meta-data.json';
import componentsComplianceMetaDataJson from './json/components-compliance.meta-data.json';
import componentsFormMetaDataJson from './json/components-form.meta-data.json';
import mapActionsMetaDataJson from './json/map-actions.meta-data.json';
import mapComponentsMetaDataJson from './json/map-components.meta-data.json';
import stylesMetaDataJson from './json/styles.meta-data.json';

export const fluxAllMetaData = () => ({
    ...componentsAtomMetaDataJson,
    ...componentsBlockMetaDataJson,
    ...componentsComplianceMetaDataJson,
    ...componentsFormMetaDataJson,
    ...mapActionsMetaDataJson,
    ...mapComponentsMetaDataJson,
    ...stylesMetaDataJson,
});

export const componentsAtomMetaData = () => componentsAtomMetaDataJson;

export const componentsBlockMetaData = () => componentsBlockMetaDataJson;

export const componentsComplianceMetaData = () => componentsComplianceMetaDataJson;

export const componentsFormMetaData = () => componentsFormMetaDataJson;

export const mapActionsMetaData = () => mapActionsMetaDataJson;

export const mapComponentsMetaData = () => mapComponentsMetaDataJson;

export const stylesMetaData = () => stylesMetaDataJson;

