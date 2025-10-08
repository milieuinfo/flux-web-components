const textareaDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-form-textarea--textarea-default&viewMode=story';

describe('cypress-e2e - form components - vl-textarea - default story', () => {
    it('should render', () => {
        cy.visit(textareaDefaultUrl);

        cy.get('vl-textarea').shadow().find('textarea');
    });
});
