const demoWithBackAndTabsUrl =
    'http://localhost:8080/iframe.html?id=patronen-navigatie-functionele-header-met-back-en-tabs--functionele-header-met-back-en-tabs&viewMode=story';

describe('cypress-e2e - patronen - navigatie - functionele header - met back en tabs story', () => {
    it('should render', () => {
        cy.visit(demoWithBackAndTabsUrl);

        cy.get('vl-functional-header').shadow();
    });
});
