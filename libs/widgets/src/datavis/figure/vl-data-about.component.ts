import { BaseLitElement, registerWebComponents, webComponent } from '@domg-wc/common';
import { VlLinkComponent } from '@domg-wc/components/atom';
import { VlAccordionComponent } from '@domg-wc/components/block';
import { ContextConsumer } from '@lit/context';
import { CSSResult, html, nothing, TemplateResult } from 'lit';
import { OPEN_DATA_HREF } from '../chart/source-row';
import { findModel } from '../models/chart.model';
import { figureContext } from './figure-context';
import { joinFigureZone } from './figure-zones';
import { buildAboutGroups, type AboutEntry } from './about-data';
import { explanationStyles } from './explanation.flux-css';
import { vlDataAboutFluxStyles } from './vl-data-about.flux-css';

registerWebComponents([VlAccordionComponent, VlLinkComponent]);

const TOGGLE_TEXT = 'Over deze data';

/**
 * Toont onder de grafiek een uitklapbaar blok met de bronnen, eenheid en open data uit `meta`.
 *
 * @slot - Extra uitleg over de data, onder wat `meta` vertelt.
 */
@webComponent('vl-data-about')
export class VlDataAbout extends BaseLitElement {
    static get styles(): CSSResult[] {
        return [explanationStyles, vlDataAboutFluxStyles];
    }

    // --- states and fields
    #figure = new ContextConsumer(this, { context: figureContext, subscribe: true });

    connectedCallback(): void {
        super.connectedCallback();
        joinFigureZone(this, 'explanations');
    }

    render(): TemplateResult | typeof nothing {
        const model = findModel(this.#figure.value?.dataState);
        if (!model) return nothing;
        const groups = buildAboutGroups(model.meta, OPEN_DATA_HREF);
        return html`<vl-accordion class="explanation" toggle-text=${TOGGLE_TEXT}>
            ${groups.map(
                (group) =>
                    html`<dl>
                        ${group.map(
                            (entry) =>
                                html`<dt>${entry.term}</dt>
                                    <dd>${this.#renderDescription(entry)}</dd>`,
                        )}
                    </dl>`,
            )}
            <slot></slot>
        </vl-accordion>`;
    }

    #renderDescription(entry: AboutEntry): TemplateResult | string {
        if (entry.href) return html`<vl-link href=${entry.href} external>${entry.description}</vl-link>`;
        return entry.isSubtle ? html`<span class="subtle">${entry.description}</span>` : entry.description;
    }
}
