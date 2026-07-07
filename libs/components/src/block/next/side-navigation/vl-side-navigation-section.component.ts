import { BaseLitElement, webComponent } from '@domg-wc/common';
import { property } from 'lit/decorators.js';

export type VlSideNavigationSectionType = 'custom' | 'auto';

/**
 * Passieve marker-sectie voor multi-section gebruik van `vl-side-navigation-next`.
 * Rendert niets en gebruikt geen shadow DOM; de parent leest het type + optionele
 * scan-prop overrides en orkestreert alles. De sectie-titel komt uit het
 * `section-title` attribuut (gerenderd als label, gekoppeld via `aria-labelledby`).
 */
@webComponent('vl-side-navigation-section-next')
export class VlSideNavigationSectionComponent extends BaseLitElement {
    @property({ type: String, reflect: true })
    type: VlSideNavigationSectionType = 'custom';

    @property({ type: String, attribute: 'section-title' })
    sectionTitle?: string;

    @property({ type: Number, attribute: 'min-level' })
    minLevel?: number;

    @property({ type: Number, attribute: 'max-level' })
    maxLevel?: number;

    @property({ type: String, attribute: 'heading-root-selector' })
    headingRootSelector?: string;

    @property({ type: Number, attribute: 'max-depth' })
    maxDepth?: number;

    @property({ type: String, attribute: 'exclude-selectors' })
    excludeSelectors?: string;

    // Light-DOM rendering zodat de door-de-dev geleverde children intact blijven.
    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-side-navigation-section-next': VlSideNavigationSectionComponent;
    }
}
