import vlGeneralRawCss from './vl-general.raw.css?raw';
import { css, CSSResult, unsafeCSS } from 'lit';

export const vlGeneralVars: CSSResult = css`
    ${unsafeCSS(vlGeneralRawCss)}
`;
