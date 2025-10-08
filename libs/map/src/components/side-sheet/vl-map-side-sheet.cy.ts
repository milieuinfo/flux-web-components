import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlMap } from '../../vl-map';
import { VlMapSideSheet } from './vl-map-side-sheet';

registerWebComponents([VlMap, VlMapSideSheet]);

const mapSideSheetFixture = html`
    <vl-map lambert2008>
        <vl-map-side-sheet></vl-map-side-sheet>
    </vl-map>
`;

describe('cypress-component - map - vl-map-side-sheet', () => {
    it('de side sheet zal absoluut en links gepositioneerd worden', () => {
        cy.mount(mapSideSheetFixture);
        cy.runTestFor<VlMapSideSheet>('vl-map-side-sheet', (vlMapSideSheet) => {
            expect(vlMapSideSheet.hasAttribute('left')).to.be.true;
            expect(vlMapSideSheet.hasAttribute('absolute')).to.be.true;
        });
    });

    it('should have arrow in correct position', () => {
        cy.mount(html` <vl-map-side-sheet></vl-map-side-sheet> `);

        cy.get('vl-map-side-sheet')
            .shadow()
            .find('vl-button')
            .shadow()
            .find('button span')
            .should('have.class', 'vl-icon')
            .and('have.class', 'vl-icon--nav-right');
    });

    it('should be right by default & change default icon direction when opening or closing', () => {
        cy.mount(html` <vl-map-side-sheet></vl-map-side-sheet> `);

        cy.get('vl-map-side-sheet').shouldHaveComputedStyle({ style: 'left', value: '0px' });
        shouldHaveIcon('nav-right');
        cy.get('vl-map-side-sheet').shadow().find('vl-button').shadow().find('button').click({ force: true });
        shouldHaveIcon('nav-left');
        cy.get('vl-map-side-sheet').shadow().find('vl-button').shadow().find('button').click({ force: true });
        shouldHaveIcon('nav-right');
    });

    it('should have arrow in correct position when starting in open position', () => {
        cy.mount(html` <vl-map-side-sheet open=""></vl-map-side-sheet> `);

        cy.get('vl-map-side-sheet')
            .shadow()
            .find('vl-button')
            .shadow()
            .find('button span')
            .should('have.class', 'vl-icon')
            .and('have.class', 'vl-icon--nav-left');
    });

    it('should have arrow in correct position when starting in open position from the right', () => {
        cy.mount(html` <vl-map-side-sheet open="" right=""></vl-map-side-sheet> `);

        cy.get('vl-map-side-sheet')
            .shadow()
            .find('vl-button')
            .shadow()
            .find('button span')
            .should('have.class', 'vl-icon')
            .and('have.class', 'vl-icon--nav-right');
    });
});

const shouldHaveIcon = (iconName: string) => {
    cy.get('vl-map-side-sheet')
        .shadow()
        .find('vl-button')
        .shadow()
        .find('button')
        .find('span')
        .should('have.class', `vl-icon--${iconName}`);
};
