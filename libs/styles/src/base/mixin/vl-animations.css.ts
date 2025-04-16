import { CSSResult, css, unsafeCSS } from 'lit';

export const vlWaveAnimationMixin = (name: string, color: string): CSSResult => css`
    @keyframes ${unsafeCSS(name)} {
        0% {
            box-shadow: 10px -0px ${unsafeCSS(color)}, 20px -0px ${unsafeCSS(color)}, 30px 0px ${unsafeCSS(color)};
        }

        10% {
            box-shadow: 10px -3px ${unsafeCSS(color)}, 20px -0px ${unsafeCSS(color)}, 30px -0px ${unsafeCSS(color)};
        }

        20% {
            box-shadow: 10px -6px ${unsafeCSS(color)}, 20px -3px ${unsafeCSS(color)}, 30px -0px ${unsafeCSS(color)};
        }

        30% {
            box-shadow: 10px -3px ${unsafeCSS(color)}, 20px -6px ${unsafeCSS(color)}, 30px -3px ${unsafeCSS(color)};
        }

        40% {
            box-shadow: 10px -0px ${unsafeCSS(color)}, 20px -3px ${unsafeCSS(color)}, 30px -6px ${unsafeCSS(color)};
        }

        50% {
            box-shadow: 10px -0px ${unsafeCSS(color)}, 20px -0px ${unsafeCSS(color)}, 30px -3px ${unsafeCSS(color)};
        }

        60% {
            box-shadow: 10px -0px ${unsafeCSS(color)}, 20px -0px ${unsafeCSS(color)}, 30px -0px ${unsafeCSS(color)};
        }

        100% {
            box-shadow: 10px -0px ${unsafeCSS(color)}, 20px -0px ${unsafeCSS(color)}, 30px -0px ${unsafeCSS(color)};
        }
    }
`;
