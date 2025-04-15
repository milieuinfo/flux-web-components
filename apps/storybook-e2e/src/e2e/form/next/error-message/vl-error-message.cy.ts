const errorMessageNextDefaultUrl =
    'http://localhost:8080/iframe.html?id=form-error-message--error-message-default&viewMode=story';

describe('story - vl-error-message - default', () => {
    it('should render', () => {
        cy.visit(errorMessageNextDefaultUrl);

        cy.get('vl-error-message').shadow().find('p');
    });
});
