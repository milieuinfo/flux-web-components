import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlFormCompositeInputContactComponent } from './vl-form-composite-input-contact.component';

registerWebComponents([VlFormCompositeInputContactComponent]);

const HOST = 'vl-form-composite-input-contact';

const submit = () => cy.get(HOST).shadow().find('vl-button[type="submit"]').shadow().find('button').click('bottomLeft');

const chooseMethod = (value: string) =>
    cy
        .get(HOST)
        .shadow()
        .find('vl-select#method')
        .then(($s) => {
            const el = $s[0] as HTMLElement & { value: string };
            el.value = value;
            el.dispatchEvent(new CustomEvent('vl-change', { bubbles: true, composed: true }));
        });

const typeContact = (text: string) =>
    cy.get(HOST).shadow().find('vl-input-field#value').shadow().find('input').clear().type(text);

describe('cypress-component - integrations - vl-form-composite-input-contact', () => {
    it('rendert de methode-select', () => {
        cy.mount(html`<vl-form-composite-input-contact></vl-form-composite-input-contact>`);
        cy.get(HOST).shadow().find('vl-select#method');
    });

    it('toont een e-mailveld wanneer e-mail gekozen wordt', () => {
        cy.mount(html`<vl-form-composite-input-contact></vl-form-composite-input-contact>`);
        chooseMethod('email');
        cy.get(HOST).shadow().find('vl-input-field#value[type="email"]');
    });

    it('toont valueMissing wanneer de methode gekozen is maar het contactgegeven leeg blijft', () => {
        cy.mount(html`<vl-form-composite-input-contact></vl-form-composite-input-contact>`);
        chooseMethod('email');
        submit();
        cy.get(HOST)
            .shadow()
            .find('vl-form-message[for="contact"][state="valueMissing"]')
            .should('have.attr', 'show');
    });

    it('toont customError bij een ongeldig e-mailadres', () => {
        cy.mount(html`<vl-form-composite-input-contact></vl-form-composite-input-contact>`);
        chooseMethod('email');
        typeContact('geen-email');
        submit();
        cy.get(HOST).shadow().find('vl-form-message[state="customError"]').should('have.attr', 'show');
    });

    it('is geldig bij een correct e-mailadres en print de form data', () => {
        cy.mount(html`<vl-form-composite-input-contact></vl-form-composite-input-contact>`);
        chooseMethod('email');
        typeContact('naam@voorbeeld.be');
        submit();
        cy.get(HOST).shadow().find('vl-form-message[state="customError"]').should('not.have.attr', 'show');
        cy.get(HOST).shadow().find('pre').should('contain.text', 'contact-method');
        cy.get(HOST).shadow().find('pre').should('contain.text', 'contact-value');
        cy.get(HOST).shadow().find('pre').should('contain.text', 'naam@voorbeeld.be');
    });
});
