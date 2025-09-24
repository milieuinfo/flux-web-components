import { css, CSSResult, html } from 'lit';
import { BaseLitElement, registerWebComponents, webComponent } from '@domg-wc/common-utilities';
import { VlButtonComponent } from '@domg-wc/components/next/button';
import { vlElementsStyle } from '@domg-wc/elements';
import { VlErrorMessageComponent } from '@domg-wc/form/next/error-message';
import { VlFormLabelComponent } from '@domg-wc/form/next/form-label';
import { VlInputFieldComponent } from '@domg-wc/form/next/input-field';
import { SelectRichOption, VlSelectRichComponent } from '@domg-wc/form/next/select-rich';
import { parseFormData, setFormData } from '@domg-wc/form/utils';
import { SelectOption, VlSelectComponent } from '@domg-wc/form/next/select';
import { VlInputFieldMaskedComponent } from '@domg-wc/form/next/input-field-masked';
import { VlTextareaRichComponent } from '@domg-wc/form/next/textarea-rich';
import { VlTitleComponent } from '@domg-wc/components/next/title';
import { VlCheckboxComponent } from '@domg-wc/form/next/checkbox';
import { VlDatepickerComponent } from '@domg-wc/form/next/datepicker';
import { VlUploadComponent } from '@domg-wc/form/next/upload';
import { VlRadioGroupComponent } from '@domg-wc/form/next/radio-group';
import { vlGridStyles } from '@domg-wc/common-utilities/css';

@webComponent('vl-form-data')
export class VlFormDataComponent extends BaseLitElement {
    private hobbies: SelectRichOption[] = [
        { label: 'Padel', value: 'padel' },
        { label: 'Dans', value: 'dans' },
        { label: 'Drummen', value: 'drummen' },
        { label: 'Zwemmen', value: 'zwemmen' },
        { label: 'Boardgames', value: 'boardgames' },
        { label: 'Fietsen', value: 'fietsen' },
        { label: 'Cocktails', value: 'cocktails' },
    ];

    private geboorteplaatsen: SelectOption[] = [
        { label: 'Hasselt', value: 'hasselt' },
        { label: 'Turnhout', value: 'turnhout' },
        { label: 'Knokke-Heist', value: 'knokke-heist' },
        { label: 'Waregem', value: 'waregem' },
        { label: 'Lier', value: 'lier' },
    ];

    private parsedFormData: { naam: FormDataEntryValue; hobbies: FormDataEntryValue[] } | null = null;

