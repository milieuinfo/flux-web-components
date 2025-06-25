import { BaseLitElement, webComponent } from '@domg-wc/common-utilities';

@webComponent('vl-side-navigation-group-next')
export class VlSideNavigationGroupComponent extends BaseLitElement {
    constructor() {
        super();
        this.classList.add('vl-side-navigation-next__group');
        this.setAttribute('role', 'list');
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-side-navigation-group-next': VlSideNavigationGroupComponent;
    }
}
