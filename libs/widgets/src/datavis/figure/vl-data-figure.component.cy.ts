import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlChartLine } from '../chart/vl-chart-line.component';
import { DATA_CHANGE_EVENT } from '../events/data-change.event';
import type { ChartModel, ChartSeries } from '../models/chart.model';
import { VlDataFigure } from './vl-data-figure.component';

registerWebComponents([VlDataFigure, VlChartLine]);

const buildSeries = (name: string, y: number[]): ChartSeries => ({
    name,
    x: Float64Array.from([2020, 2021, 2022]),
    y: Float64Array.from(y),
});

const buildModel = (series: ChartSeries[]): ChartModel => ({
    meta: {
        sources: [{ title: 'Vlaamse Milieumaatschappij' }],
        x: { type: 'number', title: 'Jaar' },
        y: { type: 'number', title: 'Magnetische veldsterkte', unit: 'µT' },
    },
    series,
});

const completeModel = () =>
    buildModel([buildSeries('Obscurionweg 91', [0.66, 0.71, 0.64]), buildSeries('Obscurionweg 93', [0.3, 0.35, 0.4])]);

const figure = () => cy.get('vl-data-figure').shadow().find('figure');
const caption = () => cy.get('vl-data-figure').shadow().find('figcaption');
const headline = () => caption().find('vl-title').shadow().find('h2');
/** De standaardtabel staat in de shadow DOM van de figuur, een eigen tabel in de light DOM. */
const defaultTable = () => cy.get('vl-data-figure').shadow().find('vl-data-table');
const tableIn = (dataTable: Cypress.Chainable<JQuery<HTMLElement>>) => dataTable.shadow().find('table');

describe('cypress-component - widgets - vl-data-figure - caption', () => {
    it('should show the headline and subtitle in a figcaption, at the level of the author', () => {
        cy.mount(
            html`<vl-data-figure
                headline="Veldsterkte per meetpunt"
                headline-level="h2"
                subtitle="Twee meetpunten, 2020-2022"
            >
                <vl-chart-line .data=${completeModel()}></vl-chart-line>
            </vl-data-figure>`,
        );

        caption().should('be.visible');
        caption().find('vl-title').should('contain.text', 'Veldsterkte per meetpunt');
        headline().should('be.visible');
        caption().find('vl-text').should('be.visible').and('contain.text', 'Twee meetpunten, 2020-2022');
    });

    it('should give the headline the Flux heading style, whatever its level', () => {
        cy.viewport(1200, 800); // onder 767 px is een Flux-h3 kleiner (22 px)
        cy.mount(
            html`<vl-data-figure headline="Veldsterkte per meetpunt" headline-level="h2">
                <vl-chart-line .data=${completeModel()}></vl-chart-line>
            </vl-data-figure>`,
        );

        headline().should('have.css', 'font-weight', '500').and('have.css', 'font-size', '26px'); // Flux-h3, ook al is het een h2
    });

    it('should leave out the figcaption without headline and subtitle', () => {
        cy.mount(html`<vl-data-figure><vl-chart-line .data=${completeModel()}></vl-chart-line></vl-data-figure>`);

        caption().should('not.exist');
    });

    it('should be a figure for assistive technology', () => {
        cy.mount(html`<vl-data-figure><vl-chart-line .data=${completeModel()}></vl-chart-line></vl-data-figure>`);

        figure().should('exist');
    });
});

describe('cypress-component - widgets - vl-data-figure - data change', () => {
    it('should hear every state of the chart', () => {
        cy.mount(html`<vl-data-figure><vl-chart-line></vl-chart-line></vl-data-figure>`);
        cy.get('vl-data-figure').then(($figure) => {
            const states: string[] = [];
            $figure[0].addEventListener(DATA_CHANGE_EVENT, (event) => states.push(event.detail.status));
            cy.get('vl-chart-line').invoke('prop', 'data', completeModel());
            cy.wrap(states).should('deep.equal', ['data']);
        });
    });
});

