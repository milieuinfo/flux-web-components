import { registerWebComponents } from '@domg-wc/common-utilities';
import { vlGridStyles } from '@domg-wc/common-utilities/css';
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
            <div class=vl-grid-next">
                <div class="vl-column-next vl-column-next--3">
                    <label class="vl-form__label vl-form__label--block" for="confirmation">Bevestig *</label>
                </div>
                <div class="vl-column-next vl-column-next--9">
                    <vl-checkbox-next
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
                    </vl-checkbox-next>
                    <vl-error-message-next for="confirmation" state="valueMissing"
                        >Gelieve je gegevens te bevestigen.
                    </vl-error-message-next>
                </div>
                <div class="vl-column-next vl-column-next--9 vl-column-next--start-4">
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
    cy.get('vl-checkbox-next').should('have.attr', 'disabled');
    cy.get('vl-checkbox-next')
        .shadow()
        .find('.vl-checkbox')
        .shouldHaveComputedStyle({ style: 'color', value: 'rgb(51, 51, 50)' })
        .should('have.class', 'vl-checkbox--disabled');
};

const shouldBeDisabledSwitch = () => {
    cy.get('vl-checkbox-next').should('have.attr', 'disabled');
    cy.get('vl-checkbox-next')
        .shadow()
        .find('.vl-checkbox--switch__wrapper')
        .shouldHaveComputedStyle({ style: 'color', value: 'rgb(51, 51, 50)' })
        .should('have.class', 'vl-checkbox--disabled');
};

const shouldToggleCheckedWithClick = (clickTarget: string) => {
    cy.get('vl-checkbox-next').should('have.attr', 'checked');
    cy.get('vl-checkbox-next').shadow().find(clickTarget).click({ force: true });
    cy.get('vl-checkbox-next').should('not.have.attr', 'checked');
    cy.get('vl-checkbox-next').shadow().find(clickTarget).click({ force: true });
    cy.get('vl-checkbox-next').should('have.attr', 'checked');
};

const shouldHaveErrorStyleSwitch = () => {
    cy.get('vl-checkbox-next')
        .shadow()
        .find('.vl-checkbox--switch__wrapper')
        .should('have.class', 'vl-checkbox--error');

    cy.get('vl-checkbox-next')
        .shadow()
        .find('.vl-checkbox--switch__label')
        .shouldHaveComputedStyle({ pseudo: 'after', style: 'background-color', value: 'rgb(255, 255, 255)' })
        .shouldHaveComputedStyle({ pseudo: 'after', style: 'border-color', value: 'rgb(210, 55, 60)' })
        .shouldHaveComputedStyle({ pseudo: 'after', style: 'color', value: 'rgb(210, 55, 60)' });
};

