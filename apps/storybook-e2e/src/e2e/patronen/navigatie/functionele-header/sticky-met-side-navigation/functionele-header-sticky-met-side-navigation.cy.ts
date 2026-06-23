const demoWithStickyAndSideNavigation =
    'http://localhost:8080/iframe.html?id=patronen-navigatie-functionele-header-sticky-met-side-navigation--functionele-header-sticky-met-side-navigation&viewMode=story';

describe('cypress-e2e - patronen - navigatie - functionele header - met sticky en side navigation', () => {
    it('should render', () => {
        cy.visit(demoWithStickyAndSideNavigation);

        cy.get('vl-functional-header[sticky]').shadow();
    });
});
