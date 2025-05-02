const breadcrumbUrl = 'http://localhost:8080/iframe.html?id=components-block-breadcrumb--breadcrumb-default&viewMode=story';

describe('story vl-breadcrumb', () => {
    it('should contain a nav section', () => {
        cy.visit(breadcrumbUrl);

        cy.get('vl-breadcrumb')
            .shadow()
            .find('nav')
            .should('have.class', 'vl-breadcrumb')
            .should('have.attr', 'aria-label', 'U bent hier: ');
    });

    it('should contain 4 breadcrumb items', () => {
        cy.visit(breadcrumbUrl);

        cy.get('vl-breadcrumb')
            .shadow()
            .find('.vl-breadcrumb__list')
            .children('.vl-breadcrumb__list__item')
            .should('have.length', 4);
    });

    it('should contain correct breadcrumb items', () => {
        cy.visit(breadcrumbUrl);

        cy.get('vl-breadcrumb')
            .find('vl-breadcrumb-item')
            .first()
            .contains('Vlaanderen Intern')
            .next()
            .contains('Regelgeving')
            .next()
            .contains('Webuniversum')
            .next()
            .contains('Componenten');
    });

    it('should set correct links for breadcrumb items', () => {
        cy.visit(`${breadcrumbUrl}&args=href:1`);

        cy.get('vl-breadcrumb').find('vl-breadcrumb-item').eq(0).shadow().find('a').should('have.attr', 'href', '1');
        cy.get('vl-breadcrumb').find('vl-breadcrumb-item').eq(1).shadow().find('a').should('have.attr', 'href', '1');
        cy.get('vl-breadcrumb').find('vl-breadcrumb-item').eq(2).shadow().find('a').should('have.attr', 'href', '1');
        cy.get('vl-breadcrumb').find('vl-breadcrumb-item').eq(3).shadow().find('a').should('have.attr', 'href', '1');
    });
});
