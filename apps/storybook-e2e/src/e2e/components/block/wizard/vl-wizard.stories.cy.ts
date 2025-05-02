const wizardUrl = 'http://localhost:8080/iframe.html?id=components-block-wizard-wizard--wizard-default';

describe('story vl-wizard - default', () => {
    it('should display story', () => {
        cy.visit(wizardUrl);
        cy.get('vl-wizard').shadow();
    });
});
