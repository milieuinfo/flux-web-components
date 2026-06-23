const formDataUrl = 'http://localhost:8080/iframe.html?id=patronen-formulier-form-data--formulier-form-data&viewMode=story';

describe('cypress-e2e - patronen - formulieren - form data - default story', () => {
    it('should render', () => {
        cy.visit(formDataUrl);

        cy.get('vl-form-data').shadow();
    });
});
