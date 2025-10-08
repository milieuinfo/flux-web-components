import { registerWebComponents } from '@domg-wc/common';
import { type HeaderProps, header, headerElements } from './header.component';

registerWebComponents(headerElements());

const mountDefault = (props: HeaderProps) => cy.mount(header(props));

describe('cypress-component - compliance components - accessibility header', () => {
    beforeEach(() => {
        mountDefault({ disableBackLink: false, hideBackLink: false });
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
        cy.get('vl-functional-header').should('have.attr', 'title', 'Departement Omgeving');
        cy.get('vl-functional-header').should('not.have.attr', 'title', 'Test');
    });

    it('should render the correct sub-title', () => {
        cy.get('vl-functional-header').should('have.attr', 'sub-title', 'Toegankelijkheid en gebruiksvoorwaarden');

        cy.get('vl-functional-header').should('not.have.attr', 'sub-title', 'ToegankelijkheidEngebruiksvoorwaarden');
    });

    it('should render the correct link', () => {
        cy.get('vl-functional-header').should('have.attr', 'link', 'https://omgeving.vlaanderen.be');
    });

    it('should not disable the back link when disableBackLink is false', () => {
        cy.get('vl-functional-header').should('not.have.attr', 'disable-back-link');
    });

    it('should not hide the back link when hideBackLink is false', () => {
        cy.get('vl-functional-header').should('not.have.attr', 'hide-back-link');
    });
});

describe('cypress-component - compliance components - accessibility header - with disableBackLink set to true', () => {
    it('should disable the back link when disableBackLink is true', () => {
        mountDefault({ disableBackLink: true, hideBackLink: false });
        cy.get('vl-functional-header').should('have.attr', 'disable-back-link');
    });

    it('should NOT disable the back link when disableBackLink is false', () => {
        mountDefault({ disableBackLink: false, hideBackLink: false });
        cy.get('vl-functional-header').should('not.have.attr', 'disable-back-link');
    });
});

describe('cypress-component - compliance components - accessibility header - with hideBackLink set to true', () => {
    it('should hide the back link when hideBackLink is true', () => {
        mountDefault({ disableBackLink: false, hideBackLink: true });
        cy.get('vl-functional-header').should('have.attr', 'hide-back-link');
    });

    it('should NOT hide the back link when hideBackLink is false', () => {
        mountDefault({ disableBackLink: false, hideBackLink: false });
        cy.get('vl-functional-header').should('not.have.attr', 'hide-back-link');
    });
});

describe('cypress-component - compliance components - accessibility header - helper function <headerElements()> ', () => {
    it('should return an array of WebComponents with a length of 1', () => {
        const elements = headerElements();
        expect(elements).to.be.an('array');
        expect(elements).to.have.length(1);
    });
});
