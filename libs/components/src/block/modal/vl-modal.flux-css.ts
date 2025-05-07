import { css, CSSResult } from 'lit';

export const vlModalFluxStyles: CSSResult = css`
    :host([allow-overflow]) dialog,
    :host([allow-overflow]) dialog .vl-modal-dialog__wrapper {
        overflow: visible;
    }

    .vl-modal-dialog__close {
        cursor: pointer;
    }
`;
