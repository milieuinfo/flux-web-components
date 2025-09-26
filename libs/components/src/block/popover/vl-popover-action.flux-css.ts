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

    :host a,
    :host button {
        background: none;
        border: none;
        margin: 0;
        padding: 0;
        font: inherit;
        line-height: inherit;
        text-align: inherit;
        color: inherit;
        text-decoration: none;

        display: flex;
        align-items: center;
        gap: 0.8rem;
    }

    :host a:focus,
    :host button:focus {
        /* er is al een focus state op de host */
        outline: none;
    }

    :host a:hover > span,
    :host button:hover > span {
        text-decoration: underline;
    }

    :host(:focus),
    :host(:focus-within) {
        box-shadow: none;
        outline: 3px solid rgba(0, 85, 204, 0.65);
        outline-offset: 2px;
    }

    :host([selected]) {
        border-left: 0.3rem solid #0055cc;
        padding-left: 0.4rem;
    }
`;
