import componentsWebTypes from '../../../libs/components/components.web-types.json';
import formWebTypes from '../../../libs/form/form.web-types.json';
import mapWebTypes from '../../../libs/map/map.web-types.json';
import sectionsWebTypes from '../../../libs/sections/sections.web-types.json';

const extractWTNames = (webTypes: { contributions: any }): string[] =>
    webTypes.contributions.html.elements.map((element: any) => element.name);

export const extractComponentWTNames = () => extractWTNames(componentsWebTypes);

export const extractFormWTNames = () => extractWTNames(formWebTypes);

export const extractMapWTNames = () => extractWTNames(mapWebTypes);

export const extractSectionWTNames = () => extractWTNames(sectionsWebTypes);
