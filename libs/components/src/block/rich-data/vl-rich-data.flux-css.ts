import { vlMediaScreenSmall } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlRichDataFluxStyles: CSSResult = css`
    #search-results {
        margin-bottom: 2.4rem;
    }

    #sorter {
        text-align: right;
    }

    #sorter vl-form-label::part(label) {
        margin-right: 10px;
    }

    .vl-rich-data {
        display: grid;
        /*
            Linker kolom krijgt de kleinste waarde:
            - ofwel 12/4 kolom (100% / 3)
            - ofwel de ingestelde max-width
        */
        grid-template-columns: min(calc(100% / 3), var(--vl-rich-data-filter-max-width)) 1fr;
        grid-template-rows: auto 1fr auto;
        grid-template-areas:
            'toggle-area toggle-area'
            'search-area content-area'
            'pager-area pager-area';
        row-gap: var(--vl-grid-col-gap);
        column-gap: var(--vl-grid-col-gap);

        &:has(#search[hidden]),
        &:has(#search.vl-u-hidden) {
            grid-template-columns: 0 1fr;
            column-gap: 0;
        }

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            grid-template-areas:
                'toggle-area toggle-area'
                'content-area content-area'
                'pager-area pager-area';
            column-gap: 0;

            &:has(#search.vl-u-hidden--s) {
                grid-template-columns: 0 1fr;
            }
        }

        @media screen and (min-width: ${vlMediaScreenSmall}px) {
            #open-filter {
                display: none;
            }
        }

        ${
            // Edge case als je op mobiel van portait naar landscape mode gaat terwijl de filter open staat. (zie storybook "Large mobile (L)" viewport)
            css`&:has(> #filter-slot) {
                grid-template-columns: min(calc(100% / 3), calc(var(--vl-page--max-width-wide) / 3)) 1fr !important;
            }`
        }

        #toggle-filter,
        #open-filter {
            grid-area: toggle-area;
        }
        #search {
            grid-area: search-area;
        }
        #content {
            grid-area: content-area;
        }
        #pager {
            grid-area: pager-area;
        }
    }
`;
