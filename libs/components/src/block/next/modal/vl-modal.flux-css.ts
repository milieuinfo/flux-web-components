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

    /* Verwijder transform-gebaseerde centering van de center modal.
       De <dialog> met showModal() wordt automatisch gecentreerd door de browser
       via de UA stylesheet (margin: auto op de ::backdrop pseudo-element).

       govflanders-style gebruikt: top: 50%; left: 50%; margin: 0; transform: translate(-50%, -50%).
       Dit veroorzaakt problemen voor position: fixed en CSS Anchor Positioning in child elementen,
       omdat transform een nieuw containing block creëert.

       De fix: alle vier properties overschrijven naar de browser defaults voor <dialog>. */
    .vl-modal-dialog:not(.vl-modal-dialog--full-screen):not(.vl-modal-dialog--left):not(.vl-modal-dialog--right) {
        transform: none;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        max-height: 85vh;
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
