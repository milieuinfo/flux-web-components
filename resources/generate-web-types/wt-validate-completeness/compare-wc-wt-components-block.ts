import { extractComponentsBlockWCNames } from './extract-wc-names';
import { extractComponentsBlockWTNames } from './extract-wt-names';

const componentsBlockWCNames = extractComponentsBlockWCNames();
const componentsBlockWTNames = extractComponentsBlockWTNames();
const componentsBlockWCIgnore = [
    'vl-side-navigation-title', // base class
];
const componentsBlockWCMismatch = [
    'vl-cascader', // in next folder - verwacht een  suffix, maar deze componentsBlock heeft die niet
    'vl-cascader-item', // in next folder - verwacht een  suffix, maar deze componentsBlock heeft die niet
];
const componentsBlockWTMismatch = [
    'vl-cascader', // in next folder - verwacht een  suffix, maar die is er niet voor deze componentsBlock
    'vl-cascader-item', // in next folder - verwacht een  suffix, maar die is er niet voor deze componentsBlock
    'vl-side-navigation-h1', // in vl-side-navigation-title.componentsBlock.ts
    'vl-side-navigation-h2', // in vl-side-navigation-title.componentsBlock.ts
    'vl-side-navigation-h3', // in vl-side-navigation-title.componentsBlock.ts
    'vl-side-navigation-h4', // in vl-side-navigation-title.componentsBlock.ts
    'vl-side-navigation-h5', // in vl-side-navigation-title.componentsBlock.ts
    'vl-side-navigation-h6', // in vl-side-navigation-title.componentsBlock.ts
];

export const componentsBlockWCNameCount = componentsBlockWCNames.length;
export const componentsBlockWTNameCount = componentsBlockWTNames.length;
export const componentsBlockWCWithoutWT = componentsBlockWCNames.filter(
    (name) =>
        !componentsBlockWCIgnore.includes(name) && !componentsBlockWCMismatch.includes(name) && !componentsBlockWTNames.includes(name)
);
export const componentsBlockWTWithoutWC = componentsBlockWTNames.filter(
    (name) => !componentsBlockWTMismatch.includes(name) && !componentsBlockWCNames.includes(name)
);

// console.log('componentsBlocks - aantal web-componentsBlocks:', componentsBlockWCNameCount);
// console.log('componentsBlocks - aantal web-types:', componentsBlockWTNameCount);
// console.log('componentsBlocks - web-componentsBlocks waar er geen web-type voor gespecifieerd is', componentsBlockWCWithoutWT);
// console.log('componentsBlocks - web-types waar er geen web-componentsBlock voor bestaat', componentsBlockWTWithoutWC);
