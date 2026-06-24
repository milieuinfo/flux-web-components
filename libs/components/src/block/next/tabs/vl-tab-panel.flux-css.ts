import { vlFocusOutlineMixin } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlTabPanelFluxStyles: CSSResult = css`
    :host {
        display: block;
        margin-top: var(--vl-spacing--medium);
    }

    :host([hidden]) {
        display: none;
    }

    :host(:focus-visible) {
        ${vlFocusOutlineMixin()};
    }
`;
