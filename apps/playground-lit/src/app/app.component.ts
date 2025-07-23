import { registerWebComponents } from '@domg-wc/common';
import {
    VlButtonComponent,
    vlHeading1,
    VlIconComponent,
    VlLinkComponent,
    VlTextComponent,
    VlTitleComponent,
} from '@domg-wc/components/atom';
import {
    VlInfoTile,
    VlPillComponent,
    VlPropertiesComponent,
    VlSideNavigationComponent,
} from '@domg-wc/components/block';
import { vlLayoutStyles, vlMediaScreenSmall } from '@domg-wc/styles';
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
            VlButtonComponent,
            VlLinkComponent,
            VlPillComponent,
            VlTitleComponent,
            VlInfoTile,
            VlTextComponent,
            VlIconComponent,
            VlPropertiesComponent,
            VlSideNavigationComponent,
        ]);
    }

    static get styles(): (CSSResult | CSSResult[])[] {
        return [vlLayoutStyles];
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

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        // gaat shadow dom uitzetten
        return this;
    }

    render() {
        return html`
            <main>
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

                    @media screen and (min-width: ${vlMediaScreenSmall}px) {
                        vl-side-navigation {
                            display: block;
                            padding-left: 2rem;
                        }
                    }
                </style>

                <vl-functional-header
                    title="School- en studietoelagen"
                    custom-css="#sub-title{ vertical-align: text-top;}"
                    full-width
                >
                    <vl-tabs
                        slot="sub-title"
                        disable-links
                        within-functional-header
                        active-tab="trein"
                        @change=${(event: CustomEvent) => console.log('change', event.detail)}
                        custom-css=":host(.vl-tabs--within-functional-header) .vl-tab__link { padding-top: 0;}"
                    >
                        <vl-tabs-pane id="trein" title="Trein"></vl-tabs-pane>
                        <vl-tabs-pane id="metro" title="Metro, tram en bus"></vl-tabs-pane>
                        <vl-tabs-pane id="fiets" title="Fiets"></vl-tabs-pane>
                    </vl-tabs>
                </vl-functional-header>

                <!-- NOTE: de toevoegingen aan vl-info-block met custom-css zouden opgenomen kunnen worden in het component zelf -->
                <section class="vl-section">
                    <div class="vl-content-block">
                        <vl-title type="h1">ARMOS</vl-title>
                        <vl-title type="h2">Registratie</vl-title>
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
                </section>

                <section class="vl-section">
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
                </section>

                <section class="vl-section">
                    <div class="vl-content-block vl-content-block--full-width">
                        <div class="vl-grid">
                            <div class="vl-column vl-column--10 vl-column--m-8 vl-column--s-12">
                                <vl-side-navigation-reference>
                                    <vl-title type="h2" id="content-1">Luchtzuiveringssystemen</vl-title>
                                    <div class="vl-grid">
                                        <vl-info-tile
                                            size="small"
                                            class="vl-column vl-column--6 vl-column--m-12 armos-metric"
                                        >
                                            <h1 slot="title"><vl-text bold>Naam luchtzuiveringssysteem/ID</vl-text></h1>
                                            <div slot="content">
                                                <vl-properties>
                                                    <label>Status</label>
                                                    <data>
                                                        <vl-pill type="success">actief</vl-pill>
                                                    </data>
                                                    <label>Installatiedatum</label>
                                                    <data>23-11-2020</data>
                                                    <label>Exploitant</label>
                                                    <data><vl-link href="#">Boer Charel</vl-link></data>
                                                    <label>Contact naam</label>
                                                    <data>Charel De Boer</data>
                                                    <label>GSM-nummer</label>
                                                    <data>
                                                        <vl-link
                                                            icon="mobile-phone"
                                                            icon-placement="before"
                                                            href="tel:0456123456"
                                                        >
                                                            0456/12.34.56
                                                        </vl-link>
                                                    </data>
                                                    <label>Email-adres</label>
                                                    <data>
                                                        <vl-link
                                                            icon="mail"
                                                            icon-placement="before"
                                                            href="mailto:boercharel@example.com"
                                                        >
                                                            BOER.CHAREL@example.com
                                                        </vl-link>
                                                    </data>
                                                    <label>Adres</label>
                                                    <data>
                                                        <address>Straatnaamlaan 123<br />9876 't Gentse</address>
                                                    </data>
                                                </vl-properties>
                                            </div>
                                            <div slot="menu">
                                                <vl-button icon="file-download" icon-placement="before"
                                                    >Exporteer data</vl-button
                                                >
                                            </div>
                                        </vl-info-tile>
                                        <!-- 
                                            NOTE: het nesten van verschillende vl-group elementen is experimenteel 
                                            en kan onverwachte effecten hebben. 
                                        -->
                                        <div
                                            class="vl-column vl-column--6 vl-column--m-12 vl-group vl-group--column armos-metric"
                                        >
                                            <div class="vl-group armos-metric">
                                                <vl-info-tile size="small" class="armos-metric">
                                                    <h2 slot="title"><vl-text small bold>[grafiek]</vl-text></h2>
                                                    <div slot="content">[grafiek]</div>
                                                </vl-info-tile>
                                                <vl-info-tile size="small" class="armos-metric">
                                                    <h2 slot="title"><vl-text small bold>[grafiek]</vl-text></h2>
                                                    <div slot="content">[grafiek]</div>
                                                </vl-info-tile>
                                            </div>
                                            <div class="vl-group armos-metric">
                                                <vl-info-tile size="small" class="armos-metric">
                                                    <h2 slot="title"><vl-text small bold>[grafiek]</vl-text></h2>
                                                    <div slot="content">[grafiek]</div>
                                                </vl-info-tile>
                                                <vl-info-tile size="small" class="armos-metric">
                                                    <h2 slot="title"><vl-text small bold>[grafiek]</vl-text></h2>
                                                    <div slot="content">[grafiek]</div>
                                                </vl-info-tile>
                                            </div>
                                        </div>
                                    </div>

                                    <vl-title type="h2" id="content-2">Exploitanten</vl-title>
                                    <div class="vl-grid">
                                        <vl-info-tile
                                            size="small"
                                            class="vl-column vl-column--6 vl-column--m-12 armos-metric"
                                        >
                                            <h1 slot="title"><vl-text bold>Naam luchtzuiveringssysteem/ID</vl-text></h1>
                                            <div slot="content">
                                                <vl-properties>
                                                    <label>Status</label>
                                                    <data>
                                                        <vl-pill type="success">actief</vl-pill>
                                                    </data>
                                                    <label>Installatiedatum</label>
                                                    <data>23-11-2020</data>
                                                    <label>Exploitant</label>
                                                    <data><vl-link href="#">Boer Charel</vl-link></data>
                                                    <label>Contact naam</label>
                                                    <data>Charel De Boer</data>
                                                    <label>GSM-nummer</label>
                                                    <data>
                                                        <vl-link
                                                            icon="mobile-phone"
                                                            icon-placement="before"
                                                            href="tel:0456123456"
                                                        >
                                                            0456/12.34.56
                                                        </vl-link>
                                                    </data>
                                                    <label>Email-adres</label>
                                                    <data>
                                                        <vl-link
                                                            icon="mail"
                                                            icon-placement="before"
                                                            href="mailto:boercharel@example.com"
                                                        >
                                                            BOER.CHAREL@example.com
                                                        </vl-link>
                                                    </data>
                                                    <label>Adres</label>
                                                    <data>
                                                        <address>Straatnaamlaan 123<br />9876 't Gentse</address>
                                                    </data>
                                                </vl-properties>
                                            </div>
                                            <div slot="menu">
                                                <vl-button icon="file-download" icon-placement="before"
                                                    >Exporteer data</vl-button
                                                >
                                            </div>
                                        </vl-info-tile>
                                        <!-- 
                                            NOTE: het nesten van verschillende vl-group elementen is experimenteel 
                                            en kan onverwachte effecten hebben. 
                                        -->
                                        <div
                                            class="vl-column vl-column--6 vl-column--m-12 vl-group vl-group--column armos-metric"
                                        >
                                            <div class="vl-group armos-metric">
                                                <vl-info-tile size="small" class="armos-metric">
                                                    <h2 slot="title"><vl-text small bold>[grafiek]</vl-text></h2>
                                                    <div slot="content">[grafiek]</div>
                                                </vl-info-tile>
                                                <vl-info-tile size="small" class="armos-metric">
                                                    <h2 slot="title"><vl-text small bold>[grafiek]</vl-text></h2>
                                                    <div slot="content">[grafiek]</div>
                                                </vl-info-tile>
                                            </div>
                                            <div class="vl-group armos-metric">
                                                <vl-info-tile size="small" class="armos-metric">
                                                    <h2 slot="title"><vl-text small bold>[grafiek]</vl-text></h2>
                                                    <div slot="content">[grafiek]</div>
                                                </vl-info-tile>
                                                <vl-info-tile size="small" class="armos-metric">
                                                    <h2 slot="title"><vl-text small bold>[grafiek]</vl-text></h2>
                                                    <div slot="content">[grafiek]</div>
                                                </vl-info-tile>
                                            </div>
                                        </div>
                                    </div>
                                </vl-side-navigation-reference>
                            </div>
                            <div class="vl-column vl-column--2 vl-column--m-4 vl-column--s-12">
                                <vl-side-navigation aria-label="inhoudsopgave">
                                    <vl-side-navigation-h5>Op deze pagina</vl-side-navigation-h5>
                                    <vl-side-navigation-content>
                                        <vl-side-navigation-group>
                                            <vl-side-navigation-item>
                                                <a href="#content-1">Luchtzuiveringssystemen</a>
                                            </vl-side-navigation-item>
                                            <vl-side-navigation-item>
                                                <a href="#content-2">Exploitanten</a>
                                            </vl-side-navigation-item>
                                        </vl-side-navigation-group>
                                    </vl-side-navigation-content>
                                </vl-side-navigation>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        `;
    }
}
