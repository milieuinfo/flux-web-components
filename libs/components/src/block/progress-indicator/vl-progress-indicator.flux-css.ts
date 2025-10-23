import { vlFocusOutlineMixin, vlMediaScreenSmall } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlProgressIndicatorFluxStyles: CSSResult = css`
    :host {
        --vl-progress-indicator--bullet-size: 1.8rem;
        --vl-progress-indicator--bullet-background-color: var(--vl-color--background-bolder);
        --vl-progress-indicator--track-color: var(--vl-color--border-bold);
        --vl-progress-indicator--track-top: 1rem;
        --vl-progress-indicator--track-spacing-left: 1.2rem;
        --vl-progress-indicator--track-spacing-right: 1.2rem;
        --vl-progress-indicator--step-gap: 0.4rem;
        --vl-progress-indicator--label-color: var(--vl-color--text-default);
        --vl-progress-indicator--label-weight: normal;
        --vl-progress-indicator--bullet-top: 0.2rem;
        --vl-progress-indicator--padding-right: 0;
    }

    .vl-progress-indicator {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
        padding-top: var(--vl-spacing--xxsmall); /* een beetje extra ruimte voor de focus ring */
        margin-bottom: var(--vl-spacing--medium);
        cursor: default;
        padding-right: 0;
    }

    .vl-progress-indicator__segment {
        position: relative;
        pointer-events: none;

        /* track */
        &::before {
            content: '';
            position: absolute;
            top: var(--vl-progress-indicator--track-top);
            height: 0.3rem;
            background-color: var(--vl-progress-indicator--track-color);
            z-index: -1;
            left: var(--vl-progress-indicator--track-spacing-left);
            right: var(--vl-progress-indicator--track-spacing-right);
        }

        &:first-child {
            --vl-progress-indicator--track-spacing-left: 0;
            --vl-progress-indicator--track-spacing-right: 1.2rem;
        }
    }

    .vl-progress-indicator__step {
        max-width: 100%;
        transform: translateX(50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: var(--vl-progress-indicator--step-gap);
        pointer-events: all;
    }
    vl-tooltip {
        pointer-events: all;
    }

    button.vl-progress-indicator__step {
        position: relative;
        background: none;
        border: none;
        padding: 0;
        font: inherit;
        cursor: default;
        z-index: 1;
        width: 100%;

        &:hover,
        &:focus {
            outline: none;
            .vl-progress-indicator__bullet {
                ${vlFocusOutlineMixin()};
            }
            &[disabled] {
                .vl-progress-indicator__bullet {
                    outline: none;
                }
            }
        }
    }

    .vl-progress-indicator__bullet {
        width: var(--vl-progress-indicator--bullet-size);
        height: var(--vl-progress-indicator--bullet-size);
        border-radius: 50%;
        background-color: var(--vl-progress-indicator--bullet-background-color);
        transform: translateY(var(--vl-progress-indicator--bullet-top));
        position: relative;
        z-index: 10;

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            transform: scale(0.85) translateY(var(--vl-progress-indicator--bullet-top));
        }
    }

    .vl-progress-indicator__label {
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: var(--vl-font-size--small);
        font-weight: var(--vl-progress-indicator--label-weight);
        color: var(--vl-progress-indicator--label-color);
        padding: 0 var(--vl-spacing--xxsmall);
        white-space: nowrap;

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            font-size: var(--vl-font-size--xsmall);
            white-space: unset;
            word-break: break-word;
        }
    }

    .vl-progress-indicator__segment--active {
        /* actieve stijl */
        --vl-progress-indicator--bullet-size: 2.2rem;
        --vl-progress-indicator--bullet-top: 0;
        --vl-progress-indicator--step-gap: 0.1rem;
        --vl-progress-indicator--track-spacing-right: 1.4rem;
        --vl-progress-indicator--label-weight: 500;
        &:first-child {
            --vl-progress-indicator--track-spacing-left: 0;
            --vl-progress-indicator--track-spacing-right: 1.4rem;
        }

        /* toekomstige stappen */
        & + .vl-progress-indicator__segment {
            --vl-progress-indicator--track-spacing-left: 1.4rem;
        }
        & ~ .vl-progress-indicator__segment {
            --vl-progress-indicator--bullet-background-color: var(--vl-color--background-bold);
            --vl-progress-indicator--track-color: var(--vl-color--border-default);
            --vl-progress-indicator--label-color: var(--vl-color--text-subtle);
        }
    }

    .vl-progress-indicator--numeric {
        --vl-progress-indicator--bullet-size: 3.2rem;
        --vl-progress-indicator--bullet-top: 0.5rem;
        --vl-progress-indicator--bullet-background-color: var(--vl-color--primary);
        --vl-progress-indicator--track-top: 2rem;
        --vl-progress-indicator--track-spacing-left: 2rem;
        --vl-progress-indicator--track-spacing-right: 2rem;
        --vl-progress-indicator--step-gap: 1rem;
        --vl-progress-indicator--bullet-font-size: 1.8rem;

        counter-reset: progressbar-counter;
        .vl-progress-indicator__bullet::after {
            content: counter(progressbar-counter);
            counter-increment: progressbar-counter;
            font-size: var(--vl-progress-indicator--bullet-font-size);
            font-weight: 500;
            color: var(--vl-progress-indicator--label-color);
            line-height: var(--vl-progress-indicator--bullet-size);
            pointer-events: none;
        }

        .vl-progress-indicator__segment:first-child {
            --vl-progress-indicator--track-spacing-left: 0;
            --vl-progress-indicator--track-spacing-right: 2rem;
        }

        .vl-progress-indicator__segment--active {
            --vl-progress-indicator--bullet-size: 4.2rem;
            --vl-progress-indicator--bullet-font-size: 2.2rem;
            --vl-progress-indicator--track-spacing-right: 2.5rem;

            &:first-child {
                --vl-progress-indicator--track-spacing-right: 2.5rem;
            }
        }
        .vl-progress-indicator__segment--active + .vl-progress-indicator__segment {
            --vl-progress-indicator--track-spacing-left: 2.5rem;
        }
        .vl-progress-indicator__segment--active ~ .vl-progress-indicator__segment {
            --vl-progress-indicator--bullet-background-color: var(--vl-color--background-subtle);
            .vl-progress-indicator__bullet {
                box-shadow: inset 0px 0px 0px 1px var(--vl-color--border-default);
            }
        }
    }

    .vl-progress-indicator--padded {
        padding-right: var(--vl-progress-indicator--padding-right);
        overflow-x: hidden; /* de extra padding zorgt anders voor horizontale scrolling */
    }

    .vl-progress-indicator:not(.vl-progress-indicator--padded) {
        .vl-progress-indicator__segment:last-child {
            --vl-progress-indicator--track-spacing-right: 2.2rem;

            .vl-progress-indicator__step {
                transform: none;
                max-width: 50%;
                position: relative;
                right: -50%;
                align-items: flex-end;
                & + vl-tooltip {
                    right: -0.5rem !important;
                    left: auto !important;
                }
            }

            &.vl-progress-indicator__segment--active {
                --vl-progress-indicator--track-spacing-right: 2.6rem;
                --vl-progress-indicator--track-spacing-left: 1.2rem;
            }
        }

        &.vl-progress-indicator--numeric .vl-progress-indicator__segment:last-child {
            --vl-progress-indicator--track-spacing-right: 3.6rem;

            &.vl-progress-indicator__segment--active {
                --vl-progress-indicator--track-spacing-left: 2rem;
                --vl-progress-indicator--track-spacing-right: 4.6rem;
            }
        }
    }

    /* door de translateX van de step moet de tooltip arrow manueel verplaatst worden */
    .vl-progress-indicator__segment:last-child {
        vl-tooltip::part(arrow) {
            left: auto !important;
            right: calc(var(--vl-progress-indicator--bullet-size) / 2) !important;
        }
    }
`;
