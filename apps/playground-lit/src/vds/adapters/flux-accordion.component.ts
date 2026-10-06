import { css } from 'lit';
import { VlCollapsible } from '@govflanders/vl-ui-design-system-web-components';
import { assignUnslotted, observeChildren, renameSlot, syncOwnedSlot } from './adapter-utils';

export class FluxAccordion extends VlCollapsible {
    static properties = {
        toggleText: { type: String, attribute: 'toggle-text' },
        openToggleText: { type: String, attribute: 'open-toggle-text' },
        closeToggleText: { type: String, attribute: 'close-toggle-text' },
        headingLevel: { type: String, attribute: 'heading-level' },
        defaultOpen: { type: Boolean, attribute: 'default-open' },
        bare: { type: Boolean, reflect: true },
    };

    declare toggleText: string | null;
    declare openToggleText: string | null;
    declare closeToggleText: string | null;
    declare headingLevel: string | null;
    declare defaultOpen: boolean;
    declare bare: boolean;

    private observer?: MutationObserver;

    static styles = [
        (VlCollapsible as unknown as { styles: unknown }).styles,
        css`
            :host(:not([bare])) .vl-collapsible__header {
                padding: 0;
            }
            :host(:not([bare])) .vl-collapsible__icon {
                width: auto;
                height: auto;
            }
            :host(:not([bare])) .vl-collapsible__icon > *::part(icon) {
                font-size: 1.8rem;
            }
            :host(:not([bare])) .vl-collapsible__header:hover:not(:has(.vl-collapsible__actions:hover)),
            :host(:not([bare])) .vl-collapsible__header:active:not(:has(.vl-collapsible__actions:hover)) {
                background: transparent;
            }
            :host(:not([bare])) .vl-collapsible__header:hover .vl-collapsible__trigger {
                text-decoration: underline;
                color: #003bb0;
            }
            :host(:not([bare])) .vl-collapsible__header .vl-collapsible__trigger:focus,
            :host(:not([bare])) .vl-collapsible__header .vl-collapsible__trigger:active {
                text-decoration: underline;
                color: #004099;
            }
            :host(:not([bare])) .vl-collapsible__trigger {
                font-family: 'Flanders Art Sans', sans-serif;
                gap: 0.4rem;
                color: #0055cc;
                font-size: 1.8rem;
                font-weight: 500;
                line-height: 2.7rem;
            }
        `,
    ];

    connectedCallback(): void {
        super.connectedCallback();
        if (this.defaultOpen) {
            this.open = true;
        }
        this.shim();
        this.observer = observeChildren(this, () => this.shim());
        this.addEventListener('vl-toggle', this.onToggle);
    }

    disconnectedCallback(): void {
        this.observer?.disconnect();
        this.removeEventListener('vl-toggle', this.onToggle);
        super.disconnectedCallback();
    }

    close(): void {
        this.hide();
    }

    private onToggle = (e: Event): void => {
        if (e.target !== this) return;
        this.shim();
        this.dispatchEvent(
            new CustomEvent('vl-on-toggle', {
                bubbles: true,
                composed: true,
                detail: { open: this.open },
            })
        );
    };

    private triggerText(): string | null {
        const open = this.open;
        if (open && this.closeToggleText) return this.closeToggleText;
        if (!open && this.openToggleText) return this.openToggleText;
        return this.toggleText;
    }

    private shim(): void {
        renameSlot(this, 'title', 'trigger');
        renameSlot(this, 'menu', 'actions');
        syncOwnedSlot(this, 'trigger', this.triggerText());
        assignUnslotted(this, 'content');
    }

    protected willUpdate(changed: Map<PropertyKey, unknown>): void {
        if (this.headingLevel && /^[1-6]$/.test(this.headingLevel)) {
            this.level = `h${this.headingLevel}`;
        }
        if (changed.has('toggleText') || changed.has('openToggleText') || changed.has('closeToggleText')) {
            this.shim();
        }
        super.willUpdate(changed);
    }

    protected updated(changed: Map<PropertyKey, unknown>): void {
        super.updated(changed);
        this.shadowRoot
            ?.querySelector('.vl-collapsible__icon > *')
            ?.setAttribute('icon', this.bare ? 'nav-down' : 'arrow-down-fat');
    }
}

if (!customElements.get('flux-accordion')) {
    customElements.define('flux-accordion', FluxAccordion);
}
