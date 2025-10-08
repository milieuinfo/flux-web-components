const sideNavigationUrl =
    'http://localhost:8080/iframe.html?id=components-block-side-navigation--side-navigation-default&viewMode=story';
const sideNavigationMobileUrl =
    'http://localhost:8080/iframe.html?id=components-block-side-navigation--side-navigation-mobile&viewMode=story';

describe('cypress-e2e - block components - vl-side-navigation - default story', () => {
    it('should display story', () => {
        cy.visit(sideNavigationUrl);
        cy.get('vl-side-navigation');
        cy.get('vl-side-navigation-reference');
    });
});

describe('cypress-e2e - block components - vl-side-navigation - mobile story', () => {
    it('should display story', () => {
        cy.viewport(500, 800);
        cy.visit(sideNavigationMobileUrl);
        cy.get('vl-side-navigation');
        cy.get('vl-side-navigation-reference');
    });
});
