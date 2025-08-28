import componentsRawCss from './vl-components.raw.css?raw';
import { css, CSSResult, unsafeCSS } from 'lit';

export const vlComponentVars: CSSResult = css`
    ${unsafeCSS(componentsRawCss)}
`;
