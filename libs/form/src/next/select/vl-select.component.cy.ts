import { registerWebComponents } from '@domg-wc/common-utilities';
import { html } from 'lit';
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

const optionsWithSelected = [...options];
optionsWithSelected[0] = { ...optionsWithSelected[0], selected: true };

const optionsWithDisabled = [...options];
optionsWithDisabled[0] = { ...optionsWithDisabled[0], disabled: true };

const optionsGrouped: SelectOption[] = ['België', 'België', 'België', 'België', 'België', 'Puerto Rico'].map(
    (group, i) => ({ ...options[i], group })
);

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
        cy.mount(html`<vl-select-next label="geboorteplaats" .options=${optionsWithSelected}></vl-select-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next').shadow().find('button.vl-select__button span.vl-icon.vl-vi.vl-vi-close');
    });

    it('should set not-deletable', () => {
        cy.mount(
            html`<vl-select-next label="geboorteplaats" not-deletable .options=${optionsWithSelected}></vl-select-next>`
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
            .should('deep.equal', { value: '' });
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
            .should('deep.equal', { value: '' });
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
            .should('deep.equal', { value: '' });
        cy.get('@vl-input').should('to.not.have.been.called.at.all');
        cy.checkA11y('vl-select-next');
    });

    it('should dispatch vl-valid event on valid selection', () => {
        cy.mount(html`<vl-select-next label="geboorteplaats" .options=${options} required></vl-select-next>`);
        cy.injectAxe();

        cy.createStubForEvent('vl-select-next', 'vl-valid');
        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next').shadow().find('select').select(options[0].value).trigger('change');
        cy.get('@vl-valid')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { value: options[0].value });
        cy.get('vl-select-next').shadow().find('button.vl-select__button').click();
        cy.get('@vl-valid').should('have.been.calledOnce');
        cy.checkA11y('vl-select-next');
    });

    it('should select option', () => {
        cy.mount(html`<vl-select-next label="geboorteplaats" .options=${options}></vl-select-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next').shadow().find('select').select(options[0].value).trigger('change');
        options.forEach(({ label }, i) => {
            cy.get('vl-select-next')
                .shadow()
                .find('select')
                .find('option')
                .contains(label!)
                .should(`${i === 0 ? '' : 'not.'}have.attr`, 'selected');
        });
        cy.checkA11y('vl-select-next');
    });

    it('should delete option', () => {
        cy.mount(html`<vl-select-next label="geboorteplaats" .options=${options}></vl-select-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next').shadow().find('select').select(options[0].value).trigger('change');
        cy.get('vl-select-next')
            .shadow()
            .find('select')
            .find('option')
            .contains(options[0].label!)
            .should('have.attr', 'selected');
        cy.get('vl-select-next').shadow().find('button.vl-select__button').click();
        cy.get('vl-select-next')
            .shadow()
            .find('select')
            .find('option')
            .contains(options[0].label!)
            .should('not.have.attr', 'selected');
        cy.checkA11y('vl-select-next');
    });

    it('should select option programmatically', () => {
        cy.mount(html`<vl-select-next label="geboorteplaats" .options=${optionsWithSelected}></vl-select-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-next');
        optionsWithSelected.forEach(({ label }, i) => {
            cy.get('vl-select-next')
                .shadow()
                .find('select')
                .find('option')
                .contains(label!)
                .should(`${i === 0 ? '' : 'not.'}have.attr`, 'selected');
        });
        cy.checkA11y('vl-select-next');
    });

    it('should disable option programmatically', () => {
        cy.mount(html`<vl-select-next label="geboorteplaats" .options=${optionsWithDisabled}></vl-select-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next')
            .shadow()
            .find('select')
            .find('option')
            .contains(optionsWithDisabled[0].label!)
            .should('have.attr', 'disabled');
        cy.checkA11y('vl-select-next');
    });

    it('should use groups', () => {
        cy.mount(html`<vl-select-next label="geboorteplaats" .options=${optionsGrouped}></vl-select-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next')
            .shadow()
            .find('select')
            .find(`optgroup[label="${optionsGrouped[0].group}"]`)
            .find('option')
            .should('have.length', 5);
        cy.get('vl-select-next')
            .shadow()
            .find('select')
            .find(`optgroup[label="${optionsGrouped[5].group}"]`)
            .find('option')
            .should('have.length', 1);
        cy.checkA11y('vl-select-next');
    });

    it('should be able to add options dynamically and show the placeholder if none of the options are selected', () => {
        const mockPlaceholder = 'Mock placeholder';
        cy.mount(html`<vl-select-next placeholder="${mockPlaceholder}"></vl-select-next>`);
        cy.wait(0)
            .get('vl-select-next')
            .then(($vlSelect) => {
                if ($vlSelect) $vlSelect[0].options = options;
            });
        let selectedValue: string;
        cy.wait(0)
            .get('vl-select-next')
            .then(($vlSelect) => {
                selectedValue = $vlSelect[0].value;
            })
            .shadow()
            .find('select')
            .then(
                // De lege value van de `vl-select-next` moet `""` zijn om de placeholder te tonen.
                // `null` of `undefined` doen dit niet en zorgen ervoor dat het eerstvolgende element getoond wordt.
                ($select) => expect($select.children(`option[value="${String(selectedValue)}"]`)[0]).not.to.be.undefined
            );
    });

    it('should be able to add options dynamically and show the selected option', () => {
        cy.mount(html`<vl-select-next></vl-select-next>`);
        cy.wait(0)
            .get('vl-select-next')
            .then(($vlSelect) => {
                if ($vlSelect) {
                    $vlSelect[0].options = optionsWithSelected;
                    $vlSelect[0].setValue(optionsWithSelected[0].value);
                }
            });
        let selectedValue: string;
        cy.wait(0)
            .get('vl-select-next')
            .then(($vlSelect) => {
                selectedValue = $vlSelect[0].value;
            })
            .shadow()
            .find('select')
            .then(
                ($select) =>
                    expect($select.children(`option[value="${String(selectedValue)}"]`)[0]?.getAttribute('selected'))
                        .not.to.be.undefined
            );
    });
});

