const sideNavigationNextUrl =
    'http://localhost:8080/iframe.html?id=components-next-side-navigation--side-navigation-default&viewMode=story';
const sideNavigationNextMobileUrl =
    'http://localhost:8080/iframe.html?id=components-next-side-navigation--side-navigation-mobile&viewMode=story';

describe('story vl-side-navigation default', () => {
    it('should display story', () => {
        cy.visit(sideNavigationNextUrl);
        cy.get("vl-side-navigation-next");
        cy.get("vl-side-navigation-reference-next");
    });
});

describe('story vl-side-navigation mobile', () => {
    it('should display story', () => {
        cy.viewport(500, 800);
        cy.visit(sideNavigationNextMobileUrl);
        cy.get("vl-side-navigation-next");
        cy.get("vl-side-navigation-reference-next");
    });
});
