import { BaseLitElement, webComponent } from '@domg-wc/common-utilities';

class VlSideNavigationTitleComponent extends BaseLitElement {
    connectedCallback() {
        super.connectedCallback();
        this.classList.add('vl-side-navigation__title');
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }
}

@webComponent('vl-side-navigation-h1')
export class VlSideNavigationH1 extends VlSideNavigationTitleComponent {}

@webComponent('vl-side-navigation-h2')
export class VlSideNavigationH2 extends VlSideNavigationTitleComponent {}

@webComponent('vl-side-navigation-h3')
export class VlSideNavigationH3 extends VlSideNavigationTitleComponent {}

@webComponent('vl-side-navigation-h4')
export class VlSideNavigationH4 extends VlSideNavigationTitleComponent {}

@webComponent('vl-side-navigation-h5')
export class VlSideNavigationH5 extends VlSideNavigationTitleComponent {}

@webComponent('vl-side-navigation-h6')
export class VlSideNavigationH6 extends VlSideNavigationTitleComponent {}

declare global {
    interface HTMLElementTagNameMap {
        'vl-side-navigation-h1': VlSideNavigationH1;
        'vl-side-navigation-h2': VlSideNavigationH2;
        'vl-side-navigation-h3': VlSideNavigationH3;
        'vl-side-navigation-h4': VlSideNavigationH4;
        'vl-side-navigation-h5': VlSideNavigationH5;
        'vl-side-navigation-h6': VlSideNavigationH6;
    }
}
