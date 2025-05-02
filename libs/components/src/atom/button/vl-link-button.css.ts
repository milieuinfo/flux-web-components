import { vlFocusOutlineMixin, vlMediaScreenSmall, vlWaveAnimationMixin } from '@domg-wc/styles';
import { CSSResult, css, unsafeCSS } from 'lit';

const borderWidth = '0.2rem';
const borderWidthSmall = '0.1rem';
const differenceBetweenRegularBorderAndSmallBorder = `calc(${borderWidth} - ${borderWidthSmall})`;
const loadingAnimationName = 'waving-light';

export const linkButtonStyles: CSSResult = css`
    /* Importeer loading animation, moet op dit niveau geïmporteerd worden. */

    ${vlWaveAnimationMixin(loadingAnimationName, 'var(--vl-color--action-disabled)')}
    a {
        /* Reset styles - gebaseerd op DV mixin > _buttons.scss */
        border-radius: 0;
        appearance: none;
        -webkit-appearance: none; // doesn't work without prefix on Safari iOS11
        border: 0;
        background-color: transparent;
        padding: 0;

        /* Button styles - gebaseerd op DV _button.scss */
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 2.1rem; /* verschilt van button styling */
        font-family: inherit;
        font-size: var(--vl-font-size--small);
        font-weight: 500;
        padding: var(--vl-spacing--xxsmall) var(--vl-spacing--normal);
        background-color: var(--vl-color--action);
        border: ${unsafeCSS(borderWidth)} solid var(--vl-color--action);
        border-radius: var(--vl-border--radius);
        color: var(--vl-color--white);
        max-width: 100%;
        line-height: normal;

        /* link-button styles */
        text-decoration: none;

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            padding: var(--vl-spacing--xsmall);
        }

        &:focus {
            ${vlFocusOutlineMixin()}
        }

        &:hover {
            border-color: var(--vl-color--action-hover);
            background-color: var(--vl-color--action-hover);
        }

        &:active {
            border-color: var(--vl-color--action-active);
            background-color: var(--vl-color--action-active);
        }

        &.secondary {
            color: var(--vl-color--action);
            background-color: transparent;
            border: ${unsafeCSS(borderWidth)} solid currentColor;
            transition: color 0.2s, border-color 0.2s;
            min-height: 3.1rem;

            &:focus {
                color: var(--vl-color--action-active);
            }

            &:hover,
            &:active {
                color: var(--vl-color--action-hover);
            }
        }

        &.tertiary {
            color: var(--vl-color--action);
            background-color: transparent;
            border: ${unsafeCSS(borderWidthSmall)} var(--vl-color--action-tertiary-border) solid;
            transition: background-color 0.2s;
            padding: 0 calc(var(--vl-spacing--normal) + ${unsafeCSS(differenceBetweenRegularBorderAndSmallBorder)});
            min-height: 3.5rem;

            &:focus {
                color: var(--vl-color--action-tertiary-hover);
                border-color: var(--vl-color--action-tertiary-border);
            }

            &:hover,
            &:active {
                color: var(--vl-color--action-tertiary-hover);
                border-color: var(--vl-color--action-tertiary-border-hover);
                border-width: ${unsafeCSS(borderWidth)};
                padding: 0 var(--vl-spacing--normal);
            }

            @media screen and (max-width: ${vlMediaScreenSmall}px) {
                padding: calc(var(--vl-spacing--xsmall) + ${unsafeCSS(differenceBetweenRegularBorderAndSmallBorder)});

                &:hover,
                &:active {
                    padding: var(--vl-spacing--xsmall);
                }
            }
        }

        &.error {
            background-color: var(--vl-color--error);
            border-color: var(--vl-color--error);

            &:hover,
            &:active {
                background-color: var(--vl-color--error-hover);
                border-color: var(--vl-color--error-hover);
            }

            &.secondary {
                color: var(--vl-color--error);
                background-color: transparent;

                &:hover,
                &:active {
                    color: var(--vl-color--error-hover);
                }
            }

            &.tertiary {
                color: var(--vl-color--error);
                border-color: var(--vl-color--error);
                background-color: transparent;

                &:hover,
                &:active {
                    color: var(--vl-color--error-hover);
                    border-color: var(--vl-color--error-hover);
                }
            }
        }

        &.block {
            display: flex;
            width: 100%;
        }

        &.large {
            padding-top: var(--vl-spacing--small);
            padding-bottom: var(--vl-spacing--small);
            font-size: var(--vl-font-size);

            &.tertiary {
                padding-top: calc(
                    var(--vl-spacing--small) + ${unsafeCSS(differenceBetweenRegularBorderAndSmallBorder)}
                );
                padding-bottom: calc(
                    var(--vl-spacing--small) + ${unsafeCSS(differenceBetweenRegularBorderAndSmallBorder)}
                );

                &:hover,
                &:active {
                    padding-top: var(--vl-spacing--small);
                    padding-bottom: var(--vl-spacing--small);
                }
            }
        }

        &.wide {
            padding-left: 6rem;
            padding-right: 6rem;

            &.tertiary {
                padding-left: calc(6rem + ${unsafeCSS(differenceBetweenRegularBorderAndSmallBorder)});
                padding-right: calc(6rem + ${unsafeCSS(differenceBetweenRegularBorderAndSmallBorder)});

                &:hover,
                &:active {
                    padding-left: 6rem;
                    padding-right: 6rem;
                }
            }
        }

        &.narrow {
            padding-left: var(--vl-spacing--xsmall);
            padding-right: var(--vl-spacing--xsmall);

            &.tertiary {
                padding: 0 calc(var(--vl-spacing--xsmall) + ${unsafeCSS(differenceBetweenRegularBorderAndSmallBorder)});

                &:hover,
                &:active {
                    padding: 0 var(--vl-spacing--xsmall);
                }

                @media screen and (max-width: ${vlMediaScreenSmall}px) {
                    padding: calc(
                        var(--vl-spacing--xsmall) + ${unsafeCSS(differenceBetweenRegularBorderAndSmallBorder)}
                    );

                    &:hover,
                    &:active {
                        padding: var(--vl-spacing--xsmall);
                    }
                }
            }

            &.loading {
                padding-right: 5rem;

                &::after {
                    right: 1rem;
                }
            }
        }

        &.disabled {
            color: var(--vl-color--action-disabled);
            background-color: var(--vl-color--action-disabled-background);
            border-color: var(--vl-color--action-disabled-background);
            cursor: not-allowed;

            &:focus,
            &:hover,
            &:active {
                color: var(--vl-color--action-disabled);
                background-color: var(--vl-color--action-disabled-background);
                border-color: var(--vl-color--action-disabled-background);
            }
        }

        &.loading {
            color: var(--vl-color--white);
            background-color: var(--vl-color--action-disabled-background);
            border-color: var(--vl-color--action-disabled-background);
            padding-right: 8rem;
            position: relative;

            &::after {
                animation: ${unsafeCSS(loadingAnimationName)} infinite 1s linear;
                content: '';
                display: block;
                position: absolute;
                top: calc(50% - 0.2rem);
                right: 2rem;
                margin-right: 3.2rem;
                width: 0.4rem;
                height: 0.4rem;
                background-color: var(--vl-color--action-disabled-background);
                border-radius: 50%;
                box-shadow: 1rem 0 var(--vl-color--background), 2rem 0 var(--vl-color--background),
                    3rem 0 var(--vl-color--background);
            }

            &:focus,
            &:hover,
            &:active {
                color: var(--vl-color--white);
            }

            &.disabled {
                cursor: not-allowed;
            }
        }

        /* In map styles */

        &.button-in-map {
            &.tertiary {
                background-color: var(--vl-color--map-background);
            }
        }

        /* Empty slot styles */
        &.empty-slot {
            width: 3.1rem;
            padding: 0;
            min-height: 3.1rem;

            &.secondary {
                padding: 0;
            }
            &.tertiary {
                padding: 0.1rem;
            }

            &.loading {
                &::after {
                    right: 0.1rem;
                    background-color: transparent;
                }
                .vl-icon {
                    display: none;
                }
            }
        }
    }
`;
