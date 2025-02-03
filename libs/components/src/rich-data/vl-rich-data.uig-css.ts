import { css, CSSResult } from 'lit';
import { vlElementsStyle } from '@domg-wc/elements';

const styles: CSSResult = css`
    #search-results,
    #sorter {
        line-height: 2em;
    }

    #sorter {
        text-align: right;
    }
    #sorter vl-form-label-next::part(label) {
        margin-right: 10px;
    }

    #filter-slot-container {
        margin-top: 8px;
    }
`;
export default [...vlElementsStyle, styles] as CSSResult[];
