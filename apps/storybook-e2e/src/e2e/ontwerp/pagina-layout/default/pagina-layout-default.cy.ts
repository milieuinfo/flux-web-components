const paginaLayoutDefaultUrl = 'http://localhost:8080/iframe.html?id=ontwerp-pagina-layout-voorbeeld--standaard-layout&viewMode=story';

describe('cypress-e2e - ontwerp - pagina layout - standaard layout story', () => {
    it('should render', () => {
        cy.visit(paginaLayoutDefaultUrl);

        cy.intercept({ url: /.*dev-vlaanderen\.be.*/, middleware: true }, (req) => req.destroy());
        cy.get('vl-page-layout-example').shadow().find('.vl-content-block').should('not.have.class', 'vl-content-block--full-width');
    });
});
