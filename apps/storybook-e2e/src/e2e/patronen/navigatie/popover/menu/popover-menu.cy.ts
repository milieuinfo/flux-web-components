const popoverMenuUrl = 'http://localhost:8080/iframe.html?id=patronen-navigatie-popover-menu--popover-menu&viewMode=story';

describe('cypress-e2e - patronen - navigatie - popover menu - default story', () => {
    it('should render', () => {
        cy.visit(popoverMenuUrl);

        cy.get('vl-popover-menu').find('vl-popover').shadow();
    });
});
