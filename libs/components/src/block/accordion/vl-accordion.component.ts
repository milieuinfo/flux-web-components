import {
    BaseHTMLElement,
    legacyBreakpoint,
    legacyCore,
    PADDINGS,
    registerWebComponents,
    webComponent,
} from '@domg-wc/common';
import { resetStyle } from '@domg/govflanders-style/common';
import { accordionStyle, buttonStyle, iconStyle, linkStyle, toggleStyle } from '@domg/govflanders-style/component';
import 'reflect-metadata';
import { VlIconComponent } from '../../atom/icon';
import { vlLinkIconStyles } from '../../atom/link-style/vl-link-icon-style.css';
import { vlAccordionFluxStyles } from './vl-accordion.flux-css';
import './vl-accordion.lib.js';

declare const vl: any;

registerWebComponents([legacyCore, legacyBreakpoint, VlIconComponent]);

@webComponent('vl-accordion')
export class VlAccordionComponent extends BaseHTMLElement {
    constructor() {
        const html = `
          <div class="js">
            <div class="vl-accordion" data-accordion>
            <div class="vl-accordion__button-container">
              <button class="vl-toggle vl-link vl-link--bold" data-accordion-toggle>
                <vl-icon id="toggle-icon" icon="arrow-down-fat" class="vl-accordion__icon vl-link__icon vl-link__icon--before"></vl-icon>
                <slot name="title" class="vl-accordion__title"></slot>
              </button>
              <div class="vl-accordion__menu">
                <slot name="menu"></slot>
              </div>
            </div>
              <div class="vl-accordion__subtitle">
                <slot name="subtitle"></slot>
              </div>
              <div class="vl-accordion__content js-vl-accordion__content">
                <div class="vl-accordion__panel">
                  <slot id="accordion-slot"></slot>
                </div>
              </div>
            </div>
          </div>
        `;
        const styleSheets = [
            resetStyle.styleSheet!,
            buttonStyle.styleSheet!,
            iconStyle.styleSheet!,
            linkStyle.styleSheet!,
            toggleStyle.styleSheet!,
            accordionStyle.styleSheet!,
            vlAccordionFluxStyles.styleSheet!,
            vlLinkIconStyles.styleSheet!,
        ];
        super(html, styleSheets);
    }

    static get _observedAttributes() {
        return ['toggle-text', 'open-toggle-text', 'close-toggle-text', 'content-padding', 'heading-level'];
    }

    static get _observedClassAttributes() {
        return ['alt-background', 'bold', 'disabled'];
    }

    get _classPrefix() {
        return 'vl-accordion--';
    }

    get _accordionElement() {
        return this._element.querySelector('[accordion],[data-accordion]');
    }

    get _buttonElement() {
        return this._element.querySelector('button');
    }

    get _buttonContainerElement() {
        return this._element.querySelector('.vl-accordion__button-container');
    }

    get _titleElement() {
        return this._buttonElement.querySelector('slot[name="title"]');
    }

    get _headingLevelAttribute(): string | null {
        return this.getAttribute('heading-level');
    }

    get _openToggleTextAttribute() {
        return this.getAttribute('open-toggle-text');
    }

    get _closeToggleTextAttribute() {
        return this.getAttribute('close-toggle-text');
    }

    get _dressedAttribute() {
        // TODO: Fix. Dit werkt niet omdat het "accordion-dressed" attribuut op de button wordt gezet en niet op het parent element.
        return this.getAttribute('accordion-dressed');
    }

    get _isDressed() {
        return !!this._dressedAttribute;
    }

    get _isOpen() {
        return this._accordionElement.classList.contains('js-vl-accordion--open');
    }

    _addHeadingElement() {
        if (this._headingLevelAttribute) {
            if (!['1', '2', '3', '4', '5', '6'].includes(this._headingLevelAttribute)) {
                console.warn(
                    `De waarde "${this._headingLevelAttribute}" van het attribuut "heading-level" is ongeldig. Gebruik een waarde tussen 1 en 6.`
                );
                return;
            }
            const headingElement = document.createElement(`h${this._headingLevelAttribute}`);
            headingElement.appendChild(this._buttonElement);
            const existingHeadingElement = this._buttonContainerElement.querySelector('h1, h2, h3, h4, h5, h6');
            if (existingHeadingElement) {
                existingHeadingElement.remove();
            }
            this._buttonContainerElement.prepend(headingElement);
        }
    }

