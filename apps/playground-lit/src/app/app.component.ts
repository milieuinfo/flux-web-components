import { registerWebComponents } from '@domg-wc/common-utilities';
import { vlGroupStyles } from '@domg-wc/common-utilities/css';
import {
    VlAccordionComponent,
    VlButtonComponent,
    VlLinkComponent,
    VlModalComponent,
    VlParagraphComponent,
    VlPillComponent,
    VlPopoverComponent,
    VlSideSheet,
    VlTabsComponent,
    VlTitleComponent,
} from '@domg-wc/components';
import { vlElementsStyle } from '@domg-wc/elements';
import { SelectRichOption, VlDatepickerComponent, VlSelectComponent, VlSelectRichComponent } from '@domg-wc/form';
import { vlStackedStyles } from 'libs/common/utilities/src/css/layout/stacked/vl-stacked.css';
import { CSSResult, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { VlFormDemoComponent } from '../../../../libs/integration/src/form/demo/vl-form-demo.component';

@customElement('app-component')
export class AppComponent extends LitElement {
    static {
        registerWebComponents([
            VlAccordionComponent,
            VlButtonComponent,
            VlDatepickerComponent,
            VlFormDemoComponent,
            VlLinkComponent,
            VlModalComponent,
            VlParagraphComponent,
            VlPillComponent,
            VlPopoverComponent,
            VlSelectComponent,
            VlSelectRichComponent,
            VlSideSheet,
            VlTabsComponent,
            VlTitleComponent,
        ]);
    }

    private selectOptions = [
        { value: 'value1', label: 'option 1' },
        { value: 'value2', label: 'option 2' },
        { value: 'value3', label: 'option 3' },
    ];
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

    constructor() {
        super();
    }

    static get styles(): (CSSResult | CSSResult[])[] {
        return [vlElementsStyle, vlGroupStyles, vlStackedStyles];
    }

    private _selectElement: VlSelectComponent;

    private get selectElement() {
        this._selectElement = this._selectElement ?? (this.shadowRoot?.querySelector('#select') as VlSelectComponent);
        return this._selectElement;
    }

    render() {
        return html`
            <main>
                <vl-tabs active-tab="vl-select-rich" disable-links="">
                    <vl-tabs-pane id="vl-select-rich" title="vl-select-rich">
                        <vl-select-rich
                            style="width: 300px; display: block"
                            id="geboorteplaats"
                            name="geboorteplaats"
                            placeholder="Kies je geboorteplaats"
                            .options=${this.geboorteplaatsen}
                            search=""
                        >
                        </vl-select-rich>
                    </vl-tabs-pane>
                    <vl-tabs-pane id="vl-select" title="vl-select">
                        <div class="vl-stacked-small">
                            <vl-title type="h2">Select</vl-title>
                            <vl-paragraph
                                >Test om te zien hoe de select placeholder zich gedraagt bij dynamische selects.
                            </vl-paragraph>
                            <vl-title type="h3">Gerelateerd aan:</vl-title>
                            <vl-pill
                                data-vl-clickable
                                @click=${() => window.open('https://www.milieuinfo.be/jira/browse/UIG-3214')}
                                >UIG-3214
                            </vl-pill>
                            <vl-pill
                                data-vl-clickable
                                @click=${() => window.open('https://www.milieuinfo.be/jira/browse/UIG-3203')}
                                >UIG-3202
                            </vl-pill>
                            <div class="vl-group">
                                <vl-button @click=${() => this.addPlaceholder()}>Add placeholder</vl-button>
                                <vl-button @click=${() => this.addOptions()}>Add options</vl-button>
                                <vl-button @click=${this.applyError}>Apply error</vl-button>
                                <vl-button @click=${this.addSelect}>Add select</vl-button>
                            </div>
                            <div>
                                <vl-select id="select"></vl-select>
                            </div>
                        </div>
                    </vl-tabs-pane>
                    <vl-tabs-pane id="vl-datepicker" title="vl-datepicker">
                        <div class="vl-stacked-small">
                            <vl-title type="h2">Datepicker</vl-title>
                            <vl-paragraph>
                                Hier renderen we een aantal datepicker scenario's om te kijken hoe de datepicker zich
                                gedraagt.
                            </vl-paragraph>
                            <vl-datepicker></vl-datepicker>
                            <div class="vl-group">
                                <vl-button data-vl-modal-open="modal-with-datepicker"
                                    >Open modal with datepicker
                                </vl-button>
                                <vl-button @click=${this.openSidesheet}>Open sidesheet</vl-button>
                            </div>
                        </div>
                        <vl-modal id="modal-with-datepicker" data-vl-title="Modal" data-vl-closable>
                            <span slot="content">
                                <vl-datepicker block position="below right"></vl-datepicker>
                            </span>
                        </vl-modal>
                        <vl-side-sheet id="sidesheet">
                            <vl-form-demo></vl-form-demo>
                        </vl-side-sheet>
                    </vl-tabs-pane>
                    <vl-tabs-pane id="vl-group__column">
                        <span slot="title">vl-group__column</span>
                        <div class="vl-stacked-small">
                            <vl-title type="h2">vl-group__column</vl-title>
                            <vl-paragraph>Width test voor columns in vl-group.</vl-paragraph>
                            <vl-title type="h3">Gerelateerd aan:</vl-title>
                            <vl-pill
                                data-vl-clickable
                                @click=${() => window.open('https://www.milieuinfo.be/jira/browse/UIG-3226')}
                                >UIG-3226
                            </vl-pill>
                            <div
                                class="vl-group vl-group--column vl-group--separator-column vl-group--stretch-children"
                            >
                                <vl-accordion>
                                    <span slot="title">Accordion title</span>
                                    <span slot="subtitle">subtitle</span>
                                    <span slot="menu">
                                        <vl-button ghost id="popover-button" icon="nav-show-more-vertical"></vl-button>
                                        <vl-popover for="popover-button" placement="bottom-end" hide-on-click>
                                            <vl-popover-action-list>
                                                <vl-popover-action icon="bin" @click="${() => {}}">
                                                    Verwijderen
                                                </vl-popover-action>
                                            </vl-popover-action-list>
                                        </vl-popover>
                                    </span>
                                    <div>content</div>
                                </vl-accordion>
                            </div>
                        </div>
                    </vl-tabs-pane>
                    <vl-tabs-pane id="vl-group--baseline" title="vl-group--baseline">
                        <div class="vl-stacked-small">
                            <vl-title type="h2">vl-group--baseline</vl-title>
                            <vl-paragraph>Baseline alignering test voor links in vl-group.</vl-paragraph>
                            <vl-title type="h3">Gerelateerd aan:</vl-title>
                            <vl-pill
                                data-vl-clickable
                                @click=${() => window.open('https://www.milieuinfo.be/jira/browse/UIG-3225')}
                                >UIG-3225
                            </vl-pill>
                            <div class="vl-group vl-group--baseline">
                                <vl-title type="h1">Pagina titel</vl-title>
                                <vl-link href="#" icon="pencil" icon-placement="before">Link</vl-link>
                            </div>
                            <div class="vl-group vl-group--baseline">
                                <vl-title type="h2">Pagina titel</vl-title>
                                <vl-link href="#">Link</vl-link>
                            </div>
                            <div class="vl-group vl-group--baseline">
                                <vl-title type="h3">Pagina titel</vl-title>
                                <vl-link href="#" external>Link</vl-link>
                            </div>
                            <div class="vl-group vl-group--baseline">
                                <vl-title type="h3">Pagina titel</vl-title>
                                <vl-link href="#" button-as-link icon="pencil" icon-placement="before"
                                    >Link as button
                                </vl-link>
                            </div>
                        </div>
                    </vl-tabs-pane>
                </vl-tabs>
            </main>
        `;
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        // gaat shadow dom uitzetten
        return this;
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
            const newSelect = document.createElement('vl-select');
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
}
