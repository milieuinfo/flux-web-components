import { vlFocusOutlineMixin, vlMediaScreenSmall, vlVisuallyHiddenMixin } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlPagerFluxStyles: CSSResult = css`
    .vl-pager--align-center {
        justify-content: center;
    }
    .vl-pager--align-right {
        justify-content: flex-end;
    }

    .vl-pager__element {
        display: inline-block;
    }
    .vl-pager__element--active:focus {
        ${vlFocusOutlineMixin()};
    }

    .vl-pager__control {
        display: flex;
        gap: var(--vl-spacing--xxsmall);
        align-items: center;
    }

    [hidden] {
        display: none !important;
    }

    .vl-pager,
    .vl-pager__list,
    #pager-list {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: var(--vl-spacing--medium);
    }

    @media screen and (max-width: ${vlMediaScreenSmall}px) {
        .vl-pager {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--vl-spacing--xxsmall);
        }

        .vl-pager,
        .vl-link {
            font-size: 1.6rem;
        }

        .vl-pager__element-cta,
        .vl-pager__control {
            display: inline-block;
            padding: 1.2rem 2rem;
        }

        .vl-pager__control-label {
            ${vlVisuallyHiddenMixin()};
        }

        .vl-pager__list,
        #pager-list {
            align-items: flex-start;
            gap: 0;
            padding-left: 0;
        }

        /* 
            Only show current, prev and next page 
            Always keep a minimum of three pages visible
        */
        .vl-pager__element {
            display: none;
        }
        .vl-pager__element--active,
        .vl-pager__element--active + .vl-pager__element,
        .vl-pager__element:has(+ .vl-pager__element--active),
        .vl-pager__element--active:first-child + .vl-pager__element + .vl-pager__element,
        .vl-pager__element:has(+ .vl-pager__element + .vl-pager__element--active:last-child),
        #page-forward-link,
        #page-back-link {
            display: inline-block;
        }
    }
`;
