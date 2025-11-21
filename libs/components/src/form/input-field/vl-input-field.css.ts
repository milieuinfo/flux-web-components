import { css } from 'lit';

export const inputFieldStyles = css`
    :host([block]) {
        display: block;
        width: 100%;
    }

    * {
        box-sizing: border-box;
    }

    *::before,
    *::after {
        box-sizing: inherit;
    }

    .vl-input-field {
        display: inline-block;
        background: var(--vl-color--white);
        font-family: var(--vl-font);
        font-size: var(--vl-font-size--small);
        color: var(--vl-color--text);
        max-width: 100%;
        height: 3.5rem;
        line-height: 3.5rem;
        border-radius: 0.3rem;
        border: 0.1rem solid var(--vl-color--border-alt);
        padding: 0 1rem;
        transition: background-color 0.2s;

        &:hover,
        &.vl-input-field--input-group-left:hover,
        &.vl-input-field--input-group-right:hover {
            border: 0.2rem solid var(--vl-color--focus);
            padding: 0 0.9rem;
        }

        &.vl-input-field--input-group-left:hover {
            border-right-width: 0.1rem;
            &:focus {
                border-right-width: 0;
            }
        }
        &.vl-input-field--input-group-right:hover {
            border-left-width: 0.1rem;
            &:focus {
                border-left-width: 0;
            }
        }

        &:hover.vl-input-field--error {
            border-color: var(--vl-color--error);
        }

        &:hover.vl-input-field--success {
            border-color: var(--vl-color--success);
        }

        &:focus {
            box-shadow: none;
            outline: 3px solid var(--vl-color--focus);
            outline-offset: 2px;
            border: 0.1rem solid var(--vl-color--border-alt);
            padding: 0 1rem;
        }

        &:first-child:focus {
            z-index: 1;
        }

        &:hover:focus {
            border-width: 0.1rem;
        }

        &:focus.vl-input-field--error {
            border-color: var(--vl-color--error);
        }

        &:focus.vl-input-field--success {
            border-color: var(--vl-color--success);
        }

        &:focus:hover {
            padding: 0 1rem;
        }

        &.vl-input-field--block {
            display: block;
            width: 100%;
        }

        &.vl-input-field--error {
            border-color: var(--vl-color--error);
            background-color: var(--vl-color--error-background);
            display: inline;
        }

        &.vl-input-field--success {
            border-color: var(--vl-color--success);
            background-color: var(--vl-color--success-bg);
            display: inline;
        }

        &.vl-input-field--disabled {
            border-color: var(--vl-color--border-alt);
            background-color: var(--vl-color--border-alt--background);
        }

        &.vl-input-field--disabled:hover {
            border-width: 0.1rem;
            padding: 0 1rem;
        }

        &.vl-input-field--input-group-left,
        &.vl-input-field--input-group-left.vl-input-field--disabled:hover {
            border-radius: 0.3rem 0px 0px 0.3rem;
            border-right-width: 0px;
        }

        &.vl-input-field--input-group-right,
        &.vl-input-field--input-group-right.vl-input-field--disabled:hover {
            border-radius: 0px 0.3rem 0.3rem 0px;
            border-left-width: 0px;
        }
    }
`;
