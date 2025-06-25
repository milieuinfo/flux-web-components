import { BaseLitElement, findDeepestElementThroughShadowRoot, registerWebComponents, webComponent } from '@domg-wc/common-utilities';
import { PropertyDeclarations } from 'lit';
import { VlIconComponent } from '../icon';

registerWebComponents([VlIconComponent]);

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

    protected hasStickyHeader(): boolean {
        return !!this.getRootNode().querySelector('vl-header')
    }

    protected get scrollOffset(): number {
        return this.hasStickyHeader() ? 43 : 0;
    }

    protected get hasHashRouting(): boolean {
        const parent = this.closest('vl-side-navigation-next');
        return parent ? parent.hasAttribute('has-hash-routing') : false;
    }

    firstUpdated() {
        if (this.querySelector('a')) {
            return;
        }

        if (!this.href) {
            console.warn('vl-side-navigation-toggle-next vereist een geldige href.');
            return;
        }
        
        const childNodes = this.childNodes;
        const aNode = document.createElement('a');
        aNode.setAttribute('href', this.href);
        
        const iconNode = document.createElement('vl-icon-next');
        iconNode.setAttribute('icon', 'arrow-right-fat');
        aNode.append(...childNodes, iconNode as unknown as Node); // Niet zeker waarom het casten hier nodig is, in v2 werkt dit zonder het casten naar Node
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
        'vl-side-navigation-toggle-next': VlSideNavigationToggleComponent;
    }
}
