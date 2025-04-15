import { registerWebComponents } from '@domg-wc/common-utilities';
import { html } from 'lit';
import { VlParagraphComponent } from './vl-paragraph.component';

registerWebComponents([VlParagraphComponent]);

describe('component - vl-paragraph', () => {
    it('should mount', () => {
        cy.mount(html` <vl-paragraph></vl-paragraph>`);
        cy.get('vl-paragraph').shadow().find('p');
    });

    it('should be accessible', () => {
        cy.mount(html` <vl-paragraph>paragraaf</vl-paragraph>`);
        cy.injectAxe();
        cy.checkA11y('vl-paragraph');
    });

    it('should set bold', () => {
        cy.mount(html` <vl-paragraph bold>paragraaf - bold</vl-paragraph>`);
        cy.get('vl-paragraph').should('have.attr', 'bold');
        cy.get('vl-paragraph').shadow().find('p').should('have.class', 'bold');
    });

    it('should set introduction', () => {
        cy.mount(html` <vl-paragraph introduction>paragraaf - introduction</vl-paragraph>`);
        cy.get('vl-paragraph').should('have.attr', 'introduction');
        cy.get('vl-paragraph').shadow().find('p').should('have.class', 'introduction');
    });
});
