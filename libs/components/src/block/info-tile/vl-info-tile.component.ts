import { BaseHTMLElement, registerWebComponents, VL, webComponent } from '@domg-wc/common';
import { vlLegacyStyles } from '@domg-wc/styles';
import { baseStyle, resetStyle } from '@domg/govflanders-style/common';
import { accordionStyle, iconStyle, infoTileStyle, linkStyle, toggleStyle } from '@domg/govflanders-style/component';
import '../accordion/vl-accordion.lib.js';
import { VlAccordionComponent } from '../accordion';
import 'reflect-metadata';
import { vlInfoTyleFluxStyles } from './vl-info-tile.flux-css';

declare const vl: VL;

@webComponent('vl-info-tile')
export class VlInfoTile extends BaseHTMLElement {
    static {
        registerWebComponents([VlAccordionComponent]);
    }

    constructor() {
        super(`
          <style>
            ${resetStyle}
            ${baseStyle}
            ${vlLegacyStyles.join('')}
            ${infoTileStyle}
            ${vlInfoTyleFluxStyles}
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

    static get _observedAttributes() {
        return ['auto-open', 'toggleable', 'center'];
    }

    get isToggleable() {
        return !(this.getAttribute('toggleable') ?? false);
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
        return this._element?.querySelector('button');
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

    connectedCallback() {
        super.connectedCallback();

        this.__processAutoOpen();
        this.__processSlots();
        this.__processAutoOpen();
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

    _centerChangedCallback(oldValue: string, newValue: string) {
        if (newValue === null) {
            this._element?.classList.remove('vl-info-tile--center');
        } else {
            this._element?.classList.add('vl-info-tile--center');
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
        return this._titleSlot && this._titleSlot.assignedElements()?.length > 0;
    }

    __processAutoOpen() {
        if (this.isToggleable) {
            if (this.getAttribute('auto-open') === null) {
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
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-info-tile': VlInfoTile;
    }
}
