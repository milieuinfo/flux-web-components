import { css, CSSResult } from 'lit';

export const vlCheckboxComponentFluxStyles: CSSResult = css`
    :host {
        --vl-checkbox--switch__error-color: #d2373c;
        --vl-checkbox--switch__error-background-color: #fbebec;
        --vl-checkbox--switch__success-color: #009e47;
        --vl-checkbox--switch__success-background-color: #e6f5ed;
    }

    /* Base checkbox styles */
    .vl-checkbox {
        position: relative;
        display: inline-block;
        max-width: 100%;
    }

    .vl-checkbox:not(.vl-checkbox--block):not(:last-of-type) {
        margin-right: 1.5rem;
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

    .vl-checkbox__label .vl-checkbox__box {
        position: relative;
        flex: 0 0 1.8rem;
        width: 1.8rem;
        height: 1.8rem;
        margin-top: 0.3rem;
        margin-right: 1rem;
        line-height: 1;
    }

    .vl-checkbox__label .vl-checkbox__box::before,
    .vl-checkbox__label .vl-checkbox__box::after {
        font-family: 'vlaanderen-icon' !important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-style: normal;
        font-variant: normal;
        font-weight: normal;
        text-decoration: none;
        text-transform: none;
    }

    @media screen and (max-width: 767px) {
        .vl-checkbox__label .vl-checkbox__box {
            margin-top: 0.2rem;
        }
    }

    .vl-checkbox__label .vl-checkbox__box::before {
        position: absolute;
        display: block;
        font-size: 0.8rem;
        color: #8695a8;
        line-height: 1;
        text-align: center;
        transform: translateZ(0) translate(-50%, -50%) scale(0);
        transition:
            transform 0.2s cubic-bezier(1, 0.1, 0, 0.9),
            color 0.2s cubic-bezier(1, 0.1, 0, 0.9);
        top: 0.9rem;
        left: 0.9rem;
        z-index: 2;
    }

    .vl-checkbox__label .vl-checkbox__box::after {
        display: inline-block;
        content: '';
        background: #fff;
        width: 1.8rem;
        height: 1.8rem;
        border: 0.1rem #8695a8 solid;
        outline: 0.2rem transparent solid;
        cursor: pointer;
        overflow: hidden;
        white-space: nowrap;
        transition: all 0.2s cubic-bezier(1, 0.1, 0, 0.9);
        z-index: 1;
        border-radius: 0.3rem;
    }

    .vl-checkbox__toggle {
        position: absolute;
        overflow: hidden;
        clip: rect(0 0 0 0);
        width: 0.1rem;
        height: 0.1rem;
        padding: 0;
        margin: -0.1rem;
    }

    .vl-checkbox__toggle:focus + .vl-checkbox__label .vl-checkbox__box::after {
        box-shadow:
            0 0 0 2px #fff,
            0 0 0 5px rgba(0, 85, 204, 0.65);
        outline: transparent solid 0.2rem;
    }

    @supports (outline-offset: 2px) {
        .vl-checkbox__toggle:focus + .vl-checkbox__label .vl-checkbox__box::after {
            box-shadow: none;
            outline: 3px solid rgba(0, 85, 204, 0.65);
            outline-offset: 2px;
        }
    }

    .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::before {
        content: '\\f15c';
    }

    .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::before {
        content: '\\f20e';
        font-size: 0.8rem;
        font-weight: bold;
    }

    .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::before,
    .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::before {
        transform: translateZ(0) translate(-50%, -50%) scale(1);
        color: #fff;
    }

    .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::after,
    .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::after {
        background: #05c;
        border: 0.1rem #05c solid;
    }

    /* Checkbox variants */
    .vl-checkbox--block {
        display: block;
        margin: 0;
    }

    .vl-checkbox--disabled .vl-checkbox__label {
        color: #687483;
    }

    .vl-checkbox--disabled .vl-checkbox__label .vl-checkbox__box::after {
        background-color: #8695a8;
        border-color: #8695a8;
        cursor: auto;
    }

    .vl-checkbox--disabled .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::after,
    .vl-checkbox--disabled .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::after {
        background: #8695a8;
        border: 0.1rem #8695a8 solid;
    }

    .vl-checkbox--single {
        margin: 0;
    }

    .vl-checkbox--single .vl-checkbox__label {
        padding: 0;
    }

    .vl-checkbox--single .vl-checkbox__label .vl-checkbox__box {
        margin: 0;
    }

    .vl-checkbox--single .vl-checkbox__label .vl-checkbox__box::after {
        position: relative;
        top: auto;
        left: auto;
    }

    .vl-checkbox--single .vl-checkbox--switch + .vl-checkbox__label .vl-checkbox--switch__label {
        margin: 0;
    }

    /* Error state */
    .vl-checkbox--error .vl-checkbox__label .vl-checkbox__box::after,
    .vl-checkbox.invalid.validated .vl-checkbox__label .vl-checkbox__box::after {
        background-color: #fff;
        border-color: #d2373c;
    }

    .vl-checkbox--error .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::before,
    .vl-checkbox.invalid.validated .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::before,
    .vl-checkbox--error .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::before,
    .vl-checkbox.invalid.validated .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::before {
        color: #d2373c;
    }

    .vl-checkbox--error .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::after,
    .vl-checkbox.invalid.validated .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::after,
    .vl-checkbox--error .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::after,
    .vl-checkbox.invalid.validated .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::after {
        background-color: #fff;
        border: 0.1rem #d2373c solid;
    }

    /* Success state */
    .vl-checkbox--success .vl-checkbox__label .vl-checkbox__box::after,
    .vl-checkbox.valid.validated .vl-checkbox__label .vl-checkbox__box::after {
        background-color: #fff;
        border-color: #009e47;
    }

    .vl-checkbox--success .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::before,
    .vl-checkbox.valid.validated .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::before,
    .vl-checkbox--success .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::before,
    .vl-checkbox.valid.validated .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::before {
        color: #009e47;
    }

    .vl-checkbox--success .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::after,
    .vl-checkbox.valid.validated .vl-checkbox__toggle:checked + .vl-checkbox__label .vl-checkbox__box::after,
    .vl-checkbox--success .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::after,
    .vl-checkbox.valid.validated .vl-checkbox__toggle:indeterminate + .vl-checkbox__label .vl-checkbox__box::after {
        background-color: #fff;
        border: 0.1rem #009e47 solid;
    }

    .vl-checkbox--empty {
        margin-top: 0;
    }

    /* Switch styles */
    .vl-checkbox--switch {
        position: absolute;
        overflow: hidden;
        clip: rect(0 0 0 0);
        width: 0.1rem;
        height: 0.1rem;
        padding: 0;
        margin: -0.1rem;
    }

    .vl-checkbox--switch:focus + .vl-checkbox__label .vl-checkbox--switch__label {
        box-shadow:
            0 0 0 2px #fff,
            0 0 0 5px rgba(0, 85, 204, 0.65);
    }

    .vl-checkbox--switch:checked + .vl-checkbox__label .vl-checkbox--switch__label {
        background: #05c;
        border-color: #05c;
        position: relative;
    }

    .vl-checkbox--switch:checked + .vl-checkbox__label .vl-checkbox--switch__label::before,
    .vl-checkbox--switch:checked + .vl-checkbox__label .vl-checkbox--switch__label span::before {
        margin-left: calc(50% + 0.3rem);
        transform: translate(0.1rem, 0.1rem) scale(1);
        visibility: visible;
        opacity: 1;
    }

    .vl-checkbox--switch:checked + .vl-checkbox__label .vl-checkbox--switch__label::after {
        width: 2rem;
        height: 2rem;
        margin-left: 50%;
        background-color: #fff;
        border-color: #05c;
        transform: translate(-0.1rem, -0.1rem);
    }

    .vl-checkbox--switch:checked:disabled + .vl-checkbox__label .vl-checkbox--switch__label {
        border-color: #8695a8;
    }

    .vl-checkbox--switch:checked:disabled + .vl-checkbox__label .vl-checkbox--switch__label::after {
        border-color: #8695a8;
    }

    .vl-checkbox--switch + .vl-checkbox__label {
        align-items: center;
    }

    .vl-checkbox--switch + .vl-checkbox__label .vl-checkbox--switch__label {
        position: relative;
        display: inline-block;
        width: 4rem;
        height: 2.2rem;
        cursor: pointer;
        user-select: none;
        vertical-align: middle;
        outline: transparent solid 0.2rem;
        margin: 0 1rem 0 0;
        background: #fff;
        border: 0.1rem solid #8695a8;
        border-radius: 2em;
        padding: 0.1rem;
        transition: box-shadow 0.1s cubic-bezier(1, 0.1, 0, 0.9);
        line-height: 1rem;
    }

    .vl-checkbox--switch + .vl-checkbox__label .vl-checkbox--switch__label span::before,
    .vl-checkbox--switch + .vl-checkbox__label .vl-checkbox--switch__label span::after {
        font-family: 'vlaanderen-icon' !important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-style: normal;
        font-variant: normal;
        font-weight: normal;
        text-decoration: none;
        text-transform: none;
    }

    .vl-checkbox--switch + .vl-checkbox__label .vl-checkbox--switch__label span::before {
        content: '\\f15c';
        font-size: 0.8rem;
        display: block;
        position: absolute;
        left: 0;
        margin: 0.3rem 0 0 0.3rem;
        transform: translate(0.4rem, 0.4rem) scale(0.6);
        transform-origin: 50%;
        transition:
            margin 0.2s cubic-bezier(1, 0.1, 0, 0.9),
            opacity 0.2s cubic-bezier(1, 0.1, 0, 0.9);
        opacity: 0;
        visibility: hidden;
        z-index: 2;
    }

    .vl-checkbox--switch + .vl-checkbox__label .vl-checkbox--switch__label::after {
        position: relative;
        display: block;
        margin-left: 0;
        content: '';
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 2em;
        background: #8695a8;
        border: 0.1rem #8695a8 solid;
        transition:
            padding 0.3s ease,
            margin 0.2s cubic-bezier(1, 0.1, 0, 0.9);
    }

    .vl-checkbox--switch:disabled + .vl-checkbox__label {
        color: #687483;
    }

    .vl-checkbox--switch:disabled + .vl-checkbox__label .vl-checkbox--switch__label {
        background-color: #8695a8;
        border-color: #8695a8;
        cursor: default;
    }

    .vl-checkbox--switch:disabled + .vl-checkbox__label .vl-checkbox--switch__label::after {
        border-color: #f3f5f6;
    }

    /* Switch error state */
    .vl-checkbox--error .vl-checkbox--switch + .vl-checkbox__label .vl-checkbox--switch__label::after {
        border-color: var(--vl-checkbox--switch__error-color) !important;
    }

    .vl-checkbox--error .vl-checkbox--switch:not(:checked) + .vl-checkbox__label .vl-checkbox--switch__label::after {
        background: #fff;
    }

    .vl-checkbox--error .vl-checkbox--switch + .vl-checkbox__label .vl-checkbox--switch__label {
        background: #fff;
        color: var(--vl-checkbox--switch__error-color);
        border-color: var(--vl-checkbox--switch__error-color);
    }

    .vl-checkbox--error .vl-checkbox--switch:checked + .vl-checkbox__label .vl-checkbox--switch__label {
        background: var(--vl-checkbox--switch__error-background-color);
        border-color: var(--vl-checkbox--switch__error-color);
    }

    /* Switch success state */
    .vl-checkbox--success .vl-checkbox--switch + .vl-checkbox__label .vl-checkbox--switch__label::after {
        border-color: var(--vl-checkbox--switch__success-color) !important;
    }

    .vl-checkbox--success .vl-checkbox--switch:not(:checked) + .vl-checkbox__label .vl-checkbox--switch__label::after {
        background: #fff;
    }

    .vl-checkbox--success .vl-checkbox--switch + .vl-checkbox__label .vl-checkbox--switch__label {
        background: #fff;
        color: var(--vl-checkbox--switch__success-color);
        border-color: var(--vl-checkbox--switch__success-color);
    }

    .vl-checkbox--success .vl-checkbox--switch:checked + .vl-checkbox__label .vl-checkbox--switch__label {
        background: var(--vl-checkbox--switch__success-background-color);
        border-color: var(--vl-checkbox--switch__success-color);
    }

    /* Checkbox annotation */
    .vl-checkbox__annotation {
        margin-left: auto;
        font-size: 1.5rem;
    }
`;
