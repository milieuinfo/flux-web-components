import { registerWebComponents } from '@domg-wc/common-utilities';
import { vlGroupStyles } from '@domg-wc/common-utilities/css';
import { VlModalComponent, VlPillComponent, VlSideSheet, VlTabsComponent } from '@domg-wc/components';
import { VlButtonComponent } from '@domg-wc/components/next/button';
import { VlParagraphComponent } from '@domg-wc/components/next/paragraph';
import { VlTitleComponent } from '@domg-wc/components/next/title';
import { vlElementsStyle } from '@domg-wc/elements';
import { VlDatepickerComponent } from '@domg-wc/form/next/datepicker';
import { VlSelectComponent } from '@domg-wc/form/next/select';
import { SelectRichOption, VlSelectRichComponent } from '@domg-wc/form/next/select-rich';
import { vlStackedStyles } from 'libs/common/utilities/src/css/layout/stacked/vl-stacked.css';
import { CSSResult, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { VlFormDemoComponent } from '../../../../libs/integration/src/form/demo/vl-form-demo.component';
@customElement('app-component')
export class AppComponent extends LitElement {
    static {
        registerWebComponents([
            VlTabsComponent,
            VlSelectRichComponent,
            VlSelectComponent,
            VlButtonComponent,
            VlDatepickerComponent,
            VlModalComponent,
            VlSideSheet,
            VlFormDemoComponent,
            VlPillComponent,
            VlParagraphComponent,
            VlTitleComponent,
        ]);
    }

    static get styles(): (CSSResult | CSSResult[])[] {
        return [vlElementsStyle, vlGroupStyles, vlStackedStyles];
    }

    constructor() {
        super();
    }

    private selectOptions = [
        { value: 'value1', label: 'option 1' },
        { value: 'value2', label: 'option 2' },
        { value: 'value3', label: 'option 3' },
    ];

    private _selectElement: VlSelectComponent;

    private get selectElement() {
        this._selectElement = this._selectElement ?? (this.shadowRoot?.querySelector('#select') as VlSelectComponent);
        return this._selectElement;
    }

    private addOptions = (selectElement?: VlSelectComponent) => {
        const select = selectElement || this.selectElement;
        if (select.options.length === 0) {
            select.options = this.selectOptions;
        }
    };

    private addPlaceholder = (selectElement?: VlSelectComponent) => {
        const select = selectElement || this.selectElement;
        select.setAttribute('placeholder', 'My placeholder');
    };

    private addSelect = () => {
        if (this.selectElement) {
            const newSelect = document.createElement('vl-select-next');
            this.addPlaceholder(newSelect);
            this.addOptions(newSelect);
            this.selectElement.insertAdjacentElement('afterend', newSelect);
        }
    };

    private applyError = () => {
        if (this.selectElement) {
            this.selectElement.setAttribute('error', 'Fout!');
        }
    };

    private openSidesheet = () => {
        const sidesheet = this.querySelector('#sidesheet') as unknown as VlSideSheet;
        sidesheet.toggle();
    };

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        // gaat shadow dom uitzetten
        return this;
    }

    render() {
        return html`
            <main>
                <vl-tabs data-vl-active-tab="vl-select-rich-next" data-vl-disable-links="">
                    <vl-tabs-pane data-vl-id="vl-select-rich-next" data-vl-title="vl-select-rich-next">
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
                    <vl-tabs-pane data-vl-id="vl-select-next" data-vl-title="vl-select-next">
                        <div class="vl-stacked-next-small">
                            <vl-title-next type="h2">Select</vl-title-next>
                            <vl-paragraph-next
                                >Test om te zien hoe de select placeholder zich gedraagt bij dynamische
                                selects.</vl-paragraph-next
                            >
                            <vl-title-next type="h3">Gerelateerd aan:</vl-title-next>
                            <vl-pill
                                data-vl-clickable
                                @click=${() => window.open('https://www.milieuinfo.be/jira/browse/UIG-3214')}
                                >UIG-3214</vl-pill
                            >
                            <vl-pill
                                data-vl-clickable
                                @click=${() => window.open('https://www.milieuinfo.be/jira/browse/UIG-3203')}
                                >UIG-3202</vl-pill
                            >
                            <div class="vl-group-next">
                                <vl-button-next @click=${() => this.addPlaceholder()}>Add placeholder</vl-button-next>
                                <vl-button-next @click=${() => this.addOptions()}>Add options</vl-button-next>
                                <vl-button-next @click=${this.applyError}>Apply error</vl-button-next>
                                <vl-button-next @click=${this.addSelect}>Add select</vl-button-next>
                            </div>
                            <div>
                                <vl-select-next id="select"></vl-select-next>
                            </div>
                        </div>
                    </vl-tabs-pane>
                    <vl-tabs-pane data-vl-id="vl-datepicker-next" data-vl-title="vl-datepicker-next">
                        <div class="vl-stacked-next-small">
                            <vl-title-next type="h2">Datepicker</vl-title-next>
                            <vl-paragraph-next>
                                Hier renderen we een aantal datepicker scenario's om te kijken hoe de datepicker zich
                                gedraagt.
                            </vl-paragraph-next>
                            <vl-datepicker-next></vl-datepicker-next>
                            <div class="vl-group-next">
                                <vl-button-next data-vl-modal-open="modal-with-datepicker"
                                    >Open modal with datepicker</vl-button-next
                                >
                                <vl-button-next @click=${this.openSidesheet}>Open sidesheet</vl-button-next>
                            </div>
                        </div>
                        <vl-modal id="modal-with-datepicker" data-vl-title="Modal" data-vl-closable>
                            <span slot="content">
                                <vl-datepicker-next block position="below right"></vl-datepicker-next>
                            </span>
                        </vl-modal>
                        <vl-side-sheet id="sidesheet">
                            <vl-form-demo></vl-form-demo>
                        </vl-side-sheet>
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
