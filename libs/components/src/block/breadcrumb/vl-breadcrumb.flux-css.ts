import { vlFocusOutlineMixin } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlBreadcrumbFluxStyles: CSSResult = css`
    .vl-breadcrumb__list__item__cta {
        display: flex;
        position: relative;
        top: -1px;
    }

    .vl-breadcrumb__list__item__cta:focus {
        ${vlFocusOutlineMixin()};
    }

    button.vl-breadcrumb__list__item__cta {
        background: none;
        border: none;
        color: var(--vl-color--action);
        cursor: pointer;
        font: inherit;
        padding: 0;
        text-decoration: underline;
    }

    span.vl-breadcrumb__list__item__cta {
        color: unset;
        cursor: default;
        text-decoration: none;
    }

    span.vl-breadcrumb__list__item__cta:hover {
        text-decoration: none;
    }

    .vl-breadcrumb__list__item__separator {
        justify-content: center;
    }
`;
