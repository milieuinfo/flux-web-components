import { registerWebComponents } from '@domg-wc/common-utilities';
import { parseFormData } from '@domg-wc/form/utils';
import { html } from 'lit';
import { VlFormDemoComponent } from './vl-form-demo.component';

registerWebComponents([VlFormDemoComponent]);

describe('integration - form demo', () => {
    it('should render', () => {
        cy.mount(html`<vl-form-demo></vl-form-demo>`);

        cy.get('vl-form-demo').shadow();
    });

    it('should render components', () => {
        cy.mount(html`<vl-form-demo></vl-form-demo>`);

        getNaamInput();
        getRrnInput();
        getGeboortedatumDatepicker();
        getGeboortePlaatsSelectRich();
        getHobbiesSelectRich();
        getKinderenSelect();
        getInteressesTextarea();
        getLeeftijdInput();
        getContactMethodeRadioGroup();
        getFotosUpload();
        getWaarheidsGetrouwCheckbox();
    });

    it('should show and hide error messages', () => {
        cy.mount(html`<vl-form-demo></vl-form-demo>`);
        createStubForSubmitEvent();

        getErrorMessages().should('have.length', 0);
        getSubmitButton().click({ force: true }); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.

        // Naam input error messages
        getErrorMessages({ forAttr: 'naam', state: 'valueMissing' });
        getNaamInput().find('input').type('a');
        getSubmitButton().click('bottomLeft'); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.
        getErrorMessages({ forAttr: 'naam', state: 'tooShort' });
        getNaamInput().find('input').clear();

        const longNameText = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
        getNaamInput({ shadow: false }).invoke('attr', 'value', longNameText);
        cy.get('vl-form-demo')
            .shadow()
            .find('vl-input-field-next#naam')
            .shadow()
            .find('input')
            .should('contain.value', longNameText);

        getSubmitButton().click('bottomLeft'); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.

        getErrorMessages({ forAttr: 'naam', state: 'tooLong' });
        getNaamInput().find('input').clear();
        getNaamInput().find('input').type('!');
        getSubmitButton().click({ force: true }); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.
        getErrorMessages({ forAttr: 'naam', state: 'patternMismatch' });

        // Rrn input error messages
        getErrorMessages({ forAttr: 'rrn', state: 'valueMissing' });
        getRrnInput().find('input').click().type('1');
        getSubmitButton().click({ force: true }); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.
        getErrorMessages({ forAttr: 'rrn', state: 'patternMismatch' });

        // Geboortedatum datepicker error messages
        getErrorMessages({ forAttr: 'geboortedatum', state: 'valueMissing' });
        getGeboortedatumDatepicker().find('input#geboortedatum').click().type('1');
        getSubmitButton().click({ force: true }); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.
        getErrorMessages({ forAttr: 'geboortedatum', state: 'patternMismatch' });

        // Geboorteplaats select rich error messages
        getErrorMessages({ forAttr: 'geboorteplaats', state: 'valueMissing' });

        // Hobbies select rich error messages
        getErrorMessages({ forAttr: 'hobbies', state: 'valueMissing' });

        // Kinderen select error messages
        getErrorMessages({ forAttr: 'kinderen', state: 'valueMissing' });

        // Interesses textarea error messages
        getErrorMessages({ forAttr: 'interesses', state: 'valueMissing' });
        getInteressesTextarea().find('textarea').click().type('a');
        getSubmitButton().click({ force: true }); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.
        getErrorMessages({ forAttr: 'interesses', state: 'tooShort' });
        const interessesText =
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
        getInteressesTextarea({ shadow: false }).invoke('attr', 'value', interessesText);
        cy.get('vl-form-demo')
            .shadow()
            .find('vl-textarea-next#interesses')
            .shadow()
            .find('textarea')
            .should('contain.value', interessesText);
        getSubmitButton().click({ force: true }); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.

        getErrorMessages({ forAttr: 'interesses', state: 'tooLong' });

        // Leeftijd input error messages
        getErrorMessages({ forAttr: 'leeftijd', state: 'valueMissing' });
        getLeeftijdInput().find('input').click().type('-1');
        getSubmitButton().click({ force: true }); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.
        getErrorMessages({ forAttr: 'leeftijd', state: 'rangeUnderflow' });
        getLeeftijdInput().find('input').click().clear().type('100');
        getSubmitButton().click({ force: true }); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.
        getErrorMessages({ forAttr: 'leeftijd', state: 'rangeOverflow' });

        // Contact methode error messages
        getErrorMessages({ forAttr: 'contactmethode', state: 'valueMissing' });

        // Fotos upload error messages
        getErrorMessages({ forAttr: 'foto', state: 'valueMissing' });

        // Waarheidsgetrouw error messages
        getErrorMessages({ forAttr: 'waarheidsgetrouw', state: 'valueMissing' });

        getResetButton().click('bottomLeft'); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.
        getErrorMessages().should('have.length', 0);
        cy.get('@submit').should('not.have.been.called');
    });

    it('should reset form', () => {
        cy.mount(html`<vl-form-demo></vl-form-demo>`);

        fillInForm();
        getResetButton().click('bottomLeft'); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button-next tag.
        getNaamInput().find('input').should('have.value', '');
        getNaamInput({ shadow: false }).runTest((component) => {
            // @ts-ignore access private property
            expect(component.value).to.be.empty;
        });
        getRrnInput().find('input#rrn').should('have.value', '');
        getRrnInput({ shadow: false }).runTest((component) => {
            // @ts-ignore access private property
            expect(component.value).to.be.empty;
        });
        getGeboortedatumDatepicker().find('input#geboortedatum').should('have.value', '');
        getGeboortePlaatsSelectRich().find('select').find('option[value="hasselt"]').should('not.exist');
        getHobbiesSelectRich().find('select').find('option[value="padel"]').should('not.exist');
        getHobbiesSelectRich().find('select').find('option[value="dans"]').should('not.exist');
        getHobbiesSelectRich({ shadow: false }).runTest((component) => {
            // @ts-ignore access private property
            expect(component.value).to.be.null;
        });
        getKinderenSelect().find('select').find('option[value="0"]').should('not.have.attr', 'selected');
        getInteressesTextarea().find('textarea').should('have.value', '');
        getLeeftijdInput().find('input').should('have.value', '');
        getLeeftijdInput({ shadow: false }).runTest((component) => {
            // @ts-ignore access private property
            expect(component.value).to.be.empty;
        });
        getContactMethodeRadioGroup({ shadow: false })
            .find('vl-radio-next')
            .shadow()
            .find('input[value="telefoon"]')
            .should('not.be.checked');
        getContactMethodeRadioGroup({ shadow: false }).runTest((radioGroup) => {
            // @ts-ignore access private property
            expect(radioGroup.value).to.be.null;
        });
        getFotosUpload({ shadow: false }).runTest((upload) => {
            // @ts-ignore access private property
            expect(upload.value).to.be.null;
        });
        getWaarheidsGetrouwCheckbox().find('input').should('not.be.checked');
        getWaarheidsGetrouwCheckbox({ shadow: false }).runTest((component) => {
            // @ts-ignore access private property
            expect(component.value).to.be.null;
        });
    });

    it('should submit form', () => {
        const submittedFormData = {
            naam: 'Kristof Spaas',
            rrn: '12.34.56-789.12',
            geboortedatum: '1991-09-26',
            geboorteplaats: 'hasselt',
            hobbies: ['padel', 'dans'],
            kinderen: '0',
            interesses: 'Vanalles en nog wat',
            leeftijd: '32',
            contactmethode: 'telefoon',
            foto: null,
            waarheidsgetrouw: 'on',
        };

        cy.mount(html`<vl-form-demo></vl-form-demo>`);
        createStubForSubmitEvent();
        setupMockedUploadFormData(submittedFormData);

        fillInForm();
        getSubmitButton().click('bottomLeft'); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button-next tag.
        cy.get('@submit').should('have.been.calledOnce');
        cy.get('vl-form-demo')
            .shadow()
            .find('form')
            .then(($el) => {
                const formData = parseFormData($el.get(0) as HTMLFormElement, ['hobbies', 'foto']);
                expect(formData).to.deep.equal(submittedFormData);
            });
    });

    it('should submit raw value of input-field-masked on submit form', () => {
        const submittedFormData = {
            naam: 'Kristof Spaas',
            rrn: '12345678912',
            geboortedatum: '1991-09-26',
            geboorteplaats: 'hasselt',
            hobbies: ['padel', 'dans'],
            kinderen: '0',
            interesses: 'Vanalles en nog wat',
            leeftijd: '32',
            contactmethode: 'telefoon',
            foto: null as File[] | null,
            waarheidsgetrouw: 'on',
        };

        cy.mount(html`<vl-form-demo></vl-form-demo>`);
        createStubForSubmitEvent();
        setupMockedUploadFormData(submittedFormData);

        getRrnInput({ shadow: false }).invoke('attr', 'raw-value', '');
        fillInForm();
        getSubmitButton().click({ force: true }); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.
        cy.get('@submit').should('have.been.calledOnce');
        cy.get('vl-form-demo')
            .shadow()
            .find('form')
            .then(($el) => {
                const formData = parseFormData($el.get(0) as HTMLFormElement, ['hobbies', 'foto']);
                expect(formData).to.deep.equal(submittedFormData);
            });
    });

    it('should have dynamic validation attributes', () => {
        const submittedFormData = {
            naam: '',
            rrn: '',
            interesses: '',
            leeftijd: '',
            geboortedatum: '',
            kinderen: '',
        };

        cy.mount(html`<vl-form-demo></vl-form-demo>`);
        createStubForSubmitEvent();

        getNaamInput({ shadow: false }).invoke('removeAttr', 'required');
        getRrnInput({ shadow: false }).invoke('removeAttr', 'required');
        getGeboortedatumDatepicker({ shadow: false }).invoke('removeAttr', 'required');
        getGeboortePlaatsSelectRich({ shadow: false }).invoke('removeAttr', 'required');
        getHobbiesSelectRich({ shadow: false }).invoke('removeAttr', 'required');
        getKinderenSelect({ shadow: false }).invoke('removeAttr', 'required');
        getInteressesTextarea({ shadow: false }).invoke('removeAttr', 'required');
        getLeeftijdInput({ shadow: false }).invoke('removeAttr', 'required');
        getContactMethodeRadioGroup({ shadow: false }).invoke('removeAttr', 'required');
        getFotosUpload({ shadow: false }).invoke('removeAttr', 'required');
        getWaarheidsGetrouwCheckbox({ shadow: false }).invoke('removeAttr', 'required');
        getSubmitButton().click('bottomLeft'); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button-next tag.
        cy.get('@submit').should('have.been.calledOnce');
        cy.get('vl-form-demo')
            .shadow()
            .find('form')
            .then(($el) => {
                const formData = parseFormData($el.get(0) as HTMLFormElement, ['hobbies', 'foto']);
                expect(formData).to.deep.equal(submittedFormData);
            });
    });
});

