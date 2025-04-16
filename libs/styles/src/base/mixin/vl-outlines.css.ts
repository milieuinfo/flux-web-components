import { CSSResult, css } from 'lit';

export const vlFocusOutlineMixin = (): CSSResult => css`
    box-shadow: none;
    outline: 3px solid var(--vl-color--focus);
    outline-offset: 2px;
`;
