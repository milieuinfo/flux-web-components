const headerDefaultUrl = 'http://localhost:8080/iframe.html?id=components-compliance-header--header-default&viewMode=story';

describe('cypress-e2e - compliance components - vl-header - default story', () => {
    it('should render', () => {
        cy.visit(headerDefaultUrl);

        cy.get('vl-header');
        cy.get('#header__container')
            .find('header')
            .find('.vlw__primary-bar__brand__host')
            .contains('Departement Omgeving (test)');
    });
});
