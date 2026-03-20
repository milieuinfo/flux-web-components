import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent } from '@domg-wc/components/atom';
import { vlLayoutStyles, vlResetStyles } from '@domg-wc/styles';
import { CSSResult, html, LitElement } from 'lit';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { customElement, property, state } from 'lit/decorators.js';
import { vlNavLinkStyles } from './vl-nav-link.css';

@customElement('vl-nav-link')
export class VlNavLinkComponent extends LitElement {
    static {
        registerWebComponents([VlButtonComponent]);
    }

    static get styles(): (CSSResult | CSSResult[])[] {
        return [vlResetStyles, vlLayoutStyles, vlNavLinkStyles];
    }

    @property({ type: String, attribute: 'icon' })
    icon: string | undefined = undefined;

    @property({ type: String, attribute: 'href' })
    href: string | undefined = undefined;

    @property({ type: Boolean, attribute: 'active' })
    active = false;

    @property({ type: Boolean, attribute: 'collapsed' })
    collapsed = false;

    @state()
    private _badgeContent = '';

    @state()
    private _linkContent = '';

    private handleBadgeSlotChange(e: Event) {
        const slot = e.target as HTMLSlotElement;
        this._badgeContent = slot
            .assignedNodes()
            .map((n) => n.textContent)
            .join(' ')
            .trim();
    }

    private handleLinkSlotChange(e: Event) {
        const slot = e.target as HTMLSlotElement;
        this._linkContent = slot
            .assignedNodes()
            .map((n) => n.textContent)
            .join(' ')
            .trim();
    }

    protected firstUpdated(): void {
        this.setAttribute('role', 'listitem');
    }

    render() {
        const combinedLabel = [this._linkContent, this._badgeContent].filter(Boolean).join(', ');

        return html`
            <div class="vl-group vl-group--align-center">
                <vl-button
                    icon="${ifDefined(this.icon)}"
                    ?tertiary=${this.active}
                    ?ghost=${!this.active}
                    aria-current="${ifDefined(this.active ? 'page' : undefined)}"
                    block
                    cta-link=${ifDefined(this.href)}
                    .label=${combinedLabel}
                >
                    <slot @slotchange=${this.handleLinkSlotChange}></slot>
                </vl-button>

                <slot name="link-action"></slot>
                <slot name="link-badge" @slotchange=${this.handleBadgeSlotChange}></slot>
            </div>
        `;
    }
}
