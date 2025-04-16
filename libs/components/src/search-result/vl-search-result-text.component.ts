import { BaseLitElement, webComponent } from '@domg-wc/common';

@webComponent('vl-search-result-text')
export class VlSearchResultTextComponent extends BaseLitElement {
    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-search-result-text': VlSearchResultTextComponent;
    }
}
