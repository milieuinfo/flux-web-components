const inputFieldDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-form-input-field--input-field-default&viewMode=story';
const inputFieldNumberUrl =
    'http://localhost:8080/iframe.html?id=components-form-input-field--input-field-number&viewMode=story';

describe('cypress-e2e - form components - vl-input-field - default story', () => {
    it('should render', () => {
        cy.visit(inputFieldDefaultUrl);

        cy.get('vl-input-field').shadow().find('input');
    });
});

describe('cypress-e2e - form components - vl-input-field - number story', () => {
    it('should render', () => {
        cy.visit(inputFieldNumberUrl);

        cy.get('vl-input-field').shadow().find('input');
    });
});
