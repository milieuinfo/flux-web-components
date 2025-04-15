import { css } from 'lit';

export const vlInputAddonStyles = css`
    .vl-input-addon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 3.5rem;
        line-height: 3.5rem;
        min-width: 3.5rem;
        border: 0.1rem solid var(--vl-color--border-alt);
        text-decoration: none;
        padding: 0 1rem;
        font-weight: 500;
        font-size: 1.6rem;
        color: var(--vl-color--text);
        background: #fff;
        margin: 0;
    }

    .vl-input-addon[type='button'] .vl-icon,
    .vl-input-addon[href] .vl-icon {
        color: #05c;
    }
    .vl-input-addon[type='button']:hover,
    .vl-input-addon[href]:hover {
        box-shadow: inset 0 0 0 0.1rem rgba(0, 85, 204, 0.65);
        border-color: rgba(0, 85, 204, 0.65);
        background: rgba(179, 207, 245, 0.3);
    }
    .vl-input-addon[type='button']:hover .vl-icon,
    .vl-input-addon[type='button']:focus .vl-icon,
    .vl-input-addon[href]:hover .vl-icon,
    .vl-input-addon[href]:focus .vl-icon {
        color: var(--vl-color--action-hover);
    }
    .vl-input-addon[type='button']:focus,
    .vl-input-addon[href]:focus {
        box-shadow: 0 0 0 2px #fff, 0 0 0 5px rgba(0, 85, 204, 0.65);
        outline: transparent solid 0.2rem;
    }
    @supports (outline-offset: 2px) {
        .vl-input-addon[type='button']:focus,
        .vl-input-addon[href]:focus {
            box-shadow: none;
            outline: 3px solid rgba(0, 85, 204, 0.65);
            outline-offset: 2px;
        }
    }
    @supports (outline-offset: 2px) {
        .vl-input-addon[type='button']:focus,
        .vl-input-addon[href]:focus {
            box-shadow: none;
            outline: 3px solid rgba(0, 85, 204, 0.65);
            outline-offset: 2px;
        }
    }
    .vl-input-addon[type='button']:hover:focus,
    .vl-input-addon[href]:hover:focus {
        box-shadow: inset 0 0 0 0.1rem rgba(0, 85, 204, 0.65), 0 0 0 2px #fff, 0 0 0 5px rgba(0, 85, 204, 0.65);
    }
    .vl-input-addon--disabled[type='button'],
    .vl-input-addon--disabled[href] {
        background-color: #cbd2d9;
        cursor: not-allowed;
    }
    .vl-input-addon--disabled[type='button'] .vl-icon,
    .vl-input-addon--disabled[href] .vl-icon {
        color: #687483;
    }
    .vl-input-addon--disabled[type='button']:hover,
    .vl-input-addon--disabled[type='button']:active,
    .vl-input-addon--disabled[href]:hover,
    .vl-input-addon--disabled[href]:active {
        background-color: #cbd2d9;
        border-color: #cbd2d9;
    }
    .vl-input-addon--disabled[type='button']:hover .vl-icon,
    .vl-input-addon--disabled[type='button']:active .vl-icon,
    .vl-input-addon--disabled[href]:hover .vl-icon,
    .vl-input-addon--disabled[href]:active .vl-icon {
        color: #687483;
    }
    .vl-input-addon--disabled[type='button']:focus .vl-icon,
    .vl-input-addon--disabled[href]:focus .vl-icon {
        color: #687483;
    }
    .vl-input-addon .vl-icon {
        display: inline-flex;
        color: inherit;
    }
    .vl-input-addon .vl-icon::before,
    .vl-input-addon .vl-icon::after {
        font-size: 1.8rem;
    }

    .vl-input-addon--success {
        border-color: var(--vl-color--success);
    }
    .vl-input-addon--success .vl-vi {
        color: var(--vl-color--success) !important;
    }
    .vl-input-addon--error {
        border-color: var(--vl-color--error);
    }
    .vl-input-addon--error .vl-vi {
        color: var(--vl-color--error) !important;
    }
`;
