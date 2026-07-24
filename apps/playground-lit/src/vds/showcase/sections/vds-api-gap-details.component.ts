import { html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { API_GAP_ROWS } from '../data/api-gap-rows';
import { API_DETAIL_INLINED_TAGS, API_DETAIL_ROWS, detailStatusBadge, renderApiDetailAccordion } from '../data/api-detail-rows';

@customElement('pg-api-gap-details')
export class PgApiGapDetails extends LitElement {
    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }

    render(): TemplateResult {
        const total = API_DETAIL_ROWS.length;
        const nVds = API_DETAIL_ROWS.filter((r) => r.status === 'vds').length;
        const nFlux = API_DETAIL_ROWS.filter((r) => r.status === 'flux').length;
        const nShape = API_DETAIL_ROWS.filter((r) => r.status === 'shape').length;
        const orphans = API_GAP_ROWS.filter(
            (c) => !API_DETAIL_INLINED_TAGS.includes(c.vds) && API_DETAIL_ROWS.some((r) => r.comp === c.vds)
        );
        return html`
            <section class="vl-section" aria-label="API-gap detail legende en overige componenten">
                <div class="vl-content-block vl-content-block--full-width">
                    <vl-title type="h2">API-gap: detail per component (welke API wijkt af)</vl-title>
                    <p>
                        Per component een uitklapbare lijst van elke publieke API die <b>niet 1-op-1
                        overeenkomt</b> tussen VDS en flux (rijen die volledig gelijk zijn, staan er bewust
                        niet in). De detail-accordions staan <b>inline onder hun component-voorbeeld</b> in de
                        sectie "Drie varianten naast elkaar" hieronder (net als de token-patch-lijsten). Hier
                        staat de legende plus de totalen. Volledige onderbouwing (ook de overlap-rijen) staat
                        in <code>FLUX-704-API-GAPS.md</code>.
                    </p>
                    <p style="font-size: 12px; color: #57606a;">
                        Status: ${detailStatusBadge('vds')} = zit enkel in VDS (flux moet overnemen via
                        overerving/derivative) · ${detailStatusBadge('flux')} = zit enkel in flux
                        (upstream-request bij VDS, of in onze derivative houden) · ${detailStatusBadge('shape')}
                        = in beide aanwezig maar met een andere attribuut-naam, API-shape of mechanisme (af te
                        stemmen). Totaal ${total} afwijkingen over alle componenten: ${nVds} enkel-VDS ·
                        ${nFlux} enkel-flux · ${nShape} andere shape/naam.
                    </p>
                    ${orphans.length
                        ? html`
                              <p style="font-size: 13px; font-weight: 600; margin-top: 12px;">
                                  Componenten zonder los voorbeeld
                              </p>
                              ${orphans.map((c) => renderApiDetailAccordion(c.vds))}
                          `
                        : nothing}
                </div>
            </section>
        `;
    }
}
