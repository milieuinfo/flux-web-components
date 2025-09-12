import componentsRawCss from '!!raw-loader!./vl-components.raw.css';
import { css, CSSResult, unsafeCSS } from 'lit';

export const vlComponentVars: CSSResult = css`
    ${unsafeCSS(componentsRawCss)}
`;
