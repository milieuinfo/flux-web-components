import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlFormDataComponent } from './vl-form-data.component';

registerWebComponents([VlFormDataComponent]);

describe('integration - form data', () => {
    it('should render', () => {
        cy.mount(html`<vl-form-data></vl-form-data>`);

        cy.get('vl-form-data').shadow();
    });

    it('should parse form data', () => {
        cy.mount(html`<vl-form-data></vl-form-data>`);

        cy.get('vl-form-data').shadow().find('vl-input-field-next').shadow().find('input').type('John Doe');
        cy.get('vl-form-data').shadow().find('vl-select-rich-next#hobbies').shadow().find('.vl-select__inner').click();
        cy.get('vl-form-data')
            .shadow()
            .find('vl-select-rich-next#hobbies')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Padel')
            .click();
        cy.get('vl-form-data')
            .shadow()
            .find('vl-select-rich-next#hobbies')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Dans')
            .click();
        // Sluit de hobby dropdown
        cy.get('vl-form-data').shadow().find('vl-input-field-next').click();
        cy.get('vl-form-data')
            .shadow()
            .find('vl-button-next[type="submit"]')
            .shadow()
            .find('button')
            .click('bottomLeft'); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button-next tag.)
        cy.get('vl-form-data').then((form) => {
            // @ts-ignore: negeer private property
            const parsedFormData = form[0].parsedFormData;
            expect(parsedFormData?.naam).to.equal('John Doe');
            expect(parsedFormData?.hobbies).to.deep.equal(['padel', 'dans']);
        });
    });
});
