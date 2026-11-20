const dataSourceUrl = (story: string) =>
    `http://localhost:8080/iframe.html?args=&id=data-visualisation-data-source--data-source-${story}&viewMode=story`;

['default', 'sample-data'].forEach((story) => {
    describe(`cypress-e2e - widgets - vl-data-source - ${story} story`, () => {
        it('should render', () => {
            cy.visit(dataSourceUrl(story));
            cy.get('vl-chart-line').shadow().find('.plot svg.main-svg').should('exist');
        });
    });
});
