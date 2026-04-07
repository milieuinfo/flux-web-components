import { vlFocusOutlineMixin } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlPillFluxStyles: CSSResult = css`
    :host {
        --vl-pill--border-color: var(--vl-color--border-alt);
        --vl-pill--text-color: var(--vl-color--text-alt);
        --vl-pill--background-color: #fff;
        --vl-pill--border-color-action: var(--vl-color--action);
        --vl-pill--text-color-action: var(--vl-color--action);
        --vl-pill--background-color-action: var(--vl-color--background-action-subtle);
    }
    .vl-pill {
        display: inline-flex;
        max-width: 100%;
        align-items: center;
        background-color: var(--vl-pill--background-color);
        font-size: 1.4rem;
        font-weight: 500;
        color: var(--vl-pill--text-color);
        text-decoration: none;
        vertical-align: middle;
        border-radius: 0.3rem;
        border: 0.1rem solid var(--vl-pill--border-color);
        transition:
            color 0.2s,
            background-color 0.2s,
            box-shadow 0.2s;
        padding: 0 1.4rem;
        line-height: calc(2.4rem - 0.2rem);
        min-width: 0;

        * {
            box-sizing: border-box;
        }

        &.vl-pill--success {
            --vl-pill--border-color: var(--vl-color--border-success);
            --vl-pill--text-color: var(--vl-color--text-success);
            --vl-pill--background-color: var(--vl-color--background-success-subtle);
            --vl-pill--border-color-action: var(--vl-color--border-success);
            --vl-pill--text-color-action: var(--vl-color--text-success);
            --vl-pill--background-color-action: var(--vl-color--background-success-subtle);
        }

        &.vl-pill--warning {
            --vl-pill--border-color: var(--vl-color--border-warning);
            --vl-pill--text-color: var(--vl-color--text-warning);
            --vl-pill--background-color: var(--vl-color--background-warning-subtle);
            --vl-pill--border-color-action: var(--vl-color--border-warning);
            --vl-pill--text-color-action: var(--vl-color--text-warning);
            --vl-pill--background-color-action: var(--vl-color--background-warning-subtle);
        }

        &.vl-pill--error {
            --vl-pill--border-color: var(--vl-color--border-error);
            --vl-pill--text-color: var(--vl-color--text-error);
            --vl-pill--background-color: var(--vl-color--background-error-subtle);
            --vl-pill--border-color-action: var(--vl-color--border-error);
            --vl-pill--text-color-action: var(--vl-color--text-error);
            --vl-pill--background-color-action: var(--vl-color--background-error-subtle);
        }

        &.vl-pill--disabled {
            --vl-pill--border-color: var(--vl-color--border-disabled);
            --vl-pill--text-color: var(--vl-color--text-disabled);
            --vl-pill--background-color: var(--vl-color--background-disabled-subtle);
            --vl-pill--border-color-action: var(--vl-color--border-disabled);
            --vl-pill--text-color-action: var(--vl-color--text-disabled);
            --vl-pill--background-color-action: var(--vl-color--background-disabled-subtle);
            cursor: not-allowed;
        }

        &.vl-pill--closable {
            padding-right: 0;

            .vl-pill__close {
                font-family: 'vlaanderen-icon' !important;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                color: var(--vl-pill--text-color);
                width: 2.4rem;
                height: 2.4rem;
                border: 0.1rem solid var(--vl-pill--border-color);
                text-decoration: none;
                margin-left: 1.4rem;
                padding: 0;
                border-radius: 0 0.3rem 0.3rem 0;
                transition:
                    color 0.2s,
                    background-color 0.2s,
                    box-shadow 0.2s;
                margin-top: -0.1rem;
                margin-right: -0.1rem;
                margin-bottom: -0.1rem;
                min-width: 2.4rem;

                &::before {
                    content: '\\f181';
                }
            }

            &:not(.vl-pill--disabled) .vl-pill__close {
                &:hover:not([disabled]) {
                    color: var(--vl-pill--text-color-action);
                    box-shadow: inset 0 0 0 0.1rem var(--vl-pill--border-color-action);
                    border: var(--vl-pill--border-color-action) 0.1rem solid;
                    background-color: var(--vl-pill--background-color-action);
                }

                &:focus:not([disabled]) {
                    ${vlFocusOutlineMixin()};
                }
            }

            &.vl-pill--disabled .vl-pill__close,
            .vl-pill__close[disabled] {
                cursor: not-allowed;

                &:focus {
                    outline: none;
                }
            }
        }

        &.vl-pill--clickable {
            font-family: var(--vl-font);
            font-weight: 500;

            &:not(.vl-pill--disabled) {
                color: var(--vl-color--action);

                &:hover {
                    background-color: var(--vl-pill--background-color-action);
                    color: var(--vl-color--action);
                    border-color: var(--vl-pill--border-color-action);
                    box-shadow: inset 0 0 0 0.1rem var(--vl-pill--border-color-action);
                }

                &:focus {
                    ${vlFocusOutlineMixin()};
                }
            }
        }

        &.vl-pill--checkable {
            position: relative;
            padding-left: 3.6rem;

            &:not(.vl-pill--disabled) {
                cursor: pointer;
                color: var(--vl-pill--text-color);

                &:hover {
                    color: var(--vl-pill--text-color-action);
                    box-shadow: inset 0 0 0 0.1rem var(--vl-pill--border-color-action);
                    border: var(--vl-pill--border-color-action) 0.1rem solid;
                    background-color: var(--vl-pill--background-color-action);
                }
            }

            .vl-pill--checkable__checkbox {
                position: absolute;
                overflow: hidden;
                clip: rect(0 0 0 0);
                width: 0.1rem;
                height: 0.1rem;
                padding: 0;
                margin: -0.1rem;

                &[disabled] + span {
                    background-color: var(--vl-pill--background-color);
                    color: var(--vl-pill--text-color);
                    cursor: not-allowed;
                    &::before {
                        color: var(--vl-pill--background-color);
                    }
                }
                &[disabled][checked] + span::before {
                    color: var(--vl-pill--text-color);
                }

                &:not([disabled]) + span {
                    transition: border 0.1s;
                }

                &:not([disabled]):focus + span,
                &:not([disabled]):active + span {
                    ${vlFocusOutlineMixin()};
                }

                &:not([disabled]):hover + span {
                    border: 0.2rem solid var(--vl-pill--border-color-action);
                }

                &:not([disabled]):checked + span {
                    background: var(--vl-pill--border-color-action);
                }

                & + span {
                    position: absolute;
                    display: inline-block;
                    background: #fff;
                    width: 2.4rem;
                    height: 2.4rem;
                    cursor: pointer;
                    overflow: hidden;
                    white-space: nowrap;
                    border-top-left-radius: 0.3rem;
                    border-bottom-left-radius: 0.3rem;
                    transition:
                        background-color 0.2s,
                        box-shadow 0.2s;
                    margin: 0 1.4rem 0 0;
                    left: -0.1rem;
                    top: -0.1rem;
                    border: 0.1rem solid var(--vl-pill--border-color);

                    &::before,
                    &::after {
                        font-family: 'vlaanderen-icon' !important;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                        font-style: normal;
                        font-variant: normal;
                        font-weight: normal;
                        text-decoration: none;
                        text-transform: none;
                    }

                    &::before {
                        content: '\\f15c';
                        position: absolute;
                        display: block;
                        font-size: 0.8rem;
                        color: #fff;
                        line-height: 1;
                        text-align: center;
                        transition:
                            all 0.3s cubic-bezier(1, 0.1, 0, 0.9) 0.1s,
                            background-color 0.2,
                            box-shadow 0.2s;
                        transform: translateZ(0) translate(-50%, -50%) scale(1);
                        top: 50%;
                        left: 50%;
                    }
                }
            }
        }
    }
`;
