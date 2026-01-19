import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlInputFieldComponent } from '../input-field/vl-input-field.component';
import { VlFieldsetComponent } from './vl-fieldset.component';

registerWebComponents([VlFieldsetComponent, VlInputFieldComponent]);

describe('cypress-component - form components - vl-fieldset', () => {
    const mockLegend = 'Dit is een legend';
    it('should mount', () => {
        cy.mount(html`<vl-fieldset legend=${mockLegend}></vl-fieldset>`);

        cy.get('vl-fieldset').shadow().find('fieldset');
    });

    it('should be accessible', () => {
        cy.mount(html`<vl-fieldset legend=${mockLegend}></vl-fieldset>`);
        cy.injectAxe();

        cy.checkA11y('vl-fieldset');
    });

    it('should set legend', () => {
        cy.mount(html`<vl-fieldset legend=${mockLegend}></vl-fieldset>`);

        cy.get('vl-fieldset').should('have.attr', 'legend', mockLegend);
        cy.get('vl-fieldset').shadow().find('legend').should('contain.text', mockLegend);
        cy.get('vl-fieldset').shadow().find('vl-form-label').should('contain.text', mockLegend);
    });

    it('should set border', () => {
        cy.mount(html`<vl-fieldset legend=${mockLegend} border></vl-fieldset>`);

        cy.get('vl-fieldset').should('have.attr', 'border');
        cy.get('vl-fieldset').shadow().find('fieldset').should('have.class', 'vl-fieldset--border');
    });

    it('should set horizontal', () => {
        cy.mount(html`<vl-fieldset legend=${mockLegend} horizontal></vl-fieldset>`);

        cy.get('vl-fieldset').should('have.attr', 'horizontal');
        cy.get('vl-fieldset').shadow().find('fieldset').should('have.class', 'vl-grid');
        cy.get('vl-fieldset')
            .shadow()
            .find('vl-form-label')
            .should('have.class', 'vl-column')
            .and('have.class', 'vl-column--4')
            .and('have.class', 'vl-column--s-12');
    });

    it('should set legend-classes', () => {
        const mockClasses = ['vl-column--6', 'vl-column--m-12'];
        cy.mount(html`<vl-fieldset legend=${mockLegend} legend-classes=${mockClasses.join(' ')}></vl-fieldset>`);

        cy.get('vl-fieldset').should('have.attr', 'legend-classes', mockClasses.join(' '));
        cy.get('vl-fieldset')
            .shadow()
            .find('vl-form-label')
            .should('have.class', mockClasses[0])
            .and('have.class', mockClasses[1]);
    });

    it('should warn if no legend', () => {
        cy.window().then((win) => {
            cy.spy(win.console, 'warn').as('consoleWarn');
        });
        cy.mount(html`<vl-fieldset></vl-fieldset>`);

        cy.get('@consoleWarn').should('be.calledWith', '"legend" is een vereist attribuut van vl-fieldset.');
    });

    it('should focus first focusable element on legend click', () => {
        cy.mount(html`
            <vl-fieldset legend=${mockLegend}>
                <vl-input-field label="input-label"></vl-input-field>
            </vl-fieldset>
        `);

        cy.get('vl-fieldset').shadow().find('vl-form-label').click();
        cy.get('vl-input-field').shadow().find('input').should('be.focused');
    });
});
