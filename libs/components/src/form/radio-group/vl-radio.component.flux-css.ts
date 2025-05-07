import { css, CSSResult } from 'lit';

export const vlRadioComponentFluxStyles: CSSResult = css`
    .vl-radio--disabled .vl-radio__toggle:checked + .vl-radio__label::before {
        background-color: #fff;
    }
    .vl-radio__toggle:read-only + .vl-radio__label::before {
        pointer-events: none !important;
    }
`;
