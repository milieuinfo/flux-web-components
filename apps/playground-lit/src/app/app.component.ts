import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlTabsComponent } from '@domg-wc/components';
import { vlElementsStyle } from '@domg-wc/elements';
import { SelectRichOption, VlSelectRichComponent } from '@domg-wc/form/next/select-rich';
import { CSSResult, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-component')
export class AppComponent extends LitElement {
    static {
        registerWebComponents([VlTabsComponent, VlSelectRichComponent]);
    }

    static get styles(): (CSSResult | CSSResult[])[] {
        return [vlElementsStyle];
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <main>
                <vl-tabs data-vl-active-tab="trein" data-vl-disable-links="">
                    <vl-tabs-pane data-vl-id="trein" data-vl-title="Trein">
                        <vl-select-rich-next
                            style="width: 300px; display: block"
                            id="geboorteplaats"
                            name="geboorteplaats"
                            placeholder="Kies je geboorteplaats"
                            .options=${this.geboorteplaatsen}
                            search=""
                        >
                        </vl-select-rich-next>
                    </vl-tabs-pane>
                    <vl-tabs-pane data-vl-id="metro" data-vl-title="Metro, tram en bus">
                        Donec sed odio dui. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam
                        porta sem malesuada magna mollis euismod. Morbi leo risus, porta ac consectetur ac, vestibulum
                        at eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </vl-tabs-pane>
                    <vl-tabs-pane data-vl-id="fiets" data-vl-title="Fiets">
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                        Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Cras justo odio,
                        dapibus ac facilisis in, egestas eget quam. Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur et.
                    </vl-tabs-pane>
                </vl-tabs>
            </main>
        `;
    }

    private geboorteplaatsen: SelectRichOption[] = [
        {
            label: 'België',
            value: '',
            choices: [
                { label: 'Hasselt', value: 'hasselt' },
                { label: 'Turnhout', value: 'turnhout' },
                { label: 'Knokke-Heist', value: 'knokke-heist' },
                { label: 'Waregem', value: 'waregem' },
                { label: 'Lier', value: 'lier' },
            ],
        },
        {
            label: 'Puerto Rico',
            value: '',
            choices: [{ label: 'Rio Piedras', value: 'rio piedras' }],
        },
    ];
}