describe('component - vl-checkbox-next', () => {
    it('should mount', () => {
        cy.mount(html` <vl-checkbox-next value=${value}>Bevestig.</vl-checkbox-next> `);

        cy.get('vl-checkbox-next').shadow().find('input');
    });

    it('should be accessible', () => {
        cy.mount(html` <vl-checkbox-next value=${value}>Bevestig.</vl-checkbox-next> `);
        cy.injectAxe();

        cy.checkA11y('vl-checkbox-next');
    });

    it('should be checked', () => {
        cy.mount(html` <vl-checkbox-next id="cy-test-id" value=${value} checked>Bevestig.</vl-checkbox-next> `);

        shouldToggleCheckedWithClick('.vl-checkbox__label');
        cy.get('vl-checkbox-next')
            .shadow()
            .find('.vl-checkbox__label')
            .find('.vl-checkbox__box')
            .shouldHaveComputedStyle({ pseudo: 'after', style: 'background-color', value: 'rgb(0, 85, 204)' });
    });

    it('should be disabled', () => {
        cy.mount(html` <vl-checkbox-next value=${value} disabled>Bevestig.</vl-checkbox-next> `);

        shouldBeDisabled();
    });

    it('should have error', () => {
        cy.mount(html` <vl-checkbox-next value=${value} error>Bevestig.</vl-checkbox-next> `);

        cy.get('vl-checkbox-next').should('have.attr', 'error');
        cy.get('vl-checkbox-next').shadow().find('.vl-checkbox').should('have.class', 'vl-checkbox--error');
        cy.get('vl-checkbox-next')
            .shadow()
            .find('i.vl-checkbox__box')
            .shouldHaveComputedStyle({ pseudo: ':after', style: 'background-color', value: 'rgb(255, 255, 255)' })
            .shouldHaveComputedStyle({ pseudo: ':after', style: 'border-color', value: 'rgb(210, 55, 60)' });
        cy.get('vl-checkbox-next').shadow().find('.vl-checkbox__toggle').click({ force: true });
        cy.get('vl-checkbox-next')
            .shadow()
            .find('i.vl-checkbox__box')
            .shouldHaveComputedStyle({ pseudo: ':before', style: 'color', value: 'rgb(210, 55, 60)' });
    });

    it('should dispatch vl-change & vl-input event on check and uncheck', () => {
        cy.mount(html` <vl-checkbox-next value=${value}>Bevestig.</vl-checkbox-next> `);
        cy.createStubForEvent('vl-checkbox-next', 'vl-change');
        cy.createStubForEvent('vl-checkbox-next', 'vl-input');

        cy.get('vl-checkbox-next').shadow().find('.vl-checkbox__label').click({ force: true });
        cy.get('@vl-input')
            .should('have.been.calledOnce')
            .its('lastCall.args.0.detail')
            .should('deep.include', { checked: true, value });
        cy.get('@vl-change')
            .should('have.been.calledTwice')
            .its('lastCall.args.0.detail')
            .should('deep.include', { checked: true, value });
        cy.get('vl-checkbox-next').shadow().find('.vl-checkbox__label').click({ force: true });
        cy.get('@vl-change').its('callCount').should('eq', 3);
        cy.get('@vl-change').its('lastCall.args.0.detail').should('deep.include', { checked: false });
        cy.get('@vl-input').its('callCount').should('eq', 2);
        cy.get('@vl-input').its('lastCall.args.0.detail').should('deep.include', { checked: false });
    });

    it('should dispatch vl-change but not vl-input event on programmatic check and uncheck', () => {
        cy.mount(html` <vl-checkbox-next value=${value}>Bevestig.</vl-checkbox-next> `);
        cy.createStubForEvent('vl-checkbox-next', 'vl-change');
        cy.createStubForEvent('vl-checkbox-next', 'vl-input');

        cy.get('vl-checkbox-next').invoke('attr', 'checked', true);
        cy.get('@vl-change')
            .should('have.been.calledOnce')
            .its('lastCall.args.0.detail')
            .should('deep.include', { checked: true, value });
        cy.get('@vl-input').its('callCount').should('eq', 0);

        cy.get('vl-checkbox-next').invoke('removeAttr', 'checked');
        cy.get('@vl-change').its('callCount').should('eq', 1);
        cy.get('@vl-change').its('lastCall.args.0.detail').should('deep.include', { checked: false });
        cy.get('@vl-input').its('callCount').should('eq', 0);
    });

    it('should dispatch vl-valid event on valid input', () => {
        cy.mount(html` <vl-checkbox-next value=${value} required>Bevestig.</vl-checkbox-next> `);
        cy.createStubForEvent('vl-checkbox-next', 'vl-valid');

        cy.get('vl-checkbox-next').shadow().find('.vl-checkbox__toggle').click({ force: true });
        cy.get('@vl-valid')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.include', { checked: true, value });
        cy.get('vl-checkbox-next').shadow().find('.vl-checkbox__toggle').click({ force: true });
        cy.get('@vl-valid').should('have.been.calledOnce');
    });
});

