const tabsNextDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-block-next-tabs--tabs-default&viewMode=story';
const tabsNextHorizontalNavigationUrl =
    'http://localhost:8080/iframe.html?id=components-block-next-tabs--tabs-horizontal-navigation&viewMode=story';

describe('cypress-e2e - block components - vl-tabs-next - default story', () => {
    it('should render the default story', () => {
        cy.visit(tabsNextDefaultUrl);
        cy.get('vl-tabs-next').shadow();
        cy.get('vl-tabs-next').shadow().find('nav[role="tablist"]').should('exist');
    });

    it('should be accessible in the default story', () => {
        cy.visit(tabsNextDefaultUrl);
        cy.get('vl-tabs-next').should('exist');
        cy.injectAxe();
        cy.checkA11y('vl-tabs-next');
    });
});

describe('cypress-e2e - block components - vl-tabs-next - horizontal navigation story', () => {
    it('should render the horizontal navigation story', () => {
        cy.visit(tabsNextHorizontalNavigationUrl);
        cy.get('vl-tabs-next').should('exist');
        cy.get('vl-tab-link-next').should('exist');
    });
});