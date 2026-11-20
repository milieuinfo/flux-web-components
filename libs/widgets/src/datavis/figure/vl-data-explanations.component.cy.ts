import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlChartLine } from '../chart/vl-chart-line.component';
import type { ChartModel } from '../models/chart.model';
import { VlDataFigure } from './vl-data-figure.component';

registerWebComponents([VlDataFigure, VlChartLine]);

const KEY = '2bee1b5e-c3c4-59bb-8d9a-742d3002d34e';

/** Met `metadataId` heeft de bron een sleutel: dan vertelt "Over deze data" meer dan de bronregel. De titel staat
 *  er al, dus de grafiek vraagt de catalogus niets. */
const buildModel = ({
    unitInfo,
    isOpenData,
    metadataId,
}: { unitInfo?: string; isOpenData?: boolean; metadataId?: string } = {}): ChartModel => ({
    meta: {
        sources: [{ title: 'Vlaamse Milieumaatschappij', href: 'https://www.vmm.be', metadataId }],
        isOpenData,
        x: { type: 'number', title: 'Jaar' },
        y: { type: 'number', title: 'Magnetische veldsterkte', unit: 'µT', unitInfo },
    },
    series: [{ name: 'Obscurionweg 91', x: Float64Array.from([2020, 2021]), y: Float64Array.from([0.66, 0.71]) }],
});

const accordionOf = (part: Cypress.Chainable<JQuery<HTMLElement>>) => part.shadow().find('vl-accordion');
const defaultAbout = () => cy.get('vl-data-figure').shadow().find('vl-data-about');
/** De uitleggen in de volgorde op het scherm: standaardblokken in de shadow DOM, die van de auteur in de slot. */
const shouldShowExplanations = (expected: string[]) =>
    cy
        .get('vl-data-figure')
        .shadow()
        .find('.explanations')
        .should(($explanations) => {
            const parts = Array.from($explanations[0].children).flatMap((child) =>
                child instanceof HTMLSlotElement ? child.assignedElements() : [child],
            );
            const texts = parts
                .map((part) => part.shadowRoot?.querySelector('vl-accordion')?.getAttribute('toggle-text'))
                .filter(Boolean);
            expect(texts).to.deep.equal(expected);
        });

describe('cypress-component - widgets - vl-data-reading-guide', () => {
    it('should show the text of the author in an accordion below the chart', () => {
        cy.mount(
            html`<vl-data-figure>
                <vl-chart-line .data=${buildModel()}></vl-chart-line>
                <vl-data-reading-guide><p>Elke lijn is een meetpunt.</p></vl-data-reading-guide>
            </vl-data-figure>`,
        );

        accordionOf(cy.get('vl-data-reading-guide')).should('have.attr', 'toggle-text', 'Hoe lees je deze grafiek?');
        cy.get('vl-data-reading-guide p').should('have.text', 'Elke lijn is een meetpunt.');
        cy.get('vl-data-reading-guide').should('have.attr', 'slot', 'explanations');
    });

    it('should show nothing without text', () => {
        cy.mount(
            html`<vl-data-figure>
                <vl-chart-line .data=${buildModel()}></vl-chart-line>
                <vl-data-reading-guide></vl-data-reading-guide>
            </vl-data-figure>`,
        );

        accordionOf(cy.get('vl-data-reading-guide')).should('not.exist');
    });

    it('should show nothing while there is no chart', () => {
        cy.mount(
            html`<vl-data-figure>
                <vl-chart-line></vl-chart-line>
                <vl-data-reading-guide><p>Elke lijn is een meetpunt.</p></vl-data-reading-guide>
            </vl-data-figure>`,
        );

        accordionOf(cy.get('vl-data-reading-guide')).should('not.exist');
    });
});

