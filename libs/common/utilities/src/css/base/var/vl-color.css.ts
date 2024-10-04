import colorRawCss from '!!raw-loader!./vl-color.raw.css';
import { CSSResult, css, unsafeCSS } from 'lit';

export const vlColorStyles: CSSResult = css`
    ${unsafeCSS(colorRawCss)}
`;
