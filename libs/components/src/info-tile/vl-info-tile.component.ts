import { BaseHTMLElement, isSlotEmpty, registerWebComponents, VL, webComponent } from '@domg-wc/common-utilities';
import { vlElementsStyle } from '@domg-wc/elements';
import { baseStyle, resetStyle } from '@domg/govflanders-style/common';
import { accordionStyle, iconStyle, infoTileStyle, linkStyle, toggleStyle } from '@domg/govflanders-style/component';
import '@govflanders/vl-ui-util/dist/js/util.js';
import '@govflanders/vl-ui-accordion/dist/js/accordion.js';
import 'reflect-metadata';
import { VlAccordionComponent } from '../accordion/vl-accordion.component';
import { INFO_TILE_SIZE } from './vl-info-tile.model';
import infoTileUigStyle from './vl-info-tile.uig-css';

declare const vl: VL;

@webComponent('vl-info-tile')
export class VlInfoTile extends BaseHTMLElement {
    static {
        registerWebComponents([VlAccordionComponent]);
    }

    static get _observedAttributes() {
        return ['auto-open', 'toggleable', 'clickable-label', 'clickable', 'center', 'size'];
    }

    constructor() {
        super(`
          <style>
            ${resetStyle}
            ${baseStyle}
            ${vlElementsStyle.join('')}
            ${infoTileStyle}
            ${infoTileUigStyle}
            ${linkStyle}
            ${toggleStyle}
            ${accordionStyle}
            ${iconStyle}
          </style>
          <div class="vl-info-tile">
            <header class="vl-info-tile__header" role="presentation">
              <div id="wrapper" class="vl-info-tile__header__wrapper">
                <div class="vl-info-tile__title-wrapper">
                  <h3 id="title" class="vl-info-tile__header__title">
                    <slot name="title"></slot><slot name="title-label"></slot>
                  </h3>
                  <p class="vl-info-tile__header__subtitle">
                    <slot name="subtitle"></slot>
                  </p>
                </div>
                <div class="vl-info-tile__menu">
                    <slot name="menu"></slot>
                </div>
              </div>
            </header>

            <div class="vl-info-tile__content">
              <slot name="content"></slot>
            </div>

            <footer class="vl-info-tile__footer">
              <slot name="footer"></slot>
            </footer>
          </div>
        `);
    }

    connectedCallback() {
        super.connectedCallback();

        this.__setSizeClass();
        this.__processAutoOpen();
        this.__processSlots();
        this.__processAutoOpen();
        this.__processClickableLabel();
    }

    get isToggleable() {
        return this.getAttribute('toggleable') !== null;
    }

    get isOpen() {
        if (this.isToggleable) {
            return this._element?.classList.contains('js-vl-accordion--open');
        }
        return true;
    }

    get _headerWrapperElement(): HTMLDivElement | null {
        return this._element?.querySelector('#wrapper');
    }

    get _titleWrapperElement(): HTMLDivElement {
        return this._element.querySelector('.vl-info-tile__title-wrapper') as HTMLDivElement;
    }

    get _titleElement(): HTMLHeadingElement | undefined | null {
        return this._headerWrapperElement?.querySelector('#title');
    }

    get _titleSlot(): HTMLSlotElement | undefined | null {
        return this.querySelector<HTMLSlotElement>(":scope > slot[name='title']");
    }

    get _titleLabelSlot(): Element | undefined | null {
        return this.querySelector("[slot='title-label']");
    }

    get _titleLabelSlotElement() {
        return this._titleElement?.querySelector('[name="title-label"]');
    }

    get _buttonElement(): HTMLButtonElement | undefined | null {
        return this._element?.querySelector('button.vl-toggle');
    }

    get _footerElement(): HTMLElement | null {
        return this._element ? (this._element.querySelector('footer') as HTMLElement) : null;
    }

    get _footerSlotElement(): HTMLSlotElement | null {
        return this._element ? (this._element.querySelector('slot[name="footer"]') as HTMLSlotElement) : null;
    }

    toggle() {
        this._toggleElement?.click();
    }

    open() {
        if (!this.isOpen) {
            this.toggle();
        }
    }

    close() {
        if (this.isOpen) {
            this.toggle();
        }
    }

    get _toggleElement() {
        return this._shadow?.querySelector<HTMLElement>('.js-vl-accordion__toggle');
    }

    get _subtitleElement() {
        return this._shadow?.querySelector('slot[name="subtitle"]');
    }

    get _contentElement() {
        return this._shadow?.querySelector('slot[name="content"]');
    }

