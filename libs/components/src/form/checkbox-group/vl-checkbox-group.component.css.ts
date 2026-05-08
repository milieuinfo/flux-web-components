import { css, CSSResult } from 'lit';

export const vlCheckboxGroupComponentStyles: CSSResult = css`
    .vl-u-visually-hidden {
        position: absolute !important;
        height: 1px;
        width: 1px;
        overflow: hidden;
        clip: rect(1px, 1px, 1px, 1px);
        margin: -1px;
        padding: 0;
        border: 0;
        left: 0;
        top: 0;
    }
`;
