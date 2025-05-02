const headerUrl = 'http://localhost:8080/iframe.html?id=components-compliance-header--header-default&viewMode=story';

describe('story vl-header - default', () => {
    it('should render', () => {
        cy.visit(headerUrl);

        cy.get('vl-header');
        cy.get('#header__container')
            .find('header')
            .find('.vlw__primary-bar__brand__host')
            .contains('Departement Omgeving (test)');
    });
});
