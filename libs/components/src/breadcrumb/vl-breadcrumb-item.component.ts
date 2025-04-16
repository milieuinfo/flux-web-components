import { breadcrumbStyle } from '@domg/govflanders-style/component';
import { resetStyle } from '@domg/govflanders-style/common';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import breadcrumbUigStyle from './vl-breadcrumb.uig-css';
import { BaseLitElement } from '@domg-wc/common';

@customElement('vl-breadcrumb-item')
export class VlBreadcrumbItemComponent extends BaseLitElement {
    private href = '';

    static get properties() {
        return {
            href: {
                type: String,
                attribute: 'data-vl-href',
                reflect: true,
            },
        };
    }

    static get styles() {
        return [resetStyle, breadcrumbStyle, breadcrumbUigStyle];
    }

    render() {
        if (this.href) {
            return html`
                <a href=${this.href} class="vl-breadcrumb__list__item__cta">
                    <slot></slot>
                </a>
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
