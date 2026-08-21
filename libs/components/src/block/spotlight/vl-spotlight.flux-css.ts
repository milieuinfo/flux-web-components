import { vlVisuallyHiddenMixin } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlSpotlightFluxStyles: CSSResult = css`
    a.vl-spotlight .vl-spotlight__title {
        text-decoration: underline;
    }
    a.vl-spotlight .vl-spotlight__title:hover,
    a.vl-spotlight .vl-spotlight__title:focus,
    a.vl-spotlight .vl-spotlight__title:active {
        text-decoration: none;
    }
    a.vl-spotlight .vl-spotlight__external-icon {
        color: var(--vl-color--icon-subtle);
    }

    /* bij externe links: visueel verbergen, maar wel voorlezen door screenreaders */
    a.vl-spotlight .vl-spotlight__new-window-hint {
        ${vlVisuallyHiddenMixin()};
    }
`;
