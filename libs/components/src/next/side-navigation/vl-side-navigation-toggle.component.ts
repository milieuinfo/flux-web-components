import { BaseLitElement, webComponent } from '@domg-wc/common-utilities';
import { PropertyDeclarations } from 'lit';

@webComponent('vl-side-navigation-toggle-next')
export class VlSideNavigationToggleComponent extends BaseLitElement {
    private href = '';
    private child = '';

    constructor() {
        super();
        this.classList.add('vl-side-navigation-next__toggle');
    }

    static get properties(): PropertyDeclarations {
        return {
            href: { type: String },
            child: { type: String },
        };
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }

    updated() {
        const childNodes = this.childNodes;
        const aNode = document.createElement('a');
        // aNode.classList.add('vl-side-navigation-next__toggle');
        aNode.setAttribute('href', this.href);
        // aNode.setAttribute('child', this.child);
        aNode.append(...childNodes);
        this.appendChild(aNode);
        const iconNode = document.createElement('i');
        iconNode.setAttribute('class', 'vl-vi vl-vi-arrow-right-fat');
        this.appendChild(iconNode);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-side-navigation-toggle-next': VlSideNavigationToggleComponent;
    }
}
