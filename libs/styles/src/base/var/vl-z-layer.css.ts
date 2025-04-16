import zLayerRawCss from '!!raw-loader!./vl-z-layer.raw.css';
import { css, CSSResult, unsafeCSS } from 'lit';

export const vlZLayerVars: CSSResult = css`
    ${unsafeCSS(zLayerRawCss)}
`;
