import { css, CSSResult, unsafeCSS } from 'lit';
import formLabelComponentRawCss from './vl-form-label.component.raw.css?raw';

export const vlFormLabelComponentStyles: CSSResult = css`
    ${unsafeCSS(formLabelComponentRawCss)}

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    /* ===================================================================
       Form Label Base Styles
       =================================================================== */

    .vl-form__label {
        font-size: var(--vl-font-size--small);
        font-weight: 500;
        color: var(--vl-form-label--color);
        display: inline-block;
        line-height: 1;
        margin-right: var(--vl-form-label--margin-right);
        margin-bottom: var(--vl-form-label--margin-bottom);
    }

    /* ===================================================================
       Form Label Variants
       =================================================================== */

    .vl-form__label--block {
        display: block;
        margin-right: 0;
        margin-bottom: var(--vl-form-label--margin-bottom);
    }

    /* ===================================================================
       Form Label Light Variant
       =================================================================== */

    .vl-form__label--light {
        color: var(--vl-color--text-alt);
    }

    /* ===================================================================
       Form Label Annotation
       =================================================================== */

    vl-text[annotation] {
        font-weight: 400;
    }
`;
