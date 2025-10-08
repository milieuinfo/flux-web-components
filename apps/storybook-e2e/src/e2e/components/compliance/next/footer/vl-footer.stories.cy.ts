const footerNextDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-compliance-footer-next--footer-default&viewMode=story';

describe('cypress-e2e - compliance components - vl-footer-next - default story', () => {
    it('should render', () => {
        cy.visit(footerNextDefaultUrl);

        cy.get('vl-footer-next');
        cy.get('#footer__container')
            .find('div')
            .shadow()
            .contains('Vlaanderen.be is de officiële website van de Vlaamse overheid');
    });
});
