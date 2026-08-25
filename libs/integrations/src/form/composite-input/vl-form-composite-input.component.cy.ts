import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlFormCompositeInputComponent } from './vl-form-composite-input.component';

registerWebComponents([VlFormCompositeInputComponent]);

const HOST = 'vl-form-composite-input';

const submit = () => cy.get(HOST).shadow().find('vl-button[type="submit"]').shadow().find('button').click('bottomLeft');

const reset = () => cy.get(HOST).shadow().find('vl-button[type="reset"]').shadow().find('button').click('bottomLeft');

const typeIn = (id: 'lon' | 'lat', value: string) =>
    cy.get(HOST).shadow().find(`vl-input-field#${id}`).shadow().find('input').clear().type(value);

const formMessage = (state: string) => cy.get(HOST).shadow().find(`vl-form-message[state="${state}"]`);

const childMessage = (forId: string, state: string) =>
    cy.get(HOST).shadow().find(`vl-form-message[for="${forId}"][state="${state}"]`);

const output = () => cy.get(HOST).shadow().find('pre');

describe('cypress-component - integrations - vl-form-composite-input', () => {
    it('rendert het samengestelde veld', () => {
        cy.mount(html`<vl-form-composite-input></vl-form-composite-input>`);
        cy.get(HOST).shadow().find('vl-composite-input');
    });

    it('toont valueMissing bij submit zonder invoer', () => {
        cy.mount(html`<vl-form-composite-input></vl-form-composite-input>`);
        submit();
        formMessage('valueMissing').should('have.attr', 'show', '');
    });

    it('toont valueMissing wanneer maar één veld ingevuld is', () => {
        cy.mount(html`<vl-form-composite-input></vl-form-composite-input>`);
        typeIn('lon', '4.35');
        submit();
        formMessage('valueMissing').should('have.attr', 'show', '');
    });

    it('benoemt enkel het ontbrekende veld in de valueMissing-boodschap', () => {
        cy.mount(html`<vl-form-composite-input></vl-form-composite-input>`);
        typeIn('lon', '4.35');
        submit();
        formMessage('valueMissing')
            .should('have.attr', 'validation-message')
            .and('contain', 'Latitude')
            .and('not.contain', 'Longitude');
    });

    it('benoemt beide velden wanneer niets ingevuld is', () => {
        cy.mount(html`<vl-form-composite-input></vl-form-composite-input>`);
        submit();
        formMessage('valueMissing')
            .should('have.attr', 'validation-message')
            .and('contain', 'Longitude en Latitude');
    });

    it('toont rangeOverflow op het foute kindveld', () => {
        cy.mount(html`<vl-form-composite-input></vl-form-composite-input>`);
        typeIn('lon', '200');
        typeIn('lat', '50');
        submit();
        childMessage('lon', 'rangeOverflow').should('have.attr', 'show', '');
        childMessage('lon', 'rangeOverflow').should('contain.text', 'Longitude mag maximaal 180');
    });

    it('toont de per-veld-fout en de cross-veld-fout tegelijk (customValidator blokkeert de range-fout niet)', () => {
        cy.mount(html`<vl-form-composite-input></vl-form-composite-input>`);
        typeIn('lon', '200');
        typeIn('lat', '50');
        submit();
        childMessage('lon', 'rangeOverflow').should('have.attr', 'show', '');
        formMessage('customError').should('have.attr', 'show', '');
    });

    it('toont rangeUnderflow op het foute kindveld', () => {
        cy.mount(html`<vl-form-composite-input></vl-form-composite-input>`);
        typeIn('lon', '-200');
        typeIn('lat', '50');
        submit();
        childMessage('lon', 'rangeUnderflow').should('have.attr', 'show', '');
        childMessage('lon', 'rangeUnderflow').should('contain.text', 'Longitude moet minstens -180');
    });

    it('toont customError wanneer het punt buiten België ligt', () => {
        cy.mount(html`<vl-form-composite-input></vl-form-composite-input>`);
        typeIn('lon', '7.5');
        typeIn('lat', '48');
        submit();
        formMessage('customError').should('have.attr', 'show', '');
    });

    it('is geldig voor een punt binnen België en print de form data met samengestelde sleutels', () => {
        cy.mount(html`<vl-form-composite-input></vl-form-composite-input>`);
        typeIn('lon', '4.35');
        typeIn('lat', '50.85');
        submit();
        formMessage('customError').should('not.have.attr', 'show', '');
        formMessage('valueMissing').should('not.have.attr', 'show', '');
        output().should('contain.text', 'coordinaten-lon');
        output().should('contain.text', 'coordinaten-lat');
    });

    it('verstuurt maar één keer bij Enter in een kindveld', () => {
        cy.mount(html`<vl-form-composite-input></vl-form-composite-input>`);
        typeIn('lon', '4.35');
        typeIn('lat', '50.85');
        cy.get(HOST)
            .shadow()
            .find('form')
            .then(($form) => {
                $form[0].addEventListener('submit', cy.spy().as('submitSpy'));
            });
        cy.get(HOST).shadow().find('vl-input-field#lat').shadow().find('input').type('{enter}');
        cy.get('@submitSpy').should('have.been.calledOnce');
    });

    it('maakt de form data leeg bij reset', () => {
        cy.mount(html`<vl-form-composite-input></vl-form-composite-input>`);
        typeIn('lon', '4.35');
        typeIn('lat', '50.85');
        submit();
        output().should('exist');
        reset();
        cy.get(HOST).shadow().find('pre').should('not.exist');
        cy.get(HOST).shadow().find('vl-input-field#lon').shadow().find('input').should('have.value', '');
        cy.get(HOST).shadow().find('vl-input-field#lat').shadow().find('input').should('have.value', '');
    });
});
