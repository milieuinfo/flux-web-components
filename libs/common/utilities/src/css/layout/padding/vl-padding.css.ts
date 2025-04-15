import { css, CSSResult } from 'lit';
import { vlMediaScreenSmall } from '../../base/var/vl-media-screen.css';

export const vlPaddingStyles: CSSResult = css`
    .vl-padding--small {
        padding: var(--vl-spacing--small) 0;

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            padding: var(--vl-spacing--normal) 0;
        }
    }

    .vl-padding--medium {
        padding: var(--vl-spacing--medium) 0;

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            padding: var(--vl-spacing--normal) 0;
        }
    }

    .vl-padding--no {
        padding: 0;
    }

    .vl-padding--no-bottom {
        padding-bottom: 0;
    }

    .vl-padding--no-top {
        padding-top: 0;
    }
`;
