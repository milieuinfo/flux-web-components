import { CSSResult, css } from 'lit';

export const vlFocusOutlineMixin = (): CSSResult => css`
    box-shadow: none;
    outline: 3px solid var(--vl-focus-color);
    outline-offset: 2px;
`;
