import { css, CSSResult } from 'lit';

/** Gedeeld door elk uitklapblok onder de visual (tabel, leeswijzer, over
 * d eze data)*/
export const explanationStyles: CSSResult = css`
    :host {
        display: block;
    }

    .explanation {
        display: block;
        border-top: 1px solid var(--vl-color--border-default);
        padding-block: var(--vl-spacing--xsmall);
    }
`;
