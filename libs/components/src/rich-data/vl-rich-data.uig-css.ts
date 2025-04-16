import { css, CSSResult } from 'lit';
import { vlLegacyStyles } from '@domg-wc/styles';

const styles: CSSResult = css`
    #search-results,
    #sorter {
        line-height: 2em;
    }

    #search-results {
        margin-bottom: 2.4rem;
    }

    #content {
        margin-left: 2rem;
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
export default [...vlLegacyStyles, styles] as CSSResult[];
