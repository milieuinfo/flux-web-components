import { css, CSSResult } from 'lit';

export const vlRadioComponentFluxStyles: CSSResult = css`
    /* Base radio styles */
    .vl-radio {
        position: relative;
        display: inline-block;
        margin-top: 0.2rem;
        margin-right: 5rem;
    }

    .vl-radio:not(.vl-radio--block):not(:last-of-type) {
        margin-right: 1.5rem;
    }

    .vl-radio__label {
        position: relative;
        padding: 0 0 0 2.4rem;
        line-height: 2.8rem;
        font-size: 1.6rem;
    }

    .vl-radio__label::before,
    .vl-radio__label::after {
        position: absolute;
        display: block;
        content: '';
        cursor: pointer;
        border-radius: 100%;
    }

    .vl-radio__label::before {
        background-color: #fff;
        height: 6px;
        width: 6px;
        top: 10px;
        left: 6px;
        transform: scale(0);
        transition: border-color 0.2s cubic-bezier(1, 0.1, 0, 0.9);
        z-index: 2;
    }

    @media screen and (max-width: 767px) {
        .vl-radio__label::before {
            font-size: 1.6rem;
        }
    }

    .vl-radio__label::after {
        background-color: #fff;
        width: 18px;
        height: 18px;
        top: 4px;
        left: 0;
        border: 0.1rem solid #8695a8;
        text-indent: 100%;
        overflow: hidden;
        white-space: nowrap;
        transition:
            border-color 0.2s cubic-bezier(1, 0.1, 0, 0.9),
            box-shadow 0.1s cubic-bezier(1, 0.1, 0, 0.9);
        z-index: 1;
    }

    .vl-radio__toggle {
        position: absolute;
        overflow: hidden;
        clip: rect(0 0 0 0);
        width: 0.1rem;
        height: 0.1rem;
        padding: 0;
        margin: -0.1rem;
    }

    .vl-radio__toggle:focus + .vl-radio__label::after {
        box-shadow:
            0 0 0 2px #fff,
            0 0 0 5px rgba(0, 85, 204, 0.65);
        outline: transparent solid 0.2rem;
    }

    @supports (outline-offset: 2px) {
        .vl-radio__toggle:focus + .vl-radio__label::after {
            box-shadow: none;
            outline: 3px solid rgba(0, 85, 204, 0.65);
            outline-offset: 2px;
        }
    }

    .vl-radio__toggle:checked + .vl-radio__label::before {
        transform: scale(1);
        background-color: #fff;
    }

    .vl-radio__toggle:checked + .vl-radio__label::after {
        background: #05c;
        border: 0;
    }

    /* Radio variants */
    .vl-radio--block {
        display: block;
        margin: 0;
    }

    .vl-radio--disabled .vl-radio__label {
        color: #687483;
    }

    .vl-radio--disabled .vl-radio__label::after {
        background-color: #8695a8;
        border-color: #8695a8;
    }

    .vl-radio--disabled .vl-radio__toggle:checked + .vl-radio__label::before {
        background-color: #fff;
    }

    .vl-radio--disabled .vl-radio__toggle:checked + .vl-radio__label::after {
        background: #8695a8;
        border: 0.1rem #8695a8 solid;
    }

    .vl-radio--single {
        margin: 0;
    }

    .vl-radio--single .vl-radio__label {
        padding: 0;
    }

    .vl-radio--single .vl-radio__label::after {
        position: relative;
    }

    /* Error state */
    .vl-radio--error .vl-radio__label::after,
    .vl-radio.invalid.validated .vl-radio__label::after {
        background-color: #fff;
        border-color: #d2373c;
    }

    .vl-radio--error .vl-radio__toggle:checked + .vl-radio__label::before,
    .vl-radio.invalid.validated .vl-radio__toggle:checked + .vl-radio__label::before {
        background-color: #d2373c;
    }

    .vl-radio--error .vl-radio__toggle:checked + .vl-radio__label::after,
    .vl-radio.invalid.validated .vl-radio__toggle:checked + .vl-radio__label::after {
        background-color: #fff;
        border: 0.1rem #d2373c solid;
    }

    /* Success state */
    .vl-radio--success .vl-radio__label::after,
    .vl-radio.valid.validated .vl-radio__label::after {
        background-color: #fff;
        border-color: #009e47;
    }

    .vl-radio--success .vl-radio__toggle:checked + .vl-radio__label::before,
    .vl-radio.valid.validated .vl-radio__toggle:checked + .vl-radio__label::before {
        background-color: #009e47;
    }

    .vl-radio--success .vl-radio__toggle:checked + .vl-radio__label::after,
    .vl-radio.valid.validated .vl-radio__toggle:checked + .vl-radio__label::after {
        background-color: #fff;
        border: 0.1rem #009e47 solid;
    }

    /* Custom flux styles */
    .vl-radio__toggle:read-only + .vl-radio__label::before {
        pointer-events: none !important;
    }
`;
