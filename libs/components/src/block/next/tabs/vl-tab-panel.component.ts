import { BaseLitElement, webComponent } from '@domg-wc/common';
import { CSSResult, html, TemplateResult } from 'lit';
import { vlTabPanelFluxStyles } from './vl-tab-panel.flux-css';

@webComponent('vl-tab-panel-next')
export class VlTabPanelComponent extends BaseLitElement {
    static get styles(): CSSResult[] {
        return [vlTabPanelFluxStyles];
    }

     connectedCallback(): void {
        super.connectedCallback();
        this.setAttribute('role', 'tabpanel');
        this.setAttribute('tabindex', '0');
        this.setAttribute('hidden', '');
        if (!this.hasAttribute('id')) {
            console.warn('vl-tab-panel-next: Attribuut "id" is verplicht');
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
