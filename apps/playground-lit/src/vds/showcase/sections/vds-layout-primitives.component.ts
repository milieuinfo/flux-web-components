import { html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { patchesFor, renderPatchNotes } from '../data/override-rows';

@customElement('pg-layout-primitives')
export class PgLayoutPrimitives extends LitElement {
    @property({ type: Boolean })
    gapsOff = false;

    @property({ type: Boolean })
    showTechnical = false;

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }

    private codeBlock(code: string): TemplateResult | typeof nothing {
        if (!this.showTechnical) {
            return nothing;
        }
        return html`<pre
            style="margin: 8px 0 0; padding: 10px 12px; background: #f6f8fa; border: 1px solid #e1e4e8; border-radius: 6px; font-size: 12px; line-height: 1.5; overflow: auto;"
        >
${code}</pre
        >`;
    }

    render(): TemplateResult {
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
                                ${this.codeBlock(boxVds)}
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
                                ${this.codeBlock(boxFlux)}
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
                                ${this.codeBlock(inlineVds)}
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
                                ${this.codeBlock(inlineFluxBtn)}
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
                                ${this.codeBlock(inlineFlux)}
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
                            <b>Noot:</b> <code>vl-stacked</code> is
                            <code>display: flex; flex-direction: column</code>, dus met de flex-default
                            <code>align-items: stretch</code> rekken ALLE kinderen (zowel
                            <code>flux-button</code> als de echte <code>vl-button</code>) full-width, identiek.
                            Om ze te laten huggen zet je op de stack <code>align-items: flex-start</code>, wat
                            hier gebeurt zodat flux en vl gelijk staan (knoppen op natuurlijke breedte).
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
                                ${this.codeBlock(stackVds)}
                            </div>
                            <div>
                                <div style="font-weight: 600; margin-bottom: 6px; color: #0055cc;">
                                    flux · vl-stacked + flux-button
                                </div>
                                <div style="padding: 12px; border: 1px dashed #d0d7de; border-radius: 6px;">
                                    <div class="vl-stacked vl-stacked-small" style="align-items: flex-start;">
                                        <flux-button>Eén</flux-button>
                                        <flux-button secondary>Twee</flux-button>
                                        <flux-button tertiary>Drie</flux-button>
                                    </div>
                                </div>
                                ${this.codeBlock(stackFluxBtn)}
                            </div>
                            <div>
                                <div style="font-weight: 600; margin-bottom: 6px; color: #6b7280;">
                                    vl · vl-stacked + vl-button (echte flux)
                                </div>
                                <div style="padding: 12px; border: 1px dashed #d0d7de; border-radius: 6px;">
                                    <div class="vl-stacked vl-stacked-small" style="align-items: flex-start;">
                                        <vl-button>Eén</vl-button>
                                        <vl-button secondary>Twee</vl-button>
                                        <vl-button tertiary>Drie</vl-button>
                                    </div>
                                </div>
                                ${this.codeBlock(stackFlux)}
                            </div>
                        </div>
                        ${this.gapsOff
                            ? nothing
                            : renderPatchNotes(patchesFor('flux-button'), html`de <code>flux-button</code> in deze layout`)}
                    </div>
                </section>
        `;
    }
}
