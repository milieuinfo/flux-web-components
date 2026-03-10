const demoWithSearchUrl =
    'http://localhost:8080/iframe.html?id=patronen-navigatie-functionele-header-met-search--functionele-header-met-search&viewMode=story';

describe('cypress-e2e - patronen - navigatie - functionele header - met search story', () => {
    it('should render', () => {
        cy.visit(demoWithSearchUrl);

        cy.get('vl-functional-header').shadow();
    });
});
