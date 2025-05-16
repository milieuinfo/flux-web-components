const url = 'http://localhost:8080/iframe.html?id=ontwerp-pagina-layout-voorbeeld--standaard-layout&viewMode=story';

describe('story - pagina layout - standaard layout', () => {
    it('should render', () => {
        cy.visit(url);

        cy.intercept({ url: /.*dev-vlaanderen\.be.*/, middleware: true }, (req) => req.destroy());

        cy.get('vl-page-layout-example').shadow().find('.vl-content-block').should('not.have.class', 'vl-content-block--full-width');
    });
});
