import { BaseLitElement, registerWebComponents, webComponent } from '@domg-wc/common';
import { CSSResult, html, HTMLTemplateResult, PropertyDeclarations } from 'lit';
import { VlAlert } from '../alert';
import { VlAlertModel } from '../alert/vl-alert.model';
import { toasterStyles } from './vl-toaster.css';
import { toasterDefaults } from './vl-toaster.defaults';
import { Placement } from './vl-toaster.model';

registerWebComponents([VlAlert]);

@webComponent('vl-toaster')
export class VlToasterComponent extends BaseLitElement {
    private fadeOut = toasterDefaults.fadeOut;
    private placement: Placement = toasterDefaults.placement;

    private abortController = new AbortController();

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
        return html` <output class="vl-toaster"></output> `;
    }

    disconnectedCallback() {
        this.abortController.abort('animationend');
    }

    show(target?: string | HTMLElement): void {
        let toast;
        const firstChild = this.children[0]?.cloneNode(true) as HTMLElement;
        if (!target && firstChild) {
            toast = firstChild;
        } else if (target && typeof target === 'string') {
            const foundElement = this.querySelector(target);
            toast = foundElement?.cloneNode(true) as HTMLElement;
            // we verwijderen het id attribuut op de gekloonde node om dubbele id's te voorkomen
            toast.removeAttribute('id');
        } else if (target instanceof HTMLElement) {
            toast = target as HTMLElement;
        }
        if (!toast) {
            return;
        }

        this.showToast(toast);
    }

    showAlert(alert: VlAlertModel) {
        const vlAlert = document.createElement('vl-alert');
        Object.entries(alert).forEach(([key, value]) => {
            if (value) {
                vlAlert.setAttribute(`data-vl-${key}`, value);
            }
        });
        this.appendChild(vlAlert);
        this.showToast(vlAlert);
    }

    private showToast(toast: HTMLElement) {
        if (this.placement === 'bottom-right' || this.placement === 'bottom-left') {
            this.shadowRoot?.appendChild(toast);
        } else {
            this.shadowRoot?.prepend(toast);
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
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-toaster': VlToasterComponent;
    }
}
