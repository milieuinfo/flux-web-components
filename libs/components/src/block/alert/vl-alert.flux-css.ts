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

    #alert.vl-alert--banner {
        border-radius: 0;
        padding: 1rem 1.5rem;

        &.vl-alert--separator #title.vl-alert__title::after {
            content: ' - ';
        }

        /* de content is een kolom-flexbox, die inline children blokkeert: titel en boodschap lopen pas in elkaar
           over zodra de container zelf terug een block is */
        #content.vl-alert__content {
            display: block;
        }

        #title.vl-alert__title,
        #message.vl-alert__message {
            display: inline;

            p,
            ::slotted(*) {
                display: inline;
            }
        }
    }

    /* de sluitknop staat absoluut rechtsboven in de melding: zonder deze ruimte loopt de eerste tekstregel eronder
       door. Enkel met een sluitknop, zodat de overige varianten hun eigen binnenmarge houden. */
    :host([closable]) #alert.vl-alert {
        padding-right: 4rem;
    }
`;
