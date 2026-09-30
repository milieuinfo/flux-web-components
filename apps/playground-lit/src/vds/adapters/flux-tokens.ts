import { css } from 'lit';

export const fluxFocus = css`
    :host(:not([bare])) {
        --base-border-focus-spacing-color: rgba(0, 85, 204, 0.65);
    }
`;

export const fluxMessageTokens = css`
    :host(:not([bare])) {
        --base-border-radius-container-m: 0.3rem;
        --base-color-background-surface-system-info-default: #f7f9fc;
        --base-color-border-system-info-subtle: #e8ebee;
        --base-color-background-surface-system-success-default: #e6f5ed;
        --base-color-border-system-success-subtle: #99d8b5;
        --base-color-background-surface-system-warning-default: #fff6e7;
        --base-color-border-system-warning-subtle: #ffd99d;
        --base-color-background-surface-system-error-default: #fbebec;
        --base-color-border-system-error-subtle: #edafb1;
        --base-color-text-system-success: #333332;
        --base-color-text-system-warning: #333332;
        --base-color-text-system-error: #333332;
    }
`;
