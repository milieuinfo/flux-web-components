import { css, CSSResult } from 'lit';

const styles: CSSResult = css`
    .js-vl-select,
    .vl-select__list--dropdown {
        z-index: var(--vl-z-layer--select-list-dropdown);
    }

    .js-vl-select.is-open,
    .vl-select__list--dropdown.is-active {
        z-index: var(--vl-z-layer--select-list-dropdown-open);
    }

    .js-vl-select[data-type*='multiple'] .vl-pill__close {
        border: 0;
        display: inline-flex;
        margin-left: auto;
    }

    .js-vl-select[data-type*='multiple'] .vl-pill__close::before,
    .js-vl-select[data-type*='multiple'] .vl-pill__close::after {
        font-family: 'vlaanderen-icon' !important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-style: normal;
        font-variant: normal;
        font-weight: normal;
        text-decoration: none;
        text-transform: none;
    }

    .js-vl-select[data-type*='multiple'] .vl-pill__close::before {
        content: '\\f181';
    }

    .js-vl-select[data-type*='multiple'] .vl-pill__close:hover,
    .js-vl-select[data-type*='multiple'] .vl-pill__close:focus,
    .js-vl-select[data-type*='multiple'] .vl-pill__close:active {
        color: #003bb0;
    }

    .js-vl-select[data-type*='multiple'].is-disabled .vl-pill__close,
    .js-vl-select[data-type*='multiple'] .vl-select__placeholder .vl-pill__close {
        display: none;
    }
`;
export default styles;
