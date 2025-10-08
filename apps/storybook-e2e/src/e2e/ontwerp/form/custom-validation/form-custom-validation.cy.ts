const formCustomValidationUrl =
    'http://localhost:8080/iframe.html?id=ontwerp-form-custom-validation--custom-validation&viewMode=story';

describe('cypress-e2e - ontwerp - form custom validation - default story', () => {
    it('should render', () => {
        cy.visit(formCustomValidationUrl);

        cy.get('vl-form-custom-validation').shadow();
    });
});
