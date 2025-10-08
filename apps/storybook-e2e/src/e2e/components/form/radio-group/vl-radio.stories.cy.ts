const radioDefaultUrl =
    'http://localhost:8080/iframe.html?args=&id=components-form-radio-group--radio-default&viewMode=story';

describe('cypress-e2e - form components - vl-radio - default story', () => {
    it('should render', () => {
        cy.visit(radioDefaultUrl);

        cy.get('vl-radio').shadow().find('input');
    });
});
