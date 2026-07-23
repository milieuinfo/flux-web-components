import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { API_GAP_ROWS, gapLevelBadge } from '../data/api-gap-rows';

@customElement('pg-api-gaps')
export class PgApiGaps extends LitElement {
    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }

    render(): TemplateResult {
        const rows = API_GAP_ROWS;
        const th = 'text-align: left; padding: 6px 10px; border-bottom: 2px solid #cbd2d9; font-size: 12px;';
        const td = 'padding: 6px 10px; border-bottom: 1px solid #eaecef; font-size: 12px; vertical-align: top;';
        const summaryStyle = 'cursor: pointer; font-weight: 600; padding: 8px 4px; font-size: 14px;';
        return html`
            <section class="vl-section" aria-label="API en functionaliteit gap-analyse VDS flux">
                <div class="vl-content-block vl-content-block--full-width">
                    <vl-title type="h2">API-gap: functionaliteit (los van styling)</vl-title>
                    <p>
                        Per-component vergelijking van de <b>publieke API en het gedrag</b> (properties,
                        events, methods, slots, parts) tussen de VDS-componenten en onze flux-componenten.
                        Dit staat los van de styling/token-pariteit (die zit in de
                        <code>Lokale overrides</code>-sectie hierboven en in
                        <code>VDS-UPSTREAM-REQUESTS.md</code>). De volledige rij-per-rij tabellen staan in
                        <code>FLUX-704-API-GAPS.md</code>; dit is de samenvatting per component.
                    </p>
                    <p style="font-size: 13px;">
                        <b>Kernpatroon:</b> de flux form-velden erven van <code>FormControl</code>
                        (<code>@open-wc/form-control</code>), de VDS form-velden van
                        <code>VlFormLayoutElement</code>. Die VDS-keten bundelt label, annotation, indicator,
                        message, size en grow met hun slots en parts. Zodra een <code>flux-*</code> component
                        effectief van de VDS-klasse erft, valt dat hele pakket
                        <b>grotendeels gratis</b> binnen. De echte keuzes zitten in de rijen met een andere
                        shape/naam (bv. enum <code>size</code> vs losse booleans, <code>grow=fill</code> vs
                        <code>block</code>, <code>input-id</code> vs <code>id</code>) en in de
                        <code>enkel-flux</code>-functionaliteit (upstream-request of in de derivative houden).
                    </p>
                    <p style="font-size: 12px; color: #57606a;">
                        De twee richting-kolommen tonen per component <b>in welke mate</b> er een gap is, en
                        naar welke kant. <b>flux moet overnemen</b> = functionaliteit die enkel in VDS zit
                        (via overerving/derivative of flux-API uitbreiden). <b>upstream vragen bij VDS</b> =
                        functionaliteit die enkel bij flux zit (feature-request bij VDS, of bewust in onze
                        derivative houden). Niveau-legende: ${gapLevelBadge({ lvl: 'none', note: '' })}
                        ${gapLevelBadge({ lvl: 'low', note: '' })} ${gapLevelBadge({ lvl: 'mid', note: '' })}
                        ${gapLevelBadge({ lvl: 'high', note: '' })} ${gapLevelBadge({ lvl: 'na', note: '' })}
                    </p>
                    <details>
                        <summary style="${summaryStyle}">Samenvatting per component (${rows.length})</summary>
                        <div style="overflow-x: auto;">
                            <table style="border-collapse: collapse; width: 100%; max-width: 1040px;">
                                <thead>
                                    <tr>
                                        <th scope="col" style="${th}">VDS-component</th>
                                        <th scope="col" style="${th}">flux-component</th>
                                        <th scope="col" style="${th}">Base-klasse (VDS / flux)</th>
                                        <th scope="col" style="${th}">
                                            flux moet overnemen<br /><span style="font-weight: 400; color: #6b7280;"
                                                >enkel in VDS</span
                                            >
                                        </th>
                                        <th scope="col" style="${th}">
                                            upstream vragen bij VDS<br /><span
                                                style="font-weight: 400; color: #6b7280;"
                                                >enkel in flux</span
                                            >
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${rows.map(
                                        (r) => html`<tr>
                                            <td style="${td}"><code>${r.vds}</code></td>
                                            <td style="${td}">
                                                ${r.flux ? html`<code>${r.flux}</code>` : '—'}
                                            </td>
                                            <td style="${td} color: #555;">${r.base}</td>
                                            <td style="${td} width: 27%;">${gapLevelBadge(r.toFlux)}</td>
                                            <td style="${td} width: 27%;">${gapLevelBadge(r.toVds)}</td>
                                        </tr>`
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </details>
                </div>
            </section>
        `;
    }
}
