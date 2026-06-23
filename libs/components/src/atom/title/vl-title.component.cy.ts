import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlTitleComponent } from './vl-title.component';

registerWebComponents([VlTitleComponent]);

describe('cypress-component - atom components - vl-title', () => {
    it('should mount', () => {
        cy.mount(html` <vl-title></vl-title>`);

        cy.get('vl-title').shadow().find('h1');
    });

    it('should be accessible', () => {
        cy.mount(html` <vl-title>Vlaanderen</vl-title>`);
        cy.injectAxe();

        cy.checkA11y('vl-title');
    });

    it('should set different title type', () => {
        cy.mount(html` <vl-title type="h2"></vl-title>`);

        cy.get('vl-title').should('have.attr', 'type', 'h2');
        cy.get('vl-title').shadow().find('h2');
    });

    it('should set underline', () => {
        cy.mount(html` <vl-title underline></vl-title>`);

        cy.get('vl-title').should('have.attr', 'underline');
        cy.get('vl-title').shadow().find('h1').should('have.class', 'underline');
        cy.get('vl-title')
            .shadow()
            .find('h1')
            .shouldHaveComputedStyle({ style: 'border-bottom', value: '1px solid rgb(203, 210, 218)' });
    });

    it('should set alt', () => {
        cy.mount(html` <vl-title alt></vl-title>`);

        cy.get('vl-title').should('have.attr', 'alt');
        cy.get('vl-title').shadow().find('h1').should('have.class', 'alt');
    });

    it('should set no space bottom', () => {
        cy.mount(html` <vl-title no-space-bottom></vl-title>`);

        cy.get('vl-title').should('have.attr', 'no-space-bottom');
        cy.get('vl-title').shadow().find('h1').should('have.class', 'no-space-bottom');
    });

    it('should set content', () => {
        cy.mount(html` <vl-title>Vlaanderen</vl-title>`);

        cy.get('vl-title').shadow().find('h1').find('slot');
        cy.get('vl-title').contains('Vlaanderen');
    });

    it('should set appearance', () => {
        cy.mount(html` <vl-title type="h2" appearance="h3">Vlaanderen</vl-title>`);

        cy.get('vl-title').should('have.attr', 'appearance', 'h3');
        cy.get('vl-title').shadow().find('h2').should('have.class', 'h3');
    });
});
