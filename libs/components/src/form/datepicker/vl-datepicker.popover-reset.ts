import { css, CSSResult } from 'lit';

/**
 * Reset van de UA [popover] stylesheet die anchor positioning zou breken
 * (inset/margin/padding/overflow). Border/achtergrond/grootte/position laten we staan.
 */
export const vlDatepickerPopoverResetStyles: CSSResult = css`
    [popover] {
        inset: unset;
        margin: unset;
        padding: unset;
        overflow: visible;
    }

    /* Zichtbaarheid via flatpickr's .open class i.p.v. de UA :popover-open. */
    [popover]:not(.open) {
        display: none !important;
    }

    [popover].open {
        display: block !important;
    }
`;
