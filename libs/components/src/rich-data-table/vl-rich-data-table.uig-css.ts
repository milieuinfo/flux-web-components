import { vlLegacyStyles } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const richDataSortingStyle: CSSResult = css`
    th[sortable] a {
        cursor: pointer;
    }
`;
export default [...vlLegacyStyles, richDataSortingStyle] as CSSResult[];
