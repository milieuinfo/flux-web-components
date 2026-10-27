const badgeUrl = (story: string) =>
    `http://localhost:8080/iframe.html?args=&id=components-block-badge--badge-${story}&viewMode=story`;

['default', 'primary', 'action', 'image'].forEach((story) => {
    describe(`cypress-e2e - block components - vl-badge - ${story} story`, () => {
        it('should render', () => {
            cy.visit(badgeUrl(story));
            cy.get('vl-badge').shadow();
        });
    });
});
