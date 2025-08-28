import { CSSResult, css, unsafeCSS } from 'lit';
import spacingRawCss from './vl-spacing.raw.css?raw';

export const vlSpacingVars: CSSResult = css`
    ${unsafeCSS(spacingRawCss)}
`;
