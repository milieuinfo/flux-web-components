import { css, CSSResult } from 'lit';
import { vlHyphenateMixin } from '@domg-wc/styles';

export const vlAlertFluxStyles: CSSResult = css`
    :host {
        container-type: inline-size;
        ${vlHyphenateMixin()}
    }

    @container (max-width: 767px) {
        .vl-alert__content {
            max-width: 90%;
        }
    }
    
    #message.vl-alert__message {
         p,  slot {
            white-space: pre-line;
        }
    }
`;
