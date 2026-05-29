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
        --vl-popover-content-padding: 1rem;
        filter: drop-shadow(0 0.2rem 0.6rem rgba(106, 118, 134, 0.15))
            drop-shadow(0 0 0.1rem var(--vl-color--border-default))
            drop-shadow(0 0 0.1rem var(--vl-color--border-default));
        will-change: filter;
        background-color: #fff;
        padding: var(--vl-popover-content-padding);
        max-width: 100vw;
        word-break: break-all;

        &.padding-none {
            --vl-popover-content-padding: 0;
        }
        &.padding-small {
            --vl-popover-content-padding: 0.5rem;
        }
        &.padding-large {
            --vl-popover-content-padding: 2rem;
        }
    }

    /* De scroll-container draagt overflow i.p.v. .popover-content, zodat de arrow (die buiten de
       content-box uitsteekt) en de drop-shadow niet door overflow worden afgeknipt. */
    .popover-scroll-container {
        overflow-y: auto;
        max-height: min(
            calc(var(--vl-popover-available-height, 100vh) - 2 * var(--vl-popover-content-padding)),
            var(--vl-popover-max-height, 100vh)
        );
    }
`;
