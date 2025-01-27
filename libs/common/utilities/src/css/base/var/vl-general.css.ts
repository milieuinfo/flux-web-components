import vlGeneralRawCss from '!!raw-loader!./vl-general.raw.css';
import { css, CSSResult, unsafeCSS } from 'lit';

export const vlGeneralVars: CSSResult = css`
    ${unsafeCSS(vlGeneralRawCss)}
`;
