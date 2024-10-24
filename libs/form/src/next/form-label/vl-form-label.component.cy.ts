import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlFormLabelComponent } from './vl-form-label.component';
import { VlInputFieldComponent } from '../input-field';

registerWebComponents([VlFormLabelComponent, VlInputFieldComponent]);

describe('component - vl-form-label-next', () => {
    it('should mount', () => {
        cy.mount(html`<vl-form-label-next>Naam</vl-form-label-next>`);

        cy.get('vl-form-label-next');
    });

    it('should be accessible', () => {
        cy.mount(html`<vl-form-label-next>Naam</vl-form-label-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-form-label-next');
    });

    it('should set for', () => {
        cy.mount(html`<vl-form-label-next for="test-input">Naam</vl-form-label-next>`);

        cy.get('vl-form-label-next').shadow().find('label').should('have.attr', 'for', 'test-input');
    });

    it('should set label', () => {
        cy.mount(html`<vl-form-label-next label="Naam"></vl-form-label-next>`);

        cy.get('vl-form-label-next').shadow().find('label').contains('Naam');
    });

    it('should set block', () => {
        cy.mount(html`<vl-form-label-next block>Naam</vl-form-label-next>`);

        cy.get('vl-form-label-next').shadow().find('label').should('have.class', 'vl-form__label--block');
    });

    it('should set light', () => {
        cy.mount(html`<vl-form-label-next light>Naam</vl-form-label-next>`);

        cy.get('vl-form-label-next').shadow().find('label').should('have.class', 'vl-form__label--light');
    });
});

describe('component - vl-form-label-next - in form', () => {
    beforeEach(() => {
        cy.mount(html`
            <form id="form" class="vl-form">
                <div class="vl-form-grid vl-form-grid--is-stacked">
                    <div class="vl-col--3-12">
                        <vl-form-label-next for="naam" label="Naam" block></vl-form-label-next>
                    </div>
                    <div class="vl-col--9-12">
                        <vl-input-field-next id="naam" name="naam"></vl-input-field-next>
                    </div>
                </div>
            </form>
        `);
    });

    it('should focus form control on click vl-form-label', () => {
        cy.get('vl-input-field-next').should('not.be.focused');
        cy.get('vl-form-label-next').click();
        cy.get('vl-input-field-next').should('be.focused');
    });

    it('should set label on form control', () => {
        cy.get('vl-input-field-next').should('have.attr', 'label', 'Naam');
    });
});
