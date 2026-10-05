import { css, CSSResult } from 'lit';
import { vlVisuallyHiddenMixin } from '../../base/mixin/vl-accessibility.css';
import { vlFocusOutlineMixin } from '../../base/mixin/vl-outlines.css';

export const vlAccessibilityStyles: CSSResult = css`
    .vl-visually-hidden,
    .vl-skip-link {
        ${vlVisuallyHiddenMixin()};
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
