import { BaseLitElement } from '@domg-wc/common';
import { baseStyle, resetStyle } from '@domg/govflanders-style/common';
import { iconStyle } from '@domg/govflanders-style/component';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { vlShareButtonFluxStyles } from './vl-share-button.flux-css';
import { MEDIA_NAMES } from './vl-share-button.model';

/**
 * @deprecated Wordt verwijderd in v3. Gebruik een `vl-button` met `cta-link`, `icon` en `label`,
 * bv. `<vl-button cta-link="…" icon="facebook" label="Delen op Facebook">`.
 */
@customElement('vl-share-button')
export class VlShareButton extends BaseLitElement {
    private static deprecationWarningShown = false;
    private medium = '';
    private href = '';

    static get styles() {
        return [resetStyle, baseStyle, vlShareButtonFluxStyles, iconStyle];
    }

    connectedCallback() {
        super.connectedCallback();
        if (!VlShareButton.deprecationWarningShown) {
            console.warn(
                'vl-share-button is deprecated en wordt verwijderd in v3. Gebruik een vl-button met cta-link, icon' +
                ' en label, bv. <vl-button cta-link="…" icon="facebook" label="Delen op Facebook">.'
            );
            VlShareButton.deprecationWarningShown = true;
        }
    }

    static get properties() {
        return {
            medium: { type: String, attribute: 'medium', reflect: true },
            href: { type: String, attribute: 'href', reflect: true },
        };
    }

    render() {
        const name = MEDIA_NAMES[this.medium];
        return html`<a
            href=${this.href}
            class="vl-share-button vl-share-button--${this.medium}"
            title="Deel op ${name}"
        >
            <i class="vl-vi vl-vi-${this.medium}" aria-hidden="true"></i>
            ${name}
        </a>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-share-button': VlShareButton;
    }
}
