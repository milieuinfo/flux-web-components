const uploadDefaultUrl = 'http://localhost:8080/iframe.html?id=components-form-upload--upload-default&viewMode=story';

describe('cypress-e2e - form components - vl-upload - default story', () => {
    it('should display story', () => {
        cy.visit(uploadDefaultUrl);

        cy.get('vl-upload').shadow().find('input');
    });
});
