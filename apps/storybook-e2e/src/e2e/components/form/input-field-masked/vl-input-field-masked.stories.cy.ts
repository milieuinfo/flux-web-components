const inputFieldMaskedNextIbanUrl =
    'http://localhost:8080/iframe.html?id=components-form-input-field-masked--input-field-masked-iban&viewMode=story';
const inputFieldMaskedNextRrnUrl =
    'http://localhost:8080/iframe.html?id=components-form-input-field-masked--input-field-masked-rrn&viewMode=story';
const inputFieldMaskedNextUuidUrl =
    'http://localhost:8080/iframe.html?id=components-form-input-field-masked--input-field-masked-uuid&viewMode=story';
const inputFieldMaskedNextDateUrl =
    'http://localhost:8080/iframe.html?id=components-form-input-field-masked--input-field-masked-date&viewMode=story';
const inputFieldMaskedNextNumericalUrl =
    'http://localhost:8080/iframe.html?id=components-form-input-field-masked--input-field-masked-numerical&viewMode=story';
const inputFieldMaskedNextPriceUrl =
    'http://localhost:8080/iframe.html?id=components-form-input-field-masked--input-field-masked-price&viewMode=story';
const inputFieldMaskedNextPhoneUrl =
    'http://localhost:8080/iframe.html?id=components-form-input-field-masked--input-field-masked-phone&viewMode=story';
const inputFieldMaskedNextPhoneInternationalUrl =
    'http://localhost:8080/iframe.html?id=components-form-input-field-masked--input-field-masked-phone-international&viewMode=story';
const inputFieldMaskedNextMobileUrl =
    'http://localhost:8080/iframe.html?id=components-form-input-field-masked--input-field-masked-mobile&viewMode=story';

describe('story - vl-input-field-masked - iban', () => {
    it('should render', () => {
        cy.visit(inputFieldMaskedNextIbanUrl);

        cy.get('vl-input-field-masked').shadow().find('input');
    });
});

describe('story - vl-input-field-masked - rrn', () => {
    it('should render', () => {
        cy.visit(inputFieldMaskedNextRrnUrl);

        cy.get('vl-input-field-masked').shadow().find('input');
    });
});

describe('story - vl-input-field-masked - uuid', () => {
    it('should render', () => {
        cy.visit(inputFieldMaskedNextUuidUrl);

        cy.get('vl-input-field-masked').shadow().find('input');
    });
});

describe('story - vl-input-field-masked - date', () => {
    it('should render', () => {
        cy.visit(inputFieldMaskedNextDateUrl);

        cy.get('vl-input-field-masked').shadow().find('input');
    });
});

describe('story - vl-input-field-masked - numerical', () => {
    it('should render', () => {
        cy.visit(inputFieldMaskedNextNumericalUrl);

        cy.get('vl-input-field-masked').shadow().find('input');
    });
});

describe('story - vl-input-field-masked - price', () => {
    it('should render', () => {
        cy.visit(inputFieldMaskedNextPriceUrl);

        cy.get('vl-input-field-masked').shadow().find('input');
    });
});

describe('story - vl-input-field-masked - phone', () => {
    it('should render', () => {
        cy.visit(inputFieldMaskedNextPhoneUrl);

        cy.get('vl-input-field-masked').shadow().find('input');
    });
});

describe('story - vl-input-field-masked - phoneinternational', () => {
    it('should render', () => {
        cy.visit(inputFieldMaskedNextPhoneInternationalUrl);

        cy.get('vl-input-field-masked').shadow().find('input');
    });
});

describe('story - vl-input-field-masked - mobile', () => {
    it('should render', () => {
        cy.visit(inputFieldMaskedNextMobileUrl);

        cy.get('vl-input-field-masked').shadow().find('input');
    });
});
