import { registerWebComponents } from '@domg-wc/common-utilities';
import { html } from 'lit';
import { VlCheckboxComponent } from '../next/checkbox';
import { VlDatepickerComponent } from '../next/datepicker';
import { VlInputFieldComponent } from '../next/input-field';
import { VlInputFieldMaskedComponent } from '../next/input-field-masked';
import { VlRadioComponent, VlRadioGroupComponent } from '../next/radio-group';
import { VlSelectRichComponent } from '../next/select-rich';
import { VlTextareaRichComponent } from '../next/textarea-rich';
import { VlUploadComponent } from '../next/upload';

import { setFormData, parseFormData } from './index';

registerWebComponents([
    VlCheckboxComponent,
    VlRadioGroupComponent,
    VlRadioComponent,
    VlSelectRichComponent,
    VlInputFieldComponent,
    VlInputFieldMaskedComponent,
    VlTextareaRichComponent,
    VlDatepickerComponent,
    VlUploadComponent,
]);

describe('integration - form.utils ', () => {
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

    it.skip('should set value for a list of checkboxes', () => {
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

    it('should set value for a vl-input-field-next', () => {
        const formData = { name: 'Jane Doe' };

        cy.mount(
            html`
                <form>
                    <vl-input-field-next name="name"></vl-input-field-next>
                </form>
            `
        );

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;

            setFormData(formElement, formData);

            cy.get('vl-input-field-next[name="name"]').shadow().find('input').should('have.value', 'Jane Doe');
        });
    });

    it('should set value for a vl-checkbox-next', () => {
        const formData = { involvement: 'government' };

        cy.mount(
            html`
                <form>
                    <vl-checkbox-next name="involvement" value="government" id="involvement">
                        Government Involvement
                    </vl-checkbox-next>
                </form>
            `
        );

        cy.get('vl-checkbox-next').shadow().find('input');

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            setFormData(formElement, formData);

            cy.get('vl-checkbox-next[name="involvement"]').should('have.attr', 'checked');
        });
    });

    it('should set value for a list of vl-checkbox-next', () => {
        cy.mount(
            html`
                <form>
                    <vl-checkbox-next name="involvement" value="government" id="involvement">
                        Government Involvement
                    </vl-checkbox-next>
                    <vl-checkbox-next name="involvement" value="business" id="involvement">
                        Business Involvement
                    </vl-checkbox-next>
                    <vl-checkbox-next name="involvement" value="citizen" id="involvement">
                        Citizen Involvement
                    </vl-checkbox-next>
                </form>
            `
        );

        cy.get('vl-checkbox-next').shadow().find('input');

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            setFormData(formElement, { involvement: ['government', `citizen`] });

            cy.get('vl-checkbox-next[value="government"]').should('have.attr', 'checked');
            cy.get('vl-checkbox-next[value="business"]').should('not.have.attr', 'checked');
            cy.get('vl-checkbox-next[value="citizen"]').should('have.attr', 'checked');
        });

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            setFormData(formElement, { involvement: ['business', `citizen`] });

            cy.get('vl-checkbox-next[value="government"]').should('not.have.attr', 'checked');
            cy.get('vl-checkbox-next[value="business"]').should('have.attr', 'checked');
            cy.get('vl-checkbox-next[value="citizen"]').should('have.attr', 'checked');
        });
    });

    it('should set value for a vl-radio-next', () => {
        const formData = { transport: 'land' };

        cy.mount(
            html`
                <form>
                    <vl-radio-group-next name="transport">
                        <vl-radio-next value="land">Land</vl-radio-next>
                        <vl-radio-next value="sea">Sea</vl-radio-next>
                    </vl-radio-group-next>
                </form>
            `
        );

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;

            setFormData(formElement, formData);

            cy.get('vl-radio-next[value="land"]').should('have.attr', 'checked');
        });
    });

    it.skip('should set value for a vl-select-rich-next', () => {
        cy.mount(
            html`
                <form>
                    <vl-select-rich-next
                        name="city"
                        .options=${[
                            { label: 'Hasselt', value: 'hasselt' },
                            { label: 'Turnhout', value: 'turnhout' },
                        ]}
                    ></vl-select-rich-next>
                </form>
            `
        );

        cy.get('vl-select-rich-next').shadow().find('.vl-select__inner');

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;

            setFormData(formElement, { city: 'hasselt' });

            cy.get('vl-select-rich-next[name="city"]')
                .shadow()
                .find('.vl-select__inner')
                .should('contain.text', 'Hasselt')
                .and('not.contain.text', 'Knokke')
                .and('not.contain.text', 'Turnhout');

            cy.get('vl-select-rich-next').should('have.value', 'hasselt');

            const changeEvent = new Event('change', { bubbles: true });
            formElement.dispatchEvent(changeEvent);

            const formData = parseFormData(formElement);

            expect(formData).to.have.property('city', 'hasselt');
        });
    });

    it('should set value for a vl-select-rich-next with multiple values', () => {
        cy.mount(
            html`
                <form>
                    <vl-select-rich-next
                        name="city"
                        multiple=""
                        .options=${[
                            { label: 'Hasselt', value: 'hasselt' },
                            { label: 'Turnhout', value: 'turnhout' },
                            { label: 'Knokke', value: 'knokke' },
                        ]}
                    ></vl-select-rich-next>
                </form>
            `
        );

        cy.get('vl-select-rich-next').shadow().find('.vl-select__inner');

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;

            setFormData(formElement, { city: ['hasselt', 'knokke'] });

            cy.get('vl-select-rich-next[name="city"]')
                .shadow()
                .find('.vl-select__inner')
                .should('contain.text', 'Hasselt')
                .and('contain.text', 'Knokke')
                .and('not.contain.text', 'Turnhout');
        });
    });

    it('should set value for a vl-textarea-rich-next', () => {
        const formData = { story: 'Once upon a time...' };

        cy.mount(
            html`
                <form>
                    <vl-textarea-rich-next name="story"></vl-textarea-rich-next>
                </form>
            `
        );

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;

            setFormData(formElement, formData);

            cy.get('vl-textarea-rich-next[name="story"]')
                .shadow()
                .find('textarea')
                .should('have.value', 'Once upon a time...');
        });
    });

    it('should set value for a vl-input-field-masked-next', () => {
        const formData = { iban: 'BE71 0961 2345 6769' };

        cy.mount(
            html`
                <form>
                    <vl-input-field-masked-next name="iban"></vl-input-field-masked-next>
                </form>
            `
        );

        cy.get('vl-input-field-masked-next').shadow().find('input');

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;

            setFormData(formElement, formData);

            cy.get('vl-input-field-masked-next[name="iban"]')
                .shadow()
                .find('input')
                .should('have.value', 'BE71 0961 2345 6769');
        });
    });

    it('should set value for a vl-datepicker-next', () => {
        const formData = { date: '2024-11-18' };

        cy.mount(
            html`
                <form>
                    <vl-datepicker-next name="date"></vl-datepicker-next>
                </form>
            `
        );

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;

            setFormData(formElement, formData);

            cy.get('vl-datepicker-next[name="date"]').should('have.attr', 'value', '2024-11-18');
        });
    });

    it('should set value for a vl-upload-next', () => {
        const formData = {
            bestand: new File(['Content of file 1'], 'file1.txt', { type: 'text/plain' }),
        };

        cy.mount(
            html`
                <form>
                    <vl-upload-next url="-" name="bestand" id="bestand"></vl-upload-next>
                </form>
            `
        );

        cy.get('vl-upload-next').shadow().find('input[type="file"');

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            setFormData(formElement, formData);
        });

        cy.get('vl-upload-next[name="bestand"]').then((upload) => {
            const uploadComponent = upload[0] as VlUploadComponent;
            const uploadedFiles = uploadComponent.getFiles() as File[];
            expect(uploadedFiles.length).to.equal(1);
            expect(uploadedFiles[0].name).to.equal('file1.txt');
            expect(uploadedFiles[0].type).to.equal('text/plain');
        });
    });

    it('should set values for a vl-upload-next', () => {
        const formData = {
            bestand: [
                new File(['Content of file 1'], 'file1.txt', { type: 'text/plain' }),
                new File(['Content of file 2'], 'file2.txt', { type: 'text/plain' }),
            ],
        };

        cy.mount(
            html`
                <form>
                    <vl-upload-next url="-" name="bestand" id="bestand" max-files="2"></vl-upload-next>
                </form>
            `
        );

        cy.get('vl-upload-next').shadow().find('input[type="file"');

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            setFormData(formElement, formData);
        });

        cy.get('vl-upload-next[name="bestand"]').then((upload) => {
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
