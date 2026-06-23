import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { parseFormData } from '../utils';
import { SelectRichOption } from './index';
import { VlSelectRichComponent } from './vl-select-rich.component';
import { VlFormMessageComponent } from '../form-message/vl-form-message.component';

registerWebComponents([VlSelectRichComponent, VlFormMessageComponent]);

describe('cypress-component - form components - vl-select-rich - single', () => {
    const options: SelectRichOption[] = [
        { label: 'Hasselt', value: 'hasselt' },
        { label: 'Turnhout', value: 'turnhout' },
        { label: 'Knokke-Heist', value: 'knokke-heist' },
        { label: 'Waregem', value: 'waregem' },
        { label: 'Lier', value: 'lier' },
        { label: 'Rio Piedras', value: 'rio piedras' },
    ];

    beforeEach(() => {
        cy.viewport(1200, 800);
    });

    it('should mount', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-select-rich label="geboorteplaats" .options=${options}></vl-select-rich>
            </div>
        `);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('select');
        cy.document().then((doc) => doc.fonts.ready);
        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('select-rich-single-mount');
    });

    it('should set id', () => {
        cy.mount(html`<vl-select-rich id="test-id" label="geboorteplaats" .options=${options}></vl-select-rich>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('select').should('have.id', 'test-id');
    });

    it('should set name', () => {
        cy.mount(html`<vl-select-rich name="test-name" label="geboorteplaats" .options=${options}></vl-select-rich>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('select').should('have.attr', 'name', 'test-name');
    });

    it('should set label', () => {
        cy.mount(html`<vl-select-rich label="geboorteplaats" .options=${options}></vl-select-rich>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('select').should('have.attr', 'aria-label', 'geboorteplaats');
    });

    it('should set required', () => {
        cy.mount(html`<vl-select-rich label="geboorteplaats" required .options=${options}></vl-select-rich>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('select').should('have.attr', 'required');
    });

    it('should set disabled', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-select-rich label="geboorteplaats" disabled .options=${options}></vl-select-rich>
            </div>
        `);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('select-rich-single-disabled');
        cy.get('vl-select-rich').shadow().find('select').should('have.class', 'vl-select--disabled');
        cy.get('vl-select-rich').shadow().find('select').should('be.disabled');
        cy.get('vl-select-rich')
            .shadow()
            .find('.js-vl-select.is-disabled')
            .shouldHaveComputedStyle({ style: 'background-color', value: 'rgb(243, 245, 246)' });
        cy.get('vl-select-rich')
            .shadow()
            .find('.js-vl-select.is-disabled .vl-select__inner')
            .shouldHaveComputedStyle({ style: 'border-color', value: 'rgb(134, 149, 168)' });
    });

    it('should set error', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-select-rich label="geboorteplaats" error .options=${options}></vl-select-rich>
            </div>
        `);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('select-rich-single-error');
        cy.get('vl-select-rich').shadow().find('select').should('have.class', 'vl-select--error');
        cy.get('vl-select-rich').shadow().find('select').should('have.attr', 'error');
        cy.get('vl-select-rich')
            .shadow()
            .find('.js-vl-select .vl-select__inner')
            .shouldHaveComputedStyle({ style: 'border-color', value: 'rgb(210, 55, 60)' })
            .shouldHaveComputedStyle({ style: 'background-color', value: 'rgb(251, 235, 236)' });
    });

    it('should set success', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-select-rich label="geboorteplaats" success .options=${options}></vl-select-rich>
            </div>
        `);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('select-rich-single-success');
        cy.get('vl-select-rich').shadow().find('select').should('have.class', 'vl-select--success');
        cy.get('vl-select-rich')
            .shadow()
            .find('.js-vl-select .vl-select__inner')
            .shouldHaveComputedStyle({ style: 'border-color', value: 'rgb(0, 158, 71)' })
            .shouldHaveComputedStyle({ style: 'background-color', value: 'rgb(230, 245, 237)' });
    });

    it('should set placeholder', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-select-rich
                    label="geboorteplaats"
                    placeholder="Selecteer je geboorteplaats"
                    .options=${options}
                ></vl-select-rich>
            </div>
        `);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('.vl-select__placeholder').contains('Selecteer je geboorteplaats');
        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('select-rich-single-placeholder');
    });

    it('should be deletable', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-select-rich
                    label="geboorteplaats"
                    .options=${[{ label: 'Hasselt', value: 'hasselt', selected: true }]}
                ></vl-select-rich>
            </div>
        `);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('.vl-pill__close');
        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('select-rich-single-selected');
    });

    it('should set not-deletable', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-select-rich
                    label="geboorteplaats"
                    not-deletable
                    .options=${[{ label: 'Hasselt', value: 'hasselt', selected: true }]}
                ></vl-select-rich>
            </div>
        `);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('.vl-pill__close').should('not.exist');
        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('select-rich-single-not-deletable');
    });

    it('should set search', () => {
        cy.mount(html`<vl-select-rich label="geboorteplaats" search .options=${options}></vl-select-rich>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('input.vl-input-field.vl-input-field-cloned');
    });

    it('should set position', () => {
        cy.mount(html`<vl-select-rich label="geboorteplaats" position="top" .options=${options}></vl-select-rich>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich').shadow().find('.js-vl-select.is-flipped');
    });

    it('should set result limit', () => {
        cy.mount(
            html`<vl-select-rich
                label="geboorteplaats"
                placeholder="kies geboorteplaats"
                result-limit="1"
                search
                .options=${options}
            ></vl-select-rich>`
        );
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich').shadow().find('input').type('a');
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__item').should('have.length', 1);
        cy.checkA11y('vl-select-rich');
    });

    it('should set no results text', () => {
        cy.mount(
            html`<vl-select-rich
                label="geboorteplaats"
                no-results-text="Geen geboorteplaatsen gevonden"
                search
                .options=${options}
            ></vl-select-rich>`
        );
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich').shadow().find('input').type('gibberish');
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item.has-no-results')
            .contains('Geen geboorteplaatsen gevonden');

        // TODO: het is niet accessible als de dropdown open is
        // cy.checkA11y('vl-select-rich');
    });

    it('should set no choices text', () => {
        cy.mount(
            html`<vl-select-rich
                label="geboorteplaats"
                no-choices-text="Geen resterende geboorteplaatsen gevonden"
                search
            ></vl-select-rich>`
        );
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item.has-no-choices')
            .contains('Geen resterende geboorteplaatsen gevonden');

        // TODO: het is niet accessible als de dropdown open is
        // cy.checkA11y('vl-select-rich');
    });

    it('should set search placeholder', () => {
        cy.mount(
            html`<vl-select-rich
                label="geboorteplaats"
                search-placeholder="Zoek geboorteplaats"
                search
                .options=${options}
            ></vl-select-rich>`
        );
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich').shadow().find('input').should('have.attr', 'placeholder', 'Zoek geboorteplaats');
        cy.checkA11y('vl-select-rich');
    });

    it('should search', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; min-height: 300px; padding: 20px; background: white;">
                <vl-select-rich
                    label="geboorteplaats"
                    placeholder="kies je geboorteplaats"
                    search
                    .options=${options}
                ></vl-select-rich>
            </div>
        `);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich').shadow().find('input').type('Hasselt');
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__item').contains('Hasselt');
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Turnhout')
            .should('not.exist');
        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('select-rich-single-search-open');
        cy.checkA11y('vl-select-rich');
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

        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; min-height: 400px; padding: 20px; background: white;">
                <vl-select-rich label="geboorteplaats" .options=${options}></vl-select-rich>
            </div>
        `);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');

        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Turnhout')
            .click();
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Turnhout')
            .should('have.attr', 'selected');
        cy.checkA11y('vl-select-rich');

        // axe-core focust intern de input van choices.js waardoor showDropdown() getriggerd wordt.
        // Stuur expliciet Escape om de dropdown te sluiten als axe hem heropende.
        cy.get('vl-select-rich').shadow().find('.js-vl-select').trigger('keydown', { key: 'Escape', keyCode: 27, which: 27 });
        cy.get('vl-select-rich').shadow().find('.js-vl-select').should('not.have.class', 'is-open');
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich').shadow().find('.vl-select__list--dropdown').should('be.visible');
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item.vl-select__item--disabled')
            .contains('Hasselt');
        // Click op uitgeschakelde optie: choices.js keert meteen terug, dropdown blijft open
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__item').contains('Hasselt').click();
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Turnhout')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Hasselt')
            .should('not.have.attr', 'selected');

        cy.checkA11y('vl-select-rich');

        cy.get('vl-select-rich').shadow().find('select').find('option').contains('Hasselt').should('be.disabled');
        cy.get('vl-select-rich').shadow().find('select').find('option').contains('Turnhout').should('not.be.disabled');
        cy.checkA11y('vl-select-rich');

        // Dropdown is al open na de Hasselt click (disabled optie sluit de dropdown niet)
        cy.get('vl-select-rich').shadow().find('.vl-select__list--dropdown').should('be.visible');
        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('select-rich-single-disabled-option-open');
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

        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; min-height: 450px; padding: 20px; background: white;">
                <vl-select-rich label="geboorteplaats" .options=${options}></vl-select-rich>
            </div>
        `);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__group').contains('België');
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__group').contains('Puerto Rico');
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__item').contains('Hasselt');
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__item').contains('Turnhout');
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__item').contains('Knokke-Heist');
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__item').contains('Waregem');
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__item').contains('Lier');
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__item').contains('Rio Piedras');
        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('select-rich-single-groups-open');

        // TODO: het is niet accessible als de dropdown open is
        // cy.checkA11y('vl-select-rich');
    });

    it('should dispatch vl-change event on select and delete option', () => {
        cy.mount(html`<vl-select-rich label="geboorteplaats" .options=${options}></vl-select-rich>`);

        cy.createStubForEvent('vl-select-rich', 'vl-change');
        cy.injectAxe();
        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__item').contains('Hasselt').click();
        cy.get('@vl-change')
            .should('have.been.calledTwice')
            .its('secondCall.args.0.detail')
            .should('deep.equal', { value: 'hasselt' });
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-input-field')
            .find('.vl-select__item')
            .find('.vl-pill__close')
            .click();
        cy.get('@vl-change')
            .should('have.been.calledThrice')
            .its('thirdCall.args.0.detail')
            .should('deep.equal', { value: null });
        cy.checkA11y('vl-select-rich');
    });

    it('should dispatch vl-input on select and delete option', () => {
        cy.mount(html`<vl-select-rich label="geboorteplaats" .options=${options}></vl-select-rich>`);
        cy.injectAxe();
        cy.checkA11y('vl-select-rich');
        cy.createStubForEvent('vl-select-rich', 'vl-input');
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click({ force: true });
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__item').contains('Hasselt').click();
        cy.get('@vl-input')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { value: 'hasselt' });
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-input-field')
            .find('.vl-select__item')
            .find('.vl-pill__close')
            .click();
        cy.get('@vl-input')
            .should('have.been.calledTwice')
            .its('secondCall.args.0.detail')
            .should('deep.equal', { value: null });
        cy.checkA11y('vl-select-rich');
    });

    it('should dispatch vl-change, but not vl-input when programmatically selecting and deleting option', () => {
        cy.mount(html`<vl-select-rich label="geboorteplaats" .options=${options}></vl-select-rich>`);
        cy.createStubForEvent('vl-select-rich', 'vl-change');
        cy.createStubForEvent('vl-select-rich', 'vl-input');
        cy.injectAxe();
        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').then((el) => {
            const select = el[0] as VlSelectRichComponent;
            select.selectByValue('hasselt');
        });

        cy.get('@vl-change')
            .should('have.been.calledTwice')
            .its('secondCall.args.0.detail')
            .should('deep.equal', { value: 'hasselt' });

        cy.get('@vl-input').should('to.not.have.been.called.at.all');

        cy.get('vl-select-rich').then((el) => {
            const select = el[0] as VlSelectRichComponent;
            select.removeSelectionByValue('hasselt');
        });

        cy.get('@vl-change')
            .should('have.been.calledThrice')
            .its('thirdCall.args.0.detail')
            .should('deep.equal', { value: null });
        cy.checkA11y('vl-select-rich');

        cy.get('@vl-input').should('to.not.have.been.called.at.all');
    });

    it('should dispatch vl-input when user selects after async options load', () => {
        cy.mount(html`<vl-select-rich label="geboorteplaats"></vl-select-rich>`);
        cy.get('vl-select-rich').then((el) => {
            (el[0] as VlSelectRichComponent).options = [
                { label: 'Hasselt', value: 'hasselt' },
                { label: 'Turnhout', value: 'turnhout' },
            ];
        });
        cy.createStubForEvent('vl-select-rich', 'vl-input');
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click({ force: true });
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__item').contains('Hasselt').click();
        cy.get('@vl-input')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { value: 'hasselt' });
    });

    it('should NOT dispatch vl-input when options are loaded programmatically with pre-selected values', () => {
        cy.mount(html`<vl-select-rich label="geboorteplaats"></vl-select-rich>`);
        cy.createStubForEvent('vl-select-rich', 'vl-input');
        cy.get('vl-select-rich').then((el) => {
            (el[0] as VlSelectRichComponent).options = [
                { label: 'Hasselt', value: 'hasselt', selected: true },
                { label: 'Turnhout', value: 'turnhout' },
            ];
        });
        cy.get('@vl-input').should('to.not.have.been.called.at.all');
    });

    it('should dispatch vl-input when user selects after options are loaded asynchronously', () => {
        cy.mount(html`<vl-select-rich label="geboorteplaats"></vl-select-rich>`);
        cy.createStubForEvent('vl-select-rich', 'vl-input');
        cy.get('vl-select-rich').then(
            (el) =>
                new Cypress.Promise<void>((resolve) => {
                    setTimeout(() => {
                        (el[0] as VlSelectRichComponent).options = [
                            { label: 'Hasselt', value: 'hasselt' },
                            { label: 'Turnhout', value: 'turnhout' },
                        ];
                        resolve();
                    }, 250);
                })
        );
        cy.get('@vl-input').should('to.not.have.been.called.at.all');
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click({ force: true });
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__item').contains('Hasselt').click();
        cy.get('@vl-input')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { value: 'hasselt' });
    });

    it('should dispatch vl-change but NOT vl-input on selectByValue / removeSelectionByValue / removeAllSelections', () => {
        cy.mount(html`<vl-select-rich label="geboorteplaats" .options=${options}></vl-select-rich>`);
        cy.createStubForEvent('vl-select-rich', 'vl-change');
        cy.createStubForEvent('vl-select-rich', 'vl-input');
        cy.injectAxe();
        cy.checkA11y('vl-select-rich');

        cy.get('vl-select-rich').then((el) => {
            (el[0] as VlSelectRichComponent).selectByValue('hasselt');
        });
        cy.get('@vl-change')
            .should('have.been.calledTwice')
            .its('secondCall.args.0.detail')
            .should('deep.equal', { value: 'hasselt' });
        cy.get('@vl-input').should('to.not.have.been.called.at.all');

        cy.get('vl-select-rich').then((el) => {
            (el[0] as VlSelectRichComponent).removeSelectionByValue('hasselt');
        });
        cy.get('@vl-change')
            .should('have.been.calledThrice')
            .its('thirdCall.args.0.detail')
            .should('deep.equal', { value: null });
        cy.get('@vl-input').should('to.not.have.been.called.at.all');

        cy.get('vl-select-rich').then((el) => {
            (el[0] as VlSelectRichComponent).selectByValue('turnhout');
        });
        cy.get('@vl-change')
            .should('have.callCount', 4)
            .its('lastCall.args.0.detail')
            .should('deep.equal', { value: 'turnhout' });
        cy.get('@vl-input').should('to.not.have.been.called.at.all');

        cy.get('vl-select-rich').then((el) => {
            (el[0] as VlSelectRichComponent).removeAllSelections();
        });
        cy.get('@vl-change')
            .should('have.callCount', 5)
            .its('lastCall.args.0.detail')
            .should('deep.equal', { value: null });
        cy.get('@vl-input').should('to.not.have.been.called.at.all');
    });

    it('should dispatch vl-change but NOT vl-input on setSelectedValues', () => {
        cy.mount(html`<vl-select-rich label="geboorteplaats" .options=${options}></vl-select-rich>`);
        cy.createStubForEvent('vl-select-rich', 'vl-change');
        cy.createStubForEvent('vl-select-rich', 'vl-input');
        cy.injectAxe();
        cy.checkA11y('vl-select-rich');

        cy.get('vl-select-rich').then((el) => {
            (el[0] as VlSelectRichComponent).setSelectedValues('hasselt');
        });
        cy.get('@vl-change')
            .should('have.been.calledTwice')
            .its('secondCall.args.0.detail')
            .should('deep.equal', { value: 'hasselt' });
        cy.get('@vl-input').should('to.not.have.been.called.at.all');

        cy.get('vl-select-rich').then((el) => {
            (el[0] as VlSelectRichComponent).setSelectedValues('turnhout');
        });
        cy.get('@vl-change')
            .should('have.been.calledThrice')
            .its('lastCall.args.0.detail')
            .should('deep.equal', { value: 'turnhout' });
        cy.get('@vl-input').should('to.not.have.been.called.at.all');
    });

    it('should dispatch vl-select-search event on input search value', () => {
        cy.mount(
            html`<vl-select-rich
                label="geboorteplaats"
                placeholder="zoek geboorteplaats"
                search
                .options=${options}
            ></vl-select-rich>`
        );
        cy.injectAxe();
        cy.createStubForEvent('vl-select-rich', 'vl-select-search');

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich').shadow().find('input').type('t');
        cy.get('@vl-select-search')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { value: 't' });
        cy.get('vl-select-rich').shadow().find('input').clear();
        cy.get('@vl-select-search')
            .should('have.been.calledTwice')
            .its('secondCall.args.0.detail')
            .should('deep.equal', { value: '' });
        cy.checkA11y('vl-select-rich');
    });

    it('should dispatch vl-valid event on valid selection', () => {
        cy.mount(html`<vl-select-rich label="geboorteplaats" .options=${options} required></vl-select-rich>`);
        cy.createStubForEvent('vl-select-rich', 'vl-valid');
        cy.createStubForEvent('vl-select-rich', 'vl-change');
        cy.createStubForEvent('vl-select-rich', 'vl-input');
        cy.injectAxe();
        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__item').contains('Hasselt').click();
        cy.get('@vl-valid')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { value: 'hasselt' });
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-input-field')
            .find('.vl-select__item')
            .find('.vl-pill__close')
            .click();
        cy.get('@vl-valid').should('have.been.calledOnce');
        cy.get('@vl-input').should('have.been.calledTwice');
        cy.get('@vl-change').should('have.been.calledThrice');
        cy.checkA11y('vl-select-rich');
    });

    it('should select option', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; min-height: 400px; padding: 20px; background: white;">
                <vl-select-rich label="geboorteplaats" .options=${options}></vl-select-rich>
            </div>
        `);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('select-rich-single-dropdown-open');
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__item').contains('Hasselt').click();
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Hasselt')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Turnhout')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Knokke-Heist')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Waregem')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Lier')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Rio Piedras')
            .should('not.have.attr', 'selected');
        cy.checkA11y('vl-select-rich');
    });

    it('should delete option', () => {
        cy.mount(html`<vl-select-rich label="geboorteplaats" .options=${options}></vl-select-rich>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__item').contains('Hasselt').click();
        cy.get('vl-select-rich').shadow().find('select').find('option').contains('Hasselt');
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-input-field')
            .find('.vl-select__item')
            .find('.vl-pill__close')
            .click();
        cy.get('vl-select-rich').shadow().find('select').find('option').should('not.have.attr', 'selected');
        cy.checkA11y('vl-select-rich');
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

        cy.mount(html`<vl-select-rich label="geboorteplaats" .options=${options}></vl-select-rich>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Hasselt')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Turnhout')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Knokke-Heist')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Waregem')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Lier')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Rio Piedras')
            .should('not.have.attr', 'selected');

        cy.get('vl-select-rich').then((el) => {
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

        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Turnhout')
            .should('have.attr', 'selected');

        cy.get('vl-select-rich').then((el) => {
            const select = el[0] as VlSelectRichComponent;
            select.removeSelectionByValue('hasselt');
        });

        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Hasselt')
            .should('not.have.attr', 'selected');

        cy.get('vl-select-rich').then((el) => {
            const select = el[0] as VlSelectRichComponent;
            select.selectByValue('hasselt');
        });

        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Hasselt')
            .should('have.attr', 'selected');

        cy.checkA11y('vl-select-rich');
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

        cy.mount(html`<vl-select-rich label="geboorteplaats" .options=${options}></vl-select-rich>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Hasselt')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Turnhout')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Knokke-Heist')
            .should('have.attr', 'selected');

        cy.get('vl-select-rich').then((el) => {
            const select = el[0] as VlSelectRichComponent;
            select.setOptions(newOptions);
        });

        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Waregem')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Lier')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Rio Piedras')
            .should('not.have.attr', 'selected');

        cy.checkA11y('vl-select-rich');
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

        cy.mount(html`<vl-select-rich label="geboorteplaats" .options=${options}></vl-select-rich>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Hasselt')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Turnhout')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Knokke-Heist')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Waregem')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Lier')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Rio Piedras')
            .should('not.have.attr', 'selected');

        cy.get('vl-select-rich').then((el) => {
            const select = el[0] as VlSelectRichComponent;
            select.removeSelectionByValue('knokke-heist');
        });

        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Knokke-Heist')
            .should('not.have.attr', 'selected');

        cy.get('vl-select-rich').then((el) => {
            const select = el[0] as VlSelectRichComponent;
            select.selectByValue('rio piedras');
        });

        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Rio Piedras')
            .should('have.attr', 'selected');

        cy.checkA11y('vl-select-rich');
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

        cy.mount(html`<vl-select-rich label="geboorteplaats" .options=${options}></vl-select-rich>`);
        cy.createStubForEvent('vl-select-rich', 'vl-change');
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Hasselt')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Turnhout')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Knokke-Heist')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Waregem')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Lier')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Rio Piedras')
            .should('not.have.attr', 'selected');

        cy.get('@vl-change')
            .should('have.been.calledTwice')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { value: 'knokke-heist' });

        cy.get('vl-select-rich').then((el) => {
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

        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Knokke-Heist')
            .should('not.have.attr', 'selected');

        cy.get('vl-select-rich').then((el) => {
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

        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Rio Piedras')
            .should('have.attr', 'selected');

        cy.get('@vl-change').its('lastCall.args.0.detail').should('deep.equal', { value: 'rio piedras' });

        cy.checkA11y('vl-select-rich');
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

        cy.mount(html`<vl-select-rich label="hobby's" .options=${options}></vl-select-rich>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Padel')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Dans')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Drummen')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Zwemmen')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Boardgames')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Fietsen')
            .should('not.have.attr', 'selected');

        cy.get('vl-select-rich').then((el) => {
            const select = el[0] as VlSelectRichComponent;
            select.removeAllSelections();
        });

        cy.get('vl-select-rich').shadow().find('select').find('option').should('not.have.attr', 'selected');

        cy.checkA11y('vl-select-rich');
    });

    it('should return selected value when calling getSelected()', () => {
        cy.mount(html`<vl-select-rich label="geboorteplaats" .options=${options}></vl-select-rich>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');

        cy.runTestFor<VlSelectRichComponent>('vl-select-rich', (component) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            expect(component.getSelected()).to.be.null;
        });

        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__item').contains('Hasselt').click();
        cy.runTestFor<VlSelectRichComponent>('vl-select-rich', (component) => {
            expect(component.getSelected()).to.equal('hasselt');
        });
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Turnhout')
            .click();
        cy.runTestFor<VlSelectRichComponent>('vl-select-rich', (component) => {
            expect(component.getSelected()).to.equal('turnhout');
        });
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-input-field')
            .find('.vl-select__item')
            .find('.vl-pill__close')
            .click({ force: true });

        cy.runTestFor<VlSelectRichComponent>('vl-select-rich', (component) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            expect(component.getSelected()).to.be.null;
        });

        cy.checkA11y('vl-select-rich');
    });
});

describe('cypress-component - form components - vl-select-rich - multiple', () => {
    const options: SelectRichOption[] = [
        { label: 'Padel', value: 'padel' },
        { label: 'Dans', value: 'dans' },
        { label: 'Drummen', value: 'drummen' },
        { label: 'Zwemmen', value: 'zwemmen' },
        { label: 'Boardgames', value: 'boardgames' },
        { label: 'Fietsen', value: 'fietsen' },
    ];

    beforeEach(() => {
        cy.viewport(1200, 800);
    });

    it('should mount', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-select-rich
                    label="hobby's"
                    placeholder="Vul hobby's in"
                    multiple
                    .options=${options}
                ></vl-select-rich>
            </div>
        `);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('select');
        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('select-rich-multiple-mount');
    });

    it('should search', () => {
        cy.mount(html`
            <div class="snapshot-wrapper" style="width: 400px; min-height: 300px; padding: 20px; background: white;">
                <vl-select-rich
                    label="hobby's"
                    placeholder="Vul hobby's in"
                    multiple
                    search
                    .options=${options}
                ></vl-select-rich>
            </div>
        `);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        // Wacht tot de dropdown zichtbaar is (requestAnimationFrame afgerond, input.focus() aangeroepen)
        // zodat isFocussed=true is wanneer we typen, anders slaat _handleSearch de search over.
        cy.get('vl-select-rich').shadow().find('.vl-select__list--dropdown').should('be.visible');
        cy.get('vl-select-rich').shadow().find('input').type('Padel');
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__item').contains('Padel');
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Dans')
            .should('not.exist');
        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('select-rich-multiple-search-open');
        cy.checkA11y('vl-select-rich');
    });

    it('should dispatch vl-change event on select and delete option', () => {
        cy.mount(html`<vl-select-rich
            label="hobby's"
            placeholder="Vul hobby's in"
            multiple
            .options=${options}
        ></vl-select-rich>`);
        cy.injectAxe();

        cy.createStubForEvent('vl-select-rich', 'vl-change');
        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__item').contains('Padel').click();
        cy.get('@vl-change')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { value: ['padel'] });
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__item').contains('Dans').click();
        cy.get('@vl-change')
            .should('have.been.calledTwice')
            .its('secondCall.args.0.detail')
            .should('deep.equal', { value: ['padel', 'dans'] });
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-input-field')
            .find('.vl-select__item[data-value="padel"]')
            .find('.vl-pill__close')
            .click();
        cy.get('@vl-change').its('callCount').should('eq', 3);
        cy.get('@vl-change')
            .its('lastCall.args.0.detail')
            .should('deep.equal', { value: ['dans'] });
        cy.checkA11y('vl-select-rich');
    });

    it('should dispatch vl-input event on select and delete option', () => {
        cy.mount(html`<vl-select-rich
            label="hobby's"
            placeholder="Vul hobby's in"
            multiple
            .options=${options}
        ></vl-select-rich>`);
        cy.injectAxe();

        cy.createStubForEvent('vl-select-rich', 'vl-input');
        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__item').contains('Padel').click();
        cy.get('@vl-input')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { value: ['padel'] });
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__item').contains('Dans').click();
        cy.get('@vl-input')
            .should('have.been.calledTwice')
            .its('secondCall.args.0.detail')
            .should('deep.equal', { value: ['padel', 'dans'] });
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-input-field')
            .find('.vl-select__item[data-value="padel"]')
            .find('.vl-pill__close')
            .click();
        cy.get('@vl-input').its('callCount').should('eq', 3);
        cy.get('@vl-input')
            .its('lastCall.args.0.detail')
            .should('deep.equal', { value: ['dans'] });
        cy.checkA11y('vl-select-rich');
    });

    it('should dispatch vl-change, but not vl-input when programmatically selecting and deleting option', () => {
        cy.mount(html`<vl-select-rich
            label="hobby's"
            placeholder="Vul hobby's in"
            multiple
            .options=${options}
        ></vl-select-rich>`);
        cy.createStubForEvent('vl-select-rich', 'vl-change');
        cy.createStubForEvent('vl-select-rich', 'vl-input');
        cy.injectAxe();
        cy.checkA11y('vl-select-rich');

        cy.get('vl-select-rich').then((el) => {
            const select = el[0] as VlSelectRichComponent;
            select.selectByValue('padel');
        });

        cy.get('@vl-change')
            .should('have.been.calledTwice')
            .its('secondCall.args.0.detail')
            .should('deep.equal', { value: ['padel'] });

        cy.get('@vl-input').should('to.not.have.been.called.at.all');

        cy.get('vl-select-rich').then((el) => {
            const select = el[0] as VlSelectRichComponent;
            select.selectByValue('dans');
        });

        cy.get('@vl-change')
            .should('have.been.calledThrice')
            .its('thirdCall.args.0.detail')
            .should('deep.equal', { value: ['padel', 'dans'] });

        cy.get('@vl-input').should('to.not.have.been.called.at.all');

        cy.checkA11y('vl-select-rich');

        cy.get('vl-select-rich').then((el) => {
            const select = el[0] as VlSelectRichComponent;
            select.removeSelectionByValue('padel');
        });

        cy.get('@vl-change')
            .its('lastCall.args.0.detail')
            .should('deep.equal', { value: ['dans'] });
        cy.get('@vl-input').should('to.not.have.been.called.at.all');
        cy.checkA11y('vl-select-rich');
    });

    it('should select multiple options', () => {
        cy.mount(html`<vl-select-rich
            label="hobby's"
            placeholder="Vul hobby's in"
            multiple
            .options=${options}
        ></vl-select-rich>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__item').contains('Padel').click();
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__item').contains('Dans').click();
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__item').contains('Drummen').click();
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Padel')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Dans')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Drummen')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Zwemmen')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Boardgames')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Fietsen')
            .should('not.have.attr', 'selected');
        cy.checkA11y('vl-select-rich');
    });

    it('should delete multiple options', () => {
        cy.mount(html`<vl-select-rich
            label="hobby's"
            placeholder="Vul hobby's in"
            multiple
            .options=${options}
        ></vl-select-rich>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__item').contains('Padel').click();
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__item').contains('Dans').click();
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__item').contains('Drummen').click();
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Padel')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Dans')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Drummen')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-input-field')
            .find('.vl-select__item[data-value="padel"]')
            .find('.vl-pill__close')
            .click();
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Padel')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich').shadow().find('select').find('option').contains('Dans');
        cy.get('vl-select-rich').shadow().find('select').find('option').contains('Drummen');
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-input-field')
            .find('.vl-select__item[data-value="dans"]')
            .find('.vl-pill__close')
            .click();
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Padel')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Dans')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich').shadow().find('select').find('option').contains('Drummen');
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-input-field')
            .find('.vl-select__item[data-value="drummen"]')
            .find('.vl-pill__close')
            .click();
        cy.get('vl-select-rich').shadow().find('select').find('option').should('not.have.attr', 'selected');
        cy.checkA11y('vl-select-rich');
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
            <div class="snapshot-wrapper" style="width: 400px; padding: 20px; background: white;">
                <vl-select-rich
                    label="hobby's"
                    placeholder="Vul hobby's in"
                    multiple
                    .options=${options}
                ></vl-select-rich>
            </div>
        `);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.wait(100);
        cy.get('.snapshot-wrapper').matchImageSnapshot('select-rich-multiple-selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Padel')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Dans')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Drummen')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Zwemmen')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Boardgames')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Fietsen')
            .should('not.have.attr', 'selected');
        cy.checkA11y('vl-select-rich');

        cy.get('vl-select-rich').then((el) => {
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

        cy.get('vl-select-rich').shadow().find('select').find('option').should('have.attr', 'selected');
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

        cy.mount(html`<vl-select-rich
            label="hobby's"
            placeholder="Vul hobby's in"
            multiple
            .options=${options}
        ></vl-select-rich>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Padel')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Dans')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Drummen')
            .should('have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Zwemmen')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Boardgames')
            .should('not.have.attr', 'selected');
        cy.get('vl-select-rich')
            .shadow()
            .find('select')
            .find('option')
            .contains('Fietsen')
            .should('not.have.attr', 'selected');

        cy.get('vl-select-rich').then((el) => {
            const select = el[0] as VlSelectRichComponent;
            select.removeAllSelections();
        });

        cy.get('vl-select-rich').shadow().find('select').find('option').should('not.have.attr', 'selected');

        cy.checkA11y('vl-select-rich');
    });

    it('should return selected values when calling getSelected()', () => {
        cy.mount(html`<vl-select-rich
            label="hobby's"
            placeholder="Vul hobby's in"
            multiple
            .options=${options}
        ></vl-select-rich>`);
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.runTestFor<VlSelectRichComponent>('vl-select-rich', (component) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            expect(component.getSelected()).to.be.empty;
        });
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__item').contains('Padel').click();
        cy.runTestFor<VlSelectRichComponent>('vl-select-rich', (component) => {
            expect(component.getSelected()).to.have.members(['padel']);
        });
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('Dans')
            .click({ force: true });
        cy.runTestFor<VlSelectRichComponent>('vl-select-rich', (component) => {
            expect(component.getSelected()).to.have.members(['padel', 'dans']);
        });
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-input-field')
            .find('.vl-select__item[data-value="padel"]')
            .find('.vl-pill__close')
            .click();
        cy.runTestFor<VlSelectRichComponent>('vl-select-rich', (component) => {
            expect(component.getSelected()).to.have.members(['dans']);
        });
        // issue with aria-activedescendant
        // cy.checkA11y('vl-select-rich');
    });
});

