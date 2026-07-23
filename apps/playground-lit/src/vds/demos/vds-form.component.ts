// FLUX-704 PoC: rijke form met ALLE prefix-aware VDS form-controls,
// zichtbare validatie en een FormData-print op submit.
//
// Waarom dit werkt onder de custom `vds-` prefix:
// - Alle VDS form-velden (vl-input, vl-select, vl-checkbox, vl-textarea,
//   vl-radio-group) erven van VlFormAssociatedElement, dat
//   `static formAssociated = true` zet en via ElementInternals
//   `setFormValue()` doet. Daardoor leest `new FormData(form)` hun waarden
//   via het `name`-attribuut, ook als ze als `vds-*` geregistreerd zijn.
// - Validatie: `validateInput()` spiegelt de validity van de inner native
//   input naar de host-ElementInternals. We roepen dit expliciet aan op
//   submit (en bij wijziging) en tonen de fout via de `error` + `message`
//   props (de standaard VDS-manier om een validatietekst te tonen).
//
// De vds-* tags worden geregistreerd door vds-prefix-aware.ts (defineAll).
import { html, LitElement, TemplateResult } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

import { setFormValue } from './form-value-utils';

type FormField = HTMLElement & {
    name?: string;
    value?: string | null;
    checked?: boolean;
    type?: string;
    error?: boolean;
    message?: string;
    required?: boolean;
    validity?: ValidityState;
    validationMessage?: string;
    checkValidity?: () => boolean;
    validateInput?: () => void;
    focus?: () => void;
};

@customElement('vds-form-demo')
export class VdsFormDemo extends LitElement {
    // Rem-schaal wordt nu globaal gecompenseerd via vds-scale-compensation.css
    // (zie vds-prefix-aware.ts), puur via rem i.p.v. de oude zoom-hack. Geen
    // host-zoom meer nodig.
    @state() private result: string | null = null;
    @state() private summary: string | null = null;

    @query('form') private formEl!: HTMLFormElement;

    // Alle form-associated velden binnen de form (de checkboxes met
    // dezelfde name horen bij elkaar).
    private get fields(): FormField[] {
        return [...this.formEl.querySelectorAll<FormField>('[name]')];
    }

    // Eén veld valideren -> NL-foutmelding of null. Combineert een
    // uniforme required-check (werkt voor elk control-type) met de echte
    // VDS-validity voor formaat (e-mail, getal-bereik, ...).
    private validateField(el: FormField): string | null {
        const isCheckbox = el.localName === 'vds-checkbox';
        if (el.hasAttribute('required')) {
            const empty = isCheckbox ? !el.checked : !(el.value && String(el.value).trim());
            if (empty) {
                return isCheckbox ? 'Vink dit aan om verder te gaan.' : 'Dit veld is verplicht.';
            }
        }
        // Echte VDS-validity (mirror van de inner native input).
        el.validateInput?.();
        if (el.checkValidity && !el.checkValidity()) {
            const v = el.validity;
            if (v?.typeMismatch) {
                return el.type === 'email' ? 'Vul een geldig e-mailadres in.' : 'Ongeldige waarde.';
            }
            if (v?.rangeUnderflow || v?.rangeOverflow) return 'Waarde valt buiten het toegelaten bereik.';
            if (v?.tooShort || v?.tooLong) return 'Lengte van de waarde is ongeldig.';
            if (v?.patternMismatch) return 'Waarde heeft een ongeldig formaat.';
            return el.validationMessage || 'Ongeldige waarde.';
        }
        return null;
    }

    private clearFieldError(el: FormField) {
        if (el.error) {
            el.error = false;
            el.message = '';
        }
    }

    // Live opnieuw valideren zodra een veld wijzigt, zodat de fout
    // verdwijnt van zodra de gebruiker corrigeert.
    private handleFieldChange(e: Event) {
        const el = (e.composedPath().find((n) => (n as HTMLElement)?.hasAttribute?.('name')) ??
            e.target) as FormField;
        if (!el?.hasAttribute('name')) return;
        const err = this.validateField(el);
        if (err) {
            el.error = true;
            el.message = err;
        } else {
            this.clearFieldError(el);
        }
    }

