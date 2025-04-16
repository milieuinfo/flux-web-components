import { css, CSSResult } from 'lit';
import { vlMediaScreenSmall } from '../../base/var/vl-media-screen.css';

export const vlMarginStyles: CSSResult = css`
    .vl-margin--small {
        margin: var(--vl-spacing--small) 0;

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            margin: var(--vl-spacing--normal) 0;
        }
    }

    .vl-margin--medium {
        margin: var(--vl-spacing--medium) 0;

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            margin: var(--vl-spacing--normal) 0;
        }
    }

    .vl-margin--no {
        margin: 0;
    }

    .vl-margin--no-bottom {
        margin-bottom: 0;
    }

    .vl-margin--no-top {
        margin-top: 0;
    }
`;
