const demoWithButtonUrl =
    'http://localhost:8080/iframe.html?id=patronen-navigatie-functionele-header-met-button--functionele-header-met-button&viewMode=story';

describe('cypress-e2e - patronen - navigatie - functionele header - met button story', () => {
    it('should render', () => {
        cy.visit(demoWithButtonUrl);

        cy.get('vl-functional-header').shadow();
    });
});
