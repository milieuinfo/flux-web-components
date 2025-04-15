import { registerWebComponents } from '@domg-wc/common-utilities';
import { html } from 'lit';
import { VlTextComponent } from './vl-text.component';

registerWebComponents([VlTextComponent]);

describe('component - vl-text', () => {
    it('should mount', () => {
        cy.mount(html` <vl-text></vl-text>`);
        cy.get('vl-text').shadow().find('span');
    });

    it('should be accessible', () => {
        cy.mount(html` <vl-text>tekst</vl-text>`);
        cy.injectAxe();
        cy.checkA11y('vl-text');
    });

    it('should set bold', () => {
        cy.mount(html` <vl-text bold>tekst - bold</vl-text>`);
        cy.get('vl-text').should('have.attr', 'bold');
        cy.get('vl-text').shadow().find('span').should('have.class', 'vl-text--bold');
    });

    it('should set italic', () => {
        cy.mount(html` <vl-text italic>tekst - italic</vl-text>`);
        cy.get('vl-text').should('have.attr', 'italic');
        cy.get('vl-text').shadow().find('span').should('have.class', 'vl-text--italic');
    });

    it('should set underline', () => {
        cy.mount(html` <vl-text underline>tekst - underline</vl-text>`);
        cy.get('vl-text').should('have.attr', 'underline');
        cy.get('vl-text').shadow().find('span').should('have.class', 'vl-text--underline');
    });

    it('should set success', () => {
        cy.mount(html` <vl-text success>tekst - success</vl-text>`);
        cy.get('vl-text').should('have.attr', 'success');
        cy.get('vl-text').shadow().find('span').should('have.class', 'vl-text--success');
    });

    it('should set warning', () => {
        cy.mount(html` <vl-text warning>tekst - warning</vl-text>`);
        cy.get('vl-text').should('have.attr', 'warning');
        cy.get('vl-text').shadow().find('span').should('have.class', 'vl-text--warning');
    });

    it('should set error', () => {
        cy.mount(html` <vl-text error>tekst - error</vl-text>`);
        cy.get('vl-text').should('have.attr', 'error');
        cy.get('vl-text').shadow().find('span').should('have.class', 'vl-text--error');
    });

    it('should set annotation', () => {
        cy.mount(html` <vl-text annotation>tekst - annotation</vl-text>`);
        cy.get('vl-text').should('have.attr', 'annotation');
        cy.get('vl-text').shadow().find('span').should('have.class', 'vl-text--annotation');
    });

    it('should set small', () => {
        cy.mount(html` <vl-text small>tekst - small</vl-text>`);
        cy.get('vl-text').should('have.attr', 'small');
        cy.get('vl-text').shadow().find('span').should('have.class', 'vl-text--small');
    });
});
