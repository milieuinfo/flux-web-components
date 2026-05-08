import { css, CSSResult } from 'lit';

export const vlAccordionFluxStyles: CSSResult = css`
    :host(.vl-accordion--bold) .vl-accordion__title,
    :host(.vl-accordion--bold) .vl-accordion__icon::before {
        font-weight: 700;
    }

    :host(.vl-accordion--disabled) .vl-toggle {
        cursor: not-allowed;
        text-decoration: none;
    }
    :host(.vl-accordion--disabled) .vl-accordion__title,
    :host(.vl-accordion--disabled) .vl-accordion__icon::before {
        color: #687483;
    }

    :host(.vl-accordion--alt-background) {
        display: block;
        background-color: var(--vl-color--background-alt, #f7f9fc);
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

        > h1,
        > h2,
        > h3,
        > h4,
        > h5,
        > h6 {
            flex: 1;
        }
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
