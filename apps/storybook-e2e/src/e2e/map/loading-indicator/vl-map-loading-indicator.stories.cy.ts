const loadingIndicatorUrl =
    'http://localhost:8080/iframe.html?args=&id=map-loading-indicator--map-loading-indicator-default&viewMode=story';

describe('cypress-e2e - map - vl-map-loading-indicator - default story', () => {
    it('should be loading when clicking on short wait button', () => {
        cy.visit(loadingIndicatorUrl);
        cy.getDataCy('short-wait').click();
        cy.get('vl-map-loading-indicator').should('have.class', 'loading');
        cy.wait(3000);
        cy.get('vl-map-loading-indicator').should('not.have.class', 'loading');
    });
});
