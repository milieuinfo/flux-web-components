const formMessageNextDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-form-form-message--form-message-default&viewMode=story';

describe('story - vl-form-message - default', () => {
    it('should render', () => {
        cy.visit(formMessageNextDefaultUrl);

        cy.get('vl-form-message').shadow().find('p');
    });
});
