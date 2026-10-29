import { BaseLitElement, findNodesForSlot, PADDINGS, registerWebComponents, webComponent } from '@domg-wc/common';
import { vlResetStyles } from '@domg-wc/styles';
import { CSSResult, html, nothing, PropertyValues, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import { VlIconComponent } from '@domg-wc/components/atom';
import { vlAccordionStyles } from './vl-accordion.css';
import { AccordionController } from './vl-accordion.controller';
import { accordionDefaults } from './vl-accordion.defaults';

const HEADING_LEVELS = ['1', '2', '3', '4', '5', '6'];

/**
 * Accordion die inhoud toont of verbergt met een toggle-knop.
 * @property {boolean} open - Of de accordion open is. Zet de begintoestand en volgt de huidige toestand.
 * @property {string} toggleText - Tekst van de toggle-knop.
 * @property {string} openToggleText - Tekst van de toggle-knop als de accordion gesloten is.
 * @property {string} closeToggleText - Tekst van de toggle-knop als de accordion open is.
 * @property {string} contentPadding - Padding van de inhoud: none, small, medium of large.
 * @property {string} headingLevel - Zet de toggle-knop in een heading van niveau 1 tot 6.
 * @property {string} icon - Icoon voor de tekst van de toggle-knop.
 * @property {boolean} altBackground - Alternatieve achtergrondkleur.
 * @property {boolean} bold - Vetgedrukte tekst in de toggle-knop.
 * @property {boolean} disabled - Schakelt de accordion uit; hij sluit en blijft gesloten.
 * @fires vl-toggle - Bij elke wijziging van de open-toestand. Detail: `{ expanded: boolean }`.
 * @fires vl-open - Wanneer de accordion opent.
 * @fires vl-close - Wanneer de accordion sluit.
 */
@webComponent('vl-accordion-next')
export class VlAccordionComponent extends BaseLitElement {
    @property({ type: Boolean, reflect: true })
    open = accordionDefaults.open;

    @property({ type: String, reflect: true, attribute: 'toggle-text' })
    toggleText = accordionDefaults.toggleText;

    @property({ type: String, reflect: true, attribute: 'open-toggle-text' })
    openToggleText = accordionDefaults.openToggleText;

    @property({ type: String, reflect: true, attribute: 'close-toggle-text' })
    closeToggleText = accordionDefaults.closeToggleText;

    @property({ type: String, reflect: true, attribute: 'content-padding' })
    contentPadding = accordionDefaults.contentPadding;

    @property({ type: String, reflect: true, attribute: 'heading-level' })
    headingLevel = accordionDefaults.headingLevel;

    @property({ type: String, reflect: true })
    icon = accordionDefaults.icon;

    @property({ type: Boolean, reflect: true, attribute: 'alt-background' })
    altBackground = accordionDefaults.altBackground;

    @property({ type: Boolean, reflect: true })
    bold = accordionDefaults.bold;

    @property({ type: Boolean, reflect: true })
    disabled = accordionDefaults.disabled;

    private accordion = new AccordionController(this, { isDisabled: () => this.disabled });

    static {
        registerWebComponents([VlIconComponent]);
    }

    static get styles(): CSSResult[] {
        return [vlResetStyles, vlAccordionStyles];
    }

    show(): void {
        this.accordion.show();
    }

    hide(): void {
        this.accordion.hide();
    }

    toggle(): void {
        this.accordion.toggle();
    }

    protected willUpdate(changedProperties: PropertyValues): void {
        super.willUpdate(changedProperties);

        if (this.disabled && this.open) {
            this.open = false;
        }

        if (changedProperties.has('headingLevel') && this.headingLevel && !this.isValidHeadingLevel()) {
            console.warn(
                `De waarde "${this.headingLevel}" van het attribuut "heading-level" is ongeldig. Gebruik een waarde tussen 1 en 6.`,
            );
        }
    }

    protected firstUpdated(changedProperties: PropertyValues): void {
        super.firstUpdated(changedProperties);

        const hasText = this.toggleText || this.openToggleText || this.closeToggleText;
        if (!hasText && findNodesForSlot(this, 'trigger').length === 0) {
            console.warn('vl-accordion-next: geef de toggle-knop een naam met toggle-text of de trigger slot.');
        }
    }

    protected render(): TemplateResult {
        const expanded = this.accordion.isExpanded;
        const padding = PADDINGS[this.contentPadding as keyof typeof PADDINGS];

        return html`
            <div
                part=${expanded ? 'base expanded' : 'base'}
                class=${classMap({
                    accordion: true,
                    'accordion--open': expanded,
                    'accordion--has-icon': !!this.icon,
                })}
            >
                <div part="header" class="accordion__header">
                    ${this.renderHeading(this.renderTrigger(expanded))}
                    <div part="actions" class="accordion__actions">
                        <slot name="actions"></slot>
                    </div>
                </div>
                <div part="subtitle" class="accordion__subtitle">
                    <slot name="subtitle"></slot>
                </div>
                <div
                    id="content"
                    part="content"
                    class="accordion__content"
                    hidden=${ifDefined(this.accordion.contentHidden)}
                    @beforematch=${this.accordion.handleBeforeMatch}
                >
                    <div class="accordion__panel" style=${styleMap({ padding })}>
                        <slot name="content"></slot>
                    </div>
                </div>
            </div>
        `;
    }

    private renderTrigger(expanded: boolean): TemplateResult {
        return html`
            <button
                id="trigger"
                part="trigger"
                class="accordion__trigger"
                aria-expanded=${String(expanded)}
                aria-controls="content"
                ?disabled=${this.disabled}
                @click=${() => this.toggle()}
            >
                ${this.icon
                    ? html`<vl-icon class="accordion__custom-icon" icon=${this.icon} aria-hidden="true"></vl-icon>`
                    : nothing}
                <vl-icon part="icon" class="accordion__icon" icon="arrow-down-fat" aria-hidden="true"></vl-icon>
                <slot name="trigger" class="accordion__title">${this.getTriggerText(expanded)}</slot>
            </button>
        `;
    }

    private renderHeading(content: TemplateResult): TemplateResult {
        if (!this.isValidHeadingLevel()) {
            return content;
        }

        switch (this.headingLevel) {
            case '1':
                return html`<h1 class="accordion__heading">${content}</h1>`;
            case '2':
                return html`<h2 class="accordion__heading">${content}</h2>`;
            case '3':
                return html`<h3 class="accordion__heading">${content}</h3>`;
            case '4':
                return html`<h4 class="accordion__heading">${content}</h4>`;
            case '5':
                return html`<h5 class="accordion__heading">${content}</h5>`;
            default:
                return html`<h6 class="accordion__heading">${content}</h6>`;
        }
    }

    private isValidHeadingLevel(): boolean {
        return HEADING_LEVELS.includes(this.headingLevel);
    }

    private getTriggerText(expanded: boolean): string {
        if (this.openToggleText || this.closeToggleText) {
            return expanded ? this.closeToggleText : this.openToggleText;
        }
        return this.toggleText;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-accordion-next': VlAccordionComponent;
    }
}
