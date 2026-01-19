const fieldsetDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-form-fieldset--fieldset-default&viewMode=story';
const fieldsetBorderUrl =
    'http://localhost:8080/iframe.html?id=components-form-fieldset--fieldset-with-border&viewMode=story';
const fieldsetHorizontalUrl =
    'http://localhost:8080/iframe.html?id=components-form-fieldset--fieldset-horizontal&viewMode=story';

describe('cypress-e2e - form components - vl-fieldset - default story', () => {
    it('should render', () => {
        cy.visit(fieldsetDefaultUrl);

        cy.get('vl-fieldset').shadow().find('fieldset');
        cy.get('vl-fieldset').shadow().find('legend');
    });
});

describe('cypress-e2e - form components - vl-fieldset - border story', () => {
    it('should render', () => {
        cy.visit(fieldsetBorderUrl);

        cy.get('vl-fieldset[border]').shadow().find('fieldset');
        cy.get('vl-fieldset[border]').shadow().find('legend');
    });
});

describe('cypress-e2e - form components - vl-fieldset - horizontal story', () => {
    it('should render', () => {
        cy.visit(fieldsetHorizontalUrl);

        cy.get('vl-fieldset[horizontal]').shadow().find('fieldset');
        cy.get('vl-fieldset[horizontal]').shadow().find('legend');
    });
});
