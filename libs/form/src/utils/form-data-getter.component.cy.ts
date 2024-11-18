import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlButtonComponent } from '@domg-wc/components/next/button';
import { html } from 'lit';
import { VlCheckboxComponent } from '../next/checkbox';
import { VlDatepickerComponent } from '../next/datepicker';
import { VlErrorMessageComponent } from '../next/error-message';
import { VlFormLabelComponent } from '../next/form-label';
import { VlInputFieldComponent } from '../next/input-field';
import { VlInputFieldMaskedComponent } from '../next/input-field-masked';
import { VlSelectRichComponent } from '../next/select-rich';
import { VlTextareaRichComponent } from '../next/textarea-rich';
import { VlUploadComponent } from '../next/upload';
import { parseFormData } from './index';

registerWebComponents([
    VlButtonComponent,
    VlFormLabelComponent,
    VlInputFieldComponent,
    VlSelectRichComponent,
    VlErrorMessageComponent,
    VlButtonComponent,
    VlCheckboxComponent,
    VlInputFieldMaskedComponent,
    VlDatepickerComponent,
    VlTextareaRichComponent,
    VlUploadComponent,
]);
describe('integration - form-data-getter', () => {
    it('should get form data for input field', () => {
        cy.mount(
            html`
                <form id="form">
                    <vl-input-field-next id="naam" name="naam" block></vl-input-field-next>
                </form>
            `
        );

        cy.get('vl-input-field-next').shadow().find('input').type('John Doe');
        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            const formData = parseFormData(formElement);

            expect(formData).to.have.property('naam', 'John Doe');
        });
    });

    it('should get form data for select rich (single)', () => {
        cy.mount(
            html`
                <form id="form">
                    <vl-select-rich-next
                        id="geboorteplaats"
                        name="geboorteplaats"
                        .options=${[
                            { label: 'Hasselt', value: 'hasselt' },
                            { label: 'Turnhout', value: 'turnhout' },
                        ]}
                        placeholder="Selecteer je geboorteplaats"
                    ></vl-select-rich-next>
                </form>
            `
        );

        cy.get('vl-select-rich-next#geboorteplaats').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich-next#geboorteplaats')
            .shadow()
            .find('.vl-select__list .vl-select__item')
            .contains('Hasselt')
            .click();
        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            const formData = parseFormData(formElement);

            expect(formData).to.have.property('geboorteplaats', 'hasselt');
        });
    });

    it('should get form data for select rich (multiple)', () => {
        cy.mount(
            html`
                <form id="form">
                    <vl-select-rich-next
                        id="hobbies"
                        name="hobbies"
                        multiple
                        deletable
                        .options=${[
                            { label: 'Padel', value: 'padel' },
                            { label: 'Dans', value: 'dans' },
                        ]}
                        placeholder="Selecteer je hobbies"
                    ></vl-select-rich-next>
                </form>
            `
        );

        cy.get('vl-select-rich-next#hobbies').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich-next#hobbies')
            .shadow()
            .find('.vl-select__list .vl-select__item')
            .contains('Padel')
            .click();
        cy.get('vl-select-rich-next#hobbies')
            .shadow()
            .find('.vl-select__list .vl-select__item')
            .contains('Dans')
            .click();
        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            const formData = parseFormData(formElement);

            expect(formData).to.have.property('hobbies').to.deep.equal(['padel', 'dans']);
        });
    });

    it('should get form data for native checkboxes', () => {
        cy.mount(
            html`
                <form id="form">
                    <input type="checkbox" name="hobbies" id="padel" value="padel" />
                    <label for="padel">Padel</label>
                    <input type="checkbox" name="hobbies" id="dans" value="dans" />
                    <label for="dans">Dans</label>
                    <input type="checkbox" name="hobbies" id="zwemmen" value="zwemmen" />
                    <label for="zwemmen">Zwemmen</label>
                </form>
            `
        );

        cy.get('input#padel').check();
        cy.get('input#dans').check();
        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            const formData = parseFormData(formElement);

            expect(formData).to.have.property('hobbies').to.deep.equal(['padel', 'dans']);
        });
    });

    it('should get form data for vl-checkboxes', () => {
        cy.mount(
            html`
                <form id="form">
                    <vl-checkbox-next
                        id="betrokkenheid-plannende-overheid"
                        name="betrokkenheid"
                        value="plannende-overheid"
                    >
                        Plannende overheid
                    </vl-checkbox-next>
                    <vl-checkbox-next id="betrokkenheid-adviesverlener" name="betrokkenheid" value="adviesverlener">
                        Adviesverlener
                    </vl-checkbox-next>
                </form>
            `
        );

        cy.get('vl-checkbox-next#betrokkenheid-plannende-overheid').invoke('attr', 'checked', '').trigger('change');
        cy.get('vl-checkbox-next#betrokkenheid-adviesverlener').invoke('attr', 'checked', '').trigger('change');

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            const formData = parseFormData(formElement);
            expect(formData).to.have.property('betrokkenheid').to.deep.equal(['plannende-overheid', 'adviesverlener']);
        });
    });

    it('should get form data for native radio buttons', () => {
        cy.mount(
            html`
                <form id="form">
                    <input type="radio" id="html" name="fav_language" value="HTML" />
                    <label for="html">HTML</label>
                    <input type="radio" id="css" name="fav_language" value="CSS" />
                    <label for="css">CSS</label>
                    <input type="radio" id="javascript" name="fav_language" value="JavaScript" />
                    <label for="javascript">JavaScript</label>
                </form>
            `
        );

        cy.get('#css').check();
        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            const formData = parseFormData(formElement);
            expect(formData).to.have.property('fav_language').to.deep.equal('CSS');
        });
    });

    it('should get form data for vl-radio-group', () => {
        cy.mount(
            html`
                <form id="form">
                    <vl-radio-group-next name="dietary-preferences">
                        <vl-radio-next id="vegan" value="Vegan">Vegan</vl-radio-next>
                        <vl-radio-next id="vegetarian" value="Vegetarian">Vegetarian</vl-radio-next>
                        <vl-radio-next id="omnivore" value="Omnivore">Omnivore</vl-radio-next>
                    </vl-radio-group-next>
                </form>
            `
        );

        cy.get('#vegetarian').invoke('attr', 'checked', '').trigger('change');
        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            const formData = parseFormData(formElement);
            expect(formData).to.have.property('dietary-preferences').to.deep.equal('Vegetarian');
        });
    });

    it('should get form data for vl-input-field-masked', () => {
        cy.mount(
            html`
                <form id="form">
                    <vl-input-field-masked-next name="iban" type="iban"></vl-input-field-masked-next>
                </form>
            `
        );

        cy.get('vl-input-field-masked-next').invoke('attr', 'value', 'BE71 0961 2345 6769').trigger('input');
        // Zou ook moeten werken met onderstaande code:
        // cy.get('vl-input-field-masked-next').shadow().find('input').click().type('BE71 0961 2345 6769');

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            const formData = parseFormData(formElement);
            expect(formData).to.have.property('iban', 'BE71 0961 2345 6769');
        });
    });

    it('should get form data for vl-upload', () => {
        cy.mount(
            html`
                <form id="form">
                    <vl-upload-next url="_" name="foto" id="foto"></vl-upload-next>
                </form>
            `
        );

        let fileToTest: File | null = null;
        cy.wrap(
            setupMockedUploadFormData().then((file) => {
                fileToTest = file;
            })
        );
        cy.fixture('upload/cat.jpeg', null).as('catFoto');
        cy.get('form').then(($el) => {
            const formData = parseFormData($el.get(0) as HTMLFormElement);
            expect(formData).to.have.property('foto').to.deep.equal(fileToTest);
        });
    });

    it('should get form data for file upload', () => {
        cy.mount(
            html`
                <form id="form">
                    <input type="file" id="bestand" name="bestand" multiple />
                </form>
            `
        );

        const fileName = 'example.txt';
        cy.get('#bestand').selectFile({
            contents: Cypress.Buffer.from('file content'),
            fileName,
        });

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            const formData = new FormData(formElement);

            expect(formData.get('bestand')).to.have.property('name', fileName);
        });
    });

    it('should get form data for vl-datepicker', () => {
        cy.mount(
            html`
                <form id="form">
                    <vl-datepicker-next id="geboortedatum" name="geboortedatum"></vl-datepicker-next>
                </form>
            `
        );

        cy.get('vl-datepicker-next').shadow().find('input#geboortedatum').click().type('31.12.2024');
        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            const formData = parseFormData(formElement);

            expect(formData).to.have.property('geboortedatum', '2024-12-31');
        });
    });

    it('should get form data for native date input', () => {
        cy.mount(
            html`
                <form id="form">
                    <input type="date" id="geboortedatum" name="geboortedatum" />
                </form>
            `
        );

        cy.get('input#geboortedatum').type('2024-12-31');
        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            const formData = parseFormData(formElement);

            expect(formData).to.have.property('geboortedatum', '2024-12-31');
        });
    });

    it('should get form data for vl-textarea', () => {
        cy.mount(
            html`
                <form id="form">
                    <vl-textarea-next name="verhaal"></vl-textarea-next>
                </form>
            `
        );

        cy.get('vl-textarea-next').shadow().find('textarea').type('My text');
        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            const formData = parseFormData(formElement);

            expect(formData).to.have.property('verhaal', 'My text');
        });
    });

    it('should get form data for native select dropdown', () => {
        cy.mount(
            html`
                <form id="form">
                    <select name="kies" id="kies">
                        <option value="kies">Kies</option>
                        <option value="siek">Siek</option>
                    </select>
                </form>
            `
        );

        cy.get('#kies').select('siek');
        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            const formData = parseFormData(formElement);

            expect(formData).to.have.property('kies', 'siek');
        });
    });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const setupMockedUploadFormData = async (): Promise<File | null> => {
    let fileToTest: File | null = null;

    return new Promise((resolve, reject) => {
        cy.readFile('fixtures/upload/cat.jpeg', 'base64').then((fileContent) => {
            const blob = Cypress.Blob.base64StringToBlob(fileContent);
            const lastModified = new Date().getTime();
            const fileToAdd = new File([blob], 'cat.jpeg', {
                type: 'image/jpeg',
                lastModified,
            });

            return cy.get('vl-upload-next#foto').then((uploadNext) => {
                try {
                    // Use `addFile` to add the file to the upload component
                    (<HTMLElement & { addFile(file: File): void }>uploadNext[0]).addFile(fileToAdd);

                    // Recreate the file to ensure it isn't mutated by the upload component
                    fileToTest = new File([blob], 'cat.jpeg', {
                        type: 'image/jpeg',
                        lastModified,
                    });

                    // Resolve the promise with the file
                    resolve(fileToTest);
                } catch (error) {
                    reject(error);
                }
            });
        });
    });
};
