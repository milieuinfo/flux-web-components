import { registerWebComponents } from '@domg-wc/common';
import { header, cookieStatementHeaderElements } from './header.section';

registerWebComponents(cookieStatementHeaderElements());

const mountDefault = () => cy.mount(header());

describe('component header', () => {
    beforeEach(() => {
        mountDefault();
    });

    it('should mount', () => {
        cy.get('vl-functional-header');
    });

    it('should be accessible', () => {
        cy.get('vl-functional-header');

        cy.injectAxe();
        cy.checkA11y('vl-functional-header');
    });

    it('should render with some basic styling from DV - div.vl-functional-header__content should have no padding', () => {
        cy.get('vl-functional-header')
            .shadow()
            .find('div.vl-functional-header__content')
            .should('have.css', 'padding', '0px');
    });

    it('should render the correct title', () => {
        cy.get('vl-functional-header').should('have.attr', 'data-vl-title', 'Departement Omgeving');
        cy.get('vl-functional-header').should('not.have.attr', 'data-vl-title', 'Test');
    });

    it('should render the correct sub-title', () => {
        cy.get('vl-functional-header').should('have.attr', 'data-vl-sub-title', 'Cookieverklaring');

        cy.get('vl-functional-header').should(
            'not.have.attr',
            'data-vl-sub-title',
            'ToegankelijkheidEngebruiksvoorwaarden'
        );
    });

    it('should render the correct link', () => {
        cy.get('vl-functional-header').should('have.attr', 'data-vl-link', 'https://omgeving.vlaanderen.be');
    });
});

describe('component header - helper function <cookieStatementHeaderElements()> ', () => {
    it('should return an array of WebComponents with a length of 1', () => {
        const elements = cookieStatementHeaderElements();
        expect(elements).to.be.an('array');
        expect(elements).to.have.length(1);
    });
});
