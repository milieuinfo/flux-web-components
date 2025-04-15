const textareaNextDefaultUrl = 'http://localhost:8080/iframe.html?id=form-textarea--textarea-default&viewMode=story';

describe('story - vl-textarea - default', () => {
    it('should render', () => {
        cy.visit(textareaNextDefaultUrl);

        cy.get('vl-textarea').shadow().find('textarea');
    });
});
