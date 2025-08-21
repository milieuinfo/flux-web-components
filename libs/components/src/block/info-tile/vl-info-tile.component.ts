import { BaseHTMLElement, isSlotEmpty, registerWebComponents, VL, webComponent } from '@domg-wc/common';
import { vlLegacyStyles } from '@domg-wc/styles';
import { baseStyle, resetStyle } from '@domg/govflanders-style/common';
import { accordionStyle, iconStyle, infoTileStyle, linkStyle, toggleStyle } from '@domg/govflanders-style/component';
import 'reflect-metadata';
import { VlAccordionComponent } from '../accordion';
import '../accordion/vl-accordion.lib.js';
import { vlInfoTyleFluxStyles } from './vl-info-tile.flux-css';
import { INFO_TILE_SIZE, INFO_TILE_TYPE } from './vl-info-tile.model';

declare const vl: VL;

@webComponent('vl-info-tile')
export class VlInfoTile extends BaseHTMLElement<VlInfoTile> {
    static {
        registerWebComponents([VlAccordionComponent]);
    }

    static get _observedAttributes() {
        return ['auto-open', 'toggleable', 'center', 'full-height', 'size', 'icon', 'icon-as-badge', 'type'];
    }

    constructor() {
        const html = `
            <div class="vl-info-tile">
                <header class="vl-info-tile__header" role="presentation">
                    <div class="vl-info-tile__badge__wrapper">
                        <slot name="badge"></slot>
                        <div id="icon" class="vl-info-tile__icon">
                            <i class="vl-vi vl-vi-u-l" aria-hidden="true"></i>
                        </div>
                    </div>
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
        `;
        const styleSheets = [
            resetStyle.styleSheet!,
            baseStyle.styleSheet!,
            ...vlLegacyStyles.map((style) => style.styleSheet!),
            infoTileStyle.styleSheet!,
            vlInfoTyleFluxStyles.styleSheet!,
            linkStyle.styleSheet!,
            toggleStyle.styleSheet!,
            accordionStyle.styleSheet!,
            iconStyle.styleSheet!,
        ];
        super(html, styleSheets);
    }

    connectedCallback() {
        super.connectedCallback();

        this.__setSizeClass();
        this.__setTypeClass();
        this.__processSlots();
        this.__processIcon();
        this.__processBadgeWrapper();
        this.__processAutoOpen();
    }

    get isToggleable() {
        return !(this.getAttribute('toggleable') ?? false);
    }

    get isOpen() {
        if (this.isToggleable) {
            return this._element.classList.contains('js-vl-accordion--open');
        }
        return true;
    }

    get _headerWrapperElement(): HTMLDivElement | null {
        return this._element.querySelector('#wrapper');
    }

