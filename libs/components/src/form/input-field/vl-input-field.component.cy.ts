import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlInputFieldComponent } from './vl-input-field.component';

registerWebComponents([VlInputFieldComponent]);

describe('component - vl-input-field', () => {
    it('should mount', () => {
        cy.mount(html`<vl-input-field label="test-label"></vl-input-field>`);

        cy.get('vl-input-field').shadow().find('input');
    });

    it('should be accessible', () => {
        cy.mount(html`<vl-input-field label="test-label"></vl-input-field>`);
        cy.injectAxe();

        cy.checkA11y('vl-input-field');
    });

    it('should set id', () => {
        cy.mount(html`<vl-input-field id="test-id"></vl-input-field>`);

        cy.get('vl-input-field').should('have.id', 'test-id');
        cy.get('vl-input-field').shadow().find('input').should('have.id', 'test-id');
    });

    it('should set name', () => {
        cy.mount(html`<vl-input-field name="test-name"></vl-input-field>`);

        cy.get('vl-input-field').should('have.attr', 'name', 'test-name');
        cy.get('vl-input-field').shadow().find('input').should('have.attr', 'name', 'test-name');
    });

    it('should set label', () => {
        cy.mount(html`<vl-input-field label="test-label"></vl-input-field>`);

        cy.get('vl-input-field').should('have.attr', 'label', 'test-label');
        cy.get('vl-input-field').shadow().find('input').should('have.attr', 'aria-label', 'test-label');
    });

    it('should set block', () => {
        cy.mount(html`<vl-input-field block></vl-input-field>`);

        cy.get('vl-input-field').should('have.attr', 'block');
        cy.get('vl-input-field').shadow().find('input').should('have.class', 'vl-input-field--block');
    });

    it('should set required', () => {
        cy.mount(html`<vl-input-field required></vl-input-field>`);

        cy.get('vl-input-field').should('have.attr', 'required');
        cy.get('vl-input-field').shadow().find('input').should('have.attr', 'required');
    });

    it('should set disabled', () => {
        cy.mount(html`<vl-input-field disabled></vl-input-field>`);

        cy.get('vl-input-field').should('have.attr', 'disabled');
        cy.get('vl-input-field').should('be.disabled');
        cy.get('vl-input-field').shadow().find('input').should('have.class', 'vl-input-field--disabled');
        cy.get('vl-input-field').shadow().find('input').should('be.disabled');
    });

    it('should set error', () => {
        cy.mount(html`<vl-input-field error></vl-input-field>`);

        cy.get('vl-input-field').should('have.attr', 'error');
        cy.get('vl-input-field').shadow().find('input').should('have.class', 'vl-input-field--error');
        cy.get('vl-input-field').shadow().find('input').should('have.attr', 'error');
    });

    it('should set success', () => {
        cy.mount(html`<vl-input-field success></vl-input-field>`);

        cy.get('vl-input-field').should('have.attr', 'success');
        cy.get('vl-input-field').shadow().find('input').should('have.class', 'vl-input-field--success');
    });

    it('should set readonly', () => {
        cy.mount(html`<vl-input-field readonly></vl-input-field>`);

        cy.get('vl-input-field').should('have.attr', 'readonly');
        cy.get('vl-input-field').shadow().find('input').should('have.attr', 'readonly');
    });

    it('should set value', () => {
        cy.mount(html`<vl-input-field value="Test value"></vl-input-field>`);

        cy.get('vl-input-field').should('have.value', 'Test value');
        cy.get('vl-input-field').shadow().find('input').should('have.value', 'Test value');
    });

    it('should set type', () => {
        cy.mount(html`<vl-input-field type="number" value="1"></vl-input-field>`);

        cy.get('vl-input-field').should('have.value', 1);
        cy.get('vl-input-field').shadow().find('input').should('have.value', 1);
        cy.get('vl-input-field').shadow().find('input').should('have.attr', 'type', 'number');
    });

    it('should set min length', () => {
        cy.mount(html`<vl-input-field min-length="1"></vl-input-field>`);

        cy.get('vl-input-field').should('have.attr', 'min-length', 1);
        cy.get('vl-input-field').shadow().find('input').should('have.attr', 'minlength', 1);
    });

    it('should set max length', () => {
        cy.mount(html`<vl-input-field max-length="10"></vl-input-field>`);

        cy.get('vl-input-field').should('have.attr', 'max-length', 10);
        cy.get('vl-input-field').shadow().find('input').should('have.attr', 'maxlength', 10);
    });

    it('should set min', () => {
        cy.mount(html`<vl-input-field min="1"></vl-input-field>`);

        cy.get('vl-input-field').should('have.attr', 'min', 1);
        cy.get('vl-input-field').shadow().find('input').should('have.attr', 'min', 1);
    });

    it('should set max', () => {
        cy.mount(html`<vl-input-field max="10"></vl-input-field>`);

        cy.get('vl-input-field').should('have.attr', 'max', 10);
        cy.get('vl-input-field').shadow().find('input').should('have.attr', 'max', 10);
    });

    it('should set pattern', () => {
        cy.mount(html`<vl-input-field pattern="Van(.*)"></vl-input-field>`);

        cy.get('vl-input-field').should('have.attr', 'pattern', 'Van(.*)');
        cy.get('vl-input-field').shadow().find('input').should('have.attr', 'pattern', 'Van(.*)');
    });

    it('should set min-exlusive', () => {
        cy.mount(html`<vl-input-field min-exclusive></vl-input-field>`);

        cy.get('vl-input-field').should('have.attr', 'min-exclusive', '');
        cy.runTestFor<VlInputFieldComponent>('vl-input-field', (component) => {
            // @ts-ignore: negeer aanspreken van private property
            expect(component.minExclusive).to.be.true;
        });
    });

    it('should set max-exlusive', () => {
        cy.mount(html`<vl-input-field max-exclusive></vl-input-field>`);

        cy.get('vl-input-field').should('have.attr', 'max-exclusive', '');
        cy.runTestFor<VlInputFieldComponent>('vl-input-field', (component) => {
            // @ts-ignore: negeer aanspreken van private property
            expect(component.maxExclusive).to.be.true;
        });
    });

    it('should dispatch vl-change & vl-input event on input', () => {
        cy.mount(html`<vl-input-field></vl-input-field>`);
        cy.createStubForEvent('vl-input-field', 'vl-change');
        cy.createStubForEvent('vl-input-field', 'vl-input');

        cy.get('vl-input-field').shadow().find('input').type('test');
        cy.get('@vl-change').its('callCount').should('eq', 5);
        cy.get('@vl-change').its('lastCall.args.0.detail').should('deep.equal', { value: 'test' });
        // change event wordt ook gedispatched bij focus verandering, daarom 1 extra
        cy.get('@vl-input').its('callCount').should('eq', 4);
        cy.get('@vl-input').its('lastCall.args.0.detail').should('deep.equal', { value: 'test' });
    });

    it('should dispatch vl-change but not vl-input event on programmatic value change', () => {
        cy.mount(html`<vl-input-field></vl-input-field>`);
        cy.createStubForEvent('vl-input-field', 'vl-change');
        cy.createStubForEvent('vl-input-field', 'vl-input');

        cy.get('vl-input-field').invoke('attr', 'value', 'test');
        cy.get('@vl-change').its('callCount').should('eq', 1);
        cy.get('@vl-change').its('lastCall.args.0.detail').should('deep.equal', { value: 'test' });
        cy.get('@vl-input').its('callCount').should('eq', 0);
    });

    it('should dispatch vl-valid event on valid input', () => {
        cy.mount(html`<vl-input-field required min-length="4"></vl-input-field>`);
        cy.createStubForEvent('vl-input-field', 'vl-valid');

        cy.get('vl-input-field').shadow().find('input').type('test');
        cy.get('@vl-valid').should('have.been.calledOnce');
        cy.get('@vl-valid').its('firstCall.args.0.detail').should('deep.equal', { value: 'test' });
    });
});
