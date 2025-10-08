import { registerWebComponents } from '@domg-wc/common';
import { vlGridStyles } from '@domg-wc/styles';
import { html } from 'lit';
import { VlCheckboxComponent } from './vl-checkbox.component';
import { checkboxDefaults } from './vl-checkbox.defaults';

registerWebComponents([VlCheckboxComponent]);
type CheckboxDefaultTypes = Partial<typeof checkboxDefaults>;

const value = 'Optie 1';

const mountCheckboxInForm = ({ isSwitch, checked, disabled }: CheckboxDefaultTypes = {}) => {
    cy.mount(html`
        <style>
            ${vlGridStyles}
        </style>
        <form
            id="form"
            class="vl-form"
            @submit=${(e: Event) => {
                e.preventDefault();

                const data = new FormData(e.target as HTMLFormElement);
                console.log(Object.fromEntries(data));
            }}
        >
            <div class=vl-grid">
                <div class="vl-column vl-column--3">
                    <label class="vl-form__label vl-form__label--block" for="confirmation">Bevestig *</label>
                </div>
                <div class="vl-column vl-column--9">
                    <vl-checkbox
                        id="confirmation"
                        name="confirmation"
                        block
                        required
                        value="bevestig"
                        ?switch=${isSwitch}
                        ?checked=${checked}
                        ?disabled=${disabled}
                    >
                        Bevestig.
                    </vl-checkbox>
                    <vl-form-message for="confirmation" state="valueMissing"
                        >Gelieve je gegevens te bevestigen.
                    </vl-form-message>
                </div>
                <div class="vl-column vl-column--9 vl-column--start-4">
                    <div class="vl-action-group">
                        <button class="vl-button" type="submit">Verstuur</button>
                        <button class="vl-button" type="reset">Reset</button>
                    </div>
                </div>
            </div>
        </form>
    `);
};

const shouldBeDisabled = () => {
    cy.get('vl-checkbox').should('have.attr', 'disabled');
    cy.get('vl-checkbox')
        .shadow()
        .find('.vl-checkbox')
        .shouldHaveComputedStyle({ style: 'color', value: 'rgb(51, 51, 50)' })
        .should('have.class', 'vl-checkbox--disabled');
};

const shouldBeDisabledSwitch = () => {
    cy.get('vl-checkbox').should('have.attr', 'disabled');
    cy.get('vl-checkbox')
        .shadow()
        .find('.vl-checkbox--switch__wrapper')
        .shouldHaveComputedStyle({ style: 'color', value: 'rgb(51, 51, 50)' })
        .should('have.class', 'vl-checkbox--disabled');
};

const shouldToggleCheckedWithClick = (clickTarget: string) => {
    cy.get('vl-checkbox').should('have.attr', 'checked');
    cy.get('vl-checkbox').shadow().find(clickTarget).click({ force: true });
    cy.get('vl-checkbox').should('not.have.attr', 'checked');
    cy.get('vl-checkbox').shadow().find(clickTarget).click({ force: true });
    cy.get('vl-checkbox').should('have.attr', 'checked');
};

const shouldHaveErrorStyleSwitch = () => {
    cy.get('vl-checkbox').shadow().find('.vl-checkbox--switch__wrapper').should('have.class', 'vl-checkbox--error');

    cy.get('vl-checkbox')
        .shadow()
        .find('.vl-checkbox--switch__label')
        .shouldHaveComputedStyle({ pseudo: 'after', style: 'background-color', value: 'rgb(255, 255, 255)' })
        .shouldHaveComputedStyle({ pseudo: 'after', style: 'border-color', value: 'rgb(210, 55, 60)' })
        .shouldHaveComputedStyle({ pseudo: 'after', style: 'color', value: 'rgb(210, 55, 60)' });
};

