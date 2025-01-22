import { registerWebComponents } from '@domg-wc/common-utilities';
import { vlGroupStyles } from '@domg-wc/common-utilities/css';
import {
    VlAccordionComponent,
    VlModalComponent,
    VlPillComponent,
    VlPopoverComponent,
    VlSideSheet,
} from '@domg-wc/components';
import { VlButtonComponent } from '@domg-wc/components/next/button';
import { VlLinkComponent } from '@domg-wc/components/next/link';
import { VlParagraphComponent } from '@domg-wc/components/next/paragraph';
import { VlTabsComponent } from '@domg-wc/components/next/tabs';
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
                <vl-tabs-next active-tab="vl-select-rich-next" disable-links="">
                    <vl-tabs-pane-next id="vl-select-rich-next" title="vl-select-rich-next">
                        <vl-select-rich-next
                            style="width: 300px; display: block"
                            id="geboorteplaats"
                            name="geboorteplaats"
                            placeholder="Kies je geboorteplaats"
                            .options=${this.geboorteplaatsen}
                            search=""
                        >
                        </vl-select-rich-next>
                    </vl-tabs-pane-next>
                    <vl-tabs-pane-next id="vl-select-next" title="vl-select-next">
                        <div class="vl-stacked-next-small">
                            <vl-title-next type="h2">Select</vl-title-next>
                            <vl-paragraph-next
                                >Test om te zien hoe de select placeholder zich gedraagt bij dynamische selects.
                            </vl-paragraph-next>
                            <vl-title-next type="h3">Gerelateerd aan:</vl-title-next>
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
                    </vl-tabs-pane-next>
                    <vl-tabs-pane-next id="vl-datepicker-next" title="vl-datepicker-next">
                        <div class="vl-stacked-next-small">
                            <vl-title-next type="h2">Datepicker</vl-title-next>
                            <vl-paragraph-next>
                                Hier renderen we een aantal datepicker scenario's om te kijken hoe de datepicker zich
                                gedraagt.
                            </vl-paragraph-next>
                            <vl-datepicker-next></vl-datepicker-next>
                            <div class="vl-group-next">
                                <vl-button-next data-vl-modal-open="modal-with-datepicker"
                                    >Open modal with datepicker
                                </vl-button-next>
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
                    </vl-tabs-pane-next>
                    <vl-tabs-pane-next id="vl-group-next__column">
                        <span slot="title">vl-group-next__column</span>
                        <div class="vl-stacked-next-small">
                            <vl-title-next type="h2">vl-group-next__column</vl-title-next>
                            <vl-paragraph-next>Width test voor columns in vl-group-next.</vl-paragraph-next>
                            <vl-title-next type="h3">Gerelateerd aan:</vl-title-next>
                            <vl-pill
                                data-vl-clickable
                                @click=${() => window.open('https://www.milieuinfo.be/jira/browse/UIG-3226')}
                                >UIG-3226
                            </vl-pill>
                            <div
                                class="vl-group-next vl-group-next--column vl-group-next--separator-column vl-group-next--stretch-children"
                            >
                                <vl-accordion>
                                    <span slot="title">Accordion title</span>
                                    <span slot="subtitle">subtitle</span>
                                    <span slot="menu">
                                        <vl-button-next
                                            ghost
                                            id="popover-button"
                                            icon="nav-show-more-vertical"
                                        ></vl-button-next>
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
                    </vl-tabs-pane-next>
                    <vl-tabs-pane-next id="vl-group-next--baseline" title="vl-group-next--baseline">
                        <div class="vl-stacked-next-small">
                            <vl-title-next type="h2">vl-group-next--baseline</vl-title-next>
                            <vl-paragraph-next>Baseline alignering test voor links in vl-group-next.</vl-paragraph-next>
                            <vl-title-next type="h3">Gerelateerd aan:</vl-title-next>
                            <vl-pill
                                data-vl-clickable
                                @click=${() => window.open('https://www.milieuinfo.be/jira/browse/UIG-3225')}
                                >UIG-3225
                            </vl-pill>
                            <div class="vl-group-next vl-group-next--baseline">
                                <vl-title-next type="h1">Pagina titel</vl-title-next>
                                <vl-link-next href="#" icon="pencil" icon-placement="before">Link</vl-link-next>
                            </div>
                            <div class="vl-group-next vl-group-next--baseline">
                                <vl-title-next type="h2">Pagina titel</vl-title-next>
                                <vl-link-next href="#">Link</vl-link-next>
                            </div>
                            <div class="vl-group-next vl-group-next--baseline">
                                <vl-title-next type="h3">Pagina titel</vl-title-next>
                                <vl-link-next href="#" external>Link</vl-link-next>
                            </div>
                            <div class="vl-group-next vl-group-next--baseline">
                                <vl-title-next type="h3">Pagina titel</vl-title-next>
                                <vl-link-next href="#" button-as-link icon="pencil" icon-placement="before"
                                    >Link as button
                                </vl-link-next>
                            </div>
                        </div>
                    </vl-tabs-pane-next>
                </vl-tabs-next>
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
}
