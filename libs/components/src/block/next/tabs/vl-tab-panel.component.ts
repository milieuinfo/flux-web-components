import { BaseLitElement, webComponent } from '@domg-wc/common';
import { CSSResult, html, PropertyValues, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { vlTabPanelFluxStyles } from './vl-tab-panel.flux-css';

@webComponent('vl-tab-panel-next')
export class VlTabPanelComponent extends BaseLitElement {
    static get styles(): CSSResult[] {
        return [vlTabPanelFluxStyles];
    }

    @property({ type: Boolean, reflect: true })
    hidden = true;

    connectedCallback(): void {
        super.connectedCallback();
        this.setAttribute('role', 'tabpanel');
        this.syncTabIndex();
        if (!this.hasAttribute('id')) {
            console.warn('vl-tab-panel-next: Attribuut "id" is verplicht');
        }
    }

    protected override updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        if (changedProperties.has('hidden')) {
            this.syncTabIndex();
        }
    }

    private syncTabIndex(): void {
        if (this.hidden) {
            this.removeAttribute('tabindex');
        } else {
            this.setAttribute('tabindex', '0');
        }
    }

    protected override render(): TemplateResult {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-tab-panel-next': VlTabPanelComponent;
    }
}
