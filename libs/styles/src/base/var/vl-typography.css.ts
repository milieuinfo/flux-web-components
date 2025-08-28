import typographyRawCss from './vl-typography.raw.css?raw';
import { css, CSSResult, unsafeCSS } from 'lit';

export const vlTypographyVars: CSSResult = css`
    ${unsafeCSS(typographyRawCss)}
`;
