import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlCheckboxComponent } from '../checkbox';
import { VlDatepickerComponent } from '../datepicker';
import { VlInputFieldComponent } from '../input-field';
import { VlInputFieldMaskedComponent } from '../input-field-masked';
import { VlRadioComponent, VlRadioGroupComponent } from '../radio-group';
import { VlSelectComponent } from '../select';
import { VlSelectRichComponent } from '../select-rich';
import { VlTextareaRichComponent } from '../textarea-rich';
import { VlUploadComponent } from '../upload';

import { setFormData, parseFormData } from './index';

registerWebComponents([
    VlCheckboxComponent,
    VlRadioGroupComponent,
    VlRadioComponent,
    VlSelectRichComponent,
    VlSelectComponent,
    VlInputFieldComponent,
    VlInputFieldMaskedComponent,
    VlTextareaRichComponent,
    VlDatepickerComponent,
    VlUploadComponent,
]);

describe('component - setFormData - native', () => {
    it('should set value for a text input', () => {
        const formData = { name: 'John Doe' };

        cy.mount(
            html`
                <form>
                    <input type="text" name="name" id="name" />
                </form>
            `
        );

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;

            setFormData(formElement, formData);

            cy.get('input#name').should('have.value', 'John Doe');
        });
    });

    it('should check a checkbox', () => {
        cy.mount(
            html`
                <form>
                    <input type="checkbox" name="agree" id="agree" value="" />
                </form>
            `
        );

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;

            setFormData(formElement, { agree: 'incorrect-value' });

            cy.get('input#agree').should('not.to.be.checked');
        });

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;

            setFormData(formElement, { agree: 'on' });

            cy.get('input#agree').should('be.checked');
        });

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;

            setFormData(formElement, { agree: 'incorrect-value' });

            cy.get('input#agree').should('be.checked');
        });

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;

            setFormData(formElement, { agree: '' });

            cy.get('input#agree').should('be.checked');
        });
    });

    it('should check a checkbox with boolean', () => {
        cy.mount(
            html`
                <form>
                    <input type="checkbox" name="agree" id="agree" />
                </form>
            `
        );

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;

            setFormData(formElement, { agree: <any>true });

            cy.get('input#agree').should('be.checked');
        });

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;

            setFormData(formElement, { agree: <any>false });

            cy.get('input#agree').should('not.to.be.checked');
        });
    });

    it('should check a checkbox with value attribute', () => {
        cy.mount(
            html`
                <form>
                    <input type="checkbox" name="diet" id="diet" value="vegetarian" />
                </form>
            `
        );

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;

            setFormData(formElement, { diet: 'vegetarian' });

            cy.get('input#diet').should('be.checked');
        });
    });

    it('should set value for a list of checkboxes', () => {
        cy.mount(
            html`
                <form>
                    <input type="checkbox" name="involvement" value="government" id="involvement" />
                    <input type="checkbox" name="involvement" value="business" id="involvement" />
                    <input type="checkbox" name="involvement" value="citizen" id="involvement" />
                </form>
            `
        );

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            setFormData(formElement, { involvement: ['government', `citizen`] });

            cy.get('input[value="government"]').should('have.attr', 'checked');
            cy.get('input[value="business"]').should('not.have.attr', 'checked');
            cy.get('input[value="citizen"]').should('have.attr', 'checked');
        });

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            setFormData(formElement, { involvement: ['business', `citizen`] });

            cy.get('input[value="government"]').should('not.have.attr', 'checked');
            cy.get('input[value="business"]').should('have.attr', 'checked');
            cy.get('input[value="citizen"]').should('have.attr', 'checked');
        });
    });

    it('should select a value from a dropdown', () => {
        const formData = { choice: 'option2' };

        cy.mount(
            html`
                <form>
                    <select name="choice" id="choice">
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                    </select>
                </form>
            `
        );

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;

            setFormData(formElement, formData);

            cy.get('select#choice').should('have.value', 'option2');
        });
    });

    it('should check a radio button', () => {
        const formData = { favorite: 'css' };

        cy.mount(
            html`
                <form>
                    <input type="radio" name="favorite" id="html" value="html" />
                    <input type="radio" name="favorite" id="css" value="css" />
                </form>
            `
        );

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;

            setFormData(formElement, formData);

            cy.get('input#css').should('be.checked');
        });
    });

    it('should set value for a textarea', () => {
        const formData = { message: 'Hello, World!' };

        cy.mount(
            html`
                <form>
                    <textarea name="message" id="message"></textarea>
                </form>
            `
        );

        cy.get('form')
            .then((form) => {
                const formElement = form[0] as HTMLFormElement;
                setFormData(formElement, formData);
            })
            .find('textarea')
            .then(($el) => {
                expect($el[0]).to.have.value('Hello, World!');
            });
    });

    it('should set value for a file input', () => {
        const formData = {
            files: [new File(['file content'], 'file1.txt', { type: 'text/plain' })],
        };

        cy.mount(
            html`
                <form>
                    <input type="file" name="files" id="files" />
                </form>
            `
        );

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;

            setFormData(formElement, formData);

            cy.get('input#files').should((input) => {
                const files = (input[0] as HTMLInputElement).files!;
                expect(files.length).to.equal(1);
                expect(files[0].name).to.equal('file1.txt');
            });
        });
    });
});

