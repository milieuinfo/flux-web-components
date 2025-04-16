import { BaseLitElement, webComponent } from '@domg-wc/common';

@webComponent('vl-side-navigation-group')
export class VlSideNavigationGroupComponent extends BaseLitElement {
    constructor() {
        super();
        this.classList.add('vl-side-navigation__group');
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-side-navigation-group': VlSideNavigationGroupComponent;
    }
}