const getFormControl = ({ selector = '', shadow = true } = {}) => {
    if (shadow) {
        return cy.get('vl-form-demo').shadow().find(selector).shadow();
    } else {
        return cy.get('vl-form-demo').shadow().find(selector);
    }
};

const getNaamInput = ({ shadow = true } = {}) => {
    return getFormControl({ selector: 'vl-input-field-next#naam', shadow });
};

const getRrnInput = ({ shadow = true } = {}) => {
    return getFormControl({ selector: 'vl-input-field-masked-next#rrn', shadow });
};

const getGeboortedatumDatepicker = ({ shadow = true } = {}) => {
    return getFormControl({ selector: 'vl-datepicker-next#geboortedatum', shadow });
};

const getGeboortePlaatsSelectRich = ({ shadow = true } = {}) => {
    return getFormControl({ selector: 'vl-select-rich-next#geboorteplaats', shadow });
};

const getHobbiesSelectRich = ({ shadow = true } = {}) => {
    return getFormControl({ selector: 'vl-select-rich-next#hobbies', shadow });
};

const getKinderenSelect = ({ shadow = true } = {}) => {
    return getFormControl({ selector: 'vl-select-next#kinderen', shadow });
};

const getInteressesTextarea = ({ shadow = true } = {}) => {
    return getFormControl({ selector: 'vl-textarea-next#interesses', shadow });
};

