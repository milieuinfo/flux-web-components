import { BaseLitElement, registerWebComponents, webComponent } from '@domg-wc/common';
import { VlIconComponent } from '@domg-wc/components/atom';
import { vlLayoutStyles, vlResetStyles } from '@domg-wc/styles';
import { CSSResult, html, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';
import { VlNavLink } from './vl-nav-link.component';
import { vlNavSubStyles } from './vl-nav-sub.css';
import { navSubDefaults } from './vl-nav-sub.defaults';

registerWebComponents([VlIconComponent, VlNavLink]);

/**
 * Groepeert een set van vl-nav-link componenten onder een gedeeld label binnen de nav-main slot van vl-dashboard.
 * Met `href` is het label zelf een link naar een pagina van de groep.
 *
 * @slot - Plaats hier de vl-nav-link componenten die tot deze sub-navigatie behoren.
 */
@webComponent('vl-nav-sub')
export class VlNavSub extends BaseLitElement {
    static get styles(): (CSSResult | CSSResult[])[] {
        return [vlResetStyles, vlLayoutStyles, vlNavSubStyles];
    }

    /**
     * Het label van de sub-navigatie groep. Wordt verborgen wanneer de navigatie is ingeklapt,
     * maar blijft via aria-labelledby beschikbaar als toegankelijke naam van de geneste lijst.
     */
    @property({ type: String, attribute: 'label' })
    label = navSubDefaults.label;

    /** Het icoon dat naast het label van de sub-navigatie groep wordt getoond. */
    @property({ type: String, attribute: 'icon' })
    icon = navSubDefaults.icon;

    /** Maakt van het label een link naar een pagina van de groep, met de stijl van een vl-nav-link. */
    @property({ type: String, attribute: 'href' })
    href = navSubDefaults.href;

    /** Duidt de pagina van de groep aan als huidige pagina, enkel met `href`. */
    @property({ type: Boolean, attribute: 'active', reflect: true })
    active = navSubDefaults.active;

    /**
     * Klapt de sub-navigatie mee in met de hoofdnavigatie: het label wordt verborgen en de
     * collapsed-staat wordt doorgegeven aan de onderliggende vl-nav-link componenten.
     */
    @property({ type: Boolean, attribute: 'collapsed', reflect: true })
    collapsed = navSubDefaults.collapsed;

    protected firstUpdated(): void {
        this.setAttribute('role', 'listitem');
    }

    protected updated(): void {
        this.syncCollapsed();
    }

    private readonly onSlotChange = () => {
        this.syncCollapsed();
    };

    private syncCollapsed(): void {
        this.querySelectorAll<VlNavLink>('vl-nav-link').forEach((link) => {
            link.toggleAttribute('collapsed', this.collapsed);
        });
    }

    // Met href is het label een vl-nav-link, zodat stijl, uitlijning, active en collapsed gelijk zijn aan de andere links.
    // De link blijft de naam van de lijst.
    private renderLabel(): TemplateResult {
        if (this.href) {
            return html`
                <vl-nav-link
                    id="label"
                    role="none"
                    href=${this.href}
                    icon=${ifDefined(this.icon)}
                    ?active=${this.active}
                    ?collapsed=${this.collapsed}
                    >${this.label}</vl-nav-link
                >
            `;
        }
        return html`
            <span id="label" class="vl-nav-sub__label" aria-hidden="true">
                ${when(this.icon, () => html`<vl-icon icon=${this.icon!}></vl-icon>`)}
                <span class="vl-nav-sub__label-text">${this.label}</span>
            </span>
        `;
    }

    protected render(): TemplateResult {
        return html`
            <div class="vl-nav-sub">
                ${when(this.label, () => this.renderLabel())}
                <div
                    class="vl-nav-sub__items"
                    role="list"
                    aria-labelledby=${ifDefined(this.label ? 'label' : undefined)}
                >
                    <slot @slotchange=${this.onSlotChange}></slot>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-nav-sub': VlNavSub;
    }
}
