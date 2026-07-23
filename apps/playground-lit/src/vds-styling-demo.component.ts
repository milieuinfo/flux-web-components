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
            <h1>FLUX-704 - drie varianten per component (vds · flux · vl)</h1>
            <p class="note">
                Elke component in drie varianten naast elkaar, in vaste kolomvolgorde. De rem-basis
                (10px/16px) wordt globaal gecompenseerd via <code>vds-scale-compensation.css</code>,
                geen zoom meer.
            </p>
            <div
                style="max-width: 1100px; margin: 0 0 20px; padding: 12px 16px; border: 1px solid #cbd2d9;
                       border-radius: 6px; background: #fafbfc; font-size: 13px;"
            >
                <strong>Legende</strong>
                <ul style="margin: 8px 0 0; padding-left: 18px; line-height: 1.6;">
                    <li>
                        <code style="color: #0055cc;">vds-*</code> — <b>rauw VDS</b>: exact zoals VDS het
                        vandaag definieert, geen aanpassing (geregistreerd via
                        <code>defineAll('vds')</code>).
                    </li>
                    <li>
                        <code style="color: #0055cc;">flux-*</code> — <b>ons doelproduct</b>: erft de VDS-klasse
                        (<code>VlButton</code>/<code>VlInput</code>/<code>VlLink</code>) en zet de flux-look via
                        design-tokens op <code>:host</code>. Geen extra shadow-laag.
                    </li>
                    <li>
                        <code style="color: #0055cc;">vl-*</code> — <b>onze echte flux web-component</b>,
                        ongewijzigd, zoals vóór FLUX-704.
                    </li>
                </ul>
            </div>

            <table>
                <caption>button</caption>
                <thead>
                    <tr>
                        <th>vds-button (rauw VDS)</th>
                        <th>flux-button (erft VlButton + flux-tokens)</th>
                        <th>vl-button (echte flux, ongewijzigd)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <vds-button variant="primary">Primair</vds-button>
                            <vds-button variant="secondary">Secundair</vds-button>
                        </td>
                        <td>
                            <flux-button>Primair</flux-button>
                            <flux-button secondary>Secundair</flux-button>
                            <flux-button tertiary>Tertiair</flux-button>
                            <flux-button ghost>Ghost</flux-button>
                        </td>
                        <td>
                            <vl-button>Primair</vl-button>
                            <vl-button secondary>Secundair</vl-button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p class="findings">
                <b>button:</b> de <code>flux-button</code>-kolom is het <b>doelproduct</b> via
                <b>inheritance</b>: het ERFT de VDS <code>VlButton</code> (VDS-code intact, geen extra
                shadow-laag, dus formAssociated/<code>::part</code>/events blijven native). De flux-look
                komt PUUR uit hun design-tokens op <code>:host</code> (radius, border-width, padding).
                <span class="ok">Volledig matchbaar</span> met flux vandaag (10px padding, 44px hoog,
                74px breed). De knoppen hierboven gebruiken de <b>oude flux boolean-API</b>
                (<code>secondary</code>/<code>tertiary</code>/<code>ghost</code>): een
                <code>willUpdate</code>-laag mapt die op de VDS <code>variant</code>-enum, zodat afnemers
                niets moeten wijzigen. Ook <code>large</code> naar <code>size</code> en
                <code>block</code> naar <code>grow="fill"</code>.
            </p>

            <table>
                <caption>input</caption>
                <thead>
                    <tr>
                        <th></th>
                        <th>vds-input (rauw VDS)</th>
                        <th>flux-input (erft VlInput + flux-tokens)</th>
                        <th>vl-input-field (echte flux)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>zonder label (enkel veld)</th>
                        <td>
                            <vds-input placeholder="VDS" aria-label="VDS input"></vds-input>
                        </td>
                        <td>
                            <flux-input placeholder="flux-input" aria-label="flux-input"></flux-input>
                        </td>
                        <td>
                            <vl-input-field placeholder="flux" aria-label="flux input"></vl-input-field>
                        </td>
                    </tr>
                    <tr>
                        <th>met label</th>
                        <td>
                            <vds-input label="Naam" placeholder="VDS input"></vds-input>
                        </td>
                        <td>
                            <flux-input label="Naam" placeholder="flux-input"></flux-input>
                        </td>
                        <td>
                            <span class="note"
                                >flux <code>vl-input-field</code> heeft GEEN ingebouwd label (label is een
                                apart <code>vl-form-label</code>-component). Structureel verschil.</span
                            >
                        </td>
                    </tr>
                </tbody>
            </table>
            <p class="findings">
                <b>input:</b> de <code>flux-input</code>-kolom is het <b>doelproduct</b> via
                <b>inheritance</b>: het ERFT de VDS <code>VlInput</code> (VDS-code intact, geen extra
                shadow-laag, formAssociated/validatie/<code>::part</code> blijven native). De flux-look
                komt PUUR uit hun design-tokens op <code>:host</code>.
                <span class="ok">Matchbaar via tokens</span> (radius, border, padding en box-hoogte
                ~flux: 34 vs 35px). Border zit op interne
                <code>.vl-input__wrapper</code> (geen part) die tokens leest: radius
                (<code>--base-border-radius-selectable-default</code>, 4px→3px), kleur
                (<code>--base-color-border-default</code>), padding (inset-tokens). Nuance: flux haalt
                z'n hoogte intrinsiek (min-height/line-height), VDS uit padding, dus ik mik op de
                box-HOOGTE i.p.v. flux' padding-waarde te kopieren. <code>::part(input)</code> is enkel
                het kale input-element (geen border).
                <br /><b>Label-verschil:</b> flux <code>vl-input-field</code> is enkel het veld (label =
                apart <code>vl-form-label</code>); VDS <code>vds-input</code> heeft label/message/annotation
                ingebouwd. Daardoor is een VDS-input MET label hoger (label-blok erboven). Vergelijk dus
                "zonder label" voor een eerlijke veld-tot-veld-match. Zelfs zonder label is de VDS-host
                hoger: <code>vds-input</code> is een grid-container (label/veld/message-rijen) die ruimte
                reserveert, terwijl flux' veld kaal is. Het veld-BOX zelf matcht wel (~34 vs 35px); het
                verschil is de form-layout-chrome eromheen (niet via tokens weg te krijgen).
            </p>

            <table>
                <caption>link</caption>
                <thead>
                    <tr>
                        <th>vds-link (rauw VDS)</th>
                        <th>flux-link (erft VlLink + flux-tokens)</th>
                        <th>vl-link (echte flux)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="vds">
                            <vds-link href="https://www.vlaanderen.be">VDS link</vds-link>
                        </td>
                        <td>
                            <flux-link href="https://www.vlaanderen.be">flux-link</flux-link>
                            <flux-link href="https://www.vlaanderen.be" external>extern (oude API)</flux-link>
                            <flux-link href="https://www.vlaanderen.be" error>fout (oude API)</flux-link>
                        </td>
                        <td><vl-link href="https://www.vlaanderen.be">flux link</vl-link></td>
                    </tr>
                </tbody>
            </table>
            <p class="findings">
                <b>link:</b> de <code>flux-link</code>-kolom is het <b>doelproduct</b> via
                <b>inheritance</b> (erft <code>VlLink</code>, flux-look via tokens op <code>:host</code>).
                <span class="nok">Deels matchbaar</span>: underline-KLEUR via token
                (<code>--base-color-underline-action-*</code>) ✓. Maar underline <b>offset</b> (0.25rem)
                en <b>thickness</b> (0.125rem) zitten hardcoded in de encapsulated
                <code>.vl-link__slot</code> (geen token, geen part), dus de VDS-underline blijft dikker en
                verder van de tekst dan flux. Niet oplosbaar via tokens; vergt upstream (tokeniseren of
                part exposen), zelfde soort upstream-afhankelijkheid als de input-form-layout-chrome.
                <br /><b>Oude API:</b> de <code>external</code>/<code>error</code>-voorbeelden gebruiken de
                oude flux boolean-API; <code>willUpdate</code> mapt <code>external</code> naar VDS
                <code>newWindow</code>, <code>error</code> naar <code>danger</code> en
                <code>small</code>/<code>large</code> naar <code>size</code>.
            </p>

            <table>
                <caption>title (VDS heeft geen title-component: geen vds-title / flux-title)</caption>
                <thead>
                    <tr>
                        <th>native heading + VDS-typografie-tokens</th>
                        <th>vl-title (echte flux)</th>
                        <th>-</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="vds"><h2 class="vds-title">VDS-typografie titel</h2></td>
                        <td><vl-title>flux titel</vl-title></td>
                        <td>
                            <span class="note"
                                >VDS levert geen title-component; enkel typografie-tokens om een
                                eigen heading te stijlen. Daarom hier maar twee varianten.</span
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
