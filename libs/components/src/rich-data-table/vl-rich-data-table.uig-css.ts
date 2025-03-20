import { vlElementsStyle } from '@domg-wc/elements';
import { css, CSSResult } from 'lit';

export const richDataSortingStyle: CSSResult = css`
    th[data-vl-sortable] a {
        cursor: pointer;
    }
`;
export default [...vlElementsStyle, richDataSortingStyle] as CSSResult[];
