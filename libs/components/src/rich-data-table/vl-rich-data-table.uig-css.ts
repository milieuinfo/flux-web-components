import { vlLegacyStyles } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const richDataSortingStyle: CSSResult = css`
    th[data-vl-sortable] a {
        cursor: pointer;
    }
`;
export default [...vlLegacyStyles, richDataSortingStyle] as CSSResult[];
