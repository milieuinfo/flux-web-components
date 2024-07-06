import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent } from '@domg-wc/components/atom';
import { html } from 'lit';
import { VlCheckboxComponent } from '../checkbox';
import { VlDatepickerComponent } from '../datepicker';
import { VlFormLabelComponent } from '../form-label';
import { VlFormMessageComponent } from '../form-message';
import { VlInputFieldComponent } from '../input-field';
import { VlInputFieldMaskedComponent } from '../input-field-masked';
import { VlRadioGroupComponent } from '../radio-group';
import { VlSelectRichComponent } from '../select-rich';
import { VlTextareaComponent } from '../textarea';
import { VlTextareaRichComponent } from '../textarea-rich';
import { VlUploadComponent } from '../upload';
import { parseFormData } from './form-data-getter';

registerWebComponents([
    VlButtonComponent,
    VlFormLabelComponent,
    VlInputFieldComponent,
    VlSelectRichComponent,
    VlFormMessageComponent,
    VlButtonComponent,
    VlCheckboxComponent,
    VlInputFieldMaskedComponent,
    VlDatepickerComponent,
    VlTextareaComponent,
    VlTextareaRichComponent,
    VlUploadComponent,
    VlRadioGroupComponent,
]);

describe('component - parseFormData - native inputs', () => {
    it('should get form data for native text input', () => {
        cy.mount(
            html`
                <form id="form">
                    <input id="naam" name="naam" />
                </form>
            `
        );

        cy.get('input#naam').type('Karim');
        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            const formData = parseFormData(formElement);

            expect(formData).to.have.property('naam', 'Karim');
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

    it('should get form data for native file upload', () => {
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

    it('should get form data for native text area', () => {
        cy.mount(
            html`
                <form id="form">
                    <textarea id="description" name="description"></textarea>
                </form>
            `
        );

        cy.get('textarea#description').type('hallo, wat is er loos');
        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            const formData = parseFormData(formElement);

            expect(formData).to.have.property('description', 'hallo, wat is er loos');
        });
    });
});

describe('component - parseFormData - vl form controls', () => {
    it('should get form data for vl-input-field', () => {
        cy.mount(
            html`
                <form id="form">
                    <vl-input-field id="naam" name="naam" block></vl-input-field>
                </form>
            `
        );

        cy.get('vl-input-field').shadow().find('input').type('John Doe');
        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            const formData = parseFormData(formElement);

            expect(formData).to.have.property('naam', 'John Doe');
        });
    });

    it('should get form data for vl-input-field-masked', () => {
        cy.mount(
            html`
                <form id="form">
                    <vl-input-field-masked name="iban" type="iban"></vl-input-field-masked>
                </form>
            `
        );

        cy.get('vl-input-field-masked').invoke('attr', 'value', 'BE71 0961 2345 6769').trigger('input');
        // Zou ook moeten werken met onderstaande code:
        // cy.get('vl-input-field-masked').shadow().find('input').click().type('BE71 0961 2345 6769');

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            const formData = parseFormData(formElement);
            expect(formData).to.have.property('iban', 'BE71 0961 2345 6769');
        });
    });

    it('should get form data for vl-select-rich - single', () => {
        cy.mount(
            html`
                <form id="form">
                    <vl-select-rich
                        id="geboorteplaats"
                        name="geboorteplaats"
                        .options=${[
                            { label: 'Hasselt', value: 'hasselt' },
                            { label: 'Turnhout', value: 'turnhout' },
                        ]}
                        placeholder="Selecteer je geboorteplaats"
                    ></vl-select-rich>
                </form>
            `
        );

        cy.get('vl-select-rich#geboorteplaats').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich#geboorteplaats')
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

    it('should get form data for vl-select-rich - multiple', () => {
        cy.mount(
            html`
                <form id="form">
                    <vl-select-rich
                        id="hobbies"
                        name="hobbies"
                        multiple
                        deletable
                        .options=${[
                            { label: 'Padel', value: 'padel' },
                            { label: 'Dans', value: 'dans' },
                        ]}
                        placeholder="Selecteer je hobbies"
                    ></vl-select-rich>
                </form>
            `
        );

        cy.get('vl-select-rich#hobbies').shadow().find('.vl-select__inner').click();
        cy.get('vl-select-rich#hobbies').shadow().find('.vl-select__list .vl-select__item').contains('Padel').click();
        cy.get('vl-select-rich#hobbies').shadow().find('.vl-select__list .vl-select__item').contains('Dans').click();
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
                    <vl-checkbox id="betrokkenheid-plannende-overheid" name="betrokkenheid" value="plannende-overheid">
                        Plannende overheid
                    </vl-checkbox>
                    <vl-checkbox id="betrokkenheid-adviesverlener" name="betrokkenheid" value="adviesverlener">
                        Adviesverlener
                    </vl-checkbox>
                </form>
            `
        );

        cy.get('vl-checkbox#betrokkenheid-plannende-overheid').invoke('attr', 'checked', '').trigger('change');
        cy.get('vl-checkbox#betrokkenheid-adviesverlener').invoke('attr', 'checked', '').trigger('change');

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            const formData = parseFormData(formElement);
            expect(formData).to.have.property('betrokkenheid').to.deep.equal(['plannende-overheid', 'adviesverlener']);
        });
    });

    it('should get form data for vl-radio-group', () => {
        cy.mount(
            html`
                <form id="form">
                    <vl-radio-group name="dietary-preferences">
                        <vl-radio id="vegan" value="Vegan">Vegan</vl-radio>
                        <vl-radio id="vegetarian" value="Vegetarian">Vegetarian</vl-radio>
                        <vl-radio id="omnivore" value="Omnivore">Omnivore</vl-radio>
                    </vl-radio-group>
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

    it('should get form data for vl-upload - single', () => {
        cy.mount(
            html`
                <form id="form">
                    <vl-upload url="_" name="foto" id="foto"></vl-upload>
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
    it('should get form data for vl-upload - multiple', () => {
        cy.mount(
            html`
                <form id="form">
                    <vl-upload url="_" name="foto" id="foto" max-files="2"></vl-upload>
                </form>
            `
        );

        let filesToTest: File[] = [];
        cy.wrap(
            setupMockedUploadFormData().then((file) => {
                if (file) filesToTest.push(file);
            })
        );
        cy.wrap(
            setupMockedUploadFormData().then((file) => {
                if (file) filesToTest.push(file);
            })
        );
        cy.fixture('upload/cat.jpeg', null).as('catFoto');
        cy.get('form').then(($el) => {
            const formData = parseFormData($el.get(0) as HTMLFormElement);
            expect(formData).to.have.property('foto').to.deep.equal(filesToTest);
        });
    });

    it('should get form data for vl-datepicker', () => {
        cy.mount(
            html`
                <form id="form">
                    <vl-datepicker id="geboortedatum" name="geboortedatum"></vl-datepicker>
                </form>
            `
        );

        cy.get('vl-datepicker').shadow().find('input#geboortedatum').click().type('31.12.2024');
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
                    <vl-textarea name="verhaal"></vl-textarea>
                </form>
            `
        );

        cy.get('vl-textarea').shadow().find('textarea').type('My text');
        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            const formData = parseFormData(formElement);

            expect(formData).to.have.property('verhaal', 'My text');
        });
    });

    it('should get form data for vl-textarea-rich', () => {
        cy.mount(
            html`
                <form id="form">
                    <vl-textarea-rich name="verhaal"></vl-textarea-rich>
                </form>
            `
        );

        // wacht op TinyMCE initialisatie
        cy.window().its('tinymce').should('exist');

        cy.get('vl-textarea-rich')
            .shadow()
            .find('iframe.tox-edit-area__iframe')
            .its('0.contentDocument.body')
            .should('not.be.empty')
            .then(cy.wrap)
            .click()
            .type('This is a Cypress test sentence.');

        cy.get('form').then((form) => {
            const formElement = form[0] as HTMLFormElement;
            const formData = parseFormData(formElement);

            expect(formData).to.have.property('verhaal').to.contain('This is a Cypress test sentence.');
        });
    });
});

// eslint-disable-line @typescript-eslint/no-unused-vars
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

            return cy.get('vl-upload#foto').then((uploadNext) => {
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
