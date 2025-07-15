import { BaseLitElement, registerWebComponents, webComponent } from '@domg-wc/common-utilities';
import { CSSResult, html, HTMLTemplateResult, PropertyDeclarations } from 'lit';
import { VlAlert } from '../../alert';
import { VlAlertModel } from '../../alert/vl-alert.model';
import { toasterStyles } from './vl-toaster.css';
import { toasterDefaults } from './vl-toaster.defaults';
import { Placement } from './vl-toaster.model';

registerWebComponents([VlAlert]);

@webComponent('vl-toaster-next')
export class VlToasterComponent extends BaseLitElement {
    // properties
    private fadeOut = toasterDefaults.fadeOut;
    private placement: Placement = toasterDefaults.placement;
    // state
    private abortController = new AbortController();
    private initialized = false;

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

    disconnectedCallback() {
        this.abortController.abort('animationend');
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
            toast = foundElement?.cloneNode(true) as HTMLElement;
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
     * Toont een vl-alert in de toaster met de opgegeven attributen/properties.
     * @param alert
     */
    showAlert(alert: VlAlertModel) {
        const vlAlert = document.createElement('vl-alert');
        Object.entries(alert).forEach(([key, value]) => {
            if (value) {
                vlAlert.setAttribute(`data-vl-${key}`, value);
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
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-toaster-next': VlToasterComponent;
    }
}