describe('cypress-component - widgets - vl-data-figure - table', () => {
    it('should always add the table, without the author asking for it', () => {
        cy.mount(html`<vl-data-figure><vl-chart-line .data=${completeModel()}></vl-chart-line></vl-data-figure>`);

        defaultTable().shadow().find('vl-accordion').should('have.attr', 'toggle-text', 'Bekijk de cijfers');
    });

    it('should show one row per x and one column per series', () => {
        cy.mount(html`<vl-data-figure><vl-chart-line .data=${completeModel()}></vl-chart-line></vl-data-figure>`);

        tableIn(defaultTable()).find('caption').should('contain.text', 'Magnetische veldsterkte (µT)');
        tableIn(defaultTable())
            .find('thead th')
            .should(($headers) => {
                expect($headers.toArray().map((th) => th.textContent?.trim())).to.deep.equal([
                    'Jaar',
                    'Obscurionweg 91',
                    'Obscurionweg 93',
                ]);
            });
        tableIn(defaultTable()).find('tbody tr').should('have.length', 3);
        tableIn(defaultTable()).find('tbody tr').eq(1).find('td').first().should('contain.text', '0,71');
    });

    it('should align the numbers to the right', () => {
        cy.mount(html`<vl-data-figure><vl-chart-line .data=${completeModel()}></vl-chart-line></vl-data-figure>`);

        tableIn(defaultTable()).find('td').first().should('have.css', 'text-align', 'right');
    });

    it('should explain empty cells when the data has a gap', () => {
        const model = buildModel([buildSeries('Obscurionweg 91', [0.66, NaN, 0.64])]);

        cy.mount(html`<vl-data-figure><vl-chart-line .data=${model}></vl-chart-line></vl-data-figure>`);

        defaultTable().shadow().find('.gap-note').should('contain.text', 'geen gegevens');
        tableIn(defaultTable()).find('tbody tr').eq(1).find('td').first().invoke('text').should('match', /^\s*$/);
    });

    it('should not show a table while the chart is loading', () => {
        cy.mount(html`<vl-data-figure><vl-chart-line></vl-chart-line></vl-data-figure>`);

        defaultTable().shadow().find('vl-accordion').should('not.exist');
    });

    it('should follow new data', () => {
        cy.mount(html`<vl-data-figure><vl-chart-line></vl-chart-line></vl-data-figure>`);

        cy.get('vl-chart-line').invoke('prop', 'data', completeModel());

        tableIn(defaultTable()).find('tbody tr').should('have.length', 3);
    });

    it('should use the table of the author among the explanations, in its order, instead of adding one', () => {
        cy.mount(
            html`<vl-data-figure>
                <vl-data-table></vl-data-table>
                <vl-chart-line .data=${completeModel()}></vl-chart-line>
                <vl-data-reading-guide><p>Elke lijn is een meetpunt.</p></vl-data-reading-guide>
            </vl-data-figure>`,
        );

        defaultTable().should('not.exist');
        tableIn(cy.get('vl-data-figure > vl-data-table')).should('exist');
        // De zone van de uitleggen staat altijd onder de grafiek; binnen de zone telt de volgorde van de auteur.
        cy.get('vl-data-figure > vl-chart-line').then(($chart) => {
            cy.get('vl-data-figure > vl-data-table').should(($table) => {
                expect($table[0].getBoundingClientRect().top).to.be.at.least($chart[0].getBoundingClientRect().bottom);
            });
        });
        cy.get('vl-data-figure > vl-data-table').then(($table) => {
            cy.get('vl-data-figure > vl-data-reading-guide').should(($guide) => {
                expect($guide[0].getBoundingClientRect().top).to.be.at.least($table[0].getBoundingClientRect().bottom);
            });
        });
    });
});

describe('cypress-component - widgets - vl-data-figure - table pager', () => {
    const ownTable = () => cy.get('vl-data-figure > vl-data-table');

    it('should show no pager when all rows fit on one page', () => {
        cy.mount(html`<vl-data-figure><vl-chart-line .data=${completeModel()}></vl-chart-line></vl-data-figure>`);

        defaultTable().shadow().find('vl-pager').should('not.exist');
    });

    it('should show the rows of one page and go to the next page with the pager', () => {
        cy.mount(
            html`<vl-data-figure>
                <vl-chart-line .data=${completeModel()}></vl-chart-line>
                <vl-data-table rows-per-page="2"></vl-data-table>
            </vl-data-figure>`,
        );

        tableIn(ownTable()).find('tbody tr').should('have.length', 2);
        ownTable().shadow().find('vl-pager').shadow().find('[data-pager-page="2"] a').click({ force: true });
        tableIn(ownTable()).find('tbody tr').should('have.length', 1).and('contain.text', '0,64');
    });
});

describe('cypress-component - widgets - vl-data-figure - accessibility', () => {
    it('should be accessible', () => {
        cy.mount(
            html`<vl-data-figure headline="Fijnstof daalt in Gent" subtitle="Jaargemiddelde per meetpunt">
                <vl-chart-line .data=${completeModel()}></vl-chart-line>
            </vl-data-figure>`,
        );
        defaultTable().should('exist');
        cy.injectAxe();

        cy.checkA11y('vl-data-figure');
    });
});
