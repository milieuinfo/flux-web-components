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

describe('story - vl-input-field-masked - iban', () => {
    it('should render', () => {
        cy.visit(inputFieldMaskedIbanUrl);

        cy.get('vl-input-field-masked').shadow().find('input');
    });
});

describe('story - vl-input-field-masked - rrn', () => {
    it('should render', () => {
        cy.visit(inputFieldMaskedRrnUrl);

        cy.get('vl-input-field-masked').shadow().find('input');
    });
});

describe('story - vl-input-field-masked - uuid', () => {
    it('should render', () => {
        cy.visit(inputFieldMaskedUuidUrl);

        cy.get('vl-input-field-masked').shadow().find('input');
    });
});

describe('story - vl-input-field-masked - date', () => {
    it('should render', () => {
        cy.visit(inputFieldMaskedDateUrl);

        cy.get('vl-input-field-masked').shadow().find('input');
    });
});

describe('story - vl-input-field-masked - numerical', () => {
    it('should render', () => {
        cy.visit(inputFieldMaskedNumericalUrl);

        cy.get('vl-input-field-masked').shadow().find('input');
    });
});

describe('story - vl-input-field-masked - price', () => {
    it('should render', () => {
        cy.visit(inputFieldMaskedPriceUrl);

        cy.get('vl-input-field-masked').shadow().find('input');
    });
});

describe('story - vl-input-field-masked - phone', () => {
    it('should render', () => {
        cy.visit(inputFieldMaskedPhoneUrl);

        cy.get('vl-input-field-masked').shadow().find('input');
    });
});

describe('story - vl-input-field-masked - phoneinternational', () => {
    it('should render', () => {
        cy.visit(inputFieldMaskedPhoneInternationalUrl);

        cy.get('vl-input-field-masked').shadow().find('input');
    });
});

describe('story - vl-input-field-masked - mobile', () => {
    it('should render', () => {
        cy.visit(inputFieldMaskedMobileUrl);

        cy.get('vl-input-field-masked').shadow().find('input');
    });
});
