import { BaseLitElement, webComponent } from '@domg-wc/common-utilities';
import { html, PropertyDeclarations, TemplateResult } from 'lit';

@webComponent('vl-tabs-pane-next')
export class VlTabsPaneComponent extends BaseLitElement {
    private titleSlotObserver: MutationObserver | null = null;

    static get is() {
        return 'vl-tabs-pane-next';
    }

    static get properties(): PropertyDeclarations {
        return {
            id: { type: String },
            title: { type: String },
        };
    }

    render(): TemplateResult {
        return html` <slot></slot>`;
    }

    connectedCallback() {
        super.connectedCallback();
        this.processTitleSlot();
    }

    disconnectedCallback() {
        if (this.titleSlotObserver) {
            this.titleSlotObserver.disconnect();
        }
    }

    get paneId(): string {
        return this.getAttribute('id') || '';
    }

    get paneTitle(): string {
        return this.getAttribute('title') || '';
    }

    private get titleSlot(): Element | null {
        return this.querySelector('[slot="title"]');
    }

    private processTitleSlot() {
        if (this.titleSlot) {
            this.moveTabPaneTitleSlot();
            this.titleSlotObserver = this.observeTitleSlot(() => this.moveTabPaneTitleSlot());
        }
    }

    private moveTabPaneTitleSlot() {
        if (this.titleSlot) {
            const titleClone = this.titleSlot.cloneNode(true) as Element;
            titleClone.setAttribute('slot', `${this.paneId}-title-slot`);
            const slot = this.parentElement?.querySelector(`[slot="${this.paneId}-title-slot"]`);
            if (slot) {
                this.parentElement?.replaceChild(titleClone, slot);
            } else {
                this.parentElement?.appendChild(titleClone);
            }
        }
    }

    private observeTitleSlot(callback: any): MutationObserver {
        const observer = new MutationObserver((mutations) => callback(mutations));
        if (this.titleSlot) {
            observer.observe(this.titleSlot, { childList: true, subtree: true, characterData: true });
        }
        return observer;
    }

    private titleChangedCallback(oldValue: string, newValue: string) {
        if (this.hasAttribute('observe-title')) {
            const tab = this.parentElement?.shadowRoot?.querySelector(`a.vl-tab__link#${this.paneId}`);
            if (tab) {
                tab.innerHTML = `<slot name="${this.paneId}-title-slot">${newValue}</slot>`;
            }
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-tabs-pane-next': VlTabsPaneComponent;
    }
}
