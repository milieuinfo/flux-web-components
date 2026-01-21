import { css, CSSResult } from 'lit';

export const vlAccordionFluxStyles: CSSResult = css`
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

    .vl-accordion__subtitle {
        margin-left: 22px;
        padding-left: 0.4rem;
    }

    .vl-accordion__button-container {
        display: flex;
    }

    .js-vl-accordion--open vl-icon#toggle-icon::part(icon)::before {
        transform: rotate(-180deg);
    }

    .vl-accordion__icon {
        flex: 0 0 22px;
        flex-shrink: 0;
        top: 0;
        align-self: center;
    }
`;
