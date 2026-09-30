import { css } from 'lit';
import { VlIcon, VlSectionMessage } from '@govflanders/vl-ui-design-system-web-components';
import { assignUnslotted, observeChildren, syncOwnedSlot } from './adapter-utils';
import { fluxMessageTokens } from './flux-tokens';

const STATUS: Record<string, string> = { info: 'info', success: 'success', warning: 'warning', error: 'danger' };

export class FluxAlert extends VlSectionMessage {
    static properties = {
        type: { type: String, reflect: true },
        title: { type: String },
        message: { type: String },
        icon: { type: String, reflect: true },
    };

    declare type: string;
    declare message: string | null;
    declare icon: string | null;

    private observer?: MutationObserver;

    static styles = [
        (VlSectionMessage as unknown as { styles: unknown }).styles,
        fluxMessageTokens,
        css`
            :host(:not([bare])) .vl-section-message {
                padding: 2.5rem 3rem;
            }
            :host(:not([bare])) .vl-section-message__title {
                font-weight: 500;
            }
            :host(:not([bare]):not([icon])) [part~='icon'] {
                display: none;
            }
        `,
    ];

    connectedCallback(): void {
        super.connectedCallback();
        this.shim();
        this.observer = observeChildren(this, () => this.shim());
        this.addEventListener('vl-close', this.onClose);
    }

    disconnectedCallback(): void {
        this.observer?.disconnect();
        this.removeEventListener('vl-close', this.onClose);
        super.disconnectedCallback();
    }

    private onClose = (e: Event): void => {
        if (e.target !== this) return;
        this.remove();
        this.dispatchEvent(new Event('vl-alert-closed', { bubbles: true }));
    };

    private syncIcon(): void {
        const tag = (VlIcon as unknown as { elementName: string }).elementName;
        let owned = this.querySelector<HTMLElement>(':scope > [data-flux-owned="icon"]');
        if (!this.icon) {
            owned?.remove();
            return;
        }
        if (!owned) {
            owned = document.createElement(tag);
            owned.setAttribute('slot', 'icon');
            owned.dataset.fluxOwned = 'icon';
            this.prepend(owned);
        }
        owned.setAttribute('icon', this.icon);
    }

    private shim(): void {
        this.syncIcon();
        syncOwnedSlot(this, 'title', this.title);
        syncOwnedSlot(this, 'body', this.message);
        assignUnslotted(this, 'body');
    }

    protected willUpdate(changed: Map<PropertyKey, unknown>): void {
        this.status = STATUS[this.type] ?? 'info';
        if (changed.has('title') || changed.has('message') || changed.has('icon')) {
            this.shim();
        }
        super.willUpdate(changed);
    }
}

if (!customElements.get('flux-alert')) {
    customElements.define('flux-alert', FluxAlert);
}
