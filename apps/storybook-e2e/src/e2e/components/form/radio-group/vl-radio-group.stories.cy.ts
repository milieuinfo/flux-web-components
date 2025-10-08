const radioGroupDefaultUrl =
    'http://localhost:8080/iframe.html?args=&id=components-form-radio-group--radio-group-default&viewMode=story';

describe('cypress-e2e - form components - vl-radio-group - default story', () => {
    it('should render', () => {
        cy.visit(radioGroupDefaultUrl);

        cy.get('vl-radio-group').shadow();
    });
});
