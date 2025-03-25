import { BaseLitElement, ICON_PLACEMENT, webComponent } from '@domg-wc/common-utilities';
import { vlIconStyles, vlLinkStyles } from '@domg-wc/common-utilities/css';
import { CSSResult, html, nothing, PropertyDeclarations, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { buttonAsLinkStyles } from './vl-button-as-link.css';
import { linkDefaults } from './vl-link.defaults';

@webComponent('vl-link-next')
export class VlLinkComponent extends BaseLitElement {
    private href = linkDefaults.href;
    private bold = linkDefaults.bold;
    private small = linkDefaults.small;
    private large = linkDefaults.large;
    private error = linkDefaults.error;
    private external = linkDefaults.external;
    private icon = linkDefaults.icon;
    private iconPlacement = linkDefaults.iconPlacement;
    private buttonAsLink = linkDefaults.buttonAsLink;

    static get styles(): CSSResult[] {
        return [vlLinkStyles(), buttonAsLinkStyles, vlIconStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            href: { type: String },
            block: { type: Boolean },
            bold: { type: Boolean },
            error: { type: Boolean },
            small: { type: Boolean },
            large: { type: Boolean },
            external: { type: Boolean },
            icon: { type: String },
            iconPlacement: { type: String, attribute: 'icon-placement' },
            buttonAsLink: { type: Boolean, attribute: 'button-as-link' },
        };
    }

    render(): TemplateResult {
        const classes = {
            bold: this.bold,
            error: this.error,
            small: this.small,
            large: this.large,
        };
        const target = this.external ? '_blank' : nothing;
        const positionIconBefore = this.iconPlacement !== ICON_PLACEMENT.AFTER;
        return !this.buttonAsLink
            ? html`
                  <a class=${classMap(classes)} href=${this.href} target=${target} part="link">
                      ${positionIconBefore ? this.renderIcon() : nothing}
                      <slot></slot>
                      ${!positionIconBefore ? this.renderIcon() : nothing}
                      ${this.external ? this.renderExternalIcon() : ''}
                  </a>
              `
            : html`
                  <button class="vl-button-as-link ${classMap(classes)}" part="button">
                      ${positionIconBefore ? this.renderIcon() : nothing}
                      <slot></slot>
                      ${!positionIconBefore ? this.renderIcon() : nothing}
                      ${this.external ? this.renderExternalIcon() : ''}
                  </button>
              `;
    }

    private renderIcon(): TemplateResult | typeof nothing {
        const classes = {
            'vl-icon': true,
            [`vl-icon--${this.icon}`]: true,
            'vl-icon--right-margin': this.iconPlacement === 'before',
            'vl-icon--left-margin': this.iconPlacement === 'after',
        };

        return this.icon ? html`<span class=${classMap(classes)} part="icon"></span>` : nothing;
    }

    private renderExternalIcon(): TemplateResult {
        return html`<span class="vl-icon vl-icon--external vl-icon--after" part="icon"></span>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-link-next': VlLinkComponent;
    }
}
