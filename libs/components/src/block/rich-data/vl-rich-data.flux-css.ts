import { vlMediaScreenSmall } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlRichDataFluxStyles: CSSResult = css`
    #search-results,
    #sorter {
        line-height: 2em;
    }

    #search-results {
        margin-bottom: 2.4rem;
    }

    #content {
        margin-left: 2rem;
        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            margin-left: 0;
        }
    }

    #sorter {
        text-align: right;
    }

    #sorter vl-form-label::part(label) {
        margin-right: 10px;
    }

    #filter-slot-container {
        margin-top: 8px;
    }
`;
