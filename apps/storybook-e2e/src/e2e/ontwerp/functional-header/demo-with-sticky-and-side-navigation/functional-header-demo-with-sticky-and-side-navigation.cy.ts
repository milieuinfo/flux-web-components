const demoWithStickyAndSideNavigation =
    'http://localhost:8080/iframe.html?id=ontwerp-functional-header-voorbeeld-met-sticky-en-side-navigation--functional-header-sticky-with-side-navigation&viewMode=story';

describe('story - functional header met sticky en side navigation', () => {
    it('should render', () => {
        cy.visit(demoWithStickyAndSideNavigation);

        cy.get('vl-functional-header[sticky]').shadow();
    });
});
