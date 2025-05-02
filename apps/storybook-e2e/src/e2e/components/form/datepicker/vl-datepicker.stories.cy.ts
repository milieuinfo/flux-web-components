const datepickerDefaultUrl =
    'http://localhost:8080/iframe.html?args=&id=components-form-datepicker--datepicker-default&viewMode=story';

describe('story - vl-datepicker - default', () => {
    it('should render', () => {
        cy.visit(datepickerDefaultUrl);

        cy.get('vl-datepicker').shadow();
    });
});
