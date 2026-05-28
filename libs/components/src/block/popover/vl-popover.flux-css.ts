import { css, CSSResult } from 'lit';

export const vlPopoverFluxStyles: CSSResult = css`
    :host {
        position: absolute;
        width: max-content;
        top: 0;
        left: 0;
        z-index: var(--vl-z-layer--popover);
    }

    i#popover-arrow {
        position: absolute;
        display: block;
        width: 10px;
        height: 10px;
        background-color: #fff;
        z-index: -1;
        pointer-events: none;
        transform: rotate(45deg);
    }

    .popover-content {
        filter: drop-shadow(0 0.2rem 0.6rem rgba(106, 118, 134, 0.15))
            drop-shadow(0 0 0.1rem var(--vl-color--border-default))
            drop-shadow(0 0 0.1rem var(--vl-color--border-default));
        will-change: filter;
        background-color: #fff;
        padding: 1rem;
        max-width: 100vw;
        word-break: break-all;
        overflow-y: auto;
        /* 9999px = geen limiet als fallback; echte beperking komt van --available-height of consumer */
        max-height: min(var(--vl-popover-max-height, 9999px), var(--available-height, 9999px));

        &.padding-none {
            padding: 0;
        }
        &.padding-small {
            padding: 0.5rem;
        }
        &.padding-large {
            padding: 2rem;
        }
    }
`;
