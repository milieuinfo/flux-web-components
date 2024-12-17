import { BaseLitElement, webComponent } from '@domg-wc/common-utilities';

class VlSideNavigationTitleComponent extends BaseLitElement {
    connectedCallback() {
        super.connectedCallback();
        this.classList.add('vl-side-navigation-next__title');
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }
}

@webComponent('vl-side-navigation-h1-next')
export class VlSideNavigationH1 extends VlSideNavigationTitleComponent {}

@webComponent('vl-side-navigation-h2-next')
export class VlSideNavigationH2 extends VlSideNavigationTitleComponent {}

@webComponent('vl-side-navigation-h3-next')
export class VlSideNavigationH3 extends VlSideNavigationTitleComponent {}

@webComponent('vl-side-navigation-h4-next')
export class VlSideNavigationH4 extends VlSideNavigationTitleComponent {}

@webComponent('vl-side-navigation-h5-next')
export class VlSideNavigationH5 extends VlSideNavigationTitleComponent {}

@webComponent('vl-side-navigation-h6-next')
export class VlSideNavigationH6 extends VlSideNavigationTitleComponent {}

declare global {
    interface HTMLElementTagNameMap {
        'vl-side-navigation-h1-next': VlSideNavigationH1;
        'vl-side-navigation-h2-next': VlSideNavigationH2;
        'vl-side-navigation-h3-next': VlSideNavigationH3;
        'vl-side-navigation-h4-next': VlSideNavigationH4;
        'vl-side-navigation-h5-next': VlSideNavigationH5;
        'vl-side-navigation-h6-next': VlSideNavigationH6;
    }
}
