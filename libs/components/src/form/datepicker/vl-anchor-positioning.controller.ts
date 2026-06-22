import { LitElement, ReactiveController } from 'lit';
import {
    ensureAnchorPositioningPolyfill,
    isAnchorPositioningNativelySupported,
} from './vl-anchor-positioning.polyfill';

/**
 * Beheert de Popover API (popover="manual" + show/hidePopover) voor een floating element.
 * De CSS Anchor Positioning zelf zit in vl-datepicker.positioning-css.ts.
 */
export default class AnchorPositioningController implements ReactiveController {
    private host: LitElement;
    private floatingElement: HTMLElement | null = null;

    static isNativelySupported(): boolean {
        return isAnchorPositioningNativelySupported();
    }

    static ensureSupport(roots: (Document | HTMLElement | ShadowRoot)[]): Promise<boolean> {
        return ensureAnchorPositioningPolyfill(roots);
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
    }

    hide(): void {
        try {
            this.floatingElement?.hidePopover();
        } catch {
            /* al gesloten */
        }
    }
}
