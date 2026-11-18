import { BaseLitElement, registerWebComponents, webComponent } from '@domg-wc/common';
import { CSSResult, html, HTMLTemplateResult, PropertyDeclarations } from 'lit';
import { VlAlert } from '../alert';
import { VlAlertAttributes } from '../alert/vl-alert.model';
import { toasterStyles } from './vl-toaster.css';
import { toasterDefaults } from './vl-toaster.defaults';
import { Placement } from './vl-toaster.model';

registerWebComponents([VlAlert]);

const MODAL_TAG_NAMES = ['VL-MODAL', 'VL-MODAL-NEXT'];

// Niet via showPopover op het prototype: de popover-polyfill van vl-datepicker voegt die methode toe, maar kan geen
// echte top layer nabootsen en blijft dus onder een modal dialog. CSS.supports herkent enkel native support.
const supportsTopLayer = (): boolean => typeof CSS !== 'undefined' && !!CSS.supports?.('selector(:popover-open)');

// vl-accordion verstuurt vl-open en vl-close ook.
const isModal = (source?: EventTarget): source is HTMLElement =>
    source instanceof HTMLElement && MODAL_TAG_NAMES.includes(source.tagName);

// De <dialog> van vl-modal en vl-modal-next zit in hun shadow root en is vanuit document niet te vinden.
const hasOpenModalDialog = (modal: Element): boolean => !!modal.shadowRoot?.querySelector('dialog:modal');

@webComponent('vl-toaster')
export class VlToasterComponent extends BaseLitElement {
    // properties
    private fadeOut = toasterDefaults.fadeOut;
    private placement: Placement = toasterDefaults.placement;
    // state
    private abortController = new AbortController();
    private initialized = false;
    private openModals = new Set<Element>();

    static get styles(): (CSSResult | CSSResult[])[] {
        return [toasterStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            fadeOut: { type: Boolean, attribute: 'fade-out' },
            placement: { type: String },
        };
    }

    render(): HTMLTemplateResult {
        return html`
            <output class="vl-toaster">
                <slot></slot>
            </output>
        `;
    }

    connectedCallback() {
        super.connectedCallback();
        this.abortController = new AbortController();
        if (!supportsTopLayer()) {
            return;
        }
        const { signal } = this.abortController;
        document.addEventListener('vl-open', this.onModalOpen, { signal });
        document.addEventListener('vl-close', this.onModalClose, { signal });
        // close is niet composed en bubbelt niet: zo volgen we ook een eigen <dialog> van de pagina
        document.addEventListener('close', this.syncTopLayer, { capture: true, signal });
        // een modal die openging terwijl de toaster niet verbonden was, heeft zijn vl-open al verstuurd
        document.querySelectorAll('vl-modal, vl-modal-next').forEach((modal) => this.openModals.add(modal));
        this.syncTopLayer();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.abortController.abort();
    }

    protected firstUpdated() {
        this.syncTopLayer();
    }

    /**
     * Wanneer aangeroepen zonder argument, wordt het eerste element in de toaster getoond.
     * Je kan ook een specifiek element tonen door een selector mee te geven of een HTMLElement.
     * @param target
     */
    show(target?: string | HTMLElement): void {
        let toast;
        const firstChild = this.children[0]?.cloneNode(true) as HTMLElement;
        if (!target && firstChild) {
            toast = firstChild;
            // we verwijderen het id attribuut op de gekloonde node om dubbele id's te voorkomen
            toast?.removeAttribute('id');
            toast?.removeAttribute('slot');
        } else if (target && typeof target === 'string') {
            const foundElement = document.querySelector(target);
            if (foundElement instanceof HTMLTemplateElement) {
                const documentFragment = foundElement.content.cloneNode(true) as DocumentFragment;
                toast = documentFragment?.firstElementChild as HTMLElement;
            } else {
                toast = foundElement?.cloneNode(true) as HTMLElement;
            }
            // we verwijderen het id attribuut op de gekloonde node om dubbele id's te voorkomen
            toast?.removeAttribute('id');
            toast?.removeAttribute('slot');
        } else if (target instanceof HTMLElement) {
            toast = target as HTMLElement;
        }
        if (!toast) {
            return;
        }

        this.showToast(toast);
    }

    /**
     * Toont een vl-alert in de toaster met de opgegeven attributen.
     * @param alert
     */
    showAlert(alert: VlAlertAttributes) {
        const vlAlert = document.createElement('vl-alert');
        Object.entries(alert).forEach(([key, value]) => {
            if (value) {
                vlAlert.setAttribute(`${key}`, value);
            }
        });
        this.showToast(vlAlert);
    }

    private get outputElement(): HTMLElement | null | undefined {
        return this.shadowRoot?.querySelector('output');
    }

    private showToast = async (toast: HTMLElement) => {
        // wacht tot <output> element is gerenderd
        if (!this.initialized) {
            this.initialized = true;
            await this.updateComplete;
        }

        if (this.placement === 'bottom-right' || this.placement === 'bottom-left') {
            this.outputElement?.appendChild(toast);
        } else {
            this.outputElement?.prepend(toast);
        }
        this.syncTopLayer();
        if (this.fadeOut) {
            toast.addEventListener(
                'animationend',
                (animationEvent) => {
                    if (animationEvent?.animationName === 'fade-out') {
                        toast.remove();
                    }
                },
                { signal: this.abortController.signal }
            );
        }
    };

    private onModalOpen = (event: Event) => {
        const source = event.composedPath()[0];
        if (isModal(source)) {
            this.openModals.add(source);
            this.syncTopLayer();
        }
    };

    private onModalClose = (event: Event) => {
        if (isModal(event.composedPath()[0])) {
            this.syncTopLayer();
        }
    };

    private hasOpenModal(): boolean {
        this.openModals.forEach((modal) => {
            if (!hasOpenModalDialog(modal)) {
                this.openModals.delete(modal);
            }
        });
        return this.openModals.size > 0 || !!document.querySelector('dialog:modal');
    }

    // Een modal die later opent, komt boven een al open popover te staan: daarom telkens sluiten en opnieuw openen.
    private syncTopLayer = (): void => {
        const output = this.outputElement;
        if (!output || !supportsTopLayer()) {
            return;
        }
        if (!this.isConnected || !this.hasOpenModal()) {
            output.removeAttribute('popover');
            return;
        }
        output.setAttribute('popover', 'manual');
        if (output.matches(':popover-open')) {
            output.hidePopover();
        }
        output.showPopover();
    };
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-toaster': VlToasterComponent;
    }
}
