import { css } from 'lit';

export const toasterStyles = css`
    :host {
        position: fixed;
        width: 30rem;
        top: 0;
        right: 0;
        z-index: var(--vl-z-layer--toaster);
    }

    :host([placement='top-left']) {
        right: auto;
        left: 0;
    }

    :host([placement='bottom-right']) {
        top: auto;
        bottom: 0;
    }

    :host([placement='bottom-left']) {
        top: auto;
        right: auto;
        bottom: 0;
        left: 0;
    }

    :host > * {
        animation: fade-in 0.3s ease;
    }

    :host([fade-out]) > * {
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
