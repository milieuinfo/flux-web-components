import { BaseLitElement } from '@domg-wc/common';
import { resetStyle } from '@domg/govflanders-style/common';
import { CSSResult, html, nothing, PropertyDeclarations, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { vlIconStyles } from '../../atom/icon-style/vl-icon-style.css';
import { vlPopoverActionFluxStyles } from './vl-popover-action.flux-css';

@customElement('vl-popover-action')
export class VlPopoverActionComponent extends BaseLitElement {
    // placeholder to store any data related to this action
    action?: unknown;
    selected = false;
    private icon = '';

    static get styles(): (CSSResult | CSSResult[])[] {
        return [resetStyle, vlIconStyles, vlPopoverActionFluxStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            icon: { type: String, reflect: true },
            action: { type: String },
            selected: { type: Boolean },
        };
    }

    updated(changedProperties: Map<string | number | symbol, unknown>) {
        if (changedProperties.has('selected')) {
            if (this.selected) {
                this.setAttribute('aria-selected', 'true');
            } else {
                this.removeAttribute('aria-selected');
            }
        }
    }

    protected render(): TemplateResult {
        return html`
            ${this.icon && this.icon !== '' ? html`<span class="vl-icon vl-icon--${this.icon}"></span>` : nothing}
            <slot></slot>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-popover-action': VlPopoverActionComponent;
    }
}
