const paginaLayoutSideNavigationUrl = 'http://localhost:8080/iframe.html?id=patronen-pagina-opbouw--pagina-opbouw-met-side-navigation&viewMode=story';

describe('cypress-e2e - patronen - pagina-opbouw - met side navigation story', () => {
    it('should render', () => {
        cy.intercept({ url: /.*dev-vlaanderen\.be.*/, middleware: true }, (req) => req.destroy());
        cy.visit(paginaLayoutSideNavigationUrl);

        cy.get('.vl-content-block').find('vl-side-navigation-layout-next');
    });
});
