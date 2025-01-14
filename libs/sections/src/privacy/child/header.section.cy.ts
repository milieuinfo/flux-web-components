import { registerWebComponents } from '@domg-wc/common-utilities';
import { header, privacyHeaderElements } from './header.section';

registerWebComponents(privacyHeaderElements());

const mountDefault = (props: { disableBackLink: boolean, hideBackLink: boolean }) => cy.mount(header(props));

describe('header component', () => {
    beforeEach(() => {
        mountDefault({ disableBackLink: false, hideBackLink: false });
    });

    it('should mount', () => {
        cy.get('vl-functional-header').shadow();
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
        cy.get('vl-functional-header').should('have.attr', 'data-vl-sub-title', 'Privacy');

        cy.get('vl-functional-header').should(
            'not.have.attr',
            'data-vl-sub-title',
            'ToegankelijkheidEngebruiksvoorwaarden'
        );
    });

    it('should render the correct link', () => {
        cy.get('vl-functional-header').should('have.attr', 'data-vl-link', 'https://omgeving.vlaanderen.be');
    });

    it('should not disable the back link when disableBackLink is false', () => {
        cy.get('vl-functional-header').should('not.have.attr', 'data-vl-disable-back-link');
    });
});

describe('header component - with disableBackLink set to true', () => {
    it('should disable the back link when disableBackLink is true', () => {
        mountDefault({ disableBackLink: true, hideBackLink: false });
        cy.get('vl-functional-header').should('have.attr', 'data-vl-disable-back-link');
    });

    it('should NOT disable the back link when disableBackLink is false', () => {
        mountDefault({ disableBackLink: false, hideBackLink: false });
        cy.get('vl-functional-header').should('not.have.attr', 'data-vl-disable-back-link');
    });
});

describe('header component - with hideBackLink set to true', () => {
    it('should hide the back link when hideBackLink is true', () => {
        mountDefault({ disableBackLink: false, hideBackLink: true });
        cy.get('vl-functional-header').should('have.attr', 'data-vl-hide-back-link');
    });

    it('should NOT hide the back link when hideBackLink is false', () => {
        mountDefault({ disableBackLink: false, hideBackLink: false });
        cy.get('vl-functional-header').should('not.have.attr', 'data-vl-hide-back-link');
    });
});

describe('header component - helper function <privacyHeaderElements()> ', () => {
    it('should return an array of WebComponents with a length of 1', () => {
        const elements = privacyHeaderElements();
        expect(elements).to.be.an('array');
        expect(elements).to.have.length(1);
    });
});
