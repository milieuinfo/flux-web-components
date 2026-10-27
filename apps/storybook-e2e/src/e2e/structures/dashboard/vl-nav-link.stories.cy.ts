const navLinkUrl = (story: string) =>
    `http://localhost:8080/iframe.html?args=&id=structures-dashboard-nav-link--nav-link-${story}&viewMode=story`;

['default', 'active', 'with-action', 'with-badge', 'collapsed', 'collapsed-with-badge'].forEach((story) => {
    describe(`cypress-e2e - structures - vl-nav-link - ${story} story`, () => {
        it('should render', () => {
            cy.visit(navLinkUrl(story));
            cy.get('vl-nav-link').shadow().find('vl-button');
        });
    });
});
