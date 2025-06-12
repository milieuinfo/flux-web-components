const radioDefaultUrl =
    'http://localhost:8080/iframe.html?args=&id=components-form-radio-group--radio-default&viewMode=story';

describe('story - vl-radio - default', () => {
    it('should render', () => {
        cy.visit(radioDefaultUrl);

        cy.get('vl-radio').shadow().find('input');
    });
});
