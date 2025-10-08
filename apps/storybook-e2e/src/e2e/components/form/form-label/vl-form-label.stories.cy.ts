const formLabelDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-form-form-label--form-label-default&viewMode=story';

describe('cypress-e2e - form components - vl-form-label - default story', () => {
    it('should render', () => {
        cy.visit(formLabelDefaultUrl);

        cy.get('vl-form-label').shadow().find('label');
    });
});
