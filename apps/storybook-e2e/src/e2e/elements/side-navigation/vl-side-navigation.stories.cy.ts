const sideNavigationUrl =
    'http://localhost:8080/iframe.html?id=elements-side-navigation--side-navigation-default&viewMode=story';
const sideNavigationMobileUrl =
    'http://localhost:8080/iframe.html?id=elements-side-navigation--side-navigation-mobile&viewMode=story';

describe('story vl-side-navigation default', () => {
    it('should display story', () => {
        cy.visit(sideNavigationUrl);

        cy.get('nav[is="vl-side-navigation"]');
        cy.get('div[is="vl-side-navigation-reference"]');
    });
});

describe('story vl-side-navigation mobile', () => {
    it('should display story', () => {
        cy.viewport(500, 800);
        cy.visit(sideNavigationMobileUrl);

        cy.get('nav[is="vl-side-navigation"]');
        cy.get('div[is="vl-side-navigation-reference"]');
    });
});