describe('cypress-component - form components - vl-checkbox', () => {
    it('should mount', () => {
        cy.mount(html` <vl-checkbox value=${value}>Bevestig.</vl-checkbox> `);

        cy.get('vl-checkbox').shadow().find('input');
    });

    it('should be accessible', () => {
        cy.mount(html` <vl-checkbox value=${value}>Bevestig.</vl-checkbox> `);
        cy.injectAxe();

        cy.checkA11y('vl-checkbox');
    });

    it('should be checked', () => {
        cy.mount(html` <vl-checkbox id="cy-test-id" value=${value} checked>Bevestig.</vl-checkbox> `);

        shouldToggleCheckedWithClick('.vl-checkbox__label');
        cy.get('vl-checkbox')
            .shadow()
            .find('.vl-checkbox__label')
            .find('.vl-checkbox__box')
            .shouldHaveComputedStyle({ pseudo: 'after', style: 'background-color', value: 'rgb(0, 85, 204)' });
    });

    it('should be disabled', () => {
        cy.mount(html` <vl-checkbox value=${value} disabled>Bevestig.</vl-checkbox> `);

        shouldBeDisabled();
    });

    it('should have error', () => {
        cy.mount(html` <vl-checkbox value=${value} error>Bevestig.</vl-checkbox> `);

        cy.get('vl-checkbox').should('have.attr', 'error');
        cy.get('vl-checkbox').shadow().find('.vl-checkbox').should('have.class', 'vl-checkbox--error');
        cy.get('vl-checkbox')
            .shadow()
            .find('i.vl-checkbox__box')
            .shouldHaveComputedStyle({ pseudo: ':after', style: 'background-color', value: 'rgb(255, 255, 255)' })
            .shouldHaveComputedStyle({ pseudo: ':after', style: 'border-color', value: 'rgb(210, 55, 60)' });
        cy.get('vl-checkbox').shadow().find('.vl-checkbox__toggle').click({ force: true });
        cy.get('vl-checkbox')
            .shadow()
            .find('i.vl-checkbox__box')
            .shouldHaveComputedStyle({ pseudo: ':before', style: 'color', value: 'rgb(210, 55, 60)' });
    });

    it('should dispatch vl-change & vl-input event on check and uncheck', () => {
        cy.mount(html` <vl-checkbox value=${value}>Bevestig.</vl-checkbox> `);
        cy.createStubForEvent('vl-checkbox', 'vl-change');
        cy.createStubForEvent('vl-checkbox', 'vl-input');

        cy.get('vl-checkbox').shadow().find('.vl-checkbox__label').click({ force: true });
        cy.get('@vl-input')
            .should('have.been.calledOnce')
            .its('lastCall.args.0.detail')
            .should('deep.equal', { checked: true, value });
        cy.get('@vl-change')
            .should('have.been.calledTwice')
            .its('lastCall.args.0.detail')
            .should('deep.equal', { checked: true, value });
        cy.get('vl-checkbox').shadow().find('.vl-checkbox__label').click({ force: true });
        cy.get('@vl-change').its('callCount').should('eq', 3);
        cy.get('@vl-change').its('lastCall.args.0.detail').should('deep.equal', { checked: false });
        cy.get('@vl-input').its('callCount').should('eq', 2);
        cy.get('@vl-input').its('lastCall.args.0.detail').should('deep.equal', { checked: false });
    });

    it('should dispatch vl-change but not vl-input event on programmatic check and uncheck', () => {
        cy.mount(html` <vl-checkbox value=${value}>Bevestig.</vl-checkbox> `);
        cy.createStubForEvent('vl-checkbox', 'vl-change');
        cy.createStubForEvent('vl-checkbox', 'vl-input');

        cy.get('vl-checkbox').invoke('attr', 'checked', true);
        cy.get('@vl-change')
            .should('have.been.calledOnce')
            .its('lastCall.args.0.detail')
            .should('deep.equal', { checked: true, value });
        cy.get('@vl-input').its('callCount').should('eq', 0);

        cy.get('vl-checkbox').invoke('removeAttr', 'checked');
        cy.get('@vl-change').its('callCount').should('eq', 1);
        cy.get('@vl-change').its('lastCall.args.0.detail').should('deep.equal', { checked: false });
        cy.get('@vl-input').its('callCount').should('eq', 0);
    });

    it('should dispatch vl-valid event on valid input', () => {
        cy.mount(html` <vl-checkbox value=${value} required>Bevestig.</vl-checkbox> `);
        cy.createStubForEvent('vl-checkbox', 'vl-valid');

        cy.get('vl-checkbox').shadow().find('.vl-checkbox__toggle').click({ force: true });
        cy.get('@vl-valid')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { checked: true, value });
        cy.get('vl-checkbox').shadow().find('.vl-checkbox__toggle').click({ force: true });
        cy.get('@vl-valid').should('have.been.calledOnce');
    });
});

