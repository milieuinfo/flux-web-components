import { BaseLitElement, registerWebComponents, webComponent } from '@domg-wc/common';
import { CSSResult, html, HTMLTemplateResult, PropertyDeclarations } from 'lit';
import { VlAlert } from '../alert';
import { VlAlertAttributes } from '../alert/vl-alert.model';
import { toasterStyles } from './vl-toaster.css';
import { toasterDefaults } from './vl-toaster.defaults';
import { Placement, VlToastOptions } from './vl-toaster.model';

registerWebComponents([VlAlert]);

@webComponent('vl-toaster')
export class VlToasterComponent extends BaseLitElement {
    // properties
    private fadeOut = toasterDefaults.fadeOut;
    private placement: Placement = toasterDefaults.placement;

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
     * @param alert
     * @param options `fadeOut` kiest voor deze toast of hij vanzelf verdwijnt, los van `fade-out` op de toaster.
     */
    showAlert(alert: VlAlertAttributes, options?: VlToastOptions) {
        const vlAlert = document.createElement('vl-alert');
        Object.entries(alert).forEach(([key, value]) => {
            if (value) {
                vlAlert.setAttribute(`${key}`, value);
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
        toast.addEventListener('animationend', this.removeFadedOutToast);
    };

    // animationend bubbelt: enkel het einde van de fade-out van de toast zelf mag hem verwijderen
    private removeFadedOutToast = (event: AnimationEvent) => {
        if (event.animationName === 'fade-out' && event.target === event.currentTarget) {
            (event.currentTarget as HTMLElement).remove();
        }
    };
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-toaster': VlToasterComponent;
    }
}
