import { css, CSSResult } from 'lit';
import { vlMediaScreenSmall } from '../../base/var/vl-media-screen.css';

export const vlStackedStyles: CSSResult = css`
    .vl-stacked-next-large {
        > *:not(:first-child) {
            margin-top: var(--vl-spacing--large);

            @media screen and (max-width: ${vlMediaScreenSmall}px) {
                margin-top: var(--vl-spacing--medium);
            }
        }
    }

    .vl-stacked-next-small {
        > *:not(:first-child) {
            margin-top: var(--vl-spacing--small);
    }
`;
