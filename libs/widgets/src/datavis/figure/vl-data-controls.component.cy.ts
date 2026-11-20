import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlChartLine } from '../chart/vl-chart-line.component';
import type { ChartModel, ChartSeries } from '../models/chart.model';
import { VlDataFigure } from './vl-data-figure.component';

registerWebComponents([VlDataFigure, VlChartLine]);

const buildSeries = (name: string, y: number[]): ChartSeries => ({
    name,
    x: Float64Array.from([2020, 2021, 2022]),
    y: Float64Array.from(y),
});

const buildModel = (sources = [{ title: 'Vlaamse Milieumaatschappij' }]): ChartModel => ({
    meta: {
        sources,
        x: { type: 'number', title: 'Jaar' },
        y: { type: 'number', title: 'Magnetische veldsterkte', unit: 'µT' },
    },
    series: [buildSeries('Obscurionweg 91', [0.66, 0.71, 0.64])],
});

const inFigure = (selector: string) => cy.get('vl-data-figure').shadow().find(selector);
const defaultRow = () => inFigure('vl-data-controls');
const iconButtonOf = (control: Cypress.Chainable<JQuery<HTMLElement>>) => control.shadow().find('vl-button');
const linkOf = (control: Cypress.Chainable<JQuery<HTMLElement>>) => control.shadow().find('vl-link');
const clickControl = (control: Cypress.Chainable<JQuery<HTMLElement>>) =>
    control.shadow().find('vl-button, vl-link').shadow().find('button').should('be.visible').click({ force: true });

/** Vangt het bestand dat `downloadFile` de browser laat bewaren: de blob en de bestandsnaam van de link. */
const catchDownloads = () =>
    cy.window().then((win) => {
        cy.spy(win.URL, 'createObjectURL').as('createObjectURL');
        cy.stub(win.HTMLAnchorElement.prototype, 'click').as('linkClick');
    });

describe('cypress-component - widgets - vl-data-controls - default row', () => {
    it('should show a PNG download and fullscreen above the chart', () => {
        cy.mount(html`<vl-data-figure><vl-chart-line .data=${buildModel()}></vl-chart-line></vl-data-figure>`);

        iconButtonOf(defaultRow().find('vl-data-download'))
            .should('have.attr', 'label', 'Download grafiek (PNG)')
            .and('have.attr', 'ghost');
        iconButtonOf(defaultRow().find('vl-data-fullscreen')).should('have.attr', 'label', 'Grafiek vergroten');
    });

    it('should name an icon button for a screen reader and show the name in a tooltip', () => {
        cy.mount(html`<vl-data-figure><vl-chart-line .data=${buildModel()}></vl-chart-line></vl-data-figure>`);

        const download = () => defaultRow().find('vl-data-download');
        iconButtonOf(download()).shadow().find('button').should('have.attr', 'aria-label', 'Download grafiek (PNG)');
        download()
            .shadow()
            .find('vl-tooltip')
            .should('have.text', 'Download grafiek (PNG)')
            .and('have.attr', 'type', 'label');
    });

    it('should show the text next to the icon with show-label', () => {
        cy.mount(
            html`<vl-data-figure>
                <vl-data-controls><vl-data-download format="png" show-label></vl-data-download></vl-data-controls>
                <vl-chart-line .data=${buildModel()}></vl-chart-line>
            </vl-data-figure>`,
        );

        linkOf(cy.get('vl-data-controls > vl-data-download')).should('contain.text', 'Download grafiek (PNG)');
    });

    it('should put the controls next to the headline, the default buttons after those of the author', () => {
        cy.mount(
            html`<vl-data-figure headline="Veldsterkte">
                <vl-data-controls slot="controls"><vl-data-fullscreen></vl-data-fullscreen></vl-data-controls>
                <vl-chart-line .data=${buildModel()}></vl-chart-line>
            </vl-data-figure>`,
        );

        inFigure('.header').children().should('have.length', 2).first().should('match', 'figcaption');
        inFigure('.header .controls').children().first().should('match', 'slot[name="controls"]');
    });

    it('should put the CSV download with the numbers, in the table', () => {
        cy.mount(html`<vl-data-figure><vl-chart-line .data=${buildModel()}></vl-chart-line></vl-data-figure>`);

        linkOf(inFigure('vl-data-table').shadow().find('vl-data-download[format="csv"]')).should(
            'contain.text',
            'Download cijfers (CSV)',
        );
    });

    it('should keep its place but stay invisible while the chart loads', () => {
        cy.mount(html`<vl-data-figure><vl-chart-line></vl-chart-line></vl-data-figure>`);

        iconButtonOf(defaultRow().find('vl-data-download')).should('not.be.visible').and('have.attr', 'inert');
    });

    it('should hide the controls when there is nothing to show', () => {
        cy.mount(html`<vl-data-figure><vl-chart-line .data=${buildModel([])}></vl-chart-line></vl-data-figure>`);

        iconButtonOf(defaultRow().find('vl-data-download')).should('not.be.visible').and('have.attr', 'inert');
        iconButtonOf(defaultRow().find('vl-data-fullscreen')).should('not.be.visible').and('have.attr', 'inert');
    });
});

