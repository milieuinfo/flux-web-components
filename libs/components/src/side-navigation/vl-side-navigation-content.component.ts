import { BaseLitElement, webComponent } from '@domg-wc/common';

@webComponent('vl-side-navigation-content')
export class VlSideNavigationContentComponent extends BaseLitElement {
    constructor() {
        super();
        this.classList.add('vl-side-navigation__content');
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-side-navigation-content': VlSideNavigationContentComponent;
    }
}