describe('cypress-component - form components - vl-checkbox - in form', () => {
    it('should mount', () => {
        mountCheckboxInForm();

        cy.get('vl-checkbox').shadow().find('input');
    });

    it('should be accessible', () => {
        mountCheckboxInForm();
        cy.injectAxe();

        cy.checkA11y('vl-checkbox');
    });

    it('should be accessible on mobile', () => {
        mountCheckboxInForm();

        cy.injectAxe();
        cy.viewport(320, 480);
        cy.checkA11y('vl-checkbox');
    });

    it('should sync show attribute and content paragraph', () => {
        mountCheckboxInForm();

        cy.get('vl-form-message[for="confirmation"]').should('not.have.attr', 'show');
        cy.get('vl-form-message[for="confirmation"]').shadow().find('p').should('have.attr', 'hidden');
        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[for="confirmation"]').should('have.attr', 'show');
        cy.get('vl-form-message[for="confirmation"]').shadow().find('p').should('not.have.attr', 'hidden');
        cy.get('vl-checkbox').click();
        cy.get('vl-form-message[for="confirmation"]').should('not.have.attr', 'show');
        cy.get('vl-form-message[for="confirmation"]').shadow().find('p').should('have.attr', 'hidden');
    });

    it('should validate', () => {
        mountCheckboxInForm();

        cy.get('vl-form-message[for="confirmation"]').should('not.have.attr', 'show');
        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[for="confirmation"]').should('have.attr', 'show');
        cy.get('vl-checkbox').click();
        cy.get('vl-form-message[for="confirmation"]').should('not.have.attr', 'show');
    });

    it('should validate with initial value', () => {
        mountCheckboxInForm({ checked: true });

        cy.get('vl-form-message[for="confirmation"]').should('not.have.attr', 'show');
        cy.get('vl-checkbox').click();
        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[for="confirmation"]').should('have.attr', 'show');
        cy.get('vl-checkbox').click();
        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[for="confirmation"]').should('not.have.attr', 'show');
    });

    it('should be disabled', () => {
        mountCheckboxInForm({ disabled: true });

        shouldBeDisabled();
        cy.get('vl-form-message[for="confirmation"]').should('not.have.attr', 'show');
        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[for="confirmation"]').should('not.have.attr', 'show');
    });

    it('should reset', () => {
        mountCheckboxInForm({});

        cy.get('vl-form-message[for="confirmation"]').should('not.have.attr', 'show');
        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[for="confirmation"]').should('have.attr', 'show');
        cy.get('button[type="reset"]').click();
        cy.get('vl-form-message[for="confirmation"]').should('not.have.attr', 'show');
    });
});

