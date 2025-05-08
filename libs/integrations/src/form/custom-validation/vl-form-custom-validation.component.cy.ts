// import { parseFormData } from '@domg-wc/components/form';
import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlFormCustomValidationComponent } from './vl-form-custom-validation.component';

registerWebComponents([VlFormCustomValidationComponent]);

describe('integrations - form custom validation', () => {
    it('should render', () => {
        cy.mount(html`<vl-form-custom-validation></vl-form-custom-validation>`);

        cy.get('vl-form-custom-validation').shadow();
    });

    it('should validate', () => {
        cy.mount(html`<vl-form-custom-validation></vl-form-custom-validation>`);

        cy.get('vl-form-custom-validation')
            .shadow()
            .find('vl-button[type="submit"]')
            .shadow()
            .find('button')
            .click('bottomLeft'); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.
        cy.get('vl-form-custom-validation')
            .shadow()
            .find('vl-form-message[state="valueMissing"]')
            .should('have.attr', 'show', '');
        cy.get('vl-form-custom-validation')
            .shadow()
            .find('vl-input-field-with-foo-validator')
            .shadow()
            .find('input')
            .type('test');
        cy.get('vl-form-custom-validation')
            .shadow()
            .find('vl-button[type="submit"]')
            .shadow()
            .find('button')
            .click('bottomLeft'); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.
        cy.get('vl-form-custom-validation')
            .shadow()
            .find('vl-form-message[state="customError"]')
            .should('have.attr', 'show', '');
        cy.get('vl-form-custom-validation')
            .shadow()
            .find('vl-input-field-with-foo-validator')
            .shadow()
            .find('input')
            .clear()
            .type('foo');
        cy.get('vl-form-custom-validation')
            .shadow()
            .find('vl-button[type="submit"]')
            .shadow()
            .find('button')
            .click('bottomLeft'); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.
        cy.get('vl-form-custom-validation')
            .shadow()
            .find('vl-form-message[state="customError"]')
            .should('not.have.attr', 'show', '');
        cy.get('vl-form-custom-validation')
            .shadow()
            .find('vl-input-field-with-foo-validator')
            .should('have.attr', 'success', '');
    });
});
