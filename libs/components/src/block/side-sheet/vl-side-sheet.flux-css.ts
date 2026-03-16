import { css, CSSResult } from 'lit';
import { vlLegacyStyles } from '@domg-wc/styles';

// deze css is gegenereerd uit de oude custom scss
export const vlSideSheetFluxStyles: CSSResult = css`
    .vl-vi::before,
    .vl-vi::after {
        font-family: 'vlaanderen-icon' !important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-style: normal;
        font-variant: normal;
        font-weight: normal;
        text-decoration: none;
        text-transform: none;
        display: inline-block;
        vertical-align: middle;
    }

    .vl-vi.vl-vi-u-180deg::before {
        display: inline-block;
        transform: rotate(180deg);
        vertical-align: middle;
    }

    .vl-vi-u-xs::before {
        font-size: 0.8rem;
    }

    .vl-vi-u-s::before {
        font-size: 1.3rem;
    }

    .vl-vi-u-m::before {
        font-size: 1.7rem;
    }

    .vl-vi-u-l::before {
        font-size: 2rem;
    }

    .vl-vi-u-xl::before {
        font-size: 2.2rem;
    }

    .vl-vi-u-90deg::before {
        display: inline-block;
        transform: rotate(90deg);
    }

    .vl-vi-u-180deg::before {
        display: inline-block;
        transform: rotate(180deg);
    }

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
        padding-top: 43px;
        /*
            UIG-3004: z-index op dit niveau verwijderd, de z-index staat ook al op de host.
            Zoek andere oplossing indien dit voor problemen zorgt.
        */
        /* z-index: 2; */
        background: white;
        overflow: auto;
        /* Shadow/Large uit Figma [VL] Foundations */
        box-shadow: 0px 10px 50px 0px #6a768659;
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
        top: calc(1rem + 43px);
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

    @media screen and (max-width: 767px) {
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

    @media screen and (max-width: 767px) {
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
