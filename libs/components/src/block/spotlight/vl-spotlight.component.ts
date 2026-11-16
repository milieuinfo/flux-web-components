import { BaseLitElement } from '@domg-wc/common';
import { vlLegacyStyles, vlResetStyles } from '@domg-wc/styles';
import { documentStyle, iconListStyle, spotlightStyle } from '@domg/govflanders-style/component';
import { html, nothing, PropertyValues } from 'lit';
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
    private hasTitle = false;
    private titleObserver = new MutationObserver(() => this.__updateHasTitle());

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
            hasTitle: {
                state: true,
            },
        };
    }

    connectedCallback() {
        super.connectedCallback();
        // Ook tekst die pas later in de titel komt (bv. asynchrone data) moet de titel tonen;
        // daarvoor komt er geen slotchange.
        this.titleObserver.observe(this, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true,
            attributeFilter: ['slot'],
        });
        this.__updateHasTitle();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.titleObserver.disconnect();
    }

    protected willUpdate(changedProperties: PropertyValues): void {
        super.willUpdate(changedProperties);
        this.__updateHasTitle();
    }

    protected updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        if (changedProperties.has('imgSrc') && this.imgSrc && !this.imgAlt && !this.hasAttribute('img-alt')) {
            console.warn(
                'Een `<vl-spotlight>` met `img-src` heeft een `img-alt` attribuut nodig: ' +
                    'beschrijf de afbeelding als ze informatie toevoegt, of zet `img-alt=""` als ze louter ' +
                    'decoratief is (https://www.w3.org/TR/WCAG22/#non-text-content).'
            );
        }
        const linkNameChanged = ['link', 'linkLabel', 'hasTitle'].some((name) => changedProperties.has(name));
        if (linkNameChanged && this.link && !this.linkLabel && !this.hasTitle) {
            console.warn(
                'Een `<vl-spotlight>` met `link` heeft een titel (slot `title`) of een `link-label` attribuut ' +
                    'nodig: zonder heeft de link geen naam voor schermlezers ' +
                    '(https://www.w3.org/TR/WCAG22/#link-purpose-in-context).'
            );
        }
    }

    __updateHasTitle() {
        this.hasTitle = Array.from(this.children).some(
            (child) =>
                child.slot === 'title' && (child.childElementCount > 0 || (child.textContent || '').trim().length > 0)
        );
    }

    __getSlot(slotName: string) {
        return html` <slot name="${slotName}"></slot>`;
    }

    __processSlotTitle() {
        const title = this.__getSlot('title');
        if (!this.hasTitle) {
            // Zonder titel blijft de link staan, zodat de kaart klikbaar blijft, maar zonder lege heading.
            return this.link ? this.__renderLink(title) : nothing;
        }
        return this._getTitleTemplateWithValue(title);
    }

    __processSlotSubTitle() {
        return this._getSubTitleTemplateWithValue(this.__getSlot('subtitle'));
    }

    __processSlotContent() {
        return this._getContentTemplateWithValue(this.__getSlot('content'));
    }

    __processSlotText() {
        return this._getTextTemplateWithValue(this.__getSlot('text'));
    }

    _getTitleTemplateWithValue(value: any) {
        const title = html`${value}${this.external ? this.__renderExternalIcon() : nothing}`;
        return html`<h3 class="vl-spotlight__title">${this.link ? this.__renderLink(title) : title}</h3>`;
    }

    __renderLink(title: unknown) {
        const target = this.external ? '_blank' : nothing;
        const rel = this.external ? 'noopener noreferrer nofollow' : nothing;
        return html`<a
            class="vl-spotlight__link"
            href="${this.link}"
            target=${target}
            rel=${rel}
            aria-label=${this.linkLabel || nothing}
        >
            <span class="vl-spotlight__link-text">${title}</span>
        </a>`;
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
            'vl-spotlight--has-link': !!this.link,
        };
        return html`
            <article class="${classMap(classes)}" role="none">
                ${this.__processHeader()} ${this.imgSrc ? nothing : this.__processSlotTitle()}
                ${this.__processSlotSubTitle()} ${this.__processSlotContent()} ${this.__processSlotText()}
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
            <div class="vl-spotlight__title-wrapper">${this.__processSlotTitle()}</div>
        </header>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-spotlight': VlSpotlight;
    }
}
