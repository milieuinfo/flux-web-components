import { registerWebComponents } from '@domg-wc/common';
import { html, nothing, TemplateResult } from 'lit';
import { VlCheckboxComponent } from '../checkbox/vl-checkbox.component';
import { VlDatepickerComponent } from '../datepicker/vl-datepicker.component';
import { VlFormMessageComponent } from '../form-message/vl-form-message.component';
import { VlInputFieldComponent } from '../input-field/vl-input-field.component';
import { VlRadioComponent, VlRadioGroupComponent } from '../radio-group';
import { VlSelectComponent } from '../select/vl-select.component';
import { VlSelectRichComponent } from '../select-rich/vl-select-rich.component';
import { VlTextareaComponent } from '../textarea/vl-textarea.component';
import { VlUploadComponent } from '../upload/vl-upload.component';

registerWebComponents([
    VlCheckboxComponent,
    VlDatepickerComponent,
    VlFormMessageComponent,
    VlInputFieldComponent,
    VlRadioComponent,
    VlRadioGroupComponent,
    VlSelectComponent,
    VlSelectRichComponent,
    VlTextareaComponent,
    VlUploadComponent,
]);

type FormControlUnderTest = {
    tag: string;
    // Het element in de shadow root dat de aria-describedby koppeling draagt.
    target: string;
    template: (describedby: string | typeof nothing) => TemplateResult;
};

const formControls: FormControlUnderTest[] = [
    {
        tag: 'vl-input-field',
        target: 'input',
        template: (describedby) => html`<vl-input-field label="Lengte" describedby=${describedby}></vl-input-field>`,
    },
    {
        tag: 'vl-textarea',
        target: 'textarea',
        template: (describedby) => html`<vl-textarea label="Toelichting" describedby=${describedby}></vl-textarea>`,
    },
    {
        tag: 'vl-select',
        target: 'select',
        template: (describedby) => html`
            <vl-select label="Vervoer" describedby=${describedby}>
                <option value="fiets">Fiets</option>
            </vl-select>
        `,
    },
    {
        // De native select is verborgen door Choices.js; de combobox is het element dat focus krijgt.
        tag: 'vl-select-rich',
        target: '.js-vl-select',
        template: (describedby) => html`
            <vl-select-rich
                label="Vervoer"
                describedby=${describedby}
                .options=${[{ label: 'Fiets', value: 'fiets' }]}
            ></vl-select-rich>
        `,
    },
    {
        tag: 'vl-checkbox',
        target: 'input',
        template: (describedby) => html`<vl-checkbox describedby=${describedby}>Akkoord</vl-checkbox>`,
    },
    {
        tag: 'vl-datepicker',
        target: 'input',
        template: (describedby) => html`<vl-datepicker label="Datum" describedby=${describedby}></vl-datepicker>`,
    },
    {
        tag: 'vl-upload',
        target: 'input',
        template: (describedby) => html`<vl-upload label="Bijlage" describedby=${describedby}></vl-upload>`,
    },
    {
        // De validationTarget van een radio-group zit in de shadow root van een kind-vl-radio, dus de
        // beschrijving hangt op de fieldset van de groep zelf.
        tag: 'vl-radio-group',
        target: 'fieldset',
        template: (describedby) => html`
            <vl-radio-group label="Vervoer" describedby=${describedby}>
                <vl-radio value="fiets">Fiets</vl-radio>
            </vl-radio-group>
        `,
    },
];