describe('component - setFormData - vl form controls', () => {
    it('should set value for a vl-input-field', () => {
        const formData = { name: 'Jane Doe' };

        cy.mount(
            html`
                <form>
                    <vl-input-field name="name"></vl-input-field>
                </form>
            `
        );

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;

            setFormData(formElement, formData);

            cy.get('vl-input-field[name="name"]').shadow().find('input').should('have.value', 'Jane Doe');
        });
    });

    it('should set value for a vl-checkbox', () => {
        const formData = { involvement: 'government' };

        cy.mount(
            html`
                <form>
                    <vl-checkbox name="involvement" value="government" id="involvement">
                        Government Involvement
                    </vl-checkbox>
                </form>
            `
        );

        cy.get('vl-checkbox').shadow().find('input');

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            setFormData(formElement, formData);

            cy.get('vl-checkbox[name="involvement"]').should('have.attr', 'checked');
        });
    });

    it('should set value for a list of vl-checkbox', () => {
        cy.mount(
            html`
                <form>
                    <vl-checkbox name="involvement" value="government" id="involvement">
                        Government Involvement
                    </vl-checkbox>
                    <vl-checkbox name="involvement" value="business" id="involvement">
                        Business Involvement
                    </vl-checkbox>
                    <vl-checkbox name="involvement" value="citizen" id="involvement"> Citizen Involvement </vl-checkbox>
                </form>
            `
        );

        cy.get('vl-checkbox').shadow().find('input');

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            setFormData(formElement, { involvement: ['government', `citizen`] });

            cy.get('vl-checkbox[value="government"]').should('have.attr', 'checked');
            cy.get('vl-checkbox[value="business"]').should('not.have.attr', 'checked');
            cy.get('vl-checkbox[value="citizen"]').should('have.attr', 'checked');
        });

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            setFormData(formElement, { involvement: ['business', `citizen`] });

            cy.get('vl-checkbox[value="government"]').should('not.have.attr', 'checked');
            cy.get('vl-checkbox[value="business"]').should('have.attr', 'checked');
            cy.get('vl-checkbox[value="citizen"]').should('have.attr', 'checked');
        });
    });

    it('should set value for a vl-radio', () => {
        const formData = { transport: 'land' };

        cy.mount(
            html`
                <form>
                    <vl-radio-group name="transport">
                        <vl-radio value="land">Land</vl-radio>
                        <vl-radio value="sea">Sea</vl-radio>
                    </vl-radio-group>
                </form>
            `
        );

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;

            setFormData(formElement, formData);

            cy.get('vl-radio[value="land"]').should('have.attr', 'checked');
        });
    });

    it('should set value for a vl-select with programmatic options', () => {
        cy.mount(
            html`
                <form>
                    <vl-select
                        name="city"
                        .options=${[
                            { label: 'Hasselt', value: 'hasselt' },
                            { label: 'Turnhout', value: 'turnhout' },
                        ]}
                        value="hasselt"
                    ></vl-select>
                </form>
            `
        );
        cy.get('vl-select').shadow().find('select');
        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;

            setFormData(formElement, { city: 'hasselt' });

            cy.get('vl-select[name="city"]')
                .shadow()
                .find('select')
                .find('option[value="hasselt"]')
                .should('have.attr', 'selected');

            cy.get('vl-select[name="city"]')
                .shadow()
                .find('select')
                .find('option[value="turnhout"]')
                .should('not.have.attr', 'selected');
        });
        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            const formData = parseFormData(formElement);
            expect(formData).to.have.property('city', 'hasselt');
        });
    });

    it('should set value for a vl-select with declarative options', () => {
        cy.mount(
            html`
                <form>
                    <vl-select name="city" placeholder="Selecteer stad">
                        <option value="hasselt">Hasselt</option>
                        <option value="turnhout">Turnhout</option>
                        <option value="knokke-heist">Knokke-Heist</option>
                    </vl-select>
                </form>
            `
        );
        cy.get('vl-select').shadow().find('select');
        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;

            setFormData(formElement, { city: 'knokke-heist' });

            cy.get('vl-select[name="city"]')
                .shadow()
                .find('select')
                .find('option[value="knokke-heist"]')
                .should('have.attr', 'selected');

            cy.get('vl-select[name="city"]')
                .shadow()
                .find('select')
                .find('option[value="hasselt"]')
                .should('not.have.attr', 'selected');

            cy.get('vl-select[name="city"]')
                .shadow()
                .find('select')
                .find('option[value="turnhout"]')
                .should('not.have.attr', 'selected');
        });
        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            const formData = parseFormData(formElement);
            expect(formData).to.have.property('city', 'knokke-heist');
        });
    });

    it('should set value for a vl-select-rich - single', () => {
        cy.mount(
            html`
                <form>
                    <vl-select-rich
                        name="city"
                        .options=${[
                            { label: 'Hasselt', value: 'hasselt' },
                            { label: 'Turnhout', value: 'turnhout' },
                        ]}
                    ></vl-select-rich>
                </form>
            `
        );

        cy.get('vl-select-rich').shadow().find('.vl-select__inner');

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;

            setFormData(formElement, { city: 'hasselt' });

            cy.get('vl-select-rich[name="city"]')
                .shadow()
                .find('select')
                .find('option[value="hasselt"]')
                .should('have.attr', 'selected');

            cy.get('vl-select-rich[name="city"]')
                .shadow()
                .find('select')
                .find('option[value="turnhout"]')
                .should('not.have.attr', 'selected');

            const formData = parseFormData(formElement);
            expect(formData).to.have.property('city', 'hasselt');
        });
    });

    it('should set value for a vl-select-rich - multiple', () => {
        cy.mount(
            html`
                <form>
                    <vl-select-rich
                        name="city"
                        multiple=""
                        .options=${[
                            { label: 'Hasselt', value: 'hasselt' },
                            { label: 'Turnhout', value: 'turnhout' },
                            { label: 'Knokke', value: 'knokke' },
                        ]}
                    ></vl-select-rich>
                </form>
            `
        );

        cy.get('vl-select-rich').shadow().find('.vl-select__inner');

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;

            setFormData(formElement, { city: ['hasselt', 'knokke'] });

            cy.get('vl-select-rich[name="city"]')
                .shadow()
                .find('select')
                .find('option[value="hasselt"]')
                .should('have.attr', 'selected');

            cy.get('vl-select-rich[name="city"]')
                .shadow()
                .find('select')
                .find('option[value="knokke"]')
                .should('have.attr', 'selected');

            cy.get('vl-select-rich[name="city"]')
                .shadow()
                .find('select')
                .find('option[value="turnhout"]')
                .should('not.have.attr', 'selected');

            const formData = parseFormData(formElement);
            expect(formData).to.have.property('city').to.deep.equal(['hasselt', 'knokke']);
        });
    });

    it('should set value for a vl-textarea', () => {
        const formData = { story: 'Once upon a time...' };

        cy.mount(
            html`
                <form>
                    <vl-textarea name="story"></vl-textarea>
                </form>
            `
        );

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;

            setFormData(formElement, formData);

            cy.get('vl-textarea[name="story"]').shadow().find('textarea').should('have.value', 'Once upon a time...');
        });
    });

    it('should set value for a vl-textarea-rich', () => {
        const formData = { story: 'Once upon a time...' };

        cy.mount(
            html`
                <form>
                    <vl-textarea-rich name="story"></vl-textarea-rich>
                </form>
            `
        );

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;

            setFormData(formElement, formData);

            cy.get('vl-textarea-rich[name="story"]')
                .shadow()
                .find('textarea')
                .should('have.value', 'Once upon a time...');
        });
    });

    it('should set value for a vl-input-field-masked', () => {
        const formData = { iban: 'BE71 0961 2345 6769' };

        cy.mount(
            html`
                <form>
                    <vl-input-field-masked name="iban"></vl-input-field-masked>
                </form>
            `
        );

        cy.get('vl-input-field-masked').shadow().find('input');

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;

            setFormData(formElement, formData);

            cy.get('vl-input-field-masked[name="iban"]')
                .shadow()
                .find('input')
                .should('have.value', 'BE71 0961 2345 6769');
        });
    });

    it('should set value for a vl-datepicker', () => {
        const formData = { date: '2024-11-18' };

        cy.mount(
            html`
                <form>
                    <vl-datepicker name="date"></vl-datepicker>
                </form>
            `
        );

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;

            setFormData(formElement, formData);

            cy.get('vl-datepicker[name="date"]').should('have.attr', 'value', '2024-11-18');
        });
    });

    it('should set value for a vl-upload - single', () => {
        const formData = {
            bestand: new File(['Content of file 1'], 'file1.txt', { type: 'text/plain' }),
        };

        cy.mount(
            html`
                <form>
                    <vl-upload url="-" name="bestand" id="bestand"></vl-upload>
                </form>
            `
        );

        cy.get('vl-upload').shadow().find('input[type="file"');

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            setFormData(formElement, formData);
        });

        cy.get('vl-upload[name="bestand"]').then((upload) => {
            const uploadComponent = upload[0] as VlUploadComponent;
            const uploadedFiles = uploadComponent.getFiles() as File[];
            expect(uploadedFiles.length).to.equal(1);
            expect(uploadedFiles[0].name).to.equal('file1.txt');
            expect(uploadedFiles[0].type).to.equal('text/plain');
        });
    });

    it('should set values for a vl-upload - multiple', () => {
        const formData = {
            bestand: [
                new File(['Content of file 1'], 'file1.txt', { type: 'text/plain' }),
                new File(['Content of file 2'], 'file2.txt', { type: 'text/plain' }),
            ],
        };

        cy.mount(
            html`
                <form>
                    <vl-upload url="-" name="bestand" id="bestand" max-files="2"></vl-upload>
                </form>
            `
        );

        cy.get('vl-upload').shadow().find('input[type="file"');

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            setFormData(formElement, formData);
        });

        cy.get('vl-upload[name="bestand"]').then((upload) => {
            const uploadComponent = upload[0] as VlUploadComponent;
            const uploadedFiles = uploadComponent.getFiles() as File[];
            expect(uploadedFiles.length).to.equal(2);
            expect(uploadedFiles[0].name).to.equal('file1.txt');
            expect(uploadedFiles[0].type).to.equal('text/plain');
            expect(uploadedFiles[1].name).to.equal('file2.txt');
            expect(uploadedFiles[1].type).to.equal('text/plain');
        });
    });
});
