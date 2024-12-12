import { registerWebComponents } from '@domg-wc/common-utilities';
import { html } from 'lit';
import { VlParagraphComponent } from './vl-paragraph.component';

registerWebComponents([VlParagraphComponent]);

describe('component - vl-paragraph-next', () => {
    it('should mount', () => {
        cy.mount(html` <vl-paragraph-next></vl-paragraph-next>`);
        cy.get('vl-paragraph-next').shadow().find('p');
    });

    it('should be accessible', () => {
        cy.mount(html` <vl-paragraph-next>paragraaf</vl-paragraph-next>`);
        cy.injectAxe();
        cy.checkA11y('vl-paragraph-next');
    });

    it('should set bold', () => {
        cy.mount(html` <vl-paragraph-next bold>paragraaf - bold</vl-paragraph-next>`);
        cy.get('vl-paragraph-next').should('have.attr', 'bold');
        cy.get('vl-paragraph-next').shadow().find('p').should('have.class', 'bold');
    });

    it('should set introduction', () => {
        cy.mount(html` <vl-paragraph-next introduction>paragraaf - introduction</vl-paragraph-next>`);
        cy.get('vl-paragraph-next').should('have.attr', 'introduction');
        cy.get('vl-paragraph-next').shadow().find('p').should('have.class', 'introduction');
    });
});
