import zLayerRawCss from './vl-z-layer.raw.css?raw';
import { css, CSSResult, unsafeCSS } from 'lit';

export const vlZLayerVars: CSSResult = css`
    ${unsafeCSS(zLayerRawCss)}
`;
