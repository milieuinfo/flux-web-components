import { BaseLitElement, registerWebComponents, webComponent } from '@domg-wc/common';
import { VlButtonComponent, VlTitleComponent } from '@domg-wc/components/atom';
import {
    parseFormData,
    SelectRichOption,
    setFormData,
    VlCheckboxComponent,
    VlDatepickerComponent,
    VlFormLabelComponent,
    VlFormMessageComponent,
    VlInputFieldComponent,
    VlInputFieldMaskedComponent,
    VlSelectRichComponent,
    VlTextareaRichComponent,
    VlUploadComponent,
} from '@domg-wc/components/form';
import { vlGridStyles, vlLegacyStyles } from '@domg-wc/styles';
import { css, CSSResult, html } from 'lit';

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

    private parsedFormData: { naam: FormDataEntryValue; hobbies: FormDataEntryValue[] } | null = null;

    static {
        registerWebComponents([
            VlFormLabelComponent,
            VlInputFieldComponent,
            VlSelectRichComponent,
            VlFormMessageComponent,
            VlButtonComponent,
            VlCheckboxComponent,
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
            vlLegacyStyles,
            vlGridStyles,
            css`
                form {
                    margin-top: 1rem;
                    max-width: 800px;
                }

                .form-buttons {
                    vl-button:not(:last-child) {
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
                <div class="vl-grid">
                    <div class="vl-column vl-column--4">
                        <vl-form-label for="naam" label="Naam" block></vl-form-label>
                    </div>
                    <div class="vl-column vl-column--8">
                        <vl-input-field id="naam" name="naam" block></vl-input-field>
                    </div>
                    <div class="vl-column vl-column--4">
                        <vl-form-label for="geboorteplaats" label="Geboorteplaats" block></vl-form-label>
                    </div>
                    <div class="vl-column vl-column--8">
                        <vl-select
                            id="geboorteplaats"
                            name="geboorteplaats"
                            placeholder="Selecteer geboorteplaats"
                        >
                            <option value="hasselt">Hasselt</option>
                            <option value="turnhout">Turnhout</option>
                            <option value="knokke-heist">Knokke-Heist</option>
                            <option value="waregem">Waregem</option>
                            <option value="lier">Lier</option>
                        </vl-select>
                    </div>
                    <div class="vl-column vl-column--4">
                        <vl-form-label for="hobbies" label="Hobbies" block></vl-form-label>
                    </div>
                    <div class="vl-column vl-column--8">
                        <vl-select-rich
                            id="hobbies"
                            name="hobbies"
                            multiple
                            .options=${this.hobbies}
                            placeholder="Selecteer je hobbies"
                            no-results-text="Geen hobbies gevonden"
                            no-choices-text="Geen resterende hobbies gevonden"
                        >
                        </vl-select-rich>
                    </div>
                    <div class="vl-column vl-column--4">
                        <vl-form-label for="betrokkenheid" label="Betrokkenheid" block></vl-form-label>
                    </div>
                    <div class="vl-column vl-column--8 vl-column--start-5">
                        <vl-checkbox
                            id="betrokkenheid-plannende-overheid"
                            name="betrokkenheid"
                            value="plannende-overheid"
                            multiple
                        >
                            <span>Plannende overheid</span>
                        </vl-checkbox>
                        <vl-checkbox
                            id="betrokkenheid-adviesverlener"
                            name="betrokkenheid"
                            value="adviesverlener"
                            multiple
                        >
                            <span>Adviesverlener</span>
                        </vl-checkbox>
                        <vl-checkbox
                            id="betrokkenheid-hogere-overheid"
                            name="betrokkenheid"
                            value="hogere-overheid"
                            multiple
                        >
                            <span>Hogere overheid</span>
                        </vl-checkbox>
                    </div>
                    <div class="vl-column vl-column--4">
                        <vl-form-label for="vervoer" label="Vervoer" block></vl-form-label>
                    </div>
                    <div class="vl-column vl-column--8">
                        <vl-radio-group name="vervoer">
                            <vl-radio value="land">Land</vl-radio>
                            <vl-radio value="zee">Zee</vl-radio>
                            <vl-radio value="lucht">Lucht</vl-radio>
                        </vl-radio-group>
                    </div>
                    <div class="vl-column vl-column--4">
                        <vl-form-label for="startDate" label="Aanvangsdatum" block></vl-form-label>
                    </div>
                    <div class="vl-column vl-column--8">
                        <vl-datepicker static name="startDate"> </vl-datepicker>
                    </div>
                    <div class="vl-column vl-column--4">
                        <vl-form-label for="file" label="Bestand" block></vl-form-label>
                    </div>
                    <div class="vl-column vl-column--8">
                        <vl-upload url="test" name="file" max-files="2"> </vl-upload>
                    </div>
                    <div class="vl-column vl-column--12">
                        <div class="form-buttons">
                            <vl-button type="button" title="setFormData()" @click=${this.onSetFormData}
                                >Stel in
                            </vl-button>
                            <vl-button type="submit" title="parseFormData()">Verstuur</vl-button>
                            <vl-button type="reset" secondary>Reset</vl-button>
                        </div>
                    </div>
                    ${this.parsedFormData
                        ? html`
                              <div class="vl-column vl-column--4">
                                  <vl-form-label class="vl-form__label">Formulier data</vl-form-label>
                              </div>
                              <div class="vl-column vl-column--8">
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
