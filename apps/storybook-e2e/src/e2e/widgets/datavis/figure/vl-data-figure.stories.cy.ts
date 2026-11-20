const dataFigureDefaultUrl =
    'http://localhost:8080/iframe.html?args=&id=data-visualisation-data-figure--data-figure-default&viewMode=story';

describe('cypress-e2e - widgets - vl-data-figure - default story', () => {
    it('should render', () => {
        cy.visit(dataFigureDefaultUrl);
        cy.get('vl-data-figure').shadow().find('figure figcaption vl-title.headline').should('not.be.empty');
        cy.get('vl-data-figure').shadow().find('vl-data-download').should('exist');
        cy.get('vl-data-figure').shadow().find('vl-data-table').should('exist');
        cy.get('vl-chart-line').shadow().find('.plot svg.main-svg').should('exist');
    });
});
