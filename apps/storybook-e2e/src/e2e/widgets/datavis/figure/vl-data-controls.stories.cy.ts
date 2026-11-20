const dataControlsDefaultUrl =
    'http://localhost:8080/iframe.html?args=&id=data-visualisation-data-controls--data-controls-default&viewMode=story';

describe('cypress-e2e - widgets - vl-data-controls - default story', () => {
    it('should render', () => {
        cy.visit(dataControlsDefaultUrl);
        cy.get('vl-data-controls').should('exist');
        cy.get('vl-chart-line').shadow().find('.plot svg.main-svg').should('exist');
    });
});
