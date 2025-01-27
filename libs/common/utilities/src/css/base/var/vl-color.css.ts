import colorRawCss from '!!raw-loader!./vl-color.raw.css';
import { CSSResult, css, unsafeCSS } from 'lit';

export const vlColorVars: CSSResult = css`
    ${unsafeCSS(colorRawCss)}
`;
