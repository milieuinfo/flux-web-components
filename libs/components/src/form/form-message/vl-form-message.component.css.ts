import { css, CSSResult, unsafeCSS } from 'lit';
import formMessageComponentRawCss from './vl-form-message.component.raw.css?raw';

export const vlFormMessageComponentStyles: CSSResult = css`
    ${unsafeCSS(formMessageComponentRawCss)}

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    /* ===================================================================
       Form Message Base Styles (Error, Success & Annotation)
       =================================================================== */

    .vl-form__error,
    .vl-form__success,
    .vl-form__annotation {
        font-size: 1.4rem;
        margin-top: var(--vl-form-message--margin-top);
        margin-bottom: var(--vl-form-message--margin-bottom);
    }

    .vl-form__error,
    .vl-form__success {
        font-weight: 500;
    }

    .vl-form__annotation {
        font-weight: 400;
    }

    @media screen and (max-width: 767px) {
        .vl-form__error,
        .vl-form__success,
        .vl-form__annotation {
            font-size: var(--vl-font-size--small);
        }
    }

    .vl-form__error--block,
    .vl-form__success--block {
        display: block;
    }

    /* Icon styles */

    .vl-form__error .vl-vi,
    .vl-form__success .vl-vi {
        margin-left: 0.5rem;
        font-size: 0.8rem;
    }

    /* ===================================================================
       Form Message Error State
       =================================================================== */

    .vl-form__error {
        color: var(--vl-color--error);
    }

    /* ===================================================================
       Form Message Success State
       =================================================================== */

    .vl-form__success {
        color: var(--vl-color--success);
    }

    /* ===================================================================
       Form Message Annotation State
       =================================================================== */

    .vl-form__annotation {
        color: var(--vl-color--text-subtle);
    }

    /* ===================================================================
       Form Message Pre-line Variant
       =================================================================== */

    .vl-pre-line {
        white-space: pre-line;
    }
`;
