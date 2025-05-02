import { BaseLitElement, webComponent } from '@domg-wc/common';

@webComponent('vl-search-result-title')
export class VlSearchResultTitleComponent extends BaseLitElement {
    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-search-result-title': VlSearchResultTitleComponent;
    }
}
