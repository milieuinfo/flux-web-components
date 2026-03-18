import { BaseLitElement } from '@domg-wc/common';
import { vlLegacyStyles, vlResetStyles } from '@domg-wc/styles';
import { documentStyle, iconListStyle, spotlightStyle } from '@domg/govflanders-style/component';
import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { vlIconStyles } from '../../atom/icon-style/vl-icon-style.css';
import { vlSpotlightFluxStyles } from './vl-spotlight.flux-css';
import { SIZE } from './vl-spotlight.model';

@customElement('vl-spotlight')
export class VlSpotlight extends BaseLitElement {
    // Attributes
    private link = '';
    private linkLabel = '';
    private external = false;
    private alt = false;
    private noBorder = false;
    private size = '';
    private imgSrc = '';
    private imgAlt = '';

    static get styles() {
        return [
            vlResetStyles,
            ...vlLegacyStyles,
            spotlightStyle,
            documentStyle,
            iconListStyle,
            vlSpotlightFluxStyles,
            vlIconStyles,
        ];
    }

    static get properties() {
        return {
            link: {
                type: String,
                attribute: 'link',
            },
            linkLabel: {
                type: String,
                attribute: 'link-label',
            },
            external: {
                type: Boolean,
                attribute: 'external',
            },
            alt: {
                type: Boolean,
                attribute: 'alt',
                reflect: true,
            },
            noBorder: {
                type: Boolean,
                attribute: 'no-border',
                reflect: true,
            },
            size: {
                type: String,
                attribute: 'size',
                reflect: true,
            },
            imgSrc: {
                type: String,
                attribute: 'img-src',
            },
            imgAlt: {
                type: String,
                attribute: 'img-alt',
            },
        };
    }

    __getSlot(slotName: string) {
        return html` <slot name="${slotName}"></slot>`;
    }

    __hasSlotContent(slotName: string): boolean {
        const slotElement = this.querySelector(`[slot="${slotName}"]`);
        if (!slotElement) {
            return false;
        }
        return slotElement.childElementCount > 0 || (slotElement.textContent || '').trim().length > 0;
    }

    __processSlotTitle() {
        if (!this.__hasSlotContent('title')) {
            return nothing;
        }
        return this._getTitleTemplateWithValue(this.__getSlot('title'));
    }

    __processSlotSubTitle() {
        return this._getSubTitleTemplateWithValue(this.__getSlot('subtitle'));
    }

    __processSlotTitleInHeader() {
        if (!this.__hasSlotContent('title')) {
            return nothing;
        }
        return this._getTitleTemplateWithValue(this.__getSlot('title'));
    }

    __processSlotContent() {
        return this._getContentTemplateWithValue(this.__getSlot('content'));
    }

    __processSlotText() {
        return this._getTextTemplateWithValue(this.__getSlot('text'));
    }

    _getTitleTemplateWithValue(value: any) {
        return html`<h3 class="vl-spotlight__title">${value}${this.external ? this.__renderExternalIcon() : nothing}</h3>`;
    }

    _getSubTitleTemplateWithValue(value: any) {
        return html`<p class="vl-spotlight__subtitle">${value}</p>`;
    }

    _getContentTemplateWithValue(value: any) {
        return html` <div class="vl-spotlight__content">${value}</div>`;
    }

    _getTextTemplateWithValue(value: any) {
        return html`<p class="vl-spotlight__text">${value}</p>`;
    }

    __fallbackIfEmpty(value: any, templateResult: any) {
        if (value && value.length > 0) {
            return templateResult;
        }
        return ``;
    }

    render() {
        const classes = {
            'vl-spotlight': true,
            'vl-spotlight--alt': this.alt,
            'vl-spotlight--xs': this.size === SIZE.XS,
            'vl-spotlight--s': this.size === SIZE.S,
            'vl-spotlight--l': this.size === SIZE.L,
            'vl-spotlight--no-border': this.noBorder,
        };
        if (this.link) {
            const target = this.external ? '_blank' : nothing;
            const rel = this.external ? 'noopener noreferrer nofollow' : nothing;
            return html`<a
                href="${this.link}"
                class="${classMap(classes)}"
                target=${target}
                rel=${rel}
                aria-label=${this.linkLabel || nothing}
            >
                <article role="none">
                    ${this.__processHeader()} ${this.__processSlotTitle()} ${this.__processSlotSubTitle()}
                    ${this.__processSlotContent()} ${this.__processSlotText()}
                </article>
            </a>`;
        }
        return html`
            <article class="${classMap(classes)}" role="none">
                ${this.__processHeader()} ${this.__processSlotTitle()} ${this.__processSlotSubTitle()}
                ${this.__processSlotContent()} ${this.__processSlotText()}
            </article>
        `;
    }

    __renderExternalIcon() {
        return html`<span class="vl-icon vl-icon--external vl-icon--after vl-spotlight__external-icon" aria-hidden="true"></span>`;
    }

    __processHeader() {
        if (!this.imgSrc) return html``;
        return html` <header role="none" class="vl-spotlight__header">
            <div class="vl-spotlight__image vl-spotlight__image--focus-center-center">
                <img class="vl-spotlight__image__img" src="${this.imgSrc}" alt="${this.imgAlt}" />
            </div>
            <div class="vl-spotlight__title-wrapper">${this.__processSlotTitleInHeader()}</div>
        </header>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-spotlight': VlSpotlight;
    }
}