describe('cypress-component - widgets - vl-data-about', () => {
    it('should be added by the figure when a source has a key, without explaining the unit again', () => {
        cy.mount(
            html`<vl-data-figure>
                <vl-chart-line .data=${buildModel({ metadataId: KEY, unitInfo: 'microtesla' })}></vl-chart-line>
            </vl-data-figure>`,
        );

        accordionOf(defaultAbout()).should('have.attr', 'toggle-text', 'Over deze data');
        defaultAbout().shadow().find('dd').eq(1).should('have.text', KEY);
        defaultAbout().shadow().should('not.contain.text', 'microtesla');
    });

    it('should give every source its own list, and the figure one of its own', () => {
        const model = buildModel({ metadataId: KEY });
        model.meta.sources.push({ title: 'Departement Omgeving' });
        cy.mount(
            html`<vl-data-figure>
                <vl-chart-line .data=${model}></vl-chart-line>
            </vl-data-figure>`,
        );

        defaultAbout()
            .shadow()
            .find('dl')
            .then(($lists) =>
                expect($lists.toArray().map((dl) => dl.querySelector('dt')?.textContent)).to.deep.equal([
                    'Bron 1',
                    'Bron 2',
                    'Eenheid',
                ]),
            );
    });

    it('should not be added when the source line already says everything', () => {
        cy.mount(
            html`<vl-data-figure>
                <vl-chart-line .data=${buildModel({ isOpenData: true, unitInfo: 'microtesla' })}></vl-chart-line>
            </vl-data-figure>`,
        );

        cy.get('vl-data-figure').shadow().find('vl-data-table').should('exist');
        defaultAbout().should('not.exist');
    });

    it('should show the source with its link and the open data mention from meta', () => {
        cy.mount(
            html`<vl-data-figure>
                <vl-chart-line .data=${buildModel({ isOpenData: true })}></vl-chart-line>
                <vl-data-about></vl-data-about>
            </vl-data-figure>`,
        );

        cy.get('vl-data-about')
            .shadow()
            .find('dt')
            .then(($terms) =>
                expect($terms.toArray().map((dt) => dt.textContent)).to.deep.equal(['Bron', 'Eenheid', 'Open data']),
            );
        cy.get('vl-data-about').shadow().find('vl-link').first().should('have.attr', 'href', 'https://www.vmm.be');
    });

    it('should put the text of the author below what meta says, instead of the default block', () => {
        cy.mount(
            html`<vl-data-figure>
                <vl-chart-line .data=${buildModel({ unitInfo: 'microtesla' })}></vl-chart-line>
                <vl-data-about><p>De meetpunten staan langs hoogspanningslijnen.</p></vl-data-about>
            </vl-data-figure>`,
        );

        defaultAbout().should('not.exist');
        cy.get('vl-data-about p').should('have.text', 'De meetpunten staan langs hoogspanningslijnen.');
        cy.get('vl-data-about').then(($about) => {
            cy.get('vl-data-about')
                .shadow()
                .find('dl')
                .should(($list) => {
                    expect($list[0].getBoundingClientRect().bottom).to.be.at.most(
                        $about.find('p')[0].getBoundingClientRect().top,
                    );
                });
        });
    });
});

describe('cypress-component - widgets - vl-data-figure - explanations zone', () => {
    it('should always place the explanations below the chart, in the order of the author', () => {
        cy.mount(
            html`<vl-data-figure>
                <vl-data-about><p>Extra uitleg.</p></vl-data-about>
                <vl-data-reading-guide><p>Elke lijn is een meetpunt.</p></vl-data-reading-guide>
                <vl-chart-line .data=${buildModel()}></vl-chart-line>
            </vl-data-figure>`,
        );

        shouldShowExplanations(['Bekijk de cijfers', 'Over deze data', 'Hoe lees je deze grafiek?']);
        cy.get('vl-data-figure > vl-chart-line').then(($chart) => {
            cy.get('vl-data-figure > vl-data-about').should(($about) => {
                expect($about[0].getBoundingClientRect().top).to.be.at.least($chart[0].getBoundingClientRect().bottom);
            });
        });
    });

    it('should put the default table first and the default about last', () => {
        cy.mount(
            html`<vl-data-figure>
                <vl-chart-line .data=${buildModel({ metadataId: KEY })}></vl-chart-line>
                <vl-data-reading-guide><p>Elke lijn is een meetpunt.</p></vl-data-reading-guide>
            </vl-data-figure>`,
        );

        shouldShowExplanations(['Bekijk de cijfers', 'Hoe lees je deze grafiek?', 'Over deze data']);
    });

    it('should leave the slot alone when the author chose one', () => {
        cy.mount(
            html`<vl-data-figure>
                <vl-chart-line .data=${buildModel()}></vl-chart-line>
                <vl-data-reading-guide slot="filters"><p>Elke lijn is een meetpunt.</p></vl-data-reading-guide>
            </vl-data-figure>`,
        );

        cy.get('vl-data-reading-guide').should('have.attr', 'slot', 'filters');
    });

    it('should not move a part that is not in a figure', () => {
        cy.mount(
            html`<div>
                <vl-data-reading-guide><p>Los</p></vl-data-reading-guide>
            </div>`,
        );

        cy.get('vl-data-reading-guide').should('not.have.attr', 'slot');
    });
});

describe('cypress-component - widgets - explanations - accessibility', () => {
    it('should be accessible', () => {
        cy.mount(
            html`<vl-data-figure>
                <vl-chart-line .data=${buildModel({ metadataId: KEY, isOpenData: true })}></vl-chart-line>
                <vl-data-reading-guide><p>Elke lijn is een meetpunt.</p></vl-data-reading-guide>
            </vl-data-figure>`,
        );
        defaultAbout().should('exist');
        cy.injectAxe();

        cy.checkA11y('vl-data-figure');
    });
});
