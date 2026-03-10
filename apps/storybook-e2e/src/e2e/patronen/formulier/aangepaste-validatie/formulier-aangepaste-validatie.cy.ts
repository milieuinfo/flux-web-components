const formCustomValidationUrl =
    'http://localhost:8080/iframe.html?id=patronen-formulier-aangepaste-validatie--formulier-aangepaste-validatie&viewMode=story';

describe('cypress-e2e - patronen - formulieren - custom validation - default story', () => {
    it('should render', () => {
        cy.visit(formCustomValidationUrl);

        cy.get('vl-form-custom-validation').shadow();
    });
});
