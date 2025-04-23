// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./swipe-detect.d.ts" />
import { BaseElementOfType, registerWebComponents, webComponent } from '@domg-wc/common';
import { VlButtonComponent } from '@domg-wc/components';
import { vlAccessibilityStyles, vlContentBlockStyles, vlSectionStyles } from '@domg-wc/styles';
import swipeDetect from 'swipe-detect/dist';
import styles from './vl-side-sheet.uig-css';

@webComponent('vl-side-sheet')
export class VlSideSheet extends BaseElementOfType(HTMLElement) {
    static {
        registerWebComponents([VlButtonComponent]);
    }

    static get _observedAttributes() {
        return [
            'enable-swipe',
            'toggle-text',
            'tooltip-text',
            'custom-icon',
            'hide-toggle-button',
            'icon-position',
            'custom-size',
            'open',
        ];
    }

    static get _observedClassAttributes() {
        return ['left', 'right', 'absolute'];
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(style = '') {
        super(`
          <style>
            ${styles.join('')}
            ${vlAccessibilityStyles}
            ${vlSectionStyles}
            ${vlContentBlockStyles}
          </style>
          <div>
              <vl-button
                  aria-expanded="false"
                  icon="nav-left"
                  tertiary
                  part="toggle-button"
                  class="vl-side-sheet__toggle"
                  label="toggle side-sheet"
              >
              </vl-button>
              <div id="vl-side-sheet-backdrop"></div>
              <div id="vl-side-sheet">
                <section class="vl-section">
                  <div class="vl-content-block">
                    <slot></slot>
                  </div>
                </section>
              </div>
          </div>
        `);
    }

    connectedCallback() {
        super.connectedCallback();

        this._toggle = () => this.toggle();
        this._toggleButton.addEventListener('click', this._toggle);
        this._toggleButton.on = false;
        if (this.iconPlacement !== 'after') {
            this._toggleButton.setAttribute('icon-placement', 'before');
        } else {
            this._toggleButton.setAttribute('icon-placement', 'after');
        }
    }

    disconnectedCallback() {
        this._toggleButton.removeEventListener('click', this._toggle);
    }

    get isOpen() {
        return this.hasAttribute('open');
    }

    get isLeft() {
        return this.hasAttribute('left');
    }

    get toggleText() {
        return this.getAttribute('toggle-text');
    }

    get hideToggleButton() {
        return this.getAttribute('hide-toggle-button');
    }

    get customIcon() {
        return this.getAttribute('custom-icon');
    }

    get iconPlacement() {
        return this.getAttribute('icon-placement');
    }

    get _classPrefix() {
        return 'vl-side-sheet--';
    }

    get _toggleButton() {
        return this._shadow.querySelector('.vl-side-sheet__toggle');
    }

    get _toggleButtonTextElement() {
        return this._shadow.querySelector('#vl-side-sheet-toggle-text');
    }

    get _sheetElement() {
        return this._shadow.querySelector('#vl-side-sheet');
    }

    get _regionElement() {
        return this._sheetElement.querySelector('section.vl-section');
    }

    get _backdropElement() {
        return this._shadow.querySelector('#vl-side-sheet-backdrop');
    }

    get _slotElement() {
        return this._shadow.querySelector('slot');
    }

    /**
     * Triggert een toggle van de side-sheet zonder te klikken op de side-sheet.
     *
     * @Return {void}
     */
    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    /**
     * Handmatig openen van de side-sheet
     *
     * @Return {void}
     */
    open() {
        this.setAttribute('open', '');
    }

    _handleOnOpen() {
        this._toggleButton.setAttribute('aria-expanded', 'true');
        let openIcon: string;
        if (!this.customIcon) {
            openIcon = this.isLeft ? 'nav-left' : 'nav-right';
        } else {
            openIcon = this.customIcon;
        }
        this._toggleButton.setAttribute('icon', openIcon);
    }

    /**
     * Handmatig sluiten van de side-sheet
     *
     * @Return {void}
     */
    close() {
        this.removeAttribute('open');
        this._handleOnClose();
    }

    _handleOnClose() {
        this._toggleButton.setAttribute('aria-expanded', 'false');
        let closeIcon: string;
        if (!this.customIcon) {
            closeIcon = this.isLeft ? 'nav-right' : 'nav-left';
        } else {
            closeIcon = this.customIcon;
        }
        this._toggleButton.setAttribute('icon', closeIcon);
        if (this._onClose) {
            this._onClose();
        }
    }

    // TODO storybook documentatie
    /**
     * De callback wordt uitgevoerd direct na de afsluiten van een side sheet.
     *
     * @param {function} callback
     */
    onClose(callback: any) {
        this._onClose = callback;
    }

    _enableSwipeChangedCallback(oldValue: any, newValue: any) {
        if (newValue !== null) {
            swipeDetect(
                this._sheetElement,
                (direction: 'left' | 'right') => {
                    if ((this.isLeft && direction === 'left') || (!this.isLeft && direction === 'right')) {
                        this.close();
                    }
                },
                50
            );
        } else {
            //TODO: disable does not work, needs to be refactored: https://github.com/mhfen/swipe-detect/issues/11
            this.swipeDetect.disable();
        }
    }

    _absoluteChangedCallback(oldValue: any, newValue: any) {
        if (newValue != undefined && this._regionElement) {
            this._sheetElement.append(this._slotElement);
            this._regionElement.remove();
        }
    }

    _leftChangedCallback(oldValue: any, newValue: any) {
        if (!this.customIcon) {
            this._openChangedCallback();
        }
    }

    _openChangedCallback() {
        if (this.isOpen) {
            this._handleOnOpen();
        } else {
            this._handleOnClose();
        }
    }

    _toggleTextChangedCallback(oldValue: any, newValue: any) {
        this._toggleButton.innerHTML = newValue;
    }

    _tooltipTextChangedCallback(oldValue: any, newValue: any) {
        // we voegen de title toe aan de button behalve als de waarde null / undefined is
        if (newValue ?? false) {
            this._toggleButton?.setAttribute('title', newValue);
        } else {
            this._toggleButton?.removeAttribute('title');
        }
    }

    _hideToggleButtonChangedCallback(oldValue: any, newValue: any) {
        const hideToggleButton = Boolean(newValue === null);
        if (!hideToggleButton) {
            this._toggleButton.classList.add('vl-visually-hidden');
        } else {
            this._toggleButton.classList.remove('vl-visually-hidden');
        }
    }

    _customIconChangedCallback(oldValue: string, newValue: string) {
        if (newValue) {
            this._toggleButton.setAttribute('icon', newValue);
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-side-sheet': VlSideSheet;
    }
}
