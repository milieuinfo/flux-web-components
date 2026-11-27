import { registerWebComponents } from '@domg-wc/common';
import { html, nothing, render, TemplateResult } from 'lit';
import { VlButtonComponent } from '../../atom/button/vl-button.component';
import { VlCheckboxComponent } from '../checkbox/vl-checkbox.component';
import { VlDatepickerComponent } from '../datepicker/vl-datepicker.component';
import { VlFormMessageComponent } from '../form-message/vl-form-message.component';
import { VlInputFieldComponent } from '../input-field/vl-input-field.component';
import { VlInputFieldMaskedComponent } from '../input-field-masked/vl-input-field-masked.component';
import { VlRadioComponent, VlRadioGroupComponent } from '../radio-group';
import { VlSelectComponent } from '../select/vl-select.component';
import { VlSelectRichComponent } from '../select-rich/vl-select-rich.component';
import { VlTextareaComponent } from '../textarea/vl-textarea.component';
import { VlUploadComponent } from '../upload/vl-upload.component';

registerWebComponents([
    VlButtonComponent,
    VlCheckboxComponent,
    VlDatepickerComponent,
    VlFormMessageComponent,
    VlInputFieldComponent,
    VlInputFieldMaskedComponent,
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

describe('cypress-component - form components - vl-select-rich - describedby on the search input', () => {
    it('should also reference the description on the search input, which receives focus when search is enabled', () => {
        cy.mount(html`
            <div>
                <vl-select-rich
                    label="Vervoer"
                    search
                    describedby="eenheid"
                    .options=${[{ label: 'Fiets', value: 'fiets' }]}
                ></vl-select-rich>
                <span id="eenheid">meter</span>
            </div>
        `);

        cy.get('vl-select-rich')
            .shadow()
            .find('input.vl-input-field-cloned')
            .should('have.attr', 'aria-describedby', 'vl-form-control-description');

        cy.get('vl-select-rich').invoke('removeAttr', 'describedby');

        cy.get('vl-select-rich')
            .shadow()
            .find('input.vl-input-field-cloned')
            .should('not.have.attr', 'aria-describedby');
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

type ControlThatSubmitsOnEnter = {
    tag: string;
    focusTarget?: string;
    template: TemplateResult;
};

const controlsThatSubmitOnEnter: ControlThatSubmitsOnEnter[] = [
    {
        tag: 'vl-input-field',
        template: html`<vl-input-field id="veld" name="veld" label="Lengte"></vl-input-field>`,
    },
    {
        tag: 'vl-input-field-masked',
        template: html`<vl-input-field-masked id="veld" name="veld" label="Datum" mask="date"></vl-input-field-masked>`,
    },
    {
        tag: 'vl-datepicker',
        template: html`<vl-datepicker id="veld" name="veld" label="Datum"></vl-datepicker>`,
    },
    {
        tag: 'vl-select',
        template: html`
            <vl-select id="veld" name="veld" label="Vervoer">
                <option value="fiets">Fiets</option>
            </vl-select>
        `,
    },
    {
        tag: 'vl-checkbox',
        template: html`<vl-checkbox id="veld" name="veld">Akkoord</vl-checkbox>`,
    },
    {
        tag: 'vl-radio-group',
        focusTarget: 'vl-radio',
        template: html`
            <vl-radio-group id="veld" name="veld" label="Vervoer">
                <vl-radio value="fiets">Fiets</vl-radio>
            </vl-radio-group>
        `,
    },
    {
        tag: 'vl-upload',
        template: html`<vl-upload id="veld" name="veld" label="Bijlage"></vl-upload>`,
    },
];

type SubmitButtonScenario = {
    name: string;
    // In het formulier, na de control.
    buttons?: TemplateResult;
    // Bv. een knop die via het form-attribuut bij het formulier hoort.
    beforeForm?: TemplateResult;
};

const blockedDefaultButtons: SubmitButtonScenario[] = [
    {
        name: 'a disabled vl-button',
        buttons: html`<vl-button type="submit" disabled>Verstuur</vl-button>`,
    },
    {
        name: 'a vl-button with loading set as a property',
        buttons: html`<vl-button type="submit" .loading=${true}>Verstuur</vl-button>`,
    },
    {
        name: 'a disabled vl-button with type set as a property',
        buttons: html`<vl-button .type=${'submit'} disabled>Verstuur</vl-button>`,
    },
    {
        name: 'a disabled native submit button',
        buttons: html`<button type="submit" disabled>Verstuur</button>`,
    },
    {
        name: 'a native submit button in a disabled fieldset',
        buttons: html`
            <fieldset disabled>
                <button type="submit">Verstuur</button>
            </fieldset>
        `,
    },
    {
        name: 'a disabled vl-button followed by an active one',
        buttons: html`
            <vl-button type="submit" disabled>Bewaar</vl-button>
            <vl-button type="submit">Verstuur</vl-button>
        `,
    },
];

const nonBlockingButtons: SubmitButtonScenario[] = [
    {
        name: 'no submit button',
    },
    {
        name: 'an active vl-button',
        buttons: html`<vl-button type="submit">Verstuur</vl-button>`,
    },
    {
        name: 'an active native submit button',
        buttons: html`<button type="submit">Verstuur</button>`,
    },
    {
        name: 'a disabled vl-button with type="button"',
        buttons: html`<vl-button type="button" disabled>Annuleer</vl-button>`,
    },
    {
        name: 'a disabled vl-button with cta-link',
        buttons: html`<vl-button type="submit" cta-link="https://www.vlaanderen.be" disabled>Meer info</vl-button>`,
    },
    {
        name: 'an active vl-button followed by a disabled one',
        buttons: html`
            <vl-button type="submit">Verstuur</vl-button>
            <vl-button type="submit" disabled>Bewaar</vl-button>
        `,
    },
];

// Randgevallen van de zoektocht naar de default button: die hangt niet af van de control.
const blockedDefaultButtonEdgeCases: SubmitButtonScenario[] = [
    {
        name: 'a vl-button with the loading attribute',
        buttons: html`<vl-button type="submit" loading>Verstuur</vl-button>`,
    },
    {
        name: 'a disabled vl-button with the ctaLink property set to null',
        buttons: html`<vl-button type="submit" disabled .ctaLink=${null}>Verstuur</vl-button>`,
    },
    {
        name: 'a disabled native button without type',
        buttons: html`<button disabled>Verstuur</button>`,
    },
    {
        name: 'a disabled input of type submit',
        buttons: html`<input type="submit" value="Verstuur" disabled />`,
    },
    {
        name: 'a disabled input of type image',
        buttons: html`<input type="image" alt="Verstuur" disabled />`,
    },
    {
        name: 'a disabled native submit button followed by an active vl-button',
        buttons: html`
            <button type="submit" disabled>Bewaar</button>
            <vl-button type="submit">Verstuur</vl-button>
        `,
    },
    {
        name: 'a disabled native submit button outside the form that is linked with the form attribute',
        beforeForm: html`<button type="submit" form="formulier" disabled>Bewaar</button>`,
        buttons: html`<vl-button type="submit">Verstuur</vl-button>`,
    },
];

const nonBlockingButtonEdgeCases: SubmitButtonScenario[] = [
    {
        name: 'a disabled vl-button without type',
        buttons: html`<vl-button disabled>Annuleer</vl-button>`,
    },
    {
        name: 'a disabled native button of type button',
        buttons: html`<button type="button" disabled>Annuleer</button>`,
    },
    {
        name: 'a disabled native button of type reset',
        buttons: html`<button type="reset" disabled>Wis</button>`,
    },
    {
        name: 'a disabled vl-button outside the form',
        beforeForm: html`<vl-button type="submit" disabled>Bewaar</vl-button>`,
    },
    {
        name: 'a disabled native submit button that belongs to another form',
        buttons: html`<button type="submit" form="ander-formulier" disabled>Bewaar</button>`,
    },
];

const mountInFormWithButtons = (control: TemplateResult, { buttons, beforeForm }: SubmitButtonScenario) => {
    const onSubmit = cy.stub().as('onSubmit');

    cy.mount(html`
        <div>
            ${beforeForm ?? nothing}
            <form
                id="formulier"
                @submit=${(e: Event) => {
                    e.preventDefault();
                    onSubmit();
                }}
            >
                ${control} ${buttons ?? nothing}
            </form>
        </div>
    `);
};

const findFocusedElement = (): Element | null => {
    let focused = document.activeElement;
    while (focused?.shadowRoot?.activeElement) {
        focused = focused.shadowRoot.activeElement;
    }
    return focused;
};

const isInside = (host: Element, element: Element | null): boolean => {
    let node: Node | null = element;
    while (node && node !== host) {
        node = node.parentNode ?? (node as ShadowRoot).host ?? null;
    }
    return node === host;
};

// Enter vanop het element dat de focus krijgt, zodat het event dezelfde weg aflegt als bij een echte toets.
const pressEnterIn = (focusTarget: string) =>
    cy
        .get(focusTarget)
        // Herhaalt tot de control gerenderd is: vóór de eerste render is er niets om focus aan te geven.
        .should(($el) => {
            $el[0].focus();
            expect(isInside($el[0], findFocusedElement()), 'the focus is inside the control').to.equal(true);
        })
        .then(() => {
            findFocusedElement()?.dispatchEvent(
                new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true, composed: true }),
            );
        });

controlsThatSubmitOnEnter.forEach(({ tag, focusTarget = tag, template }) => {
    describe(`cypress-component - form components - ${tag} - submit on Enter`, () => {
        blockedDefaultButtons.forEach((scenario) => {
            it(`should not submit the form on Enter when the first submit button is ${scenario.name}`, () => {
                mountInFormWithButtons(template, scenario);

                pressEnterIn(focusTarget);

                cy.get('@onSubmit').should('not.have.been.called');
            });
        });

        nonBlockingButtons.forEach((scenario) => {
            it(`should submit the form on Enter with ${scenario.name}`, () => {
                mountInFormWithButtons(template, scenario);

                pressEnterIn(focusTarget);

                cy.get('@onSubmit').should('have.been.calledOnce');
            });
        });

        it('should submit the form on Enter again once the submit button is no longer disabled', () => {
            mountInFormWithButtons(template, {
                name: 'a disabled vl-button',
                buttons: html`<vl-button type="submit" disabled>Verstuur</vl-button>`,
            });

            pressEnterIn(focusTarget);
            cy.get('@onSubmit').should('not.have.been.called');

            cy.get('vl-button').invoke('removeAttr', 'disabled');
            pressEnterIn(focusTarget);

            cy.get('@onSubmit').should('have.been.calledOnce');
        });

        it('should not submit the form a second time on Enter while the submit button is loading', () => {
            mountInFormWithButtons(template, {
                name: 'an active vl-button',
                buttons: html`<vl-button type="submit">Verstuur</vl-button>`,
            });
            cy.get('form').then(($form) => {
                $form[0].addEventListener('submit', () => {
                    $form.find('vl-button').prop('loading', true);
                });
            });

            pressEnterIn(focusTarget);
            pressEnterIn(focusTarget);
            cy.get('@onSubmit').should('have.been.calledOnce');

            cy.get('vl-button').invoke('prop', 'loading', false);
            pressEnterIn(focusTarget);

            cy.get('@onSubmit').should('have.been.calledTwice');
        });
    });
});

describe('cypress-component - form components - form-control - submit on Enter', () => {
    const inputField = html`<vl-input-field id="veld" name="veld" label="Lengte"></vl-input-field>`;

    blockedDefaultButtonEdgeCases.forEach((scenario) => {
        it(`should not submit the form on Enter when the first submit button is ${scenario.name}`, () => {
            mountInFormWithButtons(inputField, scenario);

            pressEnterIn('vl-input-field');

            cy.get('@onSubmit').should('not.have.been.called');
        });
    });

    nonBlockingButtonEdgeCases.forEach((scenario) => {
        it(`should submit the form on Enter with ${scenario.name}`, () => {
            mountInFormWithButtons(inputField, scenario);

            pressEnterIn('vl-input-field');

            cy.get('@onSubmit').should('have.been.calledOnce');
        });
    });

    it('should no longer submit the form on Enter once the cta-link of a disabled submit vl-button is removed', () => {
        mountInFormWithButtons(inputField, {
            name: 'a disabled vl-button with cta-link',
            buttons: html`<vl-button type="submit" cta-link="https://www.vlaanderen.be" disabled>Verstuur</vl-button>`,
        });

        pressEnterIn('vl-input-field');
        cy.get('@onSubmit').should('have.been.calledOnce');

        cy.get('vl-button').invoke('removeAttr', 'cta-link');
        pressEnterIn('vl-input-field');

        cy.get('@onSubmit').should('have.been.calledOnce');
    });

    it('should not validate the form on Enter while the first submit button is disabled', () => {
        mountInFormWithButtons(
            html`
                <vl-input-field id="veld" name="veld" label="Lengte" required></vl-input-field>
                <vl-form-message for="veld" state="valueMissing">Vul een lengte in.</vl-form-message>
            `,
            { name: 'a disabled vl-button', buttons: html`<vl-button type="submit" disabled>Verstuur</vl-button>` },
        );

        pressEnterIn('vl-input-field');
        cy.get('vl-form-message').should('not.have.attr', 'show');

        cy.get('vl-button').invoke('removeAttr', 'disabled');
        pressEnterIn('vl-input-field');

        cy.get('vl-form-message').should('have.attr', 'show');
        cy.get('@onSubmit').should('not.have.been.called');
    });

    it('should keep the focus and the value after an Enter that is not submitted, and submit once enabled', () => {
        mountInFormWithButtons(inputField, {
            name: 'a disabled vl-button',
            buttons: html`<vl-button type="submit" disabled>Verstuur</vl-button>`,
        });

        cy.get('vl-input-field').shadow().find('input').type('12');
        cy.press(Cypress.Keyboard.Keys.ENTER);
        cy.get('@onSubmit').should('not.have.been.called');
        cy.get('vl-input-field').shadow().find('input').should('have.focus');

        cy.get('vl-button').invoke('removeAttr', 'disabled');
        cy.press(Cypress.Keyboard.Keys.ENTER);

        cy.get('@onSubmit').should('have.been.calledOnce');
        cy.get('vl-input-field').shadow().find('input').should('have.value', '12');
    });
});
