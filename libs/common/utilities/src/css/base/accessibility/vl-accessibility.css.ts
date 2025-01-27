import { css, CSSResult } from 'lit';
import { vlMediaScreenSmall } from '../var/vl-media-screen.css';

export const vlAccessibilityStyles: CSSResult = css`
    .vl-visually-hidden {
        position: absolute;
        height: 1px;
        width: 1px;
        overflow: hidden;
        clip: rect(1px, 1px, 1px, 1px);
        margin: -1px;
        padding: 0;
        border: 0;
        left: 0;
        top: 0;
    }
`;
