import { BaseLitElement, findNodesForSlot, registerWebComponents, webComponent } from '@domg-wc/common';
import { vlLegacyStyles } from '@domg-wc/styles';
import { baseStyle, resetStyle } from '@domg/govflanders-style/common';
import { accordionStyle, iconStyle, infoTileStyle, linkStyle, toggleStyle } from '@domg/govflanders-style/component';
import { CSSResult, html, nothing, PropertyDeclarations, PropertyValues, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { VlAccordionComponent } from '../accordion';
import { AccordionController } from '../accordion/vl-accordion.controller';
import { vlInfoTileFluxStyles } from './vl-info-tile.flux-css';
import { INFO_TILE_SIZE, INFO_TILE_TYPE } from './vl-info-tile.model';

const HEADING_LEVELS = ['1', '2', '3', '4', '5', '6'];

const SIZE_CLASSES: Record<string, string> = {
    [INFO_TILE_SIZE.SMALL]: 'vl-info-tile--s',
    [INFO_TILE_SIZE.MEDIUM]: 'vl-info-tile--m',
    [INFO_TILE_SIZE.LARGE]: 'vl-info-tile--l',
};

const TYPE_CLASSES: Record<string, string> = {
    [INFO_TILE_TYPE.ERROR]: 'vl-info-tile--error',
    [INFO_TILE_TYPE.WARNING]: 'vl-info-tile--warning',
    [INFO_TILE_TYPE.SUCCESS]: 'vl-info-tile--success',
    [INFO_TILE_TYPE.ALT]: 'vl-info-tile--alt',
};

const stopPropagation = (event: Event) => event.stopPropagation();

@webComponent('vl-info-tile')
export class VlInfoTile extends BaseLitElement {
    autoOpen = false;
    toggleable = false;
    clickable = false;
    clickableLabel: string | null = null;
    center = false;
    fullHeight = false;
    size: string | null = null;
    icon: string | null = null;
    iconAsBadge = false;
    type: string | null = null;
    headingLevel: string | null = null;
    spacerNone = false;

    private accordion = new AccordionController(this);

    static {
        registerWebComponents([VlAccordionComponent]);
    }

    static get styles(): (CSSResult | CSSResult[])[] {
        return [
            resetStyle,
            baseStyle,
            vlLegacyStyles,
            infoTileStyle,
            vlInfoTileFluxStyles,
            linkStyle,
            toggleStyle,
            accordionStyle,
            iconStyle,
        ];
    }

    static get properties(): PropertyDeclarations {
        return {
            autoOpen: { type: Boolean, attribute: 'auto-open' },
            toggleable: { type: Boolean },
            clickable: { type: Boolean },
            clickableLabel: { type: String, attribute: 'clickable-label' },
            center: { type: Boolean },
            fullHeight: { type: Boolean, attribute: 'full-height' },
            size: { type: String },
            icon: { type: String },
            iconAsBadge: { type: Boolean, attribute: 'icon-as-badge' },
            type: { type: String },
            headingLevel: { type: String, attribute: 'heading-level' },
            spacerNone: { type: Boolean, attribute: 'spacer-none' },
        };
    }

    get isOpen(): boolean {
        return this.toggleable ? this.accordion.isOpen : true;
    }

    toggle() {
        if (this.toggleable) {
            this.accordion.toggle();
        }
    }

    open() {
        if (this.toggleable) {
            this.accordion.open();
        }
    }

    close() {
        if (this.toggleable) {
            this.accordion.close();
        }
    }

    handleInfoTileClicked(): void {
        this.dispatchEvent(new CustomEvent('vl-click-info-tile', { bubbles: true, composed: true }));
    }

    connectedCallback(): void {
        super.connectedCallback();

        if (!this.hasUpdated && this.toggleable) {
            this.accordion.setOpen(this.autoOpen, false);
        }
    }

    protected willUpdate(changedProperties: PropertyValues): void {
        super.willUpdate(changedProperties);

        if (this.hasUpdated && (changedProperties.has('toggleable') || changedProperties.has('autoOpen'))) {
            this.accordion.setOpen(this.toggleable && this.autoOpen, false);
        }

        if (changedProperties.has('headingLevel') && this.headingLevel && !this.isValidHeadingLevel()) {
            console.warn(
                `De waarde "${this.headingLevel}" van het attribuut "heading-level" is ongeldig. Gebruik een waarde tussen 1 en 6.`,
            );
        }

        if ((changedProperties.has('clickable') || changedProperties.has('clickableLabel')) && this.clickable) {
            if (!this.clickableLabel) {
                console.warn('VlInfoTile - clickable-label is vereist.');
            }
        }
    }

    protected render(): TemplateResult {
        const classes = {
            'vl-info-tile': true,
            [SIZE_CLASSES[this.size ?? '']]: !!SIZE_CLASSES[this.size ?? ''],
            [TYPE_CLASSES[this.type ?? '']]: !!TYPE_CLASSES[this.type ?? ''],
            'vl-info-tile--center': this.center,
            'vl-info-tile--full-height': this.fullHeight,
            'js-vl-accordion': this.toggleable,
            'js-vl-accordion--open': this.toggleable && this.accordion.isOpen,
            'vl-u-spacer--none': this.spacerNone,
        };

        return html`
            <div class=${classMap(classes)}>
                ${this.clickable
                    ? html`<button
                          class="info-tile-clickable"
                          aria-label=${ifDefined(this.clickableLabel || undefined)}
                          @click=${this.handleInfoTileClicked}
                      ></button>`
                    : nothing}
                ${this.renderHeader()}
                <div class="vl-info-tile__content">
                    <slot name="content" @click=${this.toggleable ? stopPropagation : nothing}></slot>
                </div>
                ${this.hasSlot('footer')
                    ? html`<footer class="vl-info-tile__footer">
                          <slot name="footer"></slot>
                      </footer>`
                    : nothing}
            </div>
        `;
    }

    private renderHeader(): TemplateResult | typeof nothing {
        const hasHeader = ['badge', 'title', 'subtitle', 'title-label', 'menu'].some((slot) => this.hasSlot(slot));
        if (!hasHeader) {
            return nothing;
        }

        return html`
            <div class="vl-info-tile__header">
                <div class="vl-info-tile__badge__wrapper" ?hidden=${!this.icon && !this.hasSlot('badge')}>
                    <slot name="badge"></slot>
                    ${this.renderIcon()}
                </div>
                <div id="wrapper" class="vl-info-tile__header__wrapper">
                    <div class="vl-info-tile__title-wrapper">
                        ${this.toggleable ? this.renderToggle() : this.renderTitle()}
                        ${this.hasSlot('subtitle')
                            ? html`<p
                                  id="subtitle"
                                  class="vl-info-tile__header__subtitle"
                                  @click=${this.toggleable ? stopPropagation : nothing}
                              >
                                  <slot name="subtitle"></slot>
                              </p>`
                            : nothing}
                    </div>
                    <div class="vl-info-tile__menu">
                        <slot name="menu"></slot>
                    </div>
                </div>
            </div>
        `;
    }

    private renderIcon(): TemplateResult {
        const iconClass = this.icon ? `vl-vi-${this.icon.replace(/[^a-z0-9_-]/gi, '')}` : '';
        const classes = {
            'vl-info-tile__icon': !!this.icon,
            'vl-info-tile__icon--badge': !!this.icon && this.iconAsBadge,
        };

        return html`
            <div id="icon" class=${classMap(classes)}>
                <i class="vl-vi vl-vi-u-l ${iconClass}" aria-hidden="true"></i>
            </div>
        `;
    }

    private renderToggle(): TemplateResult {
        return html`
            <button
                class="vl-toggle vl-link vl-link--bold js-vl-accordion__toggle"
                aria-expanded=${String(this.accordion.isOpen)}
                @click=${() => this.toggle()}
            >
                <i
                    class="vl-link__icon vl-link__icon--before vl-toggle__icon vl-vi vl-vi-arrow-right-fat"
                    aria-hidden="true"
                ></i>
                ${this.renderTitle()}
            </button>
        `;
    }

    private renderTitle(): TemplateResult | typeof nothing {
        if (!this.hasSlot('title')) {
            return nothing;
        }

        const content = html`<slot name="title"></slot>${this.hasSlot('title-label')
                ? html`<slot name="title-label"></slot>`
                : nothing}`;

        switch (this.isValidHeadingLevel() ? this.headingLevel : '3') {
            case '1':
                return html`<h1 id="title" class="vl-info-tile__header__title">${content}</h1>`;
            case '2':
                return html`<h2 id="title" class="vl-info-tile__header__title">${content}</h2>`;
            case '4':
                return html`<h4 id="title" class="vl-info-tile__header__title">${content}</h4>`;
            case '5':
                return html`<h5 id="title" class="vl-info-tile__header__title">${content}</h5>`;
            case '6':
                return html`<h6 id="title" class="vl-info-tile__header__title">${content}</h6>`;
            default:
                return html`<h3 id="title" class="vl-info-tile__header__title">${content}</h3>`;
        }
    }

    private hasSlot(name: string): boolean {
        return findNodesForSlot(this, name).length > 0;
    }

    private isValidHeadingLevel(): boolean {
        return !!this.headingLevel && HEADING_LEVELS.includes(this.headingLevel);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-info-tile': VlInfoTile;
    }
}
