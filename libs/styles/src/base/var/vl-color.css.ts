import { CSSResult, css, unsafeCSS } from 'lit';
import colorDomgRawCss from './vl-color-domg.raw.css?raw';
import colorFoundationV2RawCss from './vl-color-foundation-v2.raw.css?raw';
import colorRawCss from './vl-color.raw.css?raw';

// De kleuren uit de re-designs overschrijven de oude kleuren indien er een conflict is.
// De volgorde hieronder is dus belangrijk.
export const vlColorVars: CSSResult = css`
    ${unsafeCSS(colorRawCss)}
    ${unsafeCSS(colorFoundationV2RawCss)}
    ${unsafeCSS(colorDomgRawCss)}
`;

export const colorVarsCssString = `
${colorRawCss}
${colorFoundationV2RawCss}
${colorDomgRawCss}
`.trim();
