const paginaLayoutFullWidthUrl = 'http://localhost:8080/iframe.html?id=patronen-pagina-opbouw--pagina-opbouw-volledige-breedte&viewMode=story';

describe('cypress-e2e - patronen - pagina-opbouw - volledige breedte story', () => {
    it('should render', () => {
        cy.intercept({ url: /.*dev-vlaanderen\.be.*/, middleware: true }, (req) => req.destroy());
        cy.visit(paginaLayoutFullWidthUrl);

        cy.get('vl-functional-header').should('have.attr', 'full-width');
        cy.get('.vl-content-block').should('have.length', 2).and('have.class', 'vl-content-block--full-width');
    });
});