    _centerChangedCallback(oldValue: string, newValue: string) {
        if (newValue === null) {
            this._element?.classList.remove('vl-info-tile--center');
        } else {
            this._element?.classList.add('vl-info-tile--center');
        }
    }

    _sizeChangedCallback() {
        this.__setSizeClass();
    }

    __setSizeClass() {
        this._element?.classList.remove('vl-info-tile--s');
        this._element?.classList.remove('vl-info-tile--m');
        this._element?.classList.remove('vl-info-tile--l');
        switch (this.getAttribute('data-vl-size')) {
            case INFO_TILE_SIZE.SMALL:
                this._element?.classList.add('vl-info-tile--s');
                break;
            case INFO_TILE_SIZE.MEDIUM:
                this._element?.classList.add('vl-info-tile--m');
                break;
            case INFO_TILE_SIZE.LARGE:
                this._element?.classList.add('vl-info-tile--l');
                break;
        }
    }

    _toggleableChangedCallback(oldValue: string, newValue: string) {
        if (newValue === null) {
            this.__removeAccordionElements();
            this.__removePreventContentClickPropagation();
        } else {
            this.__prepareAccordionElements();
            vl.accordion.dress(this._buttonElement);
            this.__preventContentClickPropagation();
            this.__processAutoOpen();
        }
    }

    handleInfoTileClicked(): void {
        this.dispatchEvent(new CustomEvent('vl-click-info-tile', { bubbles: true, composed: true }));
    }

    _clickableChangedCallback(oldValue: string, newValue: string) {
        const clickable = newValue !== null;
        const infoTileContainer = this.shadowRoot?.querySelector('.vl-info-tile');
        if (clickable) {
            const clickableButton = document.createElement('button');
            clickableButton.classList.add('info-tile-clickable');
            clickableButton.addEventListener('click', this.handleInfoTileClicked);
            infoTileContainer?.prepend(clickableButton);
        } else {
            const clickableButton = infoTileContainer?.querySelector('.info-tile-clickable');
            clickableButton?.removeEventListener('click', this.handleInfoTileClicked);
            clickableButton?.remove();
        }
    }

    __processClickableLabel(): void {
        const clickableButton = this._element?.querySelector('button.info-tile-clickable');
        const clickable = this.hasAttribute('clickable');
        const clickableLabel = this.getAttribute('clickable-label');

        if (clickable) {
            if (clickableLabel) {
                clickableButton?.setAttribute('aria-label', clickableLabel);
            } else {
                console.warn('VlInfoTile - clickable-label is vereist.');
            }
        }
    }

    __prepareAccordionElements() {
        this._element?.classList.add('js-vl-accordion');
        const button = this._template(`
          <button class="vl-toggle vl-link vl-link--bold js-vl-accordion__toggle">
            <i class="vl-link__icon vl-link__icon--before vl-toggle__icon vl-vi vl-vi-arrow-right-fat" aria-hidden="true"></i>
          </button>
        `).firstElementChild;
        if (this._titleElement) button?.appendChild(this._titleElement);
        if (button) this._titleWrapperElement.prepend(button);
    }

    __removeAccordionElements() {
        this._element?.classList.remove('js-vl-accordion');
        if (this._titleElement && this._buttonElement)
            this._titleWrapperElement?.replaceChild(this._titleElement, this._buttonElement);
    }

    __preventContentClickPropagation() {
        this._subtitleElement?.addEventListener('click', (e: Event) => e.stopPropagation());
        this._contentElement?.addEventListener('click', (e: Event) => e.stopPropagation());
    }

    __removePreventContentClickPropagation() {
        this._subtitleElement?.removeEventListener('click', (e: Event) => e.stopPropagation());
        this._contentElement?.removeEventListener('click', (e: Event) => e.stopPropagation());
    }

    _hasTitleSlot() {
        return this._titleSlot && !isSlotEmpty(this._titleSlot);
    }

    _hasFooterSlot() {
        return this._footerSlotElement && !isSlotEmpty(this._footerSlotElement);
    }

    __processAutoOpen() {
        if (this.isToggleable) {
            if (this.dataset.vlAutoOpen === undefined) {
                this.close();
            } else {
                this.open();
            }
        }
    }

    __processSlots() {
        if (!this._titleLabelSlot) {
            this._titleLabelSlotElement?.remove();
        }
        this._titleElement?.addEventListener('click', (event: Event) => {
            event.stopPropagation();
            this._buttonElement?.click();
        });
        if (!this._hasFooterSlot()) {
            this._footerElement?.remove();
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-info-tile': VlInfoTile;
    }
}
