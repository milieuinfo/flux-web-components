import { css, CSSResult, html, LitElement } from 'lit';
import { registerWebComponents, webComponent } from '@domg-wc/common-utilities';
import { VlErrorMessageComponent } from '@domg-wc/form/next/error-message';
import { vlElementsStyle } from '@domg-wc/elements';
import { VlInputFieldComponent } from '@domg-wc/form/next/input-field';
import { SelectRichOption, VlSelectRichComponent } from '@domg-wc/form/next/select-rich';
import { parseFormData, setFormData } from '@domg-wc/form/utils';
import { VlFormLabelComponent } from '@domg-wc/form/next/form-label';
import { VlButtonComponent } from '@domg-wc/components/next/button';
import { VlCheckboxComponent } from '@domg-wc/form/next/checkbox';
import { VlInputFieldMaskedComponent } from '@domg-wc/form/next/input-field-masked';
import { VlDatepickerComponent } from '@domg-wc/form/next/datepicker';
import { VlTextareaRichComponent } from '@domg-wc/form/next/textarea-rich';

@webComponent('vl-form-data')
export class VlFormDataComponent extends LitElement {
    private hobbies: SelectRichOption[] = [
        { label: 'Padel', value: 'padel' },
        { label: 'Dans', value: 'dans' },
        { label: 'Drummen', value: 'drummen' },
        { label: 'Zwemmen', value: 'zwemmen' },
        { label: 'Boardgames', value: 'boardgames' },
        { label: 'Fietsen', value: 'fietsen' },
        { label: 'Cocktails', value: 'cocktails' },
    ];
    private parsedFormData: { naam: FormDataEntryValue; hobbies: FormDataEntryValue[] } | null = null;

