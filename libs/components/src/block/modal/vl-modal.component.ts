import { BaseLitElement, registerWebComponents, webComponent } from '@domg-wc/common';
import { vlGridStyles, vlGroupStyles, vlStackedStyles } from '@domg-wc/styles';
import { accessibilityStyle, resetStyle } from '@domg/govflanders-style/common';
import { modalStyle } from '@domg/govflanders-style/component';
import { CSSResult, html, nothing, PropertyDeclarations, PropertyValues, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { vlIconStyles } from '../../atom/icon-style/vl-icon-style.css';
import { VlLinkComponent } from '../../atom/link';
import { vlModalFluxStyles } from './vl-modal.flux-css';

const DIALOG_MODIFIERS = ['medium', 'large', 'full-screen', 'left', 'right'];
const CLOSE_ATTRIBUTES = ['modal-close', 'data-modal-close'];

@webComponent('vl-modal')
export class VlModalComponent extends BaseLitElement {
    modalId = '';
    title = '';
    label = '';
    closable = false;
    notCancellable = false;
    opened = false;
    notAutoClosable = false;
    allowOverflow = false;
    size = '';
    position = '';
    focusOnModal = false;

    private _triggerController?: AbortController;
    private _pendingTrigger: HTMLElement | null = null;
    private _lastTrigger: HTMLElement | null = null;
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

    static get properties(): PropertyDeclarations {
        return {
            modalId: { type: String, attribute: 'id' },
            title: { type: String, attribute: 'title' },
            label: { type: String, attribute: 'label' },
            closable: { type: Boolean, attribute: 'closable' },
            notCancellable: { type: Boolean, attribute: 'not-cancellable' },
            opened: { type: Boolean, attribute: 'open', reflect: true },
            notAutoClosable: { type: Boolean, attribute: 'not-auto-closable' },
            allowOverflow: { type: Boolean, attribute: 'allow-overflow' },
            size: { type: String, attribute: 'size' },
            position: { type: String, attribute: 'position' },
            focusOnModal: { type: Boolean, attribute: 'focus-on-modal' },
        };
    }

    get _dialogElement(): HTMLDialogElement | null {
        return this.shadowRoot?.querySelector('dialog') ?? null;
    }

    connectedCallback() {
        super.connectedCallback();
        this._bindOpenTriggers();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._triggerController?.abort();
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
                    id=${this.modalId || 'modal-dialog'}
                    tabindex="-1"
                    aria-modal="true"
                    aria-hidden=${this.opened ? 'false' : 'true'}
                    aria-labelledby=${ifDefined(this.title ? 'modal-toggle-title' : undefined)}
                    aria-label=${ifDefined(!this.title && this.label ? this.label : undefined)}
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
                                    <slot
                                        name="button"
                                        ?data-modal-close=${!this.notAutoClosable}
                                        aria-expanded=${ifDefined(this.notAutoClosable ? undefined : 'true')}
                                    ></slot>
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
                              aria-expanded="true"
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

    protected updated(changedProperties: PropertyValues<this>) {
        if (changedProperties.has('opened')) {
            this._syncDialog();
        }
        if (changedProperties.has('modalId')) {
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
            this.opened = false;
            this._syncDialog();
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
        this.opened = true;
        if (this.hasUpdated) {
            this._syncDialog();
        }
    }

    private _syncDialog() {
        const dialog = this._dialogElement;
        if (!dialog || !dialog.isConnected) {
            return;
        }
        if (this.opened && !dialog.open) {
            this._lastTrigger = this._pendingTrigger;
            this._pendingTrigger = null;
            dialog.showModal();
            if (this.focusOnModal) {
                dialog.focus();
            }
            document.body.classList.add('vl-u-no-overflow');
            this.dispatchEvent(new CustomEvent('vl-open', { bubbles: true, composed: true }));
        } else if (!this.opened && dialog.open) {
            dialog.close();
        }
    }

    private _bindOpenTriggers() {
        this._triggerController?.abort();
        this._triggerController = new AbortController();
        if (!this.modalId) {
            return;
        }
        const { signal } = this._triggerController;
        const selector = `[modal-open="${this.modalId}"],[data-modal-open="${this.modalId}"]`;
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
        if (this.closable && event.target === dialog) {
            const bounds = dialog.getBoundingClientRect();
            const isInDialog =
                event.clientY > bounds.top &&
                event.clientY < bounds.bottom &&
                event.clientX > bounds.left &&
                event.clientX < bounds.right;
            if (!isInDialog) {
                this.close();
            }
        }
    };

    private _onDialogKeydown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && !this.closable) {
            event.preventDefault();
            event.stopPropagation();
        }
    };

    private _onDialogClose = () => {
        this._lastTrigger?.focus();
        this._lastTrigger = null;
        document.body.classList.remove('vl-u-no-overflow');
        this.opened = false;
        this.dispatchEvent(new CustomEvent('vl-close', { bubbles: true, composed: true }));
    };
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-modal': VlModalComponent;
    }
}
