// FLUX-704: vergelijkingspagina. Per element (button, input, link, title) drie
// kolommen: ECHTE flux-component | VDS-default | VDS met "flux-skin".
//
// De flux-skin reskined de VDS-component via:
//  - TOKEN-override: flux radius op de --base-* radius-token (idiomatisch).
//  - ::part(): voor zaken die niet in een token zitten (border-width,
//    font-weight, underline).
//
// VDS-kolommen krijgen zoom: 1.6 omdat VDS rem-tokens 16px-root verwachten en
// flux' govflanders-style de document-root op 10px zet (zie vds-form.component).
import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('vds-styling-demo')
export class VdsStylingDemo extends LitElement {
    static styles = css`
        :host {
            display: block;
            padding: 24px;
            font-family: 'Flanders Art Sans', Arial, sans-serif;
            color: #333332;
        }
        h1 {
            font-size: 24px;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            max-width: 1100px;
        }
        th,
        td {
            border: 1px solid #cbd2d9;
            padding: 16px;
            text-align: left;
            vertical-align: top;
            width: 33%;
        }
        th {
            background: #f1f3f5;
            font-weight: 500;
        }
        caption {
            text-align: left;
            font-weight: 500;
            padding: 12px 0 6px;
        }
        .note {
            color: #6b7280;
            font-size: 13px;
            margin: 4px 0 20px;
        }

        /* Rem-schaal wordt globaal gecompenseerd via vds-scale-compensation.css
           (puur rem, geen zoom). Geen per-kolom zoom meer nodig. */

        /* ---- flux-skin: VDS naar de oude flux-look, ENKEL via tokens + ::part ----
           Doel: VDS' eigen treatment matchen met hoe het er vroeger uitzag, niet
           flux-CSS erbovenop mengen. */
        .flux-skin {
            /* TOKEN-override: flux gebruikt 0.3rem radius. */
            --base-border-radius-selectable-default: 0.3rem;
            /* Link: underline-KLEUR naar flux-blauw (VDS default = lichtblauw).
               Offset/thickness zitten hardcoded in de encapsulated .vl-link__slot
               en zijn NIET via token/::part bereikbaar -> blijven afwijken. */
            --base-color-underline-action-default: #0055cc;
            --base-color-underline-action-hover: #0048ad;
            --base-color-underline-action-active: #002f70;
            /* Input: de zichtbare border zit op .vl-input__input-wrapper (GEEN part),
               maar die leest tokens -> radius/width/kleur via token, niet via ::part. */
            --base-color-border-default: #8695a8;
        }
        /* Button: ::part(button) is de echte button -> dit is een schone override
           (geen mix), border/radius/weight matchen flux. */
        .flux-skin vlds-button::part(button) {
            border-width: 2px;
            font-weight: 500;
            border-radius: 0.3rem;
        }
        /* Button padding: VDS heeft 14px horizontaal, flux 10px. Override de
           inset-token (scale-aware), enkel in button-scope zodat de input-scope
           niet meegesleurd wordt (button + input delen de vertical-token). */
        .flux-skin vlds-button {
            --base-space-selectable-inset-horizontal-l: calc(0.625rem * var(--vl-wc-rem-scale, 1));
        }
        /* Input: flux-input ~35px hoog (hoogte uit min-height/line-height), VDS uit
           padding. 0 verticaal maakt VDS te laag (22px), dus mik op flux-HOOGTE
           i.p.v. flux' padding-waarde: ~6px verticaal -> ~34px. Horizontaal naar
           flux' 10px. Finding: hoogte van flux is intrinsiek, van VDS padding-gedreven. */
        .flux-skin vlds-input {
            --base-space-container-inset-vertical-s: calc(0.375rem * var(--vl-wc-rem-scale, 1));
            --base-space-container-inset-horizontal-l: calc(0.625rem * var(--vl-wc-rem-scale, 1));
        }
        /* Input: GEEN ::part(input) voor de border. De zichtbare border zit op een
           interne wrapper (geen part); die leest tokens, dus radius/width/kleur
           gaan via de tokens op .flux-skin hierboven. ::part(input) = enkel het
           kale input-element (geen border). */
        /* GEEN ::part(link) underline meer: VDS onderstreept de interne
           .vl-link__slot, niet de <a>. Een underline op part(link) zou een
           TWEEDE lijn toevoegen (de bug die je zag). We laten VDS' eigen
           underline staan en sturen enkel de kleur via token hierboven. */

        .findings {
            max-width: 1100px;
            margin: 4px 0 24px;
            padding: 10px 14px;
            border-left: 3px solid #cbd2d9;
            background: #fafbfc;
            font-size: 13px;
            color: #44484d;
        }
        .findings b {
            font-weight: 600;
        }
        .ok {
            color: #1e7a34;
        }
        .nok {
            color: #b3261e;
        }

        /* Native heading met VDS-typografie-tokens (VDS heeft geen title). */
        .vds-title {
            font-size: var(--base-typography-desktop-title-l-font-size, 2rem);
            font-family: var(--base-typography-desktop-title-l-font-family, 'Flanders Art Sans');
            font-weight: var(--base-typography-desktop-title-l-font-weight, 500);
            line-height: var(--base-typography-desktop-title-l-line-height, 1.2);
            margin: 0;
        }
    `;

