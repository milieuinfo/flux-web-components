const footerUrl = 'http://localhost:8080/iframe.html?id=components-compliance-footer--footer-default&viewMode=story';

describe('story vl-footer - default', () => {
    it('should render', () => {
        cy.visit(footerUrl);

        cy.get('vl-footer');
        cy.get('#footer__container')
            .find('footer')
            .find('h2')
            .contains('Vlaanderen.be is de officiële website van de Vlaamse overheid');
    });
});
