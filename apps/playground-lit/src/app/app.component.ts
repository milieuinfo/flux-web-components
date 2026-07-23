import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent, VlLinkComponent, VlTitleComponent } from '@domg-wc/components/atom';
import { VlDatepickerComponent, VlInputFieldComponent } from '@domg-wc/components/form';
import { html, LitElement, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '../flux-button.component';
import '../flux-input.component';
import '../flux-link.component';
import '../flux-form-controls.component';
import '../flux-icon.component';

@customElement('app-component')
export class AppComponent extends LitElement {
    @state()
    private iconScaled = false;

    @state()
    private overridesOff = false;

    static {
        registerWebComponents([
            VlButtonComponent,
            VlLinkComponent,
            VlTitleComponent,
            VlInputFieldComponent,
            VlDatepickerComponent,
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
                state: 'partial',
                note: 'flux-icon erft VlIcon en is geregistreerd, maar glyphs + grootte matchen de echte vl-icon niet op een mixed page (font-naam-collision vlaanderen-icon: VDS vl-vi-* vs flux vl-icon--*, + rem-size). In een echte flux-op-VDS build (enkel VDS-font) wel ok',
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

    private renderOverridesList(): TemplateResult {
        type Row = { c: string; o: string; v: string; cat: 'token' | 'workaround' | 'rem'; up: string };
        const rows: Row[] = [
            { c: 'alle form-controls (fluxLook)', o: '--base-border-radius-selectable-default', v: '0.3rem', cat: 'token', up: '' },
            { c: 'alle form-controls', o: '--base-color-border-default', v: '#8695a8', cat: 'token', up: '' },
            { c: 'alle form-controls', o: '--base-border-focus-spacing-color', v: 'rgba(0,85,204,.65)', cat: 'token', up: '#3' },
            { c: 'alle form-controls', o: 'inset-vertical-s / horizontal-l', v: 'calc(scaled-base * .375 / .625)', cat: 'rem', up: '#4a' },
            { c: 'alle form-controls', o: '--base-color-background-surface-form-element-hover', v: '= enabled (geen grijs)', cat: 'token', up: '' },
            { c: 'flux-button', o: '--vl-form-control-height', v: '3.5rem (35px)', cat: 'token', up: '' },
            { c: 'flux-button', o: '--base-border-width-default', v: '2px', cat: 'token', up: '' },
            { c: 'flux-button', o: 'inset-vertical-s / horizontal-l', v: '0.5rem / 2rem', cat: 'token', up: '' },
            { c: 'flux-button', o: 'line-height (typografie-token)', v: 'normal', cat: 'token', up: '' },
            { c: 'flux-button', o: 'focus-outline (box-shadow → outline)', v: '3px / 2px', cat: 'workaround', up: '#3' },
            { c: 'flux-input', o: 'radius / border / focus-kleur / insets / hover', v: 'zie fluxLook', cat: 'token', up: '' },
            { c: 'flux-input', o: 'focus-outline', v: '3px / 2px', cat: 'workaround', up: '#3' },
            { c: 'flux-link', o: '--base-color-underline-action-*', v: '#0055cc / #0048ad / #002f70', cat: 'token', up: '' },
            { c: 'flux-link', o: 'underline offset + thickness', v: 'auto / auto', cat: 'workaround', up: '#1' },
            { c: 'flux-link', o: 'focus-outline', v: '3px / 2px', cat: 'workaround', up: '#3' },
            { c: 'flux-select', o: 'focus-outline (box-shadow → outline)', v: '3px / 2px', cat: 'workaround', up: '#3' },
            { c: 'flux-checkbox', o: '--base-border-radius-container-2xs', v: '0.3rem', cat: 'token', up: '' },
            { c: 'flux-checkbox', o: 'focus-outline (volle VDS-selector)', v: '3px / 2px', cat: 'workaround', up: '#3' },
            { c: 'flux-textarea', o: 'focus-outline', v: '3px / 2px', cat: 'workaround', up: '#3' },
            { c: 'flux-datepicker', o: '--base-border-radius-container-xl (popover)', v: '0.3rem', cat: 'token', up: '' },
            { c: 'flux-datepicker', o: 'focus-outline (box-shadow → outline)', v: '3px / 2px', cat: 'workaround', up: '#3' },
            { c: 'flux-datepicker', o: 'kalender dagcel: ronde radius + grootte', v: '50% + calc(scaled-base * 2.25)', cat: 'workaround', up: '#4a' },
            { c: 'flux-icon', o: 'grootte (achter [scaled])', v: 'calc(scaled-base * 1.2)', cat: 'rem', up: '#4a' },
            { c: 'globaal', o: 'vds-scale-compensation.css (~215 tokens)', v: 'calc-brug op --base-*', cat: 'rem', up: '#4a' },
        ];
        const badge = (cat: Row['cat']) => {
            const map = {
                token: ['#1a7f37', '#e6f6ec', 'token'],
                workaround: ['#9a6700', '#fff8e1', 'workaround'],
                rem: ['#0055cc', '#eef6ff', 'rem-brug'],
            } as const;
            const [fg, bg, label] = map[cat];
            return html`<span style="color: ${fg}; background: ${bg}; padding: 1px 7px; border-radius: 10px; font-size: 11px; font-weight: 600;">${label}</span>`;
        };
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
                        rechtsonder) schakelt al deze overrides in één keer uit.
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
                                        <td style="${td}">${badge(r.cat)}</td>
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

    private renderIconShowcase(): TemplateResult {
        const icons = [
            'calendar',
            'folder',
            'user',
            'mail',
            'search',
            'info-circle',
            'warning',
            'check',
            'phone',
            'location',
            'cog',
            'bell',
        ];
        const iconCell = 'display: flex; align-items: center; justify-content: center; padding: 10px; border: 1px dashed #d0d7de; border-radius: 6px;';
        const colHead = (label: string, color: string) =>
            html`<div style="font-weight: 600; font-size: 12px; color: ${color};">${label}</div>`;
        return html`
            <section class="vl-section" aria-label="icon vergelijking vds flux vl">
                <div class="vl-content-block vl-content-block--full-width">
                    <vl-title type="h2">icon (vds · flux · vl)</vl-title>
                    <p>
                        <code>flux-icon</code> erft <code>VlIcon</code>. De glyphs komen uit de gedeelde
                        <code>vlaanderen-icon</code>-font, dus visueel identiek over de drie varianten. Een
                        selectie iconen, elk in <code>vds-icon</code> · <code>flux-icon</code> · de echte flux
                        <code>vl-icon</code> (grootte <code>large</code>):
                    </p>
                    <p
                        style="max-width: 620px; margin: 0 0 12px; padding: 8px 12px; font-size: 12px;
                               border-left: 3px solid #d9a441; background: #fffdf5; color: #6b5a1e;"
                    >
                        <b>Bekend verschil:</b> op deze playground tonen <code>vds-icon</code>/<code>flux-icon</code>
                        andere en kleinere glyphs dan de echte <code>vl-icon</code>. Oorzaak: flux en VDS delen de
                        font-familienaam <code>vlaanderen-icon</code> maar met verschillende codepoint-conventies
                        (VDS <code>vl-vi-*</code>, flux <code>vl-icon--*</code>); op een pagina met beide wint één
                        font-bestand (hier dat van flux), dus de VDS-klassen mappen op verkeerde glyphs. Plus: de
                        VDS-icon-grootte is een rem-literal (12px op de 10px-root vs 18px bij vl-icon). In een echte
                        flux-op-VDS build (enkel VDS' font, geen <code>vl-icon</code>) speelt de glyph-collision niet.
                    </p>
                    <label
                        style="display: inline-flex; align-items: center; gap: 8px; margin: 0 0 12px;
                               padding: 8px 12px; border: 1px solid #cbd2d9; border-radius: 6px;
                               background: #fafbfc; font-size: 13px; cursor: pointer;"
                    >
                        <input
                            type="checkbox"
                            .checked=${this.iconScaled}
                            @change=${(e: Event) => (this.iconScaled = (e.target as HTMLInputElement).checked)}
                        />
                        <span>
                            <b>grootte-fix aan/uit</b> (scale-compensatie op de <code>flux-icon</code>-kolom):
                            ${this.iconScaled
                                ? 'AAN — font-size via calc(scaled-base) ≈ 19px (matcht vl-icon)'
                                : 'UIT — rauwe VDS-rem 1.2rem = 12px'}. Enkel de GROOTTE; de glyph-collision
                            blijft.
                        </span>
                    </label>
                    <div
                        style="display: grid; grid-template-columns: 130px 1fr 1fr 1fr; gap: 8px;
                               max-width: 620px; align-items: center;"
                    >
                        <div></div>
                        ${colHead('vds-icon', '#0055cc')} ${colHead('flux-icon', '#0055cc')}
                        ${colHead('vl-icon (echte flux)', '#6b7280')}
                        ${icons.map(
                            (name) => html`
                                <code style="font-size: 11px; color: #555;">${name}</code>
                                <div style="${iconCell}"><vds-icon icon="${name}" size="large"></vds-icon></div>
                                <div style="${iconCell}">
                                    <flux-icon icon="${name}" size="large" ?scaled=${this.iconScaled}></flux-icon>
                                </div>
                                <div style="${iconCell}"><vl-icon icon="${name}" size="large"></vl-icon></div>
                            `
                        )}
                    </div>
                    <p style="margin-top: 14px; font-size: 13px; color: #555; display: flex; align-items: center; gap: 6px;">
                        Groottes (<code>flux-icon</code>):
                        <flux-icon icon="calendar" size="small"></flux-icon> small ·
                        <flux-icon icon="calendar" size="medium"></flux-icon> medium ·
                        <flux-icon icon="calendar" size="large"></flux-icon> large
                    </p>
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
                <label
                    title="Zet alle consument-side flux-overrides aan/uit (flux-look ↔ rauw VDS)"
                    style="position: fixed; right: 20px; bottom: 20px; z-index: 1000;
                           display: inline-flex; align-items: center; gap: 8px;
                           padding: 10px 16px; border-radius: 999px; cursor: pointer;
                           font-size: 13px; font-weight: 600; user-select: none;
                           box-shadow: 0 2px 12px rgba(0, 0, 0, 0.18);
                           border: 1px solid ${this.overridesOff ? '#d9a441' : '#99c2ff'};
                           background: ${this.overridesOff ? '#fff3d6' : '#ffffff'};
                           color: ${this.overridesOff ? '#6b5a1e' : '#0055cc'};"
                >
                    <input
                        type="checkbox"
                        .checked=${this.overridesOff}
                        @change=${(e: Event) => (this.overridesOff = (e.target as HTMLInputElement).checked)}
                    />
                    ${this.overridesOff ? 'Rauw VDS (overrides UIT)' : 'Rauw VDS tonen'}
                </label>
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

                ${this.renderIntegrationStatus()} ${this.renderOverridesList()}

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
                        ${this.renderVariantRow(
                            'datepicker',
                            html`<vds-datepicker label="Datum"></vds-datepicker>`,
                            html`<flux-datepicker label="Datum"></flux-datepicker>`,
                            html`<vl-datepicker label="Datum"></vl-datepicker>`
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

                ${this.renderIconShowcase()}
            </main>
        `;
    }

    protected updated(): void {
        const off = this.overridesOff;
        const sel =
            'flux-button, flux-input, flux-link, flux-datepicker, flux-select, flux-checkbox, flux-textarea, flux-fieldset, flux-radio-group';
        this.querySelectorAll(sel).forEach((el) => el.toggleAttribute('bare', off));
        const form = this.querySelector('flux-form-demo');
        form?.shadowRoot?.querySelectorAll(sel).forEach((el) => el.toggleAttribute('bare', off));
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }
}
