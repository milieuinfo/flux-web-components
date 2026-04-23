import { vlMediaScreenSmall } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlSearchResultStyles: CSSResult = css`
    :host {
        display: block;
        margin-bottom: 3.5rem;

        > * {
            display: block;
        }
    }

    vl-search-result-text {
        margin-bottom: 1.5rem;
    }

    vl-search-result-title {
        font-weight: 500;
        font-size: 2rem;
        /* min-height matches line-height to keep the 1-line visual band; allows wrap for longer titles */
        min-height: 2.7rem;
        line-height: 2.7rem;

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            font-size: 1.6rem;
        }

        a {
            font-size: 2rem;
            text-decoration: none;

            &:hover,
            &:focus {
                text-decoration: underline;
            }
        }
    }
`;
