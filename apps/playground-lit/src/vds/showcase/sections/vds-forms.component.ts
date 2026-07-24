import { html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { patchesFor, renderPatchNotes } from '../data/override-rows';

@customElement('pg-forms')
export class PgForms extends LitElement {
    @property({ type: Boolean })
    gapsOff = false;

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }

    render(): TemplateResult {
        return html`
                <section class="vl-section" aria-label="Form in drie varianten">
                    <div class="vl-content-block vl-content-block--full-width">
                        <vl-title type="h2">Form in drie varianten (vds · flux · vl)</vl-title>
                        <p>
                            Dezelfde rijke form in drie smaken: links rauwe <code>vds-*</code> velden, in het
                            midden de <code>flux-*</code> doelproducten (erven de VDS-klasse + flux-tokens),
                            rechts de echte <code>vl-*</code> flux-web-componenten (<code>libs/components</code>).
                            Alle drie zijn een echte native <code>&lt;form&gt;</code>: de velden zijn
                            <code>formAssociated</code>, dus <code>new FormData(form)</code> leest de waarden via
                            <code>name</code>. Let op de structurele verschillen: vds/flux zetten label + melding
                            als props op het veld, terwijl de echte <code>vl-*</code> ze als aparte componenten
                            componeert (<code>vl-form-label for="id"</code>, <code>vl-form-message</code>). Vullen
                            en Verzenden gebeurt via de gedeelde <code>getFormValue</code>/<code>setFormValue</code>
                            utils die over de drie tag-families heen werken.
                        </p>
                        <div
                            style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; align-items: start; max-width: 1200px;"
                        >
                            <div>
                                <div style="font-weight: 600; margin-bottom: 8px; color: #0055cc;">
                                    vds-form · rauw VDS
                                </div>
                                <vds-form-demo></vds-form-demo>
                            </div>
                            <div>
                                <div style="font-weight: 600; margin-bottom: 8px; color: #0055cc;">
                                    flux-form · erft VDS + tokens
                                </div>
                                <flux-form-demo></flux-form-demo>
                            </div>
                            <div>
                                <div style="font-weight: 600; margin-bottom: 8px; color: #0055cc;">
                                    vl-form · echte flux
                                </div>
                                <vl-form-demo></vl-form-demo>
                            </div>
                        </div>
                        ${this.gapsOff
                            ? nothing
                            : renderPatchNotes(
                                  patchesFor(
                                      'fluxLook',
                                      'flux-button',
                                      'flux-input',
                                      'flux-select',
                                      'flux-checkbox',
                                      'flux-textarea',
                                      'flux-datepicker'
                                  ),
                                  html`de <code>flux-*</code> formvelden`
                              )}
                    </div>
                </section>
        `;
    }
}
