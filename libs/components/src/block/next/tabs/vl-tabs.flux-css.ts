import { css, CSSResult } from 'lit';

export const vlTabsFluxStyles: CSSResult = css`
    :host {
        display: block;
    }

    .vl-tabs {
        display: flex;
        flex-wrap: wrap;
        border-bottom: 1px solid var(--vl-color--border-default);
    }

    /* Horizontal navigation */
    .vl-tabs ul {
        display: flex;
        flex-wrap: wrap;
        list-style: none;
    }
`;
