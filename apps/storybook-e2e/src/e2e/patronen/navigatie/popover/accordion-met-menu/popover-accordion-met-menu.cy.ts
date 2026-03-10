const popoverMenuAccordionDefaultUrl =
    'http://localhost:8080/iframe.html?id=patronen-navigatie-popover-accordion-met-menu--popover-accordion-met-menu&viewMode=story';

describe('cypress-e2e - patronen - navigatie - popover menu accordion - default story', () => {
    it('should render', () => {
        cy.visit(popoverMenuAccordionDefaultUrl);

        cy.get('vl-popover-menu-accordion').find('vl-accordion').shadow();
    });
});
