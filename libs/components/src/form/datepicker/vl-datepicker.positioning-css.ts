import { css, CSSResult } from 'lit';

/**
 * CSS Anchor Positioning voor de vl-datepicker kalender.
 * Toggle button = anchor (--datepicker-btn); kalender via anchor() + position: fixed.
 * position attribuut (auto/above/below + left/center/right) wordt via :host([position='...']) gemapt.
 */
export const vlDatepickerPositioningStyles: CSSResult = css`
    /* Default (flatpickr): placeholder absoluut t.o.v. viewport zodat flatpickr's positionering klopt. */
    #datepicker-calendar-placeholder {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        z-index: var(--vl-z-layer--datepicker);
    }

    /* Anchor-regels in @supports: browsers zonder CSS Anchor Positioning negeren ze en vallen terug
       op de default hierboven (de useAnchorPositioning getter in JS spiegelt deze detect). */
    @supports (anchor-name: --x) {
    :host([anchor-positioning]) {
        anchor-scope: --datepicker-btn;
    }

    :host([anchor-positioning]) button#toggle-calendar {
        anchor-name: --datepicker-btn;
    }

    :host([anchor-positioning]) #datepicker-calendar-placeholder {
        position: static;
        width: auto;
        z-index: auto;
    }

    /* Default: onder de button, links uitgelijnd, 2px gap. */
    :host([anchor-positioning]) .flatpickr-calendar:not(.static) {
        position: fixed;
        position-anchor: --datepicker-btn;
        top: calc(anchor(bottom) + 2px);
        left: anchor(left);
        z-index: var(--vl-z-layer--datepicker) !important;
    }

    /* Fallbacks: rechts uitlijnen bij overflow, boven tonen bij plaatsgebrek, of beide. */
    @position-try --align-right-below {
        top: calc(anchor(bottom) + 2px);
        left: auto;
        right: 0;
    }

    @position-try --flip-above {
        top: auto;
        bottom: calc(anchor(top) + 2px);
        left: anchor(left);
    }

    @position-try --align-right-above {
        top: auto;
        bottom: calc(anchor(top) + 2px);
        left: auto;
        right: 0;
    }

    :host([anchor-positioning]) .flatpickr-calendar:not(.static) {
        position-try-fallbacks: --align-right-below, --flip-above, --align-right-above;
    }

    /* Position mapping per position attribuut */

    /* auto varianten — met flip */
    :host([anchor-positioning][position='auto']) .flatpickr-calendar:not(.static),
    :host([anchor-positioning]:not([position])) .flatpickr-calendar:not(.static),
    :host([anchor-positioning][position='auto left']) .flatpickr-calendar:not(.static) {
        top: calc(anchor(bottom) + 2px);
        left: anchor(left);
        position-try-fallbacks: --align-right-below, --flip-above, --align-right-above;
    }
    :host([anchor-positioning][position='auto center']) .flatpickr-calendar:not(.static) {
        top: calc(anchor(bottom) + 2px);
        left: anchor(center);
        translate: -50% 0;
        position-try-fallbacks: --flip-above;
    }
    :host([anchor-positioning][position='auto right']) .flatpickr-calendar:not(.static) {
        top: calc(anchor(bottom) + 2px);
        right: anchor(right);
        left: auto;
        position-try-fallbacks: --flip-above;
    }

    /* above varianten — zonder flip */
    :host([anchor-positioning][position='above']) .flatpickr-calendar:not(.static),
    :host([anchor-positioning][position='above left']) .flatpickr-calendar:not(.static) {
        top: auto;
        bottom: calc(anchor(top) + 2px);
        left: anchor(left);
        position-try-fallbacks: none;
    }
    :host([anchor-positioning][position='above center']) .flatpickr-calendar:not(.static) {
        top: auto;
        bottom: calc(anchor(top) + 2px);
        left: anchor(center);
        translate: -50% 0;
        position-try-fallbacks: none;
    }
    :host([anchor-positioning][position='above right']) .flatpickr-calendar:not(.static) {
        top: auto;
        bottom: calc(anchor(top) + 2px);
        right: anchor(right);
        left: auto;
        position-try-fallbacks: none;
    }

    /* below varianten — zonder flip */
    :host([anchor-positioning][position='below']) .flatpickr-calendar:not(.static),
    :host([anchor-positioning][position='below left']) .flatpickr-calendar:not(.static) {
        top: calc(anchor(bottom) + 2px);
        left: anchor(left);
        position-try-fallbacks: none;
    }
    :host([anchor-positioning][position='below center']) .flatpickr-calendar:not(.static) {
        top: calc(anchor(bottom) + 2px);
        left: anchor(center);
        translate: -50% 0;
        position-try-fallbacks: none;
    }
    :host([anchor-positioning][position='below right']) .flatpickr-calendar:not(.static) {
        top: calc(anchor(bottom) + 2px);
        right: anchor(right);
        left: auto;
        position-try-fallbacks: none;
    }
    }
`;
