import { vlFocusOutlineMixin } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlSpotlightFluxStyles: CSSResult = css`
    /* Geen positioned element tussen de kaart en de link: het klikvlak (::before) moet de hele kaart beslaan. */
    .vl-spotlight__header,
    .vl-spotlight__title-wrapper,
    .vl-spotlight__title {
        position: static;
    }
    /* De bovenrand ligt boven het klikvlak; een klik erop moet de link bereiken. */
    .vl-spotlight::before {
        pointer-events: none;
    }
    .vl-spotlight__link {
        display: block;
        text-decoration: none;
    }
    /*
     * Bewust zonder z-index en zonder isolation: een shadow root is geen stacking context, dus een z-index lekt boven
     * sticky headers van de pagina, en isolation sluit een popover uit het content-slot op onder de volgende kaart.
     * De volgorde in de boom doet het werk: het klikvlak komt als ::before vóór de titeltekst en de content.
     */
    .vl-spotlight__link::before {
        content: '';
        position: absolute;
        inset: 0;
    }
    .vl-spotlight__link:focus {
        box-shadow: none;
        outline: none;
    }
    .vl-spotlight__link:focus::before {
        ${vlFocusOutlineMixin()}
    }
    /* Positioned na het klikvlak en dus erboven, zodat de onderlijning enkel wegvalt bij hover op de titel zelf. */
    .vl-spotlight__link-text {
        display: block;
        position: relative;
        text-decoration: underline;
    }
    .vl-spotlight__link-text:hover {
        text-decoration: none;
    }
    .vl-spotlight__link .vl-spotlight__external-icon {
        color: var(--vl-color--icon-subtle);
    }
    /* Positioned na het klikvlak en dus erboven, zodat een link of knop in het content-slot bereikbaar blijft. */
    .vl-spotlight--has-link slot[name='content']::slotted(*) {
        position: relative;
    }
`;
