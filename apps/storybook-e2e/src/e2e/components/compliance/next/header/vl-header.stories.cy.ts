const headerNextDefaultUrl = 'http://localhost:8080/iframe.html?id=components-compliance-header-next--header-default&viewMode=story';

describe('cypress-e2e - compliance components - vl-header-next - default story', () => {
    it('should render', () => {
        cy.visit(headerNextDefaultUrl);

        cy.get('vl-header-next');
        cy.get('#header__container')
            .find('div')
            .shadow()
            .find('.host')
            .contains('Departement Omgeving (test)');
    });
});
