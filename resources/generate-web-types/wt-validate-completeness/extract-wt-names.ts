import componentsAtomWebTypes from '../../../libs/components/src/atom/atom.web-types.json';
import componentsBlockWebTypes from '../../../libs/components/src/block/block.web-types.json';
import componentsComplianceWebTypes from '../../../libs/components/src/compliance/compliance.web-types.json';
import componentsFormWebTypes from '../../../libs/components/src/form/form.web-types.json';
import mapWebTypes from '../../../libs/map/map.web-types.json';

const extractWTNames = (webTypes: { contributions: any }): string[] =>
    webTypes.contributions.html.elements.map((element: any) => element.name);

export const extractComponentsAtomWTNames = () => extractWTNames(componentsAtomWebTypes);

export const extractComponentsBlockWTNames = () => extractWTNames(componentsBlockWebTypes);

export const extractComponentsComplianceWTNames = () => extractWTNames(componentsComplianceWebTypes);

export const extractComponentsFormWTNames = () => extractWTNames(componentsFormWebTypes);

export const extractMapWTNames = () => extractWTNames(mapWebTypes);
