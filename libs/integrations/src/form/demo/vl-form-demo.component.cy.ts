import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlFormDemoComponent } from './vl-form-demo.component';
import { parseFormData } from '@domg-wc/components/form';

registerWebComponents([VlFormDemoComponent]);

describe('integrations - form demo', () => {
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

        getFormMessages().should('have.length', 0);
        getSubmitButton().click({ force: true }); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.

        // Naam input error messages
        getFormMessages({ forAttr: 'naam', state: 'valueMissing' });
        getNaamInput().find('input').type('a');
        getSubmitButton().click('bottomLeft'); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.
        getFormMessages({ forAttr: 'naam', state: 'tooShort' });
        getNaamInput().find('input').clear();

        const longNameText = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
        getNaamInput({ shadow: false }).invoke('attr', 'value', longNameText);
        cy.get('vl-form-demo')
            .shadow()
            .find('vl-input-field#naam')
            .shadow()
            .find('input')
            .should('contain.value', longNameText);

        getSubmitButton().click('bottomLeft'); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.

        getFormMessages({ forAttr: 'naam', state: 'tooLong' });
        getNaamInput().find('input').clear();
        getNaamInput().find('input').type('!');
        getSubmitButton().click({ force: true }); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.
        getFormMessages({ forAttr: 'naam', state: 'patternMismatch' });

        // Rrn input error messages
        getFormMessages({ forAttr: 'rrn', state: 'valueMissing' });
        getRrnInput().find('input').click().type('1');
        getSubmitButton().click({ force: true }); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.
        getFormMessages({ forAttr: 'rrn', state: 'patternMismatch' });

        // Geboortedatum datepicker error messages
        getFormMessages({ forAttr: 'geboortedatum', state: 'valueMissing' });
        getGeboortedatumDatepicker().find('input#geboortedatum').click().type('1');
        getSubmitButton().click({ force: true }); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.
        getFormMessages({ forAttr: 'geboortedatum', state: 'patternMismatch' });

        // Geboorteplaats select rich error messages
        getFormMessages({ forAttr: 'geboorteplaats', state: 'valueMissing' });

        // Hobbies select rich error messages
        getFormMessages({ forAttr: 'hobbies', state: 'valueMissing' });

        // Kinderen select error messages
        getFormMessages({ forAttr: 'kinderen', state: 'valueMissing' });

        // Interesses textarea error messages
        getFormMessages({ forAttr: 'interesses', state: 'valueMissing' });
        getInteressesTextarea().find('textarea').click().type('a');
        getSubmitButton().click({ force: true }); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.
        getFormMessages({ forAttr: 'interesses', state: 'tooShort' });
        const interessesText =
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
        getInteressesTextarea({ shadow: false }).invoke('attr', 'value', interessesText);
        cy.get('vl-form-demo')
            .shadow()
            .find('vl-textarea#interesses')
            .shadow()
            .find('textarea')
            .should('contain.value', interessesText);
        getSubmitButton().click({ force: true }); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.

        getFormMessages({ forAttr: 'interesses', state: 'tooLong' });

        // Leeftijd input error messages
        getFormMessages({ forAttr: 'leeftijd', state: 'valueMissing' });
        getLeeftijdInput().find('input').click().type('-1');
        getSubmitButton().click({ force: true }); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.
        getFormMessages({ forAttr: 'leeftijd', state: 'rangeUnderflow' });
        getLeeftijdInput().find('input').click().clear().type('100');
        getSubmitButton().click({ force: true }); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.
        getFormMessages({ forAttr: 'leeftijd', state: 'rangeOverflow' });

        // Contact methode error messages
        getFormMessages({ forAttr: 'contactmethode', state: 'valueMissing' });

        // Fotos upload error messages
        getFormMessages({ forAttr: 'foto', state: 'valueMissing' });

        // Waarheidsgetrouw error messages
        getFormMessages({ forAttr: 'waarheidsgetrouw', state: 'valueMissing' });

        getResetButton().click('bottomLeft'); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.
        getFormMessages().should('have.length', 0);
        cy.get('@submit').should('not.have.been.called');

        // */
    });

    it('should reset form', () => {
        cy.mount(html`<vl-form-demo></vl-form-demo>`);

        fillInForm();
        getResetButton().click('bottomLeft'); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.
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
        getGeboortePlaatsSelectRich()
            .find('select')
            .find('option[value="hasselt"]')
            .should('not.have.attr', 'selected');

        getHobbiesSelectRich().find('select').find('option[value="padel"]').should('not.have.attr', 'selected');
        getHobbiesSelectRich().find('select').find('option[value="dans"]').should('not.have.attr', 'selected');

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
            .find('vl-radio')
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
        getSubmitButton().click('bottomLeft'); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.
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
        getSubmitButton().click('bottomLeft'); // Hack om click te triggeren op de button, anders werd de click getriggered op de vl-button tag.
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
    return getFormControl({ selector: 'vl-input-field#naam', shadow });
};

const getRrnInput = ({ shadow = true } = {}) => {
    return getFormControl({ selector: 'vl-input-field-masked#rrn', shadow });
};

const getGeboortedatumDatepicker = ({ shadow = true } = {}) => {
    return getFormControl({ selector: 'vl-datepicker#geboortedatum', shadow });
};

const getGeboortePlaatsSelectRich = ({ shadow = true } = {}) => {
    return getFormControl({ selector: 'vl-select-rich#geboorteplaats', shadow });
};

const getHobbiesSelectRich = ({ shadow = true } = {}) => {
    return getFormControl({ selector: 'vl-select-rich#hobbies', shadow });
};

const getKinderenSelect = ({ shadow = true } = {}) => {
    return getFormControl({ selector: 'vl-select#kinderen', shadow });
};

const getInteressesTextarea = ({ shadow = true } = {}) => {
    return getFormControl({ selector: 'vl-textarea#interesses', shadow });
};

const getLeeftijdInput = ({ shadow = true } = {}) => {
    return getFormControl({ selector: 'vl-input-field#leeftijd', shadow });
};

const getContactMethodeRadioGroup = ({ shadow = true } = {}) => {
    return getFormControl({ selector: 'vl-radio-group#contactmethode', shadow });
};

const getFotosUpload = ({ shadow = true } = {}) => {
    return getFormControl({ selector: 'vl-upload#foto', shadow });
};

const getWaarheidsGetrouwCheckbox = ({ shadow = true } = {}) => {
    return getFormControl({ selector: 'vl-checkbox#waarheidsgetrouw', shadow });
};

const getSubmitButton = () => {
    return cy.get('vl-form-demo').shadow().find('vl-button[type="submit"]').shadow().find('button');
};

const getResetButton = () => {
    return cy.get('vl-form-demo').shadow().find('vl-button[type="reset"]').shadow().find('button');
};

const getFormMessages = ({ forAttr, state }: { forAttr?: string; state?: string } = {}) => {
    const selector = `vl-form-message[show]${forAttr ? `[for="${forAttr}"]` : ''}${state ? `[state="${state}"]` : ''}`;
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
        .find('vl-radio')
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
            .find('vl-upload#foto')
            .then((upload) => {
                // gebruiken hier addFile omdat we File object niet kunnen toevoegen met cy.selectFile() (enkel referenties)
                (<HTMLElement & { addFile(file: File): void }>upload[0]).addFile(fileToAdd);
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
