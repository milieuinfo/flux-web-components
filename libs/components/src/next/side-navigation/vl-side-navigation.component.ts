import { BaseLitElement, findDeepestElementThroughShadowRoot, unwrap, VL, webComponent } from '@domg-wc/common-utilities';
import { vlContentBlockStyles, vlGridStyles, vlIconStyles, vlSectionStyles } from '@domg-wc/common-utilities/css';
import { elementStyles } from '@domg-wc/elements';
import '@govflanders/vl-ui-util/dist/js/util.js';
import { PropertyDeclarations } from 'lit';
import { vlSideNavigationStyles } from './vl-side-navigation.css';
import { sideNavigationDefaults } from './vl-side-navigation.defaults';
import './vl-side-navigation.lib.js';

declare const vl: VL;

@elementStyles()
@webComponent('vl-side-navigation-next')
export class VlSideNavigationComponent extends BaseLitElement {
    static initializedSideNavigationId = '';

    private hashSync = sideNavigationDefaults.hashSync;

    constructor() {
        super();
        this.processAttributes();
        this.processClasses();
        this.rerender();
    }

    static get properties(): PropertyDeclarations {
        return {
            hashSync: { type: Boolean, attribute: 'hash-sync' },
        };
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }

    protected hasStickyHeader(): boolean {
        return !!this.getRootNode().querySelector('vl-header');
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

    connectedCallback(): void {
        super.connectedCallback();

        // Gezien dit component geen shadow dom heeft, moeten de styles van de children toegevoegd worden
        // aan de adoptedStyleSheets van de omliggende shadow dom, anders zullen de styles niet toegepast worden
        const shadowRoot = this.shadowRoot || this.getRootNode();
        if (shadowRoot instanceof ShadowRoot) {
            shadowRoot.adoptedStyleSheets = [
                ...shadowRoot.adoptedStyleSheets,
                vlSideNavigationStyles.styleSheet as CSSStyleSheet,
                vlGridStyles.styleSheet as CSSStyleSheet,
                vlSectionStyles.styleSheet as CSSStyleSheet,
                vlContentBlockStyles.styleSheet as CSSStyleSheet,
                vlIconStyles.styleSheet as CSSStyleSheet,
            ];
        } else {
            document.adoptedStyleSheets = [
                ...document.adoptedStyleSheets,
                vlSideNavigationStyles.styleSheet as CSSStyleSheet,
                vlIconStyles.styleSheet as CSSStyleSheet,
            ];
        }

        this.initialScroll();
    }

    private initialScroll() {
        if (!this.hashSync) {
            return;
        }
        const id = location.hash.slice(1);
        if (id) {
            const element = findDeepestElementThroughShadowRoot(this.getRootNode(), `#${id}`);
            if (element) {
                const rect = element.getBoundingClientRect();
                const scrollTop = window.scrollY + rect.top - this.scrollOffset;
                window.scrollTo({ top: scrollTop, behavior: 'smooth' });
            }
        }
    }

    private rerender() {
        const sideNavigationId = this.getAttribute('side-navigation-id');

        /*
            Hack voor UIG-2897
            Proza messages werden niet afgebeeld tot er een resize van de window gebeurde.
            Door de undress() - dress() niet in een timeout te wrappen is dit probleem opgelost.
            Dit zorgt echter voor andere problemen als de side navigation overgaat van desktop naar mobile view.
            Omdat dit component bij elke resize volledig afgebroken en opnieuw opgebouwd wordt, is het onmogelijk om state bij te houden als er geresized wordt.
            Als oplossing moet de afnemer een uniek side-navigation-id attribuut meegeven, dit id stoppen we in een static variabele.
            Als de static variabele nog niet is ingevuld of is ingevuld met het id van een andere side-navigation,
            kunnen we er van uitgaan dat dit de eerste keer is dat deze side-navigation rendert en de correcte code uitvoeren.
        */
        if (sideNavigationId && VlSideNavigationComponent.initializedSideNavigationId !== sideNavigationId) {
            VlSideNavigationComponent.initializedSideNavigationId = sideNavigationId;
            this.undress();
            this.dress();
        } else {
            setTimeout(() => {
                this.undress();
                this.dress();
            }, 200);
        }
    }

    private dress(): void {
        vl.sideNavigationNext.dress(this);
        this.style.position = '';
    }

    /*
     * DV's component doesn't foresee user changing breakpoint at runtime
     * without "undress" styles for mobile will be applied to desktop template & vice versa
     */
    private undress() {
        // remove .vl-u-no-overflow
        vl.util.removeClass(document.body, vl.ns + 'u-no-overflow');
        // delete .js-vl-scrollspy__toggle
        const scrollSpyToggleElements = document.querySelectorAll('.js-vl-scrollspy__toggle');
        if (scrollSpyToggleElements.length) {
            vl.util.each(Array.from(scrollSpyToggleElements), (element: Element) => element.remove());
        }
        // delete .js-vl-scrollspy__close
        const scrollSpyCloseElements = document.querySelectorAll('.js-vl-scrollspy__close');
        if (scrollSpyCloseElements.length) {
            vl.util.each(Array.from(scrollSpyCloseElements), (element: Element) => element.remove());
        }
        // unwrap .js-vl-scrollspy-placeholder - remove parent specific for mobile template, keeping child elements
        const scrollSpyPlaceholderElement = document.querySelector('.js-vl-scrollspy-placeholder');
        if (scrollSpyPlaceholderElement) unwrap(scrollSpyPlaceholderElement);
    }

    private processAttributes() {
        this.setAttribute('side-navigation', '');
        this.setAttribute('side-navigation-scrollable', '');
        this.setAttribute('scrollspy', '');
        this.setAttribute('scrollspy-mobile', 'Navigatie');
        this.setAttribute('sticky', '');
        this.setAttribute('sticky-offset-top', '43');
    }

    private processClasses() {
        this.classList.add('vl-side-navigation-next');
        this.classList.add('js-vl-side-navigation');
        this.classList.add('js-vl-sticky');
        this.classList.add('js-vl-scrollspy');
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-side-navigation-next': VlSideNavigationComponent;
    }
}
