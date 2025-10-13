import {
    vlFocusOutlineMixin,
    vlIconStyles,
    vlMediaScreenSmall,
    vlWaveAnimationMixin,
} from '@domg-wc/common-utilities/css';
import { CSSResult, css, unsafeCSS } from 'lit';

const borderWidth = '0.2rem';
const borderWidthSmall = '0.1rem';
const differenceBetweenRegularBorderAndSmallBorder = `calc(${borderWidth} - ${borderWidthSmall})`;
const loadingAnimationName = 'waving-light';

export const linkButtonStyles: CSSResult = css`
    /* Importeer loading animation, moet op dit niveau geïmporteerd worden. */

    ${vlWaveAnimationMixin(loadingAnimationName, 'var(--vl-color--action-disabled)')}
    ${vlWaveAnimationMixin(`${loadingAnimationName}-error`, 'var(--vl-color--error)')}
    ${unsafeCSS(vlIconStyles)}
    
    a {
        /* Reset styles - gebaseerd op DV mixin > _buttons.scss */
        border-radius: 0;
        appearance: none;
        -webkit-appearance: none; /* doesn't work without prefix on Safari iOS11 */
        border: 0;
        background-color: transparent;
        padding: 0;

        /* Button styles - gebaseerd op DV _button.scss */
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5em; /* waarde van vl-icon.css.ts */
        min-height: 3.5rem;
        font-family: inherit;
        font-size: var(--vl-font-size--small);
        font-weight: 500;
        padding: var(--vl-spacing--xxsmall) var(--vl-spacing--normal);
        background-color: var(--vl-color--action);
        border: ${unsafeCSS(borderWidth)} solid var(--vl-color--action);
        border-radius: var(--vl-border--radius);
        color: var(--vl-color--white);
        max-width: 100%;

        &:visited {
            color: var(--vl-color--white);
        }

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            padding: var(--vl-spacing--xsmall);
            min-height: 2rem;
        }

        &:focus {
            ${vlFocusOutlineMixin()};
        }

        &:hover {
            border-color: var(--vl-color--action-hover);
            background-color: var(--vl-color--action-hover);
            color: var(--vl-color--white);
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

            &:visited {
                color: var(--vl-color--action);
            }

            &:focus {
                color: var(--vl-color--action-active);
            }

            &:hover,
            &:active {
                color: var(--vl-color--action-hover);
            }
        }

        &.tertiary,
        &.ghost {
            color: var(--vl-color--action);
            background-color: transparent;
            border: ${unsafeCSS(borderWidthSmall)} var(--vl-color--action-tertiary-border) solid;
            transition: background-color 0.2s;
            padding: 0 calc(var(--vl-spacing--normal) + ${unsafeCSS(differenceBetweenRegularBorderAndSmallBorder)});

            &:visited {
                color: var(--vl-color--action);
            }

            &:focus {
                color: var(--vl-color--action-tertiary-hover);
                border-color: var(--vl-color--action-tertiary-border);
            }

            &:hover,
            &:active {
                color: var(--vl-color--action-tertiary-hover);
                border-color: var(--vl-color--action-tertiary-border-hover);
                border-width: ${unsafeCSS(borderWidth)};
                padding: 0 calc(var(--vl-spacing--normal));
            }

            @media screen and (max-width: ${vlMediaScreenSmall}px) {
                padding: calc(var(--vl-spacing--xsmall) + ${unsafeCSS(differenceBetweenRegularBorderAndSmallBorder)});

                &:hover,
                &:active {
                    padding: var(--vl-spacing--xsmall);
                }
            }
        }

        &.ghost {
            /* .ghost bouwt voort op .tertiary, alleen initieel zonder border */
            border-color: transparent;
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

                &:visited {
                    color: var(--vl-color--error);
                }

                &:hover,
                &:active {
                    color: var(--vl-color--error-hover);
                }
            }

            &.tertiary,
            &.ghost,
            &.loading {
                color: var(--vl-color--error);
                border-color: var(--vl-color--error);
                background-color: transparent;

                &:visited {
                    color: var(--vl-color--error);
                }

                &::after {
                    animation-name: ${unsafeCSS(loadingAnimationName)}-error;
                    background-color: transparent;
                    box-shadow: 1rem 0 var(--vl-color--error), 2rem 0 var(--vl-color--error),
                        3rem 0 var(--vl-color--error);
                }

                &:hover,
                &:active {
                    color: var(--vl-color--error-hover);
                    border-color: var(--vl-color--error-hover);
                }
            }

            &.ghost {
                border-color: transparent;
            }
        }

        &.block {
            display: flex;
        }

        &.large {
            padding-top: var(--vl-spacing--small);
            padding-bottom: var(--vl-spacing--small);
            font-size: var(--vl-font-size);

            &.tertiary,
            &.ghost {
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

            &.tertiary,
            &.ghost {
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

            &.tertiary,
            &.ghost {
                padding-left: calc(
                    var(--vl-spacing--xsmall) + ${unsafeCSS(differenceBetweenRegularBorderAndSmallBorder)}
                );
                padding-right: calc(
                    var(--vl-spacing--xsmall) + ${unsafeCSS(differenceBetweenRegularBorderAndSmallBorder)}
                );

                &:hover,
                &:active {
                    padding-left: var(--vl-spacing--xsmall);
                    padding-right: var(--vl-spacing--xsmall);
                }
            }

            &.loading {
                padding-right: 5rem;

                &::after {
                    right: 1rem;
                }
            }

            &.loading.empty-slot,
            &.loading.icon-only {
                padding: 0;
            }
        }

        &.disabled {
            color: var(--vl-color--action-disabled);
            background-color: var(--vl-color--action-disabled-background);
            border-color: var(--vl-color--action-disabled-background);
            cursor: not-allowed;

            &:visited {
                color: var(--vl-color--action-disabled);
            }

            &:focus,
            &:hover,
            &:active {
                color: var(--vl-color--action-disabled);
                background-color: var(--vl-color--action-disabled-background);
                border-color: var(--vl-color--action-disabled-background);
                outline: none;
            }

            &.ghost {
                color: var(--vl-color--action-disabled);
                background-color: transparent;
                border-color: transparent;

                &.error {
                    &:focus,
                    &:hover {
                        color: var(--vl-color--action-disabled);
                        background-color: transparent;
                        border-color: transparent;
                    }
                }
            }
        }

        &.loading {
            color: var(--vl-color--action-disabled);
            background-color: var(--vl-color--action-disabled-background);
            border-color: var(--vl-color--action-disabled-background);
            padding-right: 8rem;
            position: relative;
            cursor: default;

            &:visited {
                color: var(--vl-color--action-disabled);
            }

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

            @media (prefers-reduced-motion: reduce) {
                &::after {
                    animation-duration: 0s;
                    box-shadow: 1rem 0 var(--vl-color--action-disabled), 2rem 0 var(--vl-color--action-disabled),
                        3rem 0 var(--vl-color--action-disabled);
                }
            }

            &:focus,
            &:hover,
            &:active {
                color: var(--vl-color--action-disabled);
            }

            &.disabled {
                cursor: not-allowed;
                &::after {
                    animation-name: ${unsafeCSS(loadingAnimationName)};
                }
            }

            &.ghost {
                border-color: transparent;
            }

            &.tertiary,
            &.ghost {
                padding-right: calc(8rem + ${unsafeCSS(differenceBetweenRegularBorderAndSmallBorder)});

                &:hover,
                &:active {
                    padding-right: 8rem;
                    border-color: var(--vl-color--action-disabled-background);

                    &::after {
                        right: 1.9rem;
                    }

                    &.narrow::after {
                        right: 0.9rem;
                    }
                }
            }
        }

        /* In map styles */

        &.button-in-map {
            &.tertiary,
            &.ghost {
                background-color: var(--vl-color--map-background);
            }
        }

        /* Empty slot styles */
        &.empty-slot,
        &.icon-only {
            width: 3.5rem;
            padding: 0;

            &.secondary,
            &.tertiary,
            &.ghost {
                padding: 0;
                &:hover,
                &:active {
                    padding: 0;
                }
            }

            &.loading {
                &::after {
                    right: 0.1rem;
                    background-color: transparent;
                }
                &.tertiary,
                &.ghost {
                    &::after {
                        right: 0.2rem;
                    }
                    &:hover,
                    &:active {
                        &::after {
                            right: 0.1rem;
                        }
                    }
                }
                .vl-icon {
                    opacity: 0;
                }
            }
        }

        &.input-group-left,
        &.input-group-right {
            width: max-content;
            min-width: 3.5rem;

            @media screen and (max-width: ${vlMediaScreenSmall}px) {
                padding: var(--vl-spacing--xxsmall) var(--vl-spacing--xsmall);
            }

            &.tertiary:has(.vl-icon) {
                border: solid 0.1rem rgb(134, 149, 168);
            }

            &.ghost:has(.vl-icon) {
                border-color: transparent;
            }

            &.tertiary:hover,
            &.ghost:hover {
                /* specifieke kleuren, anders dan de gewone tertiary:hover */
                box-shadow: rgba(0, 85, 204, 0.65) 0px 0px 0px 0.1rem inset;
                border-color: rgba(0, 85, 204, 0.65);
                background: rgba(179, 207, 245, 0.3);
            }
        }

        &.input-group-left {
            border-radius: 0.3rem 0px 0px 0.3rem;
        }

        &.input-group-right {
            border-radius: 0px 0.3rem 0.3rem 0px;
        }

        line-height: normal;
        text-decoration: none;
        box-sizing: border-box;

        &.empty-slot,
        &.icon-only {
            width: 3.5rem;
            height: 3.5rem;
        }
    }
`;
