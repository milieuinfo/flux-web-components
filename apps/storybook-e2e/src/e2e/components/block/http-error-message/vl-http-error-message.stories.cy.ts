const httpErrorMessageDefaultUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-http-error-message--http-error-message-default&viewMode=story';

describe('cypress-e2e - block components - vl-http-error-message - default story', () => {
    it('should render http error message', () => {
        cy.visit(`${httpErrorMessageDefaultUrl}`);
        cy.get('vl-http-error-message').shadow();
    });
});
