const url = 'http://localhost:8080/iframe.html?id=ontwerp-pagina-layout-voorbeeld--volledige-breedte&viewMode=story';

describe('story - pagina layout - volledige breedte', () => {
    it('should render', () => {
        cy.visit(url);

        cy.intercept({ url: /.*dev-vlaanderen\.be.*/, middleware: true }, (req) => req.destroy());

        cy.get('vl-page-layout-example').shadow().find('.vl-content-block-next').should('have.class', 'vl-content-block-next--full-width');
    });
});
