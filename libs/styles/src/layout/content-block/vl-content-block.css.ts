import { css } from 'lit';
import { vlMediaScreenMedium, vlMediaScreenSmall } from '../../base/var/vl-media-screen.css';

export const vlContentBlockStyles = css`
    .vl-content-block {
        position: relative;
        margin: 0 auto;
        min-width: var(--vl-page--max-width);
        max-width: var(--vl-page--max-width-wide);
        padding: 0 var(--vl-spacing--medium);

        @media screen and (max-width: ${vlMediaScreenMedium}px) {
            width: auto;
            min-width: var(--vl-page--min-width);
            max-width: var(--vl-page--max-width-wide);
        }

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            width: auto;
            min-width: 0;
            padding: 0 var(--vl-spacing--small);
        }

        &.vl-content-block--full-width {
            --vl-page--max-width-wide: 100%;
        }
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }
`;
