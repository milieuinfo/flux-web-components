import { BaseLitElement } from '@domg-wc/common';
import { resetStyle } from '@domg/govflanders-style/common';
import { breadcrumbStyle } from '@domg/govflanders-style/component';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { vlBreadcrumbFluxStyles } from './vl-breadcrumb.flux-css';

@customElement('vl-breadcrumb-item')
export class VlBreadcrumbItemComponent extends BaseLitElement {
    private href = '';
    private type = 'link';

    static get properties() {
        return {
            href: {
                type: String,
                attribute: 'href',
                reflect: true,
            },
            type: {
                type: String,
                attribute: 'type',
                reflect: true,
            },
        };
    }

    static get styles() {
        return [resetStyle, breadcrumbStyle, vlBreadcrumbFluxStyles];
    }

    render() {
        if (this.type === 'link' && this.href) {
            return html`
                <a href=${this.href} class="vl-breadcrumb__list__item__cta">
                    <slot></slot>
                </a>
            `;
        }

        if (this.type === 'button') {
            return html`
                <button class="vl-breadcrumb__list__item__cta" type="button">
                    <slot></slot>
                </button>
            `;
        }

        return html`
            <span class="vl-breadcrumb__list__item__cta">
                <slot></slot>
            </span>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-breadcrumb-item': VlBreadcrumbItemComponent;
    }
}
