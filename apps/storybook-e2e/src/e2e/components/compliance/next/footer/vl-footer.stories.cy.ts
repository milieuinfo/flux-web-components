const footerUrl =
    'http://localhost:8080/iframe.html?id=components-compliance-footer-next--footer-default&viewMode=story';

describe('story vl-footer - default', () => {
    it('should render', () => {
        cy.visit(footerUrl);

        cy.get('vl-footer-next');
        cy.get('#footer__container')
            .find('div')
            .shadow()
            .contains('Vlaanderen.be is de officiële website van de Vlaamse overheid');
    });
});
