import { css, CSSResult } from 'lit';

// deze css is gegenereerd uit de oude custom scss
export const functionalHeaderUigStyle: CSSResult = css`
    .uig-functional-header__content {
        display: flex;
        flex-flow: column;
    }

    .uig-functional-header__row {
        display: flex;
        flex-direction: row;
    }

    @media (max-width: 767px) {
        .uig-functional-header__row {
            flex-direction: column;
        }
        .uig-functional-header__top-right {
            padding: 0.5rem 1rem 0 1rem;
        }
    }
    :host(.vl-functional-header--full-width) .vl-layout {
        max-width: 100%;
    }

    a#title {
        text-decoration: none;
    }

    .sub-header-hidden slot {
        display: none;
    }

    .sub-header-hidden {
        padding-bottom: 1.3rem;
    }

    .vl-functional-header h1 {
        font-size: 2rem;
    }

    .vl-functional-header__sub-row {
        padding-left: 0;
    }
`;
