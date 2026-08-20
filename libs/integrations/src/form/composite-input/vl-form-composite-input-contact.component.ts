import { registerWebComponents, webComponent } from '@domg-wc/common';
import { vlGridStyles, vlLegacyStyles } from '@domg-wc/styles';
import { VlButtonComponent, VlTextComponent } from '@domg-wc/components/atom';
import {
    parseFormData,
    SelectOption,
    VlFormLabelComponent,
    VlFormMessageComponent,
    VlInputFieldComponent,
    VlSelectComponent,
    type CompositeValues,
} from '@domg-wc/components/form';
import { VlCompositeInputComponent } from './vl-composite-input.component';
import { css, CSSResult, html, LitElement, PropertyDeclarations, nothing } from 'lit';

const METHODS: SelectOption[] = [
    { value: 'email', label: 'E-mail' },
    { value: 'tel', label: 'Telefoon' },
];

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const PHONE = /^[\d\s/().+-]{6,}$/;

// Het eerste veld bepaalt welke regel op het tweede geldt: een e-mailadres of een telefoonnummer.
// Het tweede veld verschijnt pas na die keuze; een veld dat later bijkomt telt automatisch mee in de validatie.
const valideerContact = ({ 'contact-method': method, 'contact-value': value }: CompositeValues): string | null => {
    if (!method || !value) return null;
    if (method === 'email') return EMAIL.test(value) ? null : `'${value}' is geen geldig e-mailadres.`;
    if (method === 'tel') return PHONE.test(value) ? null : `'${value}' is geen geldig telefoonnummer.`;
    return null;
};

@webComponent('vl-form-composite-input-contact')
export class VlFormCompositeInputContactComponent extends LitElement {
    private method = '';
    private contact = '';
    private parsedFormData: Record<string, FormDataEntryValue> | null = null;

    static {
        registerWebComponents([
            VlCompositeInputComponent,
            VlSelectComponent,
            VlInputFieldComponent,
            VlFormLabelComponent,
            VlFormMessageComponent,
            VlButtonComponent,
            VlTextComponent,
        ]);
    }

    static override get properties(): PropertyDeclarations {
        return {
            method: { type: String, state: true },
            contact: { type: String, state: true },
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
            <form class="vl-form" @submit=${this.onSubmit} @reset=${this.onReset}>
                <div class="vl-grid">
                    <div class="vl-column vl-column--4">
                        <vl-form-label for="contact" label="Contactgegeven *" block></vl-form-label>
                    </div>
                    <div class="vl-column vl-column--8">
                        <vl-composite-input
                            id="contact"
                            label="Contactgegeven"
                            required
                            .customValidator=${valideerContact}
                        >
                            <vl-select
                                id="method"
                                name="contact-method"
                                label="Contactmethode"
                                placeholder="Kies een methode"
                                .value=${this.method}
                                .options=${METHODS}
                                @vl-change=${this.onMethodChange}
                            ></vl-select>
                            ${this.method === 'email'
                                ? html`<vl-input-field
                                      id="value"
                                      name="contact-value"
                                      label="E-mailadres"
                                      type="email"
                                      placeholder="naam@voorbeeld.be"
                                      .value=${this.contact}
                                      @vl-input=${this.onContactInput}
                                  ></vl-input-field>`
                                : nothing}
                            ${this.method === 'tel'
                                ? html`<vl-input-field
                                      id="value"
                                      name="contact-value"
                                      label="Telefoonnummer"
                                      type="tel"
                                      placeholder="+32 ..."
                                      .value=${this.contact}
                                      @vl-input=${this.onContactInput}
                                  ></vl-input-field>`
                                : nothing}
                        </vl-composite-input>
                        <vl-text annotation small
                            >Kies eerst een methode; vul dan een geldig e-mailadres (naam@voorbeeld.be) of
                            telefoonnummer in.</vl-text
                        >
                        <vl-form-message for="contact" state="valueMissing"
                            >Kies een methode en vul het contactgegeven in.</vl-form-message
                        >
                        <vl-form-message for="contact" state="customError"></vl-form-message>
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
                                  <vl-form-label class="vl-form__label">Formulier data</vl-form-label>
                              </div>
                              <div class="vl-column vl-column--8">
                                  <pre>${JSON.stringify(this.parsedFormData, null, 4)}</pre>
                              </div>
                          `
                        : ''}
                </div>
            </form>
        `;
    }

    private onMethodChange(event: CustomEvent) {
        this.method = (event.target as HTMLElement & { value: string }).value;
        this.contact = '';
    }

    private onContactInput(event: CustomEvent<{ value: string }>) {
        this.contact = event.detail?.value ?? '';
    }

    private onSubmit(event: Event) {
        event.preventDefault();
        this.parsedFormData = parseFormData(event.target as HTMLFormElement) as Record<string, FormDataEntryValue>;
    }

    private onReset() {
        this.method = '';
        this.contact = '';
        this.parsedFormData = null;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-form-composite-input-contact': VlFormCompositeInputContactComponent;
    }
}
