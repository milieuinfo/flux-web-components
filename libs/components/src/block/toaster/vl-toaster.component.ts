import { BaseLitElement, registerWebComponents, webComponent } from '@domg-wc/common';
import { CSSResult, html, HTMLTemplateResult, PropertyDeclarations } from 'lit';
import { VlAlert } from '../alert';
import { VlAlertAttributes, VlAlertModel } from '../alert/vl-alert.model';
import { toasterStyles } from './vl-toaster.css';
import { toasterDefaults } from './vl-toaster.defaults';
import { Placement, VlToastOptions } from './vl-toaster.model';

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
    private openModals = new Set<Element>();

    static get styles(): (CSSResult | CSSResult[])[] {
        return [toasterStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            fadeOut: { type: Boolean, attribute: 'fade-out', reflect: true },
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
        // toggle en close zijn niet composed en bubbelen niet: in capture volgen we zo ook een eigen <dialog> van de
        // pagina. Browsers met de Popover API maar zonder toggle op een <dialog> sturen bij het sluiten enkel close.
        document.addEventListener('toggle', this.onDialogChange, { capture: true, signal });
        document.addEventListener('close', this.onDialogChange, { capture: true, signal });
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
     * @param options `fadeOut` kiest voor deze toast of hij vanzelf verdwijnt, los van `fade-out` op de toaster.
     */
    show(target?: string | HTMLElement, options?: VlToastOptions): void {
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

        this.showToast(toast, options);
    }

    /**
     * Toont een vl-alert in de toaster met de opgegeven attributen.
     * @param alert de attributen van de alert in camelCase (`titleLabel`) of met de attribuutnaam (`'title-label'`).
     * @param options `fadeOut` kiest voor deze toast of hij vanzelf verdwijnt, los van `fade-out` op de toaster.
     */
    showAlert(alert: VlAlertModel & VlAlertAttributes, options?: VlToastOptions) {
        const vlAlert = document.createElement('vl-alert');
        const { title, ...settings } = alert;
        // een key in camelCase wordt de attribuutnaam: `titleLabel` wordt `title-label`
        const attributes: Record<string, string | boolean | undefined> = Object.fromEntries(
            Object.entries(settings).map(([key, value]) => [key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`), value])
        );
        // `title` belandt als `title-label` op de alert; staan beide er, dan wint `title-label`
        attributes['title-label'] ||= title;
        Object.entries(attributes).forEach(([key, value]) => {
            if (value) {
                vlAlert.setAttribute(key, `${value}`);
            }
        });
        this.showToast(vlAlert, options);
    }

    private get outputElement(): HTMLElement | null | undefined {
        return this.shadowRoot?.querySelector('output');
    }

    private showToast = async (toast: HTMLElement, options?: VlToastOptions) => {
        if (options?.fadeOut !== undefined) {
            toast.toggleAttribute('fade-out', options.fadeOut);
            toast.toggleAttribute('persistent', !options.fadeOut);
        }

        // elke toast die getoond wordt vóór de eerste render, wacht tot het <output> element bestaat
        if (!this.hasUpdated) {
            await this.updateComplete;
        }

        if (this.placement === 'bottom-right' || this.placement === 'bottom-left') {
            this.outputElement?.appendChild(toast);
        } else {
            this.outputElement?.prepend(toast);
        }
        this.syncTopLayer();
        toast.addEventListener('animationend', this.removeFadedOutToast);
    };

    // animationend bubbelt: enkel het einde van de fade-out van de toast zelf mag hem verwijderen
    private removeFadedOutToast = (event: AnimationEvent) => {
        if (event.animationName === 'fade-out' && event.target === event.currentTarget) {
            (event.currentTarget as HTMLElement).remove();
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

    // toggle komt ook van <details> en van een popover: daarvoor gaat de toaster niet opnieuw naar boven
    private onDialogChange = (event: Event) => {
        if (event.target instanceof HTMLDialogElement) {
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
