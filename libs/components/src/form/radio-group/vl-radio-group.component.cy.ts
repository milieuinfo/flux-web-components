import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlRadioComponent } from './vl-radio.component';
import { VlRadioGroupComponent } from './vl-radio-group.component';
import { VlFormMessageComponent } from '../form-message/vl-form-message.component';

registerWebComponents([VlRadioComponent, VlRadioGroupComponent, VlFormMessageComponent]);

const clickRadioWithValue = (value: string) => {
    cy.get(`vl-radio[value="${value}"]`).shadow().find('input').click({ force: true });
};

describe('vl-radio-group - properties & states', () => {
    beforeEach(() => {
        cy.viewport(1200, 800);
    });

    it('should mount', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-radio-group>
                    <vl-radio value="land">Land</vl-radio>
                    <vl-radio value="zee">Zee</vl-radio>
                    <vl-radio value="lucht">Lucht</vl-radio>
                </vl-radio-group>
            </div>
        `);

        cy.get('vl-radio-group').shadow();
        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('radio-group-mount');
    });

    it('should be accessible', () => {
        cy.mount(html`
            <vl-radio-group>
                <vl-radio value="land">Land</vl-radio>
                <vl-radio value="zee">Zee</vl-radio>
                <vl-radio value="lucht">Lucht</vl-radio>
            </vl-radio-group>
        `);
        cy.injectAxe();

        cy.checkA11y('vl-radio-group');
    });

    it('should have a checked value', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-radio-group value="zee">
                    <vl-radio value="land">Land</vl-radio>
                    <vl-radio value="zee">Zee</vl-radio>
                    <vl-radio value="lucht">Lucht</vl-radio>
                </vl-radio-group>
            </div>
        `);

        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('radio-group-checked');
        cy.get('vl-radio-group').find('vl-radio[value="zee"]').should('have.attr', 'checked');
        cy.get('vl-radio-group').find('vl-radio[value="land"]').should('not.have.attr', 'checked');
        cy.get('vl-radio-group').find('vl-radio[value="lucht"]').should('not.have.attr', 'checked');
    });

    it('should set the value programmatically', () => {
        cy.mount(html`
            <vl-radio-group id="land-zee" name="land-zee" value="land" required>
                <vl-radio value="land">Land</vl-radio>
                <vl-radio value="zee">Zee</vl-radio>
                <vl-radio value="lucht">Lucht</vl-radio>
            </vl-radio-group>
        `);
        cy.injectAxe();

        cy.get('vl-radio-group').find('vl-radio[value="land"]').should('have.attr', 'checked');
        cy.get('vl-radio-group').find('vl-radio[value="zee"]').should('not.have.attr', 'checked');
        cy.get('vl-radio-group').find('vl-radio[value="lucht"]').should('not.have.attr', 'checked');
        cy.checkA11y('vl-radio-group');

        cy.get('vl-radio-group').invoke('attr', 'value', 'zee');
        cy.get('vl-radio-group').find('vl-radio[value="land"]').should('not.have.attr', 'checked');
        cy.get('vl-radio-group').find('vl-radio[value="zee"]').should('have.attr', 'checked');
        cy.get('vl-radio-group').find('vl-radio[value="lucht"]').should('not.have.attr', 'checked');
        cy.checkA11y('vl-radio-group');
    });

    it('should set error', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-radio-group id="land-zee" name="land-zee">
                    <vl-radio value="land">Land</vl-radio>
                    <vl-radio value="zee">Zee</vl-radio>
                    <vl-radio value="lucht">Lucht</vl-radio>
                </vl-radio-group>
            </div>
        `);
        cy.injectAxe();

        cy.get('vl-radio-group').invoke('attr', 'error', '');

        cy.get('vl-radio-group')
            .find('vl-radio')
            .first()
            .shadow()
            .find('.vl-radio__label')
            .shouldHaveComputedStyle({ pseudo: ':after', style: 'background-color', value: 'rgb(255, 255, 255)' })
            .shouldHaveComputedStyle({ pseudo: ':after', style: 'border-color', value: 'rgb(210, 55, 60)' });

        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('radio-group-error');
    });

    it('should set success', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-radio-group id="land-zee" name="land-zee">
                    <vl-radio value="land">Land</vl-radio>
                    <vl-radio value="zee">Zee</vl-radio>
                    <vl-radio value="lucht">Lucht</vl-radio>
                </vl-radio-group>
            </div>
        `);
        cy.injectAxe();

        cy.get('vl-radio-group').invoke('attr', 'success', '');
        cy.checkA11y('vl-radio-group');

        cy.get('vl-radio-group')
            .find('vl-radio')
            .first()
            .shadow()
            .find('.vl-radio__label')
            .shouldHaveComputedStyle({ pseudo: ':after', style: 'background-color', value: 'rgb(255, 255, 255)' })
            .shouldHaveComputedStyle({ pseudo: ':after', style: 'border-color', value: 'rgb(0, 158, 71)' });

        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('radio-group-success');
    });

    it('should set block', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-radio-group id="land-zee" name="land-zee">
                    <vl-radio value="land">Land</vl-radio>
                    <vl-radio value="zee">Zee</vl-radio>
                    <vl-radio value="lucht">Lucht</vl-radio>
                </vl-radio-group>
            </div>
        `);

        cy.get('vl-radio-group').invoke('attr', 'block', '');
        cy.checkA11y('vl-radio-group');

        cy.get('vl-radio-group').find('vl-radio').shadow().find('.vl-radio').should('have.class', 'vl-radio--block');

        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('radio-group-block');
    });

    it('should set readonly', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-radio-group id="land-zee" name="land-zee">
                    <vl-radio value="land">Land</vl-radio>
                    <vl-radio value="zee">Zee</vl-radio>
                    <vl-radio value="lucht">Lucht</vl-radio>
                </vl-radio-group>
            </div>
        `);
        cy.injectAxe();

        cy.get('vl-radio-group').invoke('attr', 'readonly', '');
        cy.checkA11y('vl-radio-group');

        cy.get('vl-radio-group').find('vl-radio').first().click();
        cy.get('vl-radio-group').find('vl-radio').first().should('not.have.attr', 'checked');
        cy.get('vl-radio-group').find('vl-radio').first().should('have.focus');

        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('radio-group-readonly');
    });

    it('should set disabled', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-radio-group id="land-zee" name="land-zee">
                    <vl-radio value="land">Land</vl-radio>
                    <vl-radio value="zee">Zee</vl-radio>
                    <vl-radio value="lucht">Lucht</vl-radio>
                </vl-radio-group>
            </div>
        `);
        cy.injectAxe();

        cy.get('vl-radio-group').invoke('attr', 'disabled', '');
        cy.checkA11y('vl-radio-group');

        cy.get('vl-radio').should('have.attr', 'disabled');
        cy.get('vl-radio')
            .shadow()
            .find('.vl-radio')
            .shouldHaveComputedStyle({ style: 'color', value: 'rgb(51, 51, 50)' })
            .should('have.class', 'vl-radio--disabled');

        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('radio-group-disabled');
    });
});

describe('vl-radio-group - keyboard navigation', () => {
    it('should navigate between radio inputs with the keyboard arrow keys', () => {
        cy.mount(html`
            <vl-radio-group>
                <vl-radio value="land">Land</vl-radio>
                <vl-radio value="zee">Zee</vl-radio>
                <vl-radio value="lucht">Lucht</vl-radio>
            </vl-radio-group>
        `);
        cy.injectAxe();

        // Eerste radio checken en met de pijltjestoets naar de volgende gaan
        cy.get('vl-radio-group')
            .find('vl-radio[value="land"]')
            .shadow()
            .find('.vl-radio__toggle')
            .click({ force: true });
        cy.get('vl-radio-group').trigger('keydown', { code: 'ArrowDown' });

        // Eerste radio mag niet gecheckt zijn
        cy.get('vl-radio-group')
            .find('vl-radio[value="land"]')
            .shadow()
            .find('label.vl-radio > input')
            .should('not.be.checked');

        // Tweede radio moet gecheckt zijn & focus hebben
        cy.get('vl-radio-group')
            .find('vl-radio[value="zee"]')
            .shadow()
            .find('label.vl-radio > input')
            .should('be.checked')
            .and('have.focus');

        cy.checkA11y('vl-radio-group');

        // Met de pijltjestoets naar de vorige gaan
        cy.get('vl-radio-group')
            .find('vl-radio[value="zee"]')
            .shadow()
            .find('.vl-radio__toggle')
            .click({ force: true });
        cy.get('vl-radio-group').trigger('keydown', { code: 'ArrowUp' });

        // Eerste radio moet gecheckt zijn
        cy.get('vl-radio-group')
            .find('vl-radio[value="land"]')
            .shadow()
            .find('label.vl-radio > input')
            .should('be.checked')
            .and('have.focus');

        // Tweede radio mag niet gecheckt zijn
        cy.get('vl-radio-group')
            .find('vl-radio[value="zee"]')
            .shadow()
            .find('label.vl-radio > input')
            .should('not.be.checked');
    });

    it('should only select one radio at a time', () => {
        cy.mount(html`
            <vl-radio-group>
                <vl-radio value="land">Land</vl-radio>
                <vl-radio value="zee">Zee</vl-radio>
                <vl-radio value="lucht">Lucht</vl-radio>
            </vl-radio-group>
        `);

        // Eerste radio checken
        cy.get('vl-radio-group')
            .find('vl-radio[value="land"]')
            .shadow()
            .find('.vl-radio__toggle')
            .click({ force: true });

        // Eerste radio moet gecheckt zijn
        cy.get('vl-radio-group')
            .find('vl-radio[value="land"]')
            .shadow()
            .find('label.vl-radio > input')
            .should('be.checked');

        // Tweede radio mag niet gecheckt zijn
        cy.get('vl-radio-group')
            .find('vl-radio[value="zee"]')
            .shadow()
            .find('label.vl-radio > input')
            .should('not.be.checked');

        // Tweede radio checken
        cy.get('vl-radio-group')
            .find('vl-radio[value="zee"]')
            .shadow()
            .find('.vl-radio__toggle')
            .click({ force: true });

        // Eerste radio mag niet gecheckt zijn
        cy.get('vl-radio-group')
            .find('vl-radio[value="land"]')
            .shadow()
            .find('label.vl-radio > input')
            .should('not.be.checked');

        // Tweede radio moet gecheckt zijn
        cy.get('vl-radio-group')
            .find('vl-radio[value="zee"]')
            .shadow()
            .find('label.vl-radio > input')
            .should('be.checked');
    });

    it('should check focused radio on space press', () => {
        cy.mount(html`
            <vl-radio-group>
                <vl-radio value="land">Land</vl-radio>
                <vl-radio value="zee">Zee</vl-radio>
                <vl-radio value="lucht">Lucht</vl-radio>
            </vl-radio-group>
        `);

        cy.get('vl-radio-group').find<VlRadioComponent>('vl-radio[value="land"]').shadow().find('input');

        // tabbing werkt momenteel niet in cypress (zonder plugins): https://github.com/cypress-io/cypress/issues/299
        // focus radio met value "land"
        cy.get('vl-radio-group')
            .find<VlRadioComponent>('vl-radio[value="land"]')
            .then(($radio) => {
                $radio[0].focus();
            });

        // radio met value "land" mag niet gecheckt zijn
        cy.get('vl-radio-group')
            .find('vl-radio[value="land"]')
            .shadow()
            .find('label.vl-radio > input')
            .should('not.be.checked')
            .and('have.focus');

        cy.get('vl-radio-group').trigger('keydown', { code: 'Space', force: true });

        // radio met value "land" moet gecheckt zijn
        cy.get('vl-radio-group')
            .find('vl-radio[value="land"]')
            .shadow()
            .find('label.vl-radio > input')
            .should('be.checked')
            .and('have.focus');

        // focus radio met value "lucht"
        cy.get('vl-radio-group')
            .find<VlRadioComponent>('vl-radio[value="lucht"]')
            .then(($radio) => {
                $radio[0].focus();
            });

        // radio met value "lucht" mag niet gecheckt zijn
        cy.get('vl-radio-group')
            .find('vl-radio[value="lucht"]')
            .shadow()
            .find('label.vl-radio > input')
            .should('not.be.checked')
            .and('have.focus');

        cy.get('vl-radio-group').trigger('keydown', { code: 'Space', force: true });

        // radio met value "lucht" moet gecheckt zijn
        cy.get('vl-radio-group')
            .find('vl-radio[value="lucht"]')
            .shadow()
            .find('label.vl-radio > input')
            .should('be.checked')
            .and('have.focus');
    });
});

describe('vl-radio-group - events', () => {
    it('should dispatch vl-input & vl-change event on check', () => {
        cy.mount(html`
            <vl-radio-group id="land-zee" name="land-zee">
                <vl-radio value="land">Land</vl-radio>
                <vl-radio value="zee">Zee</vl-radio>
                <vl-radio value="lucht">Lucht</vl-radio>
            </vl-radio-group>
        `);
        const value = 'land';

        cy.createStubForEvent('vl-radio-group', 'vl-change');
        cy.createStubForEvent('vl-radio-group', 'vl-input');
        cy.get('vl-radio-group')
            .find(`vl-radio[value=${value}]`)
            .shadow()
            .find('.vl-radio__toggle')
            .click({ force: true });
        cy.get('@vl-change')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { checked: true, value });
        cy.get('@vl-input')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { checked: true, value });
    });

    it('should only dispatch vl-change but not vl-input event on checking programmatically', () => {
        cy.mount(html`
            <vl-radio-group id="land-zee" name="land-zee">
                <vl-radio value="land">Land</vl-radio>
                <vl-radio value="zee">Zee</vl-radio>
                <vl-radio value="lucht">Lucht</vl-radio>
            </vl-radio-group>
        `);
        const value = 'lucht';

        cy.createStubForEvent('vl-radio-group', 'vl-change');
        cy.createStubForEvent('vl-radio-group', 'vl-input');
        cy.get('vl-radio-group').invoke('attr', 'value', value);

        cy.get('@vl-change')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { checked: true, value });
        cy.get('@vl-input').its('callCount').should('eq', 0);
    });
});

describe('vl-radio-group - in form', () => {
    it('should work inside a form', () => {
        cy.mount(html`
            <form>
                <vl-radio-group id="land-zee" name="land-zee">
                    <vl-radio value="land">Land</vl-radio>
                    <vl-radio value="zee">Zee</vl-radio>
                    <vl-radio value="lucht">Lucht</vl-radio>
                </vl-radio-group>
            </form>
        `);

        clickRadioWithValue('zee');

        cy.get('vl-radio-group').find('vl-radio[value="zee"]').should('have.attr', 'checked');
        cy.get('vl-radio-group').find('vl-radio[value="land"]').should('not.have.attr', 'checked');
        cy.get('vl-radio-group').find('vl-radio[value="lucht"]').should('not.have.attr', 'checked');
    });

    it('should reset to null when the form is reset with no value', () => {
        cy.mount(html`
            <form>
                <vl-radio-group id="land-zee" name="land-zee" required>
                    <vl-radio value="land">Land</vl-radio>
                    <vl-radio value="zee">Zee</vl-radio>
                    <vl-radio value="lucht">Lucht</vl-radio>
                </vl-radio-group>
                <button class="vl-button" type="reset">Reset</button>
            </form>
        `);
        cy.injectAxe();

        cy.get('vl-radio-group').runTest((radioGroup) => {
            // @ts-ignore test private property
            expect(radioGroup.value).to.be.null;
        });

        clickRadioWithValue('zee');

        cy.get('vl-radio-group').find('vl-radio[value="zee"]').should('have.attr', 'checked');
        cy.get('vl-radio-group').find('vl-radio[value="land"]').should('not.have.attr', 'checked');
        cy.get('vl-radio-group').find('vl-radio[value="lucht"]').should('not.have.attr', 'checked');
        cy.checkA11y('vl-radio-group');

        cy.get('button[type="reset"]').click();

        cy.get('vl-radio-group').find('vl-radio[value="land"]').should('not.have.attr', 'checked');
        cy.get('vl-radio-group').find('vl-radio[value="zee"]').should('not.have.attr', 'checked');
        cy.get('vl-radio-group').find('vl-radio[value="lucht"]').should('not.have.attr', 'checked');
        cy.checkA11y('vl-radio-group');

        cy.get('vl-radio-group').runTest((radioGroup) => {
            // @ts-ignore test private property
            expect(radioGroup.value).to.be.null;
        });
    });

    it('should reset the value when the form is reset', () => {
        cy.mount(html`
            <form>
                <vl-radio-group id="land-zee" name="land-zee" value="land" required>
                    <vl-radio value="land">Land</vl-radio>
                    <vl-radio value="zee">Zee</vl-radio>
                    <vl-radio value="lucht">Lucht</vl-radio>
                </vl-radio-group>
                <button class="vl-button" type="reset">Reset</button>
            </form>
        `);
        cy.injectAxe();

        clickRadioWithValue('zee');

        cy.get('vl-radio-group').find('vl-radio[value="zee"]').should('have.attr', 'checked');
        cy.get('vl-radio-group').find('vl-radio[value="land"]').should('not.have.attr', 'checked');
        cy.get('vl-radio-group').find('vl-radio[value="lucht"]').should('not.have.attr', 'checked');
        cy.checkA11y('vl-radio-group');

        cy.get('button[type="reset"]').click();

        cy.get('vl-radio-group').find('vl-radio[value="land"]').should('have.attr', 'checked');
        cy.get('vl-radio-group').find('vl-radio[value="zee"]').should('not.have.attr', 'checked');
        cy.get('vl-radio-group').find('vl-radio[value="lucht"]').should('not.have.attr', 'checked');
        cy.checkA11y('vl-radio-group');
    });
});

describe('vl-radio-group - blur-validation', () => {
    const mount = () => {
        cy.mount(html`
            <form>
                <vl-radio-group id="rg" name="rg" required blur-validation>
                    <vl-radio value="a">A</vl-radio>
                    <vl-radio value="b">B</vl-radio>
                </vl-radio-group>
                <vl-form-message for="rg" state="valueMissing">Verplicht.</vl-form-message>
            </form>
        `);
    };

    it('should show error on blur after focus, even without selection', () => {
        mount();
        cy.get('vl-radio-group').then(($el) => {
            const rg = $el[0] as VlRadioGroupComponent;
            rg.dispatchEvent(new FocusEvent('focusout', { bubbles: true, composed: true }));
        });
        cy.get('vl-form-message[state="valueMissing"]').should('have.attr', 'show');
    });

    it('should show error when touched + invalid + blur (base-class isolation)', () => {
        mount();
        cy.get('vl-radio-group').then(($el) => {
            const rg = $el[0] as VlRadioGroupComponent;
            rg.dispatchEvent(new CustomEvent('vl-input', { bubbles: true, composed: true, detail: { value: null } }));
            rg.dispatchEvent(new FocusEvent('focusout', { bubbles: true, composed: true }));
        });
        cy.get('vl-form-message[state="valueMissing"]').should('have.attr', 'show');
    });

    it('should not show error after real radio selection + blur (selection makes valid)', () => {
        mount();
        cy.get('vl-radio[value="a"]').shadow().find('input').click({ force: true });
        cy.get('vl-radio[value="a"]').shadow().find('input').focus().blur();
        cy.get('vl-form-message[state="valueMissing"]').should('not.have.attr', 'show');
    });
});
