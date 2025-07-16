import { css, CSSResult } from 'lit';
import { vlMediaScreenMedium } from '../../base/var/vl-media-screen.css';

export const vlStackedStyles: CSSResult = css`
    .vl-stacked-next-medium {
        row-gap: var(--vl-spacing--medium);
    }

    .vl-stacked-next-large {
        row-gap: var(--vl-spacing--large);

        @media screen and (max-width: ${vlMediaScreenMedium}px) {
            row-gap: var(--vl-spacing--medium);
        }
    }

    .vl-stacked-next-small {
        row-gap: var(--vl-spacing--small);
    }
`;
