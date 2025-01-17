import { BaseLitElement, webComponent } from '@domg-wc/common-utilities';

@webComponent('vl-search-result-title-next')
export class VlSearchResultTitleComponent extends BaseLitElement {
    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-search-result-title-next': VlSearchResultTitleComponent;
    }
}
