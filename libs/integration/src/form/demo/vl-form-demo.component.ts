import { registerWebComponents, webComponent } from '@domg-wc/common-utilities';
import { VlButtonComponent } from '@domg-wc/components/next/button';
import { VlTextComponent } from '@domg-wc/components/next/text';
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
import { css, CSSResult, html, LitElement } from 'lit';

@webComponent('vl-form-demo')
export class VlFormDemoComponent extends LitElement {
    private geboorteplaatsen: SelectRichOption[] = [
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

    private kinderenOpties: SelectOption[] = [
        { label: '0', value: '0' },
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5 of meer', value: '5 of meer' },
    ];

    static {
        registerWebComponents([
            VlFormLabelComponent,
            VlInputFieldComponent,
            VlInputFieldMaskedComponent,
            VlTextareaComponent,
            VlDatepickerComponent,
            VlSelectRichComponent,
            VlSelectComponent,
            VlRadioGroupComponent,
            VlRadioComponent,
            VlUploadComponent,
            VlCheckboxComponent,
            VlErrorMessageComponent,
            VlButtonComponent,
            VlTextComponent,
        ]);
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
            <form id="form" class="vl-form" @submit=${this.onSubmit}>
                <div class="vl-form-grid vl-form-grid--is-stacked">
                    <div class="vl-form-col--4-12">
                        <vl-form-label-next for="naam" label="Naam *"></vl-form-label-next>
                        <vl-text-next annotation small>(enkel achternaam)</vl-text-next>
                    </div>
                    <div class="vl-form-col--8-12">
                        <vl-input-field-next
                            id="naam"
                            name="naam"
                            block
                            required
                            pattern="^[a-zA-Z ]*$"
                            min-length=${2}
                            max-length=${20}
                            placeholder="Vul je naam in"
                        ></vl-input-field-next>
                        <vl-error-message-next for="naam" state="valueMissing"
                            >Gelieve een naam in te vullen.
                        </vl-error-message-next>
                        <vl-error-message-next for="naam" state="tooShort"
                            >Gelieve minimum 2 karakters te gebruiken.
                        </vl-error-message-next>
                        <vl-error-message-next for="naam" state="tooLong"
                            >Gelieve maximum 20 karakters te gebruiken.
                        </vl-error-message-next>
                        <vl-error-message-next for="naam" state="patternMismatch"
                            >Gelieve geen nummers of speciale tekens in te vullen.
                        </vl-error-message-next>
                    </div>
                    <div class="vl-form-col--4-12">
                        <vl-form-label-next for="rrn" label="Rijksregisternummer *" block></vl-form-label-next>
                    </div>
                    <div class="vl-form-col--8-12">
                        <vl-input-field-masked-next
                            id="rrn"
                            name="rrn"
                            block
                            required
                            mask="rrn"
                            placeholder="Vul je rijksregisternummer in"
                        ></vl-input-field-masked-next>
                        <vl-error-message-next for="rrn" state="valueMissing"
                            >Gelieve een rijksregisternummer in te vullen.
                        </vl-error-message-next>
                        <vl-error-message-next for="rrn" state="patternMismatch"
                            >Gelieve een geldig rijksregisternummer in te vullen.
                        </vl-error-message-next>
                    </div>
                    <div class="vl-form-col--4-12">
                        <vl-form-label-next for="geboortedatum" label="Geboortedatum *" block></vl-form-label-next>
                    </div>
                    <div class="vl-form-col--8-12">
                        <vl-datepicker-next
                            id="geboortedatum"
                            name="geboortedatum"
                            block
                            required
                            placeholder="Vul je geboortedatum in"
                        >
                        </vl-datepicker-next>
                        <vl-error-message-next for="geboortedatum" state="valueMissing">
                            Gelieve een geboortedatum in te vullen.
                        </vl-error-message-next>
                        <vl-error-message-next for="geboortedatum" state="patternMismatch">
                            Gelieve het volgende datum formaat te gebruiken: "dd.mm.YYYY", bv. 01.12.1976 of 1.2.1993
                        </vl-error-message-next>
                    </div>
                    <div class="vl-form-col--4-12">
                        <vl-form-label-next for="geboorteplaats" label="Geboorteplaats *" block></vl-form-label-next>
                    </div>
                    <div class="vl-form-col--8-12">
                        <vl-select-rich-next
                            id="geboorteplaats"
                            name="geboorteplaats"
                            required
                            search
                            .options=${this.geboorteplaatsen}
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
                            required
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
                    <div class="vl-col--4-12">
                        <vl-form-label-next for="kinderen" label="Aantal kinderen *" block></vl-form-label-next>
                    </div>
                    <div class="vl-col--8-12">
                        <vl-select-next
                            id="kinderen"
                            name="kinderen"
                            block
                            placeholder="Selecteer je aantal kinderen"
                            required
                            .options=${this.kinderenOpties}
                        ></vl-select-next>
                        <vl-error-message-next for="kinderen" state="valueMissing"
                            >Gelieve een aantal kinderen te kiezen.
                        </vl-error-message-next>
                    </div>
                    <div class="vl-form-col--4-12">
                        <vl-form-label-next for="interesses" label="Interesses *" block></vl-form-label-next>
                    </div>
                    <div class="vl-form-col--8-12">
                        <vl-textarea-next
                            id="interesses"
                            name="interesses"
                            block
                            required
                            min-length=${5}
                            max-length=${100}
                            rows=${10}
                            placeholder="Vul je interesses in"
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
                    <div class="vl-form-col--4-12">
                        <vl-form-label-next for="leeftijd" label="Leeftijd *" block></vl-form-label-next>
                    </div>
                    <div class="vl-form-col--8-12">
                        <vl-input-field-next
                            id="leeftijd"
                            name="leeftijd"
                            type="number"
                            block
                            required
                            placeholder="Vul je leeftijd in"
                            min=${0}
                            max=${99}
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
                    <div class="vl-form-col--4-12">
                        <vl-form-label-next for="contactmethode" label="Contactmethode *" block></vl-form-label-next>
                    </div>
                    <div class="vl-form-col--8-12">
                        <vl-radio-group-next id="contactmethode" name="contactmethode" required>
                            <vl-radio-next value="e-mail">e-mail</vl-radio-next>
                            <vl-radio-next value="telefoon">telefoon</vl-radio-next>
                            <vl-radio-next value="post">post</vl-radio-next>
                        </vl-radio-group-next>
                        <vl-error-message-next for="contactmethode" state="valueMissing">
                            Gelieve een contactmethode te selecteren.
                        </vl-error-message-next>
                    </div>
                    <div class="vl-form-col--4-12">
                        <vl-form-label-next for="foto" label="Pasfoto *" block></vl-form-label-next>
                    </div>
                    <div class="vl-form-col--8-12">
                        <vl-upload-next
                            id="foto"
                            name="foto"
                            accepted-files="image/*"
                            required
                            url="http://httpbin.org/post"
                        ></vl-upload-next>
                        <vl-error-message-next for="foto" state="valueMissing">
                            Gelieve een foto te selecteren.
                        </vl-error-message-next>
                    </div>
                    <div class="vl-form-col--4-12">
                        <vl-form-label-next
                            for="waarheidsgetrouw"
                            label="Waarheidsgetrouw *"
                            block
                        ></vl-form-label-next>
                    </div>
                    <div class="vl-form-col--8-12">
                        <vl-checkbox-next id="waarheidsgetrouw" name="waarheidsgetrouw" block required>
                            Naar waarheid ingevuld
                        </vl-checkbox-next>
                        <vl-error-message-next for="waarheidsgetrouw" state="valueMissing">
                            Gelieve te bevestigen dat bovenstaande gegevens naar waarheid zijn ingevuld.
                        </vl-error-message-next>
                    </div>
                    <div class="vl-form-col--6-12 vl-push--4-12">
                        <div class="form-buttons">
                            <vl-button-next type="submit">Verstuur</vl-button-next>
                            <vl-button-next type="reset" secondary>Reset</vl-button-next>
                        </div>
                    </div>
                </div>
            </form>
        `;
    }

    private onSubmit(event: Event): void {
        event.preventDefault();

        const data = parseFormData(event.target as HTMLFormElement);
        console.log(data);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-form-demo': VlFormDemoComponent;
    }
}
