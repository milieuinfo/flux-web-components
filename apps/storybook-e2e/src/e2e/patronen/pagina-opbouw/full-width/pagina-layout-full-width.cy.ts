const paginaLayoutFullWidthUrl = 'http://localhost:8080/iframe.html?id=patronen-pagina-opbouw--pagina-opbouw-volledige-breedte&viewMode=story';

describe('cypress-e2e - patronen - pagina-opbouw - volledige breedte story', () => {
    it('should render', () => {
        cy.visit(paginaLayoutFullWidthUrl);

        cy.intercept({ url: /.*dev-vlaanderen\.be.*/, middleware: true }, (req) => req.destroy());
        cy.get('vl-page-layout-example').shadow().find('.vl-content-block').should('have.class', 'vl-content-block--full-width');
    });
});
