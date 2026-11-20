const dataPeriodDefaultUrl =
    'http://localhost:8080/iframe.html?args=&id=data-visualisation-data-period--data-period-default&viewMode=story';

describe('cypress-e2e - widgets - vl-data-period - default story', () => {
    it('should render', () => {
        cy.visit(dataPeriodDefaultUrl);
        cy.get('vl-data-period').shadow().find('fieldset.durations').should('exist');
        cy.get('vl-chart-line').shadow().find('.plot svg.main-svg').should('exist');
    });
});
