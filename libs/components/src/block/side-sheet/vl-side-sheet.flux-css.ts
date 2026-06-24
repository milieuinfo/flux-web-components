import { vlFocusOutlineMixin, vlMediaScreenSmall } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

// deze css is gegenereerd uit de oude custom scss
export const vlSideSheetFluxStyles: CSSResult = css`
    :host {
        position: fixed;
        top: 0px;
        right: 0px;
        z-index: var(--vl-z-layer--side-sheet);
        width: var(--vl-side-sheet-width, 33.3333333333%);
    }

    :host #vl-side-sheet {
        position: absolute;
        display: none;
        width: 100%;
        height: 100%;
        padding-top: var(--vl-side-sheet-top, 43px);
        background: white;
        overflow-y: auto;

        &:focus-visible {
            ${vlFocusOutlineMixin()};
            outline-offset: -3px;
        }

        &,
        &:focus {
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
        }

        &.vl-side-sheet--large-shadow,
        &.vl-side-sheet--large-shadow:focus {
            /* Shadow/Large uit Figma [VL] Foundations */
            box-shadow: 0px 10px 50px 0px #6a768659;
        }
    }

    :host #vl-side-sheet .vl-content-block {
        min-width: auto;
    }

    :host #vl-side-sheet-backdrop {
        display: none;
    }

    :host #vl-side-sheet-toggle-text {
        white-space: nowrap;
    }

    :host .vl-side-sheet__toggle {
        position: absolute;
        top: calc(1rem + var(--vl-side-sheet-top, 43px));
        right: 0px;
        background-color: white !important;
        color: #333332 !important;
        cursor: pointer !important;
        z-index: 1;
    }

    :host .vl-side-sheet__toggle::part(button) {
        border: 1px solid #cbd2da !important;
        border-right-width: 0px !important;
        border-radius: 0.3rem 0px 0px 0.3rem;
        min-width: 3.5rem;
        padding: 0;
    }

    :host([toggle-text]) .vl-side-sheet__toggle::part(button) {
        padding: 0 1rem;
    }

    :host(.vl-side-sheet--left) {
        right: initial;
        left: 0;
    }

    :host(.vl-side-sheet--left) .vl-side-sheet__toggle {
        right: initial;
        left: 0px;
    }

    :host(.vl-side-sheet--left) .vl-side-sheet__toggle::part(button) {
        border-right-width: 1px !important;
        border-left-width: 0px !important;
        border-radius: 0px 0.3rem 0.3rem 0px;
    }

    :host([open]) {
        height: 100%;
        z-index: var(--vl-z-layer--side-sheet-open);
    }

    @media screen and (max-width: ${vlMediaScreenSmall}px) {
        :host([open]) {
            width: var(--vl-side-sheet-width-mobile, calc(100vw - 56px));
        }
    }

    :host([open]) #vl-side-sheet {
        display: block;
    }

    :host([open]) #vl-side-sheet-backdrop {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(2px);
    }

    @media screen and (max-width: ${vlMediaScreenSmall}px) {
        :host([open]) #vl-side-sheet-backdrop {
            display: block;
        }
    }

    :host([open]) .vl-side-sheet__toggle {
        right: 100%;
    }

    :host(.vl-side-sheet--left[open]) .vl-side-sheet__toggle {
        right: initial;
        left: 100%;
    }

    :host(.vl-side-sheet--absolute) {
        position: absolute;
    }

    :host(.vl-side-sheet--absolute) #vl-side-sheet {
        padding-top: 0px;
        padding: 15px;
    }

    :host(.vl-side-sheet--absolute) .vl-side-sheet__toggle {
        top: 1rem;
    }

    :host(.vl-side-sheet--absolute) .vl-side-sheet__toggle::part(button) {
        border-left-width: 1px !important;
        border-right-width: 1px !important;
    }

    :host(.vl-side-sheet--absolute.vl-side-sheet--left) {
        right: initial;
        left: 0px;
    }

    :host(.vl-side-sheet--absolute[open]) .vl-side-sheet__toggle::part(button) {
        border-right-width: 0px !important;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
    }

    :host(.vl-side-sheet--absolute.vl-side-sheet--left[open]) .vl-side-sheet__toggle::part(button) {
        border-right-width: 1px !important;
        border-left-width: 0px !important;
        border-radius: 0px 0.3rem 0.3rem 0px;
    }
`;
