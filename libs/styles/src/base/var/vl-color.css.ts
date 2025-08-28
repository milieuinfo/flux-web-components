import colorRawCss from './vl-color.raw.css?raw';
import { CSSResult, css, unsafeCSS } from 'lit';

export const vlColorVars: CSSResult = css`
    ${unsafeCSS(colorRawCss)}
`;
