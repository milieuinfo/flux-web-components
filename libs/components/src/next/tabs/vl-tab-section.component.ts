import { BaseLitElement, webComponent } from '@domg-wc/common-utilities';

@webComponent('vl-tab-section-next')
export class VlTabSectionComponent extends BaseLitElement {
    static get is() {
        return 'vl-tab-section-next';
    }

    connectedCallback() {
        super.connectedCallback();
        this.processClasses();
        this.processAttributes();
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }

    private processClasses() {
        this.classList.add('vl-tab__pane');
    }

    private processAttributes() {
        this.setAttribute('tab-pane', '');
        this.setAttribute('tabindex', '0');
        this.setAttribute('role', 'tabpanel');
        this.setAttribute('hidden', 'hidden');
        this.setAttribute('aria-labelledby', `${this.id}-tab`);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-tab-section-next': VlTabSectionComponent;
    }
}
