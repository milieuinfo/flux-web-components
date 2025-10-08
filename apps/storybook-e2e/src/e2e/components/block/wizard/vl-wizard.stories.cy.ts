const wizardDefaultUrl = 'http://localhost:8080/iframe.html?id=components-block-wizard-wizard--wizard-default';

describe('cypress-e2e - block components - vl-wizard - default story', () => {
    it('should display story', () => {
        cy.visit(wizardDefaultUrl);
        cy.get('vl-wizard').shadow();
    });
});
