const inputFieldNextDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-form-input-field--input-field-default&viewMode=story';
const inputFieldNextNumberUrl =
    'http://localhost:8080/iframe.html?id=components-form-input-field--input-field-number&viewMode=story';

describe('story - vl-input-field - default', () => {
    it('should render', () => {
        cy.visit(inputFieldNextDefaultUrl);

        cy.get('vl-input-field').shadow().find('input');
    });
});

describe('story - vl-input-field - number', () => {
    it('should render', () => {
        cy.visit(inputFieldNextNumberUrl);

        cy.get('vl-input-field').shadow().find('input');
    });
});
