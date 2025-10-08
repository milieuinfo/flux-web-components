const formMessageDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-form-form-message--form-message-default&viewMode=story';

describe('cypress-e2e - form components - vl-form-message - default story', () => {
    it('should render', () => {
        cy.visit(formMessageDefaultUrl);

        cy.get('vl-form-message').shadow().find('p');
    });
});
