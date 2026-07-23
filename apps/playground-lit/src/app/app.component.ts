import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent, VlLinkComponent, VlTitleComponent } from '@domg-wc/components/atom';
import { VlInputFieldComponent } from '@domg-wc/components/form';
import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import '../flux-button.component';
import '../flux-input.component';
import '../flux-link.component';

@customElement('app-component')
export class AppComponent extends LitElement {
    static {
        registerWebComponents([
            VlButtonComponent,
            VlLinkComponent,
            VlTitleComponent,
            VlInputFieldComponent,
        ]);
    }

    private renderVariantRow(
        name: string,
        vds: TemplateResult,
        flux: TemplateResult,
        vl: TemplateResult
    ): TemplateResult {
        const cell = (label: string, color: string, content: TemplateResult) => html`
            <div style="border: 1px dashed #d0d7de; border-radius: 6px; padding: 12px;">
                <div style="font-size: 12px; color: ${color}; margin-bottom: 8px; font-weight: 600;">
                    ${label}
                </div>
                <div style="display: flex; flex-direction: column; gap: 6px; align-items: flex-start;">
                    ${content}
                </div>
            </div>
        `;
        return html`
            <div style="font-weight: 600; margin: 6px 0;">${name}</div>
            <div
                style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; max-width: 900px; margin-bottom: 16px;"
            >
                ${cell('vds · rauw VDS', '#0055cc', vds)}
                ${cell('flux · erft VDS + tokens', '#0055cc', flux)}
                ${cell('vl · echte flux', '#6b7280', vl)}
            </div>
        `;
    }

