import { CSSResult, css } from 'lit';

export const vlVisuallyHiddenMixin = (): CSSResult => css`
    position: absolute;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
    margin: -1px;
    padding: 0;
    border: 0;
    left: 0;
    top: 0;
`;
