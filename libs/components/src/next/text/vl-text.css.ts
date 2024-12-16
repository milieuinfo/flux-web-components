import { css, CSSResult } from 'lit';

export const vlTextStyles: CSSResult = css`
    .vl-text-next {
        &.vl-text-next--success {
            color: var(--vl-color--success-text);
        }

        &.vl-text-next--warning {
            color: var(--vl-color--warning-text);
        }

        &.vl-text-next--error {
            color: var(--vl-error-color);
        }

        &.vl-text-next--bold {
            font-weight: 500;
        }

        &.vl-text-next--italic {
            font-style: italic;
        }

        &.vl-text-next--underline {
            text-decoration: underline;
        }
    }
`;
