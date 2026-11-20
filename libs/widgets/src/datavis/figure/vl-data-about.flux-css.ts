import { css, CSSResult } from 'lit';

export const vlDataAboutFluxStyles: CSSResult = css`
    /* Begrip en uitleg naast elkaar; op een smal scherm loopt de uitleg gewoon door onder het begrip. */
    dl {
        display: grid;
        grid-template-columns: max-content 1fr;
        gap: var(--vl-spacing--xxsmall) var(--vl-spacing--small);
        margin: 0 0 var(--vl-spacing--xsmall);
    }

    dt {
        font-weight: 500;
    }

    dd {
        margin: 0;
    }

    /* Elke bron een eigen groep met een lijn ertussen. */
    dl + dl {
        border-top: 1px solid var(--vl-color--border-default);
        padding-top: var(--vl-spacing--xsmall);
    }

    /* UUID. */
    .subtle {
        color: var(--vl-color--text-subtle);
        font-size: var(--vl-font-size--xsmall);
        overflow-wrap: anywhere;
    }
`;
