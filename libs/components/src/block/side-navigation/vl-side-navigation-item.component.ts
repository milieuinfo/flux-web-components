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

    protected get hasHashRouting(): boolean {
        const parent = this.closest('vl-side-navigation');
        return parent ? parent.hasAttribute('has-hash-routing') : false;
    }

    firstUpdated() {
        this.setAttribute('role', 'listitem');

        const a = this.querySelector('a');
        if (!a) {
            console.warn('vl-side-navigation-item vereist een anchor element (<a>) als child.', this);
            return;
        }

        a.addEventListener('click', (e) => {
            e.preventDefault();

            const href = a.getAttribute('href');
            if (!href) {
                console.warn('vl-side-navigation-item vereist een geldige href op het anchor element.');
                return;
            }
            
            const element = findDeepestElementThroughShadowRoot(this.getRootNode(), href);
            if (!element) {
                console.warn(`Element met id "${href}" niet gevonden in de DOM.`);
                return;
            }
            
            const rect = element.getBoundingClientRect();
            const scrollTop = window.scrollY + rect.top - this.scrollOffset;
            window.scrollTo({ top: scrollTop, behavior: 'smooth' });

            if (!this.hasHashRouting) {
                history.pushState(null, '', href);
            }    
        });
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-side-navigation-item': VlSideNavigationItemComponent;
    }
}
