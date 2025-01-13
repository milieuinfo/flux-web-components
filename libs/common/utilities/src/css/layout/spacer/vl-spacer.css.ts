import { css, CSSResult } from 'lit';
import { vlMediaScreenSmall } from '../../base/var/vl-media-screen.css';

export const vlSpacerStyles: CSSResult = css`
    .vl-spacer-next {
        margin-bottom: var(--vl-spacing--normal);
    }

    .vl-spacer-next-xxsmall {
        margin-bottom: var(--vl-spacing--xxsmall);
    }

    .vl-spacer-next-xsmall {
        margin-bottom: var(--vl-spacing--xsmall);
    }

    .vl-spacer-next-small {
        margin-bottom: var(--vl-spacing--small);
    }

    .vl-spacer-next-medium {
        margin-bottom: var(--vl-spacing--medium);
    }

    .vl-spacer-next-large {
        margin-bottom: var(--vl-spacing--large);

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            margin-bottom: var(--vl-spacing--medium);
        }
    }

    .vl-spacer-next-none {
        margin-bottom: 0;
    }
`;
