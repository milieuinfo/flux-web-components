import { html, LitElement, TemplateResult } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

import './flux-button.component';
import './flux-input.component';
import './flux-form-controls.component';

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

@customElement('flux-form-demo')
export class FluxFormDemo extends LitElement {
    @state() private result: string | null = null;
    @state() private summary: string | null = null;

    @query('form') private formEl!: HTMLFormElement;

    private get fields(): FormField[] {
        return [...this.formEl.querySelectorAll<FormField>('[name]')];
    }

    private validateField(el: FormField): string | null {
        const isCheckbox = el.localName === 'flux-checkbox';
        if (el.hasAttribute('required')) {
            const empty = isCheckbox ? !el.checked : !(el.value && String(el.value).trim());
            if (empty) {
                return isCheckbox ? 'Vink dit aan om verder te gaan.' : 'Dit veld is verplicht.';
            }
        }
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
        setNative(rootEl.querySelector('flux-input[name="voornaam"]'), 'Jan');
        setNative(rootEl.querySelector('flux-input[name="achternaam"]'), 'Janssens');
        setNative(rootEl.querySelector('flux-input[name="email"]'), 'jan@voorbeeld.be');
        setNative(rootEl.querySelector('flux-input[name="leeftijd"]'), '42');
        setNative(rootEl.querySelector('flux-input[name="telefoon"]'), '+32 477 11 22 33');
        setNative(rootEl.querySelector('flux-select[name="provincie"]'), 'limburg');
        setNative(rootEl.querySelector('flux-textarea[name="bericht"]'), 'Graag info over het aanbod.');
        (rootEl.querySelector('vds-radio[value="email"]') as HTMLElement | null)?.click();
        const check = (sel: string) => {
            const cb = rootEl.querySelector(sel);
            const input = cb?.shadowRoot?.querySelector<HTMLInputElement>('input[type="checkbox"]');
            if (input && !input.checked) input.click();
        };
        check('flux-checkbox[value="sport"]');
        check('flux-checkbox[value="wetenschap"]');
        check('flux-checkbox[name="nieuwsbrief"]');
        check('flux-checkbox[name="akkoord"]');
    }

    private handleReset() {
        this.result = null;
        this.summary = null;
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
                <flux-fieldset label="Persoonsgegevens">
                    <flux-input
                        label="Voornaam"
                        name="voornaam"
                        required
                        indicator="verplicht"
                        placeholder="bv. Jan"
                    ></flux-input>

                    <flux-input
                        label="Achternaam"
                        name="achternaam"
                        required
                        indicator="verplicht"
                        placeholder="bv. Janssens"
                    ></flux-input>

                    <flux-input
                        label="E-mail"
                        name="email"
                        type="email"
                        required
                        indicator="verplicht"
                        annotation="We gebruiken dit enkel om te antwoorden."
                        placeholder="naam@voorbeeld.be"
                    ></flux-input>

                    <flux-input
                        label="Leeftijd"
                        name="leeftijd"
                        type="number"
                        min="0"
                        max="120"
                        annotation="In jaren."
                    ></flux-input>

                    <flux-input
                        label="Telefoon"
                        name="telefoon"
                        type="tel"
                        clearable
                        placeholder="+32 ..."
                    ></flux-input>
                </flux-fieldset>

                <flux-fieldset label="Voorkeuren">
                    <flux-select label="Provincie" name="provincie" required indicator="verplicht">
                        <option value="">Kies een provincie</option>
                        <option value="antwerpen">Antwerpen</option>
                        <option value="oost-vlaanderen">Oost-Vlaanderen</option>
                        <option value="west-vlaanderen">West-Vlaanderen</option>
                        <option value="limburg">Limburg</option>
                        <option value="vlaams-brabant">Vlaams-Brabant</option>
                    </flux-select>

                    <flux-radio-group label="Contactvoorkeur" name="contact" required indicator="verplicht">
                        <vds-radio value="email" label="E-mail"></vds-radio>
                        <vds-radio value="telefoon" label="Telefoon"></vds-radio>
                        <vds-radio value="post" label="Post"></vds-radio>
                    </flux-radio-group>

                    <flux-fieldset label="Interesses">
                        <flux-checkbox label="Sport" name="interesses" value="sport"></flux-checkbox>
                        <flux-checkbox label="Cultuur" name="interesses" value="cultuur"></flux-checkbox>
                        <flux-checkbox label="Wetenschap" name="interesses" value="wetenschap"></flux-checkbox>
                    </flux-fieldset>

                    <flux-checkbox
                        label="Schrijf me in op de nieuwsbrief"
                        name="nieuwsbrief"
                        value="ja"
                    ></flux-checkbox>

                    <flux-textarea
                        label="Bericht"
                        name="bericht"
                        placeholder="Optioneel bericht"
                    ></flux-textarea>
                </flux-fieldset>

                <flux-checkbox
                    label="Ik verklaar dit waarheidsgetrouw in te vullen"
                    name="akkoord"
                    value="ja"
                    required
                ></flux-checkbox>

                <div style="display: flex; gap: 8px; margin-top: 16px; flex-wrap: wrap;">
                    <flux-button type="submit">Verzenden</flux-button>
                    <flux-button secondary type="reset">Reset</flux-button>
                    <flux-button tertiary type="button" @click=${this.fillDemo}>
                        Vul demo-data in
                    </flux-button>
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
