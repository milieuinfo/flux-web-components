import { css, CSSResult } from 'lit';

const styles: CSSResult = css`
    :host {
        --vl-color--error: rgb(210, 55, 60);
        --vl-success-color: rgb(0, 158, 71);
    }
    button {
        cursor: pointer;
    }
    .vl-input-field {
        border-radius: 0.3rem 0 0 0.3rem;
        border-right-width: 0;
    }
    .vl-input-addon--success {
        border-color: var(--vl-success-color);
    }
    .vl-input-addon--success .vl-vi {
        color: var(--vl-success-color) !important;
    }
    .vl-input-addon--error {
        border-color: var(--vl-color--error);
    }
    .vl-input-addon--error .vl-vi {
        color: var(--vl-color--error) !important;
    }

    .flatpickr-calendar {
        z-index: var(--vl-z-layer--datepicker) !important;
    }

    .flatpickr-wrapper--block {
        width: 100%;
    }
`;
export default styles;
