import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('pg-integration-status')
export class PgIntegrationStatus extends LitElement {
    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }

    render(): TemplateResult {
        type Comp = { tag: string; flux: string | null; state: 'done' | 'partial' | 'todo'; note: string };
        const comps: Comp[] = [
            { tag: 'vl-button', flux: 'flux-button', state: 'done', note: 'erft VlButton; look + hoogte via tokens' },
            { tag: 'vl-input', flux: 'flux-input', state: 'done', note: 'erft VlInput' },
            { tag: 'vl-link', flux: 'flux-link', state: 'done', note: 'erft VlLink' },
            { tag: 'vl-select', flux: 'flux-select', state: 'done', note: 'erft VlSelect' },
            {
                tag: 'vl-checkbox',
                flux: 'flux-checkbox',
                state: 'done',
                note: 'erft VlCheckbox. Let op: het vinkje is intern een vds-icon, dus het lijdt op deze mixed-page onder dezelfde vlaanderen-icon font-collision als de iconen (kan ontbreken); in een echte flux-op-VDS build toont het wel',
            },
            { tag: 'vl-textarea', flux: 'flux-textarea', state: 'done', note: 'erft VlTextarea' },
            { tag: 'vl-fieldset', flux: 'flux-fieldset', state: 'done', note: 'erft VlFieldset' },
            { tag: 'vl-radio-group', flux: 'flux-radio-group', state: 'done', note: 'erft VlRadioGroup' },
            {
                tag: 'vl-radio',
                flux: null,
                state: 'partial',
                note: 'VlRadio niet los geexporteerd; radios leven als vds-radio in flux-radio-group, tokens cascaden',
            },
            {
                tag: 'vl-box',
                flux: 'vl-padding (style)',
                state: 'partial',
                note: 'layout-primitief; getoond in de layout-sectie, flux gebruikt de vl-padding-style i.p.v. een wrapper',
            },
            {
                tag: 'vl-inline',
                flux: 'vl-group (style)',
                state: 'partial',
                note: 'layout-primitief; getoond in de layout-sectie, flux gebruikt de vl-group-style i.p.v. een wrapper',
            },
            {
                tag: 'vl-stack',
                flux: 'vl-stacked (style)',
                state: 'partial',
                note: 'layout-primitief; getoond in de layout-sectie, flux gebruikt de vl-stacked-style i.p.v. een wrapper',
            },
            {
                tag: 'vl-datepicker',
                flux: 'flux-datepicker',
                state: 'done',
                note: 'erft VlDatepicker; look via tokens + focus-override',
            },
            {
                tag: 'vl-icon',
                flux: 'flux-icon',
                state: 'done',
                note: 'erft VlIcon. Glyphs renderen correct via een font-alias (VDS-font onder unieke naam vds-vlaanderen-icon + !important-override), zodat de vlaanderen-icon-collision met flux omzeild wordt en beide fonts coexisteren. Grootte blijft rem-literal (zie [scaled]-toggle)',
            },
            { tag: 'vl-input-group', flux: null, state: 'todo', note: 'nog geen flux-integratie' },
            { tag: 'vl-markdown', flux: null, state: 'todo', note: 'nog geen flux-integratie' },
        ];
        const icon = (s: Comp['state']) => (s === 'done' ? '✅' : s === 'partial' ? '➖' : '❌');
        const order = { done: 0, partial: 1, todo: 2 };
        const sorted = [...comps].sort((a, b) => order[a.state] - order[b.state]);
        const done = comps.filter((c) => c.state === 'done');
        const partial = comps.filter((c) => c.state === 'partial');
        const todo = comps.filter((c) => c.state === 'todo');
        const th = 'text-align: left; padding: 6px 10px; border-bottom: 2px solid #cbd2d9; font-size: 12px;';
        const td = 'padding: 6px 10px; border-bottom: 1px solid #eaecef; font-size: 13px; vertical-align: top;';
        const summaryStyle = 'cursor: pointer; font-weight: 600; padding: 8px 4px; font-size: 14px;';
        const table = (rows: Comp[], caption: string) => html`
            <table style="border-collapse: collapse; width: 100%; max-width: 760px;">
                <caption style="text-align: left; font-size: 12px; color: #6b7280; padding: 4px 0;">
                    ${caption}
                </caption>
                <thead>
                    <tr>
                        <th scope="col" style="${th}">Status</th>
                        <th scope="col" style="${th}">VDS-component</th>
                        <th scope="col" style="${th}">flux-component</th>
                        <th scope="col" style="${th}">Nota</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows.map(
                        (c) => html`<tr>
                            <td style="${td} text-align: center;">${icon(c.state)}</td>
                            <td style="${td}"><code>${c.tag}</code></td>
                            <td style="${td}">${c.flux ? html`<code>${c.flux}</code>` : '—'}</td>
                            <td style="${td} color: #555;">${c.note}</td>
                        </tr>`
                    )}
                </tbody>
            </table>
        `;
        return html`
            <section class="vl-section" aria-label="VDS-componenten integratie-status">
                <div class="vl-content-block vl-content-block--full-width">
                    <vl-title type="h2">VDS-componenten: integratie-status</vl-title>
                    <p>
                        Alle ${comps.length} VDS web-componenten (geregistreerd via
                        <code>defineAll('vds')</code>, bron: het package-manifest
                        <code>custom-elements.json</code>). <b>${done.length}</b> geïntegreerd als
                        <code>flux-*</code> (erven de VDS-klasse + flux-tokens), <b>${partial.length}</b>
                        onrechtstreeks / via een style, <b>${todo.length}</b> nog niet.
                        Legende: ✅ geïntegreerd · ➖ onrechtstreeks (via een ander flux-component of een
                        layout-style) · ❌ nog niet.
                    </p>
                    <details>
                        <summary style="${summaryStyle}">
                            Alle ${comps.length} VDS-componenten (${done.length} ✅ · ${partial.length} ➖ ·
                            ${todo.length} ❌)
                        </summary>
                        ${table(sorted, 'gesorteerd: geïntegreerd, dan onrechtstreeks, dan nog niet')}
                    </details>
                </div>
            </section>
        `;
    }
}
