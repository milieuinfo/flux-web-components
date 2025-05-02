const wizardPaneUrl = 'http://localhost:8080/iframe.html?id=components-block-wizard-wizard-pane--wizard-pane-default';

describe('story vl-wizard-pane - default', () => {
    it('should display story', () => {
        cy.visit(wizardPaneUrl);
        cy.get('vl-wizard-pane').shadow();
        cy.get('vl-wizard-pane').should('have.text', 'Pane content');
    });
});