    private geboortePlaatsen = [
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

    static {
        registerWebComponents([
            VlFormLabelComponent,
            VlInputFieldComponent,
            VlSelectRichComponent,
            VlErrorMessageComponent,
            VlButtonComponent,
            VlCheckboxComponent,
            VlInputFieldMaskedComponent,
            VlDatepickerComponent,
            VlTextareaRichComponent,
        ]);
    }

    static override get properties() {
        return {
            parsedFormData: { type: Object, state: true },
        };
    }

    static override get styles(): (CSSResult | CSSResult[])[] {
        return [
            vlElementsStyle,
            css`
                form {
                    margin-top: 1rem;
                    max-width: 800px;
                }

                .form-buttons {
                    vl-button-next:not(:last-child) {
                        margin-right: 1.4rem;
                    }
                }
            `,
        ];
    }

    override render() {
        return html`
            <form id="form" class="vl-form" @submit=${this.onSubmit} @reset=${this.onReset} autocomplete="off">
                <div class="vl-form-grid vl-form-grid--is-stacked">
                    <div class="vl-form-col--4-12">
                        <vl-form-label-next for="naam" label="Naam *" block></vl-form-label-next>
                    </div>
                    <div class="vl-form-col--8-12">
                        <vl-input-field-next id="naam" name="naam" block></vl-input-field-next>
                    </div>
                    <div class="vl-form-col--4-12">
                        <vl-form-label-next for="geboorteplaats" label="Geboorteplaats *" block></vl-form-label-next>
                    </div>
                    <div class="vl-form-col--8-12">
                        <vl-select-rich-next
                            id="geboorteplaats"
                            name="geboorteplaats"
                            search
                            .options=${this.geboortePlaatsen}
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
                    <div class="vl-form-col--4-12">
                        <vl-form-label-next for="hobbies" label="Hobbies *" block></vl-form-label-next>
                    </div>
                    <div class="vl-form-col--8-12">
                        <vl-select-rich-next
                            id="hobbies"
                            name="hobbies"
                            multiple
                            deletable
                            .options=${this.hobbies}
                            placeholder="Selecteer je hobbies"
                            no-results-text="Geen hobbies gevonden"
                            no-choices-text="Geen resterende hobbies gevonden"
                        >
                        </vl-select-rich-next>
                        <vl-error-message-next for="hobbies" state="valueMissing"
                            >Gelieve een hobby te selecteren.
                        </vl-error-message-next>
                    </div>
                    <div class="vl-form-col--8-12">
                        <vl-checkbox-next
                            id="betrokkenheid-plannende-overheid"
                            name="betrokkenheid"
                            block
                            value="plannende-overheid"
                            multiple
                            @vl-checked="${this.__handleSearchChanged}"
                        >
                            <span>Plannende overheid</span>
                        </vl-checkbox-next>
                        <vl-checkbox-next
                            id="betrokkenheid-adviesverlener"
                            name="betrokkenheid"
                            block
                            value="adviesverlener"
                            multiple
                            @vl-checked="${this.__handleSearchChanged}"
                        >
                            <span>Adviesverlener</span>
                        </vl-checkbox-next>
                        <vl-checkbox-next
                            id="betrokkenheid-hogere-overheid"
                            name="betrokkenheid"
                            block
                            value="hogere-overheid"
                            multiple
                            @vl-checked="${this.__handleSearchChanged}"
                        >
                            <span>Hogere overheid</span>
                        </vl-checkbox-next>
                        <vl-error-message-next for="hobbies" state="valueMissing"
                            >Gelieve een betrokkenheid te selecteren.
                        </vl-error-message-next>
                    </div>
                    <div class="vl-form-col--8-12">
                        <vl-radio-group-next name="vervoer">
                            <vl-radio-next value="land">Land</vl-radio-next>
                            <vl-radio-next value="zee">Zee</vl-radio-next>
                            <vl-radio-next value="lucht">Lucht</vl-radio-next>
                        </vl-radio-group-next>
                        <vl-error-message-next for="vervoer" state="valueMissing"
                            >Gelieve een vervoer te selecteren.
                        </vl-error-message-next>
                    </div>
                    <div class="vl-form-col--8-12">hallo <input type="text" name="hallo" id="hallo" /></div>
                    <div class="vl-form-col--8-12">
                        <input type="radio" id="html" name="fav_language" value="HTML" autocomplete="off" />
                        <label for="html">HTML</label><br />
                        <input type="radio" id="css" name="fav_language" value="CSS" autocomplete="off" />
                        <label for="css">CSS</label><br />
                        <input type="radio" id="javascript" name="fav_language" value="JavaScript" autocomplete="off" />
                        <label for="javascript">JavaScript</label>
                    </div>
                    <div class="vl-form-col--8-12">
                        <vl-input-field-masked-next name="iban" type="iban"> </vl-input-field-masked-next>
                    </div>
                    <div class="vl-form-col--8-12">
                        <vl-upload-next url="test" name="file" max-files="2"> </vl-upload-next>
                    </div>
                    <div class="vl-form-col--8-12">
                        bestand <input type="file" id="bestand" name="bestand" multiple />
                    </div>
                    <div class="vl-form-col--8-12">
                        <vl-datepicker-next name="date"> </vl-datepicker-next>
                    </div>
                    <div class="vl-form-col--8-12">
                        <vl-textarea-rich-next name="verhaal"> </vl-textarea-rich-next>
                    </div>
                    <div class="vl-form-col--8-12">
                        <vl-checkbox-next name="waarheidsgetrouw" value="waarheidsgetrouw" block
                            >Waarheidsgetrouw</vl-checkbox-next
                        >
                        <vl-error-message-next for="waarheidsgetrouw" state="valueMissing"
                            >Gelieve waarheidsgetrouw te selecteren.
                        </vl-error-message-next>
                    </div>
                    <div class="vl-form-col--8-12">
                        <input type="checkbox" name="hungry" id="hungry" />
                        <label for="hungry">hungry</label><br />
                    </div>
                    <div class="vl-form-col--8-12">
                        <select type="kies" name="kies" id="kies">
                            <option value="kies">kies</option>
                            <option value="siek">siek</option>
                        </select>
                        <label for="kies">kies</label><br />
                    </div>
                    <div class="vl-form-col--6-12 vl-push--4-12">
                        <div class="form-buttons">
                            <vl-button-next type="submit">Verstuur</vl-button-next>
                            <vl-button-next type="reset" secondary>Reset</vl-button-next>
                            <vl-button-next type="button" secondary @vl-click=${this.onSetFormData}
                                >Set Form Data</vl-button-next
                            >
                        </div>
                    </div>
                    ${
                        this.parsedFormData
                            ? html`
                                  <div class="vl-form-col--4-12">
                                      <label class="vl-form__label">Formulier data</label>
                                  </div>
                                  <div class="vl-form-col--8-12">
                                      <pre>${JSON.stringify(this.parsedFormData, null, 10)}</pre>
                                  </div>
                              `
                            : ''
                    }
                </div>
            </form>

            <vl-title-next type="h2"> Form Data</vl-title-next>
            <p>
                Dit component toont een formulier met verschillende types van form controls. Het formulier kan worden
                ingevuld en de data kan worden opgehaald.
                <ul>
                    <li>De data kan worden opgehaald met de "Verstuur" knop.></li>
                    <li>De data kan worden ingesteld met de "Set Form Data" knop.</li>
                </ul>
            </p>
            <pre>
                ${JSON.stringify(this.parsedFormData, null, 10)}
            </pre>
        `;
    }

    __handleSearchChanged(event: CustomEvent) {
        console.log('event', event);
        this.__updateCurrentLocation();
    }

    get formData() {
        const form = this.shadowRoot?.querySelector<HTMLFormElement>('form');
        console.log('[formData] form', form);
        return form ? parseFormData<{ betrokkenheid: FormData }>(form) : null;
    }

    __updateCurrentLocation() {
        const currentLocation = new URL(window.location.href);
        console.log('currentLocation', currentLocation);
        if ('/' === window.location.pathname || '/dossier-overzicht' === window.location.pathname) {
            const searchParams = currentLocation.searchParams;
            console.log('searchParams', searchParams);
            const formData = this.formData;
            if (formData && formData['betrokkenheid']) {
                this.__updateMultiSearchParams(searchParams, 'betrokkenheid', formData['betrokkenheid']);
            }

            window.history.replaceState({}, '', currentLocation.href);
        }
    }

    __updateMultiSearchParams(searchParams: URLSearchParams, key: string, values: any[] | FormData) {
        searchParams.delete(key);
        if (values) {
            values.forEach((value) => searchParams.append(key, value));
            console.log('searchParams', searchParams.toString());
        }
    }

    private onSubmit(event: Event): void {
        event.preventDefault();

        const data = <typeof this.parsedFormData>parseFormData(event.target as HTMLFormElement);
        this.parsedFormData = data;
        console.log(data);
    }

    private onReset(): void {
        this.parsedFormData = null;
        const form = this.shadowRoot?.querySelector<HTMLFormElement>('form');
        form?.reset();
    }

    private onSetFormData(): void {
        const form = this.shadowRoot?.querySelector<HTMLFormElement>('form');
        const data = {
            naam: 'Dehbi',
            geboorteplaats: 'hasselt',
            hobbies: ['drummen', 'zwemmen'],
            betrokkenheid: ['plannende-overheid', 'hogere-overheid'],
            hungry: 'hungry',
            vervoer: 'zee',
            kies: 'siek',
            verhaal: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit <h1>test</h1>',
            date: 'today',
            iban: '85.01.05-123.40',
            bestand: [
                new File(
                    ['Hallo, world!'], // File content as a string or Blob
                    'Hallo.txt', // File name
                    {
                        type: 'text/plain', // MIME type
                        lastModified: new Date().getMilliseconds(), // Last modified date (optional)
                    }
                ),
                new File(
                    ['Hello, world!'], // File content as a string or Blob
                    'hello.txt', // File name
                    {
                        type: 'text/plain', // MIME type
                        lastModified: new Date().getMilliseconds(), // Last modified date (optional)
                    }
                ),
            ],
            file: [
                new File(
                    ['Hallo, world!'], // File content as a string or Blob
                    'Hallo.txt', // File name
                    {
                        type: 'text/plain', // MIME type
                        lastModified: new Date().getMilliseconds(), // Last modified date (optional)
                    }
                ),
                new File(
                    ['Hello, world!'], // File content as a string or Blob
                    'hello.txt', // File name
                    {
                        type: 'text/plain', // MIME type
                        lastModified: new Date().getMilliseconds(), // Last modified date (optional)
                    }
                ),
            ],
            hallo: 'sup',
            fav_language: 'JavaScript',
            waarheidsgetrouw: 'waarheidsgetrouw',
        };
        setFormData(form!, data);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-form-data': VlFormDataComponent;
    }
}