const getLeeftijdInput = ({ shadow = true } = {}) => {
    return getFormControl({ selector: 'vl-input-field-next#leeftijd', shadow });
};

const getContactMethodeRadioGroup = ({ shadow = true } = {}) => {
    return getFormControl({ selector: 'vl-radio-group-next#contactmethode', shadow });
};

const getFotosUpload = ({ shadow = true } = {}) => {
    return getFormControl({ selector: 'vl-upload-next#foto', shadow });
};

const getWaarheidsGetrouwCheckbox = ({ shadow = true } = {}) => {
    return getFormControl({ selector: 'vl-checkbox-next#waarheidsgetrouw', shadow });
};

const getSubmitButton = () => {
    return cy.get('vl-form-demo').shadow().find('vl-button-next[type="submit"]').shadow().find('button');
};

const getResetButton = () => {
    return cy.get('vl-form-demo').shadow().find('vl-button-next[type="reset"]').shadow().find('button');
};

const getErrorMessages = ({ forAttr, state }: { forAttr?: string; state?: string } = {}) => {
    const selector = `vl-error-message-next[show]${forAttr ? `[for="${forAttr}"]` : ''}${
        state ? `[state="${state}"]` : ''
    }`;
    return cy.get('vl-form-demo').shadow().find(selector);
};