describe('cypress-component - widgets - vl-data-controls - own row', () => {
    it('should give PNG and CSV each their own icon, so they differ without the tooltip', () => {
        cy.mount(
            html`<vl-data-figure>
                <vl-data-controls>
                    <vl-data-download format="png"></vl-data-download>
                    <vl-data-download format="csv"></vl-data-download>
                </vl-data-controls>
                <vl-chart-line .data=${buildModel()}></vl-chart-line>
            </vl-data-figure>`,
        );

        iconButtonOf(cy.get('vl-data-download[format="png"]'))
            .invoke('attr', 'icon')
            .then((pngIcon) => {
                iconButtonOf(cy.get('vl-data-download[format="csv"]'))
                    .should('have.attr', 'icon')
                    .and('not.equal', pngIcon);
            });
    });

    it('should use the row of the author instead of the default row, in its order', () => {
        cy.mount(
            html`<vl-data-figure>
                <vl-data-controls>
                    <vl-data-fullscreen></vl-data-fullscreen>
                    <vl-data-download format="csv"></vl-data-download>
                </vl-data-controls>
                <vl-chart-line .data=${buildModel()}></vl-chart-line>
            </vl-data-figure>`,
        );

        defaultRow().should('not.exist');
        cy.get('vl-data-controls > *').then(($controls) => {
            expect($controls.toArray().map((control) => control.localName)).to.deep.equal([
                'vl-data-fullscreen',
                'vl-data-download',
            ]);
        });
        iconButtonOf(cy.get('vl-data-controls > vl-data-download')).should(
            'have.attr',
            'label',
            'Download cijfers (CSV)',
        );
    });

    it('should show no controls for an empty row', () => {
        cy.mount(
            html`<vl-data-figure>
                <vl-data-controls></vl-data-controls>
                <vl-chart-line .data=${buildModel()}></vl-chart-line>
            </vl-data-figure>`,
        );

        defaultRow().should('not.exist');
        cy.get('vl-data-figure vl-data-fullscreen').should('not.exist');
    });

    it('should show nothing outside a figure', () => {
        cy.mount(html`<vl-data-download></vl-data-download>`);

        linkOf(cy.get('vl-data-download')).should('not.exist');
    });
});