describe('component - vl-checkbox-next - in form', () => {
    it('should mount', () => {
        mountCheckboxInForm();

        cy.get('vl-checkbox-next').shadow().find('input');
    });

    it('should be accessible', () => {
        mountCheckboxInForm();
        cy.injectAxe();

        cy.checkA11y('vl-checkbox-next');
    });

    it('should be accessible on mobile', () => {
        mountCheckboxInForm();

        cy.injectAxe();
        cy.viewport(320, 480);
        cy.checkA11y('vl-checkbox-next');
    });

    it('should validate', () => {
        mountCheckboxInForm();

        cy.get('vl-error-message-next[for="confirmation"]').should('not.be.visible');
        cy.get('button[type="submit"]').click();
        cy.get('vl-error-message-next[for="confirmation"]').should('be.visible');
        cy.get('vl-checkbox-next').click();
        cy.get('vl-error-message-next[for="confirmation"]').should('not.be.visible');
    });

    it('should validate with initial value', () => {
        mountCheckboxInForm({ checked: true });

        cy.get('vl-error-message-next[for="confirmation"]').should('not.be.visible');
        cy.get('vl-checkbox-next').click();
        cy.get('button[type="submit"]').click();
        cy.get('vl-error-message-next[for="confirmation"]').should('be.visible');
        cy.get('vl-checkbox-next').click();
        cy.get('button[type="submit"]').click();
        cy.get('vl-error-message-next[for="confirmation"]').should('not.be.visible');
    });

    it('should be disabled', () => {
        mountCheckboxInForm({ disabled: true });

        shouldBeDisabled();
        cy.get('vl-error-message-next[for="confirmation"]').should('not.be.visible');
        cy.get('button[type="submit"]').click();
        cy.get('vl-error-message-next[for="confirmation"]').should('not.be.visible');
    });

    it('should reset', () => {
        mountCheckboxInForm({});

        cy.get('vl-error-message-next[for="confirmation"]').should('not.be.visible');
        cy.get('button[type="submit"]').click();
        cy.get('vl-error-message-next[for="confirmation"]').should('be.visible');
        cy.get('button[type="reset"]').click();
        cy.get('vl-error-message-next[for="confirmation"]').should('not.be.visible');
    });
});

describe('component - vl-checkbox-next - switch', () => {
    it('should mount', () => {
        cy.mount(html` <vl-checkbox-next value=${value} switch>Bevestig.</vl-checkbox-next> `);

        cy.get('vl-checkbox-next').shadow().find('input');
    });

    it('should be accessible', () => {
        cy.mount(
            html`
                <vl-checkbox-next id="cy-test-id" value=${value} switch label="test-label">Bevestig.</vl-checkbox-next>
            `
        );
        cy.injectAxe();

        cy.checkA11y('vl-checkbox-next');
    });

    it('should be checked', () => {
        cy.mount(html` <vl-checkbox-next id="cy-test-id" value=${value} switch checked>Bevestig.</vl-checkbox-next> `);

        shouldToggleCheckedWithClick('.vl-checkbox__label');
        cy.get('vl-checkbox-next')
            .shadow()
            .find('.vl-checkbox--switch__label')
            .shouldHaveComputedStyle({ style: 'background-color', value: 'rgb(0, 85, 204)' });
        cy.get('vl-checkbox-next').should('have.attr', 'checked');
        cy.get('vl-checkbox-next').should('have.attr', 'value', value);
    });

    it('should be disabled', () => {
        cy.mount(html` <vl-checkbox-next value=${value} switch disabled>Bevestig.</vl-checkbox-next> `);

        shouldBeDisabledSwitch();
    });

    it('should have error', () => {
        cy.mount(html` <vl-checkbox-next value=${value} switch error>Bevestig.</vl-checkbox-next> `);

        cy.get('vl-checkbox-next').should('have.attr', 'error');
        shouldHaveErrorStyleSwitch();
        cy.get('vl-checkbox-next').shadow().find('.vl-checkbox__label').click({ force: true });
        shouldHaveErrorStyleSwitch();
    });

    it('should dispatch vl-change & vl-input event on check and uncheck', () => {
        cy.mount(html` <vl-checkbox-next id="cy-test-id" value=${value} switch>Bevestig.</vl-checkbox-next> `);
        cy.createStubForEvent('vl-checkbox-next', 'vl-change');
        cy.createStubForEvent('vl-checkbox-next', 'vl-input');

        cy.get('vl-checkbox-next').shadow().find('.vl-checkbox__label').click({ force: true });
        cy.get('@vl-change')
            .should('have.been.calledTwice')
            .its('lastCall.args.0.detail')
            .should('deep.include', { checked: true, value });
        cy.get('@vl-input')
            .should('have.been.calledOnce')
            .its('lastCall.args.0.detail')
            .should('deep.include', { checked: true, value });

        cy.get('vl-checkbox-next').shadow().find('.vl-checkbox__label').click({ force: true });
        cy.get('@vl-change').its('callCount').should('eq', 3);
        cy.get('@vl-change').its('lastCall.args.0.detail').should('deep.include', { checked: false });
        cy.get('@vl-input').its('callCount').should('eq', 2);
        cy.get('@vl-input').its('lastCall.args.0.detail').should('deep.include', { checked: false });
    });

    it('should dispatch vl-change but not vl-input event on programmatic check and uncheck', () => {
        cy.mount(html` <vl-checkbox-next id="cy-test-id" value=${value} switch>Bevestig.</vl-checkbox-next> `);
        cy.createStubForEvent('vl-checkbox-next', 'vl-change');
        cy.createStubForEvent('vl-checkbox-next', 'vl-input');

        cy.get('vl-checkbox-next').invoke('attr', 'checked', true);
        cy.get('@vl-change')
            .should('have.been.calledOnce')
            .its('lastCall.args.0.detail')
            .should('deep.include', { checked: true, value });
        cy.get('@vl-input').its('callCount').should('eq', 0);

        cy.get('vl-checkbox-next').invoke('removeAttr', 'checked');
        cy.get('@vl-change').its('callCount').should('eq', 1);
        cy.get('@vl-change').its('lastCall.args.0.detail').should('deep.include', { checked: false });
        cy.get('@vl-input').its('callCount').should('eq', 0);
    });

    it('should dispatch vl-valid event on valid input', () => {
        cy.mount(html` <vl-checkbox-next id="cy-test-id" value=${value} switch required>Bevestig.</vl-checkbox-next> `);
        cy.createStubForEvent('vl-checkbox-next', 'vl-valid');

        cy.get('vl-checkbox-next').shadow().find('.vl-checkbox__label').click({ force: true });
        cy.get('@vl-valid')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.include', { checked: true, value });
        cy.get('vl-checkbox-next').shadow().find('.vl-checkbox__label').click({ force: true });
        cy.get('@vl-valid').should('have.been.calledOnce');
    });
});

