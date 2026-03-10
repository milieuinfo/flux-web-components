const paginaLayoutDefaultUrl = 'http://localhost:8080/iframe.html?id=patronen-pagina-opbouw--pagina-opbouw-standaard&viewMode=story';

describe('cypress-e2e - patronen - pagina-opbouw - standaard layout story', () => {
    it('should render', () => {
        cy.visit(paginaLayoutDefaultUrl);

        cy.intercept({ url: /.*dev-vlaanderen\.be.*/, middleware: true }, (req) => req.destroy());
        cy.get('vl-page-layout-example').shadow().find('.vl-content-block').should('not.have.class', 'vl-content-block--full-width');
    });
});
