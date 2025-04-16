import { BaseLitElement, webComponent } from '@domg-wc/common';

@webComponent('vl-side-navigation-reference')
export class VlSideNavigationReferenceComponent extends BaseLitElement {
    constructor() {
        super();
        this.setAttribute('scrollspy-content', '');
        this.classList.add('js-vl-scrollspy__content');
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-side-navigation-reference': VlSideNavigationReferenceComponent;
    }
}
