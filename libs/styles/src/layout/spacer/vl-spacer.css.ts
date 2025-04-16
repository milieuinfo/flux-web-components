import { css, CSSResult } from 'lit';
import { vlMediaScreenSmall } from '../../base/var/vl-media-screen.css';

export const vlSpacerStyles: CSSResult = css`
    .vl-spacer {
        margin-bottom: var(--vl-spacing--normal);
    }

    .vl-spacer-xxsmall {
        margin-bottom: var(--vl-spacing--xxsmall);
    }

    .vl-spacer-xsmall {
        margin-bottom: var(--vl-spacing--xsmall);
    }

    .vl-spacer-small {
        margin-bottom: var(--vl-spacing--small);
    }

    .vl-spacer-medium {
        margin-bottom: var(--vl-spacing--medium);
    }

    .vl-spacer-large {
        margin-bottom: var(--vl-spacing--large);

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            margin-bottom: var(--vl-spacing--medium);
        }
    }

    .vl-spacer-none {
        margin-bottom: 0;
    }
`;
