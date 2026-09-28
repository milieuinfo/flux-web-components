import { BaseLitElement, PADDINGS, registerWebComponents, webComponent } from '@domg-wc/common';
import { resetStyle } from '@domg/govflanders-style/common';
import { accordionStyle, buttonStyle, iconStyle, linkStyle, toggleStyle } from '@domg/govflanders-style/component';
import { CSSResult, html, nothing, PropertyDeclarations, PropertyValues, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { VlIconComponent } from '../../atom/icon';
import { vlLinkIconStyles } from '../../atom/link-style/vl-link-icon-style.css';
import { AccordionController } from './vl-accordion.controller';
import { vlAccordionFluxStyles } from './vl-accordion.flux-css';

const HEADING_LEVELS = ['1', '2', '3', '4', '5', '6'];

@webComponent('vl-accordion')
export class VlAccordionComponent extends BaseLitElement {
    toggleText: string | null = null;
    openToggleText: string | null = null;
    closeToggleText: string | null = null;
    contentPadding: keyof typeof PADDINGS | null = null;
    headingLevel: string | null = null;
    icon: string | null = null;
    defaultOpen = false;
    altBackground = false;
    bold = false;
    disabled = false;
    spacerNone = false;

    private accordion = new AccordionController(this, {
        isDisabled: () => this.disabled,
        onToggle: (open) => this.dispatchEvent(new CustomEvent('vl-on-toggle', { detail: { open } })),
    });

    static {
        registerWebComponents([VlIconComponent]);
    }

    static get styles(): CSSResult[] {
        return [
            resetStyle,
            buttonStyle,
            iconStyle,
            linkStyle,
            toggleStyle,
            accordionStyle,
            vlAccordionFluxStyles,
            vlLinkIconStyles,
        ];
    }

    static get properties(): PropertyDeclarations {
        return {
            toggleText: { type: String, attribute: 'toggle-text' },
            openToggleText: { type: String, attribute: 'open-toggle-text' },
            closeToggleText: { type: String, attribute: 'close-toggle-text' },
            contentPadding: { type: String, attribute: 'content-padding' },
            headingLevel: { type: String, attribute: 'heading-level' },
            icon: { type: String },
            defaultOpen: { type: Boolean, attribute: 'default-open' },
            altBackground: { type: Boolean, attribute: 'alt-background' },
            bold: { type: Boolean },
            disabled: { type: Boolean },
            spacerNone: { type: Boolean, attribute: 'spacer-none' },
        };
    }

    get _isOpen(): boolean {
        return this.accordion.isOpen;
    }

    open() {
        this.accordion.open();
    }

    close() {
        this.accordion.close();
    }

    toggle() {
        this.accordion.toggle();
    }

    connectedCallback(): void {
        super.connectedCallback();

        if (!this.hasUpdated && this.defaultOpen) {
            this.accordion.setOpen(true, false);
        }
    }

    protected willUpdate(changedProperties: PropertyValues): void {
        super.willUpdate(changedProperties);

        if (changedProperties.has('headingLevel') && this.headingLevel && !this.isValidHeadingLevel()) {
            console.warn(
                `De waarde "${this.headingLevel}" van het attribuut "heading-level" is ongeldig. Gebruik een waarde tussen 1 en 6.`,
            );
        }

        this.classList.toggle('vl-accordion--alt-background', this.altBackground);
        this.classList.toggle('vl-accordion--bold', this.bold);
        this.classList.toggle('vl-accordion--disabled', this.disabled);
    }

    protected render(): TemplateResult {
        const isOpen = this.accordion.isOpen;
        const padding = this.contentPadding ? PADDINGS[this.contentPadding] : undefined;

        return html`
            <div class=${classMap({ js: true, 'vl-u-spacer--none': this.spacerNone })}>
                <div
                    class=${classMap({
                        'vl-accordion': true,
                        'js-vl-accordion--open': isOpen,
                        'vl-accordion--has-icon': !!this.icon,
                    })}
                    data-accordion
                >
                    <div class="vl-accordion__button-container">
                        ${this.renderHeading(this.renderButton(isOpen))}
                        <div class="vl-accordion__menu">
                            <slot name="menu"></slot>
                        </div>
                    </div>
                    <div class="vl-accordion__subtitle">
                        <slot name="subtitle"></slot>
                    </div>
                    <div class="vl-accordion__content js-vl-accordion__content" aria-hidden=${String(!isOpen)}>
                        <div class="vl-accordion__panel" style=${styleMap({ padding })}>
                            <slot id="accordion-slot"></slot>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    private renderButton(isOpen: boolean): TemplateResult {
        return html`
            <button
                class="vl-toggle vl-link vl-link--bold"
                data-accordion-toggle
                aria-expanded=${String(isOpen)}
                ?disabled=${this.disabled}
                @click=${() => this.toggle()}
            >
                ${this.icon
                    ? html`<vl-icon
                          class="vl-accordion__icon vl-link__icon vl-link__icon--before vl-toggle__icon"
                          icon=${this.icon}
                          aria-hidden="true"
                      ></vl-icon>`
                    : nothing}
                <vl-icon
                    id="toggle-icon"
                    icon="arrow-down-fat"
                    class="vl-accordion__icon vl-link__icon vl-link__icon--before"
                ></vl-icon>
                <slot name="title" class="vl-accordion__title">${this.getTitleText(isOpen)}</slot>
            </button>
        `;
    }

    private renderHeading(content: TemplateResult): TemplateResult {
        if (!this.isValidHeadingLevel()) {
            return content;
        }

        switch (this.headingLevel) {
            case '1':
                return html`<h1>${content}</h1>`;
            case '2':
                return html`<h2>${content}</h2>`;
            case '3':
                return html`<h3>${content}</h3>`;
            case '4':
                return html`<h4>${content}</h4>`;
            case '5':
                return html`<h5>${content}</h5>`;
            default:
                return html`<h6>${content}</h6>`;
        }
    }

    private isValidHeadingLevel(): boolean {
        return !!this.headingLevel && HEADING_LEVELS.includes(this.headingLevel);
    }

    private getTitleText(isOpen: boolean): string | null {
        if (this.openToggleText || this.closeToggleText) {
            return isOpen ? this.closeToggleText : this.openToggleText;
        }
        return this.toggleText;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-accordion': VlAccordionComponent;
    }
}
