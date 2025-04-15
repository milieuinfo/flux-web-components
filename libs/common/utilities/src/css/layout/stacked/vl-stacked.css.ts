import { css, CSSResult } from 'lit';
import { vlMediaScreenMedium } from '../../base/var/vl-media-screen.css';

// TODO margin-top, kan dat niet gwn row-gap zijn?
export const vlStackedStyles: CSSResult = css`
    .vl-stacked-medium {
        > *:not(:first-child) {
            margin-top: var(--vl-spacing--medium);
        }
    }

    .vl-stacked-large {
        > *:not(:first-child) {
            margin-top: var(--vl-spacing--large);

            @media screen and (max-width: ${vlMediaScreenMedium}px) {
                margin-top: var(--vl-spacing--medium);
            }
        }
    }

    .vl-stacked-small {
        > *:not(:first-child) {
            margin-top: var(--vl-spacing--small);
    }
`;
