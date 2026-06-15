import { vlMediaScreenSmall } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlStepFluxStyles: CSSResult = css`
    :host(:not(:first-child)) {
        display: block;
        margin-top: 5rem;

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            margin-top: 2rem;
        }
    }
    :host(:last-child) .vl-step--timeline-simple::before {
        bottom: 0;
    }

    /* BEM Block */
    .vl-step {
        position: relative;
        margin-left: 7rem;

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            margin-left: 5rem;
        }
    }

    /* BEM Elements */
    .vl-step__content {
        p + p {
            margin-top: 1rem;
        }

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            font-size: 1.6rem;
        }
    }

    .vl-step__header {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        border: 0;
        padding: 0.4rem 0 1rem 0;
        text-align: left;
        text-decoration: none;
        font-size: 1.8rem;
        position: relative;
        z-index: 1;
        gap: var(--vl-spacing--xsmall);

        & ~ .vl-step__content-wrapper .vl-step__content {
            margin-top: 0.5rem;
        }

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            font-size: 1.6rem;
        }
    }

    .vl-step__title {
        font-size: 2.2rem;
        font-weight: 500;
        line-height: 1.36;
        margin-bottom: 0;
        padding-top: 0.4rem;

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            font-size: 2rem;
            margin-bottom: 0;
            padding-top: 0;
        }
    }

    .vl-step__title__annotation {
        font-size: 1.4rem;
        font-weight: 400;

        &::before {
            content: '-';
            margin: 0 0.5rem;
        }
    }

    .vl-step__subtitle {
        font-weight: 400;
        font-size: 1.8rem;
        color: var(--vl-color--text-subtle);

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            font-size: 1.6rem;
        }
    }

    .vl-step__icon {
        display: flex;
        place-items: center;
        place-content: center;
        position: absolute;
        font-size: 2rem;
        font-weight: 500;
        line-height: 4.2rem;
        width: 4.2rem;
        height: 4.2rem;
        border-radius: 50%;
        text-align: center;
        left: 0;
        transform: translateX(-7rem);

        /* --vl-theme-.. colors are deprecated, but leaving it in for backwards compatibility */
        background-color: var(--vl-theme-accent-color, var(--vl-color--primary));
        color: var(--vl-theme-accent-fg-color, var(--vl-color--icon-default));

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            font-size: 1.8rem;
            width: 3.5rem;
            height: 3.5rem;
            line-height: 3.5rem;
            left: 0;
            transform: translateX(-5rem);
        }
    }

    .vl-step__icon__sub {
        display: block;
        font-size: 1.4rem;
        font-weight: initial;
    }

    .vl-step__duration-list {
        margin-left: -6.9rem;

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            margin-left: -4.9rem;
        }
    }

    /* BEM Modifiers */
    .vl-step--accordion {
        .vl-step__header {
            flex-wrap: nowrap;

            &:hover .vl-step__title {
                text-decoration: underline;
            }

            &[aria-expanded='false'] {
                padding-bottom: 1rem;
            }
        }

        .vl-step__content-wrapper {
            visibility: hidden;
            overflow: hidden;
            max-height: 0;
        }

        .vl-step__title {
            /* --vl-theme-.. colors are deprecated, but leaving it in for backwards compatibility */
            color: var(--vl-theme-action-color, var(--vl-color--action));
        }
        .vl-step__subtitle {
            pointer-events: none;
        }

        .vl-step__accordion-toggle {
            /* --vl-theme-.. colors are deprecated, but leaving it in for backwards compatibility */
            color: var(--vl-theme-action-color, var(--vl-color--action));
            font-size: 1.8rem;
            margin-top: 0.1rem;
            margin-left: 0.3rem;

            &::part(icon)::before {
                transition: transform 0.2s;
            }
        }

        &.js-vl-accordion--open {
            .vl-step__content-wrapper {
                visibility: visible;
                overflow: visible;
                max-height: 100%;
            }

            .vl-step__accordion-toggle::part(icon)::before {
                transform: rotate(180deg);
            }
        }
    }

    .vl-step--disabled {
        .vl-step__title {
            color: var(--vl-color--text-subtle);
        }

        .vl-step__accordion-toggle {
            color: var(--vl-color--icon-subtle);
        }

        .vl-step__icon {
            background-color: var(--vl-color--grey-800);
            color: var(--vl-color--white);
        }
    }

    .vl-step--success,
    .vl-step--warning,
    .vl-step--error {
        .vl-step__wrapper {
            padding: 1.5rem;
            margin-left: -1.5rem;

            @media screen and (max-width: ${vlMediaScreenSmall}px) {
                padding: 1rem;
                margin-left: -1rem;
            }
        }
        .vl-step__header {
            align-items: flex-start;
        }
    }

    .vl-step--success {
        .vl-step__icon {
            background-color: var(--vl-color--success-800);
            color: var(--vl-color--white);
        }
        .vl-step__wrapper {
            border: 1px solid var(--vl-color--border-success-subtle);
            background-color: var(--vl-color--background-success-subtle);
        }
        .vl-step__title,
        .vl-step__header {
            padding-top: 0;
        }
    }

    .vl-step--warning {
        .vl-step__icon {
            background-color: var(--vl-color--background-warning);
            color: var(--vl-color--text-default);
        }
        .vl-step__wrapper {
            border: 1px solid var(--vl-color--border-warning-subtle);
            background-color: var(--vl-color--background-warning-subtle);
        }
        .vl-step__title,
        .vl-step__header {
            padding-top: 0;
        }
    }

    .vl-step--error {
        .vl-step__icon {
            background-color: var(--vl-color--background-error);
            color: var(--vl-color--white);
        }
        .vl-step__wrapper {
            border: 1px solid var(--vl-color--border-error-subtle);
            background-color: var(--vl-color--background-error-subtle);
        }
        .vl-step__title,
        .vl-step__header {
            padding-top: 0;
        }
    }

    .vl-step--highlighted {
        .vl-step__icon {
            /* --vl-theme-.. colors are deprecated, but leaving it in for backwards compatibility */
            background-color: var(--vl-theme-action-color, var(--vl-color--action));
            color: var(--vl-color--white);
        }
    }

    .vl-step--has-line {
        &::before {
            position: absolute;
            display: block;
            background-color: var(--vl-color--border-default);
            content: '';
            width: 0.3rem;
            top: calc(4.2rem + 0.4rem);
            bottom: calc(-5rem + 0.4rem);
            left: -5rem;

            @media screen and (max-width: ${vlMediaScreenSmall}px) {
                top: 3.9rem;
                bottom: -2rem;
                left: -3.35rem;
            }
        }
    }

    .vl-step--last-step-no-line::before {
        display: none !important;
    }

    .vl-step--timeline {
        &::before {
            position: absolute;
            display: block;
            background-color: var(--vl-color--border-default);
            content: '';
            width: 0.3rem;
            top: 6rem;
            bottom: -4.6rem;
            left: -5rem;

            @media screen and (max-width: ${vlMediaScreenSmall}px) {
                top: 4.4rem;
                bottom: -1.6rem;
                left: -3.35rem;
            }
        }

        .vl-step__icon {
            display: block;
            font-size: 1.8rem;
            height: auto;
            line-height: 1.5rem;
            border-radius: 0;
            padding: 1.2rem 0;
            top: 0;

            @media screen and (max-width: ${vlMediaScreenSmall}px) {
                font-size: 1.5rem;
                padding: 0.5rem 0;
            }
        }
    }

    .vl-step--timeline-simple {
        padding-top: 0;

        &::before {
            position: absolute;
            display: block;
            background-color: var(--vl-color--border-default);
            content: '';
            width: 0.3rem;
            top: 2.2rem;
            bottom: -7.2rem;
            left: -5rem;

            @media screen and (max-width: ${vlMediaScreenSmall}px) {
                left: -3.35rem;
                bottom: -2.5rem;
            }
        }

        .vl-step__icon {
            background-color: var(--vl-color--grey-800);
            height: 2.2rem;
            width: 2.2rem;
            transform: translateX(-6rem);
            margin-top: 0.5rem;
            font-size: 0;
            border-radius: 50%;

            @media screen and (max-width: ${vlMediaScreenSmall}px) {
                transform: translateX(-4.3rem);
            }

            .vl-step__icon__text,
            .vl-step__icon__sub {
                display: none;
            }
        }

        .vl-step__header {
            padding-top: 0;
        }
        .vl-step__header__titles {
            margin-top: 0.1rem;
        }
        .vl-step__title {
            padding-top: 0;
        }
    }
`;
