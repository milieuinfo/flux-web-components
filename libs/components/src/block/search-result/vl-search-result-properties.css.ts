import { vlMediaScreenSmall } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlSearchResultPropertiesStyles: CSSResult = css`
    dl {
        display: block;
    }
    dt,
    dd {
        float: left;
        margin-inline-start: initial;
    }
    dt {
        display: inline;
        font-weight: 500;
        clear: left;
        &::after {
            display: block;
            content: ':';
            float: right;
            margin-right: 0.5rem;
        }
    }
    @media screen and (max-width: ${vlMediaScreenSmall}px) {
        dl dd:has(+ dt) {
            padding-bottom: 0;
        }
    }
`;
