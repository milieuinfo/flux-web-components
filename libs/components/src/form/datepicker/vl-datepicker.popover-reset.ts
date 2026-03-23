import { css, CSSResult } from 'lit';

/**
 * Reset voor de browser UA stylesheet die standaard op [popover] elementen wordt toegepast.
 *
 * De UA stylesheet zet o.a.:
 *   - inset: 0           → overschrijft anchor positioning (top/left/bottom/right)
 *   - margin: auto        → centreert de popover
 *   - padding: 4px        → voegt extra padding toe
 *   - overflow: auto      → knipt content af
 *
 * Wat we NIET resetten en waarom:
 *   - border              → govflanders-style zet zelf de juiste border
 *   - background / color  → UA defaults (wit/zwart) matchen met het design
 *   - width / height      → fit-content is gewenst gedrag
 *   - position            → fixed is nodig voor anchor positioning
 */
export const vlDatepickerPopoverResetStyles: CSSResult = css`
    [popover] {
        inset: unset;
        margin: unset;
        padding: unset;
        overflow: visible;
    }

    /* Visibility gekoppeld aan flatpickr's .open class.
       Overschrijft de UA [popover]:not(:popover-open) { display: none } */
    [popover]:not(.open) {
        display: none !important;
    }

    [popover].open {
        display: block !important;
    }
`;
