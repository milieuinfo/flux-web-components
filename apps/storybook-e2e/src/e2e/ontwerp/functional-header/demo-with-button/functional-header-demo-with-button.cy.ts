const demoWithButtonUrl =
    'http://localhost:8080/iframe.html?id=ontwerp-functional-header-voorbeeld-met-button--functional-header-with-button&viewMode=story';

describe('cypress-e2e - ontwerp - functional header - met button story', () => {
    it('should render', () => {
        cy.visit(demoWithButtonUrl);

        cy.get('vl-functional-header').shadow();
    });
});
