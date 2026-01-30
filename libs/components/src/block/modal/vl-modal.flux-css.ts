import { css, CSSResult } from 'lit';

export const vlModalFluxStyles: CSSResult = css`
    :host([allow-overflow]) dialog,
    :host([allow-overflow]) dialog .vl-modal-dialog__wrapper {
        overflow: visible;
    }

    :host .vl-modal-dialog[open]:focus,
    :host .vl-modal-dialog.vl-modal-dialog--opened:focus {
        outline: 3px solid color-mix(in srgb, var(--vl-color--border-action-subtle) 70%, transparent);
        outline-offset: -3px;
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
