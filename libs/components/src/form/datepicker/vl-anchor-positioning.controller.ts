import { autoUpdate, computePosition, flip, Middleware, offset, Placement, platform, shift } from '@floating-ui/dom';
import { offsetParent } from 'composed-offset-position';
import { LitElement, ReactiveController } from 'lit';
import {
    ensureAnchorPositioningPolyfill,
    isAnchorPositioningNativelySupported,
} from './vl-anchor-positioning.polyfill';

const GAP = 2;

/**
 * Beheert de Popover API (popover="manual" + show/hidePopover) voor een floating element, zodat
 * de kalender in de top layer rendert en ontsnapt aan ancestor overflow/transform.
 *
 * Positionering:
 * - Native CSS Anchor Positioning beschikbaar → de CSS-regels (vl-datepicker.positioning-css.ts)
 *   doen het werk; deze controller raakt de positie niet aan.
 * - Geen native support → we positioneren via @floating-ui/dom t.o.v. de toggle-button, met respect
 *   voor het position-attribuut, en herberekenen via autoUpdate (scroll/resize/element-resize)
 *   zolang de kalender open is.
 */
export default class AnchorPositioningController implements ReactiveController {
    private host: LitElement;
    private floatingElement: HTMLElement | null = null;
    private readonly useJsPositioning = !isAnchorPositioningNativelySupported();
    private cleanupAutoUpdate: (() => void) | null = null;

    static isNativelySupported(): boolean {
        return isAnchorPositioningNativelySupported();
    }

    static ensureSupport(): Promise<boolean> {
        return ensureAnchorPositioningPolyfill();
    }

    constructor(host: LitElement) {
        this.host = host;
        this.host.addController(this);
    }

    hostConnected(): void {}

    hostDisconnected(): void {
        this.detach();
    }

    /** Zet popover="manual" zodat het element in de top layer rendert (ontsnapt aan overflow/transform). */
    attach(floatingElement: HTMLElement): void {
        this.floatingElement = floatingElement;
        this.floatingElement.setAttribute('popover', 'manual');
    }

    detach(): void {
        this.stopRepositioning();
        this.floatingElement?.removeAttribute('popover');
        this.floatingElement = null;
    }

    // try/catch: showPopover/hidePopover gooit InvalidStateError als de popover al in die staat is.
    show(): void {
        try {
            this.floatingElement?.showPopover();
        } catch {
            /* al open */
        }
        if (this.useJsPositioning) {
            this.startRepositioning();
        }
    }

    hide(): void {
        this.stopRepositioning();
        try {
            this.floatingElement?.hidePopover();
        } catch {
            /* al gesloten */
        }
    }

    private getAnchorElement(): HTMLElement | null {
        return this.host.shadowRoot?.querySelector<HTMLElement>('button#toggle-calendar') ?? null;
    }

    /**
     * Mapt het position-attribuut (vertical auto/above/below × horizontal left/center/right) naar
     * een floating-ui placement. Verticale flip enkel bij 'auto' (above/below zijn expliciet vast).
     */
    private resolvePlacement(): { placement: Placement; allowFlip: boolean } {
        const [rawVertical = 'auto', rawHorizontal = 'left'] = (this.host.getAttribute('position') || 'auto')
            .trim()
            .toLowerCase()
            .split(/\s+/);

        const side = rawVertical === 'above' ? 'top' : 'bottom';
        const alignment = rawHorizontal === 'center' ? '' : rawHorizontal === 'right' ? '-end' : '-start';
        return { placement: `${side}${alignment}` as Placement, allowFlip: rawVertical === 'auto' };
    }

    private reposition = async (): Promise<void> => {
        const floating = this.floatingElement;
        const anchor = this.getAnchorElement();
        if (!floating || !anchor) return;

        const { placement, allowFlip } = this.resolvePlacement();
        const middleware: Middleware[] = [offset(GAP), shift({ padding: GAP })];
        if (allowFlip) middleware.splice(1, 0, flip());

        const { x, y } = await computePosition(anchor, floating, {
            placement,
            strategy: 'fixed',
            middleware,
            platform: {
                ...platform,
                getOffsetParent: (element) => platform.getOffsetParent(element, offsetParent),
            },
        });

        Object.assign(floating.style, {
            position: 'fixed',
            margin: '0',
            transform: 'none',
            right: 'auto',
            bottom: 'auto',
            left: `${Math.round(x)}px`,
            top: `${Math.round(y)}px`,
        });
    };

    private startRepositioning(): void {
        const anchor = this.getAnchorElement();
        const floating = this.floatingElement;
        if (!anchor || !floating) return;
        // autoUpdate volgt window+ancestor-scroll, resize en element-resize (ResizeObserver) en roept
        // reposition ook meteen 1x aan bij opzetten.
        this.cleanupAutoUpdate = autoUpdate(anchor, floating, this.reposition);
    }

    private stopRepositioning(): void {
        this.cleanupAutoUpdate?.();
        this.cleanupAutoUpdate = null;
    }
}
