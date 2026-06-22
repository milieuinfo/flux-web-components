function isNativelySupported(): boolean {
    return (
        typeof CSS !== 'undefined' &&
        typeof CSS.supports === 'function' &&
        CSS.supports('anchor-name: --x') &&
        typeof HTMLElement !== 'undefined' &&
        typeof HTMLElement.prototype.showPopover === 'function'
    );
}

type CssAnchorPolyfill = typeof import('@oddbird/css-anchor-positioning/fn').default;

let modulePromise: Promise<{ applyCss: CssAnchorPolyfill }> | null = null;

export function isAnchorPositioningNativelySupported(): boolean {
    return isNativelySupported();
}

export async function ensureAnchorPositioningPolyfill(
    roots: (Document | HTMLElement | ShadowRoot)[]
): Promise<boolean> {
    if (isNativelySupported()) return true;

    if (!modulePromise) {
        modulePromise = (async () => {
            const [cssMod, popoverMod] = await Promise.all([
                import('@oddbird/css-anchor-positioning/fn'),
                import('@oddbird/popover-polyfill/fn'),
            ]);
            if (!popoverMod.isSupported()) {
                popoverMod.apply();
            }
            return { applyCss: cssMod.default };
        })();
    }

    try {
        const { applyCss } = await modulePromise;
        await applyCss({ roots: roots as (Document | HTMLElement)[] });
        return true;
    } catch (err) {
        modulePromise = null;
        // eslint-disable-next-line no-console
        console.warn('[vl-datepicker] anchor-positioning polyfill faalde te laden, fallback naar default positionering', err);
        return false;
    }
}
