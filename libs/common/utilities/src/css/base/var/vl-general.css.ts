import vlGeneralRawCss from '!!raw-loader!./vl-general.raw.css';
import { css, CSSResult, unsafeCSS } from 'lit';

export const vlGeneralStyles: CSSResult = css`
    ${unsafeCSS(vlGeneralRawCss)}
`;
