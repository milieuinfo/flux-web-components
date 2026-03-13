import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlRadioComponent } from './vl-radio.component';

registerWebComponents([VlRadioComponent]);

describe('vl-radio - properties & states', () => {
    beforeEach(() => {
        cy.viewport(1200, 800);
    });

    it('should mount', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 300px; padding: 20px; background: white;">
                <vl-radio value="test" label="test">Land</vl-radio>
            </div>
        `);

        cy.get('vl-radio').shadow().find('input');
        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('radio-mount');
    });

    it('should be checked', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 300px; padding: 20px; background: white;">
                <vl-radio value="test" label="test" checked>Land</vl-radio>
            </div>
        `);

        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('radio-checked');
        cy.get('vl-radio').should('have.attr', 'checked');
        cy.get('vl-radio')
            .shadow()
            .find('.vl-radio__label')
            .shouldHaveComputedStyle({ pseudo: ':after', style: 'background-color', value: 'rgb(0, 85, 204)' });
    });

    it('should be disabled', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 300px; padding: 20px; background: white;">
                <vl-radio value="test" label="test" disabled>Land</vl-radio>
            </div>
        `);

        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('radio-disabled');
        cy.injectAxe();
        cy.checkA11y('vl-radio');
        cy.get('vl-radio').should('have.attr', 'disabled');
        cy.get('vl-radio')
            .shadow()
            .find('.vl-radio')
            .shouldHaveComputedStyle({ style: 'color', value: 'rgb(51, 51, 50)' })
            .should('have.class', 'vl-radio--disabled');
    });

    it('should have error state', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 300px; padding: 20px; background: white;">
                <vl-radio value="test" label="test" error>Land</vl-radio>
            </div>
        `);

        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('radio-error');
        cy.injectAxe();
        cy.get('vl-radio').should('have.attr', 'error');
        cy.get('vl-radio').shadow().find('.vl-radio').should('have.class', 'vl-radio--error');
        cy.get('vl-radio')
            .shadow()
            .find('.vl-radio__label')
            .shouldHaveComputedStyle({ pseudo: ':after', style: 'background-color', value: 'rgb(255, 255, 255)' })
            .shouldHaveComputedStyle({ pseudo: ':after', style: 'border-color', value: 'rgb(210, 55, 60)' });
        cy.checkA11y('vl-radio');
    });

    it('should have success state', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 300px; padding: 20px; background: white;">
                <vl-radio value="test" label="test" success>Land</vl-radio>
            </div>
        `);

        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('radio-success');
        cy.injectAxe();
        cy.get('vl-radio').should('have.attr', 'success');
        cy.get('vl-radio').shadow().find('.vl-radio').should('have.class', 'vl-radio--success');
        cy.get('vl-radio')
            .shadow()
            .find('.vl-radio__label')
            .shouldHaveComputedStyle({ pseudo: ':after', style: 'background-color', value: 'rgb(255, 255, 255)' })
            .shouldHaveComputedStyle({ pseudo: ':after', style: 'border-color', value: 'rgb(0, 158, 71)' });
        cy.checkA11y('vl-radio');
    });

    it('should render with block attribute', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 300px; padding: 20px; background: white;">
                <vl-radio value="test" label="test" block>Land</vl-radio>
            </div>
        `);

        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('radio-block');
        cy.get('vl-radio').should('have.attr', 'block');
        cy.get('vl-radio').shadow().find('.vl-radio').should('have.class', 'vl-radio--block');
    });

    it('should apply label attribute as aria-label', () => {
        const labelText = 'Land optie';
        cy.mount(html` <vl-radio value="test" label=${labelText}>Land</vl-radio> `);

        cy.get('vl-radio').should('have.attr', 'label', labelText);
        cy.get('vl-radio').shadow().find('input').should('have.attr', 'aria-label', labelText);
    });
});

describe('vl-radio - events', () => {
    it('should dispatch vl-change & vl-input event on check', () => {
        const value = 'test';

        cy.mount(html`<vl-radio label="plaats" value=${value}></vl-radio>`);
        cy.createStubForEvent('vl-radio', 'vl-input');
        cy.createStubForEvent('vl-radio', 'vl-change');

        cy.get('vl-radio').shadow().find('.vl-radio__toggle').click({ force: true });
        cy.get('@vl-input')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { checked: true, value });
        cy.get('@vl-change')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { checked: true, value });
    });

    it('should dispatch vl-change but not vl-input when changing value programmatically', () => {
        const value = 'test';

        cy.mount(html`<vl-radio label="plaats" value=${value}></vl-radio>`);
        cy.createStubForEvent('vl-radio', 'vl-input');
        cy.createStubForEvent('vl-radio', 'vl-change');

        cy.get('vl-radio').invoke('attr', 'checked', 'true');
        cy.get('@vl-input').its('callCount').should('eq', 0);
        cy.get('@vl-change')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { checked: true, value });
    });

    it('should dispatch vl-valid event on valid input', () => {
        const value = 'test';

        cy.mount(html`<vl-radio label="plaats" value=${value}></vl-radio>`);
        cy.createStubForEvent('vl-radio', 'vl-valid');

        cy.get('vl-radio').shadow().find('.vl-radio__toggle').click({ force: true });
        cy.get('@vl-valid')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { checked: true, value });
    });
});
