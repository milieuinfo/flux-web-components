import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent } from '@domg-wc/components/atom';
import {
    VlInfoTile,
    VlModalComponent,
    VlPopoverActionComponent,
    VlPopoverActionListComponent,
    VlPopoverComponent,
    VlPropertiesComponent,
} from '@domg-wc/components/block';
import { VlHeader } from '@domg-wc/components/compliance';
import { VlDatepickerComponent, VlSelectRichComponent } from '@domg-wc/components/form';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-component')
export class AppComponent extends LitElement {
    static {
        registerWebComponents([
            VlHeader,
            VlPopoverComponent,
            VlPopoverActionListComponent,
            VlPopoverActionComponent,
            VlDatepickerComponent,
            VlInfoTile,
            VlPropertiesComponent,
            VlModalComponent,
            VlSelectRichComponent,
            VlButtonComponent,
        ]);
    }

    render() {
        return html`
            <vl-template>
                <vl-header
                    slot="header"
                    development
                    simple
                    identifier="59188ff6-662b-45b9-b23a-964ad48c2bfb"
                ></vl-header>
                <main slot="main">
                    <section class="vl-section">
                        <div class="vl-content-block vl-content-block--full-width">
                            <vl-title type="h2">FLUX-624 — select-rich dropdown in modal (Edge)</vl-title>
                            <p>
                                Open de modal en klik op het <code>vl-select-rich</code> veld. De dropdown moet als
                                overlay onder het invoerveld openen — niet over het label flippen of het volgende veld
                                overlappen. Te testen in Edge.
                            </p>
                            <vl-button modal-open="select-rich-modal">Kenmerken bewerken</vl-button>
                            <vl-modal id="select-rich-modal" title="Kenmerken bewerken" size="large">
                                <div slot="content">
                                    <vl-select-rich
                                        label="Medebehandelaars"
                                        placeholder="Kies een gemeente"
                                        search
                                        .options=${[
                                            { label: 'Anzegem', value: 'anzegem' },
                                            { label: 'Ardooie', value: 'ardooie' },
                                            { label: 'Brugge', value: 'brugge' },
                                            { label: 'Gent', value: 'gent' },
                                            { label: 'Hasselt', value: 'hasselt' },
                                            { label: 'Knokke-Heist', value: 'knokke-heist' },
                                            { label: 'Lier', value: 'lier' },
                                            { label: 'Turnhout', value: 'turnhout' },
                                            { label: 'Waregem', value: 'waregem' },
                                        ]}
                                    ></vl-select-rich>
                                    <div style="height: 50px"></div>
                                    <vl-select-rich
                                        label="Provincie"
                                        placeholder="Kies een provincie"
                                        multiple
                                        search
                                        .options=${[
                                            { label: 'Antwerpen', value: 'antwerpen' },
                                            { label: 'Limburg', value: 'limburg' },
                                            { label: 'Oost-Vlaanderen', value: 'oost-vlaanderen' },
                                            { label: 'Vlaams-Brabant', value: 'vlaams-brabant' },
                                            { label: 'West-Vlaanderen', value: 'west-vlaanderen' },
                                        ]}
                                    ></vl-select-rich>
                                    <div style="height: 150px"></div>
                                    <vl-select-rich
                                        label="Status"
                                        placeholder="Kies een status"
                                        multiple=""
                                        search
                                        .options=${[
                                            { label: 'In behandeling', value: 'in-behandeling' },
                                            { label: 'Goedgekeurd', value: 'goedgekeurd' },
                                            { label: 'Afgekeurd', value: 'afgekeurd' },
                                            { label: 'Gearchiveerd', value: 'gearchiveerd' },
                                        ]}
                                    ></vl-select-rich>
                                </div>
                                <span slot="button"><vl-button>Bewaren</vl-button></span>
                            </vl-modal>
                        </div>
                    </section>
                </main>
            </vl-template>
        `;
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        // gaat shadow dom uitzetten
        return this;
    }
}
