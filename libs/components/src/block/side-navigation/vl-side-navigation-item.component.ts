import { BaseLitElement, findDeepestElementThroughShadowRoot, webComponent } from '@domg-wc/common';
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

    protected hasStickyHeader(): boolean {
        return !!this.getRootNode().querySelector('vl-header')
    }

    protected get scrollOffset(): number {
        return this.hasStickyHeader() ? 43 : 0;
    }

    firstUpdated() {
        const a = this.querySelector('a');
        if (a) {
            a.addEventListener('click', (e) => {
                const href = a.getAttribute('href');
                if (href) {
                    e.preventDefault();
                    const element = findDeepestElementThroughShadowRoot(this.getRootNode(), href);
                    if (element) {
                        history.pushState(null, '', href);
                        const rect = element.getBoundingClientRect();
                        const scrollTop = window.scrollY + rect.top - this.scrollOffset;
                        window.scrollTo({ top: scrollTop, behavior: 'smooth' });
                    }
                }
            });
        }
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
