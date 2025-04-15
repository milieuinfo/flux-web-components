import { BaseLitElement, webComponent } from '@domg-wc/common-utilities';
import { PropertyDeclarations } from 'lit';

@webComponent('vl-side-navigation-toggle')
export class VlSideNavigationToggleComponent extends BaseLitElement {
    private href = '';
    private child = '';

    constructor() {
        super();
        this.classList.add('vl-side-navigation__toggle');
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

    firstUpdated() {
        const childNodes = this.childNodes;
        const aNode = document.createElement('a');
        aNode.setAttribute('href', this.href);
        const iconNode = document.createElement('i');
        iconNode.setAttribute('class', 'vl-icon vl-icon--arrow-right-fat');
        aNode.append(...childNodes, iconNode);
        this.appendChild(aNode);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-side-navigation-toggle': VlSideNavigationToggleComponent;
    }
}
