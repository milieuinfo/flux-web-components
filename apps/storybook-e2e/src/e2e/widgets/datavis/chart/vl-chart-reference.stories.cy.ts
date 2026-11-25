const chartReferenceUrl = (story: string) =>
    `http://localhost:8080/iframe.html?args=&id=data-visualisation-chart-reference--chart-reference-${story}&viewMode=story`;

describe('cypress-e2e - widgets - vl-chart-reference - default story', () => {
    it('should render', () => {
        cy.visit(chartReferenceUrl('default'));
        cy.get('vl-chart-line').shadow().find('.plot svg.main-svg').should('exist');
    });
});

describe('cypress-e2e - widgets - vl-chart-reference - far-away story', () => {
    it('should render', () => {
        cy.visit(chartReferenceUrl('far-away'));
        cy.get('vl-chart-line').shadow().find('.reference-notes li').should('contain', 'EU-referentieniveau');
    });
});
