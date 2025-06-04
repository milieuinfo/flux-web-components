const formLabelDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-form-form-label--form-label-default&viewMode=story';

describe('story - vl-form-label - default', () => {
    it('should render', () => {
        cy.visit(formLabelDefaultUrl);

        cy.get('vl-form-label').shadow().find('label');
    });
});
