import { registerWebComponents } from '@domg-wc/common';
import {
    VlButtonComponent,
    vlHeading1,
    VlIconComponent,
    VlLinkComponent,
    VlParagraphComponent,
    VlTextComponent,
    VlTitleComponent,
} from '@domg-wc/components/atom';
import {
    VlAccordionComponent,
    VlAlert,
    VlInfoTile,
    VlModalComponent,
    VlPillComponent,
    VlPopoverComponent,
    VlSideSheet,
    VlTabsComponent,
} from '@domg-wc/components/block';
import {
    SelectRichOption,
    VlDatepickerComponent,
    VlSelectComponent,
    VlSelectRichComponent,
} from '@domg-wc/components/form';
import { VlFormDemoComponent } from '@domg-wc/integrations/form';
import { vlLayoutStyles } from '@domg-wc/styles';
import { CSSResult, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

declare global {
    interface Window {
        Chart: any;
    }
}

@customElement('app-component')
export class AppComponent extends LitElement {
    static {
        registerWebComponents([
            VlAccordionComponent,
            VlAlert,
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
            VlInfoTile,
            VlTextComponent,
            VlInfoTile,
            VlIconComponent,
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
        return [vlLayoutStyles];
    }

    private _selectElement: VlSelectComponent;

    private get selectElement() {
        this._selectElement = this._selectElement ?? (this.shadowRoot?.querySelector('#select') as VlSelectComponent);
        return this._selectElement;
    }

    firstUpdated(): void {
        // NOTE: dit is POC code en kan beter gestructureerd worden
        const fontDefaults = {
            family: 'Flanders Art Sans',
            size: 8,
        };

        // line chart demo
        const dataGraph1 = {
            labels: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli'],
            datasets: [
                {
                    label: 'Demo Dataset',
                    data: [20, 30, 80, 20, 40, 10, 60],
                    borderColor: '#0055cc',
                    backgroundColor: 'rgba(0,0,0,0)',
                    pointBackgroundColor: '#0055cc',
                    pointRadius: 5,
                    tension: 0, // disables bezier curve
                },
            ],
        };
        const configGraph1 = {
            type: 'line',
            data: dataGraph1,
            options: {
                responsive: true,
                animation: {
                    duration: 1000,
                    easing: 'easeOutBounce',
                },
                legend: {
                    labels: {
                        font: fontDefaults,
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                            color: 'black',
                        },
                        ticks: {
                            font: fontDefaults,
                        },
                    },
                    y: {
                        grid: {
                            color: 'black',
                        },
                        ticks: {
                            font: fontDefaults,
                        },
                    },
                },
                tooltip: {
                    titleFont: fontDefaults,
                    bodyFont: fontDefaults,
                },
            },
        };

        // bar chart demo
        const dataGraph2 = {
            labels: ['LZS1', 'LZS2', 'LZS3', 'LZS4', 'LZS5', 'LZS6', 'LZS7'],
            datasets: [
                {
                    label: 'Demo Dataset',
                    data: [20, 30, 80, 20, 40, 10, 60],
                    borderColor: '#D2373C',
                    backgroundColor: 'rgba(210, 55, 60, 0.5)',
                    borderWidth: 1,
                },
            ],
        };
        const configGraph2 = {
            type: 'bar',
            data: dataGraph2,
            options: {
                responsive: true,
                animation: {
                    duration: 1000,
                    easing: 'easeOutBounce',
                },
                plugins: {
                    legend: {
                        display: false,
                        labels: {
                            font: fontDefaults,
                        },
                    },
                    tooltip: {
                        titleFont: fontDefaults,
                        bodyFont: fontDefaults,
                    },
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                            color: 'black',
                        },
                        ticks: {
                            font: fontDefaults,
                        },
                    },
                    y: {
                        grid: {
                            color: 'black',
                        },
                        ticks: {
                            font: fontDefaults,
                        },
                    },
                },
            },
        };

        const graph1 = document.querySelector<HTMLCanvasElement>('canvas#graph1');
        const graph2 = document.querySelector<HTMLCanvasElement>('canvas#graph2');
        if (graph1 && graph2) {
            const script = document.createElement('script');
            let chart1: typeof window.Chart;
            let chart2: typeof window.Chart;
            script.onload = () => {
                chart1 = new window.Chart(graph1.getContext('2d'), configGraph1);
                chart2 = new window.Chart(graph2.getContext('2d'), configGraph2);
            };
            // NOTE: dit is POC code. Chart.js moet via npm geimporteerd worden
            script.setAttribute('src', 'https://cdn.jsdelivr.net/npm/chart.js');
            document.documentElement.appendChild(script);
            window.addEventListener('resize', () => {
                // NOTE: dit is een Chart.js bug, charts verkleinen nooit bij het resizen
                // dit zou gethrottled moeten worden in productie code
                graph1.removeAttribute('width');
                graph1.removeAttribute('height');
                graph1.style.width = 'unset';
                graph1.style.height = 'unset';
                chart1.resize();

                graph2.removeAttribute('width');
                graph2.removeAttribute('height');
                graph2.style.width = 'unset';
                graph2.style.height = 'unset';
                chart2.resize();
            });
        }
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
                                clickable
                                @click=${() => window.open('https://www.milieuinfo.be/jira/browse/UIG-3214')}
                                >UIG-3214
                            </vl-pill>
                            <vl-pill
                                clickable
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
                                <vl-button modal-open="modal-with-datepicker">Open modal with datepicker</vl-button>
                                <vl-button @click=${this.openSidesheet}>Open sidesheet</vl-button>
                            </div>
                        </div>
                        <vl-modal id="modal-with-datepicker" title="Modal" closable>
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
                                clickable
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
                                clickable
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

                <!-- NOTE: de toevoegingen aan vl-info-block met custom-css zouden opgenomen kunnen worden in het component zelf -->
                <div class="vl-section">
                    <div class="vl-content-block">
                        <div class="vl-grid">
                            <vl-info-tile
                                center
                                class="vl-column vl-column--6"
                                custom-css=":host { display: inline-grid; }"
                            >
                                <span slot="title">Registratie dataleveranciers</span>
                                <span slot="subtitle">Publieke toegang</span>
                                <div slot="content">
                                    Registreer als dataleverancier om luchtzuiveringssystemen te registreren.
                                </div>
                                <div slot="footer"><vl-button>Registeer als dataleverancier</vl-button></div>
                            </vl-info-tile>

                            <vl-info-tile
                                center
                                class="vl-column vl-column--6"
                                custom-css=":host { display: inline-grid; }"
                            >
                                <span slot="title">Registratie luchtzuiveringssysteem</span>
                                <span slot="subtitle">Login vereist - voorbehouden voor dataleveranciers</span>
                                <div slot="content">
                                    Het registreren van een luchtzuiveringssysteem laat ons toe de data te analyseren en
                                    eventuele storingen op te volgen.
                                </div>
                                <div slot="footer">
                                    <vl-button disabled>Registreer een luchtzuiveringssysteem</vl-button>
                                </div>
                            </vl-info-tile>
                        </div>
                    </div>
                </div>

                <style>
                    .armos-metric {
                        flex: 1;
                        display: inline-grid;
                        align-self: stretch;
                    }
                        .armos-metric__content {
                            display: flex;
                            flex: 1;
                            flex-direction: column;
                        }
                        .armos-metric__number {
                            ${vlHeading1}
                            flex: 1;
                            text-align: center;
                            margin: 2rem 0;
                            align-content: center;
                        }
                </style>

                <div class="vl-section">
                    <div class="vl-content-block vl-content-block--full-width">
                        <div class="vl-group">
                            <vl-info-tile
                                size="small"
                                class="armos-metric"
                                custom-css="${`
                                    :host { color: var(--vl-color--error); }
                                    .vl-info-tile { 
                                        border-color: #edafb1; 
                                        background-color: var(--vl-color--error-background); 
                                        color: var(--vl-color--error);
                                        display: flex;
                                        flex-direction: column;
                                    }
                                    .vl-info-tile__header {
                                        flex: 0;
                                    }
                                    .vl-info-tile__content {
                                        flex: 1; 
                                        display: flex;
                                    }`}"
                            >
                                <h2 slot="title">
                                    <vl-icon icon="alert-circle" right-margin></vl-icon
                                    ><vl-text small bold>Systemen in alarm</vl-text>
                                </h2>
                                <div slot="content" class="armos-metric__content">
                                    <div class="armos-metric__number">
                                        <vl-text error>2</vl-text>
                                    </div>
                                </div>
                            </vl-info-tile>

                            <vl-info-tile
                                size="small"
                                class="armos-metric"
                                custom-css="${`
                                    :host { color: var(--vl-color--success-text); }
                                    .vl-info-tile { 
                                        border-color: #99d8b5; 
                                        background-color: var(--vl-color--success-bg); 
                                        color: var(--vl-color--success);
                                        display: flex;
                                        flex-direction: column;
                                    }
                                    .vl-info-tile__header {
                                        flex: 0;
                                    }
                                    .vl-info-tile__content {
                                        flex: 1; 
                                        display: flex;
                                    }`}"
                            >
                                <h2 slot="title">
                                    <vl-icon icon="check-circle" right-margin></vl-icon
                                    ><vl-text small bold>Actieve systemen</vl-text>
                                </h2>

                                <div slot="content" class="armos-metric__content">
                                    <div class="armos-metric__number">
                                        <vl-text success>6542</vl-text>
                                    </div>
                                </div>
                            </vl-info-tile>

                            <vl-info-tile
                                size="small"
                                class="armos-metric"
                                custom-css="${`
                                    :host { color: var(--vl-color--warning-text); }
                                    .vl-info-tile { 
                                        border-color: #ffd99d; 
                                        background-color: var(--vl-color--warning-bg); 
                                        color: var(--vl-color--warning-text);
                                        display: flex;
                                        flex-direction: column;
                                    }
                                    .vl-info-tile__header {
                                        flex: 0;
                                    }
                                    .vl-info-tile__content {
                                        flex: 1; 
                                        display: flex;
                                    }`}"
                            >
                                <h2 slot="title">
                                    <vl-icon icon="minus-circle" right-margin></vl-icon
                                    ><vl-text small bold>Inactieve systemen</vl-text>
                                </h2>

                                <div slot="content" class="armos-metric__content">
                                    <div class="armos-metric__number">
                                        <vl-text warning>1000</vl-text>
                                    </div>
                                </div>
                            </vl-info-tile>

                            <vl-info-tile size="small" class="armos-metric">
                                <h2 slot="title"><vl-text small bold>Gemiddelde emissies over tijd</vl-text></h2>
                                <div slot="content">
                                    <div class="armos-metric__content">
                                        <div>
                                            <canvas id="graph1"></canvas>
                                        </div>
                                    </div>
                                </div>
                            </vl-info-tile>

                            <vl-info-tile size="small" class="armos-metric">
                                <h2 slot="title"><vl-text small bold>Aantal storingen per type LZS</vl-text></h2>
                                <div slot="content">
                                    <div class="armos-metric__content">
                                        <div>
                                            <canvas id="graph2"></canvas>
                                        </div>
                                    </div>
                                </div>
                            </vl-info-tile>
                        </div>
                    </div>
                </div>
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
