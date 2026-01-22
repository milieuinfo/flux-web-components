import { css, CSSResult } from 'lit';

export const vlAutocompleteFluxStyles: CSSResult = css`
    :is(input[name='vl-autocomplete-1-input-name'][show-clear=''].vl-input-field) {
        padding-right: 3rem;

        &:hover {
            padding-right: 2.9rem;
        }

        &:hover:focus {
            padding-right: 3rem;
        }
    }

    label.small {
        font-size: 14px;
    }

    li.flux-autocomplete-group {
        font-weight: bold;
    }

    .js-vl-autocomplete {
         div.vl-autocomplete__list-wrapper,
         div.autocomplete__list-wrapper {
            max-height: 100vh;
        }
        .ui-autocomplete__loader-with-clear {
            right: 20px;
        }
        .vl-autocomplete {
            /* bij de CSS die transitief binnenkomt van DV staat het ingesteld op z-index: 3 */
            z-index: var(--vl-z-layer--autocomplete) !important;
        }
    }
    
    .flux-autocomplete__clear {
        position: absolute;
        top: 0px;
        right: 0px;
        width: 25px;
        height: 3.5rem;
        z-index: 2;

        .flux-autocomplete__clear-icon::before {
            display: block;
            position: absolute;
            width: 20px;
            height: 20px;
            margin-top: 4px;
            cursor: pointer;
            line-height: 1.5;
            font-size: 1.8rem;
        }
    }
`;
