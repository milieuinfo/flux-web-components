import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent, VlLinkComponent, VlTitleComponent } from '@domg-wc/components/atom';
import {
    VlInfoTile,
    VlPopoverActionComponent,
    VlPopoverActionListComponent,
    VlPopoverComponent,
    VlPropertiesComponent,
} from '@domg-wc/components/block';
import { VlHeader } from '@domg-wc/components/compliance';
import { VlFooter as VlFooterNext } from '@domg-wc/components/compliance/next';
import { VlFormCrossValidationComponent } from '@domg-wc/integrations/form';
import {
    VlDatepickerComponent,
    VlFormLabelComponent,
    VlInputFieldComponent,
} from '@domg-wc/components/form';
import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import './composite-input-showcase.component';

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
            VlHeader,
            VlPopoverComponent,
            VlPopoverActionListComponent,
            VlPopoverActionComponent,
            VlDatepickerComponent,
            VlInfoTile,
            VlPropertiesComponent,
            VlFooterNext,
            VlFormCrossValidationComponent,
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

        return html`
            <vl-template>
                <vl-header
                    slot="header"
                    development
                    simple
                    identifier="59188ff6-662b-45b9-b23a-964ad48c2bfb"
                ></vl-header>
                <main slot="main">
                    <composite-input-showcase></composite-input-showcase>
                    <section class="vl-section">
                        <div class="vl-content-block vl-content-block--full-width">
                            <vl-title type="h2">Cross-validatie voorbeeld</vl-title>
                            <vl-form-cross-validation></vl-form-cross-validation>
                        </div>
                    </section>

                    <section class="vl-section">
                        <div class="vl-content-block vl-content-block--full-width">
                            <vl-info-tile highlight-left>
                                <vl-properties
                                    slot="content"
                                    .props="${[
                                        {
                                            items: [
                                                {
                                                    labels: ['Item'],
                                                    data: ['Value'],
                                                },
                                            ],
                                        },
                                    ]}"
                                >
                                </vl-properties>
                            </vl-info-tile>
                            <vl-title type="h2">Breadcrumbs met submenus</vl-title>
                            <vl-breadcrumb>
                                <vl-breadcrumb-item type="button" @click=${(e: Event) => e.preventDefault()}>
                                    <vl-icon small right-margin icon="folder"></vl-icon>
                                    Dieren
                                </vl-breadcrumb-item>
                                <div>
                                    <vl-breadcrumb-item
                                        id="submenu"
                                        type="button"
                                        @click=${(e: Event) => e.preventDefault()}
                                    >
                                        Zoogdieren
                                    </vl-breadcrumb-item>
                                    <vl-popover
                                        distance="6"
                                        for="submenu"
                                        hide-arrow
                                        placement="bottom-start"
                                        trigger="click hover"
                                    >
                                        <vl-popover-action-list>
                                            <vl-popover-action icon="folder"> Zoogdieren </vl-popover-action>
                                            <vl-popover-action icon="folder"> Reptielen </vl-popover-action>
                                            <vl-popover-action icon="folder"> Vogels </vl-popover-action>
                                        </vl-popover-action-list>
                                    </vl-popover>
                                </div>

                                <div>
                                    <vl-breadcrumb-item
                                        id="submenu-apen"
                                        type="button"
                                        @click=${(e: Event) => e.preventDefault()}
                                    >
                                        Apen
                                    </vl-breadcrumb-item>
                                    <vl-popover
                                        distance="6"
                                        for="submenu-apen"
                                        hide-arrow
                                        placement="bottom-start"
                                        trigger="click hover"
                                    >
                                        <vl-popover-action-list>
                                            <vl-popover-action icon="folder"> Apen </vl-popover-action>
                                            <vl-popover-action icon="folder"> Knaagdieren </vl-popover-action>
                                        </vl-popover-action-list>
                                    </vl-popover>
                                </div>
                            </vl-breadcrumb>
                        </div>
                    </section>

                    <section class="vl-section">
                        <div class="vl-content-block vl-content-block--full-width">
                            <vl-title type="h2">FLUX-595 — datepicker positioning bug repro</vl-title>
                            <p>
                                Beide datepickers zitten in een identieke <code>transform + overflow:auto</code> parent
                                — de exacte ancestor-conditie die de oude positioning-hack breekt.
                                Klik op de kalender-knoppen om te vergelijken.
                            </p>
                            <div style="display: flex; gap: 20px; margin-top: 16px;">
                                <div style="flex: 1; border: 2px dashed crimson; padding: 12px; background: #fffbe6;">
                                    <strong style="color: crimson;">A — inline-positioning (oude hack, bug)</strong>
                                    <p style="margin: 4px 0 8px; font-size: 13px; color: #666;">
                                        getBoundingClientRect-hack — calendar landt op verkeerde plek / clipt door overflow.
                                    </p>
                                    <div
                                        style="transform: translateX(0); overflow: auto; max-height: 180px;
                                               border: 1px solid #ccc; padding: 10px;"
                                    >
                                        <div style="height: 60px;"></div>
                                        <vl-datepicker label="Vanaf" inline-positioning></vl-datepicker>
                                        <div style="height: 400px;"></div>
                                    </div>
                                </div>
                                <div style="flex: 1; border: 2px dashed green; padding: 12px; background: #f0fff0;">
                                    <strong style="color: green;">B — default (anchor-positioning, fix)</strong>
                                    <p style="margin: 4px 0 8px; font-size: 13px; color: #666;">
                                        Popover top-layer + CSS Anchor Positioning — ontsnapt aan ancestor context.
                                    </p>
                                    <div
                                        style="transform: translateX(0); overflow: auto; max-height: 180px;
                                               border: 1px solid #ccc; padding: 10px;"
                                    >
                                        <div style="height: 60px;"></div>
                                        <vl-datepicker label="Vanaf"></vl-datepicker>
                                        <div style="height: 400px;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="vl-section">
                        <div class="vl-content-block vl-content-block--full-width">
                            <vl-title type="h2">FLUX-710: vl-button cta-link met download attribuut</vl-title>
                            <p>
                                Drie varianten: zonder download (navigeert), download zonder waarde (browser kiest
                                bestandsnaam) en download met bestandsnaam. Klik en controleer dat de browser het
                                bestand downloadt in plaats van te navigeren.
                            </p>
                            <div style="display: flex; gap: 12px; margin-top: 16px;">
                                <vl-button cta-link="data:text/plain;charset=utf-8,FLUX-710 demo">
                                    Zonder download (navigeert)
                                </vl-button>
                                <vl-button download cta-link="data:text/plain;charset=utf-8,FLUX-710 demo">
                                    Download zonder bestandsnaam
                                </vl-button>
                                <vl-button
                                    download="verslag.txt"
                                    icon="file-download"
                                    cta-link="data:text/plain;charset=utf-8,FLUX-710 demo"
                                >
                                    Download als verslag.txt
                                </vl-button>
                            </div>
                        </div>
                    </section>

                    <section class="vl-section">
                        <div class="vl-content-block vl-content-block--full-width">
                            <vl-title type="h2">
                                FLUX-704 — drie varianten naast elkaar (vds · flux · vl)
                            </vl-title>
                            <p>
                                Upstream <code>@govflanders/vl-ui-design-system-web-components</code> via
                                <code>defineAll('vds')</code>. flux <code>vl-*</code> en VDS
                                <code>vds-*</code> leven samen op één pagina zonder registry-collision.
                                Elke component in drie varianten; de diepere styling-analyse per component
                                staat op <a href="/styling.html">/styling.html</a>.
                            </p>

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

                    <section class="vl-section">
                        <div class="vl-content-block vl-content-block--full-width">
                            <vl-title type="h2">
                                FLUX-704 — VDS layout-primitieven (box · inline · stack)
                            </vl-title>
                            <p>
                                VDS levert drie declaratieve layout-web-<b>componenten</b>. flux heeft die
                                niet als component, maar wél een eigen set layout-<b>styles</b>
                                (<code>vl-group</code>, <code>vl-stacked</code>, <code>vl-padding</code>,
                                globaal geladen via <code>autoRegisterStyles</code>). Per primitief
                                hieronder: links het VDS-component, rechts exact hetzelfde met onze eigen
                                flux layout-styles (geen ad-hoc CSS).
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
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start; margin-bottom: 24px;">
                                <div>
                                    <div style="font-weight: 600; margin-bottom: 6px; color: #0055cc;">
                                        VDS · vds-inline
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
                                    <div style="font-weight: 600; margin-bottom: 6px; color: #6b7280;">
                                        flux · vl-group
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
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start; margin-bottom: 8px;">
                                <div>
                                    <div style="font-weight: 600; margin-bottom: 6px; color: #0055cc;">
                                        VDS · vds-stack
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
                                    <div style="font-weight: 600; margin-bottom: 6px; color: #6b7280;">
                                        flux · vl-stacked
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

                    <section class="vl-section">
                        <div class="vl-content-block vl-content-block--full-width">
                            <vl-title type="h2">
                                FLUX-704 — VDS-form: rauw VDS (formAssociated via FormData)
                            </vl-title>
                            <p>
                                <b>Let op:</b> dit is bewust de <b>rauwe <code>vds-*</code></b> variant
                                (dus de VDS-look met o.a. 8px-afronding), niet de flux-look. Doel hier is
                                puur het <code>formAssociated</code>-gedrag tonen: een echte native
                                <code>&lt;form&gt;</code> waar <code>new FormData(form)</code> de waarden via
                                <code>name</code> leest, ook onder de custom prefix. De flux-look zou via de
                                <code>flux-*</code> doelproducten komen (zie de vergelijking bovenaan);
                                <code>flux-input</code> erft dezelfde <code>formAssociated</code>, dus dit
                                blijft werken. Vul in en klik Verzenden.
                            </p>
                            <div style="max-width: 520px;">
                                <vds-form-demo></vds-form-demo>
                            </div>
                        </div>
                    </section>

                    <section class="vl-section" style="padding-bottom: 0;">
                        <div class="vl-content-block vl-content-block--full-width" style="margin-bottom: 0;">
                            <vl-title type="h2">Sticky footer overlap repro</vl-title>
                            <p>
                                Echte global footer widget (tni, MJV identifier, collapsible). Zonder fix bedekt de
                                fixed bar (35px) de onderste content; met fix reserveert
                                <code>#footer__container</code> de bar-hoogte via <code>min-height</code>.
                            </p>
                            <div style="height: 900px;"></div>
                            <div
                                id="sticky-footer-last-content"
                                style="border: 3px solid crimson; background: #fffbe6; padding: 6px 10px;
                                       font-weight: bold; margin-bottom: 0;"
                            >
                                ONDERSTE CONTENT: moet volledig zichtbaar blijven boven de footer-bar
                            </div>
                        </div>
                    </section>
                    <vl-footer-next development identifier="9e74e418-5be0-48ba-9c43-7d420f3a0e1c"></vl-footer-next>
                </main>
            </vl-template>
        `;
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        // gaat shadow dom uitzetten
        return this;
    }
}
