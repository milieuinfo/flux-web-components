import { css, CSSResult } from 'lit';
import { vlMediaScreenSmall } from '../var/vl-media-screen.css';

export const vlBodyStyles: CSSResult = css`
    html {
        font-family: var(--vl-font);
        /* 62.5% of 16px user agent font size is 10px */
        font-size: 62.5%;
    }

    body {
        font-size: var(--vl-font-size);
        line-height: var(--vl-line-height);
        color: var(--vl-color--text);

        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: none;

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            font-size: var(--vl-font-size--mobile);
            line-height: var(--vl-line-height--mobile);
        }
    }
`;
