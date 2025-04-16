import { iconStyle } from '@domg/govflanders-style/component';
import { baseStyle, resetStyle } from '@domg/govflanders-style/common';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { MEDIA_NAMES } from './vl-share-button.model';
import shareButtonStyle from './vl-share-button.uig-css';
import { BaseLitElement } from '@domg-wc/common';

@customElement('vl-share-button')
export class VlShareButton extends BaseLitElement {
    private medium = '';
    private href = '';

    static get styles() {
        return [resetStyle, baseStyle, shareButtonStyle, iconStyle];
    }

    static get properties() {
        return {
            medium: { type: String, attribute: 'data-vl-medium', reflect: true },
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
