import { BaseLitElement, registerWebComponents, webComponent } from '@domg-wc/common';
import { VlAccordionComponent } from '@domg-wc/components/block';
import { ContextConsumer } from '@lit/context';
import { CSSResult, html, nothing, TemplateResult } from 'lit';
import { findModel } from '../models/chart.model';
import { figureContext } from './figure-context';
import { joinFigureZone } from './figure-zones';
import { explanationStyles } from './explanation.flux-css';

registerWebComponents([VlAccordionComponent]);

const TOGGLE_TEXT = 'Hoe lees je deze grafiek?';

/**
 * Legt uit hoe je de grafiek leest, uitklapbaar onder de grafiek.
 *
 * @slot - De uitleg, bv. een of meer `<p>`.
 */
@webComponent('vl-data-reading-guide')
export class VlDataReadingGuide extends BaseLitElement {
    static get styles(): CSSResult[] {
        return [explanationStyles];
    }

    // --- states and fields
    #figure = new ContextConsumer(this, { context: figureContext, subscribe: true });

    connectedCallback(): void {
        super.connectedCallback();
        joinFigureZone(this, 'explanations');
    }

    render(): TemplateResult | typeof nothing {
        // Uitleg bij een grafiek die er niet is, helpt niemand.
        const model = findModel(this.#figure.value?.dataState);
        if (!model || !this.#hasContent) return nothing;
        return html`<vl-accordion class="explanation" toggle-text=${TOGGLE_TEXT}><slot></slot></vl-accordion>`;
    }

    get #hasContent(): boolean {
        return this.textContent?.trim() !== '' || this.children.length > 0;
    }
}
