import { css, CSSResult, unsafeCSS } from 'lit';
import radioComponentRawCss from './vl-radio.component.raw.css?raw';

export const vlRadioComponentStyles: CSSResult = css`
    ${unsafeCSS(radioComponentRawCss)}

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    /* ===================================================================
       Visually Hidden Input
       =================================================================== */

    .vl-radio__toggle {
        position: absolute;
        overflow: hidden;
        clip: rect(0 0 0 0);
        width: 0.1rem;
        height: 0.1rem;
        padding: 0;
        margin: -0.1rem;
    }

    /* ===================================================================
       Radio Base Styles
       =================================================================== */

    .vl-radio {
        position: relative;
        display: inline-block;
        margin-top: 0.2rem;
        margin-right: 5rem;
    }

    .vl-radio:not(.vl-radio--block):not(:last-of-type) {
        margin-right: 1.5rem;
    }

    /* ===================================================================
       Radio Label & Pseudo-Elements
       =================================================================== */

    .vl-radio__label {
        position: relative;
        padding: 0 0 0 var(--vl-radio--label-padding-left);
        line-height: 2.8rem;
        font-size: var(--vl-font-size--small);
    }

    .vl-radio__label::before,
    .vl-radio__label::after {
        position: absolute;
        display: block;
        content: '';
        cursor: pointer;
        border-radius: 100%;
    }

    /* Inner dot */

    .vl-radio__label::before {
        background-color: var(--vl-color--white);
        width: var(--vl-radio--dot-size);
        height: var(--vl-radio--dot-size);
        top: 1rem;
        left: 0.6rem;
        transform: scale(0);
        transition: border-color var(--vl-transition);
        z-index: 2;
    }

    /* Outer circle */

    .vl-radio__label::after {
        background-color: var(--vl-color--white);
        width: var(--vl-radio--circle-size);
        height: var(--vl-radio--circle-size);
        top: 0.4rem;
        left: 0;
        border: var(--vl-border--width) solid var(--vl-color--border-alt);
        text-indent: 100%;
        overflow: hidden;
        white-space: nowrap;
        transition: border-color var(--vl-transition), box-shadow var(--vl-transition--fast);
        z-index: 1;
    }

    /* ===================================================================
       Radio States (Focus, Checked, Readonly)
       =================================================================== */

    /* Focus state */

    .vl-radio__toggle:focus + .vl-radio__label::after {
        box-shadow: var(--vl-focus--shadow);
        outline: transparent solid 0.2rem;
    }

    @supports (outline-offset: 2px) {
        .vl-radio__toggle:focus + .vl-radio__label::after {
            box-shadow: none;
            outline: var(--vl-focus--outline);
            outline-offset: var(--vl-focus--outline-offset);
        }
    }

    /* Checked state */

    .vl-radio__toggle:checked + .vl-radio__label::before {
        transform: scale(1);
        background-color: var(--vl-color--white);
    }

    .vl-radio__toggle:checked + .vl-radio__label::after {
        background: var(--vl-color--action);
        border: 0;
    }

    /* Readonly state */

    .vl-radio__toggle:read-only + .vl-radio__label::before {
        pointer-events: none !important;
    }

    /* ===================================================================
       Radio Variants (Block, Disabled)
       =================================================================== */

    /* Block variant */

    .vl-radio--block {
        display: block;
        margin: 0;
    }

    /* Disabled variant */

    .vl-radio--disabled .vl-radio__label {
        color: var(--vl-color--text-alt);
    }

    .vl-radio--disabled .vl-radio__label::after {
        background-color: var(--vl-color--border-alt);
        border-color: var(--vl-color--border-alt);
    }

    .vl-radio--disabled .vl-radio__toggle:checked + .vl-radio__label::before {
        background-color: var(--vl-color--white);
    }

    .vl-radio--disabled .vl-radio__toggle:checked + .vl-radio__label::after {
        background: var(--vl-color--border-alt);
        border: var(--vl-border--width) var(--vl-color--border-alt) solid;
    }

    /* ===================================================================
       Radio Validation States (Error, Success)
       =================================================================== */

    /* Error state */

    .vl-radio--error .vl-radio__label::after,
    .vl-radio.invalid.validated .vl-radio__label::after {
        background-color: var(--vl-color--white);
        border-color: var(--vl-color--error);
    }

    .vl-radio--error .vl-radio__toggle:checked + .vl-radio__label::before,
    .vl-radio.invalid.validated .vl-radio__toggle:checked + .vl-radio__label::before {
        background-color: var(--vl-color--error);
    }

    .vl-radio--error .vl-radio__toggle:checked + .vl-radio__label::after,
    .vl-radio.invalid.validated .vl-radio__toggle:checked + .vl-radio__label::after {
        background-color: var(--vl-color--white);
        border: var(--vl-border--width) var(--vl-color--error) solid;
    }

    /* Success state */

    .vl-radio--success .vl-radio__label::after,
    .vl-radio.valid.validated .vl-radio__label::after {
        background-color: var(--vl-color--white);
        border-color: var(--vl-color--success);
    }

    .vl-radio--success .vl-radio__toggle:checked + .vl-radio__label::before,
    .vl-radio.valid.validated .vl-radio__toggle:checked + .vl-radio__label::before {
        background-color: var(--vl-color--success);
    }

    .vl-radio--success .vl-radio__toggle:checked + .vl-radio__label::after,
    .vl-radio.valid.validated .vl-radio__toggle:checked + .vl-radio__label::after {
        background-color: var(--vl-color--white);
        border: var(--vl-border--width) var(--vl-color--success) solid;
    }
`;
