const formDataUrl = 'http://localhost:8080/iframe.html?id=ontwerp-form-form-data--form-data&viewMode=story';

describe('cypress-e2e - ontwerp - form data - default story', () => {
    it('should render', () => {
        cy.visit(formDataUrl);

        cy.get('vl-form-data').shadow();
    });
});