    render(): TemplateResult {
        return html`
            <h1>FLUX-704 - VDS-componenten herstijlen naar flux-look</h1>
            <p class="note">
                Per rij: links de echte flux-component, midden VDS-default, rechts VDS met een
                "flux-skin" (token-override + <code>::part()</code>). VDS-kolommen zijn op schaal
                gezet (zoom 1.6) wegens de 10px/16px rem-basis.
            </p>

            <table>
                <caption>vl-button</caption>
                <thead>
                    <tr>
                        <th>flux (vl-button)</th>
                        <th>VDS default (vlds-button)</th>
                        <th>VDS flux-skin</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <vl-button>Primair</vl-button>
                            <vl-button secondary>Secundair</vl-button>
                        </td>
                        <td class="vds">
                            <vlds-button variant="primary">Primair</vlds-button>
                            <vlds-button variant="secondary">Secundair</vlds-button>
                        </td>
                        <td class="vds flux-skin">
                            <vlds-button variant="primary">Primair</vlds-button>
                            <vlds-button variant="secondary">Secundair</vlds-button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p class="findings">
                <b>button:</b> <span class="ok">volledig matchbaar</span> (1-op-1 met flux: 10px padding,
                44px hoog, 74px breed). Radius via token, border-width + font-weight via
                <code>::part(button)</code>, horizontale padding via de inset-token
                (<code>--base-space-selectable-inset-horizontal-l</code>, scope vlds-button).
            </p>

            <table>
                <caption>vl-input</caption>
                <thead>
                    <tr>
                        <th></th>
                        <th>flux (vl-input-field)</th>
                        <th>VDS default (vlds-input)</th>
                        <th>VDS flux-skin</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>zonder label (enkel veld)</th>
                        <td>
                            <vl-input-field placeholder="flux" aria-label="flux input"></vl-input-field>
                        </td>
                        <td>
                            <vlds-input placeholder="VDS" aria-label="VDS input"></vlds-input>
                        </td>
                        <td class="flux-skin">
                            <vlds-input placeholder="VDS flux-skin" aria-label="VDS flux-skin"></vlds-input>
                        </td>
                    </tr>
                    <tr>
                        <th>met label</th>
                        <td>
                            <span class="note"
                                >flux <code>vl-input-field</code> heeft GEEN ingebouwd label (label is een
                                apart <code>vl-form-label</code>-component). Structureel verschil.</span
                            >
                        </td>
                        <td>
                            <vlds-input label="Naam" placeholder="VDS input"></vlds-input>
                        </td>
                        <td class="flux-skin">
                            <vlds-input label="Naam" placeholder="VDS flux-skin"></vlds-input>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p class="findings">
                <b>input:</b> <span class="ok">matchbaar via tokens</span> (radius, border, padding en
                box-hoogte ~flux: 34 vs 35px). Border zit op interne
                <code>.vl-input__input-wrapper</code> (geen part) die tokens leest: radius
                (<code>--base-border-radius-selectable-default</code>, 4px→3px), kleur
                (<code>--base-color-border-default</code>), padding (inset-tokens). Nuance: flux haalt
                z'n hoogte intrinsiek (min-height/line-height), VDS uit padding, dus ik mik op de
                box-HOOGTE i.p.v. flux' padding-waarde te kopieren. <code>::part(input)</code> is enkel
                het kale input-element (geen border).
                <br /><b>Label-verschil:</b> flux <code>vl-input-field</code> is enkel het veld (label =
                apart <code>vl-form-label</code>); VDS <code>vlds-input</code> heeft label/message/annotation
                ingebouwd. Daardoor is een VDS-input MET label hoger (label-blok erboven). Vergelijk dus
                "zonder label" voor een eerlijke veld-tot-veld-match. Zelfs zonder label is de VDS-host
                hoger: <code>vlds-input</code> is een grid-container (label/veld/message-rijen) die ruimte
                reserveert, terwijl flux' veld kaal is. Het veld-BOX zelf matcht wel (~34 vs 35px); het
                verschil is de form-layout-chrome eromheen (niet via tokens weg te krijgen).
            </p>

            <table>
                <caption>vl-link</caption>
                <thead>
                    <tr>
                        <th>flux (vl-link)</th>
                        <th>VDS default (vlds-link)</th>
                        <th>VDS flux-skin</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><vl-link href="https://www.vlaanderen.be">flux link</vl-link></td>
                        <td class="vds">
                            <vlds-link href="https://www.vlaanderen.be">VDS link</vlds-link>
                        </td>
                        <td class="vds flux-skin">
                            <vlds-link href="https://www.vlaanderen.be">VDS flux-skin link</vlds-link>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p class="findings">
                <b>link:</b> <span class="nok">deels matchbaar</span>. Underline-KLEUR via token
                (<code>--base-color-underline-action-*</code>) ✓. Maar underline <b>offset</b> (0.25rem)
                en <b>thickness</b> (0.125rem) zitten hardcoded in de encapsulated
                <code>.vl-link__slot</code> (geen token, geen part) → de VDS-underline blijft dikker en
                verder van de tekst dan flux. Niet oplosbaar via tokens/::part; vergt upstream
                (tokeniseren of part exposen). De eerdere dubbele lijn was mijn fout (underline op
                <code>part(link)</code> bovenop de slot-underline), nu verwijderd.
            </p>

            <table>
                <caption>vl-title (VDS heeft geen title-component)</caption>
                <thead>
                    <tr>
                        <th>flux (vl-title)</th>
                        <th>native heading + VDS-typografie-tokens</th>
                        <th>-</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><vl-title>flux titel</vl-title></td>
                        <td class="vds"><h2 class="vds-title">VDS-typografie titel</h2></td>
                        <td>
                            <span class="note"
                                >VDS levert geen title-component; enkel typografie-tokens om een
                                eigen heading te stijlen.</span
                            >
                        </td>
                    </tr>
                </tbody>
            </table>
            <p class="findings">
                <b>title:</b> <span class="nok">niet van toepassing</span>. VDS levert geen
                title/heading-component om te herstijlen. Enkel typografie-tokens
                (<code>--base-typography-desktop-title-*</code>) waarmee je een eigen
                <code>&lt;h2&gt;</code> kan stijlen richting de flux-look.
            </p>
        `;
    }
}
