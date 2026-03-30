import { vlMediaScreenSmall } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlStepFluxStyles: CSSResult = css`
    ::slotted(span.vl-icon) {
        vertical-align: inherit !important;
    }

    .vl-step__header {
        padding-top: 0.4rem;
        justify-content: flex-start;
        gap: var(--vl-spacing--xsmall);
    }
    .vl-step__header__titles {
        margin-top: 0;
    }
    .vl-step__title {
        padding-top: 0.4rem;
        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            padding-top: 0;
        }
    }
    .vl-step--success .vl-step__title,
    .vl-step--success .vl-step__header,
    .vl-step--warning .vl-step__title,
    .vl-step--warning .vl-step__header,
    .vl-step--error .vl-step__title,
    .vl-step--error .vl-step__header {
        padding-top: 0;
    }

    .vl-step__subtitle {
        pointer-events: none;
        color: var(--vl-color--text-subtle);
    }

    .vl-step__duration-list {
        margin-left: -6.9rem;

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            margin-left: -4.9rem;
        }
    }

    .vl-step--disabled .vl-step__icon {
        background-color: var(--vl-color--grey-800);
    }

    :host(:not(:first-child)) {
        display: block;
        margin-top: 5rem;
        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            margin-top: 2rem;
        }
    }

    .vl-step--has-line {
        &::before {
            position: absolute;
            display: block;
            background-color: #cbd2da;
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
            background-color: #cbd2da;
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
        & > .vl-step__container > .vl-step__icon {
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
        &.vl-step--success .vl-step__icon {
            background-color: #007a37;
            color: #fff;
        }
        &.vl-step--warning .vl-step__icon {
            background-color: #ffa10a;
            color: #333332;
        }
        &.vl-step--error .vl-step__icon {
            background-color: #d2373c;
            color: #fff;
        }
    }

    .vl-step--timeline-simple {
        padding-top: 0;

        &::before {
            position: absolute;
            display: block;
            background-color: #cbd2da;
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

        & > .vl-step__container > .vl-step__icon {
            background-color: #687483;
            height: 2.2rem;
            width: 2.2rem;
            transform: translateX(-6rem);
            margin-top: 0.5rem;
            @media screen and (max-width: ${vlMediaScreenSmall}px) {
                transform: translateX(-4.3rem);
            }
        }
        & > .vl-step__container > .vl-step__icon > .vl-step__icon__text,
        & > .vl-step__container > .vl-step__icon > .vl-step__icon__sub {
            display: none;
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

    :host(:last-child) .vl-step--timeline-simple::before {
        bottom: 0;
    }
`;
