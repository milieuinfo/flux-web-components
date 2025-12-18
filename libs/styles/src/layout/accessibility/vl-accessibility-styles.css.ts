import { vlFocusOutlineMixin } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlAccessibilityStyles: CSSResult = css`
    .vl-visually-hidden,
    .vl-skip-link {
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

    .vl-skip-link:focus {
        position: absolute;
        height: unset;
        width: unset;
        overflow: unset;
        clip: unset;
        margin: unset;
        cursor: pointer;
        background: white;
        z-index: var(--vl-z-layer--skip-link);
        ${vlFocusOutlineMixin()};
    }
`;
