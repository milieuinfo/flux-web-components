import { DVCondition } from './flux-meta-data.model';
import componentsAtomMetaDataJson from './json/components-atom.meta-data.json';
import componentsBlockMetaDataJson from './json/components-block.meta-data.json';
import componentsComplianceMetaDataJson from './json/components-compliance.meta-data.json';
import componentsFormMetaDataJson from './json/components-form.meta-data.json';
import componentsStructuresMetaDataJson from './json/components-structures.meta-data.json';
import dvComponentsWithoutFluxJson from './json/dv-components-without-flux.meta-data.json';
import mapActionsMetaDataJson from './json/map-actions.meta-data.json';
import mapComponentsMetaDataJson from './json/map-components.meta-data.json';
import stylesMetaDataJson from './json/styles.meta-data.json';

export const fluxAllMetaData = () => ({
    ...componentsAtomMetaDataJson,
    ...componentsBlockMetaDataJson,
    ...componentsComplianceMetaDataJson,
    ...componentsFormMetaDataJson,
    ...componentsStructuresMetaDataJson,
    ...mapActionsMetaDataJson,
    ...mapComponentsMetaDataJson,
    ...stylesMetaDataJson,
});

export const componentsAtomMetaData = () => componentsAtomMetaDataJson;

export const componentsBlockMetaData = () => componentsBlockMetaDataJson;

export const componentsComplianceMetaData = () => componentsComplianceMetaDataJson;

export const componentsFormMetaData = () => componentsFormMetaDataJson;

export const componentsStructuresMetaData = () => componentsStructuresMetaDataJson;

export const mapActionsMetaData = () => mapActionsMetaDataJson;

export const mapComponentsMetaData = () => mapComponentsMetaDataJson;

export const stylesMetaData = () => stylesMetaDataJson;

// DV componenten zonder tegenhanger bij Flux; patterns, recipes, roadmap-items en de componenten van de digitale assistent (DA) staan er bewust niet in
export const dvComponentsWithoutFlux = () => dvComponentsWithoutFluxJson as DVCondition[];
