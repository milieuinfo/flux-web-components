import { registerWebComponents } from '@domg-wc/common';
import { vlGridStyles } from '@domg-wc/styles';
import { html } from 'lit';
import { VlTextComponent } from '../../atom/text/vl-text.component';
import { VlTooltipComponent } from '../../block/tooltip';
import { VlInputFieldComponent } from '../input-field';
import { VlFormLabelComponent } from './vl-form-label.component';

registerWebComponents([VlFormLabelComponent, VlInputFieldComponent, VlTextComponent, VlTooltipComponent]);

describe('cypress-component - form components - vl-form-label - properties & states', () => {
    beforeEach(() => {
        cy.viewport(1200, 800);
    });

    it('should mount', () => {
        cy.mount(html` <vl-form-label>Naam</vl-form-label>`);

        cy.get('vl-form-label')
            .shadow()
            .find('label')
            .shouldHaveComputedStyle({ style: 'color', value: 'rgb(77, 77, 75)' });
    });

    it('should be accessible', () => {
        cy.mount(html` <vl-form-label>Naam</vl-form-label>`);
        cy.injectAxe();

        cy.checkA11y('vl-form-label');
    });

    it('should set for', () => {
        cy.mount(html` <vl-form-label for="test-input">Naam</vl-form-label>`);

        cy.get('vl-form-label').shadow().find('label').should('have.attr', 'for', 'test-input');
    });

    it('should set label', () => {
        cy.mount(html` <vl-form-label label="Naam"></vl-form-label>`);

        cy.get('vl-form-label').shadow().find('label').contains('Naam');
    });

    it('should set label with default slot', () => {
        cy.mount(html` <vl-form-label>Adres</vl-form-label>`);

        cy.get('vl-form-label').contains('Adres');
        cy.get('vl-form-label').shadow().find('label').should('contain.html', 'slot');
    });

    it('should prioritise label-attribute when slotted content', () => {
        cy.mount(html` <vl-form-label label="Naam">Adres</vl-form-label>`);

        cy.get('vl-form-label').shadow().find('label').contains('Naam');
        cy.get('vl-form-label').shadow().find('label').should('not.contain.html', 'slot');
    });

    it('should set default slot', () => {
        cy.mount(html` <vl-form-label label="Naam">Voornaam</vl-form-label>`);

        cy.get('vl-form-label').contains('Voornaam');
    });

    it('should set block', () => {
        cy.mount(html` <vl-form-label block>Naam</vl-form-label>`);

        cy.get('vl-form-label').shadow().find('label').should('have.class', 'vl-form__label--block');
        cy.get('vl-form-label').shadow().find('label').shouldHaveComputedStyle({ style: 'display', value: 'block' });
    });

    it('should set light', () => {
        cy.mount(html` <vl-form-label light>Naam</vl-form-label>`);

        cy.get('vl-form-label').shadow().find('label').should('have.class', 'vl-form__label--light');
        cy.get('vl-form-label')
            .shadow()
            .find('label')
            .shouldHaveComputedStyle({ style: 'color', value: 'rgb(104, 116, 131)' });
    });

    it('should set annotation', () => {
        cy.mount(html` <vl-form-label label="Naam" annotation="(enkel achternaam)"></vl-form-label>`);

        cy.get('vl-form-label').shadow().find('label').contains('Naam');
        cy.get('vl-form-label').shadow().find('vl-text[annotation]').should('exist');
        cy.get('vl-form-label').shadow().find('vl-text[annotation]').contains('(enkel achternaam)');
    });

    it('should not render annotation when not set', () => {
        cy.mount(html` <vl-form-label label="Naam"></vl-form-label>`);

        cy.get('vl-form-label').shadow().find('vl-text[annotation]').should('not.exist');
    });
});

describe('cypress-component - form components - vl-form-label - in form', () => {
    beforeEach(() => {
        cy.mount(html`
            <style>
                ${vlGridStyles}
            </style>
            <form id="form" class="vl-form">
                <div class="vl-grid">
                    <div class="vl-column vl-column--3">
                        <vl-form-label for="naam" label="Naam" block></vl-form-label>
                    </div>
                    <div class="vl-column vl-column--9">
                        <vl-input-field id="naam" name="naam"></vl-input-field>
                    </div>
                </div>
            </form>
        `);
    });

    it('should focus form control on click vl-form-label', () => {
        cy.get('vl-input-field').should('not.be.focused');
        cy.get('vl-form-label').click();
        cy.get('vl-input-field').should('be.focused');
    });

    it('should set label on form control', () => {
        cy.get('vl-input-field').should('have.attr', 'label', 'Naam');
    });
});

