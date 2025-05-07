import { css, CSSResult } from 'lit';

export const vlPopoverActionListFluxStyles: CSSResult = css`
    :host {
        display: flex;
        justify-content: center;
        flex-direction: column;
        gap: 1rem;
    }

    ::slotted(hr) {
        width: calc(100% - 1rem);
    }
`;