    private renderIntegrationStatus(): TemplateResult {
        type Comp = { tag: string; flux: string | null; state: 'done' | 'partial' | 'todo'; note: string };
        const comps: Comp[] = [
            { tag: 'vl-button', flux: 'flux-button', state: 'done', note: 'erft VlButton; look + hoogte via tokens' },
            { tag: 'vl-input', flux: 'flux-input', state: 'done', note: 'erft VlInput' },
            { tag: 'vl-link', flux: 'flux-link', state: 'done', note: 'erft VlLink' },
            { tag: 'vl-select', flux: 'flux-select', state: 'done', note: 'erft VlSelect' },
            { tag: 'vl-checkbox', flux: 'flux-checkbox', state: 'done', note: 'erft VlCheckbox' },
            { tag: 'vl-textarea', flux: 'flux-textarea', state: 'done', note: 'erft VlTextarea' },
            { tag: 'vl-fieldset', flux: 'flux-fieldset', state: 'done', note: 'erft VlFieldset' },
            { tag: 'vl-radio-group', flux: 'flux-radio-group', state: 'done', note: 'erft VlRadioGroup' },
            {
                tag: 'vl-radio',
                flux: null,
                state: 'partial',
                note: 'VlRadio niet los geexporteerd; radios leven als vds-radio in flux-radio-group, tokens cascaden',
            },
            { tag: 'vl-box', flux: null, state: 'todo', note: 'layout-primitief; flux gebruikt de vl-padding-style' },
            { tag: 'vl-inline', flux: null, state: 'todo', note: 'layout-primitief; flux gebruikt de vl-group-style' },
            { tag: 'vl-stack', flux: null, state: 'todo', note: 'layout-primitief; flux gebruikt de vl-stacked-style' },
            { tag: 'vl-datepicker', flux: null, state: 'todo', note: 'nog geen flux-integratie' },
            { tag: 'vl-icon', flux: null, state: 'todo', note: 'nog geen flux-integratie' },
            { tag: 'vl-input-group', flux: null, state: 'todo', note: 'nog geen flux-integratie' },
            { tag: 'vl-markdown', flux: null, state: 'todo', note: 'nog geen flux-integratie' },
        ];
        const icon = (s: Comp['state']) => (s === 'done' ? '✅' : s === 'partial' ? '➖' : '❌');
        const done = comps.filter((c) => c.state === 'done');
        const rest = comps.filter((c) => c.state !== 'done');
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
                        <code>flux-*</code> (erven de VDS-klasse + flux-tokens), <b>${rest.length}</b> nog niet.
                        Legende: ✅ geïntegreerd · ➖ onrechtstreeks via een ander flux-component · ❌ nog niet.
                    </p>
                    <details open>
                        <summary style="${summaryStyle} color: #1a7f37;">✅ Geïntegreerd (${done.length})</summary>
                        ${table(done, 'flux-* doelproducten die de VDS-klasse erven')}
                    </details>
                    <details style="margin-top: 12px;">
                        <summary style="${summaryStyle} color: #9a6700;">
                            ❌ Nog niet / onrechtstreeks (${rest.length})
                        </summary>
                        ${table(rest, '➖ = onrechtstreeks via een ander flux-component')}
                    </details>
                </div>
            </section>
        `;
    }

    render() {
        const boxVds = `<vds-box padding="l" background-color="subtle"
          border-color="default" border-radius="m" as="section">
  <strong>Kaart-titel</strong>
  <p>Padding, achtergrond, border en radius via tokens.</p>
</vds-box>`;
        const boxFlux = `<!-- flux heeft geen surface-component: padding via de vl-padding-utility,
     achtergrond/border/radius blijven eigen CSS (flux kent enkel padding-styles). -->
<div class="vl-padding--medium"
     style="background: #eef1f5; border: 1px solid #cbd2d9; border-radius: 6px;">
  <strong>Kaart-titel</strong>
  <p>Padding via flux' vl-padding, rest via CSS.</p>
</div>`;
        const inlineVds = `<vds-inline gap="m" align-block="center">
  <vds-button variant="primary">Opslaan</vds-button>
  <vds-button variant="secondary">Annuleren</vds-button>
</vds-inline>`;
        const inlineFlux = `<div class="vl-group vl-group--align-center">
  <vl-button>Opslaan</vl-button>
  <vl-button secondary>Annuleren</vl-button>
</div>`;
        const inlineFluxBtn = `<div class="vl-group vl-group--align-center">
  <flux-button>Opslaan</flux-button>
  <flux-button secondary>Annuleren</flux-button>
</div>`;
        const stackVds = `<vds-stack gap="s">
  <vds-button variant="primary">Eén</vds-button>
  <vds-button variant="secondary">Twee</vds-button>
  <vds-button variant="tertiary">Drie</vds-button>
</vds-stack>`;
        const stackFlux = `<div class="vl-stacked vl-stacked-small">
  <vl-button>Eén</vl-button>
  <vl-button secondary>Twee</vl-button>
  <vl-button tertiary>Drie</vl-button>
</div>`;
        const stackFluxBtn = `<div class="vl-stacked vl-stacked-small">
  <flux-button>Eén</flux-button>
  <flux-button secondary>Twee</flux-button>
  <flux-button tertiary>Drie</flux-button>
</div>`;

        return html`
            <main class="vl-region">
                <div class="vl-content-block vl-content-block--full-width">
                    <vl-title type="h1">FLUX-704 — flux atomen bovenop VDS</vl-title>
                    <p>
                        Upstream <code>@govflanders/vl-ui-design-system-web-components</code> via
                        <code>defineAll('vds')</code>. flux <code>vl-*</code> en VDS
                        <code>vds-*</code> leven samen op één pagina zonder registry-collision. De
                        diepere styling-analyse per component staat op
                        <a href="/styling.html">/styling.html</a>.
                    </p>
                </div>

                ${this.renderIntegrationStatus()}

                <section class="vl-section" aria-label="Componenten in drie varianten">
                    <div class="vl-content-block vl-content-block--full-width">
                        <vl-title type="h2">Drie varianten naast elkaar (vds · flux · vl)</vl-title>

                        <div
                            style="max-width: 900px; margin: 12px 0 16px; padding: 12px 16px;
                                   border: 1px solid #cbd2d9; border-radius: 6px; background: #fafbfc; font-size: 13px;"
                        >
                            <strong>Legende</strong>
                            <ul style="margin: 8px 0 0; padding-left: 18px; line-height: 1.6;">
                                <li>
                                    <code style="color: #0055cc;">vds-*</code> — <b>rauw VDS</b>: exact zoals
                                    VDS het vandaag definieert, geen aanpassing.
                                </li>
                                <li>
                                    <code style="color: #0055cc;">flux-*</code> — <b>ons doelproduct</b>: erft
                                    de VDS-klasse en zet de flux-look via design-tokens op
                                    <code>:host</code> (geen extra shadow-laag).
                                </li>
                                <li>
                                    <code style="color: #0055cc;">vl-*</code> — <b>onze echte flux
                                    web-component</b>, ongewijzigd, zoals vóór FLUX-704.
                                </li>
                            </ul>
                        </div>

                        ${this.renderVariantRow(
                            'button',
                            html`<vds-button variant="primary">Primair</vds-button
                                ><vds-button variant="secondary">Secundair</vds-button>`,
                            html`<flux-button>Primair</flux-button
                                ><flux-button secondary>Secundair</flux-button>`,
                            html`<vl-button>Primair</vl-button
                                ><vl-button secondary>Secundair</vl-button>`
                        )}
                        ${this.renderVariantRow(
                            'input',
                            html`<vds-input label="Naam" placeholder="VDS"></vds-input>`,
                            html`<flux-input label="Naam" placeholder="flux-input"></flux-input>`,
                            html`<vl-input-field
                                aria-label="Naam"
                                placeholder="flux"
                            ></vl-input-field>`
                        )}
                        ${this.renderVariantRow(
                            'link',
                            html`<vds-link href="https://www.vlaanderen.be">VDS link</vds-link>`,
                            html`<flux-link href="https://www.vlaanderen.be">flux-link</flux-link>`,
                            html`<vl-link href="https://www.vlaanderen.be">flux link</vl-link>`
                        )}
                    </div>
                </section>

                <section class="vl-section" aria-label="VDS layout-primitieven">
                    <div class="vl-content-block vl-content-block--full-width">
                        <vl-title type="h2">VDS layout-primitieven (box · inline · stack)</vl-title>
                        <p>
                            VDS levert drie declaratieve layout-web-<b>componenten</b>. flux heeft die
                            niet als component, maar wél een eigen set layout-<b>styles</b>
                            (<code>vl-group</code>, <code>vl-stacked</code>, <code>vl-padding</code>,
                            globaal geladen via <code>autoRegisterStyles</code>). Waar er knoppen in
                            zitten (inline · stack) tonen we dezelfde 3 tiers als hierboven:
                            <code>vds-*</code> (rauw VDS) · <code>flux-*</code> (erft VDS + tokens) ·
                            <code>vl-*</code> (echte flux), telkens in de bijhorende layout. vl-box heeft
                            geen knoppen en blijft VDS-component naast de flux <code>vl-padding</code>-style.
                        </p>

                        <vl-title type="h3">vl-box — surface / padding-primitief</vl-title>
                        <p style="color: #555; font-size: 13px; margin: 4px 0 10px;">
                            Padded/surfaced container. Props: <code>padding</code> (+
                            <code>-inline</code>/<code>-block</code>/<code>-start</code>/<code>-end</code>),
                            <code>background-color</code>, <code>border-color</code>,
                            <code>border-radius</code>, <code>as</code> (semantisch element zoals
                            section/article). Alle waarden mappen op design-tokens. Voor kaarten,
                            panelen en semantische secties.
                        </p>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start; margin-bottom: 24px;">
                            <div>
                                <div style="font-weight: 600; margin-bottom: 6px; color: #0055cc;">
                                    VDS · vds-box
                                </div>
                                <vds-box
                                    padding="l"
                                    background-color="subtle"
                                    border-color="default"
                                    border-radius="m"
                                    as="section"
                                >
                                    <strong>Kaart-titel</strong>
                                    <p style="margin: 6px 0 0;">
                                        Padding, achtergrond, border en radius via tokens.
                                    </p>
                                </vds-box>
                                <pre style="margin: 8px 0 0; padding: 10px 12px; background: #f6f8fa; border: 1px solid #e1e4e8; border-radius: 6px; font-size: 12px; line-height: 1.5; overflow: auto;">${boxVds}</pre>
                            </div>
                            <div>
                                <div style="font-weight: 600; margin-bottom: 6px; color: #6b7280;">
                                    flux · vl-padding (geen surface-component)
                                </div>
                                <div
                                    class="vl-padding--medium"
                                    style="background: #eef1f5; border: 1px solid #cbd2d9; border-radius: 6px;"
                                >
                                    <strong>Kaart-titel</strong>
                                    <p style="margin: 6px 0 0;">
                                        Padding via flux' <code>vl-padding</code>; achtergrond/border/radius
                                        blijven eigen CSS (flux kent geen surface-component).
                                    </p>
                                </div>
                                <pre style="margin: 8px 0 0; padding: 10px 12px; background: #f6f8fa; border: 1px solid #e1e4e8; border-radius: 6px; font-size: 12px; line-height: 1.5; overflow: auto;">${boxFlux}</pre>
                            </div>
                        </div>

                        <vl-title type="h3">vl-inline — horizontale flex met token-gap</vl-title>
                        <p style="color: #555; font-size: 13px; margin: 4px 0 10px;">
                            Legt kinderen op een rij. Props: <code>gap</code> (token-schaal),
                            <code>align-block</code> (verticaal uitlijnen), <code>align-inline</code>
                            (horizontaal verdelen, bv. space-between), <code>wrap</code>,
                            <code>grow</code>, <code>reverse-order</code>. Voor knoppenrijen,
                            tag-lijsten en toolbars.
                        </p>
                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; align-items: start; margin-bottom: 24px;">
                            <div>
                                <div style="font-weight: 600; margin-bottom: 6px; color: #0055cc;">
                                    VDS · vds-inline + vds-button
                                </div>
                                <div style="padding: 12px; border: 1px dashed #d0d7de; border-radius: 6px;">
                                    <vds-inline gap="m" align-block="center">
                                        <vds-button variant="primary">Opslaan</vds-button>
                                        <vds-button variant="secondary">Annuleren</vds-button>
                                    </vds-inline>
                                </div>
                                <pre style="margin: 8px 0 0; padding: 10px 12px; background: #f6f8fa; border: 1px solid #e1e4e8; border-radius: 6px; font-size: 12px; line-height: 1.5; overflow: auto;">${inlineVds}</pre>
                            </div>
                            <div>
                                <div style="font-weight: 600; margin-bottom: 6px; color: #0055cc;">
                                    flux · vl-group + flux-button
                                </div>
                                <div style="padding: 12px; border: 1px dashed #d0d7de; border-radius: 6px;">
                                    <div class="vl-group vl-group--align-center">
                                        <flux-button>Opslaan</flux-button>
                                        <flux-button secondary>Annuleren</flux-button>
                                    </div>
                                </div>
                                <pre style="margin: 8px 0 0; padding: 10px 12px; background: #f6f8fa; border: 1px solid #e1e4e8; border-radius: 6px; font-size: 12px; line-height: 1.5; overflow: auto;">${inlineFluxBtn}</pre>
                            </div>
                            <div>
                                <div style="font-weight: 600; margin-bottom: 6px; color: #6b7280;">
                                    vl · vl-group + vl-button (echte flux)
                                </div>
                                <div style="padding: 12px; border: 1px dashed #d0d7de; border-radius: 6px;">
                                    <div class="vl-group vl-group--align-center">
                                        <vl-button>Opslaan</vl-button>
                                        <vl-button secondary>Annuleren</vl-button>
                                    </div>
                                </div>
                                <pre style="margin: 8px 0 0; padding: 10px 12px; background: #f6f8fa; border: 1px solid #e1e4e8; border-radius: 6px; font-size: 12px; line-height: 1.5; overflow: auto;">${inlineFlux}</pre>
                            </div>
                        </div>

                        <vl-title type="h3">vl-stack — verticale flex met token-gap</vl-title>
                        <p style="color: #555; font-size: 13px; margin: 4px 0 10px;">
                            Stapelt kinderen verticaal. Props: <code>gap</code>,
                            <code>align-block</code> (verticaal verdelen), <code>align-inline</code>
                            (horizontaal uitlijnen), <code>grow</code>, <code>as</code>. Voor
                            form-rijen, kaartinhoud en verticale lijsten.
                        </p>
                        <p
                            style="max-width: 900px; margin: 0 0 12px; padding: 8px 12px; font-size: 12px;
                                   border-left: 3px solid #d9a441; background: #fffdf5; color: #6b5a1e;"
                        >
                            <b>Bekend verschil:</b> in <code>vl-stacked</code> rekken de
                            <code>flux-button</code>s full-width, de <code>vds-button</code>s en
                            <code>vl-button</code>s niet. Oorzaak: de host van de VDS-knop (die
                            <code>flux-button</code> erft) is <code>display: block</code>, terwijl de
                            echte flux <code>vl-button</code> <code>inline-block</code> is. Bewust zo
                            gelaten om het verschil te tonen; niet weggestyled.
                        </p>
                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; align-items: start; margin-bottom: 8px;">
                            <div>
                                <div style="font-weight: 600; margin-bottom: 6px; color: #0055cc;">
                                    VDS · vds-stack + vds-button
                                </div>
                                <div style="padding: 12px; border: 1px dashed #d0d7de; border-radius: 6px;">
                                    <vds-stack gap="s">
                                        <vds-button variant="primary">Eén</vds-button>
                                        <vds-button variant="secondary">Twee</vds-button>
                                        <vds-button variant="tertiary">Drie</vds-button>
                                    </vds-stack>
                                </div>
                                <pre style="margin: 8px 0 0; padding: 10px 12px; background: #f6f8fa; border: 1px solid #e1e4e8; border-radius: 6px; font-size: 12px; line-height: 1.5; overflow: auto;">${stackVds}</pre>
                            </div>
                            <div>
                                <div style="font-weight: 600; margin-bottom: 6px; color: #0055cc;">
                                    flux · vl-stacked + flux-button
                                </div>
                                <div style="padding: 12px; border: 1px dashed #d0d7de; border-radius: 6px;">
                                    <div class="vl-stacked vl-stacked-small">
                                        <flux-button>Eén</flux-button>
                                        <flux-button secondary>Twee</flux-button>
                                        <flux-button tertiary>Drie</flux-button>
                                    </div>
                                </div>
                                <pre style="margin: 8px 0 0; padding: 10px 12px; background: #f6f8fa; border: 1px solid #e1e4e8; border-radius: 6px; font-size: 12px; line-height: 1.5; overflow: auto;">${stackFluxBtn}</pre>
                            </div>
                            <div>
                                <div style="font-weight: 600; margin-bottom: 6px; color: #6b7280;">
                                    vl · vl-stacked + vl-button (echte flux)
                                </div>
                                <div style="padding: 12px; border: 1px dashed #d0d7de; border-radius: 6px;">
                                    <div class="vl-stacked vl-stacked-small">
                                        <vl-button>Eén</vl-button>
                                        <vl-button secondary>Twee</vl-button>
                                        <vl-button tertiary>Drie</vl-button>
                                    </div>
                                </div>
                                <pre style="margin: 8px 0 0; padding: 10px 12px; background: #f6f8fa; border: 1px solid #e1e4e8; border-radius: 6px; font-size: 12px; line-height: 1.5; overflow: auto;">${stackFlux}</pre>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="vl-section" aria-label="Form in twee varianten">
                    <div class="vl-content-block vl-content-block--full-width">
                        <vl-title type="h2">Form in twee varianten (vds · flux)</vl-title>
                        <p>
                            Dezelfde rijke form, links met rauwe <code>vds-*</code> velden, rechts met de
                            <code>flux-*</code> doelproducten (erven de VDS-klasse + flux-tokens). Beide
                            zijn een echte native <code>&lt;form&gt;</code>: de velden zijn
                            <code>formAssociated</code>, dus <code>new FormData(form)</code> leest de
                            waarden via <code>name</code>. Let op het verschil: de vds-velden zijn ronder
                            (8px), de flux-velden matchen onze look (3px). Onze echte <code>vl-*</code>
                            web-componenten laten we hier weg. Vul in en klik Verzenden.
                        </p>
                        <div
                            style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; max-width: 1100px;"
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
                        </div>
                    </div>
                </section>
            </main>
        `;
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }
}
