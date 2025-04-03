import { registerWebComponents } from '@domg-wc/common-utilities';
import { vlGridStyles } from '@domg-wc/common-utilities/css';
import { VlButtonComponent } from '@domg-wc/components/next/button';
import { vlElementsStyle } from '@domg-wc/elements';
import { VlCheckboxComponent } from '@domg-wc/form/next/checkbox';
import { VlDatepickerComponent } from '@domg-wc/form/next/datepicker';
import { VlErrorMessageComponent } from '@domg-wc/form/next/error-message';
import { VlFormLabelComponent } from '@domg-wc/form/next/form-label';
import { VlInputFieldComponent } from '@domg-wc/form/next/input-field';
import { VlInputFieldMaskedComponent } from '@domg-wc/form/next/input-field-masked';
import { VlRadioComponent, VlRadioGroupComponent } from '@domg-wc/form/next/radio-group';
import { SelectOption, VlSelectComponent } from '@domg-wc/form/next/select';
import { SelectRichOption, VlSelectRichComponent } from '@domg-wc/form/next/select-rich';
import { VlTextareaComponent } from '@domg-wc/form/next/textarea';
import { VlUploadComponent } from '@domg-wc/form/next/upload';
import { parseFormData } from '@domg-wc/form/utils';
import { CSSResult, html, LitElement, PropertyDeclarations, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import formStyle from './form.css';

type SubmittedFormData = {
    voornaam?: string;
    achternaam?: string;
    rrn?: string;
    interesses?: string;
    geboortedatum?: string;
    geboorteplaats?: string;
    [`hobby's`]?: string[];
    leeftijd?: number;
    kinderen?: string;
    adres?: string;
    contactmethode?: string;
    fotos?: File | File[];
    waarheidsgetrouw?: boolean;
};

@customElement('form-component')
export class FormComponent extends LitElement {
    // Required state values
    private firstNameRequired = false;
    private lastNameRequired = false;
    private rrnRequired = false;
    private interestsRequired = false;
    private birthdateRequired = false;
    private birthplaceRequired = false;
    private hobbiesRequired = false;
    private ageRequired = false;
    private kidsRequired = false;
    private addressFieldRequired = false;
    private photosRequired = false;
    private preferredContactMethodRequired = false;
    private filledInTruthfullyRequired = false;

    // Disabled state values
    private firstNameDisabled = false;
    private lastNameDisabled = false;
    private rrnDisabled = false;
    private interestsDisabled = false;
    private birthdateDisabled = false;
    private birthplaceDisabled = false;
    private hobbiesDisabled = false;
    private ageDisabled = false;
    private kidsDisabled = false;
    private addressFieldDisabled = false;
    private photosDisabled = false;
    private preferredContactMethodDisabled = false;

    private filledInTruthfullyDisabled = false;

    // Read only state values
    private firstNameReadonly = false;
    private lastNameReadonly = false;
    private rrnReadonly = false;
    private interestsReadonly = false;
    private birthdateReadonly = false;
    private birthplaceReadonly = false;
    private hobbiesReadonly = false;
    private ageReadonly = false;
    private kidsReadonly = false;
    private addressFieldReadonly = false;
    private filledInTruthfullyReadonly = false;
    private photosReadonly = false;
    private preferredContactMethodReadonly = false;

    // Other state values
    private showAddressField = false;

    // Form state values
    private firstName = '';
    private lastName = '';
    private rrn = '';
    private interests = '';
    private birthdate = '';
    private birthplaces: SelectRichOption[] = [
        {
            label: 'België',
            value: '',
            choices: [
                { label: 'Hasselt', value: 'hasselt' },
                { label: 'Turnhout', value: 'turnhout' },
                { label: 'Knokke-Heist', value: 'knokke-heist' },
                { label: 'Waregem', value: 'waregem' },
                { label: 'Lier', value: 'lier' },
            ],
        },
        {
            label: 'Puerto Rico',
            value: '',
            choices: [{ label: 'Rio Piedras', value: 'rio piedras' }],
        },
    ];
    private hobbies: SelectRichOption[] = [
        { label: 'Padel', value: 'padel' },
        { label: 'Dans', value: 'dans' },
        { label: 'Drummen', value: 'drummen' },
        { label: 'Zwemmen', value: 'zwemmen' },
        { label: 'Boardgames', value: 'boardgames' },
        { label: 'Fietsen', value: 'fietsen' },
    ];
    private age: number = null;
    private kidsOptions: SelectOption[] = [
        { label: '0', value: '0' },
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5 of meer', value: '5 of meer' },
    ];
    private address = '';
    private filledInTruthfully = false;
    private filledInTruthfullyValue = '';
    private photos = null;
    private preferredContactMethod = '';

    // Submitted form values
    private submittedFormData: SubmittedFormData = {};
    private submittedCount = 0;

    // Other values
    private resetEverything = false;

    static {
        registerWebComponents([
            VlErrorMessageComponent,
            VlFormLabelComponent,
            VlInputFieldComponent,
            VlInputFieldMaskedComponent,
            VlTextareaComponent,
            VlSelectRichComponent,
            VlCheckboxComponent,
            VlRadioComponent,
            VlRadioGroupComponent,
            VlDatepickerComponent,
            VlUploadComponent,
            VlSelectComponent,
            VlButtonComponent,
        ]);
    }

    static get styles(): (CSSResult | CSSResult[])[] {
        return [vlElementsStyle, formStyle, vlGridStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            firstNameRequired: { type: Boolean, state: true },
            lastNameRequired: { type: Boolean, state: true },
            rrnRequired: { type: Boolean, state: true },
            interestsRequired: { type: Boolean, state: true },
            birthdateRequired: { type: Boolean, state: true },
            birthplaceRequired: { type: Boolean, state: true },
            hobbiesRequired: { type: Boolean, state: true },
            ageRequired: { type: Boolean, state: true },
            kidsRequired: { type: Boolean, state: true },
            addressFieldRequired: { type: Boolean, state: true },
            photosRequired: { type: Boolean, state: true },
            preferredContactMethodRequired: { type: Boolean, state: true },
            filledInTruthfullyRequired: { type: Boolean, state: true },
            firstNameDisabled: { type: Boolean, state: true },
            lastNameDisabled: { type: Boolean, state: true },
            rrnDisabled: { type: Boolean, state: true },
            interestsDisabled: { type: Boolean, state: true },
            birthdateDisabled: { type: Boolean, state: true },
            birthplaceDisabled: { type: Boolean, state: true },
            hobbiesDisabled: { type: Boolean, state: true },
            ageDisabled: { type: Boolean, state: true },
            kidsDisabled: { type: Boolean, state: true },
            addressFieldDisabled: { type: Boolean, state: true },
            photosDisabled: { type: Boolean, state: true },
            preferredContactMethodDisabled: { type: Boolean, state: true },
            filledInTruthfullyDisabled: { type: Boolean, state: true },
            firstNameReadonly: { type: Boolean, state: true },
            lastNameReadonly: { type: Boolean, state: true },
            rrnReadonly: { type: Boolean, state: true },
            interestsReadonly: { type: Boolean, state: true },
            birthdateReadonly: { type: Boolean, state: true },
            birthplaceReadonly: { type: Boolean, state: true },
            hobbiesReadonly: { type: Boolean, state: true },
            ageReadonly: { type: Boolean, state: true },
            kidsReadonly: { type: Boolean, state: true },
            addressFieldReadonly: { type: Boolean, state: true },
            photosReadonly: { type: Boolean, state: true },
            preferredContactMethodReadonly: { type: Boolean, state: true },
            filledInTruthfullyReadonly: { type: Boolean, state: true },
            firstName: { type: String, state: true },
            lastName: { type: String, state: true },
            rrn: { type: String, state: true },
            interests: { type: String, state: true },
            birthdate: { type: String, state: true },
            birthplaces: { type: Array, state: true },
            hobbies: { type: Array, state: true },
            age: { type: Number, state: true },
            kidsOptions: { type: Array, state: true },
            address: { type: String, state: true },
            upload: { type: String, state: true },
            preferredContactMethod: { type: String, state: true },
            filledInTruthfully: { type: Boolean, state: true },
            filledInTruthfullyValue: { type: String, state: true },
            showAddressField: { type: Boolean, state: true },
            submittedFormData: { type: Object, state: true },
            submittedCount: { type: Number, state: true },
            resetEverything: { type: Boolean, state: true },
        };
    }
    render(): TemplateResult {
        return html`
            <div class="container">
                <div class="form-buttons form-buttons-top">
                    <vl-button-next
                        toggle
                        controlled
                        ?on=${this.showAddressField}
                        @vl-click=${() => {
                            this.showAddressField = !this.showAddressField;

                            if (!this.showAddressField) {
                                this.address = '';
                                this.submittedFormData.adres = '';
                            }
                        }}
                    >
                        Address field
                    </vl-button-next>
                    <vl-button-next
                        toggle
                        controlled
                        ?on=${this.resetEverything}
                        @vl-click=${() => (this.resetEverything = !this.resetEverything)}
                    >
                        Reset everything
                    </vl-button-next>
                </div>
                <form id="form" class="vl-form" @submit=${this.onSubmit} @reset=${this.onReset}>
                    <div class="vl-grid-next">
                        <div class="vl-column-next vl-column-next--2">
                            <vl-form-label-next
                                for="voornaam"
                                label="Voornaam${this.firstNameRequired ? ' *' : ''}"
                                block
                            ></vl-form-label-next>
                        </div>
                        <div class="vl-column-next vl-column-next--4">
                            <vl-input-field-next
                                id="voornaam"
                                name="voornaam"
                                block
                                ?required=${this.firstNameRequired}
                                ?disabled=${this.firstNameDisabled}
                                ?readonly=${this.firstNameReadonly}
                                value=${this.firstName}
                                pattern="^[a-zA-Z]*$"
                                min-length=${2}
                                max-length=${20}
                                @vl-input=${(e: CustomEvent) => (this.firstName = e.detail.value)}
                            ></vl-input-field-next>
                            <vl-error-message-next for="voornaam" state="valueMissing"
                                >Gelieve een voornaam in te vullen.
                            </vl-error-message-next>
                            <vl-error-message-next for="voornaam" state="tooShort"
                                >Gelieve minimum 2 karakters te gebruiken.
                            </vl-error-message-next>
                            <vl-error-message-next for="voornaam" state="tooLong"
                                >Gelieve maximum 20 karakters te gebruiken.
                            </vl-error-message-next>
                            <vl-error-message-next for="voornaam" state="patternMismatch"
                                >Gelieve geen nummers of speciale tekens in te vullen.
                            </vl-error-message-next>
                        </div>
                        <div class="vl-column-next vl-column-next--6">
                            <div class="form-buttons">
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.firstNameRequired}
                                    @vl-click=${() => (this.firstNameRequired = !this.firstNameRequired)}
                                >
                                    Required
                                </vl-button-next>
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.firstNameDisabled}
                                    @vl-click=${() => (this.firstNameDisabled = !this.firstNameDisabled)}
                                >
                                    Disabled
                                </vl-button-next>
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.firstNameReadonly}
                                    @vl-click=${() => (this.firstNameReadonly = !this.firstNameReadonly)}
                                >
                                    Readonly
                                </vl-button-next>
                                <vl-button-next secondary @vl-click=${() => (this.firstName = 'Karim')}>
                                    Set 'Karim'
                                </vl-button-next>
                            </div>
                        </div>
                        <div class="vl-column-next vl-column-next--2">
                            <vl-form-label-next
                                for="achternaam"
                                label="Achternaam${this.lastNameRequired ? ' *' : ''}"
                                block
                            ></vl-form-label-next>
                        </div>
                        <div class="vl-column-next vl-column-next--4">
                            <vl-input-field-next
                                id="achternaam"
                                name="achternaam"
                                block
                                ?required=${this.lastNameRequired}
                                ?disabled=${this.lastNameDisabled}
                                ?readonly=${this.lastNameReadonly}
                                min-length=${2}
                                max-length=${20}
                                value=${this.lastName}
                                pattern="^[a-zA-Z]*$"
                                @vl-input=${(e: CustomEvent) => (this.lastName = e.detail.value)}
                            ></vl-input-field-next>
                            <vl-error-message-next for="achternaam" state="valueMissing"
                                >Gelieve een achternaam in te vullen.
                            </vl-error-message-next>
                            <vl-error-message-next for="achternaam" state="tooShort"
                                >Gelieve minimum 2 karakters te gebruiken.
                            </vl-error-message-next>
                            <vl-error-message-next for="achternaam" state="tooLong"
                                >Gelieve maximum 20 karakters te gebruiken.
                            </vl-error-message-next>
                            <vl-error-message-next for="achternaam" state="patternMismatch"
                                >Gelieve geen nummers of speciale tekens in te vullen.
                            </vl-error-message-next>
                        </div>
                        <div class="vl-column-next vl-column-next--6">
                            <div class="form-buttons">
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.lastNameRequired}
                                    @vl-click=${() => (this.lastNameRequired = !this.lastNameRequired)}
                                >
                                    Required
                                </vl-button-next>
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.lastNameDisabled}
                                    @vl-click=${() => (this.lastNameDisabled = !this.lastNameDisabled)}
                                >
                                    Disabled
                                </vl-button-next>
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.lastNameReadonly}
                                    @vl-click=${() => (this.lastNameReadonly = !this.lastNameReadonly)}
                                >
                                    Readonly
                                </vl-button-next>
                                <vl-button-next secondary @vl-click=${() => (this.lastName = 'Spaas')}>
                                    Set 'Spaas'
                                </vl-button-next>
                            </div>
                        </div>
                        <div class="vl-column-next vl-column-next--2">
                            <vl-form-label-next
                                for="rrn"
                                label="Rijksregisternummer${this.rrnRequired ? ' *' : ''}"
                                block
                            ></vl-form-label-next>
                        </div>
                        <div class="vl-column-next vl-column-next--4">
                            <vl-input-field-masked-next
                                id="rrn"
                                name="rrn"
                                block
                                ?required=${this.rrnRequired}
                                ?disabled=${this.rrnDisabled}
                                ?readonly=${this.rrnReadonly}
                                value=${this.rrn}
                                mask="rrn"
                                @vl-input=${(e: CustomEvent) => (this.rrn = e.detail.value)}
                            ></vl-input-field-masked-next>
                            <vl-error-message-next for="rrn" state="valueMissing"
                                >Gelieve een rijksregisternummer in te vullen.</vl-error-message-next
                            >
                            <vl-error-message-next for="rrn" state="patternMismatch"
                                >Gelieve een geldig rijksregisternummer in te vullen.</vl-error-message-next
                            >
                        </div>
                        <div class="vl-column-next vl-column-next--6">
                            <div class="form-buttons">
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.rrnRequired}
                                    @vl-click=${() => (this.rrnRequired = !this.rrnRequired)}
                                >
                                    Required
                                </vl-button-next>
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.rrnDisabled}
                                    @vl-click=${() => (this.rrnDisabled = !this.rrnDisabled)}
                                >
                                    Disabled
                                </vl-button-next>
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.rrnReadonly}
                                    @vl-click=${() => (this.rrnReadonly = !this.rrnReadonly)}
                                >
                                    Readonly
                                </vl-button-next>
                                <vl-button-next secondary @vl-click=${() => (this.rrn = '85.01.05-123.45')}>
                                    Set '85.01.05-123.45'
                                </vl-button-next>
                            </div>
                        </div>
                        <div class="vl-column-next vl-column-next--2">
                            <vl-form-label-next
                                for="interesses"
                                label="Interesses${this.interestsRequired ? ' *' : ''}"
                                block
                            ></vl-form-label-next>
                        </div>
                        <div class="vl-column-next vl-column-next--4">
                            <vl-textarea-next
                                id="interesses"
                                name="interesses"
                                block
                                ?required=${this.interestsRequired}
                                ?disabled=${this.interestsDisabled}
                                ?readonly=${this.interestsReadonly}
                                min-length=${5}
                                max-length=${100}
                                rows=${10}
                                value=${this.interests}
                                @vl-input=${(e: CustomEvent) => (this.interests = e.detail.value)}
                            ></vl-textarea-next>
                            <vl-error-message-next for="interesses" state="valueMissing"
                                >Gelieve je interesses in te vullen.
                            </vl-error-message-next>
                            <vl-error-message-next for="interesses" state="tooShort"
                                >Gelieve minimum 5 karakters te gebruiken.
                            </vl-error-message-next>
                            <vl-error-message-next for="interesses" state="tooLong"
                                >Gelieve maximum 100 karakters te gebruiken.
                            </vl-error-message-next>
                        </div>
                        <div class="vl-column-next vl-column-next--6">
                            <div class="form-buttons">
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.interestsRequired}
                                    @vl-click=${() => (this.interestsRequired = !this.interestsRequired)}
                                >
                                    Required
                                </vl-button-next>
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.interestsDisabled}
                                    @vl-click=${() => (this.interestsDisabled = !this.interestsDisabled)}
                                >
                                    Disabled
                                </vl-button-next>
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.interestsReadonly}
                                    @vl-click=${() => (this.interestsReadonly = !this.interestsReadonly)}
                                >
                                    Readonly
                                </vl-button-next>
                                <vl-button-next secondary @vl-click=${() => (this.interests = 'Coding, spreadsheets')}>
                                    Set 'Coding, spreadsheets'
                                </vl-button-next>
                            </div>
                        </div>
                        <div class="vl-column-next vl-column-next--2">
                            <vl-form-label-next
                                for="geboortedatum"
                                label="Geboortedatum${this.birthdateRequired ? ' *' : ''}"
                                block
                            ></vl-form-label-next>
                        </div>
                        <div class="vl-column-next vl-column-next--4">
                            <vl-datepicker-next
                                id="geboortedatum"
                                name="geboortedatum"
                                block
                                value=${this.birthdate}
                                ?required=${this.birthdateRequired}
                                ?disabled=${this.birthdateDisabled}
                                @vl-input=${(e: CustomEvent) => (this.birthdate = e.detail.value)}
                            >
                            </vl-datepicker-next>
                            <vl-error-message-next for="geboortedatum" state="valueMissing">
                                Gelieve een geboortedatum in te vullen.
                            </vl-error-message-next>
                            <vl-error-message-next for="geboortedatum" state="patternMismatch">
                                Gelieve het volgende datum formaat te gebruiken: "dd.mm.YYYY", bv. 01.12.1976 of
                                1.2.1993
                            </vl-error-message-next>
                        </div>
                        <div class="vl-column-next vl-column-next--6">
                            <div class="form-buttons">
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.birthdateRequired}
                                    @vl-click=${() => (this.birthdateRequired = !this.birthdateRequired)}
                                >
                                    Required
                                </vl-button-next>
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.birthdateDisabled}
                                    @vl-click=${() => (this.birthdateDisabled = !this.birthdateDisabled)}
                                >
                                    Disabled
                                </vl-button-next>
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.birthdateReadonly}
                                    @vl-click=${() => (this.birthdateReadonly = !this.birthdateReadonly)}
                                >
                                    Readonly
                                </vl-button-next>
                                <vl-button-next secondary @vl-click=${() => (this.birthdate = '1976-12-31')}>
                                    Select '31.12.1976'
                                </vl-button-next>
                            </div>
                        </div>
                        <div class="vl-column-next vl-column-next--2">
                            <vl-form-label-next
                                for="geboorteplaats"
                                label="Geboorteplaats${this.birthplaceRequired ? ' *' : ''}"
                                block
                            ></vl-form-label-next>
                        </div>
                        <div class="vl-column-next vl-column-next--4">
                            <vl-select-rich-next
                                id="geboorteplaats"
                                name="geboorteplaats"
                                ?required=${this.birthplaceRequired}
                                ?disabled=${this.birthplaceDisabled}
                                ?not-deletable=${this.birthplaceReadonly}
                                search
                                .options=${this.birthplaces}
                                result-limit="2"
                                placeholder="Selecteer je geboorteplaats"
                                no-results-text="Geen geboorteplaatsen gevonden"
                                search-placeholder="Zoek geboorteplaats"
                            >
                            </vl-select-rich-next>
                            <vl-error-message-next for="geboorteplaats" state="valueMissing"
                                >Gelieve een geboorteplaats te selecteren.
                            </vl-error-message-next>
                        </div>
                        <div class="vl-column-next vl-column-next--6">
                            <div class="form-buttons">
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.birthplaceRequired}
                                    @vl-click=${() => (this.birthplaceRequired = !this.birthplaceRequired)}
                                >
                                    Required
                                </vl-button-next>
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.birthplaceDisabled}
                                    @vl-click=${() => (this.birthplaceDisabled = !this.birthplaceDisabled)}
                                >
                                    Disabled
                                </vl-button-next>
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.birthplaceReadonly}
                                    @vl-click=${this.toggleBirthplaceReadonly}
                                >
                                    Readonly
                                </vl-button-next>
                                <vl-button-next secondary @vl-click=${this.selectBirthplace}>
                                    Select 'Turnhout'
                                </vl-button-next>
                            </div>
                        </div>
                        <div class="vl-column-next vl-column-next--2">
                            <vl-form-label-next
                                for="hobby's"
                                label="Hobby's${this.hobbiesRequired ? ' *' : ''}"
                                block
                            ></vl-form-label-next>
                        </div>
                        <div class="vl-column-next vl-column-next--4">
                            <vl-select-rich-next
                                id="hobby's"
                                name="hobby's"
                                ?required=${this.hobbiesRequired}
                                ?disabled=${this.hobbiesDisabled}
                                ?not-deletable=${this.hobbiesReadonly}
                                multiple
                                .options=${this.hobbies}
                                placeholder="Selecteer je hobby's"
                                no-results-text="Geen hobbies gevonden"
                                no-choices-text="Geen resterende hobbies gevonden"
                            >
                            </vl-select-rich-next>
                            <vl-error-message-next for="hobby's" state="valueMissing"
                                >Gelieve een hobby te selecteren.
                            </vl-error-message-next>
                        </div>
                        <div class="vl-column-next vl-column-next--6">
                            <div class="form-buttons">
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.hobbiesRequired}
                                    @vl-click=${() => (this.hobbiesRequired = !this.hobbiesRequired)}
                                >
                                    Required
                                </vl-button-next>
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.hobbiesDisabled}
                                    @vl-click=${() => (this.hobbiesDisabled = !this.hobbiesDisabled)}
                                >
                                    Disabled
                                </vl-button-next>
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.hobbiesReadonly}
                                    @vl-click=${this.toggleHobbiesReadonly}
                                >
                                    Readonly
                                </vl-button-next>
                                <vl-button-next secondary @vl-click=${this.selectHobby}>
                                    Select 'Boardgames'
                                </vl-button-next>
                            </div>
                        </div>
                        <div class="vl-column-next vl-column-next--2">
                            <vl-form-label-next
                                for="leeftijd"
                                label="Leeftijd${this.ageRequired ? ' *' : ''}"
                                block
                            ></vl-form-label-next>
                        </div>
                        <div class="vl-column-next vl-column-next--4">
                            <vl-input-field-next
                                id="leeftijd"
                                name="leeftijd"
                                type="number"
                                block
                                ?required=${this.ageRequired}
                                ?disabled=${this.ageDisabled}
                                ?readonly=${this.ageReadonly}
                                min=${0}
                                max=${99}
                                value=${this.age}
                                @vl-input=${(e: CustomEvent) => (this.age = e.detail.value)}
                            ></vl-input-field-next>
                            <vl-error-message-next for="leeftijd" state="valueMissing"
                                >Gelieve een leeftijd in te vullen.
                            </vl-error-message-next>
                            <vl-error-message-next for="leeftijd" state="rangeUnderflow"
                                >De minimum leeftijd is 0 jaar.
                            </vl-error-message-next>
                            <vl-error-message-next for="leeftijd" state="rangeOverflow"
                                >De maximum leeftijd is 99 jaar.
                            </vl-error-message-next>
                        </div>
                        <div class="vl-column-next vl-column-next--6">
                            <div class="form-buttons">
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.ageRequired}
                                    @vl-click=${() => (this.ageRequired = !this.ageRequired)}
                                >
                                    Required
                                </vl-button-next>
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.ageDisabled}
                                    @vl-click=${() => (this.ageDisabled = !this.ageDisabled)}
                                >
                                    Disabled
                                </vl-button-next>
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.ageReadonly}
                                    @vl-click=${() => (this.ageReadonly = !this.ageReadonly)}
                                >
                                    Readonly
                                </vl-button-next>
                                <vl-button-next secondary @vl-click=${() => (this.age = 40)}> Set '40' </vl-button-next>
                            </div>
                        </div>
                        <div class="vl-column-next vl-column-next--2">
                            <vl-form-label-next
                                for="kinderen"
                                label="Aantal kinderen${this.kidsRequired ? ' *' : ''}"
                                block
                            ></vl-form-label-next>
                        </div>
                        <div class="vl-column-next vl-column-next--4">
                            <vl-select-next
                                id="kinderen"
                                name="kinderen"
                                block
                                placeholder="Selecteer je aantal kinderen"
                                ?required=${this.kidsRequired}
                                ?disabled=${this.kidsDisabled}
                                .options=${this.kidsOptions}
                            ></vl-select-next>
                            <vl-error-message-next for="kinderen" state="valueMissing"
                                >Gelieve een aantal kinderen te kiezen.
                            </vl-error-message-next>
                        </div>
                        <div class="vl-column-next vl-column-next--6">
                            <div class="form-buttons">
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.kidsRequired}
                                    @vl-click=${() => (this.kidsRequired = !this.kidsRequired)}
                                >
                                    Required
                                </vl-button-next>
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.kidsDisabled}
                                    @vl-click=${() => (this.kidsDisabled = !this.kidsDisabled)}
                                >
                                    Disabled
                                </vl-button-next>
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.kidsReadonly}
                                    @vl-click=${this.toggleKidsReadonly}
                                >
                                    Readonly
                                </vl-button-next>
                                <vl-button-next secondary @vl-click=${this.selectKidsOption}>
                                    Select '0'
                                </vl-button-next>
                            </div>
                        </div>
                        ${this.showAddressField
                            ? html`
                                  <div class="vl-column-next vl-column-next--2">
                                      <vl-form-label-next
                                          for="adres"
                                          label="Adres${this.addressFieldRequired ? ' *' : ''}"
                                          block
                                      ></vl-form-label-next>
                                  </div>
                                  <div class="vl-column-next vl-column-next--4">
                                      <vl-input-field-next
                                          id="adres"
                                          name="adres"
                                          block
                                          ?required=${this.addressFieldRequired}
                                          ?disabled=${this.addressFieldDisabled}
                                          ?readonly=${this.addressFieldReadonly}
                                          value=${this.address}
                                          @vl-input=${(e: CustomEvent) => (this.address = e.detail.value)}
                                      ></vl-input-field-next>
                                      <vl-error-message-next for="adres" state="valueMissing"
                                          >Gelieve een adres in te vullen.
                                      </vl-error-message-next>
                                  </div>
                                  <div class="vl-column-next vl-column-next--6">
                                      <div class="form-buttons">
                                          <vl-button-next
                                              toggle
                                              controlled
                                              ?on=${this.addressFieldRequired}
                                              @vl-click=${() =>
                                                  (this.addressFieldRequired = !this.addressFieldRequired)}
                                          >
                                              Required
                                          </vl-button-next>
                                          <vl-button-next
                                              toggle
                                              controlled
                                              ?on=${this.addressFieldDisabled}
                                              @vl-click=${() =>
                                                  (this.addressFieldDisabled = !this.addressFieldDisabled)}
                                          >
                                              Disabled
                                          </vl-button-next>
                                          <vl-button-next
                                              toggle
                                              controlled
                                              ?on=${this.addressFieldReadonly}
                                              @vl-click=${() =>
                                                  (this.addressFieldReadonly = !this.addressFieldReadonly)}
                                          >
                                              Readonly
                                          </vl-button-next>
                                          <vl-button-next
                                              secondary
                                              @vl-click=${() => (this.address = 'Koning Albert II-laan 20')}
                                          >
                                              Set 'Koning Albert II-laan 20'
                                          </vl-button-next>
                                      </div>
                                  </div>
                              `
                            : ''}
                        <div class="vl-column-next vl-column-next--2">
                            <vl-form-label-next
                                for="contactmethode"
                                label="Voorkeurscontactmethode${this.preferredContactMethodRequired ? ' *' : ''}"
                                block
                            ></vl-form-label-next>
                        </div>
                        <div class="vl-column-next vl-column-next--4">
                            <vl-radio-group-next
                                id="contactmethode"
                                name="contactmethode"
                                ?required=${this.preferredContactMethodRequired}
                                ?disabled=${this.preferredContactMethodDisabled}
                                ?readonly=${this.preferredContactMethodReadonly}
                                value=${this.preferredContactMethod}
                                @vl-input=${(e: CustomEvent) => (this.preferredContactMethod = e.detail.value)}
                            >
                                <vl-radio-next value="e-mail">e-mail</vl-radio-next>
                                <vl-radio-next value="telefoon">telefoon</vl-radio-next>
                                <vl-radio-next value="post">post</vl-radio-next>
                            </vl-radio-group-next>
                            <vl-error-message-next for="contactmethode" state="valueMissing">
                                Gelieve een contactmethode te selecteren.
                            </vl-error-message-next>
                        </div>
                        <div class="vl-column-next vl-column-next--6">
                            <div class="form-buttons">
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.preferredContactMethodRequired}
                                    @vl-click=${() =>
                                        (this.preferredContactMethodRequired = !this.preferredContactMethodRequired)}
                                >
                                    Required
                                </vl-button-next>
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.preferredContactMethodDisabled}
                                    @vl-click=${() =>
                                        (this.preferredContactMethodDisabled = !this.preferredContactMethodDisabled)}
                                >
                                    Disabled
                                </vl-button-next>
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.preferredContactMethodReadonly}
                                    @vl-click=${() =>
                                        (this.preferredContactMethodReadonly = !this.preferredContactMethodReadonly)}
                                >
                                    Readonly
                                </vl-button-next>
                                <vl-button-next secondary @vl-click=${() => (this.preferredContactMethod = 'post')}>
                                    Set 'post'
                                </vl-button-next>
                            </div>
                        </div>
                        <div class="vl-column-next vl-column-next--2">
                            <vl-form-label-next
                                for="fotos"
                                label="Pasfoto's${this.photosRequired ? ' *' : ''}"
                                block
                            ></vl-form-label-next>
                        </div>
                        <div class="vl-column-next vl-column-next--4">
                            <vl-upload-next
                                id="fotos"
                                name="fotos"
                                max-files="2"
                                accepted-files="image/*"
                                url="http://httpbin.org/post"
                                ?required=${this.photosRequired}
                                ?disabled=${this.photosDisabled}
                                ?readonly=${this.photosReadonly}
                                @vl-input=${(e: CustomEvent) => {
                                    this.photos = e.detail.value;
                                }}
                            ></vl-upload-next>
                            <vl-error-message-next for="fotos" state="valueMissing">
                                Gelieve 1 tot 2 foto's up te loaden.
                            </vl-error-message-next>
                        </div>
                        <div class="vl-column-next vl-column-next--6">
                            <div class="form-buttons">
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.photosRequired}
                                    @vl-click=${() => (this.photosRequired = !this.photosRequired)}
                                >
                                    Required
                                </vl-button-next>
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.photosDisabled}
                                    @vl-click=${() => (this.photosDisabled = !this.photosDisabled)}
                                >
                                    Disabled
                                </vl-button-next>
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.photosReadonly}
                                    @vl-click=${() => (this.photosReadonly = !this.photosReadonly)}
                                >
                                    Readonly
                                </vl-button-next>
                                <vl-button-next
                                    secondary
                                    @vl-click=${() => {
                                        const vlUpload = this.shadowRoot?.querySelector('vl-upload-next');
                                        if (vlUpload) {
                                            const pasfoto = new File([''], 'pasfoto.jpg', { type: 'image/jpg' });
                                            Object.defineProperty(pasfoto, 'size', {
                                                value: (1024 * 1024 + 1) / 2,
                                                configurable: true,
                                            });
                                            vlUpload.addFile(pasfoto);
                                        }
                                    }}
                                >
                                    Set 'pasfoto.jpg'
                                </vl-button-next>
                            </div>
                        </div>
                        <div class="vl-column-next vl-column-next--2">
                            <vl-form-label-next
                                for="waarheidsgetrouw"
                                label="Waarheidsgetrouw${this.filledInTruthfullyRequired ? ' *' : ''}"
                                block
                            ></vl-form-label-next>
                        </div>
                        <div class="vl-column-next vl-column-next--4">
                            <vl-checkbox-next
                                id="waarheidsgetrouw"
                                name="waarheidsgetrouw"
                                block
                                value=${this.filledInTruthfullyValue}
                                ?required=${this.filledInTruthfullyRequired}
                                ?disabled=${this.filledInTruthfullyDisabled || this.filledInTruthfullyReadonly}
                                ?checked=${this.filledInTruthfully}
                                @vl-input=${(e: CustomEvent) => (this.filledInTruthfully = e.detail.checked)}
                            >
                                Naar waarheid ingevuld
                            </vl-checkbox-next>
                            ${this.filledInTruthfullyReadonly
                                ? html`<input
                                      type="hidden"
                                      name="waarheidsgetrouw"
                                      value=${this.filledInTruthfully ? this.filledInTruthfullyValue || 'on' : ''}
                                  />`
                                : ''}
                            <vl-error-message-next for="waarheidsgetrouw" state="valueMissing">
                                Gelieve te bevestigen dat bovenstaande gegevens naar waarheid zijn ingevuld.
                            </vl-error-message-next>
                        </div>
                        <div class="vl-column-next vl-column-next--6">
                            <div class="form-buttons">
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.filledInTruthfullyRequired}
                                    @vl-click=${() =>
                                        (this.filledInTruthfullyRequired = !this.filledInTruthfullyRequired)}
                                >
                                    Required
                                </vl-button-next>
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.filledInTruthfullyDisabled}
                                    @vl-click=${() =>
                                        (this.filledInTruthfullyDisabled = !this.filledInTruthfullyDisabled)}
                                >
                                    Disabled
                                </vl-button-next>
                                <vl-button-next
                                    toggle
                                    controlled
                                    ?on=${this.filledInTruthfullyReadonly}
                                    @vl-click=${() =>
                                        (this.filledInTruthfullyReadonly = !this.filledInTruthfullyReadonly)}
                                >
                                    Readonly
                                </vl-button-next>
                                <vl-button-next
                                    secondary
                                    @vl-click=${() => (this.filledInTruthfullyValue = 'Een waarheid als een koe')}
                                >
                                    Set 'Een waarheid als een koe'
                                </vl-button-next>
                                <vl-button-next
                                    secondary
                                    @vl-click=${() => (this.filledInTruthfully = !this.filledInTruthfully)}
                                >
                                    Toggle checked
                                </vl-button-next>
                            </div>
                        </div>
                        <div class="vl-column-next vl-column-next--10 vl-column-next--start-3">
                            <div class="form-buttons">
                                <vl-button-next type="submit">Verstuur</vl-button-next>
                                <vl-button-next type="reset" secondary>Reset</vl-button-next>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="submitted-form">
                    <div class="vl-properties">
                        <h1 class="vl-properties__title">Gegevens (${this.submittedCount}x submitted)</h1>
                        <div class="vl-properties__column">
                            <dl class="vl-properties__list">
                                <dt class="vl-properties__label">Voornaam</dt>
                                <dd class="vl-properties__data">${this.submittedFormData.voornaam}</dd>
                                <dt class="vl-properties__label">Achternaam</dt>
                                <dd class="vl-properties__data">${this.submittedFormData.achternaam}</dd>
                                <dt class="vl-properties__label">Rijksregisternummer</dt>
                                <dd class="vl-properties__data">${this.submittedFormData.rrn}</dd>
                                <dt class="vl-properties__label">Interesses</dt>
                                <dd class="vl-properties__data">${this.submittedFormData.interesses}</dd>
                                <dt class="vl-properties__label">Geboortedatum</dt>
                                <dd class="vl-properties__data">${this.submittedFormData.geboortedatum}</dd>
                            </dl>
                        </div>
                        <div class="vl-properties__column">
                            <dl class="vl-properties__list">
                                <dt class="vl-properties__label">Geboorteplaats</dt>
                                <dd class="vl-properties__data">${this.submittedFormData.geboorteplaats}</dd>
                                <dt class="vl-properties__label">Hobby's</dt>
                                <dd class="vl-properties__data">
                                    ${this.submittedFormData[`hobby's`] instanceof Array
                                        ? this.submittedFormData[`hobby's`].map((hobby) => hobby).join(', ')
                                        : this.submittedFormData[`hobby's`]}
                                </dd>
                                <dt class="vl-properties__label">Leeftijd</dt>
                                <dd class="vl-properties__data">${this.submittedFormData.leeftijd}</dd>
                                <dt class="vl-properties__label">Aantal kinderen</dt>
                                <dd class="vl-properties__data">${this.submittedFormData.kinderen}</dd>
                                ${this.showAddressField
                                    ? html` <dt class="vl-properties__label">Adres</dt>
                                          <dd class="vl-properties__data">${this.submittedFormData.adres}</dd>`
                                    : ''}
                            </dl>
                        </div>
                        <div class="vl-properties__column">
                            <dl class="vl-properties__list">
                                <dt class="vl-properties__label">Contactmethode</dt>
                                <dd class="vl-properties__data">${this.submittedFormData.contactmethode}</dd>
                                <dt class="vl-properties__label">Pasfoto's</dt>
                                <dd class="vl-properties__data">
                                    ${this.submittedFormData.fotos instanceof Array
                                        ? this.submittedFormData.fotos.map((foto) => foto.name).join(', ')
                                        : this.submittedFormData.fotos?.name}
                                </dd>
                                <dt class="vl-properties__label">Waarheidsgetrouw</dt>
                                <dd class="vl-properties__data">${this.submittedFormData.waarheidsgetrouw}</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    private onSubmit(e: Event): void {
        e.preventDefault();

        const formData = parseFormData(e.target as HTMLFormElement);

        console.log('FormData na submit:', formData);

        this.submittedFormData = formData;
        this.submittedCount++;
    }

    private onReset(): void {
        this.firstName = '';
        this.lastName = '';
        this.rrn = '';
        this.interests = '';
        this.resetBirthplace();
        this.birthdate = '';
        this.resetHobbies();
        this.age = null;
        this.resetKidsOptions();
        this.address = '';
        this.photos = null;
        this.preferredContactMethod = '';
        this.filledInTruthfully = false;
        this.filledInTruthfullyValue = '';
        this.submittedFormData = {};
        this.submittedCount = 0;

        if (this.resetEverything) {
            this.firstNameRequired = false;
            this.lastNameRequired = false;
            this.rrnRequired = false;
            this.interestsRequired = false;
            this.birthdateRequired = false;
            this.birthplaceRequired = false;
            this.hobbiesRequired = false;
            this.ageRequired = false;
            this.kidsRequired = false;
            this.addressFieldRequired = false;
            this.photosRequired = false;
            this.preferredContactMethodRequired = false;
            this.filledInTruthfullyRequired = false;
            this.firstNameDisabled = false;
            this.lastNameDisabled = false;
            this.rrnDisabled = false;
            this.interestsDisabled = false;
            this.birthdateDisabled = false;
            this.birthplaceDisabled = false;
            this.hobbiesDisabled = false;
            this.ageDisabled = false;
            this.kidsDisabled = false;
            this.addressFieldDisabled = false;
            this.photosDisabled = false;
            this.preferredContactMethodDisabled = false;
            this.filledInTruthfullyDisabled = false;
            this.firstNameReadonly = false;
            this.lastNameReadonly = false;
            this.rrnReadonly = false;
            this.interestsReadonly = false;
            this.birthdateReadonly = false;
            this.birthplaceReadonly = false;
            this.hobbiesReadonly = false;
            this.ageReadonly = false;
            this.kidsReadonly = false;
            this.addressFieldReadonly = false;
            this.photosReadonly = false;
            this.preferredContactMethodReadonly = false;
            this.filledInTruthfullyReadonly = false;
        }
    }

    private selectBirthplace(): void {
        const birthplaces: SelectRichOption[] = this.birthplaces.map((birthplaceGroup) => {
            birthplaceGroup.choices = birthplaceGroup.choices?.map((birthplace) => {
                birthplace.selected = birthplace.value === 'turnhout';
                return birthplace;
            });
            return birthplaceGroup;
        });

        this.birthplaces = birthplaces;
    }

    private toggleBirthplaceReadonly(): void {
        this.birthplaceReadonly = !this.birthplaceReadonly;

        const birthplaces: SelectRichOption[] = this.birthplaces.map((birthplaceGroup) => {
            birthplaceGroup.choices = birthplaceGroup.choices?.map((birthplace) => {
                birthplace.disabled = this.birthplaceReadonly;
                return birthplace;
            });
            return birthplaceGroup;
        });

        this.birthplaces = birthplaces;
    }

    private resetBirthplace(): void {
        this.birthplaces = [
            {
                label: 'België',
                value: '',
                choices: [
                    { label: 'Hasselt', value: 'hasselt' },
                    { label: 'Turnhout', value: 'turnhout' },
                    { label: 'Knokke-Heist', value: 'knokke-heist' },
                    { label: 'Waregem', value: 'waregem' },
                    { label: 'Lier', value: 'lier' },
                ],
            },
            {
                label: 'Puerto Rico',
                value: '',
                choices: [{ label: 'Rio Piedras', value: 'rio piedras' }],
            },
        ];
    }

    private selectHobby(): void {
        const hobbies: SelectRichOption[] = this.hobbies.map((hobby) => {
            hobby.selected = hobby.value === 'boardgames';
            return hobby;
        });

        this.hobbies = hobbies;
    }

    private toggleHobbiesReadonly(): void {
        this.hobbiesReadonly = !this.hobbiesReadonly;

        const hobbies: SelectRichOption[] = this.hobbies.map((hobby) => {
            hobby.disabled = this.hobbiesReadonly;
            return hobby;
        });

        this.hobbies = hobbies;
    }

    private resetHobbies(): void {
        this.hobbies = [
            { label: 'Padel', value: 'padel' },
            { label: 'Dans', value: 'dans' },
            { label: 'Drummen', value: 'drummen' },
            { label: 'Zwemmen', value: 'zwemmen' },
            { label: 'Boardgames', value: 'boardgames' },
            { label: 'Fietsen', value: 'fietsen' },
        ];
    }

    private selectKidsOption(): void {
        const kidsOptions: SelectOption[] = this.kidsOptions.map((option) => {
            option.selected = option.value === '0';
            return option;
        });

        this.kidsOptions = kidsOptions;
    }

    private toggleKidsReadonly(): void {
        this.kidsReadonly = !this.kidsReadonly;

        const kidsOptions: SelectOption[] = this.kidsOptions.map((option) => {
            option.disabled = this.kidsReadonly;
            return option;
        });

        this.kidsOptions = kidsOptions;
    }

    private resetKidsOptions(): void {
        this.kidsOptions = [
            { label: '0', value: '0' },
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' },
        ];
    }
}
