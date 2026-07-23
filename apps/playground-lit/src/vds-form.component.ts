// FLUX-704 PoC: rijke form met ALLE prefix-aware VDS form-controls,
// zichtbare validatie en een FormData-print op submit.
//
// Waarom dit werkt onder de custom `vlds-` prefix:
// - Alle VDS form-velden (vl-input, vl-select, vl-checkbox, vl-textarea,
//   vl-radio-group) erven van VlFormAssociatedElement, dat
//   `static formAssociated = true` zet en via ElementInternals
//   `setFormValue()` doet. Daardoor leest `new FormData(form)` hun waarden
//   via het `name`-attribuut, ook als ze als `vlds-*` geregistreerd zijn.
// - Validatie: `validateInput()` spiegelt de validity van de inner native
//   input naar de host-ElementInternals. We roepen dit expliciet aan op
//   submit (en bij wijziging) en tonen de fout via de `error` + `message`
//   props (de standaard VDS-manier om een validatietekst te tonen).
//
// De vlds-* tags worden geregistreerd door vds-prefix-aware.ts (defineAll).
import { html, LitElement, TemplateResult } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

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
        const isCheckbox = el.localName === 'vlds-checkbox';
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

    // Demo-knop: vult alle velden via de inner native controls (met input/change
    // events) zodat de formAssociated VDS-velden hun form-value bijwerken.
    private fillDemo() {
        const rootEl = this.renderRoot as ParentNode;
        const setNative = (host: Element | null, val: string) => {
            const el = host?.shadowRoot?.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
                'input, textarea, select'
            );
            if (!el) return;
            const proto =
                el instanceof HTMLSelectElement
                    ? HTMLSelectElement.prototype
                    : el instanceof HTMLTextAreaElement
                      ? HTMLTextAreaElement.prototype
                      : HTMLInputElement.prototype;
            Object.getOwnPropertyDescriptor(proto, 'value')?.set?.call(el, val);
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
        };
        setNative(rootEl.querySelector('vlds-input[name="voornaam"]'), 'Jan');
        setNative(rootEl.querySelector('vlds-input[name="achternaam"]'), 'Janssens');
        setNative(rootEl.querySelector('vlds-input[name="email"]'), 'jan@voorbeeld.be');
        setNative(rootEl.querySelector('vlds-input[name="leeftijd"]'), '42');
        setNative(rootEl.querySelector('vlds-input[name="telefoon"]'), '+32 477 11 22 33');
        setNative(rootEl.querySelector('vlds-select[name="provincie"]'), 'limburg');
        setNative(rootEl.querySelector('vlds-textarea[name="bericht"]'), 'Graag info over het aanbod.');
        (rootEl.querySelector('vlds-radio[value="email"]') as HTMLElement | null)?.click();
        const check = (sel: string) => {
            const cb = rootEl.querySelector(sel);
            const input = cb?.shadowRoot?.querySelector<HTMLInputElement>('input[type="checkbox"]');
            if (input && !input.checked) input.click();
        };
        check('vlds-checkbox[value="sport"]');
        check('vlds-checkbox[value="wetenschap"]');
        check('vlds-checkbox[name="nieuwsbrief"]');
        check('vlds-checkbox[name="akkoord"]');
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
                <vlds-fieldset label="Persoonsgegevens">
                    <vlds-input
                        label="Voornaam"
                        name="voornaam"
                        required
                        indicator="verplicht"
                        placeholder="bv. Jan"
                    ></vlds-input>

                    <vlds-input
                        label="Achternaam"
                        name="achternaam"
                        required
                        indicator="verplicht"
                        placeholder="bv. Janssens"
                    ></vlds-input>

                    <vlds-input
                        label="E-mail"
                        name="email"
                        type="email"
                        required
                        indicator="verplicht"
                        annotation="We gebruiken dit enkel om te antwoorden."
                        placeholder="naam@voorbeeld.be"
                    ></vlds-input>

                    <vlds-input
                        label="Leeftijd"
                        name="leeftijd"
                        type="number"
                        min="0"
                        max="120"
                        annotation="In jaren."
                    ></vlds-input>

                    <vlds-input
                        label="Telefoon"
                        name="telefoon"
                        type="tel"
                        clearable
                        placeholder="+32 ..."
                    ></vlds-input>
                </vlds-fieldset>

                <vlds-fieldset label="Voorkeuren">
                    <vlds-select label="Provincie" name="provincie" required indicator="verplicht">
                        <option value="">Kies een provincie</option>
                        <option value="antwerpen">Antwerpen</option>
                        <option value="oost-vlaanderen">Oost-Vlaanderen</option>
                        <option value="west-vlaanderen">West-Vlaanderen</option>
                        <option value="limburg">Limburg</option>
                        <option value="vlaams-brabant">Vlaams-Brabant</option>
                    </vlds-select>

                    <vlds-radio-group label="Contactvoorkeur" name="contact" required indicator="verplicht">
                        <vlds-radio value="email" label="E-mail"></vlds-radio>
                        <vlds-radio value="telefoon" label="Telefoon"></vlds-radio>
                        <vlds-radio value="post" label="Post"></vlds-radio>
                    </vlds-radio-group>

                    <vlds-fieldset label="Interesses">
                        <vlds-checkbox label="Sport" name="interesses" value="sport"></vlds-checkbox>
                        <vlds-checkbox label="Cultuur" name="interesses" value="cultuur"></vlds-checkbox>
                        <vlds-checkbox label="Wetenschap" name="interesses" value="wetenschap"></vlds-checkbox>
                    </vlds-fieldset>

                    <vlds-checkbox
                        label="Schrijf me in op de nieuwsbrief"
                        name="nieuwsbrief"
                        value="ja"
                    ></vlds-checkbox>

                    <vlds-textarea
                        label="Bericht"
                        name="bericht"
                        placeholder="Optioneel bericht"
                    ></vlds-textarea>
                </vlds-fieldset>

                <vlds-checkbox
                    label="Ik verklaar dit waarheidsgetrouw in te vullen"
                    name="akkoord"
                    value="ja"
                    required
                ></vlds-checkbox>

                <div style="display: flex; gap: 8px; margin-top: 16px; flex-wrap: wrap;">
                    <vlds-button variant="primary" type="submit">Verzenden</vlds-button>
                    <vlds-button variant="secondary" type="reset">Reset</vlds-button>
                    <vlds-button variant="tertiary" type="button" @click=${this.fillDemo}>
                        Vul demo-data in
                    </vlds-button>
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
