import { css, CSSResult } from 'lit';

export const vlSeparatorStyles: CSSResult = css`
    .vl-separator {
        border: none;
        border-bottom: 1px solid var(--vl-color--border);
        margin-top: 0;
        margin-bottom: 0;
    }

    .vl-separator-slash {
        border: none;
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 6.04 5.99'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23bec5cf;%7D%3C/style%3E%3C/defs%3E%3Ctitle%3EAsset 1%3C/title%3E%3Cg id='Layer_2' data-name='Layer 2'%3E%3Cg id='Layer_1-2' data-name='Layer 1'%3E%3Crect class='cls-1' x='1.01' y='3.99' width='1.01' height='1'/%3E%3Crect class='cls-1' y='4.99' width='1.01' height='1'/%3E%3Crect class='cls-1' x='3.02' y='2' width='1.01' height='1'/%3E%3Crect class='cls-1' x='2.01' y='2.99' width='1.01' height='1'/%3E%3Crect class='cls-1' x='5.04' width='1.01' height='1'/%3E%3Crect class='cls-1' x='4.03' y='1' width='1.01' height='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
            repeat-x;
        background-size: 6px 6px;
        min-height: 6px;
    }

    .vl-separator-wave {
        border: none;
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='19' viewBox='0 0 100 19' %3E%3Cpath d='M0,3.5c12.5,0,12.5,12,25,12s12.5-12,25-12,12.5,12,25,12,12.5-12,25-12' fill='none' stroke='%23d2d7dd' stroke-miterlimit='10' stroke-width='6'/%3E%3C/svg%3E")
            repeat-x;
        background-size: 20px 4px;
        height: 4px;
    }
`;
