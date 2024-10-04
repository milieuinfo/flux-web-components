import { CSSResult, css, unsafeCSS } from 'lit';
import spacingRawCss from '!!raw-loader!./vl-spacing.raw.css';

export const vlSpacingStyles: CSSResult = css`
    ${unsafeCSS(spacingRawCss)}
`;