describe('cypress-component - form components - vl-form-label - default slot in form', () => {
    it('should set the text of the default slot as label on form control', () => {
        cy.mount(html`
            <form class="vl-form">
                <vl-form-label for="naam">
                    Naam <strong>van de <em>aanvrager</em></strong>
                </vl-form-label>
                <vl-input-field id="naam" name="naam"></vl-input-field>
            </form>
        `);

        cy.get('vl-input-field').should('have.attr', 'label', 'Naam van de aanvrager');
        cy.get('vl-input-field').shadow().find('input').should('have.attr', 'aria-label', 'Naam van de aanvrager');
    });

    it('should update label on form control when the text of the default slot changes', () => {
        cy.mount(html`
            <form class="vl-form">
                <vl-form-label for="naam">Naam</vl-form-label>
                <vl-input-field id="naam" name="naam"></vl-input-field>
            </form>
        `);

        cy.get('vl-input-field').should('have.attr', 'label', 'Naam');
        cy.get('vl-form-label').then(($label) => {
            $label[0].firstChild!.textContent = 'Achternaam';
        });
        cy.get('vl-input-field').should('have.attr', 'label', 'Achternaam');
    });

    it('should leave hidden content of the default slot out of the label on form control', () => {
        cy.mount(html`
            <form class="vl-form">
                <vl-form-label for="naam">Naam <span aria-hidden="true">*</span></vl-form-label>
                <vl-input-field id="naam" name="naam"></vl-input-field>
                <vl-form-label for="postcode">Postcode <span hidden>Vier cijfers</span></vl-form-label>
                <vl-input-field id="postcode" name="postcode"></vl-input-field>
            </form>
        `);

        cy.get('vl-input-field#naam').should('have.attr', 'label', 'Naam');
        cy.get('vl-input-field#naam').shadow().find('input').should('have.attr', 'aria-label', 'Naam');
        cy.get('vl-input-field#postcode').should('have.attr', 'label', 'Postcode');
    });

    it('should leave tooltip text in the default slot out of the label on form control', () => {
        cy.mount(html`
            <form class="vl-form">
                <vl-form-label for="postcode"
                    >Postcode <span id="postcode-info" aria-hidden="true">ⓘ</span>
                    <vl-tooltip for="postcode-info">Vier cijfers</vl-tooltip></vl-form-label
                >
                <vl-input-field id="postcode" name="postcode"></vl-input-field>
            </form>
        `);

        cy.get('vl-input-field#postcode').should('have.attr', 'label', 'Postcode');
        cy.get('vl-input-field#postcode').shadow().find('input').should('have.attr', 'aria-label', 'Postcode');
    });

    it('should keep the annotation out of the label on form control', () => {
        cy.mount(html`
            <form class="vl-form">
                <vl-form-label for="telefoon" label="Telefoonnummer" annotation="(optioneel)"></vl-form-label>
                <vl-input-field id="telefoon" name="telefoon"></vl-input-field>
                <vl-form-label for="gsm" annotation="(optioneel)">GSM-nummer</vl-form-label>
                <vl-input-field id="gsm" name="gsm"></vl-input-field>
            </form>
        `);

        cy.get('vl-input-field#telefoon').should('have.attr', 'label', 'Telefoonnummer');
        cy.get('vl-input-field#telefoon').shadow().find('input').should('have.attr', 'aria-label', 'Telefoonnummer');
        cy.get('vl-input-field#gsm').should('have.attr', 'label', 'GSM-nummer');
        cy.get('vl-input-field#gsm').shadow().find('input').should('have.attr', 'aria-label', 'GSM-nummer');
    });

    it('should prioritise label-attribute over the text of the default slot on form control', () => {
        cy.mount(html`
            <form class="vl-form">
                <vl-form-label for="naam" label="Naam">Adres</vl-form-label>
                <vl-input-field id="naam" name="naam"></vl-input-field>
            </form>
        `);

        cy.get('vl-input-field').should('have.attr', 'label', 'Naam');
    });
});
