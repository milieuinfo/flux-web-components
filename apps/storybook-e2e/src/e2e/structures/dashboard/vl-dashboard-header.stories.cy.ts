const dashboardHeaderUrl = (story: string) =>
    `http://localhost:8080/iframe.html?args=&id=structures-dashboard-dashboard-header--dashboard-header-${story}&viewMode=story`;

['default', 'without-actions'].forEach((story) => {
    describe(`cypress-e2e - structures - vl-dashboard-header - ${story} story`, () => {
        it('should render', () => {
            cy.visit(dashboardHeaderUrl(story));
            cy.get('vl-dashboard-header').shadow().find('.vl-dashboard-header');
        });
    });
});
