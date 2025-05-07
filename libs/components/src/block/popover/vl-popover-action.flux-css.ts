import { css, CSSResult } from 'lit';

export const vlPopoverActionFluxStyles: CSSResult = css`
    :host {
        display: flex;
        align-items: center;
        gap: 1rem;
        cursor: pointer;
        color: #0055cc;
        padding-left: 0.7rem;
        padding-right: 0.7rem;
    }

    :host(:hover) {
        text-decoration: underline;
    }

    :host(:focus, :focus-within) {
        box-shadow: none;
        outline: 3px solid rgba(0, 85, 204, 0.65);
        outline-offset: 2px;
    }

    :host([selected]) {
        border-left: 0.3rem solid #0055cc;
        padding-left: 0.4rem;
    }
`;
