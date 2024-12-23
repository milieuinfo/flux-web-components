import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlSelectComponent } from './vl-select.component';
import { SelectOption } from './vl-select.model';

registerWebComponents([VlSelectComponent]);

const options: SelectOption[] = [
    { label: 'Hasselt', value: 'hasselt' },
    { label: 'Turnhout', value: 'turnhout' },
    { label: 'Knokke-Heist', value: 'knokke-heist' },
    { label: 'Waregem', value: 'waregem' },
    { label: 'Lier', value: 'lier' },
    { label: 'Rio Piedras', value: 'rio piedras' },
];

describe('component - vl-select-next', () => {
    it('should mount', () => {
        cy.mount(html`<vl-select-next label="geboorteplaats" .options=${options}></vl-select-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next').shadow().find('select');
    });

    it('should set id', () => {
        cy.mount(html`<vl-select-next id="test-id" label="geboorteplaats" .options=${options}></vl-select-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next').shadow().find('select').should('have.id', 'test-id');
    });

    it('should set name', () => {
        cy.mount(html`<vl-select-next name="test-name" label="geboorteplaats" .options=${options}></vl-select-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next').shadow().find('select').should('have.attr', 'name', 'test-name');
    });

    it('should set label', () => {
        cy.mount(html`<vl-select-next label="geboorteplaats" .options=${options}></vl-select-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next').shadow().find('select').should('have.attr', 'aria-label', 'geboorteplaats');
    });

    it('should set required', () => {
        cy.mount(html`<vl-select-next label="geboorteplaats" required .options=${options}></vl-select-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next').shadow().find('select').should('have.attr', 'required');
    });

    it('should set disabled', () => {
        cy.mount(html`<vl-select-next label="geboorteplaats" disabled .options=${options}></vl-select-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next').shadow().find('select').should('have.class', 'vl-select--disabled');
        cy.get('vl-select-next').shadow().find('select').should('be.disabled');
    });

    it('should set error', () => {
        cy.mount(html`<vl-select-next label="geboorteplaats" error .options=${options}></vl-select-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next').shadow().find('select').should('have.class', 'vl-select--error');
        cy.get('vl-select-next').shadow().find('select').should('have.attr', 'error');
    });

    it('should set success', () => {
        cy.mount(html`<vl-select-next label="geboorteplaats" success .options=${options}></vl-select-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next').shadow().find('select').should('have.class', 'vl-select--success');
    });

    it('should set placeholder', () => {
        cy.mount(
            html`<vl-select-next
                label="geboorteplaats"
                placeholder="Selecteer je geboorteplaats"
                .options=${options}
            ></vl-select-next>`
        );
        cy.injectAxe();

        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next').shadow().find('.vl-select__placeholder').contains('Selecteer je geboorteplaats');
    });

    it('should be deletable', () => {
        cy.mount(
            html`<vl-select-next
                label="geboorteplaats"
                .options=${[{ label: 'Hasselt', value: 'hasselt', selected: true }]}
            ></vl-select-next>`
        );
        cy.injectAxe();

        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next').shadow().find('button.vl-select__button span.vl-icon.vl-vi.vl-vi-close');
    });

    it('should set not-deletable', () => {
        cy.mount(
            html`<vl-select-next
                label="geboorteplaats"
                not-deletable
                .options=${[{ label: 'Hasselt', value: 'hasselt', selected: true }]}
            ></vl-select-next>`
        );
        cy.injectAxe();

        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next').shadow().find('button.vl-select__button').should('not.exist');
    });

    it('should set autocomplete', () => {
        cy.mount(
            html`<vl-select-next label="geboorteplaats" autocomplete="name" .options=${options}></vl-select-next>`
        );
        cy.injectAxe();

        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next').shadow().find('select').should('have.attr', 'autocomplete', 'name');
    });

    it('should set block', () => {
        cy.mount(html`<vl-select-next label="geboorteplaats" block .options=${options}></vl-select-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next').shadow().find('select').should('have.class', 'vl-select--block');
    });

    it('should dispatch vl-change event on select and delete option', () => {
        cy.mount(html`<vl-select-next label="geboorteplaats" .options=${options}></vl-select-next>`);
        cy.injectAxe();

        cy.createStubForEvent('vl-select-next', 'vl-change');
        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next').shadow().find('select').select('turnhout').trigger('change');
        cy.get('@vl-change')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { value: 'turnhout' });
        cy.get('vl-select-next').shadow().find('button.vl-select__button').click();
        cy.get('@vl-change')
            .should('have.been.calledTwice')
            .its('secondCall.args.0.detail')
            .should('deep.equal', { value: null });
        cy.checkA11y('vl-select-next');
    });

    it('should dispatch vl-select event when the user selects and deletes an option', () => {
        cy.mount(html`<vl-select-next label="geboorteplaats" .options=${options}></vl-select-next>`);
        cy.injectAxe();

        cy.createStubForEvent('vl-select-next', 'vl-input');
        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next').shadow().find('select').select('turnhout');

        cy.get('@vl-input')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { value: 'turnhout' });
        cy.get('vl-select-next').shadow().find('button.vl-select__button').click();
        cy.get('@vl-input')
            .should('have.been.calledTwice')
            .its('secondCall.args.0.detail')
            .should('deep.equal', { value: null });
        cy.checkA11y('vl-select-next');
    });

    it('should dispatch vl-change, but not vl-select when programmatically selecting and deleting option', () => {
        cy.mount(html`<vl-select-next label="geboorteplaats" .options=${options}></vl-select-next>`);
        cy.injectAxe();

        cy.createStubForEvent('vl-select-next', 'vl-change');
        cy.createStubForEvent('vl-select-next', 'vl-input');
        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next').then((el) => {
            const select = el[0] as VlSelectComponent;
            const filteredOptions = select.options.filter((option) => option.value !== 'turnhout');
            select.options = [...filteredOptions, { label: 'Turnhout', value: 'turnhout', selected: true }];
        });
        cy.get('@vl-change')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { value: 'turnhout' });
        cy.get('@vl-input').should('to.not.have.been.called.at.all');

        cy.get('vl-select-next').then((el) => {
            const select = el[0] as VlSelectComponent;
            const filteredOptions = select.options.filter((option) => option.value !== 'turnhout');
            select.options = [...filteredOptions, { label: 'Turnhout', value: 'turnhout' }];
        });
        cy.get('@vl-change')
            .should('have.been.calledTwice')
            .its('secondCall.args.0.detail')
            .should('deep.equal', { value: null });
        cy.get('@vl-input').should('to.not.have.been.called.at.all');
        cy.checkA11y('vl-select-next');
    });

    it('should dispatch vl-valid event on valid selection', () => {
        cy.mount(html`<vl-select-next label="geboorteplaats" .options=${options} required></vl-select-next>`);
        cy.injectAxe();

        cy.createStubForEvent('vl-select-next', 'vl-valid');
        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next').shadow().find('select').select('hasselt').trigger('change');
        cy.get('@vl-valid')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { value: 'hasselt' });
        cy.get('vl-select-next').shadow().find('button.vl-select__button').click();
        cy.get('@vl-valid').should('have.been.calledOnce');
        cy.checkA11y('vl-select-next');
    });

    it('should select option', () => {
        cy.mount(html`<vl-select-next label="geboorteplaats" .options=${options}></vl-select-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next').shadow().find('select').select('hasselt').trigger('change');
        cy.get('vl-select-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Hasselt')
            .should('have.attr', 'selected');
        cy.get('vl-select-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Turnhout')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Knokke-Heist')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Waregem')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Lier')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Rio Piedras')
            .should('not.have.attr', 'selected');
        cy.checkA11y('vl-select-next');
    });

    it('should delete option', () => {
        cy.mount(html`<vl-select-next label="geboorteplaats" .options=${options}></vl-select-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next').shadow().find('select').select('hasselt').trigger('change');
        cy.get('vl-select-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Hasselt')
            .should('have.attr', 'selected');
        cy.get('vl-select-next').shadow().find('button.vl-select__button').click();
        cy.get('vl-select-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Hasselt')
            .should('not.have.attr', 'selected');
        cy.checkA11y('vl-select-next');
    });

    it('should select option programmatically', () => {
        const options: SelectOption[] = [
            { label: 'Hasselt', value: 'hasselt', selected: true },
            { label: 'Turnhout', value: 'turnhout' },
            { label: 'Knokke-Heist', value: 'knokke-heist' },
            { label: 'Waregem', value: 'waregem' },
            { label: 'Lier', value: 'lier' },
            { label: 'Rio Piedras', value: 'rio piedras' },
        ];

        cy.mount(html`<vl-select-next label="geboorteplaats" .options=${options}></vl-select-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Hasselt')
            .should('have.attr', 'selected');
        cy.get('vl-select-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Turnhout')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Knokke-Heist')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Waregem')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Lier')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Rio Piedras')
            .should('not.have.attr', 'selected');
        cy.checkA11y('vl-select-next');
    });

    it('should disable option programmatically', () => {
        const options: SelectOption[] = [
            { label: 'Hasselt', value: 'hasselt', disabled: true },
            { label: 'Turnhout', value: 'turnhout' },
            { label: 'Knokke-Heist', value: 'knokke-heist' },
            { label: 'Waregem', value: 'waregem' },
            { label: 'Lier', value: 'lier' },
            { label: 'Rio Piedras', value: 'rio piedras' },
        ];

        cy.mount(html`<vl-select-next label="geboorteplaats" .options=${options}></vl-select-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Hasselt')
            .should('have.attr', 'disabled');
        cy.checkA11y('vl-select-next');
    });

    it('should use groups', () => {
        const options: SelectOption[] = [
            { label: 'Hasselt', value: 'hasselt', group: 'België' },
            { label: 'Turnhout', value: 'turnhout', group: 'België' },
            { label: 'Knokke-Heist', value: 'knokke-heist', group: 'België' },
            { label: 'Waregem', value: 'waregem', group: 'België' },
            { label: 'Lier', value: 'lier', group: 'België' },
            { label: 'Rio Piedras', value: 'rio piedras', group: 'Puerto Rico' },
        ];

        cy.mount(html`<vl-select-next label="geboorteplaats" .options=${options}></vl-select-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next')
            .shadow()
            .find('select')
            .find('optgroup[label="België"]')
            .find('option')
            .should('have.length', 5);
        cy.get('vl-select-next')
            .shadow()
            .find('select')
            .find('optgroup[label="Puerto Rico"]')
            .find('option')
            .should('have.length', 1);
        cy.checkA11y('vl-select-next');
    });
});

describe('component - vl-select-next - in form', () => {
    beforeEach(() => {
        cy.mount(html`
            <form
                id="form"
                class="vl-form"
                @submit=${(e: Event) => {
                    e.preventDefault();
                }}
            >
                <vl-select-next
                    id="geboorteplaats"
                    name="geboorteplaats"
                    placeholder="Selecteer je geboorteplaats"
                    .options=${options}
                    required
                ></vl-select-next>
                <button class="vl-button" type="submit">Verstuur</button>
                <button class="vl-button" type="reset">Reset</button>
            </form>
        `);
    });

    it('should submit value', () => {
        const submittedFormData = {
            geboorteplaats: 'hasselt',
        };

        cy.createStubForEvent('form', 'submit');

        cy.get('vl-select-next').shadow().find('select').select('hasselt').trigger('change');
        cy.get('form').find('button[type="submit"]').click();
        cy.get('@submit').should('have.been.calledOnce');
        cy.get('form').then(($el) => {
            const formData = Object.fromEntries(new FormData($el.get(0) as HTMLFormElement));
            expect(formData).to.deep.equal(submittedFormData);
        });
    });

    it('should reset value', () => {
        cy.createStubForEvent('form', 'reset');

        cy.get('vl-select-next').shadow().find('select').select('hasselt').trigger('change');
        cy.get('form').find('button[type="reset"]').click();
        cy.get('@reset').should('have.been.calledOnce');
        cy.get('form').then(($el) => {
            const formData = Object.fromEntries(new FormData($el.get(0) as HTMLFormElement));
            expect(formData).to.deep.equal({});
        });
        cy.get('vl-select-next')
            .shadow()
            .find('select')
            .find('option:selected')
            .should('contain', 'Selecteer je geboorteplaats');

        // we resetten een lege select; in dat geval moet de placeholder hetzelfde blijven
        cy.get('form').find('button[type="reset"]').click();

        cy.get('vl-select-next')
            .shadow()
            .find('select')
            .find('option:selected')
            .should('contain', 'Selecteer je geboorteplaats');
    });

    it('should prevent form submission on validation error', () => {
        const submittedFormData = {
            geboorteplaats: 'hasselt',
        };

        cy.createStubForEvent('form', 'submit');

        cy.get('form').find('button[type="submit"]').click();
        cy.get('@submit').should('not.have.been.called');
        cy.get('vl-select-next').shadow().find('select').select('hasselt', { force: true }).trigger('change');
        cy.get('form').find('button[type="submit"]').click();
        cy.get('@submit').should('have.been.calledOnce');
        cy.get('form').then(($el) => {
            const formData = Object.fromEntries(new FormData($el.get(0) as HTMLFormElement));
            expect(formData).to.deep.equal(submittedFormData);
        });
    });
});
