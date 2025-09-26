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
        /* combinatie van 3 drop-shadows:
          - de eerste is de styling voor schaduw (deze weglaten als je geen schaduw wilt)
          - de 2e & 3e is de styling voor border (deze weglaten als je geen border wilt)
        */
        filter: drop-shadow(rgba(0, 0, 0, 0.1) 0px 0px 2.1rem) drop-shadow(rgb(207, 213, 221) -1px -1px 1px)
            drop-shadow(rgb(207, 213, 221) 1px 1px 1px);
        will-change: filter;
        background-color: #fff;
        padding: 1rem;
        max-width: 100vw;
        word-break: break-all;
    }

    .padding-none {
        padding: 0;
    }
    .padding-small {
        padding: 0.5rem;
    }
    .padding-medium {
        padding: 1rem;
    }
    .padding-large {
        padding: 2rem;
    }
`;
