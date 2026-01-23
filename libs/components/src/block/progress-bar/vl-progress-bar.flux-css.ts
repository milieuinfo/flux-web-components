import { css, CSSResult } from 'lit';

export const vlProgressBarFluxStyles: CSSResult = css`
    :host {
        display: block;
        box-sizing: border-box;
    }
    .vl-progress-bar {
        display: block;
        width: 100%;
        height: 0.4rem;
        position: relative;
    }

    .vl-progress-bar__track {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 0.4rem;
        background-color: var(--vl-color--background-bold);
        border-radius: 0.2rem;
        overflow: hidden;
    }

    .vl-progress-bar__progress {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        height: 0.4rem;
        background-color: var(--vl-color--action);
        transition: width 0.3s ease;
    }

    .vl-progress-bar.vl-progress-bar--error {
        .vl-progress-bar__track {
            background-color: var(--vl-color--background-error-subtle);
        }
        .vl-progress-bar__progress {
            background-color: var(--vl-color--background-error);
        }
    }

    .vl-progress-bar.vl-progress-bar--success {
        .vl-progress-bar__track {
            background-color: var(--vl-color--background-success-subtle);
        }
        .vl-progress-bar__progress {
            background-color: var(--vl-color--background-success);
        }
    }

    .vl-progress-bar.vl-progress-bar--indeterminate .vl-progress-bar__progress {
        width: 66.666%;
        animation: vl-progress-bar-indeterminate 1.8s linear infinite;
    }

    @keyframes vl-progress-bar-indeterminate {
        0% {
            left: -66.666%;
            opacity: 0.1;
        }
        25% {
            opacity: 1;
        }
        75% {
            opacity: 1;
        }
        100% {
            left: 100%;
            opacity: 0.1;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .vl-progress-bar.vl-progress-bar--indeterminate .vl-progress-bar__progress {
            animation: vl-progress-bar-pulse 1.2s ease-in-out infinite;
            width: 100%;
            left: 0;
            opacity: 1;
            transform: none;
        }

        .vl-progress-bar__progress {
            transition: none;
        }

        @keyframes vl-progress-bar-pulse {
            0% {
                opacity: 0;
            }
            50% {
                opacity: 0.75;
            }
            100% {
                opacity: 0;
            }
        }
    }
`;
