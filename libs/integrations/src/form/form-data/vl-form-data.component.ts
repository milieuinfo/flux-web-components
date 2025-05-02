import { registerWebComponents, webComponent } from '@domg-wc/common';
import { vlGridStyles, vlLegacyStyles } from '@domg-wc/styles';
import { VlButtonComponent } from '@domg-wc/components/atom';
import {
    parseFormData,
    SelectRichOption,
    VlErrorMessageComponent,
    VlFormLabelComponent,
    VlInputFieldComponent,
    VlSelectRichComponent,
} from '@domg-wc/components/form';
import { css, CSSResult, html, LitElement } from 'lit';

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

    static {
        registerWebComponents([
            VlFormLabelComponent,
            VlInputFieldComponent,
            VlSelectRichComponent,
            VlErrorMessageComponent,
            VlButtonComponent,
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
            `,
        ];
    }

    override render() {
        return html`
            <form id="form" class="vl-form" @submit=${this.onSubmit} @reset=${this.onReset}>
                <div class="vl-grid">
                    <div class="vl-column vl-column--4">
                        <vl-form-label for="naam" label="Naam *" block></vl-form-label>
                    </div>
                    <div class="vl-column vl-column--8">
                        <vl-input-field id="naam" name="naam" block></vl-input-field>
                    </div>
                    <div class="vl-column vl-column--4">
                        <vl-form-label for="hobbies" label="Hobbies *" block></vl-form-label>
                    </div>
                    <div class="vl-column vl-column--8">
                        <vl-select-rich
                            id="hobbies"
                            name="hobbies"
                            multiple
                            deletable
                            .options=${this.hobbies}
                            placeholder="Selecteer je hobbies"
                            no-results-text="Geen hobbies gevonden"
                            no-choices-text="Geen resterende hobbies gevonden"
                        >
                        </vl-select-rich>
                        <vl-error-message for="hobbies" state="valueMissing"
                            >Gelieve een hobby te selecteren.
                        </vl-error-message>
                    </div>
                    <div class="vl-column vl-column--8 vl-column--start-5">
                        <div class="form-buttons">
                            <vl-button type="submit">Verstuur</vl-button>
                            <vl-button type="reset" secondary>Reset</vl-button>
                        </div>
                    </div>
                    ${this.parsedFormData
                        ? html`
                              <div class="vl-column vl-column--4">
                                  <label class="vl-form__label">Formulier data</label>
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

    private onSubmit(event: Event): void {
        event.preventDefault();

        const data = <typeof this.parsedFormData>parseFormData(event.target as HTMLFormElement);
        this.parsedFormData = data;
        console.log(data);
    }

    private onReset(): void {
        this.parsedFormData = null;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-form-data': VlFormDataComponent;
    }
}