describe('cypress-component - form components - vl-select-rich - single in form', () => {
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
                <vl-select-rich
                    id="geboorteplaats"
                    name="geboorteplaats"
                    .options=${options}
                    search
                    required
                ></vl-select-rich>
                <button class="vl-button" type="submit">Verstuur</button>
            </form>
        `);
    });

    it('should submit value', () => {
        const submittedFormData = {
            geboorteplaats: 'hasselt',
        };

        cy.createStubForEvent('form', 'submit');

        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__item').contains('Hasselt').click();
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
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__item').contains('Hasselt').click();
        cy.get('vl-select-rich').shadow().find('select').find('option').contains('Hasselt');
        cy.get('form').find('button[type="submit"]').click();
        cy.get('@submit').should('have.been.calledOnce');
    });

    it('should not submit form on press enter', () => {
        cy.createStubForEvent('form', 'submit');

        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich').shadow().find('.vl-select__list').find('.vl-select__item').contains('Hasselt').click();
        cy.get('vl-select-rich').shadow().find('select').find('option').contains('Hasselt');
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich').shadow().find('input.vl-input-field').type('{enter}');
        cy.get('@submit').should('not.have.been.called');
    });

    it('mouse events should bubble, type events should not', () => {
        cy.createStubForEvent('form', 'mouseover');
        cy.createStubForEvent('form', 'keydown');

        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich').shadow().find('input.vl-input-field').type('Ha');
        cy.get('@mouseover').should('have.been.called');
        cy.get('@keydown').should('not.have.been.called');
    });
});

describe('cypress-component - form components - vl-select-rich - multiple in form', () => {
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
                <vl-select-rich multiple id="plaats" name="plaats" .options=${options} search required></vl-select-rich>
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

        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich')
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

        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich')
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

        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich')
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

        cy.get('vl-select-rich').then((el) => {
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

    it('should set initial options and be able to modify', () => {
        const submittedFormData = {
            plaats: ['hasselt', 'turnhout', 'knokke-heist', 'lier'],
        };
        const submittedAfterResetFormData = {
            plaats: ['waregem', 'rio piedras'],
        };

        cy.createStubForEvent('form', 'submit');

        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich')
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

        cy.get('vl-select-rich').then((el) => {
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
    });
});

describe('cypress-component - form components - vl-select-rich - search strategies', () => {
    const newspaperOptions: SelectRichOption[] = [
        { label: 'De Morgen van gisteren', value: 'De Morgen van gisteren' },
        { label: 'De Standaard van gisteren', value: 'De Standaard van gisteren' },
        { label: 'De Standaard van morgen', value: 'De Standaard van morgen' },
        { label: 'De Standaard van Berchem', value: 'De Standaard van Berchem' },
        { label: 'De Standaard van Gent', value: 'De Standaard van Gent' },
        { label: 'Brussel Antwerpen Gent', value: 'Brussel Antwerpen Gent' },
    ];

    beforeEach(() => {
        cy.viewport(1200, 800);
    });

    it('should use default fuzzy search strategy', () => {
        cy.mount(
            html`<vl-select-rich
                label="krant"
                placeholder="Kies een krant"
                search
                search-strategy="default"
                result-limit="20"
                .options=${newspaperOptions}
            ></vl-select-rich>`
        );
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();

        // Test fuzzy search - typo should still find results
        cy.get('vl-select-rich').shadow().find('input').type('standrd');
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .should('have.length.greaterThan', 0);

        cy.checkA11y('vl-select-rich');
    });

    it('should use exact-and search strategy', () => {
        cy.mount(
            html`<vl-select-rich
                label="krant"
                placeholder="Kies een krant"
                search
                search-strategy="exact-and"
                result-limit="20"
                .options=${newspaperOptions}
            ></vl-select-rich>`
        );
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();

        // Search for "morgen standaard" - should only find "De Standaard van morgen" (1 result)
        cy.get('vl-select-rich').shadow().find('input').type('morgen standaard');
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .should('have.length', 1);
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('De Standaard van morgen');

        cy.checkA11y('vl-select-rich');
    });

    it('should use exact-or search strategy', () => {
        cy.mount(
            html`<vl-select-rich
                label="krant"
                placeholder="Kies een krant"
                search
                search-strategy="exact-or"
                result-limit="20"
                .options=${newspaperOptions}
            ></vl-select-rich>`
        );
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        cy.wait(100);
        cy.matchImageSnapshot('select-rich-exact-or-open');

        // Search for "morgen standaard" - should find all items with "morgen" OR "standaard" (5 results)
        cy.get('vl-select-rich').shadow().find('input').type('morgen standaard');
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .should('have.length', 5);
        cy.wait(100);
        cy.matchImageSnapshot('select-rich-exact-or-search-results');

        cy.checkA11y('vl-select-rich');
    });

    it('should switch from default to exact-and strategy', () => {
        cy.mount(
            html`<vl-select-rich
                id="test-select"
                label="krant"
                placeholder="Kies een krant"
                search
                search-strategy="default"
                result-limit="20"
                .options=${newspaperOptions}
            ></vl-select-rich>`
        );
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();

        // With default strategy, fuzzy search should work
        cy.get('vl-select-rich').shadow().find('input').type('morgen');
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .should('have.length.greaterThan', 0);

        // Clear search
        cy.get('vl-select-rich').shadow().find('input').clear();

        // Switch to exact-and strategy
        cy.get('vl-select-rich').then((el) => {
            const select = el[0] as VlSelectRichComponent;
            select.setAttribute('search-strategy', 'exact-and');
        });

        // Search with exact-and - both words must be present
        cy.get('vl-select-rich').shadow().find('input').type('morgen standaard');
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .should('have.length', 1);

        cy.checkA11y('vl-select-rich');
    });

    it('should switch from exact-and to exact-or strategy', () => {
        cy.mount(
            html`<vl-select-rich
                label="krant"
                placeholder="Kies een krant"
                search
                search-strategy="exact-and"
                result-limit="20"
                .options=${newspaperOptions}
            ></vl-select-rich>`
        );
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();

        // With exact-and, should find 1 result
        cy.get('vl-select-rich').shadow().find('input').type('morgen standaard');
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .should('have.length', 1);

        // Clear search
        cy.get('vl-select-rich').shadow().find('input').clear();

        // Switch to exact-or strategy
        cy.get('vl-select-rich').then((el) => {
            const select = el[0] as VlSelectRichComponent;
            select.setAttribute('search-strategy', 'exact-or');
        });

        // Search with exact-or - any word can be present
        cy.get('vl-select-rich').shadow().find('input').type('morgen standaard');
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .should('have.length', 5);

        cy.checkA11y('vl-select-rich');
    });

    it('should handle adding characters with exact-or strategy', () => {
        cy.mount(
            html`<vl-select-rich
                label="krant"
                placeholder="Kies een krant"
                search
                search-strategy="exact-or"
                result-limit="20"
                .options=${newspaperOptions}
            ></vl-select-rich>`
        );
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();

        // Search for "morgen" - should find 2 results
        cy.get('vl-select-rich').shadow().find('input').type('morgen');
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .should('have.length', 2);

        // Add " standaard" - should find 5 results (OR logic)
        cy.get('vl-select-rich').shadow().find('input').type(' standaard');
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .should('have.length', 5);

        cy.checkA11y('vl-select-rich');
    });

    it('should handle removing characters with exact-or strategy', () => {
        cy.mount(
            html`<vl-select-rich
                label="krant"
                placeholder="Kies een krant"
                search
                search-strategy="exact-or"
                result-limit="20"
                .options=${newspaperOptions}
            ></vl-select-rich>`
        );
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();

        // Search for "morgen standaard" - should find 5 results
        cy.get('vl-select-rich').shadow().find('input').type('morgen standaard');
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .should('have.length', 5);

        // Remove " standaard" by clearing and typing "morgen" - should find 2 results
        cy.get('vl-select-rich').shadow().find('input').clear();
        cy.get('vl-select-rich').shadow().find('input').type('morgen');
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .should('have.length', 2);

        // Clear completely - should show all 6 options
        cy.get('vl-select-rich').shadow().find('input').clear();
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .should('have.length', 6);

        cy.checkA11y('vl-select-rich');
    });

    it('should handle adding and removing characters with exact-and strategy', () => {
        cy.mount(
            html`<vl-select-rich
                label="krant"
                placeholder="Kies een krant"
                search
                search-strategy="exact-and"
                result-limit="20"
                .options=${newspaperOptions}
            ></vl-select-rich>`
        );
        cy.injectAxe();

        cy.checkA11y('vl-select-rich');
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();

        // Search for "standaard" - should find 4 results
        cy.get('vl-select-rich').shadow().find('input').type('standaard');
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .should('have.length', 4);

        // Add " gent" - should find 1 result (AND logic)
        cy.get('vl-select-rich').shadow().find('input').type(' gent');
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .should('have.length', 1);
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .contains('De Standaard van Gent');

        // Remove " gent" - should find 4 results again
        cy.get('vl-select-rich').shadow().find('input').clear();
        cy.get('vl-select-rich').shadow().find('input').type('standaard');
        cy.get('vl-select-rich')
            .shadow()
            .find('.vl-select__list')
            .find('.vl-select__item')
            .should('have.length', 4);

        cy.checkA11y('vl-select-rich');
    });
});

describe('vl-select-rich - blur-validation', () => {
    const mount = () => {
        cy.mount(html`
            <form>
                <vl-select-rich
                    id="sr"
                    name="sr"
                    required
                    blur-validation
                    .options=${[
                        { label: 'Een', value: 'een' },
                        { label: 'Twee', value: 'twee' },
                    ] as SelectRichOption[]}
                ></vl-select-rich>
                <vl-form-message for="sr" state="valueMissing">Verplicht.</vl-form-message>
            </form>
        `);
    };

    it('should show error on blur after focus, even without selection', () => {
        mount();
        cy.get('vl-select-rich').then(($el) => {
            const sr = $el[0] as VlSelectRichComponent;
            sr.dispatchEvent(new FocusEvent('focusout', { bubbles: true, composed: true }));
        });
        cy.get('vl-form-message[state="valueMissing"]').should('have.attr', 'show');
    });

    it('should show error after simulated user-mutation + blur (base-class isolation)', () => {
        mount();
        cy.get('vl-select-rich').then(($el) => {
            const sr = $el[0] as VlSelectRichComponent;
            sr.dispatchEvent(new CustomEvent('vl-input', { bubbles: true, composed: true, detail: { value: '' } }));
            sr.dispatchEvent(new FocusEvent('focusout', { bubbles: true, composed: true }));
        });
        cy.get('vl-form-message[state="valueMissing"]').should('have.attr', 'show');
    });

    it('should not show error after real option pick (selection makes valid)', () => {
        mount();
        cy.get('vl-select-rich').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich').shadow().find('.vl-select__list .vl-select__item').first().click();
        cy.get('vl-form-message[state="valueMissing"]').should('not.have.attr', 'show');
    });
});
