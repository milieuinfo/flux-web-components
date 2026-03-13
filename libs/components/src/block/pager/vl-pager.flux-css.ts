import { vlFocusOutlineMixin, vlMediaScreenSmall } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlPagerFluxStyles: CSSResult = css`
    [hidden] {
        display: none;
    }

    a {
        cursor: pointer;
    }

    a:focus {
        ${vlFocusOutlineMixin()};
    }

    a .vl-link__icon {
        position: relative;
    }

    .vl-pager {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: var(--vl-spacing--xsmall);
    }

    @media screen and (max-width: ${vlMediaScreenSmall}px) {
        .vl-pager {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--vl-spacing--xxsmall);
        }

        .vl-pager__list {
            flex-direction: column;
            align-items: flex-start;
            padding-left: 0;
        }

        .vl-pager__element:not(:last-child) {
            margin-bottom: 1rem;
        }
    }
`;
