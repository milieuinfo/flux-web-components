import { wcagLink } from './wcag-link.section';

const mountDefault = () => cy.mount(wcagLink());

describe('component wcag-link', () => {
    beforeEach(() => {
        mountDefault();
    });

    it('should mount', () => {
        cy.get('vl-link');
    });

    it('should render the correct href', () => {
        cy.get('vl-link').shadow().find('a').should('have.attr', 'href', 'https://www.w3.org/TR/WCAG21');
    });

    it('should render the correct text', () => {
        cy.get('vl-link').contains('Web Content Accessibility Guidelines versie 2.1 niveau AA');
    });

    it('should render the external icon', () => {
        cy.get('vl-link').shadow().find('span.vl-icon.vl-icon--external');
    });

    it('should render with some basic styling from DV - h2 should have the correct style', () => {
        cy.get('vl-link').shadow().find('a').should('have.css', 'color', 'rgb(0, 85, 204)');
        cy.get('vl-link').shadow().find('a').should('not.have.css', 'color', 'red');
    });
});
