import { vlFocusOutlineMixin, vlMediaScreenSmall, vlWaveAnimationMixin } from '@domg-wc/common-utilities/css';
import { css, CSSResult, unsafeCSS } from 'lit';

const borderWidth = '0.2rem';
const borderWidthSmall = '0.1rem';
const differenceBetweenRegularBorderAndSmallBorder = `calc(${borderWidth} - ${borderWidthSmall})`;
const loadingAnimationName = 'waving-light';

export const buttonStyles: CSSResult = css`
    /* Importeer loading animation, moet op dit niveau geïmporteerd worden. */

    ${vlWaveAnimationMixin(loadingAnimationName, 'var(--vl-action-color--disabled)')}
    button {
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
        min-height: 3.5rem;
        font-family: inherit;
        font-size: var(--vl-font-size--small);
        font-weight: 500;
        padding: var(--vl-spacing--xxsmall) var(--vl-spacing--normal);
        background-color: var(--vl-action-color);
        border: ${unsafeCSS(borderWidth)} solid var(--vl-action-color);
        border-radius: var(--vl-border--radius);
        color: var(--vl-white);
        max-width: 100%;

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            padding: var(--vl-spacing--xsmall);
        }

        &:focus {
            ${vlFocusOutlineMixin()}
        }

        &:hover {
            border-color: var(--vl-action-color--hover);
            background-color: var(--vl-action-color--hover);
        }

        &:active {
            border-color: var(--vl-action-color--active);
            background-color: var(--vl-action-color--active);
        }

        &.secondary {
            color: var(--vl-action-color);
            background-color: transparent;
            border: ${unsafeCSS(borderWidth)} solid currentColor;
            transition: color 0.2s, border-color 0.2s;

            &:focus {
                color: var(--vl-action-color--active);
            }

            &:hover,
            &:active {
                color: var(--vl-action-color--hover);
            }
        }

        &.tertiary {
            color: var(--vl-action-color);
            background-color: transparent;
            border: ${unsafeCSS(borderWidthSmall)} var(--vl-action-tertiary-border-color) solid;
            transition: background-color 0.2s;
            padding: 0 calc(var(--vl-spacing--normal) + ${unsafeCSS(differenceBetweenRegularBorderAndSmallBorder)});

            &:focus {
                color: var(--vl-action-tertiary-color--hover);
                border-color: var(--vl-action-tertiary-border-color);
            }

            &:hover,
            &:active {
                color: var(--vl-action-tertiary-color--hover);
                border-color: var(--vl-action-tertiary-border-color--hover);
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
            background-color: var(--vl-error-color);
            border-color: var(--vl-error-color);

            &:hover,
            &:active {
                background-color: var(--vl-error-color--hover);
                border-color: var(--vl-error-color--hover);
            }

            &.secondary {
                color: var(--vl-error-color);
                background-color: transparent;

                &:hover,
                &:active {
                    color: var(--vl-error-color--hover);
                }
            }

            &.tertiary {
                color: var(--vl-error-color);
                border-color: var(--vl-error-color);
                background-color: transparent;

                &:hover,
                &:active {
                    color: var(--vl-error-color--hover);
                    border-color: var(--vl-error-color--hover);
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
        }

        &.disabled {
            color: var(--vl-action-color--disabled);
            background-color: var(--vl-action-background-color--disabled);
            border-color: var(--vl-action-background-color--disabled);
            cursor: not-allowed;

            &:focus,
            &:hover,
            &:active {
                color: var(--vl-action-color--disabled);
                background-color: var(--vl-action-background-color--disabled);
                border-color: var(--vl-action-background-color--disabled);
            }
        }

        &.loading {
            color: var(--vl-white);
            background-color: var(--vl-action-background-color--disabled);
            border-color: var(--vl-action-background-color--disabled);
            padding: var(--vl-spacing--xsmall) 8rem var(--vl-spacing--xsmall) 4rem;
            position: relative;

            &::after {
                animation: ${unsafeCSS(loadingAnimationName)} infinite 1s linear;
                content: '';
                display: block;
                position: absolute;
                top: 50%;
                right: 4rem;
                margin-top: -0.2rem;
                margin-right: 3.2rem;
                width: 0.4rem;
                height: 0.4rem;
                background-color: var(--vl-action-background-color--disabled);
                border-radius: 50%;
                box-shadow: 1rem 0 var(--vl-background-color), 2rem 0 var(--vl-background-color),
                    3rem 0 var(--vl-background-color);
            }

            &:focus,
            &:hover,
            &:active {
                color: var(--vl-white);
            }

            &.disabled {
                cursor: not-allowed;
            }
        }

        /* In map styles */

        &.button-in-map {
            &.tertiary {
                background-color: var(--vl-map-background-color);
            }
        }

        /* Empty slot styles */
        &.empty-slot {
            width: 3.5rem;
            padding: 0;
            &.tertiary {
                padding: 0;
            }
            .vl-icon {
                margin-left: 0;
                margin-right: 0;
            }
        }

        &.input-group-left {
            width: max-content;
            min-width: 3.5rem;
            border-radius: 0.3rem 0px 0px 0.3rem;

            @media screen and (max-width: ${vlMediaScreenSmall}px) {
                padding: var(--vl-spacing--xxsmall) var(--vl-spacing--xsmall);
            }

            &.tertiary&:has(.vl-icon) {
                border: solid 0.1rem rgb(134, 149, 168);
            }

            &.tertiary&:hover {
                /* specifieke kleuren, anders dan de gewone tertiary:hover */
                box-shadow: rgba(0, 85, 204, 0.65) 0px 0px 0px 0.1rem inset;
                border-color: rgba(0, 85, 204, 0.65);
                background: rgba(179, 207, 245, 0.3);
            }
        }

        &.input-group-right {
            width: max-content;
            min-width: 3.5rem;
            border-radius: 0px 0.3rem 0.3rem 0px;

            @media screen and (max-width: ${vlMediaScreenSmall}px) {
                padding: var(--vl-spacing--xxsmall) var(--vl-spacing--xsmall);
            }

            &.tertiary&:has(.vl-icon) {
                border: solid 0.1rem rgb(134, 149, 168);
            }

            &.tertiary&:hover {
                /* specifieke kleuren, anders dan de gewone tertiary:hover */
                box-shadow: rgba(0, 85, 204, 0.65) 0px 0px 0px 0.1rem inset;
                border-color: rgba(0, 85, 204, 0.65);
                background: rgba(179, 207, 245, 0.3);
            }
        }
    }
`;
