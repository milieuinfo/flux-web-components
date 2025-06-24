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

    protected get hasHashRouting(): boolean {
        const parent = this.closest('vl-side-navigation');
        return parent ? parent.hasAttribute('has-hash-routing') : false;
    }

    firstUpdated() {
        if (this.querySelector('a')) {
            return;
        }

        if (!this.href) {
            console.warn('vl-side-navigation-toggle vereist een geldige href.');
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
            e.preventDefault();

            const element = findDeepestElementThroughShadowRoot(this.getRootNode(), this.href);
            if (!element) {
                console.warn(`Element met id "${this.href}" niet gevonden in de DOM.`);
                return;
            }
            
            const rect = element.getBoundingClientRect();
            const scrollTop = window.scrollY + rect.top - this.scrollOffset;
            window.scrollTo({ top: scrollTop, behavior: 'smooth' });
            
            if (!this.hasHashRouting) {
                history.pushState(null, '', this.href);
            }  
        });
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-side-navigation-toggle': VlSideNavigationToggleComponent;
    }
}
