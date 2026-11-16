import { registerWebComponents } from '@domg-wc/common';
import { watchStyleAttributeCspViolations } from '@resources/utils-test';
import { html } from 'lit';
import { VlFooter } from './vl-footer.component';

registerWebComponents([VlFooter]);

describe('cypress-component - compliance components - vl-footer-next - strict CSP', () => {
    beforeEach(() => {
        cy.intercept('GET', /widgets.*vlaanderen\.be.*entry/, { statusCode: 200, body: '' }).as('widgetScript');
    });

    it('should reserve space for the footer bar without CSP violations', () => {
        const cspWatcher = watchStyleAttributeCspViolations();
        cy.mount(html`<vl-footer-next development identifier="TEST_IDENTIFIER"></vl-footer-next>`);
        cy.wait('@widgetScript');

        cy.get('#footer__container').should('have.css', 'min-height', '48px');

        cy.then(() => cspWatcher.stop()).should('deep.equal', []);
    });
});
