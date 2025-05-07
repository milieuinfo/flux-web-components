import { css, CSSResult } from 'lit';

// deze css is gegenereerd uit de oude custom scss
export const vlPillFluxStyles: CSSResult = css`
    :root {
        --vl-theme-primary-color: #ffe615;
        --vl-theme-primary-color-60: #fff073;
        --vl-theme-primary-color-70: #ffee5b;
        --vl-theme-primary-color-rgba-30: rgba(255, 230, 21, 0.3);
        --vl-theme-fg-color: #333332;
        --vl-theme-fg-color-60: #858584;
        --vl-theme-fg-color-70: #707070;
    }

    .vl-vi::before,
    .vl-vi::after {
        font-family: 'vlaanderen-icon' !important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-style: normal;
        font-variant: normal;
        font-weight: normal;
        text-decoration: none;
        text-transform: none;
        display: inline-block;
        vertical-align: middle;
    }

    .vl-vi.vl-vi-u-180deg::before {
        display: inline-block;
        transform: rotate(180deg);
        vertical-align: middle;
    }

    .vl-vi-u-xs::before {
        font-size: 0.8rem;
    }

    .vl-vi-u-s::before {
        font-size: 1.3rem;
    }

    .vl-vi-u-m::before {
        font-size: 1.7rem;
    }

    .vl-vi-u-l::before {
        font-size: 2rem;
    }

    .vl-vi-u-xl::before {
        font-size: 2.2rem;
    }

    .vl-vi-u-90deg::before {
        display: inline-block;
        transform: rotate(90deg);
    }

    .vl-vi-u-180deg::before {
        display: inline-block;
        transform: rotate(180deg);
    }

    .vl-pill {
        display: inline-flex;
        max-width: 100%;
        align-items: center;
        background-color: #fff;
        font-size: 1.4rem;
        font-weight: 500;
        color: var(--vl-color--text-alt);
        text-decoration: none;
        vertical-align: middle;
        border-radius: 0.3rem;
        border: 0.1rem solid var(--vl-color--border-alt);
        transition: color 0.2s, background-color 0.2s, box-shadow 0.2s;
        padding: 0 1.4rem;
        line-height: calc(2.4rem - 0.2rem);
        min-width: 0;

        &.vl-pill--success {
            background-color: var(--vl-color--success-bg);
            border-color: var(--vl-color--success);
            color: var(--vl-color--success-text);
        }

        &.vl-pill--warning {
            background-color: var(--vl-color--warning-bg);
            border-color: var(--vl-color--warning);
            color: var(--vl-color--warning-text);
        }

        &.vl-pill--error {
            background-color: var(--vl-color--error-background);
            border-color: var(--vl-color--error);
            color: var(--vl-color--error-hover);
        }

        &.vl-pill--disabled:not(.vl-pill--checkable):not(.vl-pill--closable) {
            background-color: var(--vl-color--action-disabled-background);
        }

        &.vl-pill--closable {
            padding-right: 0;
        }

        &.vl-pill--closable.vl-pill--disabled .vl-pill__close {
            background-color: var(--vl-color--action-disabled-background);
        }

        &.vl-pill--clickable {
            font-family: var(--vl-font);
            font-weight: 500;

            &:not(.vl-pill--disabled) {
                color: var(--vl-color--action);

                &:hover {
                    background-color: var(--vl-color--action-hover-background);
                    color: var(--vl-color--action-hover);
                    border-color: var(--vl-color--action);
                    box-shadow: inset 0 0 0 0.1rem var(--vl-color--action);
                }

                &:focus {
                    outline: transparent solid 0.2rem;
                    border-color: var(--vl-color--action);
                    box-shadow: 0 0 0 2px #fff, 0 0 0 5px rgba(0, 85, 204, 0.65),
                        inset 0 0 0 0.1rem var(--vl-color--action);
                }
            }
        }

        &.vl-pill--checkable {
            position: relative;
            padding-left: 3.6rem;
            margin-bottom: 0.3rem;

            &:not(.vl-pill--disabled) {
                cursor: pointer;
                color: var(--vl-color--action);

                &:hover {
                    box-shadow: inset 0 0 0 0.1rem var(--vl-color--action);
                    border: var(--vl-color--action) 0.1rem solid;
                    background-color: var(--vl-color--action-hover-background);
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
                    background-color: var(--vl-color--action-disabled-background);
                    color: var(--vl-color--action-disabled);
                }

                &:not([disabled]):focus + span,
                &:not([disabled]):active + span {
                    box-shadow: 0 0 0 2px #fff, 0 0 0 5px rgba(0, 85, 204, 0.65),
                        inset 0 0 0 0.1rem var(--vl-color--action);
                    border: var(--vl-color--action) 0.1rem solid;
                }

                &:not([disabled]):checked + span {
                    background: var(--vl-color--action);

                    &::before {
                        transform: translateZ(0) translate(-50%, -50%) scale(1);
                    }
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
                    transition: background-color 0.2s, box-shadow 0.2s;
                    margin: 0 1.4rem 0 0;
                    left: -0.1rem;
                    top: -0.1rem;
                    border: 0.1rem solid var(--vl-color--border-alt);

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
                        transition: all 0.3s cubic-bezier(1, 0.1, 0, 0.9) 0.1s, background-color 0.2, box-shadow 0.2s;
                        transform: translateZ(0) translate(-50%, -50%) scale(0);
                        top: 50%;
                        left: 50%;
                    }
                }

                &[disabled] + span {
                    cursor: auto;
                }

                &:disabled:checked + span::before {
                    transform: translateZ(0) translate(-50%, -50%) scale(1);
                }
            }
        }

        &.vl-pill--map {
            background-color: rgba(255, 255, 255, 0.8);
        }
    }

    .vl-pill__close {
        font-family: 'vlaanderen-icon' !important;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--vl-color--action);
        width: 2.4rem;
        height: 2.4rem;
        border: 0.1rem solid var(--vl-color--border-alt);
        text-decoration: none;
        margin-left: 1.4rem;
        padding: 0;
        border-radius: 0 0.3rem 0.3rem 0;
        transition: color 0.2s, background-color 0.2s, box-shadow 0.2s;
        margin-top: -0.1rem;
        margin-right: -0.1rem;
        margin-bottom: -0.1rem;
        min-width: 2.4rem;

        &::before {
            content: '\\f181';
        }

        &:hover:not([disabled]) {
            color: var(--vl-color--action-hover);
            box-shadow: inset 0 0 0 0.1rem var(--vl-color--action);
            border: var(--vl-color--action) 0.1rem solid;
            background-color: var(--vl-color--action-hover-background);
        }

        &:focus {
            outline: transparent solid 0.2rem;
            border: var(--vl-color--action) 0.1rem solid;
            box-shadow: 0 0 0 2px #fff, 0 0 0 5px rgba(0, 85, 204, 0.65), inset 0 0 0 0.1rem var(--vl-color--action);
        }

        [dir='rtl'] & {
            border-left: 0;
            border-right: var(--vl-color--border-alt) 0.1rem solid;
        }
    }
`;
