import { css, CSSResult, unsafeCSS } from 'lit';
import checkboxComponentRawCss from './vl-checkbox.component.raw.css?raw';

export const vlCheckboxComponentStyles: CSSResult = css`
    ${unsafeCSS(checkboxComponentRawCss)}

    *,
    *::before,
    *::after {
        box-sizing: border-box;
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
        margin-right: var(--vl-spacing--small);
    }

    .vl-checkbox__label {
        display: flex;
        flex: 0 0 auto;
        font-size: var(--vl-font-size--small);
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
        margin-right: var(--vl-spacing--xsmall);
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
        color: var(--vl-color--border-alt);
        line-height: 1;
        text-align: center;
        transform: translateZ(0) translate(-50%, -50%) scale(0);
        transition: transform var(--vl-transition), color var(--vl-transition);
    }

    /* Checkbox box background (::after) */

    .vl-checkbox__box::after {
        display: inline-block;
        width: var(--vl-checkbox--box-size);
        height: var(--vl-checkbox--box-size);
        content: '';
        background: var(--vl-color--white);
        border: var(--vl-border--width) var(--vl-color--border-alt) solid;
        border-radius: var(--vl-border--radius);
        outline: 0.2rem transparent solid;
        cursor: pointer;
        overflow: hidden;
        white-space: nowrap;
        transition: all var(--vl-transition);
        z-index: 1;
    }

    /* ===================================================================
       Checkbox States (Checked, Indeterminate, Focus)
       =================================================================== */

    /* Focus state */

    .vl-checkbox__toggle:focus + .vl-checkbox__label .vl-checkbox__box::after {
        box-shadow: var(--vl-focus--shadow);
        outline: transparent solid 0.2rem;
    }

    @supports (outline-offset: 2px) {
        .vl-checkbox__toggle:focus + .vl-checkbox__label .vl-checkbox__box::after {
            box-shadow: none;
            outline: var(--vl-focus--outline);
            outline-offset: var(--vl-focus--outline-offset);
        }
    }

    /* Indeterminate state */

    .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::before {
        font-size: var(--vl-checkbox--icon-size);
        font-weight: bold;
    }

    /* Checked & Indeterminate: show icon and change colors */

    .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::before,
    .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::before {
        transform: translateZ(0) translate(-50%, -50%) scale(1);
        color: var(--vl-color--white);
    }

    .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::after,
    .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::after {
        background: var(--vl-color--action);
        border-color: var(--vl-color--action);
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
        color: var(--vl-color--text-alt);
    }

    .vl-checkbox--disabled .vl-checkbox__box::after {
        background-color: var(--vl-color--border-alt);
        border-color: var(--vl-color--border-alt);
        cursor: auto;
    }

    .vl-checkbox--disabled .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::after,
    .vl-checkbox--disabled .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::after {
        background: var(--vl-color--border-alt);
        border-color: var(--vl-color--border-alt);
    }

    /* ===================================================================
       Checkbox Validation States (Error, Success)
       =================================================================== */

    /* Error state - unchecked */

    .vl-checkbox--error .vl-checkbox__box::after,
    .vl-checkbox.invalid.validated .vl-checkbox__box::after {
        background-color: var(--vl-color--white);
        border-color: var(--vl-color--error);
    }

    /* Error state - checkmark color when checked/indeterminate */

    .vl-checkbox--error .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::before,
    .vl-checkbox.invalid.validated .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::before,
    .vl-checkbox--error .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::before,
    .vl-checkbox.invalid.validated .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::before {
        color: var(--vl-color--error);
    }

    /* Error state - box background when checked/indeterminate */

    .vl-checkbox--error .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::after,
    .vl-checkbox.invalid.validated .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::after,
    .vl-checkbox--error .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::after,
    .vl-checkbox.invalid.validated .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::after {
        background-color: var(--vl-color--white);
        border-color: var(--vl-color--error);
    }

    /* Success state - unchecked */

    .vl-checkbox--success .vl-checkbox__box::after,
    .vl-checkbox.valid.validated .vl-checkbox__box::after {
        background-color: var(--vl-color--white);
        border-color: var(--vl-color--success);
    }

    /* Success state - checkmark color when checked/indeterminate */

    .vl-checkbox--success .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::before,
    .vl-checkbox.valid.validated .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::before,
    .vl-checkbox--success .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::before,
    .vl-checkbox.valid.validated .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::before {
        color: var(--vl-color--success);
    }

    /* Success state - box background when checked/indeterminate */

    .vl-checkbox--success .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::after,
    .vl-checkbox.valid.validated .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::after,
    .vl-checkbox--success .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::after,
    .vl-checkbox.valid.validated .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::after {
        background-color: var(--vl-color--white);
        border-color: var(--vl-color--success);
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
        margin: 0 var(--vl-spacing--xsmall) 0 0;
        padding: var(--vl-border--width);
        background: var(--vl-color--white);
        border: var(--vl-border--width) solid var(--vl-color--border-alt);
        border-radius: 2em;
        outline: 0.2rem transparent solid;
        cursor: pointer;
        user-select: none;
        vertical-align: middle;
        line-height: 1rem;
        transition: box-shadow var(--vl-transition--fast);
    }

    /* Switch knob (::after) */

    .vl-checkbox--switch__label::after {
        position: relative;
        display: block;
        width: var(--vl-checkbox--switch-knob-size);
        height: var(--vl-checkbox--switch-knob-size);
        margin-left: 0;
        content: '';
        background: var(--vl-color--border-alt);
        border: var(--vl-border--width) var(--vl-color--border-alt) solid;
        border-radius: 2em;
        transition: padding var(--vl-transition--slow), margin var(--vl-transition);
    }

    /* Switch checkmark icon (span::before) */

    .vl-checkbox--switch__label span::before {
        position: absolute;
        left: 0;
        z-index: 2;
        display: block;
        margin: 0.3rem 0 0 0.3rem;
        font-size: var(--vl-checkbox--icon-size);
        line-height: 1rem;
        opacity: 0;
        visibility: hidden;
        transform: translate(0.4rem, 0.4rem) scale(0.6);
        transform-origin: 50%;
        transition: margin var(--vl-transition), opacity var(--vl-transition);
    }

    /* ===================================================================
       Switch States (Checked, Focus, Disabled)
       =================================================================== */

    /* Focus state */

    .vl-checkbox--switch:focus + .vl-checkbox__label .vl-checkbox--switch__label {
        box-shadow: var(--vl-focus--shadow);
    }

    /* Checked state */

    .vl-checkbox--switch:checked + .vl-checkbox__label .vl-checkbox--switch__label {
        position: relative;
        background: var(--vl-color--action);
        border-color: var(--vl-color--action);
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
        background-color: var(--vl-color--white);
        border-color: var(--vl-color--action);
        transform: translate(-0.1rem, -0.1rem);
    }

    /* Disabled state */

    .vl-checkbox--switch:disabled + .vl-checkbox__label {
        color: var(--vl-color--text-alt);
    }

    .vl-checkbox--switch:disabled + .vl-checkbox__label .vl-checkbox--switch__label {
        background-color: var(--vl-color--border-alt);
        border-color: var(--vl-color--border-alt);
        cursor: default;
    }

    .vl-checkbox--switch:disabled + .vl-checkbox__label .vl-checkbox--switch__label::after {
        border-color: var(--vl-color--border-alt--background);
    }

    .vl-checkbox--switch:checked:disabled + .vl-checkbox__label .vl-checkbox--switch__label {
        border-color: var(--vl-color--border-alt);
    }

    .vl-checkbox--switch:checked:disabled + .vl-checkbox__label .vl-checkbox--switch__label::after {
        border-color: var(--vl-color--border-alt);
    }

    /* ===================================================================
       Switch Validation States (Error, Success)
       =================================================================== */

    /* Error state */

    .vl-checkbox--error .vl-checkbox--switch + .vl-checkbox__label .vl-checkbox--switch__label {
        background: var(--vl-color--white);
        color: var(--vl-color--error);
        border-color: var(--vl-color--error);
    }

    .vl-checkbox--error .vl-checkbox--switch + .vl-checkbox__label .vl-checkbox--switch__label::after {
        border-color: var(--vl-color--error) !important;
    }

    .vl-checkbox--error .vl-checkbox--switch:not(:checked) + .vl-checkbox__label .vl-checkbox--switch__label::after {
        background: var(--vl-color--white);
    }

    .vl-checkbox--error .vl-checkbox--switch:checked + .vl-checkbox__label .vl-checkbox--switch__label {
        background: var(--vl-color--error-background);
        border-color: var(--vl-color--error);
    }

    /* Success state */

    .vl-checkbox--success .vl-checkbox--switch + .vl-checkbox__label .vl-checkbox--switch__label {
        background: var(--vl-color--white);
        color: var(--vl-color--success);
        border-color: var(--vl-color--success);
    }

    .vl-checkbox--success .vl-checkbox--switch + .vl-checkbox__label .vl-checkbox--switch__label::after {
        border-color: var(--vl-color--success) !important;
    }

    .vl-checkbox--success .vl-checkbox--switch:not(:checked) + .vl-checkbox__label .vl-checkbox--switch__label::after {
        background: var(--vl-color--white);
    }

    .vl-checkbox--success .vl-checkbox--switch:checked + .vl-checkbox__label .vl-checkbox--switch__label {
        background: var(--vl-color--success-bg);
        border-color: var(--vl-color--success);
    }
`;
