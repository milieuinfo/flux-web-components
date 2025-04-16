import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { SIZE } from './vl-spotlight.model';
import { BaseLitElement } from '@domg-wc/common';
import { classMap } from 'lit/directives/class-map.js';
import { vlLegacyStyles } from '@domg-wc/styles';
import { documentStyle, iconListStyle, spotlightStyle } from '@domg/govflanders-style/component';
import spotlightUigStyle from './vl-spotlight.uig-css';

@customElement('vl-spotlight')
export class VlSpotlight extends BaseLitElement {
    // Attributes
    private link = '';
    private external = false;
    private alt = false;
    private noBorder = false;
    private size = '';
    private imgSrc = '';
    private imgAlt = '';

    static get styles() {
        return [...vlLegacyStyles, spotlightStyle, documentStyle, iconListStyle, spotlightUigStyle];
    }

    static get properties() {
        return {
            link: {
                type: String,
                attribute: 'data-vl-link',
            },
            external: {
                type: Boolean,
                attribute: 'data-vl-external',
            },
            alt: {
                type: Boolean,
                attribute: 'data-vl-alt',
                reflect: true,
            },
            noBorder: {
                type: Boolean,
                attribute: 'data-vl-no-border',
                reflect: true,
            },
            size: {
                type: String,
                attribute: 'data-vl-size',
                reflect: true,
            },
            imgSrc: {
                type: String,
                attribute: 'data-vl-img-src',
            },
            imgAlt: {
                type: String,
                attribute: 'data-vl-img-alt',
            },
        };
    }

    __getSlot(slotName: string) {
        return html` <slot name="${slotName}"></slot>`;
    }

    __processSlotTitle() {
        return this._getTitleTemplateWithValue(this.__getSlot('title'));
    }

    __processSlotSubTitle() {
        return this._getSubTitleTemplateWithValue(this.__getSlot('subtitle'));
    }

    __processSlotTitleInHeader() {
        return this._getTitleTemplateWithValue(this.__getSlot('title'));
    }

    __processSlotContent() {
        return this._getContentTemplateWithValue(this.__getSlot('content'));
    }

    __processSlotText() {
        return this._getTextTemplateWithValue(this.__getSlot('text'));
    }

    _getTitleTemplateWithValue(value: any) {
        return html`<h3 class="vl-spotlight__title">${value}</h3>`;
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
            return html`<a
                href="${this.link}"
                class="${classMap(classes)}"
                target=${this.external ? '_blank' : nothing}
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
