import { css, CSSResult } from 'lit';

export const vlAlertFluxStyles: CSSResult = css`
    :host {
        container-type: inline-size;
    }

    @container (max-width: 767px) {
        .vl-alert__content {
            max-width: 90%;
        }
    }
`;
