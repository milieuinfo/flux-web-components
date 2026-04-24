import { BaseLitElement, ICON_PLACEMENT, webComponent } from '@domg-wc/common';
import { CSSResult, html, nothing, PropertyDeclarations, TemplateResult } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import { vlIconStyles } from '../icon-style/vl-icon-style.css';
import { vlLinkIconStyles } from '../link-style/vl-link-icon-style.css';
import { vlLinkStyles } from '../link-style/vl-link-style.css';
import { buttonAsLinkStyles } from './vl-button-as-link.css';
import { linkDefaults } from './vl-link.defaults';
import { vlLinkFluxStyles } from './vl-link.flux-css';

@webComponent('vl-link')
export class VlLinkComponent extends BaseLitElement {
    private href = linkDefaults.href;
    private label = linkDefaults.label;
    private bold = linkDefaults.bold;
    private small = linkDefaults.small;
    private large = linkDefaults.large;
    private error = linkDefaults.error;
    private external = linkDefaults.external;
    private icon = linkDefaults.icon;
    private iconPlacement = linkDefaults.iconPlacement;
    private buttonAsLink = linkDefaults.buttonAsLink;
    private type = linkDefaults.type;

    static get styles(): CSSResult[] {
        return [vlLinkFluxStyles, vlLinkStyles(), vlLinkIconStyles, buttonAsLinkStyles, vlIconStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            href: { type: String },
            label: { type: String },
            block: { type: Boolean },
            bold: { type: Boolean },
            error: { type: Boolean },
            small: { type: Boolean },
            large: { type: Boolean },
            external: { type: Boolean },
            icon: { type: String },
            iconPlacement: { type: String, attribute: 'icon-placement' },
            buttonAsLink: { type: Boolean, attribute: 'button-as-link' },
            type: { type: String },
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
        const rel = this.external ? 'noopener noreferrer nofollow' : nothing;
        const positionIconBefore = this.iconPlacement !== ICON_PLACEMENT.AFTER;
        return !this.buttonAsLink
            ? html`
                  <a
                      class=${classMap(classes)}
                      href=${this.href}
                      target=${target}
                      rel=${rel}
                      part="link"
                      aria-label=${this.label || nothing}
                      aria-haspopup=${ifDefined(
                          this.hasAttribute('aria-haspopup')
                              ? (this.getAttribute('aria-haspopup') as
                                    | 'false'
                                    | 'true'
                                    | 'menu'
                                    | 'listbox'
                                    | 'tree'
                                    | 'grid'
                                    | 'dialog')
                              : undefined
                      )}
                      @click=${this.handleClick}
                  >
                      ${positionIconBefore ? this.renderIcon() : nothing}
                      <slot></slot>
                      ${!positionIconBefore ? this.renderIcon() : nothing}
                      ${this.external ? this.renderExternalIcon() : ''}
                  </a>
              `
            : html`
                  <button
                      class="vl-button-as-link ${classMap(classes)}"
                      type=${this.type}
                      part="button"
                      aria-label=${this.label || nothing}
                      aria-haspopup=${ifDefined(
                          this.hasAttribute('aria-haspopup')
                              ? (this.getAttribute('aria-haspopup') as
                                    | 'false'
                                    | 'true'
                                    | 'menu'
                                    | 'listbox'
                                    | 'tree'
                                    | 'grid'
                                    | 'dialog')
                              : undefined
                      )}
                      @click=${this.handleClick}
                  >
                      ${positionIconBefore ? this.renderIcon() : nothing}
                      <slot></slot>
                      ${!positionIconBefore ? this.renderIcon() : nothing}
                      ${this.external ? this.renderExternalIcon() : ''}
                  </button>
              `;
    }

    private handleClick(): void {
        this.dispatchEvent(new CustomEvent('vl-click', { bubbles: true, composed: true }));
    }

    private renderIcon(): TemplateResult | typeof nothing {
        const beforeClass = !this.buttonAsLink ? 'vl-icon--right-margin' : 'vl-link__icon--before';
        const afterClass = !this.buttonAsLink ? 'vl-icon--left-margin' : 'vl-link__icon--after';
        const classes = {
            'vl-icon': true,
            [`vl-icon--${this.icon}`]: true,
            'vl-link__icon': this.buttonAsLink,
            [beforeClass]: this.iconPlacement === 'before',
            [afterClass]: this.iconPlacement === 'after',
        };

        return this.icon ? html`<span class=${classMap(classes)} part="icon" aria-hidden="true"></span>` : nothing;
    }

    private renderExternalIcon(): TemplateResult {
        return html`<span class="vl-icon vl-icon--external vl-icon--after" part="icon" aria-hidden="true"></span>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-link': VlLinkComponent;
    }
}
