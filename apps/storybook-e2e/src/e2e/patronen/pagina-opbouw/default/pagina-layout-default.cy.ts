const paginaLayoutDefaultUrl = 'http://localhost:8080/iframe.html?id=patronen-pagina-opbouw--pagina-opbouw-standaard&viewMode=story';

describe('cypress-e2e - patronen - pagina-opbouw - standaard layout story', () => {
    it('should render', () => {
        cy.intercept({ url: /.*dev-vlaanderen\.be.*/, middleware: true }, (req) => req.destroy());
        cy.visit(paginaLayoutDefaultUrl);

        cy.get('vl-functional-header').should('not.have.attr', 'full-width');
        cy.get('.vl-content-block').should('have.length', 2).and('not.have.class', 'vl-content-block--full-width');
        cy.get('vl-side-navigation-layout-next').should('not.exist');
    });
});
