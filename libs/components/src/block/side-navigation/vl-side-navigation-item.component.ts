import { BaseLitElement, webComponent } from '@domg-wc/common';
import { PropertyDeclarations } from 'lit';

@webComponent('vl-side-navigation-item')
export class VlSideNavigationItemComponent extends BaseLitElement {
    private parent = false;

    constructor() {
        super();
        this.classList.add('vl-side-navigation__item');
    }

    static get properties(): PropertyDeclarations {
        return {
            parent: { type: Boolean },
        };
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }

    updated() {
        if (!this.parent) {
            const childNodes = this.childNodes;
            const divNode = document.createElement('div');
            divNode.append(...childNodes);
            this.append(divNode);
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-side-navigation-item': VlSideNavigationItemComponent;
    }
}
