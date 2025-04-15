const uploadDefaultUrl = 'http://localhost:8080/iframe.html?id=form-upload--upload-default&viewMode=story';

describe('story - vl-upload - default', () => {
    it('should display story', () => {
        cy.visit(uploadDefaultUrl);

        cy.get('vl-upload').shadow().find('input');
    });
});
