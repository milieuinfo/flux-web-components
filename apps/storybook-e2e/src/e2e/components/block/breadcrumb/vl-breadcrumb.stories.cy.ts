const breadcrumbUrl =
    'http://localhost:8080/iframe.html?id=components-block-breadcrumb--breadcrumb-default&viewMode=story';
const breadcrumbButtonsUrl =
    'http://localhost:8080/iframe.html?id=components-block-breadcrumb--breadcrumb-buttons&viewMode=story';
const breadcrumbItemUrl =
    'http://localhost:8080/iframe.html?id=components-block-breadcrumb-breadcrumb-item--breadcrumb-default&viewMode=story';
const breadcrumbItemButtonUrl =
    'http://localhost:8080/iframe.html?id=components-block-breadcrumb-breadcrumb-item--breadcrumb-button&viewMode=story';
const breadcrumbItemTextUrl =
    'http://localhost:8080/iframe.html?id=components-block-breadcrumb-breadcrumb-item--breadcrumb-text&viewMode=story';

describe('cypress-e2e - block components - vl-breadcrumb - default story', () => {
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
});

describe('cypress-e2e - block components - vl-breadcrumb - buttons story', () => {
    it('should render', () => {
        cy.visit(breadcrumbButtonsUrl);

        cy.get('vl-breadcrumb').should('exist');
    });

    it('should contain 3 breadcrumb items with buttons', () => {
        cy.visit(breadcrumbButtonsUrl);

        cy.get('vl-breadcrumb')
            .find('vl-breadcrumb-item')
            .should('have.length', 3)
            .each((item) => {
                cy.wrap(item).shadow().find('button.vl-breadcrumb__list__item__cta').should('exist');
            });
    });
});

describe('cypress-e2e - block components - vl-breadcrumb-item - default story', () => {
    it('should render link breadcrumb item', () => {
        cy.visit(breadcrumbItemUrl);

        cy.get('vl-breadcrumb-item')
            .shadow()
            .find('a.vl-breadcrumb__list__item__cta')
            .should('exist')
            .and('have.attr', 'href', '#');
    });
});

describe('cypress-e2e - block components - vl-breadcrumb-item - button story', () => {
    it('should render button breadcrumb item', () => {
        cy.visit(breadcrumbItemButtonUrl);

        cy.get('vl-breadcrumb-item').shadow().find('button.vl-breadcrumb__list__item__cta').should('exist');
    });
});

describe('cypress-e2e - block components - vl-breadcrumb-item - text story', () => {
    it('should render text breadcrumb item', () => {
        cy.visit(breadcrumbItemTextUrl);

        cy.get('vl-breadcrumb-item').shadow().find('span.vl-breadcrumb__list__item__cta').should('exist');
    });
});
