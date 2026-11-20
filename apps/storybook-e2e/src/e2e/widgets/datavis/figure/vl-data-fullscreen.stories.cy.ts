const dataFullscreenDefaultUrl =
    'http://localhost:8080/iframe.html?args=&id=data-visualisation-data-fullscreen--data-fullscreen-default&viewMode=story';

describe('cypress-e2e - widgets - vl-data-fullscreen - default story', () => {
    it('should render', () => {
        cy.visit(dataFullscreenDefaultUrl);
        cy.get('vl-data-fullscreen').shadow().find('vl-button').should('exist');
    });
});
