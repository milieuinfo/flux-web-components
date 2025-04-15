import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlRadioComponent } from './vl-radio.component';

registerWebComponents([VlRadioComponent]);

describe('component - vl-radio', () => {
    it('should mount', () => {
        cy.mount(html`<vl-radio label="plaats"></vl-radio>`);

        cy.get('vl-radio').shadow();
    });

    it('should be disabled', () => {
        cy.mount(html`<vl-radio label="plaats" disabled></vl-radio>`);
        cy.injectAxe();

        cy.checkA11y('vl-radio');
        cy.get('vl-radio').should('have.attr', 'disabled');
        cy.get('vl-radio')
            .shadow()
            .find('.vl-radio')
            .shouldHaveComputedStyle({ style: 'color', value: 'rgb(51, 51, 50)' })
            .should('have.class', 'vl-radio--disabled');
    });

    it('should be error', () => {
        cy.mount(html`<vl-radio label="plaats"></vl-radio>`);
        cy.injectAxe();

        cy.get('vl-radio').invoke('attr', 'error', '');
        cy.get('vl-radio').should('have.attr', 'error');
        cy.get('vl-radio').shadow().find('.vl-radio').should('have.class', 'vl-radio--error');
        cy.checkA11y('vl-radio');

        cy.get('vl-radio')
            .shadow()
            .find('.vl-radio__label')
            .shouldHaveComputedStyle({ pseudo: ':after', style: 'background-color', value: 'rgb(255, 255, 255)' })
            .shouldHaveComputedStyle({ pseudo: ':after', style: 'border-color', value: 'rgb(210, 55, 60)' });
    });

    it('should be success', () => {
        cy.mount(html`<vl-radio label="plaats"></vl-radio>`);
        cy.injectAxe();

        cy.get('vl-radio').invoke('attr', 'success', '');
        cy.get('vl-radio').should('have.attr', 'success');
        cy.get('vl-radio').shadow().find('.vl-radio').should('have.class', 'vl-radio--success');
        cy.checkA11y('vl-radio');

        cy.get('vl-radio')
            .shadow()
            .find('.vl-radio__label')
            .shouldHaveComputedStyle({ pseudo: ':after', style: 'background-color', value: 'rgb(255, 255, 255)' })
            .shouldHaveComputedStyle({ pseudo: ':after', style: 'border-color', value: 'rgb(0, 158, 71)' });
    });

    it('should dispatch vl-change & vl-input event on check', () => {
        const value = 'test';

        cy.mount(html`<vl-radio label="plaats" value=${value}></vl-radio>`);
        cy.injectAxe();
        cy.createStubForEvent('vl-radio', 'vl-input');
        cy.createStubForEvent('vl-radio', 'vl-change');

        cy.get('vl-radio').shadow().find('.vl-radio__toggle').click({ force: true });
        cy.get('@vl-input')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { checked: true, value });
        cy.checkA11y('vl-radio');

        cy.get('vl-radio').shadow().find('.vl-radio__toggle').click({ force: true });
        cy.get('@vl-change')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { checked: true, value });
        cy.checkA11y('vl-radio');
    });

    it('should dispatch vl-change but not vl-input when changing value programmatically', () => {
        const value = 'test';

        cy.mount(html`<vl-radio label="plaats" value=${value}></vl-radio>`);
        cy.injectAxe();
        cy.createStubForEvent('vl-radio', 'vl-input');
        cy.createStubForEvent('vl-radio', 'vl-change');

        cy.get('vl-radio').invoke('attr', 'checked', 'true');
        cy.get('@vl-input').its('callCount').should('eq', 0);
        cy.checkA11y('vl-radio');

        cy.get('@vl-change')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { checked: true, value });
        cy.checkA11y('vl-radio');
    });

    it('should dispatch vl-valid event on valid input', () => {
        const value = 'test';

        cy.mount(html`<vl-radio label="plaats" value=${value}></vl-radio>`);
        cy.injectAxe();
        cy.createStubForEvent('vl-radio', 'vl-valid');

        cy.get('vl-radio').shadow().find('.vl-radio__toggle').click({ force: true });
        cy.get('@vl-valid')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { checked: true, value });
        cy.checkA11y('vl-radio');
    });
});