formControls.forEach(({ tag, target, template }) => {
    describe(`cypress-component - form components - ${tag} - describedby`, () => {
        const mountWithDescriber = () =>
            cy.mount(html`
                <div>
                    ${template('eenheid')}
                    <span aria-hidden="true">m</span>
                    <span id="eenheid">meter</span>
                </div>
            `);

        it('should mirror the describer text into a hidden span and reference it via aria-describedby', () => {
            mountWithDescriber();

            cy.get(tag).shadow().find('span#description').should('have.text', 'meter');
            cy.get(tag).shadow().find('span#description').should('have.attr', 'hidden');
            cy.get(tag).shadow().find(target).should('have.attr', 'aria-describedby', 'description');
        });

        it('should keep the original describer in the accessibility tree', () => {
            mountWithDescriber();

            cy.get(tag).shadow().find('span#description').should('have.text', 'meter');
            cy.get('span#eenheid').should('not.have.attr', 'aria-hidden');
        });

        it('should not set aria-describedby when describedby is absent', () => {
            cy.mount(html`<div>${template(nothing)}</div>`);

            cy.get(tag).shadow().find(target).should('not.have.attr', 'aria-describedby');
            cy.get(tag).shadow().find('span#description').should('not.exist');
        });

        it('should not set aria-describedby when the describer element does not exist', () => {
            cy.mount(html`<div>${template('onbestaand')}</div>`);

            cy.get(tag).shadow().find(target).should('not.have.attr', 'aria-describedby');
            cy.get(tag).shadow().find('span#description').should('not.exist');
        });

        it('should reactively update the description when the describer text changes', () => {
            mountWithDescriber();

            cy.get(tag).shadow().find('span#description').should('have.text', 'meter');

            cy.get('span#eenheid').then(($el) => $el.text('centimeter'));

            cy.get(tag).shadow().find('span#description').should('have.text', 'centimeter');
        });

        it('should be accessible', () => {
            mountWithDescriber();
            cy.injectAxe();

            cy.checkA11y(tag);
        });
    });
});

describe('cypress-component - form components - form-control - describedby and validation message', () => {
    const mountInForm = () =>
        cy.mount(html`
            <form @submit=${(e: Event) => e.preventDefault()}>
                <vl-input-field id="lengte" name="lengte" label="Lengte" required describedby="eenheid">
                </vl-input-field>
                <vl-form-message for="lengte" state="valueMissing">Vul een lengte in.</vl-form-message>
                <span id="eenheid">meter</span>
                <button type="submit">Verstuur</button>
            </form>
        `);

    it('should reference both the description and the validation message once the control is invalid', () => {
        mountInForm();

        cy.get('button[type="submit"]').click();

        cy.get('vl-input-field')
            .shadow()
            .find('input')
            .should('have.attr', 'aria-describedby', 'description validation-message');
        cy.get('vl-input-field').shadow().find('span#validation-message').should('have.text', 'Vul een lengte in.');
    });

    it('should drop the validation message from the description again once the control is valid', () => {
        mountInForm();

        cy.get('button[type="submit"]').click();
        cy.get('vl-input-field').shadow().find('span#validation-message').should('exist');

        cy.get('vl-input-field').shadow().find('input').type('3');

        cy.get('vl-input-field').shadow().find('span#validation-message').should('not.exist');
        cy.get('vl-input-field').shadow().find('input').should('have.attr', 'aria-describedby', 'description');
    });

    it('should not keep re-rendering when an invalid control is validated on blur', () => {
        cy.mount(html`
            <form blur-validation @submit=${(e: Event) => e.preventDefault()}>
                <vl-input-field id="lengte" name="lengte" label="Lengte" required describedby="eenheid">
                </vl-input-field>
                <vl-form-message for="lengte" state="valueMissing">Vul een lengte in.</vl-form-message>
                <span id="eenheid">meter</span>
            </form>
        `);

        cy.get('vl-input-field').shadow().find('input').focus();
        cy.get('vl-input-field').shadow().find('input').blur();

        cy.get('vl-input-field')
            .shadow()
            .find('input')
            .should('have.attr', 'aria-describedby', 'description validation-message');
        cy.get('vl-input-field').then(async ($el) => {
            const inputField = $el[0] as VlInputFieldComponent;
            // Een update zonder wijziging van isInvalid hervalideert de control.
            inputField.setAttribute('placeholder', 'bv. 3');
            await inputField.updateComplete;
            // Geef een eventuele update-lus de kans om een nieuwe update in te plannen.
            await new Promise((resolve) => setTimeout(resolve));
            expect(inputField.isUpdatePending).to.equal(false);
        });
    });
});
