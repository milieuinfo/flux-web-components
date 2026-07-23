import { html, LitElement, TemplateResult } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

import { setFormValue } from './form-value-utils';

type FormField = HTMLElement & {
    name?: string;
    value?: string | null;
    checked?: boolean;
    type?: string;
    error?: boolean;
    required?: boolean;
    validity?: ValidityState;
    validationMessage?: string;
    checkValidity?: () => boolean;
    reportValidity?: () => boolean;
    focus?: () => void;
};

@customElement('vl-form-demo')
export class VlFormDemo extends LitElement {
    @state() private result: string | null = null;
    @state() private summary: string | null = null;

    @query('form') private formEl!: HTMLFormElement;

    private get fields(): FormField[] {
        return [...this.formEl.querySelectorAll<FormField>('[name]')];
    }

    private validateField(el: FormField): string | null {
        const isCheckbox = el.localName === 'vl-checkbox';
        if (el.hasAttribute('required')) {
            const empty = isCheckbox ? !el.checked : !(el.value && String(el.value).trim());
            if (empty) {
                return isCheckbox ? 'Vink dit aan om verder te gaan.' : 'Dit veld is verplicht.';
            }
        }
        const inner = el.shadowRoot?.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
            'input, textarea, select'
        );
        const v = inner?.validity;
        if (inner && v && !v.valid) {
            if (v.typeMismatch) {
                return el.type === 'email' ? 'Vul een geldig e-mailadres in.' : 'Ongeldige waarde.';
            }
            if (v.rangeUnderflow || v.rangeOverflow) return 'Waarde valt buiten het toegelaten bereik.';
            if (v.tooShort || v.tooLong) return 'Lengte van de waarde is ongeldig.';
            if (v.patternMismatch) return 'Waarde heeft een ongeldig formaat.';
            return inner.validationMessage || 'Ongeldige waarde.';
        }
        return null;
    }

    private toggleFieldMessage(el: FormField, shown: boolean) {
        if (!el.id) return;
        const root = this.renderRoot as ParentNode;
        const inner = el.shadowRoot?.querySelector('input, textarea, select') as
            | (HTMLInputElement & { validity: ValidityState })
            | null;
        const v = inner?.validity as unknown as Record<string, boolean> | undefined;
        root.querySelectorAll<HTMLElement & { show?: boolean }>(`vl-form-message[for="${el.id}"]`).forEach((m) => {
            if (m.getAttribute('variant') === 'annotation') return;
            const state = m.getAttribute('state');
            m.show = shown && (!state || Boolean(v?.[state]));
        });
    }

    private handleSubmit(e: Event) {
        e.preventDefault();

        let firstInvalid: FormField | null = null;
        let invalidCount = 0;
        for (const el of this.fields) {
            const err = this.validateField(el);
            if (err) {
                el.error = true;
                this.toggleFieldMessage(el, true);
                invalidCount++;
                if (!firstInvalid) firstInvalid = el;
            } else {
                if (el.error) el.error = false;
                this.toggleFieldMessage(el, false);
            }
        }

        if (invalidCount > 0) {
            this.result = null;
            this.summary = `Formulier niet verzonden: ${invalidCount} veld(en) ongeldig.`;
            firstInvalid?.focus?.();
            return;
        }

        this.summary = null;
        const data = new FormData(this.formEl);
        const obj: Record<string, unknown> = {};
        for (const [k, v] of data.entries()) {
            if (k in obj) {
                obj[k] = ([] as unknown[]).concat(obj[k] as unknown, v);
            } else {
                obj[k] = v;
            }
        }
        this.result = JSON.stringify(obj, null, 2);
    }

    private fillDemo() {
        const root = this.renderRoot as ParentNode;
        const set = (sel: string, val: string | boolean) => {
            const el = root.querySelector<FormField>(sel);
            if (el) setFormValue(el, val);
        };
        set('#vlf-voornaam', 'Jan');
        set('#vlf-achternaam', 'Janssens');
        set('#vlf-email', 'jan@voorbeeld.be');
        set('#vlf-leeftijd', '42');
        set('#vlf-telefoon', '+32 477 11 22 33');
        set('#vlf-provincie', 'limburg');
        set('vl-radio-group[name="contact"]', 'email');
        set('vl-checkbox[value="sport"]', true);
        set('vl-checkbox[value="wetenschap"]', true);
        set('vl-checkbox[name="nieuwsbrief"]', true);
        set('#vlf-bericht', 'Graag info over het aanbod.');
        set('vl-checkbox[name="akkoord"]', true);
    }

    private handleReset() {
        this.result = null;
        this.summary = null;
        queueMicrotask(() =>
            this.fields.forEach((el) => {
                el.error = false;
                this.toggleFieldMessage(el, false);
            })
        );
    }

    render(): TemplateResult {
        return html`
            <form
                @submit=${this.handleSubmit}
                @reset=${this.handleReset}
                blur-validation
                novalidate
            >
                <vl-fieldset>
                    <span slot="legend">Persoonsgegevens</span>

                    <vl-form-label block for="vlf-voornaam" label="Voornaam"></vl-form-label>
                    <vl-input-field
                        id="vlf-voornaam"
                        name="voornaam"
                        required
                        placeholder="bv. Jan"
                    ></vl-input-field>
                    <vl-form-message for="vlf-voornaam" state="valueMissing">Dit veld is verplicht.</vl-form-message>

                    <vl-form-label block for="vlf-achternaam" label="Achternaam"></vl-form-label>
                    <vl-input-field
                        id="vlf-achternaam"
                        name="achternaam"
                        required
                        placeholder="bv. Janssens"
                    ></vl-input-field>
                    <vl-form-message for="vlf-achternaam" state="valueMissing">Dit veld is verplicht.</vl-form-message>

                    <vl-form-label block for="vlf-email" label="E-mail"></vl-form-label>
                    <vl-input-field
                        id="vlf-email"
                        name="email"
                        type="email"
                        required
                        placeholder="naam@voorbeeld.be"
                    ></vl-input-field>
                    <vl-form-message for="vlf-email" state="valueMissing">Dit veld is verplicht.</vl-form-message>
                    <vl-form-message for="vlf-email" state="typeMismatch">Vul een geldig e-mailadres in.</vl-form-message>
                    <vl-form-message for="vlf-email" variant="annotation">We gebruiken dit enkel om te antwoorden.</vl-form-message>

                    <vl-form-label block for="vlf-leeftijd" label="Leeftijd"></vl-form-label>
                    <vl-input-field
                        id="vlf-leeftijd"
                        name="leeftijd"
                        type="number"
                        min="0"
                        max="120"
                    ></vl-input-field>

                    <vl-form-label block for="vlf-telefoon" label="Telefoon"></vl-form-label>
                    <vl-input-field
                        id="vlf-telefoon"
                        name="telefoon"
                        type="tel"
                        placeholder="+32 ..."
                    ></vl-input-field>
                </vl-fieldset>

                <vl-fieldset>
                    <span slot="legend">Voorkeuren</span>

                    <vl-form-label block for="vlf-provincie" label="Provincie"></vl-form-label>
                    <vl-select
                        id="vlf-provincie"
                        name="provincie"
                        required
                        .options=${[
                            { value: '', label: 'Kies een provincie' },
                            { value: 'antwerpen', label: 'Antwerpen' },
                            { value: 'oost-vlaanderen', label: 'Oost-Vlaanderen' },
                            { value: 'west-vlaanderen', label: 'West-Vlaanderen' },
                            { value: 'limburg', label: 'Limburg' },
                            { value: 'vlaams-brabant', label: 'Vlaams-Brabant' },
                        ]}
                    ></vl-select>
                    <vl-form-message for="vlf-provincie" state="valueMissing">Dit veld is verplicht.</vl-form-message>

                    <vl-form-label block for="vlf-contact" label="Contactvoorkeur"></vl-form-label>
                    <vl-radio-group id="vlf-contact" name="contact" required>
                        <vl-radio value="email" label="E-mail">E-mail</vl-radio>
                        <vl-radio value="telefoon" label="Telefoon">Telefoon</vl-radio>
                        <vl-radio value="post" label="Post">Post</vl-radio>
                    </vl-radio-group>

                    <fieldset style="border: 0; padding: 0; margin: 0;">
                        <legend style="font-weight: 500; margin-bottom: 4px;">Interesses</legend>
                        <vl-checkbox name="interesses" value="sport">Sport</vl-checkbox>
                        <vl-checkbox name="interesses" value="cultuur">Cultuur</vl-checkbox>
                        <vl-checkbox name="interesses" value="wetenschap">Wetenschap</vl-checkbox>
                    </fieldset>

                    <vl-checkbox name="nieuwsbrief" value="ja">Schrijf me in op de nieuwsbrief</vl-checkbox>

                    <vl-form-label block for="vlf-bericht" label="Bericht"></vl-form-label>
                    <vl-textarea id="vlf-bericht" name="bericht" placeholder="Optioneel bericht"></vl-textarea>
                </vl-fieldset>

                <vl-checkbox name="akkoord" value="ja" required>
                    Ik verklaar dit waarheidsgetrouw in te vullen
                </vl-checkbox>

                <div style="display: flex; gap: 8px; margin-top: 16px; flex-wrap: wrap;">
                    <vl-button type="submit">Verzenden</vl-button>
                    <vl-button secondary type="reset">Reset</vl-button>
                    <vl-button tertiary type="button" @click=${this.fillDemo}>Vul demo-data in</vl-button>
                </div>
            </form>

            ${this.summary
                ? html`<p role="alert" style="color: #b8860b; margin-top: 12px;">${this.summary}</p>`
                : null}
            ${this.result
                ? html`<div style="margin-top: 16px;">
                      <strong>Verzonden (via FormData API):</strong>
                      <pre style="background: #f5f5f5; padding: 12px; border-radius: 4px; overflow: auto;">${this.result}</pre>
                  </div>`
                : null}
        `;
    }
}
