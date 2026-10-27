import { css, CSSResult } from 'lit';

export const vlBadgeStyles: CSSResult = css`
    :host {
        box-sizing: border-box;
        display: inline-flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        width: 4.5rem;
        height: 4.5rem;
        overflow: hidden;
        border: 1px solid var(--vl-color--border-default);
        border-radius: 50%;
        background-color: var(--vl-color--background-subtle);
        color: var(--vl-color--text-default);
    }

    :host([background='default']) {
        background-color: var(--vl-color--background-default);
    }

    :host([background='primary']) {
        border-color: var(--vl-theme-primary-color, var(--vl-color--background-primary));
        background-color: var(--vl-theme-primary-color, var(--vl-color--background-primary));
        color: var(--vl-color--text-on-primary);
    }

    :host([background='action']) {
        border-color: var(--vl-color--action);
        background-color: var(--vl-color--action);
        color: var(--vl-color--text-on-action);
    }

    .vl-badge__img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;
