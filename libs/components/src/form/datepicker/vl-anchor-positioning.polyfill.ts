import applyCss from '@oddbird/css-anchor-positioning/fn';
import { apply as applyPopover, isSupported as isPopoverSupported } from '@oddbird/popover-polyfill/fn';

let popoverApplied = false;

function isNativelySupported(): boolean {
    return (
        typeof CSS !== 'undefined' &&
        typeof CSS.supports === 'function' &&
        CSS.supports('anchor-name: --x') &&
        typeof HTMLElement !== 'undefined' &&
        typeof HTMLElement.prototype.showPopover === 'function'
    );
}

function ensurePopover(): void {
    if (popoverApplied) return;
    popoverApplied = true;
    if (!isPopoverSupported()) applyPopover();
}

export function isAnchorPositioningNativelySupported(): boolean {
    return isNativelySupported();
}

export async function ensureAnchorPositioningPolyfill(
    roots: (Document | HTMLElement | ShadowRoot)[]
): Promise<boolean> {
    if (isNativelySupported()) return true;
    ensurePopover();
    await applyCss({ roots: roots as (Document | HTMLElement)[] });
    return true;
}
