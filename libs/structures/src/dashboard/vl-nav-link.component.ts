import { BaseLitElement, registerWebComponents, webComponent } from '@domg-wc/common';
import { VlButtonComponent } from '@domg-wc/components/atom';
import { vlLayoutStyles, vlResetStyles } from '@domg-wc/styles';
import { CSSResult, html, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { vlNavLinkStyles } from './vl-nav-link.css';
import { navLinkDefaults } from './vl-nav-link.defaults';

registerWebComponents([VlButtonComponent]);

/**
 * Navigatie-item in de slots nav-main en nav-utils van vl-dashboard, of in een vl-nav-sub.
 *
 * @slot - De tekst van de link.
 * @slot link-action - Een icon-only actieknop naast de link, bv. een ghost vl-button met een label.
 * @slot link-badge - Een badge bij de link, als `<span>`. De tekst wordt toegevoegd aan de toegankelijke naam van de link.
 */
@webComponent('vl-nav-link')
export class VlNavLink extends BaseLitElement {
    static get styles(): (CSSResult | CSSResult[])[] {
        return [vlResetStyles, vlLayoutStyles, vlNavLinkStyles];
    }

    @property({ type: String, attribute: 'icon' })
    icon = navLinkDefaults.icon;

    @property({ type: String, attribute: 'href' })
    href = navLinkDefaults.href;

    @property({ type: Boolean, attribute: 'active', reflect: true })
    active = navLinkDefaults.active;

    @property({ type: Boolean, attribute: 'collapsed', reflect: true })
    collapsed = navLinkDefaults.collapsed;

    @property({ type: Boolean, attribute: 'external' })
    external = navLinkDefaults.external;

    @property({ type: Boolean, attribute: 'disabled', reflect: true })
    disabled = navLinkDefaults.disabled;

    @state()
    private badgeContent = '';

    @state()
    private linkContent = '';

    // ook een gewijzigde text node (bv. een binding in een framework) vuurt geen slotchange: volg daarom de light DOM
    private readonly contentObserver = new MutationObserver(() => this.updateContent());

    private updateContent(): void {
        const textOf = (nodes: Node[]) =>
            nodes
                .map((node) => node.textContent)
                .join(' ')
                .trim();
        // enkel wat in een slot kan komen: geen comments, zoals de markers van Lit
        const nodes = [...this.childNodes].filter(
            (node) => node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE,
        );
        this.linkContent = textOf(nodes.filter((node) => !(node instanceof Element && node.slot)));
        this.badgeContent = textOf(nodes.filter((node) => node instanceof Element && node.slot === 'link-badge'));
    }

    // Een klik naast de interne link (in de padding) gaat naar die link, zodat de router van een SPA hem opvangt.
    // De doorgestuurde klik bubbelt terug naar de host, maar komt dan van de button en wordt niet opnieuw doorgestuurd.
    private readonly onClick = (e: MouseEvent) => {
        if (this.disabled) return;
        // Een klik op slotted inhoud, zoals de link-action, heeft een eigen target en volgt de link niet
        if (e.target !== this) return;
        const button = this.shadowRoot?.querySelector('vl-button');
        if (!button || e.composedPath().includes(button)) return;
        button.shadowRoot?.querySelector<HTMLElement>('a, button')?.click();
    };

    connectedCallback(): void {
        super.connectedCallback();
        this.updateContent();
        // ook een kind dat van slot wisselt, verandert de naam
        this.contentObserver.observe(this, {
            childList: true,
            characterData: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['slot'],
        });
        this.addEventListener('click', this.onClick);
    }

    protected firstUpdated(): void {
        // in een lijst is de link een listitem; vl-nav-sub gebruikt hem als label buiten een lijst, met een eigen rol
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'listitem');
        }
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.contentObserver.disconnect();
        this.removeEventListener('click', this.onClick);
    }

    protected render(): TemplateResult {
        const combinedLabel = [this.linkContent, this.badgeContent].filter(Boolean).join(', ');

        return html`
            <div class="vl-group vl-group--align-center">
                <vl-button
                    icon=${ifDefined(this.icon)}
                    ghost
                    aria-current=${ifDefined(this.active ? 'page' : undefined)}
                    block
                    cta-link=${ifDefined(this.href)}
                    .label=${combinedLabel}
                    narrow
                    ?external=${this.external}
                    ?disabled=${this.disabled}
                >
                    <slot></slot>
                </vl-button>

                <slot name="link-action"></slot>
                <!-- de tekst van de badge zit al in de naam van de link -->
                <span class="vl-nav-link__badge" aria-hidden="true"><slot name="link-badge"></slot></span>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-nav-link': VlNavLink;
    }
}
