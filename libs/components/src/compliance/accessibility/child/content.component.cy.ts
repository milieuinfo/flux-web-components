import { registerWebComponents } from '@domg-wc/common';
import { COMPLIANCE_STATUS, EVALUATION_STATUS, type AccessibilityProperties } from '../vl-accessibility.model';
import { content, contentElements } from './content.component';

const mountDefault = (props: AccessibilityProperties) => cy.mount(content(props));

registerWebComponents(contentElements());

describe('component content', () => {
    const props: AccessibilityProperties = {
        application: 'Test Application',
        compliance: COMPLIANCE_STATUS.FULLY_COMPLIANT,
        date: '2021-01-01',
        dateModified: '2021-01-01',
        disableBackLink: false,
        hideBackLink: false,
        evaluation: EVALUATION_STATUS.SELF_EVALUATED,
        limitations: {
            withTiming: ['Limitation 1', 'Limitation 2'],
            withoutTiming: ['Limitation 3', 'Limitation 4'],
            outsideApplicableLaw: ['Limitation 5', 'Limitation 6'],
        },
        version: '1.0.0',
    };

    beforeEach(() => {
        mountDefault(props);
    });

    it('should mount', () => {
        cy.get('section[id="content"]');
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('section[id="content"]');
    });

    it('should render the correct application', () => {
        cy.get('p').contains(`Deze toegankelijkheidsverklaring is van toepassing op ${props.application}.`);
    });

    it('should render the correct contact card', () => {
        cy.get('vl-contact-card[id="contact-card-1"]');
    });

    it('should render the correct enforcement procedure', () => {
        cy.get('div[id="enforcement-procedure"]');
    });

    it('should render the side navigation', () => {
        cy.get('[id="side-nav-accessibility"]').should('have.attr', 'aria-label', 'inhoudsopgave');
        cy.get('vl-side-navigation').should('exist');
    });

    it('should render with some basic styling from DV - h2 should have the correct style', () => {
        cy.get('vl-title[type="h2"]')
            .shadow()
            .find('h2')
            .should('have.css', 'font-family', '"Flanders Art Sans", sans-serif');
    });
});

describe('component content - helper function <contentChildElements()> ', () => {
    it('should return an array of WebComponents with a length of 3', () => {
        const elements = contentElements();
        expect(elements).to.be.an('array');
        expect(elements).to.have.length(3);
    });
});
