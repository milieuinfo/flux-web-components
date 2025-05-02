const httpErrorMessageDefaultUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-http-error-message--http-error-message-default&viewMode=story';

describe('story vl-http-error-message - default', () => {
    it('should render http error message', () => {
        cy.visit(`${httpErrorMessageDefaultUrl}`);
        cy.get('vl-http-error-message').shadow();
    });
});
