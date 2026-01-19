import { css } from 'lit';

export const fieldsetStyles = css`
    fieldset {
        display: block;
        border: none;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        color: inherit;
        line-height: inherit;
        padding: 0;
        margin: 0;
    }
    
    .vl-fieldset {
        &.vl-fieldset--border {
            & > slot {
                display: block;
                border: 1px solid var(--vl-color--border-default);
                padding: var(--vl-spacing--normal);
                border-radius: var(--vl-border--radius);
            }
        }
    }
`;
