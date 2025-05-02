import { css, CSSResult } from 'lit';
import { typographyStyle } from '@domg/govflanders-style/common';

const styles: CSSResult = css`
    .vl-typography {
        display: inline;
    }
`;
export default [typographyStyle, styles] as CSSResult[];
