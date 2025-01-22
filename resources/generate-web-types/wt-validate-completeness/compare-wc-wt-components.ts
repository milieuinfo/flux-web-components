import { extractComponentWCNames } from './extract-wc-names';
import { extractComponentWTNames } from './extract-wt-names';

const componentWCNames = extractComponentWCNames();
const componentWTNames = extractComponentWTNames();
const componentWCIgnore = [
    'vl-side-navigation-title-next', // base class
];
const componentWCMismatch = [
    'vl-cascader-next', // in next folder - verwacht een -next suffix, maar deze component heeft die niet
    'vl-cascader-item-next', // in next folder - verwacht een -next suffix, maar deze component heeft die niet
    'vl-all-icons-next', // is een demo component, niet bedoeld om af te nemen
];
const componentWTMismatch = [
    'vl-cascader', // in next folder - verwacht een -next suffix, maar die is er niet voor deze component
    'vl-cascader-item', // in next folder - verwacht een -next suffix, maar die is er niet voor deze component
    'vl-side-navigation-h1-next', // in vl-side-navigation-title.component.ts
    'vl-side-navigation-h2-next', // in vl-side-navigation-title.component.ts
    'vl-side-navigation-h3-next', // in vl-side-navigation-title.component.ts
    'vl-side-navigation-h4-next', // in vl-side-navigation-title.component.ts
    'vl-side-navigation-h5-next', // in vl-side-navigation-title.component.ts
    'vl-side-navigation-h6-next', // in vl-side-navigation-title.component.ts
];

export const componentWCNameCount = componentWCNames.length;
export const componentWTNameCount = componentWTNames.length;
export const componentWCWithoutWT = componentWCNames.filter(
    (name) =>
        !componentWCIgnore.includes(name) &&
        !componentWCMismatch.includes(name) &&
        !componentWTNames.includes(name)
);
export const componentWTWithoutWC = componentWTNames.filter(
    (name) => !componentWTMismatch.includes(name) && !componentWCNames.includes(name)
);

// console.log('components - aantal web-components:', componentWCNameCount);
// console.log('components - aantal web-types:', componentWTNameCount);
// console.log('components - web-components waar er geen web-type voor gespecifieerd is', componentWCWithoutWT);
// console.log('components - web-types waar er geen web-component voor bestaat', componentWTWithoutWC);
