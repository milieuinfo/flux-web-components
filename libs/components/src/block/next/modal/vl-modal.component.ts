import { BaseLitElement, registerWebComponents, webComponent } from '@domg-wc/common';
import { vlGridStyles, vlGroupStyles, vlStackedStyles } from '@domg-wc/styles';
import { accessibilityStyle, resetStyle } from '@domg/govflanders-style/common';
import { modalStyle } from '@domg/govflanders-style/component';
import { CSSResult, html, nothing, PropertyValues, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { vlIconStyles } from '../../../atom/icon-style/vl-icon-style.css';
import { VlLinkComponent } from '../../../atom/link';
import { vlModalStyles } from './vl-modal.css';
import { CLOSE_ATTRIBUTES, DIALOG_MODIFIERS, FOCUSABLE_SELECTOR } from './vl-modal.model';

@webComponent('vl-modal-next')
export class VlModalComponent extends BaseLitElement {
    @property({ type: String, attribute: 'id' })
    private modalId = '';

    @property({ type: String, attribute: 'title-label' })
    titleLabel = '';

    @property({ type: String, attribute: 'label' })
    label = '';

    @property({ type: Boolean, attribute: 'closable' })
    closable = false;

    @property({ type: Boolean, attribute: 'not-cancellable' })
    notCancellable = false;

    @property({ type: Boolean, attribute: 'open', reflect: true })
    private opened = false;

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

    private triggerController?: AbortController;
    private pendingTrigger: HTMLElement | null = null;
    private lastTrigger: HTMLElement | null = null;
    private lastFocusedInside: HTMLElement | null = null;
    private shown = false;
    private pointerDownOnBackdrop = false;
    private static openModals: VlModalComponent[] = [];
    private dialogListeners: [string, EventListenerOrEventListenerObject][] = [];

    static {
        registerWebComponents([VlLinkComponent]);
    }

    static get styles(): CSSResult[] {
        return [
            resetStyle,
            modalStyle,
            vlModalStyles,
            accessibilityStyle,
            vlGroupStyles,
            vlGridStyles,
            vlStackedStyles,
            vlIconStyles,
        ];
    }

    private get dialogElement(): HTMLDialogElement | null {
        return this.shadowRoot?.querySelector('dialog') ?? null;
    }

    connectedCallback() {
        super.connectedCallback();
        this.bindOpenTriggers();
        const dialog = this.dialogElement;
        if (this.shown && dialog?.open && !dialog.matches(':modal')) {
            dialog.addEventListener('close', (event) => event.stopImmediatePropagation(), {
                capture: true,
                once: true,
            });
            const focused = this.lastFocusedInside;
            dialog.close();
            dialog.showModal();
            VlModalComponent.openModals = [...VlModalComponent.openModals.filter((modal) => modal !== this), this];
            if (focused?.isConnected) {
                focused.focus();
            }
        } else if (this.hasUpdated && this.opened && !this.isOpen()) {
            this.syncDialog();
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.triggerController?.abort();
        queueMicrotask(() => {
            if (this.isConnected) {
                return;
            }
            if (this.dialogElement?.open) {
                this.dialogElement.close();
            }
            this.finishClose();
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
                    id=${this.modalId || 'modal-dialog'}
                    tabindex="-1"
                    aria-modal="true"
                    aria-hidden=${this.opened ? 'false' : 'true'}
                    aria-labelledby=${ifDefined(this.titleLabel ? 'modal-toggle-title' : undefined)}
                    aria-label=${ifDefined(!this.titleLabel && this.label ? this.label : undefined)}
                    @pointerdown=${this.onDialogPointerdown}
                    @focusin=${this.onDialogFocusin}
                    @click=${this.onDialogClick}
                    @keydown=${this.onDialogKeydown}
                    @close=${this.onDialogClose}
                >
                    <div class="vl-modal-dialog__wrapper" id="modal-dialog-wrapper">
                        ${this.titleLabel
                            ? html`<h2 class="vl-modal-dialog__title" id="modal-toggle-title">${this.titleLabel}</h2>`
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
                        ? html`<button id="close" type="button" class="vl-modal-dialog__close" data-modal-close>
                              <span
                                  class="vl-modal-dialog__close__icon vl-icon vl-icon--cross"
                                  aria-hidden="true"
                              ></span>
                              <span class="vl-u-visually-hidden">Venster sluiten</span>
                          </button>`
                        : nothing}
                </dialog>
            </div>
        `;
    }

    protected firstUpdated() {
        const dialog = this.dialogElement!;
        this.dialogListeners.forEach(([event, callback]) => dialog.addEventListener(event, callback));
    }

    protected updated(changedProperties: PropertyValues) {
        if (changedProperties.has('opened')) {
            this.syncDialog();
        }
        if (changedProperties.has('modalId')) {
            this.bindOpenTriggers();
        }
        if (changedProperties.has('titleLabel') || changedProperties.has('label')) {
            if (!this.titleLabel && !this.label) {
                console.warn('vl-modal-next: title-label of label attribuut is verplicht.');
            }
        }
    }

    /**
     * Handmatig openen van modal.
     */
    open() {
        this.requestOpen(null);
    }

    /**
     * Handmatig sluiten van modal.
     */
    close() {
        if (this.isOpen()) {
            this.opened = false;
            this.syncDialog();
        } else if (this.opened) {
            this.opened = false;
            this.pendingTrigger = null;
        }
    }

    /**
     * Mogelijkheid om functies toe te voegen op events die op de dialog voorkomen.
     * @param {String} event
     * @param {Function} callback
     */
    on(event: string, callback: EventListenerOrEventListenerObject) {
        this.dialogListeners.push([event, callback]);
        this.dialogElement?.addEventListener(event, callback);
    }

    /**
     * Mogelijkheid om event listeners die op de dialog geplaatst zijn te verwijderen.
     * Zie dat je dezelfde referentie voor de callback meegeeft als bij het toevoegen van de event listener.
     * @param {String} event
     * @param {Function} callback
     */
    off(event: string, callback: EventListenerOrEventListenerObject) {
        this.dialogListeners = this.dialogListeners.filter(([e, cb]) => e !== event || cb !== callback);
        this.dialogElement?.removeEventListener(event, callback);
    }

    /**
     * Geeft terug of de modal geopend is.
     * @return {boolean}
     */
    isOpen() {
        return !!this.dialogElement?.open;
    }

    private requestOpen(trigger: HTMLElement | null) {
        if (this.isOpen()) {
            return;
        }
        this.pendingTrigger = trigger;
        this.opened = true;
        if (this.hasUpdated) {
            this.syncDialog();
        }
    }

    /**
     * Brengt de native `<dialog>` in lijn met de `opened` property: opent de dialog via `showModal()` als `opened` true
     * is maar de dialog nog dicht is, en sluit hem in het omgekeerde geval. Doet niets zolang de dialog niet gerenderd
     * of niet verbonden is; `connectedCallback` roept de methode dan opnieuw aan.
     */
    private syncDialog() {
        const dialog = this.dialogElement;
        if (!dialog || !dialog.isConnected) {
            return;
        }
        if (this.opened && !dialog.open) {
            if (this.shown) {
                this.finishClose();
                this.opened = true;
            }
            this.lastTrigger = this.pendingTrigger ?? this.deepActiveElement();
            this.pendingTrigger = null;
            this.lastFocusedInside = null;
            dialog.showModal();
            this.shown = true;
            VlModalComponent.openModals.push(this);
            if (this.focusOnModal) {
                dialog.focus();
            }
            document.body.classList.add('vl-u-no-overflow');
            document.addEventListener('keydown', this.onDocumentKeydown, true);
            this.toggleAttribute('open', true);
            this.dispatchEvent(new CustomEvent('vl-open', { bubbles: true, composed: true }));
        } else if (!this.opened && dialog.open) {
            dialog.close();
            this.finishClose();
        }
    }

    private bindOpenTriggers() {
        this.triggerController?.abort();
        this.triggerController = new AbortController();
        if (!this.modalId) {
            return;
        }
        const { signal } = this.triggerController;
        const selector = `[modal-open="${this.modalId}"],[data-modal-open="${this.modalId}"]`;
        this.findOpenTriggers(selector).forEach((trigger) => {
            trigger.addEventListener(
                'click',
                (event) => {
                    this.requestOpen(trigger);
                    event.preventDefault();
                },
                { signal },
            );
        });
    }

    private findOpenTriggers(selector: string): HTMLElement[] {
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

    private onDialogClick = (event: MouseEvent) => {
        const dialog = this.dialogElement!;
        const path = event.composedPath();
        const insideDialog = path.slice(0, path.indexOf(dialog));
        const clickedCloseTrigger = insideDialog.some(
            (node) =>
                node instanceof Element &&
                node.getRootNode() === this.shadowRoot &&
                CLOSE_ATTRIBUTES.some((attribute) => node.hasAttribute(attribute)),
        );
        if (clickedCloseTrigger) {
            this.close();
            return;
        }
        const startedOnBackdrop = this.pointerDownOnBackdrop;
        this.pointerDownOnBackdrop = false;
        if (this.closable && startedOnBackdrop && this.isOnBackdrop(event)) {
            this.close();
        }
    };

    private onDialogPointerdown = (event: PointerEvent) => {
        this.pointerDownOnBackdrop = this.isOnBackdrop(event);
    };

    private isOnBackdrop(event: MouseEvent) {
        const dialog = this.dialogElement!;
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

    private onDialogKeydown = (event: KeyboardEvent) => {
        // enkel de bovenste open modal reageert op Escape, niet een modal eronder
        if (event.key !== 'Escape' || !this.isTopModal()) {
            return;
        }
        // niet-closable: Escape tegenhouden, zodat de native dialog niet sluit
        if (!this.closable) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        // closable: een echte Escape sluit de native dialog zelf; een nagebootste (isTrusted false) niet, dus die
        // sluit de modal hier, tenzij de inhoud ze al afhandelde
        if (!event.isTrusted && !event.defaultPrevented) {
            this.close();
            event.preventDefault();
        }
    };

    private onDocumentKeydown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && !this.closable && this.isTopModal()) {
            event.preventDefault();
        }
    };

    private restoreFocus(trigger: HTMLElement | null) {
        if (!trigger) {
            return;
        }
        trigger.focus();
        if (!trigger.matches(':focus-within')) {
            trigger.shadowRoot?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus();
        }
    }

    private onDialogFocusin = (event: FocusEvent) => {
        this.lastFocusedInside = event.composedPath()[0] as HTMLElement;
    };

    private deepActiveElement(): HTMLElement | null {
        let active = document.activeElement;
        while (active?.shadowRoot?.activeElement) {
            active = active.shadowRoot.activeElement;
        }
        return active instanceof HTMLElement && active !== document.body ? active : null;
    }

    private isTopModal() {
        const openModals = VlModalComponent.openModals.filter((modal) => modal.isOpen());
        return openModals[openModals.length - 1] === this;
    }

    private onDialogClose = () => {
        if (!this.dialogElement?.open) {
            this.finishClose();
        }
    };

    /**
     * Ruimt op na het sluiten, langs welke weg de modal ook sluit: haalt de modal uit de lijst van open modals, zet de
     * focus terug op de trigger, verwijdert `vl-u-no-overflow` als er geen andere modal meer open is, zet `opened` op
     * false en vuurt `vl-close`. Loopt maar één keer per sluiting, ook als hij vanuit meerdere plaatsen aangeroepen
     * wordt.
     */
    private finishClose() {
        if (!this.shown) {
            return;
        }
        this.shown = false;
        VlModalComponent.openModals = VlModalComponent.openModals.filter((modal) => modal !== this);
        document.removeEventListener('keydown', this.onDocumentKeydown, true);
        this.restoreFocus(this.lastTrigger);
        this.lastTrigger = null;
        if (VlModalComponent.openModals.length === 0) {
            document.body.classList.remove('vl-u-no-overflow');
        }
        this.opened = false;
        this.toggleAttribute('open', false);
        this.dispatchEvent(new CustomEvent('vl-close', { bubbles: true, composed: true }));
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-modal-next': VlModalComponent;
    }
}
