import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlFormCrossValidationMatchComponent } from './vl-form-cross-validation-match.component';

registerWebComponents([VlFormCrossValidationMatchComponent]);

describe('cypress-component - integrations - vl-form-cross-validation-match', () => {
    it('should render', () => {
        cy.mount(html` <vl-form-cross-validation-match></vl-form-cross-validation-match>`);

        cy.get('vl-form-cross-validation-match').shadow();
    });

    it('should show valueMissing when submitting empty form', () => {
        cy.mount(html` <vl-form-cross-validation-match></vl-form-cross-validation-match>`);

        cy.get('vl-form-cross-validation-match')
            .shadow()
            .find('vl-button[type="submit"]')
            .shadow()
            .find('button')
            .click('bottomLeft');
        cy.get('vl-form-cross-validation-match')
            .shadow()
            .find('vl-form-message[for="bevestig-email"][state="valueMissing"]')
            .should('have.attr', 'show', '');
    });

    it('should show customError when the e-mail addresses do not match', () => {
        cy.mount(html` <vl-form-cross-validation-match></vl-form-cross-validation-match>`);

        cy.get('vl-form-cross-validation-match').shadow().find('#email').shadow().find('input').type('a@b.com');
        cy.get('vl-form-cross-validation-match')
            .shadow()
            .find('vl-input-field-with-match-validator')
            .shadow()
            .find('input')
            .type('x@y.com');
        cy.get('vl-form-cross-validation-match')
            .shadow()
            .find('vl-button[type="submit"]')
            .shadow()
            .find('button')
            .click('bottomLeft');
        cy.get('vl-form-cross-validation-match')
            .shadow()
            .find('vl-form-message[for="bevestig-email"][state="customError"]')
            .should('have.attr', 'show', '');
    });

    it('should accept matching e-mail addresses', () => {
        cy.mount(html` <vl-form-cross-validation-match></vl-form-cross-validation-match>`);

        cy.get('vl-form-cross-validation-match').shadow().find('#email').shadow().find('input').type('a@b.com');
        cy.get('vl-form-cross-validation-match')
            .shadow()
            .find('vl-input-field-with-match-validator')
            .shadow()
            .find('input')
            .type('a@b.com');
        cy.get('vl-form-cross-validation-match')
            .shadow()
            .find('vl-button[type="submit"]')
            .shadow()
            .find('button')
            .click('bottomLeft');
        cy.get('vl-form-cross-validation-match')
            .shadow()
            .find('vl-form-message[for="bevestig-email"][state="customError"]')
            .should('not.have.attr', 'show', '');
    });

    it('should revalidate the confirmation field live when the e-mail changes', () => {
        cy.mount(html` <vl-form-cross-validation-match></vl-form-cross-validation-match>`);

        cy.get('vl-form-cross-validation-match').shadow().find('#email').shadow().find('input').type('a@b.com');
        cy.get('vl-form-cross-validation-match')
            .shadow()
            .find('vl-input-field-with-match-validator')
            .shadow()
            .find('input')
            .type('a@b.com');
        cy.get('vl-form-cross-validation-match')
            .shadow()
            .find('vl-button[type="submit"]')
            .shadow()
            .find('button')
            .click('bottomLeft');

        cy.get('vl-form-cross-validation-match').shadow().find('#email').shadow().find('input').type('x');
        cy.get('vl-form-cross-validation-match')
            .shadow()
            .find('vl-form-message[for="bevestig-email"][state="customError"]')
            .should('have.attr', 'show', '');
    });
});
