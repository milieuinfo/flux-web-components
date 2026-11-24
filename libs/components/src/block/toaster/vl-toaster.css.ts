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
     * In de top layer (open modal): positie en breedte erven van de host, zodat placement, --vl-toaster-width en
     * overrides op vl-toaster blijven gelden. De rest zet de UA-stijl van [popover] terug.
     */
    output[popover] {
        /* niet de display: none van een gesloten popover: die herstart de animaties bij het opnieuw naar boven halen */
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

    /* longhands: de animation shorthand zet animation-play-state terug op running en breekt zo de pauze */
    :host output > * {
        animation-name: fade-in;
        animation-duration: 0.3s;
        animation-timing-function: ease;
    }

    :host([fade-out]) output > :not([persistent]),
    :host output > [fade-out]:not([persistent]) {
        animation-name: fade-in, fade-out;
        animation-delay: 0s, 4.4s;
    }

    /*
     * Enkel de fade-out pauzeren (een gepauzeerde fade-in houdt een nieuwe toast onzichtbaar); op de output, want in
     * de top layer matcht de host in recente browsers geen :hover of :focus-within meer.
     */
    :host output:hover > *,
    :host output:focus-within > * {
        animation-play-state: running, paused;
    }

    @media (prefers-reduced-motion: reduce) {
        :host output > * {
            animation-name: none;
        }

        /* de fade-out blijft wel staan: de toast verwijdert zichzelf op het animationend-event van die animatie */
        :host([fade-out]) output > :not([persistent]),
        :host output > [fade-out]:not([persistent]) {
            animation-name: none, fade-out;
        }
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
