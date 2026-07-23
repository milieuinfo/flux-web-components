import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { OVERRIDE_ROWS, overrideBadge } from '../data/override-rows';

@customElement('pg-overrides-list')
export class PgOverridesList extends LitElement {
    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }

    render(): TemplateResult {
        const rows = OVERRIDE_ROWS;
        const nToken = rows.filter((r) => r.cat === 'token').length;
        const nWork = rows.filter((r) => r.cat === 'workaround').length;
        const nRem = rows.filter((r) => r.cat === 'rem').length;
        const th = 'text-align: left; padding: 6px 10px; border-bottom: 2px solid #cbd2d9; font-size: 12px;';
        const td = 'padding: 6px 10px; border-bottom: 1px solid #eaecef; font-size: 12px; vertical-align: top;';
        return html`
            <section class="vl-section" aria-label="Lokale overrides consument-side">
                <div class="vl-content-block vl-content-block--full-width">
                    <vl-title type="h2">Lokale overrides (consument-side)</vl-title>
                    <p>
                        Alles wat we in de playground zelf op de <code>flux-*</code> componenten zetten om de
                        flux-look te bereiken. Drie categorieën:
                        <b style="color: #1a7f37;">token</b> (idiomatisch, publiek <code>--base-*</code> token),
                        <b style="color: #9a6700;">workaround</b> (VDS-CSS overschreven omdat er geen token was),
                        <b style="color: #0055cc;">rem-brug</b> (scale-compensatie voor de 10px-root). De
                        <b>workarounds</b> horen upstream (kolom "VDS-req", zie
                        <code>VDS-UPSTREAM-REQUESTS.md</code>). De <code>Rauw VDS tonen</code>-knop (floating,
                        rechtsonder) schakelt al deze overrides in één keer uit. Dezelfde patches staan — per
                        component herhaald — ook onder elk visueel voorbeeld hieronder.
                        Totaal: ${rows.length} (${nToken} token · ${nWork} workaround · ${nRem} rem-brug).
                    </p>
                    <details>
                        <summary style="cursor: pointer; font-weight: 600; padding: 8px 4px; font-size: 14px;">
                            Volledige lijst (${rows.length})
                        </summary>
                        <table style="border-collapse: collapse; width: 100%; max-width: 860px;">
                            <thead>
                                <tr>
                                    <th scope="col" style="${th}">Component</th>
                                    <th scope="col" style="${th}">Override</th>
                                    <th scope="col" style="${th}">Flux-waarde</th>
                                    <th scope="col" style="${th}">Categorie</th>
                                    <th scope="col" style="${th}">VDS-req</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${rows.map(
                                    (r) => html`<tr>
                                        <td style="${td}"><code>${r.c}</code></td>
                                        <td style="${td}">${r.o}</td>
                                        <td style="${td}"><code>${r.v}</code></td>
                                        <td style="${td}">${overrideBadge(r.cat)}</td>
                                        <td style="${td}">${r.up || '—'}</td>
                                    </tr>`
                                )}
                            </tbody>
                        </table>
                    </details>
                </div>
            </section>
        `;
    }
}
