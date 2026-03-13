import { vlFocusOutlineMixin, vlVisuallyHiddenMixin } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

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
