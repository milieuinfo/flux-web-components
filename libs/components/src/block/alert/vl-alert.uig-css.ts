import { css, CSSResult } from 'lit';

const styles: CSSResult = css`
    :host {
        container-type: inline-size;
    }

    @container (max-width: 767px) {
        .vl-alert__content {
            max-width: 90%;
        }
    }
`;
export default styles as CSSResult;