describe('cypress-component - form components - vl-checkbox - switch', () => {
    it('should mount', () => {
        cy.mount(html` <vl-checkbox value=${value} switch>Bevestig.</vl-checkbox> `);

        cy.get('vl-checkbox').shadow().find('input');
    });

    it('should be accessible', () => {
        cy.mount(html` <vl-checkbox id="cy-test-id" value=${value} switch label="test-label">Bevestig.</vl-checkbox> `);
        cy.injectAxe();

        cy.checkA11y('vl-checkbox');
    });

    it('should be checked', () => {
        cy.mount(html` <vl-checkbox id="cy-test-id" value=${value} switch checked>Bevestig.</vl-checkbox> `);

        shouldToggleCheckedWithClick('.vl-checkbox__label');
        cy.get('vl-checkbox')
            .shadow()
            .find('.vl-checkbox--switch__label')
            .shouldHaveComputedStyle({ style: 'background-color', value: 'rgb(0, 85, 204)' });
        cy.get('vl-checkbox').should('have.attr', 'checked');
        cy.get('vl-checkbox').should('have.attr', 'value', value);
    });

    it('should be disabled', () => {
        cy.mount(html` <vl-checkbox value=${value} switch disabled>Bevestig.</vl-checkbox> `);

        shouldBeDisabledSwitch();
    });

    it('should have error', () => {
        cy.mount(html` <vl-checkbox value=${value} switch error>Bevestig.</vl-checkbox> `);

        cy.get('vl-checkbox').should('have.attr', 'error');
        shouldHaveErrorStyleSwitch();
        cy.get('vl-checkbox').shadow().find('.vl-checkbox__label').click({ force: true });
        shouldHaveErrorStyleSwitch();
    });

    it('should dispatch vl-change & vl-input event on check and uncheck', () => {
        cy.mount(html` <vl-checkbox id="cy-test-id" value=${value} switch>Bevestig.</vl-checkbox> `);
        cy.createStubForEvent('vl-checkbox', 'vl-change');
        cy.createStubForEvent('vl-checkbox', 'vl-input');

        cy.get('vl-checkbox').shadow().find('.vl-checkbox__label').click({ force: true });
        cy.get('@vl-change')
            .should('have.been.calledTwice')
            .its('lastCall.args.0.detail')
            .should('deep.equal', { checked: true, value });
        cy.get('@vl-input')
            .should('have.been.calledOnce')
            .its('lastCall.args.0.detail')
            .should('deep.equal', { checked: true, value });

        cy.get('vl-checkbox').shadow().find('.vl-checkbox__label').click({ force: true });
        cy.get('@vl-change').its('callCount').should('eq', 3);
        cy.get('@vl-change').its('lastCall.args.0.detail').should('deep.equal', { checked: false });
        cy.get('@vl-input').its('callCount').should('eq', 2);
        cy.get('@vl-input').its('lastCall.args.0.detail').should('deep.equal', { checked: false });
    });

    it('should dispatch vl-change but not vl-input event on programmatic check and uncheck', () => {
        cy.mount(html` <vl-checkbox id="cy-test-id" value=${value} switch>Bevestig.</vl-checkbox> `);
        cy.createStubForEvent('vl-checkbox', 'vl-change');
        cy.createStubForEvent('vl-checkbox', 'vl-input');

        cy.get('vl-checkbox').invoke('attr', 'checked', true);
        cy.get('@vl-change')
            .should('have.been.calledOnce')
            .its('lastCall.args.0.detail')
            .should('deep.equal', { checked: true, value });
        cy.get('@vl-input').its('callCount').should('eq', 0);

        cy.get('vl-checkbox').invoke('removeAttr', 'checked');
        cy.get('@vl-change').its('callCount').should('eq', 1);
        cy.get('@vl-change').its('lastCall.args.0.detail').should('deep.equal', { checked: false });
        cy.get('@vl-input').its('callCount').should('eq', 0);
    });

    it('should dispatch vl-valid event on valid input', () => {
        cy.mount(html` <vl-checkbox id="cy-test-id" value=${value} switch required>Bevestig.</vl-checkbox> `);
        cy.createStubForEvent('vl-checkbox', 'vl-valid');

        cy.get('vl-checkbox').shadow().find('.vl-checkbox__label').click({ force: true });
        cy.get('@vl-valid')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { checked: true, value });
        cy.get('vl-checkbox').shadow().find('.vl-checkbox__label').click({ force: true });
        cy.get('@vl-valid').should('have.been.calledOnce');
    });
});

describe('cypress-component - form components - vl-checkbox - switch in form', () => {
    it('should mount', () => {
        mountCheckboxInForm({ isSwitch: true });

        cy.get('vl-checkbox').shadow().find('input');
    });

    it('should be accessible', () => {
        mountCheckboxInForm({ isSwitch: true });
        cy.injectAxe();

        cy.checkA11y('vl-checkbox');
    });

    it('should be accessible on mobile', () => {
        mountCheckboxInForm({ isSwitch: true });

        cy.injectAxe();
        cy.viewport(320, 480);

        cy.checkA11y('vl-checkbox');
    });

    it('should validate', () => {
        mountCheckboxInForm({ isSwitch: true });

        cy.get('vl-form-message[for="confirmation"]').should('not.have.attr', 'show');
        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[for="confirmation"]').should('have.attr', 'show');
        cy.get('vl-checkbox').click();
        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[for="confirmation"]').should('not.have.attr', 'show');
    });

    it('should validate with initial value', () => {
        mountCheckboxInForm({ checked: true, isSwitch: true });

        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[for="confirmation"]').should('not.have.attr', 'show');
        cy.get('vl-checkbox').click();
        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[for="confirmation"]').should('have.attr', 'show');
    });

    it('should be disabled', () => {
        mountCheckboxInForm({ isSwitch: true, disabled: true });

        shouldBeDisabledSwitch();
        cy.get('vl-form-message[for="confirmation"]').should('not.have.attr', 'show');
        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[for="confirmation"]').should('not.have.attr', 'show');
    });

    it('should reset', () => {
        mountCheckboxInForm({ isSwitch: true });

        cy.get('vl-form-message[for="confirmation"]').should('not.have.attr', 'show');
        cy.get('button[type="submit"]').click();
        cy.get('vl-form-message[for="confirmation"]').should('have.attr', 'show');
        shouldHaveErrorStyleSwitch();
        cy.get('button[type="reset"]').click();
        cy.get('vl-form-message[for="confirmation"]').should('not.have.attr', 'show');
    });
});
