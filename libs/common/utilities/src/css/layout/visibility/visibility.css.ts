import { css } from 'lit';

// TODO: vermijden dit te gebruiken en anders documenteren
// TODO: te bekijken in welke mate afnemers het gebruiken, zet het onder base, dan niet nodig
// TODO: accessibility hernoemen naar visibility, daar zowel dez als visually-hidden in steken

export const visibilityStyles = css`
    @media screen and (min-width: 1023px) {
        .vl-visible-next--l {
            display: inherit !important;
        }
    }
    @media screen and (max-width: 1023px) {
        .vl-visible-next--m {
            display: inherit !important;
        }
    }
    @media screen and (max-width: 767px) {
        .vl-visible-next--s {
            display: inherit !important;
        }
    }
    @media screen and (max-width: 500px) {
        .vl-visible-next--xs {
            display: inherit !important;
        }
    }

    .vl-hidden-next {
        display: none;
    }
    @media screen and (min-width: 1023px) {
        .vl-hidden-next--l {
            display: none !important;
        }
    }
    @media screen and (max-width: 1023px) {
        .vl-hidden-next--m {
            display: none !important;
        }
    }
    @media screen and (max-width: 767px) {
        .vl-hidden-next--s {
            display: none !important;
        }
    }
    @media screen and (max-width: 500px) {
        .vl-hidden-next--xs {
            display: none !important;
        }
    }
`;
