import { css } from 'lit';

export const toasterStyles = css`
    :host {
        position: fixed;
        width: var(--vl-toaster-width);
        top: 0;
        right: 0;
        z-index: var(--vl-z-layer--toaster);

        ::slotted(vl-alert),
        vl-alert {
            display: block;
            margin: 1rem 1rem 0 0;
        }

        @media (max-width: var(--vl-toaster-width)) {
            width: 100%;

            ::slotted(vl-alert),
            vl-alert {
                margin: 0;
            }
        }
    }

    :host([placement='top-left']) {
        right: auto;
        left: 0;

        ::slotted(vl-alert),
        vl-alert {
            margin: 1rem 0 0 1rem;
            @media (max-width: var(--vl-toaster-width)) {
                margin: 0;
            }
        }
    }

    :host([placement='bottom-right']) {
        top: auto;
        bottom: 0;

        ::slotted(vl-alert),
        vl-alert {
            margin: 0 1rem 1rem 0;
            @media (max-width: var(--vl-toaster-width)) {
                margin: 0;
            }
        }
    }

    :host([placement='bottom-left']) {
        top: auto;
        right: auto;
        bottom: 0;
        left: 0;

        ::slotted(vl-alert),
        vl-alert {
            margin: 0 0 1rem 1rem;
            @media (max-width: var(--vl-toaster-width)) {
                margin: 0;
            }
        }
    }

    /*
     * De output staat in de top layer zolang er een modal open staat. De positie en breedte komen van de host, zodat
     * placement, --vl-toaster-width en overrides op vl-toaster blijven gelden; de rest zet de UA-stijl van [popover]
     * terug. display: block houdt de output gerenderd terwijl hij opnieuw naar boven gehaald wordt: met de
     * display: none van een gesloten popover zouden de animaties van zichtbare toasts herstarten.
     */
    output[popover] {
        display: block;
        position: fixed;
        inset: inherit;
        width: inherit;
        height: auto;
        margin: 0;
        border: 0;
        padding: 0;
        overflow: visible;
        color: inherit;
        background: none;
    }

    :host output * {
        animation: fade-in 0.3s ease;
    }

    :host([fade-out]) output * {
        animation: fade-in 0.3s ease, fade-out 0.3s ease 4.4s;
    }

    @keyframes fade-in {
        from {
            opacity: 0;
        }
    }

    @keyframes fade-out {
        to {
            opacity: 0;
        }
    }
`;
