import { BaseLitElement, webComponent } from '@domg-wc/common';
import { css, CSSResult, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import type { ChartReference } from '../layout/reference-lines';
import { chartReferenceDefaults } from './vl-chart-reference.defaults';

/** Een referentielijn in de grafiek, bv. een norm of streefwaarde. */
@webComponent('vl-chart-reference')
export class VlChartReference extends BaseLitElement {
    static get styles(): CSSResult[] {
        return [
            css`
                :host {
                    display: none;
                }
            `,
        ];
    }

    // --- attributes
    /** De waarde op de waarde/y-as in de eenheid van de data. */
    @property({ type: Number }) value = chartReferenceDefaults.value;
    /** Naam of uitleg van de waarde, bv. "Vlaamse streefwaarde". */
    @property() label = chartReferenceDefaults.label;
    /** `true`: De waarde/y-as rekt uit tot de lijn en tekst in beeld zijn.
     * `false`: transformeert de referentielijn naar een string boven de
     * grafiek als notitie*/
    @property({ type: Boolean, attribute: 'in-view' }) inView = chartReferenceDefaults.inView;

    render(): typeof nothing {
        return nothing;
    }
}

export function readReferenceTags(host: Element): ChartReference[] {
    const references = Array.from(host.querySelectorAll(':scope > vl-chart-reference'), (element) => ({
        value: Number(element.getAttribute('value') ?? NaN),
        label: element.getAttribute('label') ?? '',
        isInView: element.hasAttribute('in-view'),
    }));
    const valid = references.filter((reference) => Number.isFinite(reference.value));
    if (valid.length < references.length) {
        console.warn(
            `<${host.localName}>: een vl-chart-reference zonder geldig attribuut 'value' wordt niet getekend.`,
        );
    }
    return valid;
}
