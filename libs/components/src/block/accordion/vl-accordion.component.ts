import { BaseLitElement, PADDINGS, registerWebComponents } from '@domg-wc/common';
import { resetStyle } from '@domg/govflanders-style/common';
import { buttonStyle, iconStyle, linkStyle, toggleStyle } from '@domg/govflanders-style/component';
import { CSSResult, html, nothing, PropertyDeclarations, PropertyValues, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { VlIconComponent } from '../../atom/icon';
import { vlLinkIconStyles } from '../../atom/link-style/vl-link-icon-style.css';
import { vlAccordionFluxStyles } from './vl-accordion.flux-css';

@customElement('vl-accordion')
export class VlAccordionComponent extends BaseLitElement {
    // Attributes
    private toggleText = '';
    private openToggleText = '';
    private closeToggleText = '';
    private contentPadding: keyof typeof PADDINGS | '' = '';
    private bold = false;
    private disabled = false;
    private icon = '';
    private defaultOpen = false;

    // State
    private isOpen = false;

    static {
        registerWebComponents([VlIconComponent]);
    }

    static get properties(): PropertyDeclarations {
        return {
            toggleText: { type: String, attribute: 'toggle-text' },
            openToggleText: { type: String, attribute: 'open-toggle-text' },
            closeToggleText: { type: String, attribute: 'close-toggle-text' },
            contentPadding: { type: String, attribute: 'content-padding' },
            bold: { type: Boolean, reflect: true },
            disabled: { type: Boolean, reflect: true },
            icon: { type: String },
            defaultOpen: { type: Boolean, attribute: 'default-open' },
            isOpen: { type: Boolean, state: true },
        };
    }

    static get styles(): (CSSResult | CSSResult[])[] {
        return [
            resetStyle,
            buttonStyle,
            iconStyle,
            linkStyle,
            toggleStyle,
            vlAccordionFluxStyles,
            vlLinkIconStyles,
        ];
    }

    connectedCallback() {
        super.connectedCallback();

        if (this.defaultOpen) {
            this.isOpen = true;
        }
    }

    updated(changedProperties: PropertyValues) {
        super.updated(changedProperties);

        if (changedProperties.has('isOpen')) {
            this.dispatchToggleEvent();
        }
    }

    private handleToggle() {
        if (this.disabled) {
            return;
        }
        this.isOpen = !this.isOpen;
    }

    private dispatchToggleEvent() {
        this.dispatchEvent(
            new CustomEvent('vl-on-toggle', {
                detail: {
                    open: this.isOpen,
                },
            })
        );
    }

    open() {
        if (!this.isOpen) {
            this.isOpen = true;
        }
    }

    close() {
        if (this.isOpen) {
            this.isOpen = false;
        }
    }

    toggle() {
        this.isOpen = !this.isOpen;
    }

    private getToggleIconRotation(): string {
        return this.isOpen ? 'rotate(-180deg)' : 'rotate(0deg)';
    }

    private getContentPadding(): string {
        if (this.contentPadding && PADDINGS[this.contentPadding]) {
            return PADDINGS[this.contentPadding];
        }
        return '';
    }

    private renderToggleIcon(): TemplateResult | typeof nothing {
        if (this.icon) {
            return html`
                <vl-icon
                    icon=${this.icon}
                    class="vl-accordion__icon vl-link__icon vl-link__icon--before vl-toggle__icon"
                    aria-hidden="true"
                ></vl-icon>
            `;
        }
        return nothing;
    }

    private renderToggleText(): TemplateResult | typeof nothing {
        if (this.toggleText) {
            return html`${this.toggleText}`;
        }
        if (this.openToggleText && this.closeToggleText) {
            const toggleTextClasses = {
                'js-vl-accordion__toggle__text': true,
            };
            return html`<span class=${classMap(toggleTextClasses)}
                >${this.isOpen ? this.closeToggleText : this.openToggleText}</span
            >`;
        }
        return nothing;
    }

    protected render(): TemplateResult {
        const accordionClasses = {
            'vl-accordion': true,
            'js-vl-accordion--open': this.isOpen,
            'vl-accordion--has-icon': !!this.icon,
        };

        const contentPadding = this.getContentPadding();
        const panelStyles = contentPadding ? `padding: ${contentPadding}` : '';

        return html`
            <div class="js">
                <div class=${classMap(accordionClasses)}>
                    <div class="vl-accordion__button-container">
                        <button
                            class="vl-toggle vl-link vl-link--bold"
                            @click=${this.handleToggle}
                            ?disabled=${this.disabled}
                            aria-expanded=${this.isOpen}
                        >
                            ${this.icon
                                ? this.renderToggleIcon()
                                : html`<vl-icon
                                      id="toggle-icon"
                                      icon="arrow-down-fat"
                                      class="vl-accordion__icon vl-link__icon vl-link__icon--before"
                                      style="transform: ${this.getToggleIconRotation()}"
                                  ></vl-icon>`}
                            <slot name="title" class="vl-accordion__title">${this.renderToggleText()}</slot>
                        </button>
                        <div class="vl-accordion__menu">
                            <slot name="menu"></slot>
                        </div>
                    </div>
                    <div class="vl-accordion__subtitle">
                        <slot name="subtitle"></slot>
                    </div>
                    <div class="vl-accordion__content js-vl-accordion__content" aria-hidden=${!this.isOpen}>
                        <div class="vl-accordion__panel" style=${panelStyles}>
                            <slot id="accordion-slot"></slot>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-accordion': VlAccordionComponent;
    }
}
