import { vlLinkStyles } from '@domg-wc/common-utilities/css';
import { css } from 'lit';

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
    }
`;
