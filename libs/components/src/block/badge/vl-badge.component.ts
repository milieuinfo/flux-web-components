import { BaseLitElement, webComponent } from '@domg-wc/common';
import { CSSResult, html, nothing, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { vlIconStyles } from '../../atom/icon-style/vl-icon-style.css';
import { vlBadgeStyles } from './vl-badge.css';
import { badgeDefaults } from './vl-badge.defaults';

/**
 * Ronde badge met een icoon of een afbeelding, bv. een avatar of een logo.
 * Een afbeelding heeft voorrang op een icoon.
 *
 * @csspart img - De afbeelding, als `img` gezet is.
 * @csspart icon - Het icoon, als `icon` gezet is en `img` niet.
 */
@webComponent('vl-badge')
export class VlBadgeComponent extends BaseLitElement {
    static get styles(): CSSResult[] {
        return [vlIconStyles, vlBadgeStyles];
    }

    @property({ type: String, attribute: 'icon' })
    icon = badgeDefaults.icon;

    @property({ type: String, attribute: 'img' })
    img = badgeDefaults.img;

    /**
     * Tekstalternatief. Bij `img` komt het op de afbeelding. Bij een icoon krijgt de badge `role="img"` en dit
     * `aria-label`. Zonder `alt`, of met een lege `alt`, is de badge decoratief.
     */
    @property({ type: String, attribute: 'alt' })
    alt = badgeDefaults.alt;

    @property({ type: String, attribute: 'background', reflect: true })
    background = badgeDefaults.background;

    // of role en aria-label op de host van de badge zelf komen: een role of label van de consumer blijft staan
    private hasOwnIconLabel = false;

    // een icoon met alt is informatief: de host draagt de rol en de naam, het icoon zelf blijft aria-hidden
    protected updated(): void {
        const iconLabel = !this.img && this.icon && this.alt ? this.alt : undefined;
        if (iconLabel) {
            this.setAttribute('role', 'img');
            this.setAttribute('aria-label', iconLabel);
            this.hasOwnIconLabel = true;
        } else if (this.hasOwnIconLabel) {
            this.removeAttribute('role');
            this.removeAttribute('aria-label');
            this.hasOwnIconLabel = false;
        }
    }

    protected render(): TemplateResult | typeof nothing {
        if (this.img) {
            return html`<img class="vl-badge__img" part="img" src=${this.img} alt=${this.alt ?? ''} />`;
        }
        if (this.icon) {
            const classes = { 'vl-icon': true, [`vl-icon--${this.icon}`]: true };
            return html`<span class=${classMap(classes)} part="icon" aria-hidden="true"></span>`;
        }
        return nothing;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-badge': VlBadgeComponent;
    }
}
