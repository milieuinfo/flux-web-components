import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlFormCompositeInputComponent } from './vl-form-composite-input.component';

registerWebComponents([VlFormCompositeInputComponent]);

const submit = () =>
    cy
        .get('vl-form-composite-input')
        .shadow()
        .find('vl-button[type="submit"]')
        .shadow()
        .find('button')
        .click('bottomLeft');

const typeIn = (slot: 'first' | 'second', value: string) =>
    cy
        .get('vl-form-composite-input')
        .shadow()
        .find(`vl-input-field[slot="${slot}"]`)
        .shadow()
        .find('input')
        .clear()
        .type(value);

const formMessage = (state: string) =>
    cy.get('vl-form-composite-input').shadow().find(`vl-form-message[state="${state}"]`);

describe('cypress-component - integrations - vl-form-composite-input', () => {
    it('should render', () => {
        cy.mount(html`<vl-form-composite-input></vl-form-composite-input>`);
        cy.get('vl-form-composite-input').shadow().find('vl-composite-input');
    });

    it('shows valueMissing when incomplete on submit', () => {
        cy.mount(html`<vl-form-composite-input></vl-form-composite-input>`);
        submit();
        formMessage('valueMissing').should('have.attr', 'show', '');
    });

    it('shows customError when the point lies outside Belgium', () => {
        cy.mount(html`<vl-form-composite-input></vl-form-composite-input>`);
        typeIn('first', '7.5');
        typeIn('second', '48');
        submit();
        formMessage('customError').should('have.attr', 'show', '');
    });

    it('is valid for a point inside Belgium', () => {
        cy.mount(html`<vl-form-composite-input></vl-form-composite-input>`);
        typeIn('first', '4.35');
        typeIn('second', '50.85');
        submit();
        formMessage('customError').should('not.have.attr', 'show', '');
        formMessage('valueMissing').should('not.have.attr', 'show', '');
    });
});
