import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlFormCrossValidationComponent } from './vl-form-cross-validation.component';

registerWebComponents([VlFormCrossValidationComponent]);

describe('cypress-component - integrations - vl-form-cross-validation', () => {
    it('should render', () => {
        cy.mount(html` <vl-form-cross-validation></vl-form-cross-validation>`);

        cy.get('vl-form-cross-validation').shadow();
    });

    it('should show valueMissing when submitting empty form', () => {
        cy.mount(html` <vl-form-cross-validation></vl-form-cross-validation>`);

        cy.get('vl-form-cross-validation')
            .shadow()
            .find('vl-button[type="submit"]')
            .shadow()
            .find('button')
            .click('bottomLeft');
        cy.get('vl-form-cross-validation')
            .shadow()
            .find('vl-form-message[for="code"][state="valueMissing"]')
            .should('have.attr', 'show', '');
    });

    it('should accept any code when procedure is "standaard"', () => {
        cy.mount(html` <vl-form-cross-validation></vl-form-cross-validation>`);

        cy.get('vl-form-cross-validation')
            .shadow()
            .find('vl-select#procedure')
            .shadow()
            .find('select')
            .select('standaard');
        cy.get('vl-form-cross-validation')
            .shadow()
            .find('vl-input-field-with-cross-validator')
            .shadow()
            .find('input')
            .type('willekeurige-code');
        cy.get('vl-form-cross-validation')
            .shadow()
            .find('vl-button[type="submit"]')
            .shadow()
            .find('button')
            .click('bottomLeft');
        cy.get('vl-form-cross-validation')
            .shadow()
            .find('vl-form-message[for="code"][state="customError"]')
            .should('not.have.attr', 'show', '');
        cy.get('vl-form-cross-validation')
            .shadow()
            .find('vl-input-field-with-cross-validator')
            .should('have.attr', 'success', '');
    });

    it('should show customError when procedure is "strikt" and code is not "ABC-123"', () => {
        cy.mount(html` <vl-form-cross-validation></vl-form-cross-validation>`);

        cy.get('vl-form-cross-validation')
            .shadow()
            .find('vl-select#procedure')
            .shadow()
            .find('select')
            .select('strikt');
        cy.get('vl-form-cross-validation')
            .shadow()
            .find('vl-input-field-with-cross-validator')
            .shadow()
            .find('input')
            .type('foute-code');
        cy.get('vl-form-cross-validation')
            .shadow()
            .find('vl-button[type="submit"]')
            .shadow()
            .find('button')
            .click('bottomLeft');
        cy.get('vl-form-cross-validation')
            .shadow()
            .find('vl-form-message[for="code"][state="customError"]')
            .should('have.attr', 'show', '');
    });

    it('should accept code "ABC-123" when procedure is "strikt"', () => {
        cy.mount(html` <vl-form-cross-validation></vl-form-cross-validation>`);

        cy.get('vl-form-cross-validation')
            .shadow()
            .find('vl-select#procedure')
            .shadow()
            .find('select')
            .select('strikt');
        cy.get('vl-form-cross-validation')
            .shadow()
            .find('vl-input-field-with-cross-validator')
            .shadow()
            .find('input')
            .type('ABC-123');
        cy.get('vl-form-cross-validation')
            .shadow()
            .find('vl-button[type="submit"]')
            .shadow()
            .find('button')
            .click('bottomLeft');
        cy.get('vl-form-cross-validation')
            .shadow()
            .find('vl-form-message[for="code"][state="customError"]')
            .should('not.have.attr', 'show', '');
        cy.get('vl-form-cross-validation')
            .shadow()
            .find('vl-input-field-with-cross-validator')
            .should('have.attr', 'success', '');
    });

    it('should revalidate code field when procedure changes', () => {
        cy.mount(html` <vl-form-cross-validation></vl-form-cross-validation>`);

        // Eerst: procedure standaard, code "test" → geldig
        cy.get('vl-form-cross-validation')
            .shadow()
            .find('vl-select#procedure')
            .shadow()
            .find('select')
            .select('standaard');
        cy.get('vl-form-cross-validation')
            .shadow()
            .find('vl-input-field-with-cross-validator')
            .shadow()
            .find('input')
            .type('test');
        cy.get('vl-form-cross-validation')
            .shadow()
            .find('vl-button[type="submit"]')
            .shadow()
            .find('button')
            .click('bottomLeft');
        cy.get('vl-form-cross-validation')
            .shadow()
            .find('vl-input-field-with-cross-validator')
            .should('have.attr', 'success', '');

        // Dan: wissel naar strikt → "test" wordt ongeldig, hervalidatie triggert
        cy.get('vl-form-cross-validation')
            .shadow()
            .find('vl-select#procedure')
            .shadow()
            .find('select')
            .select('strikt');
        cy.get('vl-form-cross-validation')
            .shadow()
            .find('vl-button[type="submit"]')
            .shadow()
            .find('button')
            .click('bottomLeft');
        cy.get('vl-form-cross-validation')
            .shadow()
            .find('vl-form-message[for="code"][state="customError"]')
            .should('have.attr', 'show', '');
    });
});
