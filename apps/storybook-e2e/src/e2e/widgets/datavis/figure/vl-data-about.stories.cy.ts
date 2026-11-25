const dataAboutUrl = (story: string) =>
    `http://localhost:8080/iframe.html?args=&id=data-visualisation-data-about--data-about-${story}&viewMode=story`;

['default', 'catalogue'].forEach((story) => {
    describe(`cypress-e2e - widgets - vl-data-about - ${story} story`, () => {
        it('should render', () => {
            cy.visit(dataAboutUrl(story));
            cy.get('vl-data-about').shadow().find('vl-accordion').should('exist');
        });
    });
});
