import { extractComponentsAtomWCNames } from './extract-wc-names';
import { extractComponentsAtomWTNames } from './extract-wt-names';

const componentsAtomWCNames = extractComponentsAtomWCNames();
const componentsAtomWTNames = extractComponentsAtomWTNames();

const componentsAtomWCMismatch = [
    'vl-all-icons', // is een demo componentsBlock, niet bedoeld om af te nemen
];

export const componentsAtomWCNameCount = componentsAtomWCNames.length;
export const componentsAtomWTNameCount = componentsAtomWTNames.length;
export const componentsAtomWCWithoutWT = componentsAtomWCNames.filter(
    (name) => !componentsAtomWTNames.includes(name) && !componentsAtomWCMismatch.includes(name)
);
export const componentsAtomWTWithoutWC = componentsAtomWTNames.filter((name) => !componentsAtomWCNames.includes(name));

// console.log('componentsAtoms - aantal web-components:', componentsAtomWCNameCount);
// console.log('componentsAtoms - aantal web-types:', componentsAtomWTNameCount);
// console.log('componentsAtoms - web-components waar er geen web-type voor gespecifieerd is', componentsAtomWCWithoutWT);
// console.log('componentsAtoms - web-types waar er geen web-component voor bestaat', componentsAtomWTWithoutWC);