const createStubForSubmitEvent = () => {
    cy.get('vl-form-demo')
        .shadow()
        .find('form')
        .then(($el) => {
            $el.get(0).addEventListener('submit', cy.stub().as('submit'));
        });
};

const fillInForm = () => {
    getNaamInput().find('input').type('Kristof Spaas');
    getRrnInput().find('input#rrn').click().type('12345678912');
    getGeboortedatumDatepicker().find('input#geboortedatum').click().type('26.09.1991');
    getGeboortePlaatsSelectRich().find('.vl-select__inner').click();
    getGeboortePlaatsSelectRich().find('.vl-select__list').find('.vl-select__item').contains('Hasselt').click();
    getHobbiesSelectRich().find('.vl-select__inner').click();
    getHobbiesSelectRich().find('.vl-select__list').find('.vl-select__item').contains('Padel').click();
    getHobbiesSelectRich().find('.vl-select__list').find('.vl-select__item').contains('Dans').click();
    // Sluit de hobby dropdown
    cy.get('body').click(0, 0, { force: true });
    getKinderenSelect().find('select').select('0');
    getInteressesTextarea().find('textarea').click().type('Vanalles en nog wat');
    getLeeftijdInput().find('input').click().type('32');
    getContactMethodeRadioGroup({ shadow: false })
        .find('vl-radio-next')
        .shadow()
        .find('input[value="telefoon"]')
        // Force true omdat anders Cypress klaagt dat de radio gecovered is door zijn parent tag, wat een zeer vreemde error is.
        // Zoek een andere manier moest deze test flaky zijn hierdoor.
        .check({ force: true });
    getFotosUpload().find('input[type="file"]').selectFile('fixtures/upload/cat.jpeg', { force: true });
    // Force true omdat anders Cypress klaagt dat de radio gecovered is door zijn parent tag, wat een zeer vreemde error is.
    // Zoek een andere manier moest deze test flaky zijn hierdoor.
    getWaarheidsGetrouwCheckbox().find('input').check({ force: true });
};

const setupMockedUploadFormData = (submittedFormData: unknown & { foto: File[] | null }) => {
    cy.readFile('fixtures/upload/cat.jpeg', 'base64').then((fileContent) => {
        const blob = Cypress.Blob.base64StringToBlob(fileContent);
        const lastModified = new Date().getTime();
        const fileToAdd = new File([blob], 'cat.jpeg', {
            type: 'image/jpeg',
            lastModified,
        });
        return cy
            .get('vl-form-demo')
            .shadow()
            .find('vl-upload-next#foto')
            .then((uploadNext) => {
                // gebruiken hier addFile omdat we File object niet kunnen toevoegen met cy.selectFile() (enkel referenties)
                (<HTMLElement & { addFile(file: File): void }>uploadNext[0]).addFile(fileToAdd);
                // we maken de file hier opnieuw aan omdat de file gemuteerd wordt door de upload component
                // meer specifiek worden er Dropzone specifieke properties toegevoegd aan de file, die dan niet gaan matchen met de file die we in de formData terechtkomt
                const fileToTest = new File([blob], 'cat.jpeg', {
                    type: 'image/jpeg',
                    lastModified,
                });
                submittedFormData.foto = [fileToTest];
            });
    });
    cy.fixture('upload/cat.jpeg', null).as('catFoto');

    getFotosUpload().find('input[type="file"]').selectFile('@catFoto', { force: true });
};
