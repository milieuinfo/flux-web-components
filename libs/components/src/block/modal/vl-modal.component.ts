import { BaseLitElement, registerWebComponents, webComponent } from '@domg-wc/common';
import { vlGridStyles, vlGroupStyles, vlStackedStyles } from '@domg-wc/styles';
import { accessibilityStyle, resetStyle } from '@domg/govflanders-style/common';
import { modalStyle } from '@domg/govflanders-style/component';
import { CSSResult, html, nothing, PropertyValues, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { vlIconStyles } from '../../atom/icon-style/vl-icon-style.css';
import { VlLinkComponent } from '../../atom/link';
import { vlModalFluxStyles } from './vl-modal.flux-css';

const DIALOG_MODIFIERS = ['medium', 'large', 'full-screen', 'left', 'right'];
const CLOSE_ATTRIBUTES = ['modal-close', 'data-modal-close'];
const FOCUSABLE_SELECTOR = 'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

@webComponent('vl-modal')
export class VlModalComponent extends BaseLitElement {
    @property({ type: String, attribute: 'id' })
    private _modalId = '';

    @property({
        type: String,
        attribute: 'title',
        reflect: true,
        converter: { toAttribute: (value: string) => value || null },
    })
    title = '';

    @property({ type: String, attribute: 'label' })
    label = '';

    @property({ type: Boolean, attribute: 'closable' })
    closable = false;

    @property({ type: Boolean, attribute: 'not-cancellable' })
    notCancellable = false;

    @property({ type: Boolean, attribute: 'open', reflect: true })
    private _opened = false;

    @property({ type: Boolean, attribute: 'not-auto-closable' })
    notAutoClosable = false;

    @property({ type: Boolean, attribute: 'allow-overflow', reflect: true })
    allowOverflow = false;

    @property({ type: String, attribute: 'size' })
    size = '';

    @property({ type: String, attribute: 'position' })
    position = '';

    @property({ type: Boolean, attribute: 'focus-on-modal' })
    focusOnModal = false;

    private _triggerController?: AbortController;
    private _pendingTrigger: HTMLElement | null = null;
    private _lastTrigger: HTMLElement | null = null;
    private _lastFocusedInside: HTMLElement | null = null;
    private _shown = false;
    private _pointerDownOnBackdrop = false;
    private static _openModals: VlModalComponent[] = [];
    private _dialogListeners: [string, EventListenerOrEventListenerObject][] = [];

    static {
        registerWebComponents([VlLinkComponent]);
    }

    static get styles(): CSSResult[] {
        return [
            resetStyle,
            modalStyle,
            vlModalFluxStyles,
            accessibilityStyle,
            vlGroupStyles,
            vlGridStyles,
            vlStackedStyles,
            vlIconStyles,
        ];
    }

    get _dialogElement(): HTMLDialogElement | null {
        return this.shadowRoot?.querySelector('dialog') ?? null;
    }

    connectedCallback() {
        super.connectedCallback();
        this._bindOpenTriggers();
        const dialog = this._dialogElement;
        if (this._shown && dialog?.open && !dialog.matches(':modal')) {
            dialog.addEventListener('close', (event) => event.stopImmediatePropagation(), {
                capture: true,
                once: true,
            });
            const focused = this._lastFocusedInside;
            dialog.close();
            dialog.showModal();
            VlModalComponent._openModals = [...VlModalComponent._openModals.filter((modal) => modal !== this), this];
            if (focused?.isConnected) {
                focused.focus();
            }
        } else if (this.hasUpdated && this._opened && !this.isOpen()) {
            this._syncDialog();
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._triggerController?.abort();
        queueMicrotask(() => {
            if (this.isConnected) {
                return;
            }
            if (this._dialogElement?.open) {
                this._dialogElement.close();
            }
            this._finishClose();
        });
    }

    protected render(): TemplateResult {
        const dialogClasses = {
            'vl-modal-dialog': true,
            [`vl-modal-dialog--${this.size}`]: DIALOG_MODIFIERS.includes(this.size),
            [`vl-modal-dialog--${this.position}`]: DIALOG_MODIFIERS.includes(this.position),
        };

        return html`
            <div class="vl-modal">
                <dialog
                    class=${classMap(dialogClasses)}
                    id=${this._modalId || 'modal-dialog'}
                    tabindex="-1"
                    aria-modal="true"
                    aria-hidden=${this._opened ? 'false' : 'true'}
                    aria-labelledby=${ifDefined(this.title ? 'modal-toggle-title' : undefined)}
                    aria-label=${ifDefined(!this.title && this.label ? this.label : undefined)}
                    @pointerdown=${this._onDialogPointerdown}
                    @focusin=${this._onDialogFocusin}
                    @click=${this._onDialogClick}
                    @keydown=${this._onDialogKeydown}
                    @close=${this._onDialogClose}
                >
                    <div class="vl-modal-dialog__wrapper" id="modal-dialog-wrapper">
                        ${this.title
                            ? html`<h2 class="vl-modal-dialog__title" id="modal-toggle-title">${this.title}</h2>`
                            : nothing}
                        <div class="vl-grid vl-stacked-small">
                            <div class="vl-column vl-column--12 vl-column--m-12 vl-modal-dialog__content">
                                <slot name="content">Modal content</slot>
                            </div>
                            <div class="vl-column vl-column--12 vl-column--m-12">
                                <div id="modal-action-group" class="vl-group">
                                    <slot name="button" ?data-modal-close=${!this.notAutoClosable}></slot>
                                    ${this.notCancellable
                                        ? nothing
                                        : html`<vl-link
                                              id="modal-toggle-cancellable"
                                              button-as-link
                                              icon="cross"
                                              icon-placement="before"
                                              modal-close
                                              >Annuleer</vl-link
                                          >`}
                                </div>
                            </div>
                        </div>
                    </div>
                    ${this.closable
                        ? html`<button
                              id="close"
                              type="button"
                              class="vl-modal-dialog__close"
                              data-modal-close
                          >
                              <span class="vl-modal-dialog__close__icon vl-icon vl-icon--cross" aria-hidden="true"></span>
                              <span class="vl-u-visually-hidden">Venster sluiten</span>
                          </button>`
                        : nothing}
                </dialog>
            </div>
        `;
    }

    protected firstUpdated() {
        const dialog = this._dialogElement!;
        this._dialogListeners.forEach(([event, callback]) => dialog.addEventListener(event, callback));
    }

    protected updated(changedProperties: PropertyValues) {
        if (changedProperties.has('_opened')) {
            this._syncDialog();
        }
        if (changedProperties.has('_modalId')) {
            this._bindOpenTriggers();
        }
        if (changedProperties.has('title') || changedProperties.has('label')) {
            if (!this.title && !this.label) {
                console.warn('vl-modal: title of label attribuut is verplicht.');
            }
        }
    }

    /**
     * Handmatig openen van modal.
     */
    open() {
        this._requestOpen(null);
    }

    /**
     * Handmatig sluiten van modal.
     */
    close() {
        if (this.isOpen()) {
            this._opened = false;
            this._syncDialog();
        } else if (this._opened) {
            this._opened = false;
            this._pendingTrigger = null;
        }
    }

    /**
     * Mogelijkheid om functies toe te voegen op events die op de dialog voorkomen.
     * @param {String} event
     * @param {Function} callback
     */
    on(event: string, callback: EventListenerOrEventListenerObject) {
        this._dialogListeners.push([event, callback]);
        this._dialogElement?.addEventListener(event, callback);
    }

    /**
     * Mogelijkheid om event listeners die op de dialog geplaatst zijn te verwijderen.
     * Zie dat je dezelfde referentie voor de callback meegeeft als bij het toevoegen van de event listener.
     * @param {String} event
     * @param {Function} callback
     */
    off(event: string, callback: EventListenerOrEventListenerObject) {
        this._dialogListeners = this._dialogListeners.filter(([e, cb]) => e !== event || cb !== callback);
        this._dialogElement?.removeEventListener(event, callback);
    }

    /**
     * Geeft terug of de modal geopend is.
     * @return {boolean}
     */
    isOpen() {
        return !!this._dialogElement?.open;
    }

    private _requestOpen(trigger: HTMLElement | null) {
        if (this.isOpen()) {
            return;
        }
        this._pendingTrigger = trigger;
        this._opened = true;
        if (this.hasUpdated) {
            this._syncDialog();
        }
    }

    private _syncDialog() {
        const dialog = this._dialogElement;
        if (!dialog || !dialog.isConnected) {
            return;
        }
        if (this._opened && !dialog.open) {
            if (this._shown) {
                this._finishClose();
                this._opened = true;
            }
            this._lastTrigger = this._pendingTrigger ?? this._deepActiveElement();
            this._pendingTrigger = null;
            this._lastFocusedInside = null;
            dialog.showModal();
            this._shown = true;
            VlModalComponent._openModals.push(this);
            if (this.focusOnModal) {
                dialog.focus();
            }
            document.body.classList.add('vl-u-no-overflow');
            document.addEventListener('keydown', this._onDocumentKeydown, true);
            this.dispatchEvent(new CustomEvent('vl-open', { bubbles: true, composed: true }));
        } else if (!this._opened && dialog.open) {
            dialog.close();
            this._finishClose();
        }
    }

    private _bindOpenTriggers() {
        this._triggerController?.abort();
        this._triggerController = new AbortController();
        if (!this._modalId) {
            return;
        }
        const { signal } = this._triggerController;
        const selector = `[modal-open="${this._modalId}"],[data-modal-open="${this._modalId}"]`;
        this._findOpenTriggers(selector).forEach((trigger) => {
            trigger.addEventListener(
                'click',
                (event) => {
                    this._requestOpen(trigger);
                    event.preventDefault();
                },
                { signal }
            );
        });
    }

    private _findOpenTriggers(selector: string): HTMLElement[] {
        const triggers = Array.from(document.querySelectorAll<HTMLElement>(selector));
        let node: Node | null = this.parentNode;
        while (node) {
            if (node instanceof ShadowRoot) {
                triggers.push(...Array.from(node.querySelectorAll<HTMLElement>(selector)));
                node = node.host.parentNode;
            } else if (node instanceof Element) {
                node = node.parentNode;
            } else {
                break;
            }
        }
        return triggers;
    }

    private _onDialogClick = (event: MouseEvent) => {
        const dialog = this._dialogElement!;
        const path = event.composedPath();
        const insideDialog = path.slice(0, path.indexOf(dialog));
        const clickedCloseTrigger = insideDialog.some(
            (node) =>
                node instanceof Element &&
                node.getRootNode() === this.shadowRoot &&
                CLOSE_ATTRIBUTES.some((attribute) => node.hasAttribute(attribute))
        );
        if (clickedCloseTrigger) {
            this.close();
            return;
        }
        const startedOnBackdrop = this._pointerDownOnBackdrop;
        this._pointerDownOnBackdrop = false;
        if (this.closable && startedOnBackdrop && this._isOnBackdrop(event)) {
            this.close();
        }
    };

    private _onDialogPointerdown = (event: PointerEvent) => {
        this._pointerDownOnBackdrop = this._isOnBackdrop(event);
    };

    private _isOnBackdrop(event: MouseEvent) {
        const dialog = this._dialogElement!;
        if (event.target !== dialog) {
            return false;
        }
        const bounds = dialog.getBoundingClientRect();
        return (
            event.clientY <= bounds.top ||
            event.clientY >= bounds.bottom ||
            event.clientX <= bounds.left ||
            event.clientX >= bounds.right
        );
    }

    private _onDialogKeydown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && !this.closable && this._isTopModal()) {
            event.preventDefault();
            event.stopPropagation();
        }
    };

    private _onDocumentKeydown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && !this.closable && this._isTopModal()) {
            event.preventDefault();
        }
    };

    private _restoreFocus(trigger: HTMLElement | null) {
        if (!trigger) {
            return;
        }
        trigger.focus();
        if (!trigger.matches(':focus-within')) {
            trigger.shadowRoot?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus();
        }
    }

    private _onDialogFocusin = (event: FocusEvent) => {
        this._lastFocusedInside = event.composedPath()[0] as HTMLElement;
    };

    private _deepActiveElement(): HTMLElement | null {
        let active = document.activeElement;
        while (active?.shadowRoot?.activeElement) {
            active = active.shadowRoot.activeElement;
        }
        return active instanceof HTMLElement && active !== document.body ? active : null;
    }

    private _isTopModal() {
        const openModals = VlModalComponent._openModals.filter((modal) => modal.isOpen());
        return openModals[openModals.length - 1] === this;
    }

    private _onDialogClose = () => {
        if (!this._dialogElement?.open) {
            this._finishClose();
        }
    };

    private _finishClose() {
        if (!this._shown) {
            return;
        }
        this._shown = false;
        VlModalComponent._openModals = VlModalComponent._openModals.filter((modal) => modal !== this);
        document.removeEventListener('keydown', this._onDocumentKeydown, true);
        this._restoreFocus(this._lastTrigger);
        this._lastTrigger = null;
        if (VlModalComponent._openModals.length === 0) {
            document.body.classList.remove('vl-u-no-overflow');
        }
        this._opened = false;
        this.dispatchEvent(new CustomEvent('vl-close', { bubbles: true, composed: true }));
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-modal': VlModalComponent;
    }
}
