import {
    awaitUntil,
    BaseHTMLElement,
    legacyBreakpoint,
    legacyCore,
    registerWebComponents,
    webComponent,
} from '@domg-wc/common';
import { vlGridStyles, vlGroupStyles, vlStackedStyles } from '@domg-wc/styles';
import { accessibilityStyle, resetStyle } from '@domg/govflanders-style/common';
import { modalStyle } from '@domg/govflanders-style/component';
import { vlIconStyles } from '../../atom/icon-style/vl-icon-style.css';
import { VlLinkComponent } from '../../atom/link';
import { vlModalFluxStyles } from './vl-modal.flux-css';
import './vl-modal.lib.js';

declare const vl: any;

registerWebComponents([legacyCore, legacyBreakpoint]);

@webComponent('vl-modal')
export class VlModalComponent extends BaseHTMLElement {
    static {
        registerWebComponents([VlLinkComponent]);
    }

    constructor() {
        const html = `
            <div class="vl-modal">
                <dialog class="vl-modal-dialog" id="modal-dialog" modal tabindex="-1"
                        aria-modal="true" aria-hidden="true" aria-labelledby="modal-toggle-title">
                    <div class="vl-modal-dialog__wrapper" id="modal-dialog-wrapper">
                        <div class="vl-grid vl-stacked-small">
                            <div class="vl-column vl-column--12 vl-column--m-12 vl-modal-dialog__content">
                                <slot name="content">Modal content</slot>
                            </div>
                            <div class="vl-column vl-column--12 vl-column--m-12">
                                <div id="modal-action-group" class="vl-group">
                                    <slot name="button" modal-close></slot>
                                    <vl-link id="modal-toggle-cancellable"
                                             button-as-link icon="cross" icon-placement="before"
                                             modal-close>Annuleer</vl-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </dialog>
            </div>
        `;
        const styleSheets = [
            resetStyle.styleSheet!,
            modalStyle.styleSheet!,
            vlModalFluxStyles.styleSheet!,
            accessibilityStyle.styleSheet!,
            vlGroupStyles.styleSheet!,
            vlGridStyles.styleSheet!,
            vlStackedStyles.styleSheet!,
            vlIconStyles.styleSheet!,
        ];
        super(html, styleSheets);
    }

    static get _observedAttributes() {
        return [
            'id',
            'title',
            'label',
            'closable',
            'not-cancellable',
            'open',
            'not-auto-closable',
            'allow-overflow',
            'size',
            'position',
            'focus-on-modal',
        ];
    }

    static get _closableAttribute() {
        return 'modal-closable';
    }

    static get _closeAttribute() {
        return 'modal-close';
    }

    get _dialogElement(): HTMLDialogElement {
        return this._element?.querySelector('dialog');
    }

    get _dialogWrapperElement(): HTMLDialogElement {
        return this._element?.querySelector('#modal-dialog-wrapper');
    }

    get _titleElement() {
        return this._element.querySelector('#modal-toggle-title');
    }

    get _actionGroupElement() {
        return this._element.querySelector('#modal-action-group');
    }

    get _cancelElement() {
        return this._element.querySelector('#modal-toggle-cancellable');
    }

    get _slotButtonElement() {
        return this._element.querySelector('slot[name="button"]');
    }

    get _closeButtonElement() {
        return this._element.querySelector('#close');
    }

    get _dressed() {
        return !!this.getAttribute('modal-dressed');
    }

    setAriaLabel() {
        const title = this.getAttribute('title');
        const label = this.getAttribute('label');
        if (title) {
            this._dialogElement.setAttribute('aria-labelledby', 'modal-toggle-title');
            this._dialogElement.removeAttribute('aria-label');
        } else if (label) {
            this._dialogElement.setAttribute('aria-label', label);
            this._dialogElement.removeAttribute('aria-labelledby');
        } else {
            console.warn('vl-modal: title of label attribuut is verplicht.');
        }
    }

    connectedCallback() {
        super.connectedCallback();

        this.dress();
        this._shadow?.host.addEventListener('keyup', this._onEscape);

        if (this.hasAttribute('size')) {
            this._addDialogClassModifier(this.getAttribute('size') || '');
        }
        if (this.hasAttribute('position')) {
            this._addDialogClassModifier(this.getAttribute('position') || '');
        }

        this.setAriaLabel();
    }

    disconnectedCallback() {
        this._shadow?.host?.removeEventListener('keyup', this._onEscape);
    }

    /**
     * Initialiseer de modal config.
     */
    dress() {
        if (!this._dressed) {
            vl.modal.dress(this._dialogElement);
            this._dialogElement.dataset.focusOnModal = this.hasAttribute('focus-on-modal') ? 'true' : 'false';
        }
    }

    /**
     * Handmatig openen van modal.
     */
    open() {
        vl.modal.lastClickedToggle = this._dialogElement;
        if (!this.isOpen()) {
            awaitUntil(() => this._dialogElement.isConnected).then(() => {
                vl.modal.toggle(this._dialogElement);
            });
        }
    }