describe('component - vl-select - in form', () => {
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
                <br />
                <br />
            </form>
        `);
    });

    it('should submit value', () => {
        const submittedFormData = {
            geboorteplaats: options[0].value,
        };

        cy.createStubForEvent('form', 'submit');

        cy.get('vl-select-next').shadow().find('select').select(options[0].value).trigger('change');
        cy.get('form').find('button[type="submit"]').click();
        cy.get('@submit').should('have.been.calledOnce');
        cy.get('form').then(($el) => {
            const formData = Object.fromEntries(new FormData($el.get(0) as HTMLFormElement));
            expect(formData).to.deep.equal(submittedFormData);
        });
    });

    it('should reset value', () => {
        cy.createStubForEvent('form', 'reset');

        cy.get('vl-select-next').shadow().find('select').select(options[0].value).trigger('change');
        cy.get('form').then(($el) => {
            const formData = Object.fromEntries(new FormData($el.get(0) as HTMLFormElement));
            expect(formData).to.deep.equal({ geboorteplaats: options[0].value });
        });
        cy.get('form').find('button[type="reset"]').click();
        cy.get('@reset').should('have.been.calledOnce');
        cy.get('form').then(($el) => {
            const formData = Object.fromEntries(new FormData($el.get(0) as HTMLFormElement));
            expect(formData).to.deep.equal({ geboorteplaats: '' });
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

    it('should reset value with dynamically changed preselected options', () => {
        cy.createStubForEvent('form', 'reset');

        cy.get('vl-select-next').shadow().find('select').select(options[0].value).trigger('change');
        cy.get('form').then(($el) => {
            const formData = Object.fromEntries(new FormData($el.get(0) as HTMLFormElement));
            expect(formData).to.deep.equal({ geboorteplaats: options[0].value });
        });
        cy.get('form').find('button[type="reset"]').click();
        cy.get('@reset').should('have.been.calledOnce');
        cy.get('form').then(($el) => {
            const formData = Object.fromEntries(new FormData($el.get(0) as HTMLFormElement));
            expect(formData).to.deep.equal({ geboorteplaats: '' });
        });
        cy.get('vl-select-next')
            .shadow()
            .find('select')
            .find('option:selected')
            .should('contain', 'Selecteer je geboorteplaats');

        cy.get('vl-select-next').then((el) => {
            const select = el[0] as VlSelectComponent;
            select.initialOptions = [
                { label: 'Hasselt', value: 'hasselt' },
                { label: 'Turnhout', value: 'turnhout' },
                { label: 'Knokke-Heist', value: 'knokke-heist' },
                { label: 'Waregem', value: 'waregem' },
                { label: 'Lier', value: 'lier' },
                { label: 'Rio Piedras', value: 'rio piedras', selected: true },
            ];
        });

        // we resetten een lege select; in dat geval moet de placeholder hetzelfde blijven
        cy.get('form').find('button[type="reset"]').click();

        cy.get('vl-select-next').shadow().find('select').find('option:selected').should('contain', 'Rio Piedras');
    });

    it('should reset value with dynamically changed preselected options, set by attribute', () => {
        cy.createStubForEvent('form', 'reset');

        cy.get('vl-select-next').shadow().find('select').select(options[0].value, { force: true }).trigger('change');
        cy.get('form').then(($el) => {
            const formData = Object.fromEntries(new FormData($el.get(0) as HTMLFormElement));
            expect(formData).to.deep.equal({ geboorteplaats: options[0].value });
        });
        cy.get('form').find('button[type="reset"]').click();
        cy.get('@reset').should('have.been.calledOnce');
        cy.get('form').then(($el) => {
            const formData = Object.fromEntries(new FormData($el.get(0) as HTMLFormElement));
            expect(formData).to.deep.equal({ geboorteplaats: '' });

            cy.get('vl-select-next')
                .shadow()
                .find('select')
                .find('option:selected')
                .should('contain', 'Selecteer je geboorteplaats');

            const select = document.querySelector('vl-select-next') as VlSelectComponent;
            select.setAttribute(
                'initial-options',
                JSON.stringify([
                    { label: 'Hasselt', value: 'hasselt' },
                    { label: 'Turnhout', value: 'turnhout' },
                    { label: 'Knokke-Heist', value: 'knokke-heist' },
                    { label: 'Waregem', value: 'waregem' },
                    { label: 'Lier', value: 'lier' },
                    { label: 'Rio Piedras', value: 'rio piedras', selected: true },
                ])
            );

            cy.get('form').find('button[type="reset"]').click();
            cy.get('vl-select-next').shadow().find('select').find('option:selected').should('contain', 'Rio Piedras');
            cy.get('form').then(($el) => {
                const formData = Object.fromEntries(new FormData($el.get(0) as HTMLFormElement));
                expect(formData).to.deep.equal({ geboorteplaats: 'rio piedras' });
            });
        });
    });

    it('should prevent form submission on validation error', () => {
        const submittedFormData = {
            geboorteplaats: options[0].value,
        };

        cy.createStubForEvent('form', 'submit');

        cy.get('form').find('button[type="submit"]').click();
        cy.get('@submit').should('not.have.been.called');
        cy.get('vl-select-next').shadow().find('select').select(options[0].value, { force: true }).trigger('change');
        cy.get('form').find('button[type="submit"]').click();
        cy.get('@submit').should('have.been.calledOnce');
        cy.get('form').then(($el) => {
            const formData = Object.fromEntries(new FormData($el.get(0) as HTMLFormElement));
            expect(formData).to.deep.equal(submittedFormData);
        });
    });
});

describe('component - vl-select - declarative options', () => {
    it('should mount with declarative options', () => {
        cy.mount(html`
            <vl-select-next label="geboorteplaats">
                <option value="hasselt">Hasselt</option>
                <option value="turnhout">Turnhout</option>
                <option value="knokke-heist">Knokke-Heist</option>
            </vl-select-next>
        `);
        cy.injectAxe();

        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next').shadow().find('select');
        cy.get('vl-select-next').shadow().find('select option').should('have.length', 3);
        cy.get('vl-select-next').shadow().find('select option').first().should('contain', 'Hasselt');
    });

    it('should handle declarative options with groups', () => {
        cy.mount(html`
            <vl-select-next label="geboorteplaats">
                <optgroup label="België">
                    <option value="hasselt">Hasselt</option>
                    <option value="turnhout">Turnhout</option>
                </optgroup>
                <optgroup label="Puerto Rico">
                    <option value="rio-piedras">Rio Piedras</option>
                </optgroup>
            </vl-select-next>
        `);
        cy.injectAxe();

        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next').shadow().find('select optgroup[label="België"]').should('exist');
        cy.get('vl-select-next').shadow().find('select optgroup[label="Puerto Rico"]').should('exist');
        cy.get('vl-select-next').shadow().find('select optgroup[label="België"] option').should('have.length', 2);
        cy.get('vl-select-next').shadow().find('select optgroup[label="Puerto Rico"] option').should('have.length', 1);
    });

    it('should handle declarative options with selected state', () => {
        cy.mount(html`
            <vl-select-next label="geboorteplaats">
                <option value="hasselt" selected>Hasselt</option>
                <option value="turnhout">Turnhout</option>
                <option value="knokke-heist">Knokke-Heist</option>
            </vl-select-next>
        `);
        cy.injectAxe();

        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next').should('have.value', 'hasselt');
        cy.get('vl-select-next').shadow().find('select option[value="hasselt"]').should('have.attr', 'selected');
    });

    it('should handle declarative options with disabled state', () => {
        cy.mount(html`
            <vl-select-next label="geboorteplaats">
                <option value="hasselt">Hasselt</option>
                <option value="turnhout" disabled>Turnhout (niet beschikbaar)</option>
                <option value="knokke-heist">Knokke-Heist</option>
            </vl-select-next>
        `);
        cy.injectAxe();

        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next').shadow().find('select option[value="turnhout"]').should('have.attr', 'disabled');
    });

    it('should dispatch events with declarative options', () => {
        cy.mount(html`
            <vl-select-next label="geboorteplaats">
                <option value="hasselt">Hasselt</option>
                <option value="turnhout">Turnhout</option>
                <option value="knokke-heist">Knokke-Heist</option>
            </vl-select-next>
        `);
        cy.injectAxe();

        cy.createStubForEvent('vl-select-next', 'vl-change');
        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next').shadow().find('select').select('turnhout').trigger('change');
        cy.get('@vl-change')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { value: 'turnhout' });
    });

    it('should work with placeholder and declarative options', () => {
        cy.mount(html`
            <vl-select-next label="geboorteplaats" placeholder="Kies je geboorteplaats">
                <option value="hasselt">Hasselt</option>
                <option value="turnhout">Turnhout</option>
                <option value="knokke-heist">Knokke-Heist</option>
            </vl-select-next>
        `);
        cy.injectAxe();

        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next').shadow().find('.vl-select__placeholder').contains('Kies je geboorteplaats');
        cy.get('vl-select-next').shadow().find('select option').should('have.length', 4); // 3 options + placeholder
    });

    it('should prioritize programmatic options over declarative options', () => {
        const programmaticOptions = [
            { label: 'Programmatic Option 1', value: 'prog1' },
            { label: 'Programmatic Option 2', value: 'prog2' },
        ];

        cy.mount(html`
            <vl-select-next label="geboorteplaats" .options=${programmaticOptions}>
                <option value="hasselt">Hasselt</option>
                <option value="turnhout">Turnhout</option>
            </vl-select-next>
        `);
        cy.injectAxe();

        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next').shadow().find('select option').should('have.length', 2);
        cy.get('vl-select-next').shadow().find('select option').first().should('contain', 'Programmatic Option 1');
        cy.get('vl-select-next').shadow().find('select option').should('not.contain', 'Hasselt');
    });

    it('should update when declarative options change dynamically', () => {
        cy.mount(html`
            <vl-select-next id="dynamic-select" label="geboorteplaats">
                <option value="hasselt">Hasselt</option>
                <option value="turnhout">Turnhout</option>
            </vl-select-next>
        `);
        cy.injectAxe();

        cy.checkA11y('vl-select-next');
        cy.get('vl-select-next').shadow().find('select option').should('have.length', 2);

        // Add a new option dynamically
        cy.get('vl-select-next').then(($select) => {
            const newOption = document.createElement('option');
            newOption.value = 'lier';
            newOption.textContent = 'Lier';
            $select[0].appendChild(newOption);
        });

        // Wacht tot de mutation observer wordt getriggerd
        cy.wait(100);
        cy.get('vl-select-next').shadow().find('select option').should('have.length', 3);
        cy.get('vl-select-next').shadow().find('select option').last().should('contain', 'Lier');
    });
});
