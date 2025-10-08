import { css, CSSResult } from 'lit';

export const vlModalFluxStyles: CSSResult = css`
    :host([allow-overflow]) dialog,
    :host([allow-overflow]) dialog .vl-modal-dialog__wrapper {
        overflow: visible;
    }

    :host .vl-modal-dialog--full-screen .vl-modal-dialog__wrapper,
    :host .vl-modal-dialog--left .vl-modal-dialog__wrapper,
    :host .vl-modal-dialog--right .vl-modal-dialog__wrapper {
        height: 100%;
    }

    .vl-modal-dialog__close {
        cursor: pointer;
    }

    .vl-modal-dialog--full-screen {
        left: 0;
        right: 0;
        top: 0px;
        transform: initial;
        max-height: initial;
        max-width: initial;
        height: 100vh;
        width: 100vw;
    }
`;
