import { html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { patchesFor, renderPatchNotes } from '../data/override-rows';
import { renderApiDetailAccordion } from '../data/api-detail-rows';

@customElement('pg-icon-showcase')
export class PgIconShowcase extends LitElement {
    @property({ type: Boolean })
    gapsOff = false;

    @state()
    private iconScaled = true;

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }

    render(): TemplateResult {
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
                        <code>flux-icon</code> erft <code>VlIcon</code>. Een selectie iconen, elk in
                        <code>vds-icon</code> · <code>flux-icon</code> · de echte flux <code>vl-icon</code>
                        (grootte <code>large</code>). De <code>vds-icon</code>-kolom staat, net als de andere
                        vds-rijen, in een <b>geïsoleerd iframe</b> (16px-root, VDS' eigen font, default
                        <code>vl-</code>-prefix), zodat VDS z'n iconen toont zoals bedoeld i.p.v. gebroken door
                        de flux-host-collision. Zo tonen alle drie de kolommen de juiste glyphs; de accordion
                        hieronder legt uit waaróm dat in de gedeelde flux-host nodig is.
                    </p>
                    <details open style="max-width: 900px; margin: 0 0 12px;">
                        <summary style="cursor: pointer; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                            Hoe laadt elke kolom z'n icon-font? (3 mechanismen)
                        </summary>
                        <div style="overflow-x: auto;">
                            <table
                                style="border-collapse: collapse; font-size: 12px; line-height: 1.5; min-width: 720px;"
                            >
                                <thead>
                                    <tr style="background: #f6f8fa; text-align: left;">
                                        <th style="border: 1px solid #e1e4e8; padding: 6px 10px;">kolom</th>
                                        <th style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            waar/hoe geladen
                                        </th>
                                        <th style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            <code>@font-face</code>-naam
                                        </th>
                                        <th style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            codepoint (calendar)
                                        </th>
                                        <th style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            override op de glyph
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            <b><code>vds-icon</code></b><br />(rauw, in iframe)
                                        </td>
                                        <td style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            apart document (<code>vds-frame.ts</code>): <code>defineAll()</code>
                                            met default <code>vl-</code>-prefix + VDS' font-CSS
                                            (<code>…/iconfont/vlaanderen-icon.css</code>), 16px-root, geen flux
                                        </td>
                                        <td style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            <code>vlaanderen-icon</code><br />(= VDS' font)
                                        </td>
                                        <td style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            <code>.vl-vi-calendar</code> = <code>U+f2c4</code>
                                        </td>
                                        <td style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            geen — geïsoleerd, dus geen collision
                                        </td>
                                    </tr>
                                    <tr style="background: #fbfcfd;">
                                        <td style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            <b><code>flux-icon</code></b><br />(erft <code>VlIcon</code>)
                                        </td>
                                        <td style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            VDS' font, maar op documentniveau geladen onder een UNIEKE naam
                                            (<code>vds-iconfont-alias.ts</code>) om de naam-collision te ontwijken
                                        </td>
                                        <td style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            <code>vds-vlaanderen-icon</code><br />(= VDS' font, hernoemd)
                                        </td>
                                        <td style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            <code>.vl-vi-calendar</code> = <code>U+f2c4</code><br />(erft VDS'
                                            codepoint-map)
                                        </td>
                                        <td style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            in flux-icon's shadow:
                                            <code>:host [class*='vl-vi-']::before { font-family:
                                            'vds-vlaanderen-icon' !important }</code>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            <b><code>vl-icon</code></b><br />(echte flux)
                                        </td>
                                        <td style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            flux' eigen font op documentniveau (<code>flux-iconfont.ts</code>, CDN),
                                            geïnjecteerd als LAATSTE <code>@font-face</code> zodat het bij gelijke
                                            naam de collision wint
                                        </td>
                                        <td style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            <code>vlaanderen-icon</code><br />(= flux' eigen font)
                                        </td>
                                        <td style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            <code>.vl-icon--calendar</code> = <code>U+f14b</code><br />(flux' eigen
                                            codepoint-map)
                                        </td>
                                        <td style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            geen — gebruikt de documentbrede <code>vlaanderen-icon</code> die flux wint
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p style="font-size: 12px; color: #555; margin: 8px 0 0;">
                            Kern: er zijn twee gelijknamige <code>vlaanderen-icon</code>-fonts (flux + VDS) met
                            verschillende codepoint-maps. Op de gedeelde pagina laten we ze coexisteren door VDS'
                            font onder de alias <code>vds-vlaanderen-icon</code> te zetten (voor <code>flux-icon</code>)
                            en flux' font de plain naam te laten winnen (voor <code>vl-icon</code>); de rauwe
                            <code>vds-icon</code> ontwijkt de collision door isolatie in een iframe.
                        </p>
                    </details>
                    <details
                        style="max-width: 620px; margin: 0 0 12px; border-left: 3px solid #d9a441;
                               background: #fffdf5; color: #6b5a1e; border-radius: 4px;"
                    >
                        <summary style="cursor: pointer; font-weight: 600; padding: 8px 12px; font-size: 12px;">
                            Waarom zien de iconen er (deels) anders uit? (font-collision + alias-fix)
                        </summary>
                        <div style="padding: 0 12px 10px; font-size: 12px; line-height: 1.55;">
                        <b>Font-collision, opgelost via een alias:</b> flux en VDS shippen allebei een font met
                        dezelfde naam <code>vlaanderen-icon</code> maar met verschillende codepoint-maps (VDS
                        <code>f101–f316</code>, flux overlapt). Beide full-range → er wint er één (die van flux), dus de
                        VDS-codepoints (die <code>flux-icon</code> gebruikt) mappen op verkeerde glyphs. <b>Fix op
                        <code>flux-icon</code>:</b> we laden VDS' font onder een UNIEKE naam
                        <code>vds-vlaanderen-icon</code> (document-niveau, geen collision) en overrulen op flux-icon
                        de <code>font-family</code> van de glyph naar die alias (met <code>:host</code>-specificiteit
                        + <code>!important</code>, om VDS' eigen <code>!important</code> te verslaan). Zo rendert
                        <code>flux-icon</code> correct én blijft <code>vl-icon</code> (flux' font) correct: <b>beide
                        fonts bestaan naast elkaar</b>. De <b>rauwe <code>vds-icon</code>-kolom</b> en het
                        <b>checkbox-vinkje</b> (intern een <code>&lt;vds-icon icon="check"&gt;</code>) tonen nog de
                        collision: dat is de VDS-icon-tag zelf, waarvan de glyph in een geneste shadow zit die we van
                        buitenaf niet bereiken (in een flux-op-VDS build speelt dat niet). Los hiervan blijft de
                        VDS-icon-GROOTTE een rem-literal (zie de grootte-toggle).
                        <br /><b>Waarom staat de fix op <code>flux-icon</code> en niet op de rauwe
                        <code>vds-icon</code> — lijkt dat niet omgekeerd?</b> Nee: we kunnen enkel de componenten
                        bijsturen die we <b>zélf definiëren</b> (<code>flux-icon</code> erft <code>VlIcon</code>, dus
                        we voegen een regel toe aan zíjn shadow); de rauwe <code>vds-icon</code> en de echte
                        <code>vl-icon</code> subclassen we niet, dus die houden wat de cascade kiest. Bovendien is dit
                        <b>puur een playground-artefact</b>: enkel hier laden we naast VDS' font óók flux' legacy
                        <code>vlaanderen-icon</code>-font (voor de <code>vl-icon</code>-referentiekolom), waardoor twee
                        gelijknamige fonts botsen. In een echte flux-op-VDS build is er maar één
                        <code>vlaanderen-icon</code> (die van VDS), dus rendert <code>flux-icon</code> daar
                        <b>standaard correct, zonder enige override</b> — de alias is louter steiger om de twee fonts
                        hier naast elkaar te tonen.
                        </div>
                    </details>
                    <label
                        style="display: inline-flex; align-items: center; gap: 8px; margin: 0 0 12px;
                               padding: 8px 12px; border: 1px solid #cbd2d9; border-radius: 6px;
                               background: #fafbfc; font-size: 13px; cursor: pointer;"
                    >
                        <input
                            type="checkbox"
                            .checked=${!this.iconScaled}
                            @change=${(e: Event) => (this.iconScaled = !(e.target as HTMLInputElement).checked)}
                        />
                        <span>
                            <b>Toon rauwe VDS-grootte</b> op de <code>flux-icon</code>-kolom:
                            ${this.iconScaled
                                ? 'UIT — grootte-fix actief, font-size via calc(scaled-base) ≈ 19px (matcht vl-icon).'
                                : 'AAN — rauwe VDS-rem 1.2rem = 12px (het probleem).'}
                            Enkel de GROOTTE; de glyphs zijn standaard al correct via de alias.
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
                                <div style="${iconCell}">
                                    <iframe
                                        src="/vds-frame.html?demo=icon&name=${name}"
                                        style="border: 0; width: 100%; height: 34px;"
                                        title="rauw VDS ${name}, geïsoleerd (16px-root, VDS-font, default vl-prefix)"
                                    ></iframe>
                                </div>
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
                    ${this.gapsOff
                        ? nothing
                        : html`${renderPatchNotes(patchesFor('flux-icon'), html`<code>flux-icon</code>`)}
                          ${renderApiDetailAccordion('vl-icon')}`}
                </div>
            </section>
        `;
    }
}
