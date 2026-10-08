import { webComponent } from '@domg-wc/common';
import { VlSideSheet } from '@domg-wc/components/block';
import { VlMap } from '../../vl-map';

@webComponent('vl-map-side-sheet')
export class VlMapSideSheet extends VlSideSheet {
    private readonly insetObserver = new ResizeObserver(() => this.publishInset());
    private mapElement?: VlMap | null;
    private publishedSide?: 'left' | 'right';

    constructor() {
        // TODO: Kijk of dit iets moet doen, momenteel doet dit niets omdat de parameter in de constructor van VlSideSheet genegeerd wordt.
        super(`
      :host {
        width: 3.5rem;
        transition: width 0.1s;
      }

      :host([open]) {
        width: var(--vl-side-sheet-width,calc(100%/3));
      }

      .vl-side-sheet__toggle {
        margin: 10px;
      }

      :host([open]) .vl-side-sheet__toggle {
        margin-left: 0px;
      }

      ::slotted(*) {
        margin-bottom: 20px;
      }
    `);
    }

    connectedCallback() {
        this.mapElement = this.closest('vl-map');
        super.connectedCallback();
        this.setAttribute('absolute', '');

        if (!this.hasAttribute('right')) {
            this.setAttribute('left', '');
        }
        this._openChangedCallback();
        this.insetObserver.observe(this);
        this.insetObserver.observe(this._toggleButton!);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.insetObserver.disconnect();
        this.publishInset();
        this.mapElement = undefined;
    }

    _openChangedCallback() {
        super._openChangedCallback();
        this.publishInset();
    }

    _rightChangedCallback(_oldValue: string, newValue: string) {
        if (newValue != undefined) {
            this.removeAttribute('left');
        } else {
            this.setAttribute('left', '');
        }
        this.publishInset();
    }

    private publishInset() {
        const map = this.mapElement;
        if (!map) {
            return;
        }

        const side = this.isOpen && this.isConnected ? (this.isLeft ? 'left' : 'right') : undefined;
        if (this.publishedSide && this.publishedSide !== side) {
            map._setSideSheetInset(this.publishedSide);
        }
        this.publishedSide = side;
        if (!side) {
            return;
        }

        const toggleWidth = this.hideToggleButton !== null ? 0 : this._toggleButton!.getBoundingClientRect().width;
        map._setSideSheetInset(side, this.offsetWidth, toggleWidth);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-side-sheet': VlMapSideSheet;
    }
}