    /**
     * Handmatig sluiten van modal.
     */
    close() {
        if (this.isOpen()) {
            vl.modal.toggle(this._dialogElement);
        }
    }

    /**
     * Mogelijkheid om functies toe te voegen op events die op de dialog voorkomen.
     * @param {String} event
     * @param {Function} callback
     */
    on(event: string, callback: any) {
        this._dialogElement?.addEventListener(event, callback);
    }

    /**
     * Mogelijkheid om event listeners die op de dialog geplaatst zijn te verwijderen.
     * Zie dat je dezelfde referentie voor de callback meegeeft als bij het toevoegen van de event listener.
     * @param {String} event
     * @param {Function} callback
     */
    off(event: string, callback: any) {
        this._dialogElement?.removeEventListener(event, callback);
    }

    /**
     * Geeft terug of de modal geopend is.
     * @return {boolean}
     */
    isOpen() {
        return this._dialogElement?.hasAttribute('open');
    }

    _getCloseButtonTemplate() {
        return this._template(`
      <button id="close" type="button" class="vl-modal-dialog__close" aria-expanded="true" modal-close>
        <span class="vl-modal-dialog__close__icon vl-icon vl-icon--cross" aria-hidden="true"></span>
        <span class="vl-u-visually-hidden">Venster sluiten</span>
      </button>
    `);
    }

    _getTitleTemplate(titel: string) {
        return this._template(`
      <h2 class="vl-modal-dialog__title" id="modal-toggle-title">${titel}</h2>`);
    }

    _getCancelTemplate() {
        return this._template(`
      <vl-link id="modal-toggle-cancellable" aria-expanded="true" button-as-link icon="cross" icon-placement="before"
      modal-close
      >Annuleer</vl-link>
`);
    }

    _idChangedCallback(oldValue: string, newValue: string) {
        this._dialogElement.id = newValue;
    }

    _titleChangedCallback(oldValue: string, newValue: string) {
        if (newValue) {
            if (this._titleElement) {
                this._titleElement.innerText = newValue;
            } else {
                this._dialogWrapperElement.prepend(this._getTitleTemplate(newValue));
            }
        } else if (this._titleElement) {
            this._titleElement.remove();
        }
        this.setAriaLabel();
    }

    _labelChangedCallback(oldValue: string, newValue: string) {
        this.setAriaLabel();
    }

    _notCancellableChangedCallback(oldValue: string, newValue: string) {
        if (newValue == undefined && !this._cancelElement) {
            this._actionGroupElement.append(this._getCancelTemplate());
        } else if (newValue != undefined && this._cancelElement) {
            this._cancelElement.remove();
        }
    }

    _openChangedCallback() {
        this.open();
    }

    _closableChangedCallback(oldValue: string, newValue: string) {
        if (newValue !== null) {
            this._dialogElement.setAttribute(VlModalComponent._closableAttribute, newValue);
            if (!this._closeButtonElement) {
                this._dialogElement.appendChild(this._getCloseButtonTemplate());
            }
        } else {
            this._dialogElement.removeAttribute(VlModalComponent._closableAttribute);
            this._closeButtonElement?.remove();
        }
    }

    _notAutoClosableChangedCallback(oldValue: string, newValue: string) {
        if (newValue == undefined && !this._slotButtonElement.hasAttribute(VlModalComponent._closeAttribute)) {
            this._slotButtonElement.setAttribute(VlModalComponent._closeAttribute, '');
            this._slotButtonElement.setAttribute('aria-expanded', 'true');
        } else if (newValue != undefined && this._slotButtonElement.hasAttribute(VlModalComponent._closeAttribute)) {
            this._slotButtonElement.removeAttribute(VlModalComponent._closeAttribute);
            this._slotButtonElement.removeAttribute('aria-expanded');
        }
    }

    _addDialogClassModifier(modifier: string) {
        if (['medium', 'large', 'full-screen', 'left', 'right'].includes(modifier)) {
            this._dialogElement.classList.add(`vl-modal-dialog--${modifier}`);
        }
    }

    _sizeChangedCallback(oldValue: string, newValue: string) {
        this._dialogElement.classList.remove('vl-modal-dialog--medium', 'vl-modal-dialog--large');
        this._addDialogClassModifier(newValue);
    }

    _positionChangedCallback(oldValue: string, newValue: string) {
        this._dialogElement.classList.remove('vl-modal-dialog--left', 'vl-modal-dialog--right');
        this._addDialogClassModifier(newValue);
    }

    private _onEscape = (e: KeyboardEvent | Event) => {
        if ((e as KeyboardEvent).code.toLowerCase() === 'escape') {
            e.preventDefault();
            e.stopPropagation();
            const canEscape =
                this._dialogElement.hasAttribute(VlModalComponent._closableAttribute) &&
                this._dialogElement.getAttribute(VlModalComponent._closableAttribute) !== 'false';
            if (canEscape) {
                this.close();
            }
        }
    };
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-modal': VlModalComponent;
    }
}