    get _titleWrapperElement(): HTMLDivElement | null {
        return this._element.querySelector<HTMLDivElement>('.vl-info-tile__title-wrapper');
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

    get _buttonElement(): HTMLButtonElement | null {
        return this._element.querySelector('button');
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

    get _footerElement(): HTMLElement | null {
        return this._element.querySelector<HTMLElement>('footer');
    }

    get _footerSlotElement(): HTMLSlotElement | null {
        return this._element.querySelector<HTMLSlotElement>('slot[name="footer"]');
    }

    get _badgeSlotElement(): HTMLSlotElement | null {
        return this._element.querySelector<HTMLSlotElement>('slot[name="badge"]');
    }

    get _badgeWrapperElement(): HTMLDivElement | null {
        return this._element.querySelector<HTMLDivElement>('.vl-info-tile__badge__wrapper');
    }

    get _iconElement(): HTMLDivElement | null {
        return this._element.querySelector<HTMLDivElement>('#icon');
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
            this._element.classList.remove('vl-info-tile--center');
        } else {
            this._element.classList.add('vl-info-tile--center');
        }
    }

    _fullHeightChangedCallback(oldValue: string, newValue: string) {
        if (newValue === null) {
            this._element.classList.remove('vl-info-tile--full-height');
        } else {
            this._element.classList.add('vl-info-tile--full-height');
        }
    }

    _sizeChangedCallback() {
        this.__setSizeClass();
    }

    __setSizeClass() {
        this._element.classList.remove('vl-info-tile--s');
        this._element.classList.remove('vl-info-tile--m');
        this._element.classList.remove('vl-info-tile--l');
        switch (this.getAttribute('size')) {
            case INFO_TILE_SIZE.SMALL:
                this._element.classList.add('vl-info-tile--s');
                break;
            case INFO_TILE_SIZE.MEDIUM:
                this._element.classList.add('vl-info-tile--m');
                break;
            case INFO_TILE_SIZE.LARGE:
                this._element.classList.add('vl-info-tile--l');
                break;
        }
    }

    _typeChangedCallback() {
        this.__setTypeClass();
    }

    __setTypeClass() {
        this._element.classList.remove('vl-info-tile--warning');
        this._element.classList.remove('vl-info-tile--error');
        this._element.classList.remove('vl-info-tile--success');
        this._element.classList.remove('vl-info-tile--alt');
        switch (this.getAttribute('type')) {
            case INFO_TILE_TYPE.ERROR:
                this._element.classList.add('vl-info-tile--error');
                break;
            case INFO_TILE_TYPE.WARNING:
                this._element.classList.add('vl-info-tile--warning');
                break;
            case INFO_TILE_TYPE.SUCCESS:
                this._element.classList.add('vl-info-tile--success');
                break;
            case INFO_TILE_TYPE.ALT:
                this._element.classList.add('vl-info-tile--alt');
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

    _iconChangedCallback(oldValue: string) {
        this.__processIcon(oldValue);
        this.__processBadgeWrapper();
    }

    _iconAsBadgeChangedCallback() {
        this.__processIcon();
        this.__processBadgeWrapper();
    }

    __prepareAccordionElements() {
        this._element.classList.add('js-vl-accordion');
        const button = this._template(`
          <button class="vl-toggle vl-link vl-link--bold js-vl-accordion__toggle">
            <i class="vl-link__icon vl-link__icon--before vl-toggle__icon vl-vi vl-vi-arrow-right-fat" aria-hidden="true"></i>
          </button>
        `).firstElementChild;
        if (this._titleElement) button?.appendChild(this._titleElement);
        if (button) this._titleWrapperElement?.prepend(button);
    }

    __removeAccordionElements() {
        this._element.classList.remove('js-vl-accordion');
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

    _hasBadgeSlot() {
        return this._badgeSlotElement && !isSlotEmpty(this._badgeSlotElement);
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
        if (!this._hasFooterSlot()) {
            this._footerElement?.remove();
        }
    }

    __processBadgeWrapper() {
        if (!this.hasAttribute('icon') && !this._hasBadgeSlot()) {
            this._badgeWrapperElement?.setAttribute('hidden', '');
        } else {
            this._badgeWrapperElement?.removeAttribute('hidden');
        }
    }

    __processIcon(prevIcon?: string) {
        const icon = this.getAttribute('icon') || '';
        if (icon && this._iconElement) {
            this._iconElement.removeAttribute('class');
            if (prevIcon) {
                this._iconElement.querySelector('.vl-vi')?.classList.remove(`vl-vi-${prevIcon}`);
            }
            this._iconElement.querySelector('.vl-vi')?.classList.add(`vl-vi-${icon.replace(/[^a-z0-9_-]/gi, '')}`);
            this._iconElement.classList.add('vl-info-tile__icon');
            if (this.hasAttribute('icon-as-badge')) {
                this._iconElement.classList.add('vl-info-tile__icon--badge');
            } else {
                this._iconElement.classList.remove('vl-info-tile__icon--badge');
            }
        }
        if (!icon && this._iconElement) {
            this._iconElement.removeAttribute('class');
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-info-tile': VlInfoTile;
    }
}
