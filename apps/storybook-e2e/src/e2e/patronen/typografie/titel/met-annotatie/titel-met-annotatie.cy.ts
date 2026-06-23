const titelMetAnnotatieUrl =
    'http://localhost:8080/iframe.html?id=patronen-typografie-titel-met-annotatie--titel-met-annotatie&viewMode=story';

describe('cypress-e2e - patronen - typografie - titel met annotatie story', () => {
    it('should render', () => {
        cy.visit(titelMetAnnotatieUrl);

        cy.get('vl-title');
        cy.get('vl-text');
    });
});
