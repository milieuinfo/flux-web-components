import { registerWebComponents } from '@domg-wc/common-utilities';
import { wcagLink, wcagLinkElements } from './wcag-link.section';

registerWebComponents(wcagLinkElements());

const mountDefault = () => cy.mount(wcagLink());

describe('component wcag-link', () => {
    beforeEach(() => {
        mountDefault();
    });

    it('should mount', () => {
        cy.get('vl-link-next');
    });

    it('should render the correct href', () => {
        cy.get('vl-link-next').shadow().find('a').should('have.attr', 'href', 'https://www.w3.org/TR/WCAG21');
    });

    it('should render the correct text', () => {
        cy.get('vl-link-next').shadow().find('a').contains('Web Content Accessibility Guidelines versie 2.1 niveau AA');
    });

    it('should render the external icon', () => {
        cy.get('vl-link-next').shadow().find('span[class="vl-icon"][icon="external"]');
    });

    it('should render with some basic styling from DV - h2 should have the correct style', () => {
        cy.get('vl-link-next').shadow().find('a').should('have.css', 'color', 'rgb(0, 85, 204)');
        cy.get('vl-link-next').shadow().find('a').should('not.have.css', 'color', 'red');
    });
});

describe('component wcag-link - helper function <wcagLinkElements()> ', () => {
    it('should return an array of WebComponents with a length of 2', () => {
        const elements = wcagLinkElements();
        expect(elements).to.be.an('array');
        expect(elements).to.have.length(2);
    });
});
