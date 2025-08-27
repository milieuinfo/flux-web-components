import { BaseLitElement } from '@domg-wc/common';
import { vlIconStyles } from '@domg-wc/components/atom';
import { resetStyle } from '@domg/govflanders-style/common';
import { CSSResult, html, nothing, PropertyDeclarations, PropertyValues, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
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

    protected firstUpdated(changedProperties: PropertyValues) {
        super.firstUpdated(changedProperties);
        this.setAttribute('role', 'option');
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
