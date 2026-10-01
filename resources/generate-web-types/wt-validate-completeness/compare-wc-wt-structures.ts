import { extractStructuresWCNames } from './extract-wc-names';
import { extractStructuresWTNames } from './extract-wt-names';

const structuresWCNames = extractStructuresWCNames();
const structuresWTNames = extractStructuresWTNames();

export const structuresWCNameCount = structuresWCNames.length;
export const structuresWTNameCount = structuresWTNames.length;
export const structuresWCWithoutWT = structuresWCNames.filter((name) => !structuresWTNames.includes(name));
export const structuresWTWithoutWC = structuresWTNames.filter((name) => !structuresWCNames.includes(name));
