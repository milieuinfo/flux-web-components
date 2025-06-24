import { BaseLitElement, findDeepestElementThroughShadowRoot, registerWebComponents, webComponent } from '@domg-wc/common';
import { VlIconComponent } from '@domg-wc/components/atom';
import { PropertyDeclarations } from 'lit';

registerWebComponents([VlIconComponent]);

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

    protected hasStickyHeader(): boolean {
        return !!this.getRootNode().querySelector('vl-header')
    }

    protected get scrollOffset(): number {
        return this.hasStickyHeader() ? 43 : 0;
    }

    firstUpdated() {
        if (this.querySelector('a')) {
            return;
        }
        
        const childNodes = this.childNodes;
        const aNode = document.createElement('a');
        aNode.setAttribute('href', this.href);
        
        const iconNode = document.createElement('vl-icon');
        iconNode.setAttribute('icon', 'arrow-right-fat');
        aNode.append(...childNodes, iconNode);
        this.appendChild(aNode);

        aNode.addEventListener('click', (e) => {
            const element = findDeepestElementThroughShadowRoot(this.getRootNode(), this.href);
            if (element) {
                e.preventDefault();
                history.pushState(null, '', this.href);
                const rect = element.getBoundingClientRect();
                const scrollTop = window.scrollY + rect.top - this.scrollOffset;
                window.scrollTo({ top: scrollTop, behavior: 'smooth' });
            }
        });
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-side-navigation-toggle': VlSideNavigationToggleComponent;
    }
}
