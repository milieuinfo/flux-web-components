import { apply as applyPopover, isSupported as isPopoverSupported } from '@oddbird/popover-polyfill/fn';

let popoverApplied = false;

function supportsNativeAnchor(): boolean {
    return (
        typeof CSS !== 'undefined' &&
        typeof CSS.supports === 'function' &&
        CSS.supports('anchor-name: --x')
    );
}

function supportsPopover(): boolean {
    return typeof HTMLElement !== 'undefined' && typeof HTMLElement.prototype.showPopover === 'function';
}

function ensurePopover(): void {
    if (popoverApplied) return;
    popoverApplied = true;
    // De popover-polyfill enkel toepassen als de browser de Popover API niet native kent.
    if (!isPopoverSupported()) applyPopover();
}

/**
 * Native pad: de browser kent zowel CSS Anchor Positioning als de Popover API. In dat geval
 * positioneren we via de CSS-regels (zie vl-datepicker.positioning-css.ts) en is er geen JS nodig.
 */
export function isAnchorPositioningNativelySupported(): boolean {
    return supportsNativeAnchor() && supportsPopover();
}

/**
 * Zorgt dat de kalender in de top layer kan renderen (en zo ontsnapt aan overflow/transform van
 * ancestors — FLUX-595). Dat vereist enkel de Popover API; die polyfillen we waar nodig.
 *
 * De CSS Anchor Positioning polyfill gebruiken we bewust niet: die leest enkel <style>/<link>
 * elementen en niet de adoptedStyleSheets waarin Lit zijn `static styles` plaatst, waardoor ze de
 * anchor()-regels van dit component nooit ziet. Op browsers zonder native anchor positioning
 * gebeurt de positionering daarom via JS in de AnchorPositioningController.
 *
 * @returns true als de popover-modus bruikbaar is (top layer beschikbaar), anders false → fallback
 *          naar de default flatpickr-positionering.
 */
export async function ensureAnchorPositioningPolyfill(): Promise<boolean> {
    if (isAnchorPositioningNativelySupported()) return true;
    try {
        ensurePopover();
        return supportsPopover();
    } catch (err) {
        // eslint-disable-next-line no-console
        console.warn(
            '[vl-datepicker] popover polyfill kon niet toegepast worden, fallback naar default positionering',
            err
        );
        return false;
    }
}
