const inputFieldDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-form-input-field--input-field-default&viewMode=story';
const inputFieldNumberUrl =
    'http://localhost:8080/iframe.html?id=components-form-input-field--input-field-number&viewMode=story';

describe('story - vl-input-field - default', () => {
    it('should render', () => {
        cy.visit(inputFieldDefaultUrl);

        cy.get('vl-input-field').shadow().find('input');
    });
});

describe('story - vl-input-field - number', () => {
    it('should render', () => {
        cy.visit(inputFieldNumberUrl);

        cy.get('vl-input-field').shadow().find('input');
    });
});
