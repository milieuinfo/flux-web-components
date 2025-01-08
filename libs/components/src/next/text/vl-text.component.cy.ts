import { registerWebComponents } from '@domg-wc/common-utilities';
import { html } from 'lit';
import { VlTextComponent } from './vl-text.component';

registerWebComponents([VlTextComponent]);

describe('component - vl-text-next', () => {
    it('should mount', () => {
        cy.mount(html` <vl-text-next></vl-text-next>`);
        cy.get('vl-text-next').shadow().find('span');
    });

    it('should be accessible', () => {
        cy.mount(html` <vl-text-next>tekst</vl-text-next>`);
        cy.injectAxe();
        cy.checkA11y('vl-text-next');
    });

    it('should set bold', () => {
        cy.mount(html` <vl-text-next bold>tekst - bold</vl-text-next>`);
        cy.get('vl-text-next').should('have.attr', 'bold');
        cy.get('vl-text-next').shadow().find('span').should('have.class', 'vl-text-next--bold');
    });

    it('should set italic', () => {
        cy.mount(html` <vl-text-next italic>tekst - italic</vl-text-next>`);
        cy.get('vl-text-next').should('have.attr', 'italic');
        cy.get('vl-text-next').shadow().find('span').should('have.class', 'vl-text-next--italic');
    });

    it('should set underline', () => {
        cy.mount(html` <vl-text-next underline>tekst - underline</vl-text-next>`);
        cy.get('vl-text-next').should('have.attr', 'underline');
        cy.get('vl-text-next').shadow().find('span').should('have.class', 'vl-text-next--underline');
    });

    it('should set success', () => {
        cy.mount(html` <vl-text-next success>tekst - success</vl-text-next>`);
        cy.get('vl-text-next').should('have.attr', 'success');
        cy.get('vl-text-next').shadow().find('span').should('have.class', 'vl-text-next--success');
    });

    it('should set warning', () => {
        cy.mount(html` <vl-text-next warning>tekst - warning</vl-text-next>`);
        cy.get('vl-text-next').should('have.attr', 'warning');
        cy.get('vl-text-next').shadow().find('span').should('have.class', 'vl-text-next--warning');
    });

    it('should set error', () => {
        cy.mount(html` <vl-text-next error>tekst - error</vl-text-next>`);
        cy.get('vl-text-next').should('have.attr', 'error');
        cy.get('vl-text-next').shadow().find('span').should('have.class', 'vl-text-next--error');
    });

    it('should set annotation', () => {
        cy.mount(html` <vl-text-next annotation>tekst - annotation</vl-text-next>`);
        cy.get('vl-text-next').should('have.attr', 'annotation');
        cy.get('vl-text-next').shadow().find('span').should('have.class', 'vl-text-next--annotation');
    });

    it('should set small', () => {
        cy.mount(html` <vl-text-next small>tekst - small</vl-text-next>`);
        cy.get('vl-text-next').should('have.attr', 'small');
        cy.get('vl-text-next').shadow().find('span').should('have.class', 'vl-text-next--small');
    });
});
