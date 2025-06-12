const formMessageDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-form-form-message--form-message-default&viewMode=story';

describe('story - vl-form-message - default', () => {
    it('should render', () => {
        cy.visit(formMessageDefaultUrl);

        cy.get('vl-form-message').shadow().find('p');
    });
});
