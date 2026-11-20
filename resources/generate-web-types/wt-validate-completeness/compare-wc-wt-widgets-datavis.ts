import { extractWidgetsDatavisWCNames } from './extract-wc-names';
import { extractWidgetsDatavisWTNames } from './extract-wt-names';

const widgetsDatavisWCNames = extractWidgetsDatavisWCNames();
const widgetsDatavisWTNames = extractWidgetsDatavisWTNames();

export const widgetsDatavisWCNameCount = widgetsDatavisWCNames.length;
export const widgetsDatavisWTNameCount = widgetsDatavisWTNames.length;
export const widgetsDatavisWCWithoutWT = widgetsDatavisWCNames.filter((name) => !widgetsDatavisWTNames.includes(name));
export const widgetsDatavisWTWithoutWC = widgetsDatavisWTNames.filter((name) => !widgetsDatavisWCNames.includes(name));
