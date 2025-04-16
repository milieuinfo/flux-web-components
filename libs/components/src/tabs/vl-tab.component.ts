import { BaseLitElement, webComponent } from '@domg-wc/common';
import { PropertyDeclarations } from 'lit';

@webComponent('vl-tab')
export class VlTabComponent extends BaseLitElement {
    private href: string = '';
    private disableLink: boolean = false;
    private withinFunctionalHeader: boolean = false;

    static get is() {
        return 'vl-tab';
    }

    static get properties(): PropertyDeclarations {
        return {
            href: { type: String },
            disableLink: { type: Boolean, attribute: 'disable-link' },
            withinFunctionalHeader: { type: Boolean, attribute: 'within-functional-header' },
        };
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }

    connectedCallback() {
        super.connectedCallback();

        this.processClasses();
        this.processLinkElement();
    }

    protected updated(changedProperties: Map<string, unknown>): void {
        super.updated(changedProperties);

        if (changedProperties.has('href')) {
            if (!this.hasAttribute('disable-link')) {
                this.linkElement?.setAttribute('href', this.href);
                this.linkElement?.setAttribute('aria-controls', `${this.href}-pane`);
            }
        }
        if (changedProperties.has('id')) {
            if (this.linkElement) {
                this.linkElement.id = this.id;
            }
        }
        if (changedProperties.has('withinFunctionalHeader')) {
            if (this.withinFunctionalHeader) {
                this.linkElement?.classList.add('vl-link');
            } else {
                this.linkElement?.classList.remove('vl-link');
            }
        }
    }

    activate() {
        this.linkElement?.click();
    }

    get isActive() {
        return this.classList.contains('vl-tab--active');
    }

    private get linkElement(): HTMLElement | null {
        return this.querySelector('.vl-tab__link');
    }

    private get linkElementTemplate(): HTMLAnchorElement {
        const a: HTMLAnchorElement = document.createElement('a');
        a.classList.add('vl-tab__link');
        a.setAttribute('tab', '');
        return a;
    }

    private processClasses() {
        this.classList.add('vl-tab');
    }

    private processLinkElement() {
        const a = this.linkElementTemplate;
        const slot = this.querySelector('slot');
        if (slot) {
            a.appendChild(slot);
        }
        a.addEventListener('click', (event: any) => {
            this.dispatchActiveTabChangedEvent(event);
        });
        this.appendChild(a);
    }

    private dispatchActiveTabChangedEvent(event: any) {
        if (!this.isActive) {
            this.dispatchEvent(new CustomEvent('change', { detail: { activeTab: this.id }, composed: true }));
        }
        // enkel als de gebruiker expliciet klikte een `vl-click` event sturen
        if (event.screenX && event.screenY) {
            this.dispatchEvent(new CustomEvent('vl-click', { detail: { activeTab: this.id }, composed: true }));
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-tab': VlTabComponent;
    }
}