    static {
        registerWebComponents([
            VlFormLabelComponent,
            VlErrorMessageComponent,
            VlCheckboxComponent,
            VlRadioGroupComponent,
            VlInputFieldComponent,
            VlSelectComponent,
            VlSelectRichComponent,
            VlErrorMessageComponent,
            VlButtonComponent,
            VlInputFieldMaskedComponent,
            VlDatepickerComponent,
            VlTextareaRichComponent,
            VlTitleComponent,
            VlUploadComponent,
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
            vlGridStyles,
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

                pre {
                    font-size: 1rem;
                }
            `,
        ];
    }

    override render() {
        return html`
            <form id="form" class="vl-form" @submit=${this.onSubmit} @reset=${this.onReset} autocomplete="off">
                <div class="vl-grid-next">
                    <div class="vl-column-next vl-column-next--4">
                        <vl-form-label-next for="naam" label="Naam *" block></vl-form-label-next>
                    </div>
                    <div class="vl-column-next vl-column-next--8">
                        <vl-input-field-next id="naam" name="naam" block></vl-input-field-next>
                    </div>
                    <div class="vl-column-next vl-column-next--4">
                        <vl-form-label-next for="geboorteplaats" label="Geboorteplaats" block></vl-form-label-next>
                    </div>
                    <div class="vl-column-next vl-column-next--8">
                        <vl-select-next
                            id="geboorteplaats"
                            name="geboorteplaats"
                            .options=${this.geboorteplaatsen}
                            placeholder="Selecteer geboorteplaats"
                        >
                        </vl-select-next>
                    </div>
                    <div class="vl-column-next vl-column-next--4">
                        <vl-form-label-next for="hobbies" label="Hobbies" block></vl-form-label-next>
                    </div>
                    <div class="vl-column-next vl-column-next--8">
                        <vl-select-rich-next
                            id="hobbies"
                            name="hobbies"
                            multiple
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

                    <div class="vl-column-next vl-column-next--4">
                        <vl-form-label-next for="betrokkenheid" label="Betrokkenheid" block></vl-form-label-next>
                    </div>
                    <div class="vl-column-next vl-column-next--8 vl-column--start-5">
                        <vl-checkbox-next
                            id="betrokkenheid-plannende-overheid"
                            name="betrokkenheid"
                            value="plannende-overheid"
                            multiple
                        >
                            <span>Plannende overheid</span>
                        </vl-checkbox-next>
                        <vl-checkbox-next
                            id="betrokkenheid-adviesverlener"
                            name="betrokkenheid"
                            value="adviesverlener"
                            multiple
                        >
                            <span>Adviesverlener</span>
                        </vl-checkbox-next>
                        <vl-checkbox-next
                            id="betrokkenheid-hogere-overheid"
                            name="betrokkenheid"
                            value="hogere-overheid"
                            multiple
                        >
                            <span>Hogere overheid</span>
                        </vl-checkbox-next>
                    </div>
                    <div class="vl-column-next vl-column-next--4">
                        <vl-form-label-next for="vervoer" label="Vervoer" block></vl-form-label-next>
                    </div>
                    <div class="vl-column-next vl-column-next--8">
                        <vl-radio-group-next name="vervoer">
                            <vl-radio-next value="land">Land</vl-radio-next>
                            <vl-radio-next value="zee">Zee</vl-radio-next>
                            <vl-radio-next value="lucht">Lucht</vl-radio-next>
                        </vl-radio-group-next>
                    </div>
                    <div class="vl-column-next vl-column-next--4">
                        <vl-form-label-next for="startDate" label="Aanvangsdatum" block></vl-form-label-next>
                    </div>
                    <div class="vl-column-next vl-column-next--8">
                        <vl-datepicker-next static name="startDate"> </vl-datepicker-next>
                    </div>
                    <div class="vl-column-next vl-column-next--4">
                        <vl-form-label-next for="file" label="Bestand" block></vl-form-label-next>
                    </div>
                    <div class="vl-column-next vl-column-next--8">
                        <vl-upload-next url="test" name="file" max-files="2"> </vl-upload-next>
                    </div>
                    <div class="vl-column-next vl-column-next--8 vl-column-next--start-5">
                        <div class="form-buttons">
                            <vl-button-next type="button" title="setFormData()" @click=${this.onSetFormData}
                                >Stel in
                            </vl-button-next>
                            <vl-button-next type="submit" title="parseFormData()">Verstuur</vl-button-next>
                            <vl-button-next type="reset" secondary>Reset</vl-button-next>
                        </div>
                    </div>
                    ${this.parsedFormData
                        ? html`
                              <div class="vl-column-next vl-column-next--4">
                                  <vl-form-label-next>Formulier data</vl-form-label-next>
                              </div>
                              <div class="vl-column-next vl-column-next--8">
                                  <pre>${JSON.stringify(this.parsedFormData, null, 10)}</pre>
                              </div>
                          `
                        : ''}
                </div>
            </form>
        `;
    }

    get formData() {
        const form = this.shadowRoot?.querySelector<HTMLFormElement>('form');
        console.log('[formData] form', form);
        return form ? parseFormData<{ betrokkenheid: FormData }>(form) : null;
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
            geboorteplaats: 'knokke-heist',
            hobbies: ['drummen', 'dans'],
            betrokkenheid: ['plannende-overheid', 'hogere-overheid'],
            vervoer: 'zee',
            startDate: 'today',
            file: [
                new File(['Hallo, world!'], 'dossier.txt', {
                    type: 'text/plain',
                    lastModified: new Date().getMilliseconds(),
                }),
                new File(['Konichua, world!'], 'aanbeveling.txt', {
                    type: 'text/plain',
                    lastModified: new Date().getMilliseconds(),
                }),
            ],
        };
        setFormData(form!, data);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-form-data': VlFormDataComponent;
    }
}
