const radioGroupNextDefaultUrl =
    'http://localhost:8080/iframe.html?args=&id=components-form-radio-group--radio-group-default&viewMode=story';

describe('story - vl-radio-group - default', () => {
    it('should render', () => {
        cy.visit(radioGroupNextDefaultUrl);

        cy.get('vl-radio-group').shadow();
    });
});