    private handleSubmit(e: Event) {
        e.preventDefault();

        // 1. Valideer alle velden, markeer fouten zichtbaar.
        let firstInvalid: FormField | null = null;
        let invalidCount = 0;
        for (const el of this.fields) {
            const err = this.validateField(el);
            if (err) {
                el.error = true;
                el.message = err;
                invalidCount++;
                if (!firstInvalid) firstInvalid = el;
            } else {
                this.clearFieldError(el);
            }
        }

        if (invalidCount > 0) {
            this.result = null;
            this.summary = `Formulier niet verzonden: ${invalidCount} veld(en) ongeldig.`;
            firstInvalid?.focus?.();
            return;
        }

        // 2. Alles geldig -> verzamel via de native FormData API.
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
        set('vds-input[name="voornaam"]', 'Jan');
        set('vds-input[name="achternaam"]', 'Janssens');
        set('vds-input[name="email"]', 'jan@voorbeeld.be');
        set('vds-input[name="leeftijd"]', '42');
        set('vds-input[name="telefoon"]', '+32 477 11 22 33');
        set('vds-select[name="provincie"]', 'limburg');
        set('vds-textarea[name="bericht"]', 'Graag info over het aanbod.');
        set('vds-radio-group[name="contact"]', 'email');
        set('vds-checkbox[value="sport"]', true);
        set('vds-checkbox[value="wetenschap"]', true);
        set('vds-checkbox[name="nieuwsbrief"]', true);
        set('vds-checkbox[name="akkoord"]', true);
    }

    private handleReset() {
        this.result = null;
        this.summary = null;
        // Wis ook eventuele fout-states.
        queueMicrotask(() => this.fields.forEach((el) => this.clearFieldError(el)));
    }

    render(): TemplateResult {
        return html`
            <form
                @submit=${this.handleSubmit}
                @reset=${this.handleReset}
                @vl-input=${this.handleFieldChange}
                @vl-change=${this.handleFieldChange}
                novalidate
            >
                <vds-fieldset label="Persoonsgegevens">
                    <vds-input
                        label="Voornaam"
                        name="voornaam"
                        required
                        indicator="verplicht"
                        placeholder="bv. Jan"
                    ></vds-input>

                    <vds-input
                        label="Achternaam"
                        name="achternaam"
                        required
                        indicator="verplicht"
                        placeholder="bv. Janssens"
                    ></vds-input>

                    <vds-input
                        label="E-mail"
                        name="email"
                        type="email"
                        required
                        indicator="verplicht"
                        annotation="We gebruiken dit enkel om te antwoorden."
                        placeholder="naam@voorbeeld.be"
                    ></vds-input>

                    <vds-input
                        label="Leeftijd"
                        name="leeftijd"
                        type="number"
                        min="0"
                        max="120"
                        annotation="In jaren."
                    ></vds-input>

                    <vds-input
                        label="Telefoon"
                        name="telefoon"
                        type="tel"
                        clearable
                        placeholder="+32 ..."
                    ></vds-input>
                </vds-fieldset>

                <vds-fieldset label="Voorkeuren">
                    <vds-select label="Provincie" name="provincie" required indicator="verplicht">
                        <option value="">Kies een provincie</option>
                        <option value="antwerpen">Antwerpen</option>
                        <option value="oost-vlaanderen">Oost-Vlaanderen</option>
                        <option value="west-vlaanderen">West-Vlaanderen</option>
                        <option value="limburg">Limburg</option>
                        <option value="vlaams-brabant">Vlaams-Brabant</option>
                    </vds-select>

                    <vds-radio-group label="Contactvoorkeur" name="contact" required indicator="verplicht">
                        <vds-radio value="email" label="E-mail"></vds-radio>
                        <vds-radio value="telefoon" label="Telefoon"></vds-radio>
                        <vds-radio value="post" label="Post"></vds-radio>
                    </vds-radio-group>

                    <vds-fieldset label="Interesses">
                        <vds-checkbox label="Sport" name="interesses" value="sport"></vds-checkbox>
                        <vds-checkbox label="Cultuur" name="interesses" value="cultuur"></vds-checkbox>
                        <vds-checkbox label="Wetenschap" name="interesses" value="wetenschap"></vds-checkbox>
                    </vds-fieldset>

                    <vds-checkbox
                        label="Schrijf me in op de nieuwsbrief"
                        name="nieuwsbrief"
                        value="ja"
                    ></vds-checkbox>

                    <vds-textarea
                        label="Bericht"
                        name="bericht"
                        placeholder="Optioneel bericht"
                    ></vds-textarea>
                </vds-fieldset>

                <vds-checkbox
                    label="Ik verklaar dit waarheidsgetrouw in te vullen"
                    name="akkoord"
                    value="ja"
                    required
                ></vds-checkbox>

                <div style="display: flex; gap: 8px; margin-top: 16px; flex-wrap: wrap;">
                    <vds-button variant="primary" type="submit">Verzenden</vds-button>
                    <vds-button variant="secondary" type="reset">Reset</vds-button>
                    <vds-button variant="tertiary" type="button" @click=${this.fillDemo}>
                        Vul demo-data in
                    </vds-button>
                </div>
            </form>

            ${this.summary
                ? html`<p role="alert" style="color: #b8860b; margin-top: 12px;">${this.summary}</p>`
                : null}
            ${this.result
                ? html`<div style="margin-top: 16px;">
                      <strong>Verzonden (via FormData API):</strong>
                      <pre
                          style="background: #f5f5f5; padding: 12px; border-radius: 4px; overflow: auto;"
                      >${this.result}</pre>
                  </div>`
                : null}
        `;
    }
}
