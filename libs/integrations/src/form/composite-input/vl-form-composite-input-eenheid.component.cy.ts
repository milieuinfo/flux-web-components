import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlFormCompositeInputEenheidComponent } from './vl-form-composite-input-eenheid.component';

registerWebComponents([VlFormCompositeInputEenheidComponent]);

const HOST = 'vl-form-composite-input-eenheid';

const submit = () => cy.get(HOST).shadow().find('vl-button[type="submit"]').shadow().find('button').click('bottomLeft');

const typeWaarde = (text: string) =>
    cy.get(HOST).shadow().find('vl-input-field#waarde').shadow().find('input').clear().type(text);

const kiesEenheid = (value: string) =>
    cy
        .get(HOST)
        .shadow()
        .find('vl-select#eenheid')
        .then(($s) => {
            const el = $s[0] as HTMLElement & { value: string };
            el.value = value;
            el.dispatchEvent(new CustomEvent('vl-change', { bubbles: true, composed: true }));
        });

const formMessage = (state: string) => cy.get(HOST).shadow().find(`vl-form-message[state="${state}"]`);

describe('cypress-component - integrations - vl-form-composite-input-eenheid', () => {
    it('rendert het getal- en het eenheidveld', () => {
        cy.mount(html`<vl-form-composite-input-eenheid></vl-form-composite-input-eenheid>`);
        cy.get(HOST).shadow().find('vl-input-field#waarde');
        cy.get(HOST).shadow().find('vl-select#eenheid');
    });

    it('toont valueMissing wanneer enkel het getal ingevuld is', () => {
        cy.mount(html`<vl-form-composite-input-eenheid></vl-form-composite-input-eenheid>`);
        typeWaarde('50');
        submit();
        formMessage('valueMissing').should('have.attr', 'show');
    });

    it('toont customError wanneer de lengte buiten het bereik ligt', () => {
        cy.mount(html`<vl-form-composite-input-eenheid></vl-form-composite-input-eenheid>`);
        typeWaarde('5000');
        kiesEenheid('m');
        submit();
        formMessage('customError').should('have.attr', 'show');
    });

    it('rekent de eenheid mee: 5000 cm is wel geldig', () => {
        cy.mount(html`<vl-form-composite-input-eenheid></vl-form-composite-input-eenheid>`);
        typeWaarde('5000');
        kiesEenheid('cm');
        submit();
        formMessage('customError').should('not.have.attr', 'show');
    });

    it('is geldig voor 50 cm en print de form data met beide sleutels', () => {
        cy.mount(html`<vl-form-composite-input-eenheid></vl-form-composite-input-eenheid>`);
        typeWaarde('50');
        kiesEenheid('cm');
        submit();
        formMessage('customError').should('not.have.attr', 'show');
        cy.get(HOST).shadow().find('pre').should('contain.text', 'lengte-waarde');
        cy.get(HOST).shadow().find('pre').should('contain.text', 'lengte-eenheid');
    });
});
