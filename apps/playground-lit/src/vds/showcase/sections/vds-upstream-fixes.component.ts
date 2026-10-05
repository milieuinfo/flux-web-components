import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { ALSO_AFFECTED, prioBadge, UPSTREAM_FIXES } from '../data/upstream-fix-rows';

@customElement('pg-upstream-fixes')
export class PgUpstreamFixes extends LitElement {
    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }

    render(): TemplateResult {
        const th = 'text-align: left; padding: 6px 10px; border-bottom: 2px solid #cbd2d9; font-size: 12px;';
        const td = 'padding: 6px 10px; border-bottom: 1px solid #eaecef; font-size: 12px; vertical-align: top;';
        return html`
            <section class="vl-section" aria-labelledby="pg-upstream-fixes-title">
                <div class="vl-content-block vl-content-block--full-width">
                    <vl-title type="h2" id="pg-upstream-fixes-title">Upstream te fixen (sinds VDS 0.15.0)</vl-title>
                    <p style="max-width: 900px; font-size: 14px;">
                        Problemen in VDS zelf die bij het afnemen van de 16 nieuwe componenten bovenkwamen. Ze staan
                        apart van de rest van de gap-analyse omdat ze een andere eigenaar hebben:
                    </p>
                    <ul style="max-width: 900px; font-size: 13px; line-height: 1.6; list-style: disc; padding-left: 20px;">
                        <li>
                            <b>Upstream te fixen</b> (deze lijst): een beperking of fout in VDS. flux omzeilt het nu
                            met een workaround in de adapter, die weg moet zodra VDS het oplost.
                        </li>
                        <li>
                            <b>Upstream feature-request</b>: functionaliteit die flux heeft en VDS niet (kolom
                            "upstream vragen bij VDS" in de samenvatting). Geen fout, wel een wens.
                        </li>
                        <li>
                            <b>flux-kant</b>: functionaliteit die enkel in VDS zit (kolom "flux moet overnemen"),
                            plus de API-breuk <code>accordion.open()</code>. Dat lossen we zelf op.
                        </li>
                    </ul>
                    <div style="overflow-x: auto;">
                        <table style="border-collapse: collapse; width: 100%; max-width: 1180px;">
                            <caption style="text-align: left; font-size: 12px; color: #6b7280; padding: 4px 0;">
                                Nummers verwijzen naar VDS-UPSTREAM-REQUESTS.md
                            </caption>
                            <thead>
                                <tr>
                                    <th scope="col" style="${th}">#</th>
                                    <th scope="col" style="${th}">Prioriteit</th>
                                    <th scope="col" style="${th}">VDS-component</th>
                                    <th scope="col" style="${th}">Probleem in VDS</th>
                                    <th scope="col" style="${th}">Gevolg voor flux</th>
                                    <th scope="col" style="${th}">Workaround in de adapter (tijdelijk)</th>
                                    <th scope="col" style="${th}">Vraag aan VDS</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${UPSTREAM_FIXES.map(
                                    (f) => html`<tr>
                                        <td style="${td} font-weight: 700;">${f.nr}</td>
                                        <td style="${td}">${prioBadge(f.prio)}</td>
                                        <td style="${td}">
                                            <code>${f.vds}</code><br /><span style="color: #6b7280;"
                                                >${f.flux.join(', ')}</span
                                            >
                                        </td>
                                        <td style="${td}"><b>${f.title}.</b> ${f.problem}</td>
                                        <td style="${td}">${f.impact}</td>
                                        <td style="${td} color: #555;">${f.workaround}</td>
                                        <td style="${td}">${f.ask}</td>
                                    </tr>`
                                )}
                            </tbody>
                        </table>
                    </div>
                    <p style="max-width: 900px; font-size: 13px; margin-top: 12px;">
                        <b>Bestaande verzoeken die de nieuwe componenten ook raken:</b>
                    </p>
                    <ul style="max-width: 900px; font-size: 13px; line-height: 1.6; list-style: disc; padding-left: 20px;">
                        ${ALSO_AFFECTED.map((a) => html`<li><b>#${a.nr}</b> ${a.what}: ${a.where}</li>`)}
                    </ul>
                </div>
            </section>
        `;
    }
}
