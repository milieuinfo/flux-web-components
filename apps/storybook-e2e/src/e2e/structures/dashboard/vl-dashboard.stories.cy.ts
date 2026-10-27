const dashboardUrl = (story: string) =>
    `http://localhost:8080/iframe.html?args=&id=structures-dashboard--dashboard-${story}&viewMode=story`;

['default', 'without-user-and-title', 'collapsed', 'not-collapsible'].forEach((story) => {
    describe(`cypress-e2e - structures - vl-dashboard - ${story} story`, () => {
        it('should render', () => {
            cy.visit(dashboardUrl(story));
            cy.get('vl-dashboard').shadow().find('main.vl-dashboard__content');
            cy.getDataCy('dashboard-content').should('be.visible');
        });
    });
});
