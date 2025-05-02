import { css } from 'lit';
import { vlLinkStyles } from '../link-style/vl-link.css';

export const buttonAsLinkStyles = css`
    ${vlLinkStyles('button')}
    button {
        border-radius: 0;
        appearance: none;
        -webkit-appearance: none;
        border: 0;
        background-color: transparent;
        padding: 0;
        text-decoration: underline;
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        font-weight: inherit;
        text-align: left;
        font-family: inherit;
        font-size: inherit;
        color: var(--vl-theme-action-color, #05c);
        position: relative;
        word-break: break-word;
        line-height: inherit;
        cursor: default;
    }
`;
