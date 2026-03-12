const storyUrl =
    'http://localhost:8080/iframe.html?id=patronen-navigatie-side-navigation-met-proza-message--layout-met-proza-message&viewMode=story';

describe('cypress-e2e - patronen - navigatie - side navigation - met proza message story', () => {
    it('should render', () => {
        cy.visit(storyUrl);

        cy.get('vl-side-navigation-layout-next').shadow().find('navigation-part');
        cy.get('vl-side-navigation-layout-next').shadow().find('content-part');
        cy.get('vl-side-navigation-layout-next').find('vl-side-navigation-next').shadow().find('nav');
        cy.get('vl-title[type="h1"]').should('contain', 'Side Navigation - met Proza Message');
    });
});
