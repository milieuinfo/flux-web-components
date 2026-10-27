const navSubUrl = (story: string) =>
    `http://localhost:8080/iframe.html?args=&id=structures-dashboard-nav-sub--nav-sub-${story}&viewMode=story`;

['default', 'with-href', 'collapsed'].forEach((story) => {
    describe(`cypress-e2e - structures - vl-nav-sub - ${story} story`, () => {
        it('should render', () => {
            cy.visit(navSubUrl(story));
            cy.get('vl-nav-sub').shadow().find('.vl-nav-sub');
        });
    });
});
