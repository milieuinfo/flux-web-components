import { registerWebComponents } from '@domg-wc/common';
import {
    VlAccordionComponent,
    VlAlert,
    VlPillComponent,
    VlTableComponent,
    VlTabsComponent,
} from '@domg-wc/components/block';
import { html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../../adapters/flux-pill.component';
import '../../adapters/flux-accordion.component';
import '../../adapters/flux-alert.component';
import '../../adapters/flux-separator.component';
import '../../adapters/flux-tabs.component';
import '../../adapters/flux-table.component';
import '../../adapters/flux-vds-only.component';

import { patchesFor } from '../data/override-rows';
import { fixesFor } from '../data/upstream-fix-rows';
import { vdsFrame } from '../shared/vds-frame.helper';
import { note, renderVariantRow } from '../shared/variant-row.helper';

const tableMarkup = (cls?: string) => html`<table class=${cls ?? ''}>
    <caption>
        Inwoners per gemeente
    </caption>
    <thead>
        <tr>
            <th scope="col">Naam</th>
            <th scope="col">Gemeente</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Anna</td>
            <td>Gent</td>
        </tr>
        <tr>
            <td>Bram</td>
            <td>Leuven</td>
        </tr>
        <tr>
            <td>Cleo</td>
            <td>Brugge</td>
        </tr>
    </tbody>
</table>`;

@customElement('pg-new-components')
export class PgNewComponents extends LitElement {
    @property({ type: Boolean })
    gapsOff = false;

    static {
        registerWebComponents([VlPillComponent, VlAccordionComponent, VlAlert, VlTabsComponent, VlTableComponent]);
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }

    private row(
        name: string,
        vds: TemplateResult,
        flux: TemplateResult,
        vl: TemplateResult,
        fluxTag: string,
        detailKey: string,
        colRatio?: string
    ): TemplateResult {
        return renderVariantRow({
            name,
            vds,
            flux,
            vl,
            fluxTag,
            detailKey,
            colRatio,
            patches: patchesFor(fluxTag),
            fixes: fixesFor(fluxTag),
            gapsOff: this.gapsOff,
        });
    }

    render(): TemplateResult {
        return html`
            <div>
                    ${this.row(
                        'pill (4 VDS-tags)',
                        vdsFrame('tags', 110),
                        html`<div style="display: flex; flex-wrap: wrap; gap: 6px;">
                            <flux-pill>Standaard</flux-pill>
                            <flux-pill type="success">Geslaagd</flux-pill>
                            <flux-pill type="warning">Opgelet</flux-pill>
                            <flux-pill type="error">Fout</flux-pill>
                            <flux-pill closable>Verwijderbaar</flux-pill>
                            <flux-pill checkable checked>Selecteerbaar</flux-pill>
                            <flux-pill clickable>Klikbaar</flux-pill>
                            <flux-pill disabled>Uitgeschakeld</flux-pill>
                        </div>`,
                        html`<div style="display: flex; flex-wrap: wrap; gap: 6px;">
                            <vl-pill>Standaard</vl-pill>
                            <vl-pill type="success">Geslaagd</vl-pill>
                            <vl-pill type="warning">Opgelet</vl-pill>
                            <vl-pill type="error">Fout</vl-pill>
                            <vl-pill closable>Verwijderbaar</vl-pill>
                            <vl-pill checkable checked>Selecteerbaar</vl-pill>
                            <vl-pill clickable>Klikbaar</vl-pill>
                            <vl-pill disabled>Uitgeschakeld</vl-pill>
                        </div>`,
                        'flux-pill',
                        'vl-*-tag'
                    )}
                    ${this.row(
                        'accordion (VDS: collapsible)',
                        vdsFrame('collapsible', 140),
                        html`<flux-accordion toggle-text="Meer informatie"
                            >Verborgen inhoud die openklapt.</flux-accordion
                        >`,
                        html`<vl-accordion toggle-text="Meer informatie"
                            >Verborgen inhoud die openklapt.</vl-accordion
                        >`,
                        'flux-accordion',
                        'vl-collapsible'
                    )}
                    ${this.row(
                        'separator (VDS: divider)',
                        vdsFrame('divider', 70),
                        html`<div style="display: grid; gap: 12px; width: 100%;">
                            <flux-separator></flux-separator>
                            <flux-separator wave></flux-separator>
                            <flux-separator slash></flux-separator>
                        </div>`,
                        html`<div style="width: 100%;">
                            <hr class="vl-separator" />
                            <hr class="vl-separator-wave" />
                            <hr class="vl-separator-slash" />
                        </div>`,
                        'flux-separator',
                        'vl-divider'
                    )}
                    ${this.row(
                        'alert (VDS: section-message)',
                        vdsFrame('section-message', 230),
                        html`<div style="display: grid; gap: 8px; width: 100%;">
                            <flux-alert type="info" title="Info" message="Een informatieve melding."></flux-alert>
                            <flux-alert type="error" title="Fout" closable>Er ging iets mis.</flux-alert>
                        </div>`,
                        html`<div style="display: grid; gap: 8px; width: 100%;">
                            <vl-alert type="info" title="Info" message="Een informatieve melding."></vl-alert>
                            <vl-alert type="error" title="Fout" closable>Er ging iets mis.</vl-alert>
                        </div>`,
                        'flux-alert',
                        'vl-section-message'
                    )}
                    ${this.row(
                        'tabs',
                        vdsFrame('tabs', 140),
                        html`<flux-tabs active-tab="cmp-flux-trein" style="width: 100%;">
                            <flux-tabs-pane id="cmp-flux-trein" title="Trein">Inhoud over de trein.</flux-tabs-pane>
                            <flux-tabs-pane id="cmp-flux-metro" title="Metro, tram en bus"
                                >Inhoud over metro, tram en bus.</flux-tabs-pane
                            >
                        </flux-tabs>`,
                        html`<vl-tabs active-tab="cmp-vl-trein" disable-links style="width: 100%;">
                            <vl-tabs-pane id="cmp-vl-trein" title="Trein">Inhoud over de trein.</vl-tabs-pane>
                            <vl-tabs-pane id="cmp-vl-metro" title="Metro, tram en bus"
                                >Inhoud over metro, tram en bus.</vl-tabs-pane
                            >
                        </vl-tabs>`,
                        'flux-tabs',
                        'vl-tabs'
                    )}
                    ${this.row(
                        'table',
                        vdsFrame('table', 220),
                        html`<flux-table zebra style="width: 100%;">${tableMarkup()}</flux-table>`,
                        html`<vl-table zebra style="width: 100%;">${tableMarkup('vl-table')}</vl-table>`,
                        'flux-table',
                        'vl-table'
                    )}
                    ${this.row(
                        'banner-message',
                        vdsFrame('banner-message', 100),
                        html`<flux-banner-message status="warning" closable style="width: 100%;"
                            ><span slot="title">Gepland onderhoud zaterdag van 8u tot 12u.</span></flux-banner-message
                        >`,
                        html`${note('Geen eigen flux-component. Vergeleken met vl-alert, waarop de flux-look gebaseerd is:')}
                            <vl-alert
                                type="warning"
                                closable
                                message="Gepland onderhoud zaterdag van 8u tot 12u."
                                style="width: 100%;"
                            ></vl-alert>`,
                        'flux-banner-message',
                        'vl-banner-message'
                    )}
                    ${this.row(
                        'inline-message',
                        vdsFrame('inline-message', 80),
                        html`<div style="display: grid; gap: 8px; width: 100%;">
                            <flux-inline-message status="success"
                                ><span slot="body">Je gegevens zijn bewaard.</span></flux-inline-message
                            >
                            <flux-inline-message status="danger"
                                ><span slot="body">Dit veld is verplicht.</span></flux-inline-message
                            >
                        </div>`,
                        html`${note('Geen eigen flux-component. Dichtst: vl-alert size="small":')}
                            <vl-alert type="success" size="small" message="Je gegevens zijn bewaard." style="width: 100%;"></vl-alert>`,
                        'flux-inline-message',
                        'vl-inline-message'
                    )}
                    ${this.row(
                        'avatar',
                        vdsFrame('avatar', 55),
                        html`<div style="display: flex; gap: 8px; align-items: center;">
                            <flux-avatar initials="KD"></flux-avatar>
                            <flux-avatar initials="AB" status="success"></flux-avatar>
                            <flux-avatar icon="user" size="s"></flux-avatar>
                        </div>`,
                        html`${note('Geen flux-component. Wel ronde icoon-badges in info-tile (icon-as-badge) en infoblock:')}
                            <vl-info-tile icon="user" icon-as-badge style="width: 100%;">
                                <span slot="title">Karim Dehbi</span>
                            </vl-info-tile>
                            <vl-infoblock icon="user" style="width: 100%;">
                                <vl-title type="h3" slot="title">Contact</vl-title>
                            </vl-infoblock>`,
                        'flux-avatar',
                        'vl-avatar'
                    )}
                    ${this.row(
                        'grid',
                        vdsFrame('grid', 95),
                        html`<flux-grid columns="3" gap="s" style="width: 100%;">
                            <flux-grid-item style="background: #eef6ff; padding: 8px;">1</flux-grid-item>
                            <flux-grid-item style="background: #eef6ff; padding: 8px;">2</flux-grid-item>
                            <flux-grid-item style="background: #eef6ff; padding: 8px;">3</flux-grid-item>
                            <flux-grid-item column-span="2" style="background: #eef6ff; padding: 8px;"
                                >4 (span 2)</flux-grid-item
                            >
                        </flux-grid>`,
                        note('Geen flux-component. flux doet grid-layout met de CSS-klassen vl-grid / vl-column.'),
                        'flux-grid',
                        'vl-grid'
                    )}
            </div>
        `;
    }
}
