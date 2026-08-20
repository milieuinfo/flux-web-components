import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlFormCrossValidationConditionalComponent } from './vl-form-cross-validation-conditional.component';

registerWebComponents([VlFormCrossValidationConditionalComponent]);

describe('cypress-component - integrations - vl-form-cross-validation-conditional', () => {
    it('should render', () => {
        cy.mount(html` <vl-form-cross-validation-conditional></vl-form-cross-validation-conditional>`);

        cy.get('vl-form-cross-validation-conditional').shadow();
    });

    it('should not require verduidelijking when reden is "verlenging"', () => {
        cy.mount(html` <vl-form-cross-validation-conditional></vl-form-cross-validation-conditional>`);

        cy.get('vl-form-cross-validation-conditional')
            .shadow()
            .find('vl-select#reden')
            .shadow()
            .find('select')
            .select('verlenging');
        cy.get('vl-form-cross-validation-conditional')
            .shadow()
            .find('vl-form-label[for="verduidelijking"]')
            .should('have.attr', 'label', 'Verduidelijking');
        cy.get('vl-form-cross-validation-conditional')
            .shadow()
            .find('vl-button[type="submit"]')
            .shadow()
            .find('button')
            .click('bottomLeft');
        cy.get('vl-form-cross-validation-conditional')
            .shadow()
            .find('vl-form-message[for="verduidelijking"][state="customError"]')
            .should('not.have.attr', 'show', '');
    });

    it('should mark verduidelijking as required when reden is "andere"', () => {
        cy.mount(html` <vl-form-cross-validation-conditional></vl-form-cross-validation-conditional>`);

        cy.get('vl-form-cross-validation-conditional')
            .shadow()
            .find('vl-form-label[for="verduidelijking"]')
            .should('have.attr', 'label', 'Verduidelijking');
        cy.get('vl-form-cross-validation-conditional')
            .shadow()
            .find('vl-select#reden')
            .shadow()
            .find('select')
            .select('andere');
        cy.get('vl-form-cross-validation-conditional')
            .shadow()
            .find('vl-form-label[for="verduidelijking"]')
            .should('have.attr', 'label', 'Verduidelijking *');
    });

    it('should require verduidelijking when reden is "andere"', () => {
        cy.mount(html` <vl-form-cross-validation-conditional></vl-form-cross-validation-conditional>`);

        cy.get('vl-form-cross-validation-conditional')
            .shadow()
            .find('vl-select#reden')
            .shadow()
            .find('select')
            .select('andere');
        cy.get('vl-form-cross-validation-conditional')
            .shadow()
            .find('vl-button[type="submit"]')
            .shadow()
            .find('button')
            .click('bottomLeft');
        cy.get('vl-form-cross-validation-conditional')
            .shadow()
            .find('vl-form-message[for="verduidelijking"][state="customError"]')
            .should('have.attr', 'show', '');
    });

    it('should accept a filled verduidelijking when reden is "andere"', () => {
        cy.mount(html` <vl-form-cross-validation-conditional></vl-form-cross-validation-conditional>`);

        cy.get('vl-form-cross-validation-conditional')
            .shadow()
            .find('vl-select#reden')
            .shadow()
            .find('select')
            .select('andere');
        cy.get('vl-form-cross-validation-conditional')
            .shadow()
            .find('vl-input-field-with-conditional-validator')
            .shadow()
            .find('input')
            .type('Verbouwing van het terras');
        cy.get('vl-form-cross-validation-conditional')
            .shadow()
            .find('vl-button[type="submit"]')
            .shadow()
            .find('button')
            .click('bottomLeft');
        cy.get('vl-form-cross-validation-conditional')
            .shadow()
            .find('vl-form-message[for="verduidelijking"][state="customError"]')
            .should('not.have.attr', 'show', '');
    });

    it('should revalidate verduidelijking live when reden changes', () => {
        cy.mount(html` <vl-form-cross-validation-conditional></vl-form-cross-validation-conditional>`);

        cy.get('vl-form-cross-validation-conditional')
            .shadow()
            .find('vl-select#reden')
            .shadow()
            .find('select')
            .select('andere');
        cy.get('vl-form-cross-validation-conditional')
            .shadow()
            .find('vl-button[type="submit"]')
            .shadow()
            .find('button')
            .click('bottomLeft');
        cy.get('vl-form-cross-validation-conditional')
            .shadow()
            .find('vl-form-message[for="verduidelijking"][state="customError"]')
            .should('have.attr', 'show', '');

        cy.get('vl-form-cross-validation-conditional')
            .shadow()
            .find('vl-select#reden')
            .shadow()
            .find('select')
            .select('verlenging');
        cy.get('vl-form-cross-validation-conditional')
            .shadow()
            .find('vl-form-message[for="verduidelijking"][state="customError"]')
            .should('not.have.attr', 'show', '');
    });
});
