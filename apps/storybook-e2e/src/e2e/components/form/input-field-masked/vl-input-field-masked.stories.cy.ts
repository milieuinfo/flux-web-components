const inputFieldMaskedIbanUrl =
    'http://localhost:8080/iframe.html?id=components-form-input-field-masked--input-field-masked-iban&viewMode=story';
const inputFieldMaskedRrnUrl =
    'http://localhost:8080/iframe.html?id=components-form-input-field-masked--input-field-masked-rrn&viewMode=story';
const inputFieldMaskedUuidUrl =
    'http://localhost:8080/iframe.html?id=components-form-input-field-masked--input-field-masked-uuid&viewMode=story';
const inputFieldMaskedDateUrl =
    'http://localhost:8080/iframe.html?id=components-form-input-field-masked--input-field-masked-date&viewMode=story';
const inputFieldMaskedNumericalUrl =
    'http://localhost:8080/iframe.html?id=components-form-input-field-masked--input-field-masked-numerical&viewMode=story';
const inputFieldMaskedPriceUrl =
    'http://localhost:8080/iframe.html?id=components-form-input-field-masked--input-field-masked-price&viewMode=story';
const inputFieldMaskedPhoneUrl =
    'http://localhost:8080/iframe.html?id=components-form-input-field-masked--input-field-masked-phone&viewMode=story';
const inputFieldMaskedPhoneInternationalUrl =
    'http://localhost:8080/iframe.html?id=components-form-input-field-masked--input-field-masked-phone-international&viewMode=story';
const inputFieldMaskedMobileUrl =
    'http://localhost:8080/iframe.html?id=components-form-input-field-masked--input-field-masked-mobile&viewMode=story';

describe('cypress-e2e - form components - vl-input-field-masked - iban story', () => {
    it('should render', () => {
        cy.visit(inputFieldMaskedIbanUrl);

        cy.get('vl-input-field-masked').shadow().find('input');
    });
});

describe('cypress-e2e - form components - vl-input-field-masked - rrn story', () => {
    it('should render', () => {
        cy.visit(inputFieldMaskedRrnUrl);

        cy.get('vl-input-field-masked').shadow().find('input');
    });
});

describe('cypress-e2e - form components - vl-input-field-masked - uuid story', () => {
    it('should render', () => {
        cy.visit(inputFieldMaskedUuidUrl);

        cy.get('vl-input-field-masked').shadow().find('input');
    });
});

describe('cypress-e2e - form components - vl-input-field-masked - date story', () => {
    it('should render', () => {
        cy.visit(inputFieldMaskedDateUrl);

        cy.get('vl-input-field-masked').shadow().find('input');
    });
});

describe('cypress-e2e - form components - vl-input-field-masked - numerical story', () => {
    it('should render', () => {
        cy.visit(inputFieldMaskedNumericalUrl);

        cy.get('vl-input-field-masked').shadow().find('input');
    });
});

describe('cypress-e2e - form components - vl-input-field-masked - price story', () => {
    it('should render', () => {
        cy.visit(inputFieldMaskedPriceUrl);

        cy.get('vl-input-field-masked').shadow().find('input');
    });
});

describe('cypress-e2e - form components - vl-input-field-masked - phone story', () => {
    it('should render', () => {
        cy.visit(inputFieldMaskedPhoneUrl);

        cy.get('vl-input-field-masked').shadow().find('input');
    });
});

describe('cypress-e2e - form components - vl-input-field-masked - phone international story', () => {
    it('should render', () => {
        cy.visit(inputFieldMaskedPhoneInternationalUrl);

        cy.get('vl-input-field-masked').shadow().find('input');
    });
});

describe('cypress-e2e - form components - vl-input-field-masked - mobile story', () => {
    it('should render', () => {
        cy.visit(inputFieldMaskedMobileUrl);

        cy.get('vl-input-field-masked').shadow().find('input');
    });
});
