import { LitElement, ReactiveController } from 'lit';
import {
    ensureAnchorPositioningPolyfill,
    isAnchorPositioningNativelySupported,
} from './vl-anchor-positioning.polyfill';

type Vertical = 'above' | 'below';
type Horizontal = 'left' | 'center' | 'right';

const GAP = 2;

/**
 * Beheert de Popover API (popover="manual" + show/hidePopover) voor een floating element, zodat
 * de kalender in de top layer rendert en ontsnapt aan ancestor overflow/transform.
 *
 * Positionering:
 * - Native CSS Anchor Positioning beschikbaar → de CSS-regels (vl-datepicker.positioning-css.ts)
 *   doen het werk; deze controller raakt de positie niet aan.
 * - Geen native support → we positioneren via JS t.o.v. de toggle-button, met respect voor het
 *   position-attribuut, en herberekenen bij scroll/resize zolang de kalender open is.
 */
export default class AnchorPositioningController implements ReactiveController {
    private host: LitElement;
    private floatingElement: HTMLElement | null = null;
    private readonly useJsPositioning = !isAnchorPositioningNativelySupported();
    private repositionListener = () => this.reposition();

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
            this.reposition();
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

    private resolvePlacement(button: DOMRect, calendar: DOMRect): { vertical: Vertical; horizontal: Horizontal } {
        const [rawVertical = 'auto', rawHorizontal = 'left'] = (this.host.getAttribute('position') || 'auto')
            .trim()
            .toLowerCase()
            .split(/\s+/);

        const horizontal: Horizontal = (['left', 'center', 'right'].includes(rawHorizontal)
            ? rawHorizontal
            : 'left') as Horizontal;

        let vertical: Vertical;
        if (rawVertical === 'above' || rawVertical === 'below') {
            vertical = rawVertical;
        } else {
            // auto: onder tonen tenzij er meer plaats boven is dan onder.
            const spaceBelow = window.innerHeight - button.bottom;
            const spaceAbove = button.top;
            vertical = spaceBelow >= calendar.height + GAP || spaceBelow >= spaceAbove ? 'below' : 'above';
        }
        return { vertical, horizontal };
    }

    /** Berekent en zet de positie van de (top-layer) kalender t.o.v. de toggle-button. */
    private reposition(): void {
        const floating = this.floatingElement;
        const anchor = this.getAnchorElement();
        if (!floating || !anchor) return;

        const button = anchor.getBoundingClientRect();
        const calendar = floating.getBoundingClientRect();
        const { vertical, horizontal } = this.resolvePlacement(button, calendar);

        let top = vertical === 'above' ? button.top - GAP - calendar.height : button.bottom + GAP;
        let left =
            horizontal === 'right'
                ? button.right - calendar.width
                : horizontal === 'center'
                ? button.left + button.width / 2 - calendar.width / 2
                : button.left;

        // Binnen de viewport houden.
        left = Math.max(GAP, Math.min(left, window.innerWidth - calendar.width - GAP));
        top = Math.max(GAP, Math.min(top, window.innerHeight - calendar.height - GAP));

        const style = floating.style;
        style.position = 'fixed';
        style.margin = '0';
        style.transform = 'none';
        style.right = 'auto';
        style.bottom = 'auto';
        style.top = `${Math.round(top)}px`;
        style.left = `${Math.round(left)}px`;
    }

    private startRepositioning(): void {
        // capture: true → vangt ook scroll van tussenliggende scrollbare ancestors op.
        window.addEventListener('scroll', this.repositionListener, true);
        window.addEventListener('resize', this.repositionListener);
    }

    private stopRepositioning(): void {
        window.removeEventListener('scroll', this.repositionListener, true);
        window.removeEventListener('resize', this.repositionListener);
    }
}
