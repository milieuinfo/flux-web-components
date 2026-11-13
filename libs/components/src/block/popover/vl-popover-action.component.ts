import { BaseLitElement } from '@domg-wc/common';
import { vlIconStyles } from '@domg-wc/components/atom';
import { resetStyle } from '@domg/govflanders-style/common';
import { CSSResult, html, nothing, PropertyDeclarations, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { vlPopoverActionFluxStyles } from './vl-popover-action.flux-css';

@customElement('vl-popover-action')
export class VlPopoverActionComponent extends BaseLitElement {
    // placeholder to store any data related to this action
    action?: string;
    selected = false;
    href?: string;
    target?: string;
    rel?: string;
    private icon = '';

    static get styles(): (CSSResult | CSSResult[])[] {
        return [resetStyle, vlIconStyles, vlPopoverActionFluxStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            icon: { type: String, reflect: true },
            action: { type: String },
            selected: { type: Boolean },
            href: { type: String },
            target: { type: String },
            rel: { type: String },
        };
    }

    protected renderIcon(): TemplateResult | typeof nothing {
        return this.icon && this.icon !== '' ? html`<span class="vl-icon vl-icon--${this.icon}"></span>` : nothing;
    }

    protected render(): TemplateResult {
        return this.href
            ? html` <a
                  href="${this.href}"
                  target="${this.target || nothing}"
                  rel="${this.rel || nothing}"
                  aria-current=${this.selected ? 'true' : nothing}
              >
                  ${this.renderIcon()} <span><slot></slot></span>
              </a>`
            : html` <button type="button" aria-current=${this.selected ? 'true' : nothing}>
                  ${this.renderIcon()} <span><slot></slot></span>
              </button>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-popover-action': VlPopoverActionComponent;
    }
}
