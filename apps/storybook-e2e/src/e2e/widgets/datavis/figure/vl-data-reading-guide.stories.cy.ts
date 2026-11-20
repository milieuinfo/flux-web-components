const dataReadingGuideDefaultUrl =
    'http://localhost:8080/iframe.html?args=&id=data-visualisation-data-reading-guide--data-reading-guide-default&viewMode=story';

describe('cypress-e2e - widgets - vl-data-reading-guide - default story', () => {
    it('should render', () => {
        cy.visit(dataReadingGuideDefaultUrl);
        cy.get('vl-data-reading-guide').shadow().find('vl-accordion').should('exist');
    });
});
