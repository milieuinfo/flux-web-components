import { css, CSSResult } from 'lit';

/**
 * CSS Anchor Positioning voor de vl-datepicker kalender.
 *
 * De toggle button is de anchor (--datepicker-btn), de flatpickr kalender
 * wordt gepositioneerd via anchor() functies met position: fixed.
 *
 * @position-try fallbacks zorgen ervoor dat de kalender:
 *   - Rechts uitlijnt op smalle viewports (als de kalender rechts overflowt)
 *   - Boven de button verschijnt als er niet genoeg ruimte onder is
 *   - Combinatie van beide als dat nodig is
 *
 * Het position attribuut op de host (auto, above, below, etc.) wordt
 * gelezen via :host([position='...']) CSS selectors.
 */
export const vlDatepickerPositioningStyles: CSSResult = css`
    /* Anchor setup */
    :host {
        anchor-scope: --datepicker-btn;
    }

    button#toggle-calendar {
        anchor-name: --datepicker-btn;
    }

    /* Default kalender positionering: onder de button, links uitgelijnd */
    .flatpickr-calendar:not(.static) {
        position: fixed;
        position-anchor: --datepicker-btn;
        top: anchor(bottom);
        left: anchor(left);
        z-index: var(--vl-z-layer--datepicker) !important;
    }

    /* Fallbacks voor positionering:
       1. Rechts uitlijnen als de kalender rechts overflowt
       2. Boven tonen als er niet genoeg ruimte onder is
       3. Boven + rechts als combinatie nodig is */
    @position-try --align-right-below {
        top: anchor(bottom);
        left: auto;
        right: 0;
    }

    @position-try --flip-above {
        top: auto;
        bottom: anchor(top);
        left: anchor(left);
    }

    @position-try --align-right-above {
        top: auto;
        bottom: anchor(top);
        left: auto;
        right: 0;
    }

    .flatpickr-calendar:not(.static) {
        position-try-fallbacks: --align-right-below, --flip-above, --align-right-above;
    }

    /* Position mapping per position attribuut */

    /* auto varianten — met flip */
    :host([position='auto']) .flatpickr-calendar:not(.static),
    :host(:not([position])) .flatpickr-calendar:not(.static),
    :host([position='auto left']) .flatpickr-calendar:not(.static) {
        top: anchor(bottom);
        left: anchor(left);
        position-try-fallbacks: --align-right-below, --flip-above, --align-right-above;
    }
    :host([position='auto center']) .flatpickr-calendar:not(.static) {
        top: anchor(bottom);
        left: anchor(center);
        translate: -50% 0;
        position-try-fallbacks: --flip-above;
    }
    :host([position='auto right']) .flatpickr-calendar:not(.static) {
        top: anchor(bottom);
        right: anchor(right);
        left: auto;
        position-try-fallbacks: --flip-above;
    }

    /* above varianten — zonder flip */
    :host([position='above']) .flatpickr-calendar:not(.static),
    :host([position='above left']) .flatpickr-calendar:not(.static) {
        top: auto;
        bottom: anchor(top);
        left: anchor(left);
        position-try-fallbacks: ;
    }
    :host([position='above center']) .flatpickr-calendar:not(.static) {
        top: auto;
        bottom: anchor(top);
        left: anchor(center);
        translate: -50% 0;
        position-try-fallbacks: ;
    }
    :host([position='above right']) .flatpickr-calendar:not(.static) {
        top: auto;
        bottom: anchor(top);
        right: anchor(right);
        left: auto;
        position-try-fallbacks: ;
    }

    /* below varianten — zonder flip */
    :host([position='below']) .flatpickr-calendar:not(.static),
    :host([position='below left']) .flatpickr-calendar:not(.static) {
        top: anchor(bottom);
        left: anchor(left);
        position-try-fallbacks: ;
    }
    :host([position='below center']) .flatpickr-calendar:not(.static) {
        top: anchor(bottom);
        left: anchor(center);
        translate: -50% 0;
        position-try-fallbacks: ;
    }
    :host([position='below right']) .flatpickr-calendar:not(.static) {
        top: anchor(bottom);
        right: anchor(right);
        left: auto;
        position-try-fallbacks: ;
    }

    /* Placeholder is enkel een DOM-container voor flatpickr appendTo */
    #datepicker-calendar-placeholder {
        position: static;
    }
`;
