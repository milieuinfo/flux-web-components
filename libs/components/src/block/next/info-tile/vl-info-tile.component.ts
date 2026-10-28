import { BaseLitElement, findNodesForSlot, registerWebComponents, webComponent } from '@domg-wc/common';
import { VlIconComponent } from '@domg-wc/components/atom';
import { vlResetStyles } from '@domg-wc/styles';
import { CSSResult, html, nothing, PropertyValues, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { INFO_TILE_SIZE, INFO_TILE_TYPE } from '../../info-tile/vl-info-tile.model';
import { AccordionController } from '../accordion/vl-accordion.controller';
import { SlotPresenceController } from './slot-presence.controller';
import { vlInfoTileFluxStyles } from './vl-info-tile.flux-css';
import { infoTileDefaults } from './vl-info-tile.defaults';

const HEADING_LEVELS = ['1', '2', '3', '4', '5', '6'];

const SIZE_CLASSES: Record<string, string> = {
    [INFO_TILE_SIZE.MEDIUM]: 'info-tile--m',
    [INFO_TILE_SIZE.LARGE]: 'info-tile--l',
};

const TYPE_CLASSES: Record<string, string> = {
    [INFO_TILE_TYPE.ERROR]: 'info-tile--error',
    [INFO_TILE_TYPE.WARNING]: 'info-tile--warning',
    [INFO_TILE_TYPE.SUCCESS]: 'info-tile--success',
    [INFO_TILE_TYPE.ALT]: 'info-tile--alt',
};

const HEADER_SLOTS = ['badge', 'trigger', 'subtitle', 'title-label', 'actions'];

/**
 * Info tile voor informatieve en interactieve dashboards.
 * @property {boolean} open - Of een `toggleable` info tile open is. Zet de begintoestand en volgt de huidige toestand.
 * @property {boolean} toggleable - Maakt de inhoud open- en dichtklapbaar.
 * @property {boolean} clickable - Maakt de hele info tile aanklikbaar.
 * @property {string} clickableLabel - Toegankelijke naam van de aanklikbare info tile.
 * @property {boolean} center - Centreert de inhoud.
 * @property {boolean} fullHeight - Geeft de info tile een hoogte van 100%.
 * @property {string} size - Grootte van de padding: small, medium of large.
 * @property {string} icon - Icoon naast de titel.
 * @property {boolean} iconAsBadge - Toont het icoon in een badge.
 * @property {string} type - Type: alt, error, success of warning.
 * @property {string} headingLevel - Niveau van de heading van de titel, 1 tot 6. Standaard 3.
 * @property {boolean} highlight - Accentlijn bovenaan.
 * @property {boolean} highlightLeft - Accentlijn links.
 * @fires vl-click-info-tile - Bij een klik op een `clickable` info tile.
 * @fires vl-toggle - Bij elke wijziging van de open-toestand. Detail: `{ expanded: boolean }`.
 * @fires vl-open - Wanneer de info tile opent.
 * @fires vl-close - Wanneer de info tile sluit.
 */
@webComponent('vl-info-tile-next')
export class VlInfoTileComponent extends BaseLitElement {
    @property({ type: Boolean, reflect: true })
    open = infoTileDefaults.open;

    @property({ type: Boolean, reflect: true })
    toggleable = infoTileDefaults.toggleable;

    @property({ type: Boolean, reflect: true })
    clickable = infoTileDefaults.clickable;

    @property({ type: String, reflect: true, attribute: 'clickable-label' })
    clickableLabel = infoTileDefaults.clickableLabel;

    @property({ type: Boolean, reflect: true })
    center = infoTileDefaults.center;

    @property({ type: Boolean, reflect: true, attribute: 'full-height' })
    fullHeight = infoTileDefaults.fullHeight;

    @property({ type: String, reflect: true })
    size = infoTileDefaults.size;

    @property({ type: String, reflect: true })
    icon = infoTileDefaults.icon;

    @property({ type: Boolean, reflect: true, attribute: 'icon-as-badge' })
    iconAsBadge = infoTileDefaults.iconAsBadge;

    @property({ type: String, reflect: true })
    type = infoTileDefaults.type;

    @property({ type: String, reflect: true, attribute: 'heading-level' })
    headingLevel = infoTileDefaults.headingLevel;

    @property({ type: Boolean, reflect: true })
    highlight = infoTileDefaults.highlight;

    @property({ type: Boolean, reflect: true, attribute: 'highlight-left' })
    highlightLeft = infoTileDefaults.highlightLeft;

    private accordion = new AccordionController(this, { isToggleable: () => this.toggleable });

    private slots = new SlotPresenceController(this);

    static {
        registerWebComponents([VlIconComponent]);
    }

    static get styles(): CSSResult[] {
        return [vlResetStyles, vlInfoTileFluxStyles];
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

        if (changedProperties.has('headingLevel') && this.headingLevel && !this.isValidHeadingLevel()) {
            console.warn(
                `De waarde "${this.headingLevel}" van het attribuut "heading-level" is ongeldig. Gebruik een waarde tussen 1 en 6.`,
            );
        }

        if ((changedProperties.has('clickable') || changedProperties.has('clickableLabel')) && this.clickable) {
            if (!this.clickableLabel) {
                console.warn('vl-info-tile-next: clickable-label is vereist.');
            }
        }
    }

    protected firstUpdated(changedProperties: PropertyValues): void {
        super.firstUpdated(changedProperties);

        if (this.toggleable && !this.hasSlot('trigger')) {
            console.warn(
                'vl-info-tile-next: een toggleable info tile zonder trigger slot krijgt geen toggle-knop. Geef de titel mee via de trigger slot.',
            );
        }
    }

    protected render(): TemplateResult {
        const expanded = this.accordion.isExpanded;
        const classes = {
            'info-tile': true,
            [SIZE_CLASSES[this.size] ?? '']: !!SIZE_CLASSES[this.size],
            [TYPE_CLASSES[this.type] ?? '']: !!TYPE_CLASSES[this.type],
            'info-tile--center': this.center,
            'info-tile--full-height': this.fullHeight,
            'info-tile--toggleable': this.toggleable,
            'info-tile--open': this.toggleable && expanded,
        };

        return html`
            <div part=${this.toggleable && expanded ? 'base expanded' : 'base'} class=${classMap(classes)}>
                ${this.clickable
                    ? html`<button
                          class="info-tile__clickable"
                          aria-label=${ifDefined(this.clickableLabel || undefined)}
                          @click=${this.handleClick}
                      ></button>`
                    : nothing}
                ${this.renderHeader(expanded)}
                <div
                    id="content"
                    part="content"
                    class="info-tile__content"
                    hidden=${ifDefined(this.accordion.contentHidden)}
                    @beforematch=${this.accordion.handleBeforeMatch}
                >
                    <slot name="content"></slot>
                </div>
                ${this.hasSlot('footer')
                    ? html`<div part="footer" class="info-tile__footer">
                          <slot name="footer"></slot>
                      </div>`
                    : nothing}
            </div>
        `;
    }

    private handleClick(): void {
        this.dispatchEvent(new CustomEvent('vl-click-info-tile', { bubbles: true, composed: true }));
    }

    private renderHeader(expanded: boolean): TemplateResult | typeof nothing {
        if (!this.icon && !HEADER_SLOTS.some((slot) => this.hasSlot(slot))) {
            return nothing;
        }

        return html`
            <div part="header" class="info-tile__header">
                <div class="info-tile__badge" ?hidden=${!this.icon && !this.hasSlot('badge')}>
                    <slot name="badge"></slot>
                    ${this.renderIcon()}
                </div>
                <div class="info-tile__header-wrapper">
                    <div class="info-tile__title-wrapper">
                        ${this.renderTitle(expanded)}
                        ${this.hasSlot('subtitle')
                            ? html`<p part="subtitle" class="info-tile__subtitle">
                                  <slot name="subtitle"></slot>
                              </p>`
                            : nothing}
                    </div>
                    <div part="actions" class="info-tile__actions">
                        <slot name="actions"></slot>
                    </div>
                </div>
            </div>
        `;
    }

    private renderIcon(): TemplateResult | typeof nothing {
        if (!this.icon) {
            return nothing;
        }

        return html`
            <div part="icon" class=${classMap({ 'info-tile__icon': true, 'info-tile__icon--badge': this.iconAsBadge })}>
                <vl-icon icon=${this.icon} aria-hidden="true"></vl-icon>
            </div>
        `;
    }

    private renderTrigger(expanded: boolean): TemplateResult {
        return html`
            <button
                id="trigger"
                part="trigger"
                class="info-tile__trigger"
                aria-expanded=${String(expanded)}
                aria-controls="content"
                @click=${() => this.toggle()}
            >
                <vl-icon class="info-tile__toggle-icon" icon="arrow-right-fat" aria-hidden="true"></vl-icon>
                <slot name="trigger"></slot>
            </button>
        `;
    }

    private renderTitle(expanded: boolean): TemplateResult | typeof nothing {
        if (!this.hasSlot('trigger')) {
            return nothing;
        }

        const content = html`${this.toggleable
            ? this.renderTrigger(expanded)
            : html`<slot name="trigger"></slot>`}${this.hasSlot('title-label')
            ? html`<slot name="title-label"></slot>`
            : nothing}`;

        switch (this.isValidHeadingLevel() ? this.headingLevel : '3') {
            case '1':
                return html`<h1 class="info-tile__title">${content}</h1>`;
            case '2':
                return html`<h2 class="info-tile__title">${content}</h2>`;
            case '4':
                return html`<h4 class="info-tile__title">${content}</h4>`;
            case '5':
                return html`<h5 class="info-tile__title">${content}</h5>`;
            case '6':
                return html`<h6 class="info-tile__title">${content}</h6>`;
            default:
                return html`<h3 class="info-tile__title">${content}</h3>`;
        }
    }

    private hasSlot(name: string): boolean {
        return findNodesForSlot(this, name).length > 0;
    }

    private isValidHeadingLevel(): boolean {
        return HEADING_LEVELS.includes(this.headingLevel);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-info-tile-next': VlInfoTileComponent;
    }
}
