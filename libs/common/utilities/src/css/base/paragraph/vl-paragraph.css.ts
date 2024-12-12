import { css } from 'lit';
import { vlMediaScreenMedium, vlMediaScreenSmall } from '../var/vl-media-screen.css';

export const vlParagraphStyles = css`
    p {
        &.bold {
            font-weight: 500;
        }

        &.introduction {
            font-family: var(--vl-font);
            font-size: var(--vl-font-size--xlarge);
            color: var(--vl-text-alt-color);
            line-height: 1.5;
        }

        @media screen and (max-width: ${vlMediaScreenMedium}px) {
            &.introduction {
                font-size: var(--vl-font-size--large);
            }
        }

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            &.introduction {
                font-size: var(--vl-font-size);
            }
        }
    }
`;
