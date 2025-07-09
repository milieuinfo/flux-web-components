const headerUrl = 'http://localhost:8080/iframe.html?id=components-compliance-header-next--header-default&viewMode=story';

describe('story vl-header-next - default', () => {
    it('should render', () => {
        cy.visit(headerUrl);

        cy.get('vl-header-next');
        cy.get('#header__container')
            .find('div')
            .shadow()
            .find('.host')
            .contains('Departement Omgeving (test)');
    });
});
