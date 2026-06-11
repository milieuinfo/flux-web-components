import { BaseLitElement } from '@domg-wc/common';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { vlShareButtonsFluxStyles } from './vl-share-buttons.flux-css';

/**
 * @deprecated Wordt verwijderd in v3. Gebruik een `vl-button` met `cta-link`, `icon` en `label`,
 * bv. `<vl-button cta-link="…" icon="facebook" label="Delen op Facebook">`.
 */
@customElement('vl-share-buttons')
export class VlShareButtonsComponent extends BaseLitElement {
    private alt = '';

    static get styles() {
        return [vlShareButtonsFluxStyles];
    }

    connectedCallback() {
        super.connectedCallback();
        console.warn(
            'vl-share-buttons is deprecated en wordt verwijderd in v3. Gebruik een vl-button met cta-link, icon en label, bv. <vl-button cta-link="…" icon="facebook" label="Delen op Facebook">.'
        );
    }

    static get properties() {
        return { alt: { type: Boolean, attribute: 'alt', reflect: true } };
    }

    render() {
        return html` <div class=${classMap({ 'vl-share-buttons': true, 'vl-share-buttons--alt': this.alt })}>
            <div class="vl-share-buttons__label">Deel:</div>
            <slot></slot>
        </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-share-buttons': VlShareButtonsComponent;
    }
}
