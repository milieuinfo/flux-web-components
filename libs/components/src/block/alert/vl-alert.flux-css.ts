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

    :host([multiline]) #message.vl-alert__message {
        p,
        slot {
            white-space: pre-line;
        }
    }

    :host([message]) #message.vl-alert__message {
        slot {
            display: none;
        }
    }
`;
