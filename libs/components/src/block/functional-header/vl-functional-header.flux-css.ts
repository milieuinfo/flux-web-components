import { vlFocusOutlineMixin, vlHyphenateMixin } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

// deze css is gegenereerd uit de oude custom scss
export const vlFunctionalHeaderFluxStyles: CSSResult = css`
    .flux-functional-header__content {
        display: flex;
        flex-flow: column;
    }

    .flux-functional-header__row {
        display: flex;
        flex-direction: row;
    }

    @media (max-width: 767px) {
        .flux-functional-header__row {
            flex-direction: column;
        }
        .flux-functional-header__top-right {
            padding: 0.5rem 1rem 0 1rem;
        }
        ::slotted([slot='heading']) {
            ${vlHyphenateMixin()}
            overflow-wrap: anywhere;
        }
    }
    :host(.vl-functional-header--full-width) .vl-layout {
        max-width: 100%;
    }

    :host(.vl-functional-header--sticky) header.vl-functional-header {
        position: sticky;
        top: var(--vl-functional-header--sticky-offset-top, '43px');
        z-index: 10003;
    }

    a#title {
        text-decoration: none;
    }

    /* Een titel met link toont bij hover een onderlijning, zodat hij als link herkenbaar is. */
    a#title[href]:hover {
        text-decoration: underline;
    }

    .sub-header-hidden slot {
        display: none;
    }

    .sub-header-hidden {
        padding-bottom: 1.3rem;
    }

    .vl-functional-header h1 {
        font-size: 2rem;
    }

    /* De adopted stylesheets raken geen slotted content, dus de titelstijl staat hier nog eens voor een eigen kop
       in de heading-slot. Enkel het slot-element zelf is bereikbaar; geneste markup styleert de afnemer.
       Stijl van de pagina wint van ::slotted, zoals de reset van Flux voor een a (kleur, onderlijning, font: inherit).
       Enkel met !important wint de component, zodat een link in het slot eruitziet als de standaardtitel. */
    ::slotted([slot='heading']) {
        display: flex;
        align-items: center;
        margin: 0;
        font-size: 2rem !important;
        font-weight: 500 !important;
        line-height: 1.18 !important;
        color: var(--vl-color--text) !important;
        text-decoration: none !important;
    }

    /* Zoals de standaardtitel met link; !important en een hogere specificiteit winnen van de regel hierboven. */
    ::slotted(a[slot='heading'][href]:hover) {
        text-decoration: underline !important;
    }

    ::slotted([slot='heading']:focus) {
        ${vlFocusOutlineMixin()};
    }

    /* Een skip link naar #title geeft het kopblok de focus wanneer er geen link of knop in de heading-slot staat. */
    .vl-functional-header__heading:focus {
        ${vlFocusOutlineMixin()};
    }

    .vl-functional-header__sub-row {
        padding-left: 0;
    }
`;
