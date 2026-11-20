const dataDownloadUrl = (story: string) =>
    `http://localhost:8080/iframe.html?args=&id=data-visualisation-data-download--data-download-${story}&viewMode=story`;

['default', 'csv'].forEach((story) => {
    describe(`cypress-e2e - widgets - vl-data-download - ${story} story`, () => {
        it('should render', () => {
            cy.visit(dataDownloadUrl(story));
            cy.get('vl-data-download').shadow().find('vl-button').should('exist');
        });
    });
});

describe('cypress-e2e - widgets - vl-data-download - show-label story', () => {
    it('should render', () => {
        cy.visit(dataDownloadUrl('show-label'));
        cy.get('vl-data-download').shadow().find('vl-link').should('exist');
    });
});
