import { BaseLitElement, ICON_PLACEMENT, isSlotEmpty, webComponent } from '@domg-wc/common';
import { CSSResult, html, nothing, PropertyDeclarations, TemplateResult } from 'lit';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { vlButtonStyles } from '../button-style/vl-button-style.css';
import { vlIconStyles } from '../icon-style/vl-icon-style.css';
import { buttonDefaults } from './vl-button.defaults';

@webComponent('vl-button')
export class VlButtonComponent extends BaseLitElement {
    public disabled = buttonDefaults.disabled;
    public on = buttonDefaults.on;
    private type = buttonDefaults.type;
    private error = buttonDefaults.error;
    private block = buttonDefaults.block;
    private large = buttonDefaults.large;
    private wide = buttonDefaults.wide;
    private narrow = buttonDefaults.narrow;
    private secondary = buttonDefaults.secondary;
    private tertiary = buttonDefaults.tertiary;
    private ghost = buttonDefaults.ghost;
    private loading = buttonDefaults.loading;
    private icon = buttonDefaults.icon;
    private iconPlacement = buttonDefaults.iconPlacement;
    private toggle = buttonDefaults.toggle;
    private controlled = buttonDefaults.controlled;
    private ctaLink = buttonDefaults.ctaLink;
    private external = buttonDefaults.external;
    private inputGroup = buttonDefaults.inputGroup;
    private label = buttonDefaults.label;
    private slotIsEmpty = true;

    static get styles(): CSSResult[] {
        return [vlButtonStyles(), vlButtonStyles('a'), vlIconStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            type: { type: String },
            error: { type: Boolean },
            block: { type: Boolean },
            large: { type: Boolean },
            wide: { type: Boolean },
            narrow: { type: Boolean },
            secondary: { type: Boolean },
            tertiary: { type: Boolean },
            ghost: { type: Boolean },
            loading: { type: Boolean },
            icon: { type: String },
            iconPlacement: { type: String, attribute: 'icon-placement', reflect: true },
            toggle: { type: Boolean },
            controlled: { type: Boolean },
            ctaLink: { type: String, attribute: 'cta-link' },
            external: { type: Boolean },
            inputGroup: { type: Boolean, attribute: 'input-group' },
            label: { type: String },
            disabled: { type: Boolean, reflect: true },
            slotIsEmpty: { type: Boolean, state: true },
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
        };
    }

    updated(changedProperties: Map<string, unknown>) {
        super.updated(changedProperties);

        if (changedProperties.has('on') && this.toggle) {
            this.dispatchEvent(
                new CustomEvent('vl-toggle', { detail: { on: this.on }, bubbles: true, composed: true })
            );
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
            ghost: this.ghost,
            loading: this.loading,
            'input-group-left': this.inputGroup && this.isInputGroupPosition('first'),
            'input-group-right': this.inputGroup && this.isInputGroupPosition('last'),
            'button-in-map': isInMap,
            'empty-slot': this.slotIsEmpty,
        };

        return !this.ctaLink ? this.renderButton(classes) : this.renderCtaLink(classes);
    }

    handleSlotChange() {
        const slot = this.shadowRoot?.querySelector('slot');
        this.slotIsEmpty = Boolean(slot && isSlotEmpty(slot!));
        if (this.slotIsEmpty && !this.label) {
            console.warn(
                'Wil je een `<vl-button></vl-button>` component zonder inhoud renderen, bv. een icon-only knop, dan is het invullen van het `label` attribuut verplicht (https://www.w3.org/TR/WCAG22/#name-role-value).'
            );
        }
    }

    protected handleClick(e: MouseEvent) {
        if (this.disabled || this.loading) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return;
        }

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

    protected handleLinkClick(e: MouseEvent) {
        if (this.disabled || this.loading) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return;
        }

        if (this.toggle && !this.controlled) {
            this.on = !this.on;
        }

        this.dispatchEvent(new CustomEvent('vl-click', { bubbles: true, composed: true }));
    }

    private isInputGroupPosition = (position: 'first' | 'last') => {
        switch (position) {
            case 'first':
                return this.parentElement?.firstElementChild === this;
            case 'last':
                return this.parentElement?.lastElementChild === this;
            default:
                return false;
        }
    };

    get ariaLabel(): string {
        const labelText = this.label || '';
        const loadingText = this.loading ? ' (Wordt geladen...)' : '';
        return labelText + loadingText;
    }

    private renderButton(classes: ClassInfo): TemplateResult {
        const positionIconBefore = this.iconPlacement !== ICON_PLACEMENT.AFTER;

        return html`
            <button
                part="button"
                class=${classMap(classes)}
                type=${this.type}
                ?disabled=${this.disabled}
                @click=${this.handleClick}
                aria-label=${ifDefined(this.ariaLabel || undefined)}
                aria-pressed=${ifDefined(this.toggle ? (this.on ? 'true' : 'false') : undefined)}
                aria-disabled=${this.disabled || this.loading ? 'true' : 'false'}
                aria-busy=${this.loading ? 'true' : 'false'}
            >
                ${positionIconBefore ? this.renderIcon() : nothing}
                <slot @slotchange=${this.handleSlotChange}></slot>
                ${!positionIconBefore ? this.renderIcon() : nothing}
            </button>
        `;
    }

    private renderCtaLink(classes: ClassInfo): TemplateResult {
        const positionIconBefore = this.iconPlacement !== ICON_PLACEMENT.AFTER;

        return html`
            <a
                part="link"
                href=${this.disabled ? 'javascript:void(0);' : this.ctaLink}
                tabindex=${ifDefined(this.disabled ? '-1' : undefined)}
                class=${classMap(classes)}
                role="button"
                target=${this.ctaLink && this.external ? '_blank' : nothing}
                @click=${this.handleLinkClick}
                aria-label=${ifDefined(this.ariaLabel || undefined)}
                aria-pressed=${ifDefined(this.toggle ? (this.on ? 'true' : 'false') : undefined)}
                aria-disabled=${this.disabled || this.loading ? 'true' : 'false'}
                aria-busy=${this.loading ? 'true' : 'false'}
            >
                ${positionIconBefore ? this.renderIcon() : nothing}
                <slot @slotchange=${this.handleSlotChange}></slot>
                ${!positionIconBefore ? this.renderIcon() : nothing}
                ${this.external ? html`<span class="vl-icon vl-icon--external vl-icon--after"></span>` : nothing}
            </a>
        `;
    }

    private renderIcon(): TemplateResult | typeof nothing {
        const classes = {
            'vl-icon': true,
            [`vl-icon--${this.icon}`]: true,
        };

        return this.icon ? html`<span class=${classMap(classes)} part="icon" aria-hidden="true"></span>` : nothing;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-button': VlButtonComponent;
    }
}
