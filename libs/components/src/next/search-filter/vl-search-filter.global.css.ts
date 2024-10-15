import { css, CSSResult } from 'lit';

export const searchFilterGlobalStyles: CSSResult = css`
    form.vl-search-filter-next--form {
        padding: 2rem;
        background-color: #e8ebee;
        section {
            padding-bottom: 2rem;
            margin-bottom: 2rem;
            border-bottom: 1px solid #cbd2da;
            h2 {
                font-size: 1.5rem;
                display: block;
                text-transform: uppercase;
                margin-bottom: 1.2rem;
                letter-spacing: 0.1rem;
                font-weight: 500;
            }
        }
    }

    form.vl-search-filter-next--form__alt {
        background: transparent;
        height: 100%;
    }

    @media screen and (max-width: 767px) {
        form.vl-search-filter-next--form__alt {
            background: #fff;
        }

        .vl-search-filter-next--form__mobile-modal:has(* section) {
            display: flex;
            flex-direction: column;
            height: 100%;
            padding: 0 !important;
            margin: 0 !important;
            *:has(section) {
                padding: 1.5rem !important;
                flex: 1;
                overflow-y: auto;
            }
        }
    }

    @media screen and (max-width: 767px) {
        .vl-search-filter-next--form__mobile-modal:has(> section) {
            display: flex;
            flex-direction: column;
            padding: 1.5rem !important;
        }
    }

    @media screen and (max-width: 767px) {
        .vl-search-filter-next--form__alt.vl-search-filter-next--form {
            padding: 0 2rem 55px;
        }
    }

    @media screen and (max-width: 767px) {
        .vl-search-filter-next--footer-modal {
            display: flex;
            justify-content: space-between;
            gap: 1rem;
            flex-wrap: wrap;
            padding: 10px 15px;
            width: 100%;
            border-top: 1px solid #8695a8;
            background-color: #fff;
            z-index: 2;
            box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
            button,
            vl-button-next {
                width: 100%;
            }
        }
        .vl-search-filter-next--form:has(> section) {
            height: calc(120vh + 100px);
            .vl-search-filter-next--footer-modal {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
            }
        }
    }
`;
