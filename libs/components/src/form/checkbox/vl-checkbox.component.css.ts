import { css, CSSResult, unsafeCSS } from 'lit';
import checkboxComponentRawCss from './vl-checkbox.component.raw.css?raw';

export const vlCheckboxComponentFluxStyles: CSSResult = css`
    ${unsafeCSS(checkboxComponentRawCss)}

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    /* ===================================================================
       Shared Icon Styles (for both checkbox and switch)
       =================================================================== */

    .vl-checkbox__box::before,
    .vl-checkbox__box::after,
    .vl-checkbox--switch__label span::before,
    .vl-checkbox--switch__label span::after {
        font-family: 'vlaanderen-icon' !important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-style: normal;
        font-variant: normal;
        font-weight: normal;
        text-decoration: none;
        text-transform: none;
    }

    /* ===================================================================
       Visually Hidden Input (for both checkbox and switch)
       =================================================================== */

    .vl-checkbox__toggle,
    .vl-checkbox--switch {
        position: absolute;
        overflow: hidden;
        clip: rect(0 0 0 0);
        width: 0.1rem;
        height: 0.1rem;
        padding: 0;
        margin: -0.1rem;
    }

    /* ===================================================================
       Regular Checkbox Base Styles
       =================================================================== */

    .vl-checkbox {
        position: relative;
        display: inline-block;
        max-width: 100%;
    }

    .vl-checkbox:not(.vl-checkbox--block):not(:last-of-type) {
        margin-right: var(--vl-checkbox--margin);
    }

    .vl-checkbox__label {
        display: flex;
        flex: 0 0 auto;
        font-size: 1.6rem;
        line-height: 2.4rem;
    }

    @media screen and (max-width: 767px) {
        .vl-checkbox__label {
            line-height: 2.2rem;
        }
    }

    /* Checkbox Box (visual indicator) */

    .vl-checkbox__box {
        position: relative;
        flex: 0 0 var(--vl-checkbox--box-size);
        width: var(--vl-checkbox--box-size);
        height: var(--vl-checkbox--box-size);
        margin-top: 0.3rem;
        margin-right: var(--vl-checkbox--label-gap);
        line-height: 1;
    }

    @media screen and (max-width: 767px) {
        .vl-checkbox__box {
            margin-top: 0.2rem;
        }
    }

    /* Checkbox checkmark icon (::before) */

    .vl-checkbox__box::before {
        position: absolute;
        top: 0.9rem;
        left: 0.9rem;
        z-index: 2;
        display: block;
        font-size: var(--vl-checkbox--icon-size);
        color: var(--vl-checkbox--color-border);
        line-height: 1;
        text-align: center;
        transform: translateZ(0) translate(-50%, -50%) scale(0);
        transition: transform var(--vl-checkbox--transition), color var(--vl-checkbox--transition);
    }

    /* Checkbox box background (::after) */

    .vl-checkbox__box::after {
        display: inline-block;
        width: var(--vl-checkbox--box-size);
        height: var(--vl-checkbox--box-size);
        content: '';
        background: var(--vl-checkbox--color-white);
        border: var(--vl-checkbox--border-width) var(--vl-checkbox--color-border) solid;
        border-radius: var(--vl-checkbox--border-radius);
        outline: 0.2rem transparent solid;
        cursor: pointer;
        overflow: hidden;
        white-space: nowrap;
        transition: all var(--vl-checkbox--transition);
        z-index: 1;
    }

    /* ===================================================================
       Checkbox States (Checked, Indeterminate, Focus)
       =================================================================== */

    /* Focus state */

    .vl-checkbox__toggle:focus + .vl-checkbox__label .vl-checkbox__box::after {
        box-shadow: var(--vl-checkbox--focus-shadow);
        outline: transparent solid 0.2rem;
    }

    @supports (outline-offset: 2px) {
        .vl-checkbox__toggle:focus + .vl-checkbox__label .vl-checkbox__box::after {
            box-shadow: none;
            outline: var(--vl-checkbox--focus-outline);
            outline-offset: var(--vl-checkbox--focus-outline-offset);
        }
    }

    /* Checked state */

    .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::before {
        content: '\\f15c';
    }

    /* Indeterminate state */

    .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::before {
        content: '\\f20e';
        font-size: var(--vl-checkbox--icon-size);
        font-weight: bold;
    }

    /* Checked & Indeterminate: show icon and change colors */

    .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::before,
    .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::before {
        transform: translateZ(0) translate(-50%, -50%) scale(1);
        color: var(--vl-checkbox--color-white);
    }

    .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::after,
    .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::after {
        background: var(--vl-checkbox--color-primary);
        border-color: var(--vl-checkbox--color-primary);
    }

    /* ===================================================================
       Checkbox Variants (Block, Disabled)
       =================================================================== */

    /* Block variant */

    .vl-checkbox--block {
        display: block;
        margin: 0;
    }

    /* Disabled variant */

    .vl-checkbox--disabled .vl-checkbox__label {
        color: var(--vl-checkbox--disabled-color);
    }

    .vl-checkbox--disabled .vl-checkbox__box::after {
        background-color: var(--vl-checkbox--disabled-background);
        border-color: var(--vl-checkbox--disabled-background);
        cursor: auto;
    }

    .vl-checkbox--disabled .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::after,
    .vl-checkbox--disabled .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::after {
        background: var(--vl-checkbox--disabled-background);
        border-color: var(--vl-checkbox--disabled-background);
    }

    /* ===================================================================
       Checkbox Validation States (Error, Success)
       =================================================================== */

    /* Error state - unchecked */

    .vl-checkbox--error .vl-checkbox__box::after,
    .vl-checkbox.invalid.validated .vl-checkbox__box::after {
        background-color: var(--vl-checkbox--color-white);
        border-color: var(--vl-checkbox--error-color);
    }

    /* Error state - checkmark color when checked/indeterminate */

    .vl-checkbox--error .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::before,
    .vl-checkbox.invalid.validated .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::before,
    .vl-checkbox--error .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::before,
    .vl-checkbox.invalid.validated .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::before {
        color: var(--vl-checkbox--error-color);
    }

    /* Error state - box background when checked/indeterminate */

    .vl-checkbox--error .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::after,
    .vl-checkbox.invalid.validated .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::after,
    .vl-checkbox--error .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::after,
    .vl-checkbox.invalid.validated .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::after {
        background-color: var(--vl-checkbox--color-white);
        border-color: var(--vl-checkbox--error-color);
    }

    /* Success state - unchecked */

    .vl-checkbox--success .vl-checkbox__box::after,
    .vl-checkbox.valid.validated .vl-checkbox__box::after {
        background-color: var(--vl-checkbox--color-white);
        border-color: var(--vl-checkbox--success-color);
    }

    /* Success state - checkmark color when checked/indeterminate */

    .vl-checkbox--success .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::before,
    .vl-checkbox.valid.validated .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::before,
    .vl-checkbox--success .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::before,
    .vl-checkbox.valid.validated .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::before {
        color: var(--vl-checkbox--success-color);
    }

    /* Success state - box background when checked/indeterminate */

    .vl-checkbox--success .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::after,
    .vl-checkbox.valid.validated .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::after,
    .vl-checkbox--success .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::after,
    .vl-checkbox.valid.validated .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::after {
        background-color: var(--vl-checkbox--color-white);
        border-color: var(--vl-checkbox--success-color);
    }

    /* ===================================================================
       Switch Variant Base Styles
       =================================================================== */

    .vl-checkbox--switch + .vl-checkbox__label {
        align-items: center;
    }

    .vl-checkbox--switch__label {
        position: relative;
        display: inline-block;
        width: var(--vl-checkbox--switch-width);
        height: var(--vl-checkbox--switch-height);
        margin: 0 var(--vl-checkbox--label-gap) 0 0;
        padding: var(--vl-checkbox--border-width);
        background: var(--vl-checkbox--color-white);
        border: var(--vl-checkbox--border-width) solid var(--vl-checkbox--color-border);
        border-radius: 2em;
        outline: 0.2rem transparent solid;
        cursor: pointer;
        user-select: none;
        vertical-align: middle;
        line-height: 1rem;
        transition: box-shadow var(--vl-checkbox--transition-fast);
    }

    /* Switch knob (::after) */

    .vl-checkbox--switch__label::after {
        position: relative;
        display: block;
        width: var(--vl-checkbox--switch-knob-size);
        height: var(--vl-checkbox--switch-knob-size);
        margin-left: 0;
        content: '';
        background: var(--vl-checkbox--color-border);
        border: var(--vl-checkbox--border-width) var(--vl-checkbox--color-border) solid;
        border-radius: 2em;
        transition: padding var(--vl-checkbox--transition-slow), margin var(--vl-checkbox--transition);
    }

    /* Switch checkmark icon (span::before) */

    .vl-checkbox--switch__label span::before {
        position: absolute;
        left: 0;
        z-index: 2;
        display: block;
        margin: 0.3rem 0 0 0.3rem;
        font-size: var(--vl-checkbox--icon-size);
        content: '\\f15c';
        opacity: 0;
        visibility: hidden;
        transform: translate(0.4rem, 0.4rem) scale(0.6);
        transform-origin: 50%;
        transition: margin var(--vl-checkbox--transition), opacity var(--vl-checkbox--transition);
    }

    /* ===================================================================
       Switch States (Checked, Focus, Disabled)
       =================================================================== */

    /* Focus state */

    .vl-checkbox--switch:focus + .vl-checkbox__label .vl-checkbox--switch__label {
        box-shadow: var(--vl-checkbox--focus-shadow);
    }

    /* Checked state */

    .vl-checkbox--switch:checked + .vl-checkbox__label .vl-checkbox--switch__label {
        position: relative;
        background: var(--vl-checkbox--color-primary);
        border-color: var(--vl-checkbox--color-primary);
    }

    .vl-checkbox--switch:checked + .vl-checkbox__label .vl-checkbox--switch__label::before,
    .vl-checkbox--switch:checked + .vl-checkbox__label .vl-checkbox--switch__label span::before {
        margin-left: calc(50% + 0.3rem);
        opacity: 1;
        visibility: visible;
        transform: translate(0.1rem, 0.1rem) scale(1);
    }

    .vl-checkbox--switch:checked + .vl-checkbox__label .vl-checkbox--switch__label::after {
        width: var(--vl-checkbox--switch-knob-size-checked);
        height: var(--vl-checkbox--switch-knob-size-checked);
        margin-left: 50%;
        background-color: var(--vl-checkbox--color-white);
        border-color: var(--vl-checkbox--color-primary);
        transform: translate(-0.1rem, -0.1rem);
    }

    /* Disabled state */

    .vl-checkbox--switch:disabled + .vl-checkbox__label {
        color: var(--vl-checkbox--disabled-color);
    }

    .vl-checkbox--switch:disabled + .vl-checkbox__label .vl-checkbox--switch__label {
        background-color: var(--vl-checkbox--disabled-background);
        border-color: var(--vl-checkbox--disabled-background);
        cursor: default;
    }

    .vl-checkbox--switch:disabled + .vl-checkbox__label .vl-checkbox--switch__label::after {
        border-color: var(--vl-checkbox--disabled-background-light);
    }

    .vl-checkbox--switch:checked:disabled + .vl-checkbox__label .vl-checkbox--switch__label {
        border-color: var(--vl-checkbox--disabled-background);
    }

    .vl-checkbox--switch:checked:disabled + .vl-checkbox__label .vl-checkbox--switch__label::after {
        border-color: var(--vl-checkbox--disabled-background);
    }

    /* ===================================================================
       Switch Validation States (Error, Success)
       =================================================================== */

    /* Error state */

    .vl-checkbox--error .vl-checkbox--switch + .vl-checkbox__label .vl-checkbox--switch__label {
        background: var(--vl-checkbox--color-white);
        color: var(--vl-checkbox--switch-error-color);
        border-color: var(--vl-checkbox--switch-error-color);
    }

    .vl-checkbox--error .vl-checkbox--switch + .vl-checkbox__label .vl-checkbox--switch__label::after {
        border-color: var(--vl-checkbox--switch-error-color) !important;
    }

    .vl-checkbox--error .vl-checkbox--switch:not(:checked) + .vl-checkbox__label .vl-checkbox--switch__label::after {
        background: var(--vl-checkbox--color-white);
    }

    .vl-checkbox--error .vl-checkbox--switch:checked + .vl-checkbox__label .vl-checkbox--switch__label {
        background: var(--vl-checkbox--switch-error-background);
        border-color: var(--vl-checkbox--switch-error-color);
    }

    /* Success state */

    .vl-checkbox--success .vl-checkbox--switch + .vl-checkbox__label .vl-checkbox--switch__label {
        background: var(--vl-checkbox--color-white);
        color: var(--vl-checkbox--switch-success-color);
        border-color: var(--vl-checkbox--switch-success-color);
    }

    .vl-checkbox--success .vl-checkbox--switch + .vl-checkbox__label .vl-checkbox--switch__label::after {
        border-color: var(--vl-checkbox--switch-success-color) !important;
    }

    .vl-checkbox--success .vl-checkbox--switch:not(:checked) + .vl-checkbox__label .vl-checkbox--switch__label::after {
        background: var(--vl-checkbox--color-white);
    }

    .vl-checkbox--success .vl-checkbox--switch:checked + .vl-checkbox__label .vl-checkbox--switch__label {
        background: var(--vl-checkbox--switch-success-background);
        border-color: var(--vl-checkbox--switch-success-color);
    }
`;
