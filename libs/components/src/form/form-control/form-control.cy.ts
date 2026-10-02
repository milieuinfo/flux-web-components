import { registerWebComponents } from '@domg-wc/common';
import { html, nothing, render, TemplateResult } from 'lit';
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

            cy.get(tag).shadow().find('span#vl-form-control-description').should('have.text', 'meter');
            cy.get(tag).shadow().find('span#vl-form-control-description').should('have.attr', 'hidden');
            cy.get(tag).shadow().find(target).should('have.attr', 'aria-describedby', 'vl-form-control-description');
        });

        it('should keep the original describer in the accessibility tree', () => {
            mountWithDescriber();

            cy.get(tag).shadow().find('span#vl-form-control-description').should('have.text', 'meter');
            cy.get('span#eenheid').should('not.have.attr', 'aria-hidden');
        });

        it('should not set aria-describedby when describedby is absent', () => {
            cy.mount(html`<div>${template(nothing)}</div>`);

            cy.get(tag).shadow().find(target).should('not.have.attr', 'aria-describedby');
            cy.get(tag).shadow().find('span#vl-form-control-description').should('not.exist');
        });

        it('should not set aria-describedby when the describer element does not exist', () => {
            cy.mount(html`<div>${template('onbestaand')}</div>`);

            cy.get(tag).shadow().find(target).should('not.have.attr', 'aria-describedby');
            cy.get(tag).shadow().find('span#vl-form-control-description').should('not.exist');
        });

        it('should reactively update the description when the describer text changes', () => {
            mountWithDescriber();

            cy.get(tag).shadow().find('span#vl-form-control-description').should('have.text', 'meter');

            cy.get('span#eenheid').then(($el) => $el.text('centimeter'));

            cy.get(tag).shadow().find('span#vl-form-control-description').should('have.text', 'centimeter');
        });

        it('should follow a changed describedby attribute and drop the description when it is removed', () => {
            cy.mount(html`
                <div>
                    ${template('eenheid')}
                    <span id="eenheid">meter</span>
                    <span id="toelichting">in meter</span>
                </div>
            `);

            cy.get(tag).shadow().find('span#vl-form-control-description').should('have.text', 'meter');

            cy.get(tag).invoke('attr', 'describedby', 'toelichting');
            cy.get(tag).shadow().find('span#vl-form-control-description').should('have.text', 'in meter');

            cy.get('span#toelichting').then(($el) => $el.text('in centimeter'));
            cy.get(tag).shadow().find('span#vl-form-control-description').should('have.text', 'in centimeter');

            cy.get(tag).invoke('removeAttr', 'describedby');
            cy.get(tag).shadow().find('span#vl-form-control-description').should('not.exist');
            cy.get(tag).shadow().find(target).should('not.have.attr', 'aria-describedby');
        });

        it('should keep following the describer text after the control is moved in the DOM', () => {
            mountWithDescriber();

            cy.get(tag).shadow().find('span#vl-form-control-description').should('have.text', 'meter');

            cy.get(tag).then(($el) => $el.parent().append($el));
            cy.get('span#eenheid').then(($el) => $el.text('centimeter'));

            cy.get(tag).shadow().find('span#vl-form-control-description').should('have.text', 'centimeter');
        });

        it('should be accessible', () => {
            mountWithDescriber();
            cy.injectAxe();

            cy.checkA11y(tag);
        });
    });
});

describe('cypress-component - form components - form-control - describedby lookup', () => {
    it('should find a describer in the same shadow root as the control', () => {
        cy.mount(html`<div id="host"></div>`);

        cy.get('#host').then(($host) => {
            render(
                html`
                    <vl-input-field label="Lengte" describedby="eenheid"></vl-input-field>
                    <span id="eenheid">meter</span>
                `,
                $host[0].attachShadow({ mode: 'open' })
            );
        });

        cy.get('#host')
            .shadow()
            .find('vl-input-field')
            .shadow()
            .find('span#vl-form-control-description')
            .should('have.text', 'meter');
    });
});

describe('cypress-component - form components - vl-upload - describedby on the upload button', () => {
    it('should also reference the description on the upload button, which is the element that receives focus', () => {
        cy.mount(html`
            <div>
                <vl-upload label="Bijlage" describedby="eenheid"></vl-upload>
                <span id="eenheid">meter</span>
            </div>
        `);

        cy.get('vl-upload')
            .shadow()
            .find('.vl-upload__button')
            .should('have.attr', 'aria-describedby', 'vl-form-control-description');
    });
});

const validatedFormControls: { tag: string; targets: string[]; template: TemplateResult }[] = [
    {
        tag: 'vl-input-field',
        targets: ['input'],
        template: html`<vl-input-field id="veld" name="veld" label="Lengte" required describedby="eenheid">
        </vl-input-field>`,
    },
    {
        tag: 'vl-select-rich',
        targets: ['.js-vl-select'],
        template: html`
            <vl-select-rich
                id="veld"
                name="veld"
                label="Vervoer"
                required
                describedby="eenheid"
                .options=${[{ label: 'Fiets', value: 'fiets' }]}
            ></vl-select-rich>
        `,
    },
    {
        tag: 'vl-upload',
        targets: ['input', '.vl-upload__button'],
        template: html`<vl-upload id="veld" name="veld" label="Bijlage" required describedby="eenheid"></vl-upload>`,
    },
];

validatedFormControls.forEach(({ tag, targets, template }) => {
    describe(`cypress-component - form components - ${tag} - describedby and validation message`, () => {
        it('should reference both the description and the validation message once the control is invalid', () => {
            cy.mount(html`
                <form @submit=${(e: Event) => e.preventDefault()}>
                    ${template}
                    <vl-form-message for="veld" state="valueMissing">Vul dit veld in.</vl-form-message>
                    <span id="eenheid">meter</span>
                    <button type="submit">Verstuur</button>
                </form>
            `);

            cy.get('button[type="submit"]').click();

            targets.forEach((target) => {
                cy.get(tag)
                    .shadow()
                    .find(target)
                    .should(
                        'have.attr',
                        'aria-describedby',
                        'vl-form-control-description vl-form-control-validation-message'
                    );
            });
            cy.get(tag)
                .shadow()
                .find('span#vl-form-control-validation-message')
                .should('have.text', 'Vul dit veld in.');
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

    it('should drop the validation message from the description again once the control is valid', () => {
        mountInForm();

        cy.get('button[type="submit"]').click();
        cy.get('vl-input-field').shadow().find('span#vl-form-control-validation-message').should('exist');

        cy.get('vl-input-field').shadow().find('input').type('3');

        cy.get('vl-input-field').shadow().find('span#vl-form-control-validation-message').should('not.exist');
        cy.get('vl-input-field')
            .shadow()
            .find('input')
            .should('have.attr', 'aria-describedby', 'vl-form-control-description');
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
            .should('have.attr', 'aria-describedby', 'vl-form-control-description vl-form-control-validation-message');
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