describe('component - vl-checkbox-next - switch in form', () => {
    it('should mount', () => {
        mountCheckboxInForm({ isSwitch: true });

        cy.get('vl-checkbox-next').shadow().find('input');
    });

    it('should be accessible', () => {
        mountCheckboxInForm({ isSwitch: true });
        cy.injectAxe();

        cy.checkA11y('vl-checkbox-next');
    });

    it('should be accessible on mobile', () => {
        mountCheckboxInForm({ isSwitch: true });

        cy.injectAxe();
        cy.viewport(320, 480);

        cy.checkA11y('vl-checkbox-next');
    });

    it('should validate', () => {
        mountCheckboxInForm({ isSwitch: true });

        cy.get('vl-error-message-next[for="confirmation"]').should('not.be.visible');
        cy.get('button[type="submit"]').click();
        cy.get('vl-error-message-next[for="confirmation"]').should('be.visible');
        cy.get('vl-checkbox-next').click();
        cy.get('button[type="submit"]').click();
        cy.get('vl-error-message-next[for="confirmation"]').should('not.be.visible');
    });

    it('should validate with initial value', () => {
        mountCheckboxInForm({ checked: true, isSwitch: true });

        cy.get('button[type="submit"]').click();
        cy.get('vl-error-message-next[for="confirmation"]').should('not.be.visible');
        cy.get('vl-checkbox-next').click();
        cy.get('button[type="submit"]').click();
        cy.get('vl-error-message-next[for="confirmation"]').should('be.visible');
    });

    it('should be disabled', () => {
        mountCheckboxInForm({ isSwitch: true, disabled: true });

        shouldBeDisabledSwitch();
        cy.get('vl-error-message-next[for="confirmation"]').should('not.be.visible');
        cy.get('button[type="submit"]').click();
        cy.get('vl-error-message-next[for="confirmation"]').should('not.be.visible');
    });

    it('should reset', () => {
        mountCheckboxInForm({ isSwitch: true });

        cy.get('vl-error-message-next[for="confirmation"]').should('not.be.visible');
        cy.get('button[type="submit"]').click();
        cy.get('vl-error-message-next[for="confirmation"]').should('be.visible');
        shouldHaveErrorStyleSwitch();
        cy.get('button[type="reset"]').click();
        cy.get('vl-error-message-next[for="confirmation"]').should('not.be.visible');
    });
});
