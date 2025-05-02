import { extractComponentsComplianceWCNames } from './extract-wc-names';
import { extractComponentsComplianceWTNames } from './extract-wt-names';

const componentsComplianceWCNames = extractComponentsComplianceWCNames();
const componentsComplianceWTNames = extractComponentsComplianceWTNames();

export const componentsComplianceWCNameCount = componentsComplianceWCNames.length;
export const componentsComplianceWTNameCount = componentsComplianceWTNames.length;
export const componentsComplianceWCWithoutWT = componentsComplianceWCNames.filter((name) => !componentsComplianceWTNames.includes(name));
export const componentsComplianceWTWithoutWC = componentsComplianceWTNames.filter((name) => !componentsComplianceWCNames.includes(name));

// console.log('componentsCompliance - aantal web-components:', componentsComplianceWCNameCount);
// console.log('componentsCompliance - aantal web-types:', componentsComplianceWTNameCount);
// console.log('componentsCompliance - web-components waar er geen web-type voor gespecifieerd is', componentsComplianceWCWithoutWT);
// console.log('componentsCompliance - web-types waar er geen web-component voor bestaat', componentsComplianceWTWithoutWC);
