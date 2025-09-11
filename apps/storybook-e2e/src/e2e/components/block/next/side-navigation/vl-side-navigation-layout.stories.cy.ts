const sideNavigationLayoutDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-block-next-side-navigation-layout--side-navigation-layout-default&viewMode=story';
const sideNavigationLayoutCustomTocUrl =
    'http://localhost:8080/iframe.html?id=components-block-next-side-navigation-layout--side-navigation-layout-with-custom-toc&viewMode=story';
const sideNavigationLayoutWithStepsUrl =
    'http://localhost:8080/iframe.html?id=components-block-next-side-navigation-layout--side-navigation-layout-with-steps&viewMode=story';

describe('cypress-e2e - block components - vl-side-navigation-layout - default story', () => {
    it('should render', () => {
        cy.visit(sideNavigationLayoutDefaultUrl);

        cy.get('vl-side-navigation-layout').shadow().find('navigation-part');
        cy.get('vl-side-navigation-layout').shadow().find('content-part');
        cy.get('vl-side-navigation-layout').find('vl-side-navigation-next').shadow().find('nav');
        cy.get('#default-content-1').should('contain', 'Content 1');
        cy.get('#default-content-2').should('contain', 'Content 2');
        cy.get('#default-content-3').should('contain', 'Content 3');
    });
});

describe('cypress-e2e - block components - vl-side-navigation-layout - custom toc story', () => {
    it('should render', () => {
        cy.visit(sideNavigationLayoutCustomTocUrl);

        cy.get('vl-side-navigation-layout').shadow().find('navigation-part');
        cy.get('vl-side-navigation-layout').shadow().find('content-part');
        cy.get('vl-side-navigation-next').find('vl-link').should('have.length.greaterThan', 0);
        cy.get('#custom-intro').should('contain', 'Over deze pagina');
        cy.get('#custom-aanvraag').should('contain', 'Hoe indienen');
        cy.get('#custom-termijnen').should('contain', 'Verwachtingsdatum');
    });

    it('should have toggle buttons for nested items', () => {
        cy.visit(sideNavigationLayoutCustomTocUrl);

        cy.get('vl-side-navigation-next').find('vl-button.toggle-button').should('have.length', 2);
    });

    it('should toggle nested items when clicking toggle button', () => {
        cy.visit(sideNavigationLayoutCustomTocUrl);

        // Initially all nested ul elements should be hidden (initialized by the component)
        cy.get('vl-side-navigation-next').find('ul > li > ul').should('have.attr', 'hidden');

        // Click the first toggle button to expand
        cy.get('vl-side-navigation-next').find('vl-button.toggle-button').first().click();

        // The first nested ul should now be visible
        cy.get('vl-side-navigation-next').find('ul > li').first().find('> ul').should('not.have.attr', 'hidden');
    });
});

describe('cypress-e2e - block components - vl-side-navigation-layout - with steps story', () => {
    it('should render', () => {
        cy.visit(sideNavigationLayoutWithStepsUrl);

        cy.get('vl-side-navigation-layout').shadow().find('navigation-part');
        cy.get('vl-side-navigation-layout').shadow().find('content-part');
        cy.get('vl-side-navigation-layout').find('vl-side-navigation-next').shadow().find('nav');
        cy.get('vl-steps').should('exist');
        cy.get('#vl-steps-vl-step-1').should('contain', 'Stap 1: eerste actie');
        cy.get('#vl-steps-vl-step-2').should('contain', 'Stap 2: tweede actie');
        cy.get('#vl-steps-vl-step-3').should('contain', 'Stap 3: derde actie');
    });
});
