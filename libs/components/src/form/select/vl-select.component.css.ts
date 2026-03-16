import { css, CSSResult, unsafeCSS } from 'lit';
import selectComponentRawCss from './vl-select.component.raw.css?raw';

export const vlSelectComponentStyles: CSSResult = css`
    ${unsafeCSS(selectComponentRawCss)}

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    /* ===================================================================
       Icon Font Base
       =================================================================== */

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

    .vl-vi-nav-down::before {
        content: '\\f21a';
    }

    .vl-vi-close::before {
        content: '\\f162';
    }

    /* ===================================================================
       Select Container
       =================================================================== */

    .vl-select__container {
        position: relative;
        display: inline-block;
    }

    .vl-select__container.vl-select__container--block {
        display: block;
    }

    /* ===================================================================
       Select Base Styles
       =================================================================== */

    .vl-select {
        background-color: var(--vl-color--white);
        appearance: none;
        -webkit-appearance: none;
        display: inline-block;
        position: relative;
        padding: var(--vl-select--padding);
        max-width: 100%;
        height: var(--vl-select--height);
        line-height: calc(var(--vl-select--height) - 0.2rem);
        border: 1px solid var(--vl-color--border-alt);
        border-radius: var(--vl-border--radius);
        text-decoration: none;
        color: var(--vl-color--text);
        font-family: var(--vl-font);
        font-size: var(--vl-font-size--small);
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    @media screen and (max-width: 767px) {
        .vl-select {
            height: var(--vl-select--height);
            line-height: var(--vl-select--height);
            font-size: var(--vl-font-size--small);
        }
    }

    @media all and (min-width: 0\0) and (min-resolution: 0.001dpcm) {
        .vl-select {
            padding-right: 0;
            background-image: none;
        }
    }

    /* ===================================================================
       Select States (Hover, Focus)
       =================================================================== */

    /* Hover state */

    .vl-select:hover:not([disabled]) {
        border: 0.2rem solid var(--vl-color--focus);
        padding: 0 3.9rem 0 1.4rem;
        line-height: 3.2rem;
    }

    .vl-select:hover:not([disabled]).vl-select--error {
        border-color: var(--vl-color--error);
    }

    .vl-select:hover:not([disabled]).vl-select--success {
        border-color: var(--vl-color--success);
    }

    /* Focus state */

    .vl-select:focus {
        box-shadow: var(--vl-focus--shadow);
        outline: transparent solid 0.2rem;
    }

    @supports (outline-offset: 2px) {
        .vl-select:focus {
            box-shadow: none;
            outline: var(--vl-focus--outline);
            outline-offset: var(--vl-focus--outline-offset);
        }
    }

    /* Placeholder color */

    .vl-select:has(option.vl-select__placeholder[selected]) {
        color: var(--vl-color--text-alt) !important;
    }

    /* ===================================================================
       Select With Clear Button — Padding Adjustments
       =================================================================== */

    .vl-select:not(.vl-select--disabled) {
        &:has(~ .vl-select__button) {
            padding-right: 6rem;

            &:hover {
                padding-right: 5.9rem;

                &:focus {
                    padding-right: 6rem;
                }
            }
        }

        &:focus:hover {
            border-width: 0.1rem;
            padding-right: 4rem;
            padding-left: 1.5rem;
        }
    }

    /* ===================================================================
       Select Validation States (Error, Success)
       =================================================================== */

    /* Error state */

    .vl-select--error {
        border-color: var(--vl-color--error);
        background-color: var(--vl-color--error-background);
    }

    /* Success state */

    .vl-select--success {
        border-color: var(--vl-color--success);
        background-color: var(--vl-color--success-bg);
    }

    /* ===================================================================
       Select Disabled State
       =================================================================== */

    .vl-select[disabled],
    .vl-select--disabled {
        border-color: var(--vl-color--border-alt);
        background-color: var(--vl-color--border-alt--background);
        color: var(--vl-color--text-alt);
    }

    .vl-select.vl-select--disabled ~ .vl-select__button {
        display: none;
    }

    /* ===================================================================
       Select Block Variant
       =================================================================== */

    .vl-select--block {
        display: block;
        width: 100%;
    }

    /* ===================================================================
       Clear Button
       =================================================================== */

    .vl-select ~ .vl-select__button {
        color: var(--vl-select--button-color);
        position: absolute;
        width: 2.4rem;
        height: 2.4rem;
        top: 0.6rem;
        right: 3.6rem;
        font-size: 1.4rem;
        border-radius: var(--vl-border--radius);
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;

        span.vl-icon:before {
            margin-top: -0.2rem;
        }

        &:hover,
        &:focus {
            border: var(--vl-select--button-hover-border) 0.1rem solid;
            background-color: var(--vl-select--button-hover-bg);
            color: var(--vl-select--button-hover-color);
            outline: none;
        }
    }

    /* ===================================================================
       Nav-Down Icon
       =================================================================== */

    .vl-vi.vl-vi-nav-down:before {
        color: var(--vl-select--nav-icon-color);
        position: absolute;
        right: 1.3rem;
        font-size: 1.3rem;
        top: 0.8rem;
        pointer-events: none;
    }

    /* ===================================================================
       Slot Container (Hidden)
       =================================================================== */

    .slot-container {
        display: none;
    }
`;
