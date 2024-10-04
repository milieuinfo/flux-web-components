import { BaseLitElement, ICON_PLACEMENT, webComponent } from '@domg-wc/common-utilities';
import { globalStylesNext, vlIconStyles } from '@domg-wc/common-utilities/css';
import { CSSResult, html, nothing, PropertyDeclarations, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { buttonStyles } from './vl-button.css';
import { linkButtonStyles } from './vl-link-button.css';
import { buttonDefaults } from './vl-button.defaults';

@globalStylesNext()
@webComponent('vl-button-next')
export class VlButtonComponent extends BaseLitElement {
    private type = buttonDefaults.type;
    private disabled = buttonDefaults.disabled;
    private error = buttonDefaults.error;
    private block = buttonDefaults.block;
    private large = buttonDefaults.large;
    private wide = buttonDefaults.wide;
    private narrow = buttonDefaults.narrow;
    private secondary = buttonDefaults.secondary;
    private tertiary = buttonDefaults.tertiary;
    private loading = buttonDefaults.loading;
    private icon = buttonDefaults.icon;
    private iconPlacement = buttonDefaults.iconPlacement;
    private iconOnly = buttonDefaults.iconOnly;
    private toggle = buttonDefaults.toggle;
    private on = buttonDefaults.on;
    private controlled = buttonDefaults.controlled;
    private ctaLink = buttonDefaults.ctaLink;
    private external = buttonDefaults.external;

    static get styles(): CSSResult[] {
        return [buttonStyles, linkButtonStyles, vlIconStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            type: { type: String },
            disabled: { type: Boolean },
            error: { type: Boolean },
            block: { type: Boolean },
            large: { type: Boolean },
            wide: { type: Boolean },
            narrow: { type: Boolean },
            secondary: { type: Boolean },
            tertiary: { type: Boolean },
            loading: { type: Boolean },
            icon: { type: String },
            iconPlacement: { type: String, attribute: 'icon-placement', reflect: true },
            iconOnly: { type: Boolean, attribute: 'icon-only' },
            toggle: { type: Boolean },
            on: {
                type: Boolean,
                reflect: true,
                hasChanged: (_value, oldValue) => {
                    if (oldValue === undefined) {
                        // Sla de eerste change over omdat anders het vl-toggle event 2x wordt getriggerd bij de eerste render.
                        return false;
                    }

                    return true;
                },
            },
            controlled: { type: Boolean },
            ctaLink: { type: String, attribute: 'cta-link' },
            external: { type: Boolean },
        };
    }

    updated(changedProperties: Map<string, unknown>) {
        super.updated(changedProperties);

        if (changedProperties.has('on') && this.toggle) {
            this.dispatchEvent(
                new CustomEvent('vl-toggle', { detail: { on: this.on }, bubbles: true, composed: true })
            );
        }

        if (changedProperties.has('iconPlacement')) {
            if (!this.iconPlacement) {
                this.iconPlacement = buttonDefaults.iconPlacement;
            }
        }
    }

    render(): TemplateResult {
        const isInMap = this.closest('vl-map') !== null;
        const displayAsTertiaryButton = this.tertiary || (this.toggle && !this.on);
        const classes = {
            disabled: this.disabled,
            error: this.error,
            block: this.block,
            large: this.large,
            wide: this.wide,
            narrow: this.narrow,
            secondary: this.secondary,
            tertiary: displayAsTertiaryButton,
            loading: this.loading,
            'icon-only': this.icon && this.iconOnly,
            'button-in-map': isInMap,
        };

        return !this.ctaLink
            ? html`<button
                  class=${classMap(classes)}
                  type=${this.type}
                  ?disabled=${this.disabled}
                  @click=${this.handleClick}
              >
                  ${this.renderIcon(ICON_PLACEMENT.BEFORE)}
                  <slot></slot>
                  ${this.renderIcon(ICON_PLACEMENT.AFTER)}
              </button>`
            : html`
                  <a
                      href=${this.disabled ? 'javascript:void(0);' : this.ctaLink}
                      tabindex=${this.disabled ? '-1' : nothing}
                      class=${classMap(classes)}
                      role="button"
                      target=${this.ctaLink && this.external ? '_blank' : nothing}
                      @click=${this.handleLinkClick}
                      ?aria-pressed=${this.on}
                      ?aria-disabled=${this.disabled}
                  >
                      ${this.renderIcon(ICON_PLACEMENT.BEFORE)}
                      <slot></slot>
                      ${this.renderIcon(ICON_PLACEMENT.AFTER)}
                  </a>
              `;
    }

    renderIcon(iconPlacement: ICON_PLACEMENT): TemplateResult | typeof nothing {
        if (!this.icon) {
            return nothing;
        }

        if (iconPlacement !== this.iconPlacement) {
            return nothing;
        }

        const classes = {
            'vl-icon': true,
            [`vl-icon--${this.icon}`]: true,
            'vl-icon--right-margin': !this.iconOnly && this.iconPlacement === 'before',
            'vl-icon--left-margin': !this.iconOnly && this.iconPlacement === 'after',
        };

        return html`<span class=${classMap(classes)}></span>`;
    }

    protected handleClick(event: Event) {
        event.preventDefault();
        event.stopPropagation();

        if (this.toggle && !this.controlled) {
            this.on = !this.on;
        }

        if (this.type === 'submit') {
            this.closest('form')?.requestSubmit();
        }

        if (this.type === 'reset') {
            this.closest('form')?.reset();
        }

        this.dispatchEvent(new CustomEvent('vl-click', { bubbles: true, composed: true }));
    }

    protected handleLinkClick(event: Event) {
        event.stopPropagation();

        if (this.toggle && !this.controlled) {
            this.on = !this.on;
        }

        this.dispatchEvent(new CustomEvent('vl-click', { bubbles: true, composed: true }));
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-button-next': VlButtonComponent;
    }
}
