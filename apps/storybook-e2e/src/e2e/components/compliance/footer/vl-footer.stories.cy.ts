const footerDefaultUrl = 'http://localhost:8080/iframe.html?id=components-compliance-footer--footer-default&viewMode=story';

describe('cypress-e2e - compliance components - vl-footer - default story', () => {
    it('should render', () => {
        cy.visit(footerDefaultUrl);

        cy.get('vl-footer');
        cy.get('#footer__container')
            .find('footer')
            .find('h2')
            .contains('Vlaanderen.be is de officiële website van de Vlaamse overheid');
    });
});
