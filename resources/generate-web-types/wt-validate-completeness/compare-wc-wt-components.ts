import { extractComponentWCNames } from './extract-wc-names';
import { extractComponentWTNames } from './extract-wt-names';

const componentWCNames = extractComponentWCNames();
const componentWTNames = extractComponentWTNames();
const componentWCDeprecated = [
    'vl-http-400-message',
    'vl-http-401-message',
    'vl-http-403-message',
    'vl-http-404-message',
    'vl-http-405-message',
    'vl-http-408-message',
    'vl-http-410-message',
    'vl-http-411-message',
    'vl-http-412-message',
    'vl-http-413-message',
    'vl-http-414-message',
    'vl-http-415-message',
    'vl-http-500-message',
    'vl-http-501-message',
    'vl-http-502-message',
    'vl-http-503-message',
    'vl-http-504-message',
    'vl-http-505-message',
    'vl-http-506-message',
];
const componentWCMismatch = [
    'vl-cascader-next', // in next folder - verwacht een -next suffix, maar deze component heeft die niet
    'vl-cascader-item-next', // in next folder - verwacht een -next suffix, maar deze component heeft die niet
    'vl-all-icons-next', // is een demo component, niet bedoeld om af te nemen
];
const componentWTMismatch = [
    'vl-cascader', // in next folder - verwacht een -next suffix, maar die is er niet voor deze component
    'vl-cascader-item', // in next folder - verwacht een -next suffix, maar die is er niet voor deze component
];

export const componentWCNameCount = componentWCNames.length;
export const componentWTNameCount = componentWTNames.length;
export const componentWCWithoutWT = componentWCNames.filter(
    (name) =>
        !componentWCDeprecated.includes(name) && !componentWCMismatch.includes(name) && !componentWTNames.includes(name)
);
export const componentWTWithoutWC = componentWTNames.filter(
    (name) => !componentWTMismatch.includes(name) && !componentWCNames.includes(name)
);

// console.log('components - aantal web-components:', componentWCNameCount);
// console.log('components - aantal web-types:', componentWTNameCount);
// console.log('components - web-components waar er geen web-type voor gespecifieerd is', componentWCWithoutWT);
// console.log('components - web-types waar er geen web-component voor bestaat', componentWTWithoutWC);
