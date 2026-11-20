import { css, CSSResult } from 'lit';

export const vlDataTableFluxStyles: CSSResult = css`
    /* Getallen rechts: zo staan eenheden, tientallen en decimalen onder elkaar. Met .vl-table ervoor, anders
       wint de tabelstijl van Flux (die zet elke cel links). */
    .vl-table .numeric {
        text-align: right;
        font-variant-numeric: tabular-nums;
    }

    .pager {
        display: block;
        margin-top: var(--vl-spacing--small);
    }

    .gap-note {
        margin: var(--vl-spacing--xsmall) 0;
        font-size: var(--vl-font-size--small);
        color: var(--vl-color--text-subtle);
    }
`;
