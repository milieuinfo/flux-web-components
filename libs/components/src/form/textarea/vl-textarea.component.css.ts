import { vlVisuallyHiddenMixin } from '@domg-wc/styles';
import { css, CSSResult, unsafeCSS } from 'lit';
import textareaComponentRawCss from './vl-textarea.component.raw.css?raw';

export const vlTextareaComponentStyles: CSSResult = css`
    ${unsafeCSS(textareaComponentRawCss)}

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    /* ===================================================================
       Textarea Base Styles
       =================================================================== */

    .vl-textarea {
        display: inline-block;
        background: var(--vl-color--white);
        font-family: var(--vl-font);
        font-size: var(--vl-font-size--small);
        color: var(--vl-color--text);
        max-width: 100%;
        height: auto;
        line-height: normal;
        border-radius: var(--vl-border--radius);
        border: var(--vl-border--width) solid var(--vl-color--border-alt);
        -webkit-appearance: none;
        padding: var(--vl-textarea--padding);
        transition: background-color var(--vl-transition);
        margin: var(--vl-textarea--margin);
    }

    /* ===================================================================
       Textarea States (Hover, Focus, Placeholder)
       =================================================================== */

    /* Hover state */

    .vl-textarea:hover {
        border: 0.2rem solid var(--vl-color--focus);
        padding: 0.9rem;
    }

    .vl-textarea:hover.vl-textarea--error,
    .vl-textarea:hover.invalid.validated {
        border-color: var(--vl-color--error);
    }

    .vl-textarea:hover.vl-textarea--success,
    .vl-textarea:hover.valid.validated {
        border-color: var(--vl-color--success);
    }

    /* Focus state */

    .vl-textarea:focus,
    .vl-textarea--focus {
        box-shadow: var(--vl-focus--shadow);
        outline: transparent solid 0.2rem;
        border: var(--vl-border--width) solid var(--vl-color--text-alt);
        padding: var(--vl-textarea--padding);
    }

    @supports (outline-offset: 2px) {
        .vl-textarea:focus,
        .vl-textarea--focus {
            box-shadow: none;
            outline: var(--vl-focus--outline);
            outline-offset: var(--vl-focus--outline-offset);
        }
    }

    .vl-textarea:focus.vl-textarea--error,
    .vl-textarea:focus.invalid.validated,
    .vl-textarea--focus.vl-textarea--error,
    .vl-textarea--focus.invalid.validated {
        border-color: var(--vl-color--error);
    }

    .vl-textarea:focus.vl-textarea--success,
    .vl-textarea:focus.valid.validated,
    .vl-textarea--focus.vl-textarea--success,
    .vl-textarea--focus.valid.validated {
        border-color: var(--vl-color--success);
    }

    /* Placeholder */

    .vl-textarea::placeholder {
        color: var(--vl-color--text-alt);
    }

    /* ===================================================================
       Textarea Variants (Block)
       =================================================================== */

    .vl-textarea--block {
        display: block;
        width: 100%;
        box-sizing: border-box;
    }

    /* ===================================================================
       Textarea Validation States (Error, Success)
       =================================================================== */

    /* Error state */

    .vl-textarea--error,
    .vl-textarea.invalid.validated {
        border-color: var(--vl-color--error);
        background-color: var(--vl-color--error-background);
    }

    .vl-textarea--error:focus,
    .vl-textarea.invalid.validated:focus {
        background-color: var(--vl-color--white);
    }

    /* Success state */

    .vl-textarea--success,
    .vl-textarea.valid.validated {
        border-color: var(--vl-color--success);
        background-color: var(--vl-color--success-bg);
        display: inline;
    }

    /* ===================================================================
       Textarea Disabled State
       =================================================================== */

    .vl-textarea--disabled,
    .vl-textarea[disabled] {
        background-color: var(--vl-color--border-alt--background);
        border-color: var(--vl-color--border-alt);
        color: var(--vl-color--text-alt);
    }

    .vl-textarea--disabled:hover,
    .vl-textarea[disabled]:hover {
        border-width: var(--vl-border--width);
        padding: var(--vl-textarea--padding);
    }

    /* ===================================================================
       Textarea Character Counter
       =================================================================== */

    .vl-textarea__counter {
        font-family: var(--vl-font);
        font-size: var(--vl-font-size--small);
        color: var(--vl-textarea--counter-color);
    }

    .vl-textarea__counter-status {
        ${vlVisuallyHiddenMixin()};
    }
`;
