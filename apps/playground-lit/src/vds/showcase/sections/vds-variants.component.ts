import { html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { OverrideRow, patchesFor, renderPatchNotes } from '../data/override-rows';
import { renderApiDetailAccordion } from '../data/api-detail-rows';
import { vdsFrame } from '../shared/vds-frame.helper';

@customElement('pg-variants')
export class PgVariants extends LitElement {
    @property({ type: Boolean })
    gapsOff = false;

    @property({ type: Boolean })
    showTechnical = false;

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }

    private renderVariantRow(
        name: string,
        vds: TemplateResult,
        flux: TemplateResult,
        vl: TemplateResult,
        patches?: OverrideRow[],
        colRatio = 'repeat(3, minmax(0, 1fr))'
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
                style="display: grid; grid-template-columns: ${colRatio}; gap: 12px; max-width: 960px; margin-bottom: 8px;"
            >
                ${cell('vds · rauw VDS', '#0055cc', vds)}
                ${cell('flux · erft VDS + tokens', '#0055cc', flux)}
                ${cell('vl · echte flux', '#6b7280', vl)}
            </div>
            ${this.gapsOff
                ? nothing
                : html`${patches && patches.length
                      ? renderPatchNotes(patches, html`<code>flux-${name}</code>`)
                      : ''}
                  ${renderApiDetailAccordion(`vl-${name}`)}`}
        `;
    }

    private renderTitleVariant(): TemplateResult {
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
        const note = (text: string) => html`<span style="font-size: 12px; color: #6b7280;">${text}</span>`;
        return html`
            <div style="font-weight: 600; margin: 6px 0;">title</div>
            <div
                style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; max-width: 960px; margin-bottom: 8px;"
            >
                ${cell(
                    'vds · rauw VDS',
                    '#0055cc',
                    note('Geen VDS title-component: VDS levert enkel typografie-tokens, geen web-component.')
                )}
                ${cell(
                    'flux · erft VDS + tokens',
                    '#0055cc',
                    note('Geen flux-title-adapter: er is geen VDS-component om onderliggend te erven.')
                )}
                ${cell(
                    'vl · echte flux',
                    '#6b7280',
                    html`<vl-title type="h3">Titel h3</vl-title><vl-title type="h4">Titel h4</vl-title>`
                )}
            </div>
            ${this.gapsOff ? nothing : renderApiDetailAccordion('vl-title')}
        `;
    }

    render(): TemplateResult {
        return html`
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
                                    VDS het vandaag definieert, geen aanpassing. Getoond in een
                                    <b>geïsoleerd iframe</b> (eigen document: 16px-root, VDS' eigen
                                    icon-font, default <code>vl-</code>-prefix), want in de flux-host
                                    zou rauw VDS gebroken ogen door de flux-omgeving (font-collision,
                                    10px-root, prefix-bug) en niet door VDS zelf.
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

                        ${!this.showTechnical
                            ? nothing
                            : html`<details
                            style="max-width: 900px; margin: 0 0 16px; border-left: 3px solid #99c2ff;
                                   background: #f4f9ff; border-radius: 4px;"
                        >
                            <summary style="cursor: pointer; font-weight: 600; padding: 8px 12px; font-size: 12px;">
                                De iframe-tactiek: waarom &amp; hoe de <code>vds-*</code>-kolommen geïsoleerd staan
                            </summary>
                            <div style="padding: 0 12px 10px; font-size: 12px; line-height: 1.55;">
                                <b>Probleem:</b> op déze pagina draaien flux en VDS samen. Rauw VDS oogt daardoor
                                gebroken door <b>drie host-artefacten</b> die van ONZE omgeving komen, niet van VDS
                                zelf: (1) de <b>font-collision</b> (flux en VDS shippen allebei een
                                <code>vlaanderen-icon</code>-font met verschillende codepoint-maps), (2) de
                                <b>10px-root</b> (flux zet de root op 62.5%, VDS is voor 16px ontworpen → alles te
                                klein), en (3) de <b>prefix-selector-bug</b> (interne VDS-CSS die
                                <code>vl-icon</code> hardcodeert matcht niet onder de <code>vds-</code>-prefix).
                                <br /><br />
                                <b>Tactiek:</b> elke <code>vds-*</code>-cel is een <code>&lt;iframe&gt;</code> naar een
                                aparte mini-pagina (<code>vds-frame.html</code>, eigen webpack-entry
                                <code>vds-frame.ts</code>). Dat is een <b>volledig apart document</b> met een eigen
                                DOM, CSS-scope en font-registratie. Daarin doen we <code>defineAll()</code> met de
                                <b>default <code>vl-</code>-prefix</b>, laden we <b>VDS' eigen font + thema</b>, en
                                laten we de root op de <b>browser-default 16px</b> — <b>zonder flux erbij</b>. Zo
                                vallen alle drie de artefacten weg en toont VDS zich <b>zoals bedoeld</b>, terwijl de
                                kolom eerlijk "rauw VDS" blijft.
                                <br /><br />
                                <b>Trade-off / kanttekening:</b> het is puur een <b>demonstratie-truc</b> voor déze
                                gemengde playground. Een echte flux-op-VDS build (enkel VDS, zonder flux' legacy font
                                en op een 16px-root) heeft de iframe níét nodig. Omdat het een los document is, is er
                                ook geen live token-/styling-interactie met de flux-pagina eromheen, en popovers
                                (bv. de datepicker-kalender) worden begrensd door de iframe-rand — vandaar dat die
                                cel hoger/breder staat.
                            </div>
                        </details>`}

                        ${this.renderVariantRow(
                            'button',
                            vdsFrame('button', 65),
                            html`<flux-button>Primair</flux-button
                                ><flux-button secondary>Secundair</flux-button>`,
                            html`<vl-button>Primair</vl-button
                                ><vl-button secondary>Secundair</vl-button>`,
                            patchesFor('flux-button')
                        )}
                        ${this.renderVariantRow(
                            'input',
                            vdsFrame('input', 105),
                            html`<flux-input label="Naam" placeholder="flux-input"></flux-input>`,
                            html`<vl-form-label block for="cmp-vl-input" label="Naam"></vl-form-label
                                ><vl-input-field
                                    id="cmp-vl-input"
                                    aria-label="Naam"
                                    placeholder="flux"
                                ></vl-input-field>`,
                            patchesFor('fluxLook', 'flux-input')
                        )}
                        ${this.renderVariantRow(
                            'link',
                            vdsFrame('link', 50),
                            html`<flux-link href="https://www.vlaanderen.be">flux-link</flux-link>`,
                            html`<vl-link href="https://www.vlaanderen.be">flux link</vl-link>`,
                            patchesFor('flux-link')
                        )}
                        ${this.renderVariantRow(
                            'datepicker',
                            vdsFrame('datepicker', 520),
                            html`<flux-datepicker label="Datum"></flux-datepicker>`,
                            html`<vl-form-label block for="cmp-vl-dp" label="Datum"></vl-form-label
                                ><vl-datepicker id="cmp-vl-dp" label="Datum"></vl-datepicker>`,
                            patchesFor('fluxLook', 'flux-datepicker'),
                            'minmax(0, 1.8fr) minmax(0, 1fr) minmax(0, 1fr)'
                        )}
                        ${this.renderVariantRow(
                            'checkbox',
                            vdsFrame('checkbox', 50),
                            html`<flux-checkbox label="Ik ga akkoord" checked></flux-checkbox>`,
                            html`<vl-checkbox checked>Ik ga akkoord</vl-checkbox>`,
                            patchesFor('fluxLook', 'flux-checkbox')
                        )}
                        ${this.renderVariantRow(
                            'select',
                            vdsFrame('select', 300),
                            html`<flux-select label="Provincie">
                                <option value="antwerpen">Antwerpen</option>
                                <option value="limburg">Limburg</option>
                                <option value="oost-vlaanderen">Oost-Vlaanderen</option>
                            </flux-select>`,
                            html`<vl-form-label block for="cmp-vl-select" label="Provincie"></vl-form-label
                                ><vl-select
                                    id="cmp-vl-select"
                                    label="Provincie"
                                    .options=${[
                                        { value: 'antwerpen', label: 'Antwerpen' },
                                        { value: 'limburg', label: 'Limburg' },
                                        { value: 'oost-vlaanderen', label: 'Oost-Vlaanderen' },
                                    ]}
                                ></vl-select>`,
                            patchesFor('fluxLook', 'flux-select')
                        )}
                        ${this.renderVariantRow(
                            'radio-group',
                            vdsFrame('radio-group', 120),
                            html`<flux-radio-group label="Contactvoorkeur">
                                <vds-radio value="email" label="E-mail"></vds-radio>
                                <vds-radio value="post" label="Post"></vds-radio>
                            </flux-radio-group>`,
                            html`<vl-form-label block for="cmp-vl-radio" label="Contactvoorkeur"></vl-form-label
                                ><vl-radio-group id="cmp-vl-radio" label="Contactvoorkeur">
                                    <vl-radio value="email" label="E-mail">E-mail</vl-radio>
                                    <vl-radio value="post" label="Post">Post</vl-radio>
                                </vl-radio-group>`,
                            patchesFor('fluxLook', 'flux-radio-group')
                        )}
                        ${this.renderVariantRow(
                            'textarea',
                            vdsFrame('textarea', 130),
                            html`<flux-textarea label="Bericht" placeholder="flux-textarea"></flux-textarea>`,
                            html`<vl-form-label block for="cmp-vl-textarea" label="Bericht"></vl-form-label
                                ><vl-textarea
                                    id="cmp-vl-textarea"
                                    aria-label="Bericht"
                                    placeholder="flux"
                                ></vl-textarea>`,
                            patchesFor('fluxLook', 'flux-textarea')
                        )}
                        ${this.renderVariantRow(
                            'fieldset',
                            vdsFrame('fieldset', 150),
                            html`<flux-fieldset label="Voorkeuren">
                                <flux-checkbox label="Sport" checked></flux-checkbox>
                                <flux-checkbox label="Cultuur"></flux-checkbox>
                            </flux-fieldset>`,
                            html`<vl-fieldset>
                                <span slot="legend">Voorkeuren</span>
                                <vl-checkbox checked>Sport</vl-checkbox>
                                <vl-checkbox>Cultuur</vl-checkbox>
                            </vl-fieldset>`
                        )}
                        ${this.renderTitleVariant()}
                    </div>
                </section>
        `;
    }
}
