const demoWithSearchUrl =
    'http://localhost:8080/iframe.html?id=ontwerp-functional-header-voorbeeld-met-search--functional-header-with-search&viewMode=story';

describe('story - functional header met search voorbeeld', () => {
    it('should render', () => {
        cy.visit(demoWithSearchUrl);

        cy.get('vl-functional-header').shadow();
    });
});
