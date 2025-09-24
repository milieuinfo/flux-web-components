import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlSelectRichComponent } from './vl-select-rich.component';
import { SelectRichOption } from './index';
import { parseFormData } from '@domg-wc/form/utils';

registerWebComponents([VlSelectRichComponent]);

describe('component - vl-select-rich - single', () => {
    const options: SelectRichOption[] = [
        { label: 'Hasselt', value: 'hasselt' },
        { label: 'Turnhout', value: 'turnhout' },
        { label: 'Knokke-Heist', value: 'knokke-heist' },
        { label: 'Waregem', value: 'waregem' },
        { label: 'Lier', value: 'lier' },
        { label: 'Rio Piedras', value: 'rio piedras' },
    ];

    it('should mount', () => {
        cy.mount(html`<vl-select-rich-next label="geboorteplaats" .options=${options}></vl-select-rich-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next').shadow().find('select');
    });

    it('should set id', () => {
        cy.mount(
            html`<vl-select-rich-next id="test-id" label="geboorteplaats" .options=${options}></vl-select-rich-next>`
        );
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next').shadow().find('select').should('have.id', 'test-id');
    });

    it('should set name', () => {
        cy.mount(
            html`<vl-select-rich-next
                name="test-name"
                label="geboorteplaats"
                .options=${options}
            ></vl-select-rich-next>`
        );
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next').shadow().find('select').should('have.attr', 'name', 'test-name');
    });

    it('should set label', () => {
        cy.mount(html`<vl-select-rich-next label="geboorteplaats" .options=${options}></vl-select-rich-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next').shadow().find('select').should('have.attr', 'aria-label', 'geboorteplaats');
    });

    it('should set required', () => {
        cy.mount(html`<vl-select-rich-next label="geboorteplaats" required .options=${options}></vl-select-rich-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next').shadow().find('select').should('have.attr', 'required');
    });

    it('should set disabled', () => {
        cy.mount(html`<vl-select-rich-next label="geboorteplaats" disabled .options=${options}></vl-select-rich-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next').shadow().find('select').should('have.class', 'vl-select--disabled');
        cy.get('vl-select-rich-next').shadow().find('select').should('be.disabled');
    });

    it('should set error', () => {
        cy.mount(html`<vl-select-rich-next label="geboorteplaats" error .options=${options}></vl-select-rich-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next').shadow().find('select').should('have.class', 'vl-select--error');
        cy.get('vl-select-rich-next').shadow().find('select').should('have.attr', 'error');
    });

    it('should set success', () => {
        cy.mount(html`<vl-select-rich-next label="geboorteplaats" success .options=${options}></vl-select-rich-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next').shadow().find('select').should('have.class', 'vl-select--success');
    });

    it('should set placeholder', () => {
        cy.mount(
            html`<vl-select-rich-next
                label="geboorteplaats"
                placeholder="Selecteer je geboorteplaats"
                .options=${options}
            ></vl-select-rich-next>`
        );
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next').shadow().find('.vl-select__placeholder').contains('Selecteer je geboorteplaats');
    });

    it('should be deletable', () => {
        cy.mount(
            html`<vl-select-rich-next
                label="geboorteplaats"
                .options=${[{ label: 'Hasselt', value: 'hasselt', selected: true }]}
            ></vl-select-rich-next>`
        );
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next').shadow().find('.vl-pill__close');
    });

    it('should set not-deletable', () => {
        cy.mount(
            html`<vl-select-rich-next
                label="geboorteplaats"
                not-deletable
                .options=${[{ label: 'Hasselt', value: 'hasselt', selected: true }]}
            ></vl-select-rich-next>`
        );
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next').shadow().find('.vl-pill__close').should('not.exist');
    });

    it('should set search', () => {
        cy.mount(html`<vl-select-rich-next label="geboorteplaats" search .options=${options}></vl-select-rich-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next').shadow().find('input.vl-input-field.vl-input-field-cloned');
    });

    it('should set position', () => {
        cy.mount(
            html`<vl-select-rich-next label="geboorteplaats" position="top" .options=${options}></vl-select-rich-next>`
        );
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich-next').shadow().find('.js-vl-select.is-flipped');
    });

    it('should set result limit', () => {
        cy.mount(
            html`<vl-select-rich-next
                label="geboorteplaats"
                placeholder="kies geboorteplaats"
                result-limit="1"
                search
                .options=${options}
            ></vl-select-rich-next>`
        );
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich-next').shadow().find('input').type('a');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .should('have.length', 1);
        cy.checkA11y('vl-select-rich-next');
    });

    it('should set no results text', () => {
        cy.mount(
            html`<vl-select-rich-next
                label="geboorteplaats"
                no-results-text="Geen geboorteplaatsen gevonden"
                search
                .options=${options}
            ></vl-select-rich-next>`
        );
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich-next').shadow().find('input').type('gibberish');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item.has-no-results')
            .contains('Geen geboorteplaatsen gevonden');

        // TODO: het is niet accessible als de dropdown open is
        // cy.checkA11y('vl-select-rich-next');
    });

    it('should set no choices text', () => {
        cy.mount(
            html`<vl-select-rich-next
                label="geboorteplaats"
                no-choices-text="Geen resterende geboorteplaatsen gevonden"
                search
            ></vl-select-rich-next>`
        );
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item.has-no-choices')
            .contains('Geen resterende geboorteplaatsen gevonden');

        // TODO: het is niet accessible als de dropdown open is
        // cy.checkA11y('vl-select-rich-next');
    });

    it('should set search placeholder', () => {
        cy.mount(
            html`<vl-select-rich-next
                label="geboorteplaats"
                search-placeholder="Zoek geboorteplaats"
                search
                .options=${options}
            ></vl-select-rich-next>`
        );
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich-next').shadow().find('input').should('have.attr', 'placeholder', 'Zoek geboorteplaats');
        cy.checkA11y('vl-select-rich-next');
    });

    it('should search', () => {
        cy.mount(
            html`<vl-select-rich-next
                label="geboorteplaats"
                placeholder="kies je geboorteplaats"
                search
                .options=${options}
            ></vl-select-rich-next>`
        );
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich-next').shadow().find('input').type('Hasselt');
        cy.get('vl-select-rich-next').shadow().find('.vl-select__list').find('.vl-select__item').contains('Hasselt');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Turnhout')
            .should('not.exist');
        cy.checkA11y('vl-select-rich-next');
    });

    it('should disable option', () => {
        const options: SelectRichOption[] = [
            { label: 'Hasselt', value: 'hasselt', disabled: true },
            { label: 'Turnhout', value: 'turnhout' },
            { label: 'Knokke-Heist', value: 'knokke-heist' },
            { label: 'Waregem', value: 'waregem' },
            { label: 'Lier', value: 'lier' },
            { label: 'Rio Piedras', value: 'rio piedras' },
        ];

        cy.mount(html`<vl-select-rich-next label="geboorteplaats" .options=${options}></vl-select-rich-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item.vl-select__item--disabled')
            .contains('Hasselt');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Hasselt')
            .click();
        cy.get('vl-select-rich-next').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Turnhout')
            .click();
        cy.get('vl-select-rich-next').shadow().find('select').find('option').contains('Hasselt').should('be.disabled');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Turnhout')
            .should('not.be.disabled');
        cy.checkA11y('vl-select-rich-next');
    });

    it('should use groups', () => {
        const options: SelectRichOption[] = [
            {
                label: 'België',
                value: '',
                choices: [
                    { label: 'Hasselt', value: 'hasselt' },
                    { label: 'Turnhout', value: 'turnhout' },
                    { label: 'Knokke-Heist', value: 'knokke-heist' },
                    { label: 'Waregem', value: 'waregem' },
                    { label: 'Lier', value: 'lier' },
                ],
            },
            {
                label: 'Puerto Rico',
                value: '',
                choices: [{ label: 'Rio Piedras', value: 'rio piedras' }],
            },
        ];

        cy.mount(html`<vl-select-rich-next label="geboorteplaats" .options=${options}></vl-select-rich-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich-next').shadow().find('.vl-select__list').find('.vl-select__group').contains('België');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__group')
            .contains('Puerto Rico');
        cy.get('vl-select-rich-next').shadow().find('.vl-select__list').find('.vl-select__item').contains('Hasselt');
        cy.get('vl-select-rich-next').shadow().find('.vl-select__list').find('.vl-select__item').contains('Turnhout');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Knokke-Heist');
        cy.get('vl-select-rich-next').shadow().find('.vl-select__list').find('.vl-select__item').contains('Waregem');
        cy.get('vl-select-rich-next').shadow().find('.vl-select__list').find('.vl-select__item').contains('Lier');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Rio Piedras');

        // TODO: het is niet accessible als de dropdown open is
        // cy.checkA11y('vl-select-rich-next');
    });

    it('should dispatch vl-change event on select and delete option', () => {
        cy.mount(html`<vl-select-rich-next label="geboorteplaats" .options=${options}></vl-select-rich-next>`);

        cy.createStubForEvent('vl-select-rich-next', 'vl-change');
        cy.injectAxe();
        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Hasselt')
            .click();
        cy.get('@vl-change')
            .should('have.been.calledTwice')
            .its('secondCall.args.0.detail')
            .should('deep.equal', { value: 'hasselt' });
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-input-field')
            .find('.vl-select__item')
            .find('.vl-pill__close')
            .click();
        cy.get('@vl-change')
            .should('have.been.calledThrice')
            .its('thirdCall.args.0.detail')
            .should('deep.equal', { value: null });
        cy.checkA11y('vl-select-rich-next');
    });

    it('should dispatch vl-input on select and delete option', () => {
        cy.mount(html`<vl-select-rich-next label="geboorteplaats" .options=${options}></vl-select-rich-next>`);
        cy.injectAxe();
        cy.checkA11y('vl-select-rich-next');
        cy.createStubForEvent('vl-select-rich-next', 'vl-input');
        cy.get('vl-select-rich-next').shadow().find('.vl-select__inner').click({ force: true });
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Hasselt')
            .click();
        cy.get('@vl-input')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { value: 'hasselt' });
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-input-field')
            .find('.vl-select__item')
            .find('.vl-pill__close')
            .click();
        cy.get('@vl-input')
            .should('have.been.calledTwice')
            .its('secondCall.args.0.detail')
            .should('deep.equal', { value: null });
        cy.checkA11y('vl-select-rich-next');
    });

    it('should dispatch vl-change, but not vl-input when programmatically selecting and deleting option', () => {
        cy.mount(html`<vl-select-rich-next label="geboorteplaats" .options=${options}></vl-select-rich-next>`);
        cy.createStubForEvent('vl-select-rich-next', 'vl-change');
        cy.createStubForEvent('vl-select-rich-next', 'vl-input');
        cy.injectAxe();
        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next').then((el) => {
            const select = el[0] as VlSelectRichComponent;
            select.selectByValue('hasselt');
        });

        cy.get('@vl-change')
            .should('have.been.calledTwice')
            .its('secondCall.args.0.detail')
            .should('deep.equal', { value: 'hasselt' });

        cy.get('@vl-input').should('to.not.have.been.called.at.all');

        cy.get('vl-select-rich-next').then((el) => {
            const select = el[0] as VlSelectRichComponent;
            select.removeSelectionByValue('hasselt');
        });

        cy.get('@vl-change')
            .should('have.been.calledThrice')
            .its('thirdCall.args.0.detail')
            .should('deep.equal', { value: null });
        cy.checkA11y('vl-select-rich-next');

        cy.get('@vl-input').should('to.not.have.been.called.at.all');
    });

    it('should dispatch vl-select-search event on input search value', () => {
        cy.mount(
            html`<vl-select-rich-next
                label="geboorteplaats"
                placeholder="zoek geboorteplaats"
                search
                .options=${options}
            ></vl-select-rich-next>`
        );
        cy.injectAxe();
        cy.createStubForEvent('vl-select-rich-next', 'vl-select-search');

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich-next').shadow().find('input').type('t');
        cy.get('@vl-select-search')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { value: 't' });
        cy.get('vl-select-rich-next').shadow().find('input').clear();
        cy.get('@vl-select-search')
            .should('have.been.calledTwice')
            .its('secondCall.args.0.detail')
            .should('deep.equal', { value: '' });
        cy.checkA11y('vl-select-rich-next');
    });

    it('should dispatch vl-valid event on valid selection', () => {
        cy.mount(html`<vl-select-rich-next label="geboorteplaats" .options=${options} required></vl-select-rich-next>`);
        cy.createStubForEvent('vl-select-rich-next', 'vl-valid');
        cy.createStubForEvent('vl-select-rich-next', 'vl-change');
        cy.createStubForEvent('vl-select-rich-next', 'vl-input');
        cy.injectAxe();
        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Hasselt')
            .click();
        cy.get('@vl-valid')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { value: 'hasselt' });
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-input-field')
            .find('.vl-select__item')
            .find('.vl-pill__close')
            .click();
        cy.get('@vl-valid').should('have.been.calledOnce');
        cy.get('@vl-input').should('have.been.calledTwice');
        cy.get('@vl-change').should('have.been.calledThrice');
        cy.checkA11y('vl-select-rich-next');
    });

    it('should select option', () => {
        cy.mount(html`<vl-select-rich-next label="geboorteplaats" .options=${options}></vl-select-rich-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Hasselt')
            .click();
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Hasselt')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Turnhout')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Knokke-Heist')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Waregem')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Lier')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Rio Piedras')
            .should('not.have.attr', 'selected');
        cy.checkA11y('vl-select-rich-next');
    });

    it('should delete option', () => {
        cy.mount(html`<vl-select-rich-next label="geboorteplaats" .options=${options}></vl-select-rich-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Hasselt')
            .click();
        cy.get('vl-select-rich-next').shadow().find('select').find('option').contains('Hasselt');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-input-field')
            .find('.vl-select__item')
            .find('.vl-pill__close')
            .click();
        cy.get('vl-select-rich-next').shadow().find('select').find('option').should('not.have.attr', 'selected');
        cy.checkA11y('vl-select-rich-next');
    });

    it('should select initial option programmatically', () => {
        const options: SelectRichOption[] = [
            { label: 'Hasselt', value: 'hasselt', selected: true },
            { label: 'Turnhout', value: 'turnhout' },
            { label: 'Knokke-Heist', value: 'knokke-heist' },
            { label: 'Waregem', value: 'waregem' },
            { label: 'Lier', value: 'lier' },
            { label: 'Rio Piedras', value: 'rio piedras' },
        ];

        cy.mount(html`<vl-select-rich-next label="geboorteplaats" .options=${options}></vl-select-rich-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Hasselt')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Turnhout')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Knokke-Heist')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Waregem')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Lier')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Rio Piedras')
            .should('not.have.attr', 'selected');

        cy.get('vl-select-rich-next').then((el) => {
            const select = el[0] as VlSelectRichComponent;
            select.options = [
                { label: 'Hasselt', value: 'hasselt' },
                { label: 'Turnhout', value: 'turnhout', selected: true },
                { label: 'Knokke-Heist', value: 'knokke-heist' },
                { label: 'Waregem', value: 'waregem' },
                { label: 'Lier', value: 'lier' },
                { label: 'Rio Piedras', value: 'rio piedras' },
            ];
        });

        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Turnhout')
            .should('have.attr', 'selected');

        cy.get('vl-select-rich-next').then((el) => {
            const select = el[0] as VlSelectRichComponent;
            select.removeSelectionByValue('hasselt');
        });

        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Hasselt')
            .should('not.have.attr', 'selected');

        cy.get('vl-select-rich-next').then((el) => {
            const select = el[0] as VlSelectRichComponent;
            select.selectByValue('hasselt');
        });

        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Hasselt')
            .should('have.attr', 'selected');

        cy.checkA11y('vl-select-rich-next');
    });

    it('should set new options programmatically using methods', () => {
        const options: SelectRichOption[] = [
            { label: 'Hasselt', value: 'hasselt' },
            { label: 'Turnhout', value: 'turnhout' },
            { label: 'Knokke-Heist', value: 'knokke-heist', selected: true },
        ];

        const newOptions: SelectRichOption[] = [
            { label: 'Waregem', value: 'waregem' },
            { label: 'Lier', value: 'lier' },
            { label: 'Rio Piedras', value: 'rio piedras' },
        ];

        cy.mount(html`<vl-select-rich-next label="geboorteplaats" .options=${options}></vl-select-rich-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Hasselt')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Turnhout')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Knokke-Heist')
            .should('have.attr', 'selected');

        cy.get('vl-select-rich-next').then((el) => {
            const select = el[0] as VlSelectRichComponent;
            select.setOptions(newOptions);
        });

        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Waregem')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Lier')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Rio Piedras')
            .should('not.have.attr', 'selected');

        cy.checkA11y('vl-select-rich-next');
    });

    it('should select & unselect option programmatically using methods', () => {
        const options: SelectRichOption[] = [
            { label: 'Hasselt', value: 'hasselt' },
            { label: 'Turnhout', value: 'turnhout' },
            { label: 'Knokke-Heist', value: 'knokke-heist', selected: true },
            { label: 'Waregem', value: 'waregem' },
            { label: 'Lier', value: 'lier' },
            { label: 'Rio Piedras', value: 'rio piedras' },
        ];

        cy.mount(html`<vl-select-rich-next label="geboorteplaats" .options=${options}></vl-select-rich-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Hasselt')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Turnhout')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Knokke-Heist')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Waregem')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Lier')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Rio Piedras')
            .should('not.have.attr', 'selected');

        cy.get('vl-select-rich-next').then((el) => {
            const select = el[0] as VlSelectRichComponent;
            select.removeSelectionByValue('knokke-heist');
        });

        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Knokke-Heist')
            .should('not.have.attr', 'selected');

        cy.get('vl-select-rich-next').then((el) => {
            const select = el[0] as VlSelectRichComponent;
            select.selectByValue('rio piedras');
        });

        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Rio Piedras')
            .should('have.attr', 'selected');

        cy.checkA11y('vl-select-rich-next');
    });

    it('should select & unselect option programmatically, setting options property', () => {
        const options: SelectRichOption[] = [
            { label: 'Hasselt', value: 'hasselt' },
            { label: 'Turnhout', value: 'turnhout' },
            { label: 'Knokke-Heist', value: 'knokke-heist', selected: true },
            { label: 'Waregem', value: 'waregem' },
            { label: 'Lier', value: 'lier' },
            { label: 'Rio Piedras', value: 'rio piedras' },
        ];

        cy.mount(html`<vl-select-rich-next label="geboorteplaats" .options=${options}></vl-select-rich-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Hasselt')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Turnhout')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Knokke-Heist')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Waregem')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Lier')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Rio Piedras')
            .should('not.have.attr', 'selected');

        cy.get('vl-select-rich-next').then((el) => {
            const select = el[0] as VlSelectRichComponent;
            select.options = [
                { label: 'Hasselt', value: 'hasselt' },
                { label: 'Turnhout', value: 'turnhout' },
                { label: 'Knokke-Heist', value: 'knokke-heist' },
                { label: 'Waregem', value: 'waregem' },
                { label: 'Lier', value: 'lier' },
                { label: 'Rio Piedras', value: 'rio piedras' },
            ];
        });

        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Knokke-Heist')
            .should('not.have.attr', 'selected');

        cy.get('vl-select-rich-next').then((el) => {
            const select = el[0] as VlSelectRichComponent;
            select.options = [
                { label: 'Hasselt', value: 'hasselt' },
                { label: 'Turnhout', value: 'turnhout' },
                { label: 'Knokke-Heist', value: 'knokke-heist' },
                { label: 'Waregem', value: 'waregem' },
                { label: 'Lier', value: 'lier' },
                { label: 'Rio Piedras', value: 'rio piedras', selected: true },
            ];
        });

        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Rio Piedras')
            .should('have.attr', 'selected');

        cy.checkA11y('vl-select-rich-next');
    });

    it('should remove selected option programmatically', () => {
        const options: SelectRichOption[] = [
            { label: 'Padel', value: 'padel', selected: true },
            { label: 'Dans', value: 'dans' },
            { label: 'Drummen', value: 'drummen' },
            { label: 'Zwemmen', value: 'zwemmen' },
            { label: 'Boardgames', value: 'boardgames' },
            { label: 'Fietsen', value: 'fietsen' },
        ];

        cy.mount(html`<vl-select-rich-next label="hobby's" .options=${options}></vl-select-rich-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Padel')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Dans')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Drummen')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Zwemmen')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Boardgames')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Fietsen')
            .should('not.have.attr', 'selected');

        cy.get('vl-select-rich-next').then((el) => {
            const select = el[0] as VlSelectRichComponent;
            select.removeAllSelections();
        });

        cy.get('vl-select-rich-next').shadow().find('select').find('option').should('not.have.attr', 'selected');

        cy.checkA11y('vl-select-rich-next');
    });

    it('should return selected value when calling getSelected()', () => {
        cy.mount(html`<vl-select-rich-next label="geboorteplaats" .options=${options}></vl-select-rich-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');

        cy.runTestFor<VlSelectRichComponent>('vl-select-rich-next', (component) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            expect(component.getSelected()).to.be.null;
        });

        cy.get('vl-select-rich-next').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Hasselt')
            .click();
        cy.runTestFor<VlSelectRichComponent>('vl-select-rich-next', (component) => {
            expect(component.getSelected()).to.equal('hasselt');
        });
        cy.get('vl-select-rich-next').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Turnhout')
            .click();
        cy.runTestFor<VlSelectRichComponent>('vl-select-rich-next', (component) => {
            expect(component.getSelected()).to.equal('turnhout');
        });
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-input-field')
            .find('.vl-select__item')
            .find('.vl-pill__close')
            .click({ force: true });

        cy.runTestFor<VlSelectRichComponent>('vl-select-rich-next', (component) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            expect(component.getSelected()).to.be.null;
        });

        cy.checkA11y('vl-select-rich-next');
    });
});

describe('component - vl-select-rich - multiple', () => {
    const options: SelectRichOption[] = [
        { label: 'Padel', value: 'padel' },
        { label: 'Dans', value: 'dans' },
        { label: 'Drummen', value: 'drummen' },
        { label: 'Zwemmen', value: 'zwemmen' },
        { label: 'Boardgames', value: 'boardgames' },
        { label: 'Fietsen', value: 'fietsen' },
    ];

    it('should mount', () => {
        cy.mount(
            html`
                <vl-select-rich-next
                    label="hobby's"
                    placeholder="Vul hobby's in"
                    multiple
                    .options=${options}
                ></vl-select-rich-next>
            `
        );
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next').shadow().find('select');
    });

    it('should search', () => {
        cy.mount(html`
            <vl-select-rich-next
                label="hobby's"
                placeholder="Vul hobby's in"
                multiple
                .options=${options}
            ></vl-select-rich-next>
        `);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich-next').shadow().find('input').type('Padel');
        cy.get('vl-select-rich-next').shadow().find('.vl-select__list').find('.vl-select__item').contains('Padel');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Dans')
            .should('not.exist');
        cy.checkA11y('vl-select-rich-next');
    });

    it('should dispatch vl-change event on select and delete option', () => {
        cy.mount(html`<vl-select-rich-next
            label="hobby's"
            placeholder="Vul hobby's in"
            multiple
            .options=${options}
        ></vl-select-rich-next>`);
        cy.injectAxe();

        cy.createStubForEvent('vl-select-rich-next', 'vl-change');
        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Padel')
            .click();
        cy.get('@vl-change')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { value: ['padel'] });
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Dans')
            .click();
        cy.get('@vl-change')
            .should('have.been.calledTwice')
            .its('secondCall.args.0.detail')
            .should('deep.equal', { value: ['padel', 'dans'] });
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-input-field')
            .find('.vl-select__item[data-value="padel"]')
            .find('.vl-pill__close')
            .click();
        cy.get('@vl-change').its('callCount').should('eq', 3);
        cy.get('@vl-change')
            .its('lastCall.args.0.detail')
            .should('deep.equal', { value: ['dans'] });
        cy.checkA11y('vl-select-rich-next');
    });

    it('should dispatch vl-input event on select and delete option', () => {
        cy.mount(html`<vl-select-rich-next
            label="hobby's"
            placeholder="Vul hobby's in"
            multiple
            .options=${options}
        ></vl-select-rich-next>`);
        cy.injectAxe();

        cy.createStubForEvent('vl-select-rich-next', 'vl-input');
        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Padel')
            .click();
        cy.get('@vl-input')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { value: ['padel'] });
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Dans')
            .click();
        cy.get('@vl-input')
            .should('have.been.calledTwice')
            .its('secondCall.args.0.detail')
            .should('deep.equal', { value: ['padel', 'dans'] });
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-input-field')
            .find('.vl-select__item[data-value="padel"]')
            .find('.vl-pill__close')
            .click();
        cy.get('@vl-input').its('callCount').should('eq', 3);
        cy.get('@vl-input')
            .its('lastCall.args.0.detail')
            .should('deep.equal', { value: ['dans'] });
        cy.checkA11y('vl-select-rich-next');
    });

    it('should dispatch vl-change, but not vl-input when programmatically selecting and deleting option', () => {
        cy.mount(html`<vl-select-rich-next
            label="hobby's"
            placeholder="Vul hobby's in"
            multiple
            .options=${options}
        ></vl-select-rich-next>`);
        cy.createStubForEvent('vl-select-rich-next', 'vl-change');
        cy.createStubForEvent('vl-select-rich-next', 'vl-input');
        cy.injectAxe();
        cy.checkA11y('vl-select-rich-next');

        cy.get('vl-select-rich-next').then((el) => {
            const select = el[0] as VlSelectRichComponent;
            select.selectByValue('padel');
        });

        cy.get('@vl-change')
            .should('have.been.calledTwice')
            .its('secondCall.args.0.detail')
            .should('deep.equal', { value: ['padel'] });

        cy.get('@vl-input').should('to.not.have.been.called.at.all');

        cy.get('vl-select-rich-next').then((el) => {
            const select = el[0] as VlSelectRichComponent;
            select.selectByValue('dans');
        });

        cy.get('@vl-change')
            .should('have.been.calledThrice')
            .its('thirdCall.args.0.detail')
            .should('deep.equal', { value: ['padel', 'dans'] });

        cy.get('@vl-input').should('to.not.have.been.called.at.all');

        cy.checkA11y('vl-select-rich-next');

        cy.get('vl-select-rich-next').then((el) => {
            const select = el[0] as VlSelectRichComponent;
            select.removeSelectionByValue('padel');
        });

        cy.get('@vl-change')
            .its('lastCall.args.0.detail')
            .should('deep.equal', { value: ['dans'] });
        cy.get('@vl-input').should('to.not.have.been.called.at.all');
        cy.checkA11y('vl-select-rich-next');
    });

    it('should select multiple options', () => {
        cy.mount(html`<vl-select-rich-next
            label="hobby's"
            placeholder="Vul hobby's in"
            multiple
            .options=${options}
        ></vl-select-rich-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Padel')
            .click();
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Dans')
            .click();
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Drummen')
            .click();
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Padel')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Dans')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Drummen')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Zwemmen')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Boardgames')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Fietsen')
            .should('not.have.attr', 'selected');
        cy.checkA11y('vl-select-rich-next');
    });

    it('should delete multiple options', () => {
        cy.mount(html`<vl-select-rich-next
            label="hobby's"
            placeholder="Vul hobby's in"
            multiple
            .options=${options}
        ></vl-select-rich-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Padel')
            .click();
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Dans')
            .click();
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Drummen')
            .click();
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Padel')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Dans')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Drummen')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-input-field')
            .find('.vl-select__item[data-value="padel"]')
            .find('.vl-pill__close')
            .click();
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Padel')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich-next').shadow().find('select').find('option').contains('Dans');
        cy.get('vl-select-rich-next').shadow().find('select').find('option').contains('Drummen');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-input-field')
            .find('.vl-select__item[data-value="dans"]')
            .find('.vl-pill__close')
            .click();
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Padel')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Dans')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich-next').shadow().find('select').find('option').contains('Drummen');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-input-field')
            .find('.vl-select__item[data-value="drummen"]')
            .find('.vl-pill__close')
            .click();
        cy.get('vl-select-rich-next').shadow().find('select').find('option').should('not.have.attr', 'selected');
        cy.checkA11y('vl-select-rich-next');
    });

    it('should select multiple options with options property', () => {
        const options: SelectRichOption[] = [
            { label: 'Padel', value: 'padel', selected: true },
            { label: 'Dans', value: 'dans', selected: true },
            { label: 'Drummen', value: 'drummen', selected: true },
            { label: 'Zwemmen', value: 'zwemmen' },
            { label: 'Boardgames', value: 'boardgames' },
            { label: 'Fietsen', value: 'fietsen' },
        ];

        cy.mount(html`
            <vl-select-rich-next
                label="hobby's"
                placeholder="Vul hobby's in"
                multiple
                .options=${options}
            ></vl-select-rich-next>
        `);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Padel')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Dans')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Drummen')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Zwemmen')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Boardgames')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Fietsen')
            .should('not.have.attr', 'selected');
        cy.checkA11y('vl-select-rich-next');

        cy.get('vl-select-rich-next').then((el) => {
            const select = el[0] as VlSelectRichComponent;
            select.options = [
                { label: 'Hasselt', value: 'hasselt', selected: true },
                { label: 'Turnhout', value: 'turnhout', selected: true },
                { label: 'Knokke-Heist', value: 'knokke-heist', selected: true },
                { label: 'Waregem', value: 'waregem', selected: true },
                { label: 'Lier', value: 'lier', selected: true },
                { label: 'Rio Piedras', value: 'rio piedras', selected: true },
            ];
        });

        cy.get('vl-select-rich-next').shadow().find('select').find('option').should('have.attr', 'selected');
    });

    it('should remove all options programmatically', () => {
        const options: SelectRichOption[] = [
            { label: 'Padel', value: 'padel', selected: true },
            { label: 'Dans', value: 'dans', selected: true },
            { label: 'Drummen', value: 'drummen', selected: true },
            { label: 'Zwemmen', value: 'zwemmen' },
            { label: 'Boardgames', value: 'boardgames' },
            { label: 'Fietsen', value: 'fietsen' },
        ];

        cy.mount(html`<vl-select-rich-next
            label="hobby's"
            placeholder="Vul hobby's in"
            multiple
            .options=${options}
        ></vl-select-rich-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Padel')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Dans')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Drummen')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Zwemmen')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Boardgames')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich-next')
            .shadow()
            .find('select')
            .find('option')
            .contains('Fietsen')
            .should('not.have.attr', 'selected');

        cy.get('vl-select-rich-next').then((el) => {
            const select = el[0] as VlSelectRichComponent;
            select.removeAllSelections();
        });

        cy.get('vl-select-rich-next').shadow().find('select').find('option').should('not.have.attr', 'selected');

        cy.checkA11y('vl-select-rich-next');
    });

    it('should return selected values when calling getSelected()', () => {
        cy.mount(html`<vl-select-rich-next
            label="hobby's"
            placeholder="Vul hobby's in"
            multiple
            .options=${options}
        ></vl-select-rich-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich-next');
        cy.runTestFor<VlSelectRichComponent>('vl-select-rich-next', (component) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            expect(component.getSelected()).to.be.empty;
        });
        cy.get('vl-select-rich-next').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Padel')
            .click();
        cy.runTestFor<VlSelectRichComponent>('vl-select-rich-next', (component) => {
            expect(component.getSelected()).to.have.members(['padel']);
        });
        cy.get('vl-select-rich-next').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Dans')
            .click({ force: true });
        cy.runTestFor<VlSelectRichComponent>('vl-select-rich-next', (component) => {
            expect(component.getSelected()).to.have.members(['padel', 'dans']);
        });
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-input-field')
            .find('.vl-select__item[data-value="padel"]')
            .find('.vl-pill__close')
            .click();
        cy.runTestFor<VlSelectRichComponent>('vl-select-rich-next', (component) => {
            expect(component.getSelected()).to.have.members(['dans']);
        });
        // issue with aria-activedescendant
        // cy.checkA11y('vl-select-rich-next');
    });
});

describe('component - vl-select-rich - single - in form', () => {
    const options: SelectRichOption[] = [
        { label: 'Hasselt', value: 'hasselt' },
        { label: 'Turnhout', value: 'turnhout' },
        { label: 'Knokke-Heist', value: 'knokke-heist' },
        { label: 'Waregem', value: 'waregem' },
        { label: 'Lier', value: 'lier' },
        { label: 'Rio Piedras', value: 'rio piedras' },
    ];

    beforeEach(() => {
        cy.mount(html`
            <form
                id="form"
                class="vl-form"
                @submit=${(e: Event) => {
                    e.preventDefault();
                }}
            >
                <vl-form-label for="geboorteplaats">plaats</vl-form-label>
                <vl-select-rich-next
                    id="geboorteplaats"
                    name="geboorteplaats"
                    .options=${options}
                    search
                    required
                ></vl-select-rich-next>
                <button class="vl-button" type="submit">Verstuur</button>
            </form>
        `);
    });

    it('should submit value', () => {
        const submittedFormData = {
            geboorteplaats: 'hasselt',
        };

        cy.createStubForEvent('form', 'submit');

        cy.get('vl-select-rich-next').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Hasselt')
            .click();
        cy.get('form').find('button[type="submit"]').click();
        cy.get('@submit').should('have.been.calledOnce');
        cy.get('form').then(($el) => {
            const formData = Object.fromEntries(new FormData($el.get(0) as HTMLFormElement));
            expect(formData).to.deep.equal(submittedFormData);
        });
    });

    it('should prevent form submission on validation error', () => {
        cy.createStubForEvent('form', 'submit');

        cy.get('form').find('button[type="submit"]').click();
        cy.get('@submit').should('not.have.been.called');
        cy.get('vl-select-rich-next').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Hasselt')
            .click();
        cy.get('vl-select-rich-next').shadow().find('select').find('option').contains('Hasselt');
        cy.get('form').find('button[type="submit"]').click();
        cy.get('@submit').should('have.been.calledOnce');
    });

    it('should not submit form on press enter', () => {
        cy.createStubForEvent('form', 'submit');

        cy.get('vl-select-rich-next').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Hasselt')
            .click();
        cy.get('vl-select-rich-next').shadow().find('select').find('option').contains('Hasselt');
        cy.get('vl-select-rich-next').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich-next').shadow().find('input.vl-input-field').type('{enter}');
        cy.get('@submit').should('not.have.been.called');
    });

    it('mouse events should bubble, type events should not', () => {
        cy.createStubForEvent('form', 'mouseover');
        cy.createStubForEvent('form', 'keydown');

        cy.get('vl-select-rich-next').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich-next').shadow().find('input.vl-input-field').type('Ha');
        cy.get('@mouseover').should('have.been.called');
        cy.get('@keydown').should('not.have.been.called');
    });
});

describe('component - vl-select-rich - multiple - in form', () => {
    const options: SelectRichOption[] = [
        { label: 'Hasselt', value: 'hasselt', selected: true },
        { label: 'Turnhout', value: 'turnhout' },
        { label: 'Knokke-Heist', value: 'knokke-heist', selected: true },
        { label: 'Waregem', value: 'waregem' },
        { label: 'Lier', value: 'lier', selected: true },
        { label: 'Rio Piedras', value: 'rio piedras' },
    ];

    beforeEach(() => {
        cy.mount(html`
            <form
                id="form"
                class="vl-form"
                @submit=${(e: Event) => {
                    e.preventDefault();
                }}
            >
                <vl-form-label for="plaats">plaats</vl-form-label>
                <vl-select-rich-next
                    multiple
                    id="plaats"
                    name="plaats"
                    .options=${options}
                    search
                    required
                ></vl-select-rich-next>
                <button class="vl-button" type="submit">Verstuur</button>
                <button class="vl-button" type="reset">Reset</button>
            </form>
        `);
    });

    it('should submit value', () => {
        const submittedFormData = {
            plaats: ['hasselt', 'turnhout', 'knokke-heist', 'lier'],
        };

        cy.createStubForEvent('form', 'submit');

        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Turnhout')
            .click({ force: true });

        cy.get('form').find('button[type="submit"]').click({ force: true });
        cy.get('@submit').should('have.been.calledOnce');

        cy.get('form').then(($el) => {
            const formData = parseFormData($el.get(0) as HTMLFormElement);
            expect(formData).to.deep.equal(submittedFormData);
        });
    });

    it('should reset to initially checked options after selecting new option', () => {
        const submittedFormData = {
            plaats: ['hasselt', 'turnhout', 'knokke-heist', 'lier'],
        };
        const submittedAfterResetFormData = {
            plaats: ['hasselt', 'knokke-heist', 'lier'],
        };

        cy.createStubForEvent('form', 'submit');

        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Turnhout')
            .click({ force: true });

        cy.get('form').then(($el) => {
            const formData = parseFormData($el.get(0) as HTMLFormElement);
            expect(formData).to.deep.equal(submittedFormData);
            cy.log(submittedFormData['plaats'].join(' '));
        });

        cy.get('form').find('button[type="reset"]').click({ force: true });

        cy.get('form').then(($el) => {
            const formData = parseFormData($el.get(0) as HTMLFormElement);
            expect(formData).to.deep.equal(submittedAfterResetFormData);
            cy.log(submittedAfterResetFormData['plaats'].join(' '));
        });
    });

    it('should reset to initial options that are set after initial rendering', () => {
        const submittedFormData = {
            plaats: ['hasselt', 'turnhout', 'knokke-heist', 'lier'],
        };
        const submittedAfterResetFormData = {
            plaats: ['waregem', 'rio piedras'],
        };

        cy.createStubForEvent('form', 'submit');

        cy.get('vl-select-rich-next')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Turnhout')
            .click({ force: true });

        cy.get('form').then(($el) => {
            const formData = parseFormData($el.get(0) as HTMLFormElement);
            cy.log(submittedFormData['plaats'].join(' '));
            expect(formData).to.deep.equal(submittedFormData);
        });

        cy.get('vl-select-rich-next').then((el) => {
            const select = el[0] as VlSelectRichComponent;
            select.initialOptions = [
                { label: 'Hasselt', value: 'hasselt' },
                { label: 'Turnhout', value: 'turnhout' },
                { label: 'Knokke-Heist', value: 'knokke-heist' },
                { label: 'Waregem', value: 'waregem', selected: true },
                { label: 'Lier', value: 'lier' },
                { label: 'Rio Piedras', value: 'rio piedras', selected: true },
            ];
        });

        cy.get('form').find('button[type="reset"]').click({ force: true });

        cy.get('form').then(($el) => {
            const formData = parseFormData($el.get(0) as HTMLFormElement);
            cy.log(submittedAfterResetFormData['plaats'].join(' '));
            expect(formData).to.deep.equal(submittedAfterResetFormData);
        });
    });
});
