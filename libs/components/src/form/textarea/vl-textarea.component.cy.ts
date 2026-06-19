import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlTextareaComponent } from './vl-textarea.component';
import { VlFormMessageComponent } from '../form-message/vl-form-message.component';

registerWebComponents([VlTextareaComponent, VlFormMessageComponent]);

describe('vl-textarea - properties & states', () => {
    beforeEach(() => {
        cy.viewport(1200, 800);
    });

    it('should mount', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-textarea></vl-textarea>
            </div>
        `);

        cy.get('vl-textarea').shadow().find('textarea');
        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('textarea-mount');
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
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-textarea block></vl-textarea>
            </div>
        `);

        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('textarea-block');
        cy.get('vl-textarea').shadow().find('textarea').should('have.class', 'vl-textarea--block');
    });

    it('should set required', () => {
        cy.mount(html`<vl-textarea required></vl-textarea>`);

        cy.get('vl-textarea').shadow().find('textarea').should('have.attr', 'required');
    });

    it('should set disabled', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-textarea disabled></vl-textarea>
            </div>
        `);

        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('textarea-disabled');
        cy.get('vl-textarea').should('be.disabled');
        cy.get('vl-textarea').shadow().find('textarea').should('have.class', 'vl-textarea--disabled');
        cy.get('vl-textarea').shadow().find('textarea').should('be.disabled');
    });

    it('should set error', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-textarea error></vl-textarea>
            </div>
        `);

        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('textarea-error');
        cy.get('vl-textarea').shadow().find('textarea').should('have.class', 'vl-textarea--error');
        cy.get('vl-textarea').shadow().find('textarea').should('have.attr', 'error');
        cy.get('vl-textarea')
            .shadow()
            .find('textarea')
            .shouldHaveComputedStyle({ style: 'border-color', value: 'rgb(210, 55, 60)' })
            .shouldHaveComputedStyle({ style: 'background-color', value: 'rgb(251, 235, 236)' });
    });

    it('should set success', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-textarea success></vl-textarea>
            </div>
        `);

        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('textarea-success');
        cy.get('vl-textarea').shadow().find('textarea').should('have.class', 'vl-textarea--success');
        cy.get('vl-textarea')
            .shadow()
            .find('textarea')
            .shouldHaveComputedStyle({ style: 'border-color', value: 'rgb(0, 158, 71)' });
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
});

describe('vl-textarea - character count', () => {
    it('should not render a counter without the character-count attribute', () => {
        cy.mount(html`<vl-textarea max-length="50"></vl-textarea>`);

        cy.get('vl-textarea').shadow().find('.vl-textarea__counter').should('not.exist');
        cy.get('vl-textarea').shadow().find('.vl-textarea__counter-status').should('not.exist');
    });

    it('should not render a counter when character-count is set without max-length', () => {
        cy.mount(html`<vl-textarea character-count></vl-textarea>`);

        cy.get('vl-textarea').shadow().find('.vl-textarea__counter').should('not.exist');
    });

    it('should render the counter in the {current}/{max} format', () => {
        cy.mount(html`<vl-textarea character-count max-length="50" value="hallo"></vl-textarea>`);

        cy.get('vl-textarea').shadow().find('.vl-textarea__counter').should('have.text', '5/50');
        cy.get('vl-textarea').shadow().find('.vl-textarea__counter').should('have.attr', 'aria-hidden', 'true');
    });

    it('should update the counter live while typing', () => {
        cy.mount(html`<vl-textarea character-count max-length="50"></vl-textarea>`);

        cy.get('vl-textarea').shadow().find('.vl-textarea__counter').should('have.text', '0/50');
        cy.get('vl-textarea').shadow().find('textarea').type('test');
        cy.get('vl-textarea').shadow().find('.vl-textarea__counter').should('have.text', '4/50');
    });

    it('should update the counter on programmatic value change', () => {
        cy.mount(html`<vl-textarea character-count max-length="50"></vl-textarea>`);

        cy.get('vl-textarea').invoke('attr', 'value', 'programmatic');
        cy.get('vl-textarea').shadow().find('.vl-textarea__counter').should('have.text', '12/50');
    });

    it('should keep the live region empty above the 10 character threshold', () => {
        cy.mount(html`<vl-textarea character-count max-length="50"></vl-textarea>`);

        // 39 chars => 11 remaining, still above threshold.
        cy.get('vl-textarea').shadow().find('textarea').type('a'.repeat(39));
        cy.get('vl-textarea').shadow().find('.vl-textarea__counter-status').should('have.text', '');
    });

    it('should announce the remaining characters from the last 10 characters', () => {
        cy.mount(html`<vl-textarea character-count max-length="50"></vl-textarea>`);

        // 40 chars => 10 remaining, threshold reached.
        cy.get('vl-textarea').shadow().find('textarea').type('a'.repeat(40));
        cy.get('vl-textarea')
            .shadow()
            .find('.vl-textarea__counter-status')
            .should('have.text', 'Nog 10 tekens beschikbaar');
    });

    it('should use the singular form when one character remains', () => {
        cy.mount(html`<vl-textarea character-count max-length="50"></vl-textarea>`);

        cy.get('vl-textarea').shadow().find('textarea').type('a'.repeat(49));
        cy.get('vl-textarea')
            .shadow()
            .find('.vl-textarea__counter-status')
            .should('have.text', 'Nog 1 teken beschikbaar');
    });

    it('should announce zero remaining characters at the limit', () => {
        cy.mount(html`<vl-textarea character-count max-length="50"></vl-textarea>`);

        cy.get('vl-textarea').shadow().find('textarea').type('a'.repeat(50));
        cy.get('vl-textarea').shadow().find('.vl-textarea__counter').should('have.text', '50/50');
        cy.get('vl-textarea')
            .shadow()
            .find('.vl-textarea__counter-status')
            .should('have.text', 'Nog 0 tekens beschikbaar');
    });

    it('should keep the live region permanently in the DOM with polite/atomic semantics', () => {
        cy.mount(html`<vl-textarea character-count max-length="50"></vl-textarea>`);

        cy.get('vl-textarea')
            .shadow()
            .find('.vl-textarea__counter-status')
            .should('have.attr', 'aria-live', 'polite')
            .and('have.attr', 'aria-atomic', 'true');
    });

    it('should be accessible with the counter enabled', () => {
        cy.mount(html`<vl-textarea label="bericht" character-count max-length="50" value="hallo"></vl-textarea>`);
        cy.injectAxe();

        cy.checkA11y('vl-textarea');
    });
});

describe('vl-textarea - events', () => {
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

    it('should not submit the form on Enter', () => {
        cy.mount(html`
            <form
                @submit=${(e: Event) => {
                    e.preventDefault();
                }}
            >
                <vl-textarea label="test-label"></vl-textarea>
                <button type="submit">Submit</button>
            </form>
        `);
        cy.createStubForEvent('form', 'submit');

        cy.get('vl-textarea').shadow().find('textarea').type('line 1{enter}line 2');
        cy.get('@submit').should('not.have.been.called');
        cy.get('vl-textarea').shadow().find('textarea').should('have.value', 'line 1\nline 2');
    });

    it('should dispatch vl-valid event on valid input', () => {
        cy.mount(html`<vl-textarea required min-length="4"></vl-textarea>`);

        cy.createStubForEvent('vl-textarea', 'vl-valid');
        cy.get('vl-textarea').shadow().find('textarea').type('test');
        cy.get('@vl-valid').should('have.been.calledOnce');
        cy.get('@vl-valid').its('firstCall.args.0.detail').should('deep.equal', { value: 'test' });
    });
});

describe('vl-textarea - form integration', () => {
    it('should reset form', () => {
        cy.mount(html`
            <form>
                <vl-textarea name="test" value="initieel"></vl-textarea>
                <button type="reset">Reset</button>
            </form>
        `);

        cy.get('vl-textarea').shadow().find('textarea').clear().type('gewijzigd');
        cy.get('vl-textarea').shadow().find('textarea').should('have.value', 'gewijzigd');
        cy.get('button[type="reset"]').click();
        cy.get('vl-textarea').shadow().find('textarea').should('have.value', 'initieel');
    });
});

describe('vl-textarea - blur-validation', () => {
    const mountWithValidation = () => {
        cy.mount(html`
            <form>
                <vl-textarea id="ta" name="ta" required min-length="3" blur-validation></vl-textarea>
                <vl-form-message for="ta" state="valueMissing">Gelieve een waarde in te vullen.</vl-form-message>
                <vl-form-message for="ta" state="tooShort">Minimum 3 karakters.</vl-form-message>
                <button type="reset">Reset</button>
            </form>
        `);
    };

    it('should show error on blur after focus, even without mutation', () => {
        mountWithValidation();
        cy.get('vl-textarea').shadow().find('textarea').focus().blur();
        cy.get('vl-form-message[state="valueMissing"]').should('have.attr', 'show');
    });

    it('should show error on blur after typing invalid value', () => {
        mountWithValidation();
        cy.get('vl-textarea').shadow().find('textarea').type('a').blur();
        cy.get('vl-form-message[state="tooShort"]').should('have.attr', 'show');
    });

    it('should live-revalidate to valid', () => {
        mountWithValidation();
        cy.get('vl-textarea').shadow().find('textarea').type('a').blur();
        cy.get('vl-form-message[state="tooShort"]').should('have.attr', 'show');
        cy.get('vl-textarea').shadow().find('textarea').focus().type('bc');
        cy.get('vl-form-message[state="tooShort"]').should('not.have.attr', 'show');
    });
});
