import { extractComponentsFormWCNames } from './extract-wc-names';
import { extractComponentsFormWTNames } from './extract-wt-names';

const componentsFormWCNames = extractComponentsFormWCNames();
const componentsFormWTNames = extractComponentsFormWTNames();

export const componentsFormWCNameCount = componentsFormWCNames.length;
export const componentsFormWTNameCount = componentsFormWTNames.length;
export const componentsFormWCWithoutWT = componentsFormWCNames.filter((name) => !componentsFormWTNames.includes(name));
export const componentsFormWTWithoutWC = componentsFormWTNames.filter((name) => !componentsFormWCNames.includes(name));

// console.log('componentsForm - aantal web-components:', componentsFormWCNameCount);
// console.log('componentsForm - aantal web-types:', componentsFormWTNameCount);
// console.log('componentsForm - web-components waar er geen web-type voor gespecifieerd is', componentsFormWCWithoutWT);
// console.log('componentsForm - web-types waar er geen web-component voor bestaat', componentsFormWTWithoutWC);
