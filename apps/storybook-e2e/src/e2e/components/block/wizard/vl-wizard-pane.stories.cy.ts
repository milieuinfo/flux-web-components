const wizardPaneDefaultUrl = 'http://localhost:8080/iframe.html?id=components-block-wizard-wizard-pane--wizard-pane-default';

describe('cypress-e2e - block components - vl-wizard-pane - default story', () => {
    it('should display story', () => {
        cy.visit(wizardPaneDefaultUrl);
        cy.get('vl-wizard-pane').shadow();
        cy.get('vl-wizard-pane').should('have.text', 'Pane content');
    });
});
