import { vlFocusOutlineMixin, vlMediaScreenExtraSmall, vlMediaScreenSmall } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlAccordionFluxStyles: CSSResult = css`
    :host {
        display: block;
    }

    :host([alt-background]) {
        background-color: var(--vl-color--background-subtle);
    }

    .accordion__header {
        display: flex;
    }

    .accordion__heading {
        flex: 1;
    }

    .accordion__trigger {
        display: flex;
        align-items: center;
        position: relative;
        overflow: hidden;
        width: 100%;
        padding: 0;
        border: 0;
        border-radius: 0;
        background-color: transparent;
        appearance: none;
        font-family: inherit;
        font-size: inherit;
        font-weight: 500;
        line-height: inherit;
        text-align: left;
        text-decoration: none;
        word-break: break-word;
        color: var(--vl-color--action);
        cursor: pointer;

        &:hover,
        &:focus,
        &:active {
            text-decoration: underline;
        }

        &:hover {
            color: var(--vl-color--action-hover);
        }

        &:focus,
        &:active {
            color: var(--vl-color--action-active);
        }

        &:focus-visible {
            ${vlFocusOutlineMixin()};
        }

        &:disabled {
            color: var(--vl-color--text-subtle);
            text-decoration: none;
            cursor: not-allowed;
        }
    }

    .accordion__icon,
    .accordion__custom-icon {
        flex: 0 0 22px;
        align-self: center;
        padding-right: 0.4rem;
        line-height: 1;
        color: inherit;
    }

    .accordion--has-icon .accordion__icon {
        order: 2;
        margin-left: auto;
        padding-right: 0;
        padding-left: 0.4rem;
    }

    .accordion--open .accordion__icon::part(icon)::before {
        transform: rotate(-180deg);
    }

    .accordion__title {
        font-size: var(--vl-font-size--large);
    }

    :host([bold]) .accordion__title {
        font-weight: 700;
    }

    .accordion__subtitle {
        margin-top: 5px;
        margin-left: 22px;
        padding-left: 0.4rem;
    }

    .accordion__content {
        position: relative;
    }

    .accordion__panel {
        padding: 2.2rem;
    }

    @media screen and (max-width: ${vlMediaScreenSmall}px) {
        .accordion__title {
            font-size: var(--vl-font-size);
        }
    }

    @media screen and (max-width: ${vlMediaScreenExtraSmall}px) {
        .accordion__panel {
            padding: var(--vl-spacing--xsmall);
        }
    }
`;
