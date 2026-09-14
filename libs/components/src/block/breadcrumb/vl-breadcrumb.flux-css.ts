import { vlFocusOutlineMixin } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlBreadcrumbFluxStyles: CSSResult = css`
    /*
     * ellipsis: breadcrumb items blijven op één regel en worden nooit breder dan de beschikbare breedte.
     * De cta zit in de shadow root van vl-breadcrumb-item; de interne custom properties erven via de flattened tree
     * door tot daar, ook wanneer een vl-breadcrumb-item in een ander element gewikkeld is.
     */
    :host([ellipsis]) {
        --vl-breadcrumb-item-cta-display: block;
        /* een button rekt niet mee met zijn container en blijft anders even breed als zijn tekst */
        --vl-breadcrumb-item-cta-max-width: 100%;
        --vl-breadcrumb-item-cta-overflow: hidden;
        --vl-breadcrumb-item-cta-text-overflow: ellipsis;
    }

    :host([ellipsis]) .vl-breadcrumb__list {
        min-width: 0;
    }

    :host([ellipsis]) .vl-breadcrumb__list__item {
        min-width: 0;
        max-width: 100%;
        white-space: nowrap;
    }

    :host([ellipsis]) ::slotted(*) {
        min-width: 0;
        max-width: 100%;
    }

    .vl-breadcrumb__list__item__cta {
        display: var(--vl-breadcrumb-item-cta-display, flex);
        max-width: var(--vl-breadcrumb-item-cta-max-width, none);
        overflow: var(--vl-breadcrumb-item-cta-overflow, visible);
        text-overflow: var(--vl-breadcrumb-item-cta-text-overflow, clip);
        position: relative;
        top: -1px;
    }

    .vl-breadcrumb__list__item__cta:focus-visible {
        ${vlFocusOutlineMixin()};
    }

    button.vl-breadcrumb__list__item__cta {
        background: none;
        border: none;
        color: var(--vl-color--action);
        cursor: pointer;
        font: inherit;
        padding: 0;
        text-decoration: underline;
    }

    /* het laatste (huidige) item is geen link of button en krijgt de subtiele tekstkleur (pale sky 70) */
    span.vl-breadcrumb__list__item__cta {
        color: var(--vl-color--text-subtle);
        cursor: default;
        text-decoration: none;
    }

    span.vl-breadcrumb__list__item__cta:hover {
        text-decoration: none;
    }

    .vl-breadcrumb__list__item__separator {
        justify-content: center;
    }
`;