    _onButtonClick = () => {
        this.dispatchEvent(
            new CustomEvent('vl-on-toggle', {
                detail: {
                    open: this._isOpen,
                },
            })
        );
    };

    _addEventListeners() {
        this._buttonElement?.addEventListener('click', this._onButtonClick);
    }

    _removeEventListeners() {
        this._buttonElement?.removeEventListener('click', this._onButtonClick);
    }

    connectedCallback() {
        super.connectedCallback();

        this.dress();

        if (this._hasTitleSlot()) {
            this._propagateTitleSlotClickToAccordion();
        }

        if (this.hasAttribute('icon')) {
            this._addIconElement();
            this._accordionElement.classList.add('vl-accordion--has-icon');
        }

        if (this.hasAttribute('default-open')) {
            this.open();
        }

        this._addHeadingElement();

        /*
            Voeg de eventListener toe nadat this.dress() is aangeroepen om de correcte volgorde van de event listeners te garanderen.
            Digitaal Vlaanderen accordion.js vuurt zelf een onChange event af bij het openen of sluiten van de accordion,
            maar om te vermijden dat we te veel steunen op de JS van Digitaal Vlaanderen vangen we het click event zelf op.
        */
        this._addEventListeners();
    }

    disconnectedCallback() {
        this._removeEventListeners();
    }

    _propagateTitleSlotClickToAccordion() {
        this._titleElement.addEventListener('click', (event: Event) => {
            event.stopPropagation();
            this._buttonElement.click();
        });
    }

    _addIconElement() {
        if (this._buttonElement?.querySelector('vl-icon.vl-accordion__icon:not(#toggle-icon)')) return;
        const icon = this.getAttribute('icon');
        const iconEl = document.createElement('vl-icon');
        iconEl.classList.add('vl-accordion__icon', 'vl-link__icon', 'vl-link__icon--before', 'vl-toggle__icon');
        iconEl.setAttribute('icon', icon!);
        iconEl.setAttribute('aria-hidden', 'true');
        this._buttonElement?.prepend(iconEl);
    }

    _hasTitleSlot() {
        return this._titleElement.assignedElements().length > 0;
    }

    dress() {
        if (!this._isDressed) {
            vl.accordion.dress(this._buttonElement);
        }
    }

    open() {
        vl.accordion.open(this._accordionElement);
    }

    close() {
        if (this._isOpen) {
            this.toggle();
        }
    }

    toggle() {
        vl.accordion.toggle(this._accordionElement);
    }

    _toggleTextChangedCallback(oldValue: string, newValue: string) {
        this._titleElement.textContent = newValue;
    }

    _openToggleTextChangedCallback(oldValue: string, newValue: string) {
        this._titleElement.classList.add('js-vl-accordion__toggle__text');
        this._titleElement.setAttribute('data-accordion-open-text', newValue);
    }

    _closeToggleTextChangedCallback(oldValue: string, newValue: string) {
        this._titleElement.classList.add('js-vl-accordion__toggle__text');
        this._titleElement.setAttribute('data-accordion-close-text', newValue);
    }

    _contentPaddingChangedCallback(oldValue: keyof typeof PADDINGS, newValue: keyof typeof PADDINGS) {
        const padding = PADDINGS[newValue];
        const content = this._element.querySelector('.vl-accordion__panel');

        if (padding) {
            content.style.padding = padding;
        } else {
            content.style.removeProperty('padding');
        }
    }

    _headingLevelChangedCallback(oldValue: string, newValue: string) {
        this._addHeadingElement();
        this._addEventListeners();
    }

    _disabledChangedCallback(oldValue: string, newValue: string) {
        if (newValue != undefined) {
            this._buttonElement?.setAttribute('disabled', '');
        } else {
            this._buttonElement?.removeAttribute('disabled');
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-accordion': VlAccordionComponent;
    }
}
