const popoverMenuUrl = 'http://localhost:8080/iframe.html?id=ontwerp-popover-menu--menu&viewMode=story';

describe('cypress-e2e - ontwerp - popover menu - default story', () => {
    it('should render', () => {
        cy.visit(popoverMenuUrl);

        cy.get('vl-popover-menu').find('vl-popover').shadow();
    });
});
