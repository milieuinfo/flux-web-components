import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlFormCompositeInputDatumbereikComponent } from './vl-form-composite-input-datumbereik.component';

registerWebComponents([VlFormCompositeInputDatumbereikComponent]);

const HOST = 'vl-form-composite-input-datumbereik';

const submit = () => cy.get(HOST).shadow().find('vl-button[type="submit"]').shadow().find('button').click('bottomLeft');

const setDate = (id: 'begin' | 'einde', iso: string) =>
    cy
        .get(HOST)
        .shadow()
        .find(`vl-datepicker#${id}`)
        .then(($d) => {
            const el = $d[0] as HTMLElement & { value: string };
            el.setAttribute('value', iso);
            el.value = iso;
            el.dispatchEvent(new CustomEvent('vl-change', { bubbles: true, composed: true }));
        });

const customError = () => cy.get(HOST).shadow().find('vl-form-message[state="customError"]');

describe('cypress-component - integrations - vl-form-composite-input-datumbereik', () => {
    it('rendert twee datepickers', () => {
        cy.mount(html`<vl-form-composite-input-datumbereik></vl-form-composite-input-datumbereik>`);
        cy.get(HOST).shadow().find('vl-datepicker#begin');
        cy.get(HOST).shadow().find('vl-datepicker#einde');
    });

    it('leest de ISO-waarde van de datepicker uit', () => {
        cy.mount(html`<vl-form-composite-input-datumbereik></vl-form-composite-input-datumbereik>`);
        setDate('begin', '2026-12-25');
        cy.get(HOST).shadow().find('vl-datepicker#begin').should('have.value', '2026-12-25');
    });

    it('toont customError wanneer de begindatum na de einddatum ligt', () => {
        cy.mount(html`<vl-form-composite-input-datumbereik></vl-form-composite-input-datumbereik>`);
        setDate('begin', '2026-12-26');
        setDate('einde', '2026-12-25');
        submit();
        customError().should('have.attr', 'show');
    });

    it('is geldig bij begindatum voor einddatum en print de form data', () => {
        cy.mount(html`<vl-form-composite-input-datumbereik></vl-form-composite-input-datumbereik>`);
        setDate('begin', '2026-12-25');
        setDate('einde', '2026-12-26');
        submit();
        customError().should('not.have.attr', 'show');
        cy.get(HOST).shadow().find('pre').should('contain.text', 'periode-begin');
        cy.get(HOST).shadow().find('pre').should('contain.text', 'periode-einde');
    });
});
