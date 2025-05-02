import { css, CSSResult } from 'lit';

const styles: CSSResult = css`
    a.vl-spotlight .vl-spotlight__title {
        text-decoration: underline;
    }
    a.vl-spotlight .vl-spotlight__title:hover,
    a.vl-spotlight .vl-spotlight__title:focus,
    a.vl-spotlight .vl-spotlight__title:active {
        text-decoration: none;
    }
`;
export default styles;
