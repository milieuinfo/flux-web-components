import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlTextareaComponent } from './vl-textarea.component';

registerWebComponents([VlTextareaComponent]);

describe('component - vl-textarea', () => {
    it('should mount', () => {
        cy.mount(html`<vl-textarea></vl-textarea>`);

        cy.get('vl-textarea').shadow().find('textarea');
    });

    it('should be accessible', () => {
        cy.mount(html`<vl-textarea label="test-label"></vl-textarea>`);
        cy.injectAxe();

        cy.checkA11y('vl-textarea');
    });

    it('should set id', () => {
        cy.mount(html`<vl-textarea id="test-id"></vl-textarea>`);

        cy.get('vl-textarea').shadow().find('textarea').should('have.id', 'test-id');
    });

    it('should set name', () => {
        cy.mount(html`<vl-textarea name="test-name"></vl-textarea>`);

        cy.get('vl-textarea').shadow().find('textarea').should('have.attr', 'name', 'test-name');
    });

    it('should set label', () => {
        cy.mount(html`<vl-textarea label="test-label"></vl-textarea>`);

        cy.get('vl-textarea').shadow().find('textarea').should('have.attr', 'aria-label', 'test-label');
    });

    it('should set block', () => {
        cy.mount(html`<vl-textarea block></vl-textarea>`);

        cy.get('vl-textarea').shadow().find('textarea').should('have.class', 'vl-textarea--block');
    });

    it('should set required', () => {
        cy.mount(html`<vl-textarea required></vl-textarea>`);

        cy.get('vl-textarea').shadow().find('textarea').should('have.attr', 'required');
    });

    it('should set disabled', () => {
        cy.mount(html`<vl-textarea disabled></vl-textarea>`);

        cy.get('vl-textarea').should('be.disabled');
        cy.get('vl-textarea').shadow().find('textarea').should('have.class', 'vl-textarea--disabled');
        cy.get('vl-textarea').shadow().find('textarea').should('be.disabled');
    });

    it('should set error', () => {
        cy.mount(html`<vl-textarea error></vl-textarea>`);

        cy.get('vl-textarea').shadow().find('textarea').should('have.class', 'vl-textarea--error');
        cy.get('vl-textarea').shadow().find('textarea').should('have.attr', 'error');
    });

    it('should set success', () => {
        cy.mount(html`<vl-textarea success></vl-textarea>`);

        cy.get('vl-textarea').shadow().find('textarea').should('have.class', 'vl-textarea--success');
    });

    it('should set readonly', () => {
        cy.mount(html`<vl-textarea readonly></vl-textarea>`);

        cy.get('vl-textarea').shadow().find('textarea').should('have.attr', 'readonly');
    });

    it('should set value', () => {
        cy.mount(html`<vl-textarea value="Test value"></vl-textarea>`);

        cy.get('vl-textarea').shadow().find('textarea').should('have.value', 'Test value');
    });

    it('should set min length', () => {
        cy.mount(html`<vl-textarea min-length="1"></vl-textarea>`);

        cy.get('vl-textarea').shadow().find('textarea').should('have.attr', 'minlength', 1);
    });

    it('should set max length', () => {
        cy.mount(html`<vl-textarea max-length="10"></vl-textarea>`);

        cy.get('vl-textarea').shadow().find('textarea').should('have.attr', 'maxlength', 10);
    });

    it('should set rows', () => {
        cy.mount(html`<vl-textarea rows="10"></vl-textarea>`);

        cy.get('vl-textarea').shadow().find('textarea').should('have.attr', 'rows', 10);
    });

    it('should set cols', () => {
        cy.mount(html`<vl-textarea cols="10"></vl-textarea>`);

        cy.get('vl-textarea').shadow().find('textarea').should('have.attr', 'cols', 10);
    });

    it('should dispatch both vl-input & vl-change events on input', () => {
        cy.mount(html`<vl-textarea></vl-textarea>`);
        cy.createStubForEvent('vl-textarea', 'vl-input');
        cy.createStubForEvent('vl-textarea', 'vl-change');

        cy.get('vl-textarea').shadow().find('textarea').type('test');
        cy.get('@vl-input').its('callCount').should('eq', 4);
        cy.get('@vl-input').its('lastCall.args.0.detail').should('deep.equal', { value: 'test' });
        // change event wordt ook gedispatched bij focus verandering, daarom 1 extra
        cy.get('@vl-change').its('callCount').should('eq', 5);
        cy.get('@vl-change').its('lastCall.args.0.detail').should('deep.equal', { value: 'test' });
    });

    it('should dispatch vl-change event on programmatic value change but no vl-input events', () => {
        cy.mount(html`<vl-textarea></vl-textarea>`);
        cy.createStubForEvent('vl-textarea', 'vl-change');
        cy.createStubForEvent('vl-textarea', 'vl-input');

        cy.get('vl-textarea').invoke('attr', 'value', 'test');
        cy.get('@vl-change').its('callCount').should('eq', 1);
        cy.get('@vl-change').its('lastCall.args.0.detail').should('deep.equal', { value: 'test' });
        cy.get('@vl-input').its('callCount').should('eq', 0);
    });

    it('should dispatch vl-valid event on valid input', () => {
        cy.mount(html`<vl-textarea required min-length="4"></vl-textarea>`);

        cy.createStubForEvent('vl-textarea', 'vl-valid');
        cy.get('vl-textarea').shadow().find('textarea').type('test');
        cy.get('@vl-valid').should('have.been.calledOnce');
        cy.get('@vl-valid').its('firstCall.args.0.detail').should('deep.equal', { value: 'test' });
    });
});