describe('cypress-component - widgets - vl-data-download', () => {
    it('should save the numbers as CSV, named after the headline', () => {
        cy.mount(
            html`<vl-data-figure headline="Veldsterkte: Obscurionweg">
                <vl-chart-line .data=${buildModel()}></vl-chart-line>
            </vl-data-figure>`,
        );
        catchDownloads();

        clickControl(inFigure('vl-data-table').shadow().find('vl-data-download'));

        cy.get('@linkClick').should('have.been.calledOnce');
        cy.get<sinon.SinonStub>('@linkClick').then((click) => {
            expect((click.firstCall.thisValue as HTMLAnchorElement).download).to.equal('Veldsterkte- Obscurionweg.csv');
        });
        cy.get<sinon.SinonSpy>('@createObjectURL')
            .then((createObjectURL) => (createObjectURL.firstCall.args[0] as Blob).text())
            .should('contain', '"Jaar","Obscurionweg 91 (µT)"')
            .and('contain', '2021,0.71');
    });

    it('should save the chart as PNG, named after the headline', () => {
        cy.mount(
            html`<vl-data-figure headline="Veldsterkte per meetpunt">
                <vl-chart-line .data=${buildModel()}></vl-chart-line>
            </vl-data-figure>`,
        );
        catchDownloads();

        clickControl(defaultRow().find('vl-data-download'));

        cy.get('@linkClick', { timeout: 10000 }).should('have.been.calledOnce');
        cy.get<sinon.SinonStub>('@linkClick').then((click) => {
            expect((click.firstCall.thisValue as HTMLAnchorElement).download).to.equal('Veldsterkte per meetpunt.png');
        });
        cy.get<sinon.SinonSpy>('@createObjectURL').then((createObjectURL) => {
            // Plotly maakt onderweg zelf een object-URL voor de svg; de PNG is de laatste.
            expect((createObjectURL.lastCall.args[0] as Blob).type).to.equal('image/png');
        });
    });

    it('should name the file "grafiek" without a headline', () => {
        cy.mount(html`<vl-data-figure><vl-chart-line .data=${buildModel()}></vl-chart-line></vl-data-figure>`);
        catchDownloads();

        clickControl(inFigure('vl-data-table').shadow().find('vl-data-download'));

        cy.get<sinon.SinonStub>('@linkClick').should(($click) => {
            expect(($click.firstCall.thisValue as HTMLAnchorElement).download).to.equal('grafiek.csv');
        });
    });
});

describe('cypress-component - widgets - vl-data-fullscreen', () => {
    it('should make the whole figure fullscreen', () => {
        cy.mount(html`<vl-data-figure><vl-chart-line .data=${buildModel()}></vl-chart-line></vl-data-figure>`);
        cy.get('vl-data-figure').then(($figure) => {
            cy.stub($figure[0], 'requestFullscreen').as('requestFullscreen').resolves();
        });

        clickControl(defaultRow().find('vl-data-fullscreen'));

        cy.get('@requestFullscreen').should('have.been.calledOnce');
    });

    it('should offer to leave fullscreen while the figure is fullscreen', () => {
        cy.mount(html`<vl-data-figure><vl-chart-line .data=${buildModel()}></vl-chart-line></vl-data-figure>`);
        // Echte fullscreen vraagt een klik van de gebruiker; hier doen we alsof de browser de figuur schermvullend maakte.
        cy.document().then((doc) => {
            cy.get('vl-data-figure').then(($figure) => {
                Object.defineProperty(doc, 'fullscreenElement', { configurable: true, get: () => $figure[0] });
                doc.dispatchEvent(new Event('fullscreenchange'));
            });
        });

        iconButtonOf(defaultRow().find('vl-data-fullscreen'))
            .should('have.attr', 'label', 'Grafiek verkleinen')
            .and('have.attr', 'icon', 'shrink');

        cy.document().then((doc) => {
            delete (doc as { fullscreenElement?: Element }).fullscreenElement;
            doc.dispatchEvent(new Event('fullscreenchange'));
        });
        iconButtonOf(defaultRow().find('vl-data-fullscreen')).should('have.attr', 'label', 'Grafiek vergroten');
    });
});

describe('cypress-component - widgets - vl-data-controls - accessibility', () => {
    it('should be accessible', () => {
        cy.mount(html`<vl-data-figure><vl-chart-line .data=${buildModel()}></vl-chart-line></vl-data-figure>`);
        defaultRow().should('exist');
        cy.injectAxe();

        cy.checkA11y('vl-data-figure');
    });
});
