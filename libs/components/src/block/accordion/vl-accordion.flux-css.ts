import { css, CSSResult } from 'lit';

export const vlAccordionFluxStyles: CSSResult = css`
    /* Host-level attribute styles */
    :host([bold]) .vl-accordion__title,
    :host([bold]) .vl-accordion__icon::before {
        font-weight: 700;
    }

    :host([disabled]) .vl-toggle {
        cursor: not-allowed;
        text-decoration: none;
    }
    :host([disabled]) .vl-accordion__title,
    :host([disabled]) .vl-accordion__icon::before {
        color: #687483;
    }

    /* Base accordion styles */
    .js-vl-accordion {
        position: relative;
    }

    .js-vl-accordion--flex-reverse {
        display: flex;
        flex-direction: column-reverse;
    }

    .vl-accordion:not(.js-vl-accordion--open) .vl-accordion__content {
        display: none;
    }

    .vl-accordion.vl-accordion--has-icon #toggle-icon,
    .vl-accordion.vl-accordion--has-icon .vl-vi-arrow-right-fat {
        order: 2;
        margin-left: auto;
        padding-right: 0;
        padding-left: 0.4rem;
    }

    .vl-accordion__button-container {
        display: flex;
    }

    .js-vl-accordion--open vl-icon#toggle-icon::part(icon)::before {
        transform: rotate(-180deg);
    }

    /* Accordion list styles */
    .vl-accordion-list--bordered .vl-accordion-list__item {
        padding: 3rem 0;
        border-bottom: 1px solid #cbd2da;
        margin-bottom: 0;
    }

    @media screen and (max-width: 1023px) {
        .vl-accordion-list--bordered .vl-accordion-list__item {
            padding: 2rem 0;
        }
    }

    @media screen and (max-width: 767px) {
        .vl-accordion-list--bordered .vl-accordion-list__item {
            padding: 1.5rem 0;
        }
    }

    .vl-accordion-list--bordered .vl-accordion-list__item:first-child {
        border-top: 1px solid #cbd2da;
    }

    .vl-accordion-list__item {
        margin-bottom: 10px;
    }

    .vl-accordion-list__item .vl-accordion-list--bordered {
        margin-bottom: 0;
    }

    /* Accordion icon */
    .vl-accordion__icon {
        flex: 0 0 22px;
        flex-shrink: 0;
        top: 0;
        align-self: center;
    }

    /* Accordion title */
    .vl-accordion__title {
        font-size: 20px;
    }

    @media screen and (max-width: 767px) {
        .vl-accordion__title {
            font-size: 18px;
        }
    }

    /* Accordion subtitle */
    .vl-accordion__subtitle {
        margin-top: 5px;
        margin-left: 22px;
        padding: 0 0 0 0.4rem;
    }

    /* Accordion summary */
    .vl-accordion__summary {
        position: relative;
    }

    .vl-accordion__summary:focus {
        box-shadow: 0 0 0 2px #fff, 0 0 0 5px rgba(0, 85, 204, 0.65);
        outline: transparent solid 0.2rem;
    }

    @supports (outline-offset: 2px) {
        .vl-accordion__summary:focus {
            box-shadow: none;
            outline: 3px solid rgba(0, 85, 204, 0.65);
            outline-offset: 2px;
        }
    }

    .vl-accordion__summary--no-toggle .vl-accordion__toggle {
        border: none;
        padding: 0px;
    }

    .vl-accordion__summary--no-toggle .vl-accordion__subtitle {
        padding: 0;
    }

    /* Accordion content */
    .vl-accordion__content {
        position: relative;
    }

    .js .vl-accordion__content {
        visibility: hidden;
        max-height: 0;
    }

    .js .js-vl-accordion--open > .vl-accordion__content {
        visibility: visible;
        max-height: none;
    }

    /* Accordion image container */
    .vl-accordion__image-container .vl-image--full-width {
        margin-left: -2.2rem;
        width: calc(100% + 2.2rem * 2);
        max-width: calc(100% + 2.2rem * 2);
        margin-top: -2.2rem;
        margin-bottom: 2.2rem;
        max-height: 19rem;
        object-fit: cover;
    }

    @media screen and (max-width: 767px) {
        .vl-accordion__image-container .vl-image--full-width {
            margin-left: -1rem;
            width: calc(100% + 1rem * 2);
            max-width: calc(100% + 1rem * 2);
            margin-top: -1rem;
            margin-bottom: 1rem;
        }
    }

    /* Accordion footer */
    .vl-accordion__footer {
        min-height: 6px;
        border: 0;
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 6.04 5.99'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23bec5cf;%7D%3C/style%3E%3C/defs%3E%3Ctitle%3EAsset 1%3C/title%3E%3Cg id='Layer_2' data-name='Layer 2'%3E%3Cg id='Layer_1-2' data-name='Layer 1'%3E%3Crect class='cls-1' x='1.01' y='3.99' width='1.01' height='1'/%3E%3Crect class='cls-1' y='4.99' width='1.01' height='1'/%3E%3Crect class='cls-1' x='3.02' y='2' width='1.01' height='1'/%3E%3Crect class='cls-1' x='2.01' y='2.99' width='1.01' height='1'/%3E%3Crect class='cls-1' x='5.04' width='1.01' height='1'/%3E%3Crect class='cls-1' x='4.03' y='1' width='1.01' height='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
            repeat-x;
        background-size: 6px 6px;
        padding: 3rem 0;
    }

    @media screen and (max-width: 767px) {
        .vl-accordion__footer {
            padding: 1.5rem 0;
        }
    }

    .vl-accordion-list--bordered .vl-accordion__footer {
        padding-bottom: 0;
    }

    /* Accordion panel */
    .vl-accordion__panel {
        padding: 2.2rem;
    }

    @media screen and (max-width: 500px) {
        .vl-accordion__panel {
            padding: 1rem;
        }
    }

    .vl-accordion__panel--xsmall {
        padding: 1rem;
    }

    .vl-accordion__panel--alt {
        margin-top: 1rem;
        background-color: #f7f9fc;
        padding-top: 2.2rem;
    }

    @media screen and (max-width: 767px) {
        .vl-accordion__panel--alt {
            padding: 1rem;
        }
    }

    .vl-accordion__panel--no-indent {
        padding-left: 0;
        padding-right: 0;
    }

    .vl-accordion__panel--overflow {
        overflow: auto;
    }

    .vl-accordion-list--bordered .vl-accordion__panel:not(.vl-accordion__panel--with-footer) {
        padding-bottom: 0;
    }
`;
