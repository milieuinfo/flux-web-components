import { css, CSSResult } from 'lit';

export const searchFilterStyles: CSSResult = css`
    :host {
        --vl-form-label-font-weight: normal;
        --vl-title-h2-font-size: 1.6rem;
        --vl-title-h2-font-size-small: 1.4rem;
        --vl-title-letter-spacing: 0.1rem;
    }

    @media screen and (max-width: 767px) {
        :host .vl-search-filter-next {
            display: flex;
            flex-direction: column;
            position: fixed;
            padding: 0;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            height: 100vh;
            overflow-y: hidden;
            .form-container {
                flex: 1;
                overflow-y: auto;
                height: 100vh;
            }
        }
    }

    h2 {
        font-size: 3.2rem;
        font-family: 'Flanders Art Sans', sans-serif;
        font-weight: 500;
        margin-bottom: 2rem;
        line-height: 1.24;
    }

    .vl-search-filter-next--intro {
        text-transform: uppercase;
        font-weight: 500;
        border-bottom: 3px solid #e8ebee;
        font-size: 1.8rem;
        padding: 0 0 0.7rem;
        margin: 0 0 2rem;
    }

    @media screen and (max-width: 767px) {
        .vl-search-filter-next--header-modal {
            padding: 2.5rem 1.5rem 1rem;
            border-bottom: 1px solid #8695a8;
            display: flex;
            align-items: center;
            h2 {
                font-size: 2.6rem;
                margin: 0;
            }
        }
        :host([alt]) .vl-search-filter-next--header-modal {
            background-color: #fff;
        }
    }
`;
