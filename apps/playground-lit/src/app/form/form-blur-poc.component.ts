import { registerWebComponents } from '@domg-wc/common';
import { vlGridStyles, vlLegacyStyles } from '@domg-wc/styles';
import { VlButtonComponent } from '@domg-wc/components/atom';
import {
    SelectOption,
    VlCheckboxComponent,
    VlDatepickerComponent,
    VlFormLabelComponent,
    VlFormMessageComponent,
    VlInputFieldComponent,
    VlSelectComponent,
} from '@domg-wc/components/form';
import { css, CSSResult, html, LitElement, PropertyDeclarations, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * Showcase for the `blur-validation` attribute across multiple form controls.
 * Two side-by-side forms: left is default (submit-only), right has blur-validation on.
 * Each set has input-field, select, datepicker and checkbox, all required.
 */
@customElement('form-blur-poc')
export class FormBlurPocComponent extends LitElement {
    private defaultResult = '';
    private blurResult = '';

    private readonly landOptions: SelectOption[] = [
        { label: 'Selecteer...', value: '' },
        { label: 'België', value: 'be' },
        { label: 'Nederland', value: 'nl' },
        { label: 'Frankrijk', value: 'fr' },
    ];

    static {
        registerWebComponents([
            VlFormLabelComponent,
            VlFormMessageComponent,
            VlInputFieldComponent,
            VlSelectComponent,
            VlDatepickerComponent,
            VlCheckboxComponent,
            VlButtonComponent,
        ]);
    }

    static get properties(): PropertyDeclarations {
        return {
            defaultResult: { type: String, state: true },
            blurResult: { type: String, state: true },
        };
    }

    static get styles(): (CSSResult | CSSResult[])[] {
        return [
            vlLegacyStyles,
            vlGridStyles,
            css`
                :host {
                    display: block;
                    padding: 2rem;
                    font-family: 'Flanders Art Sans', sans-serif;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .poc-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                    margin-top: 2rem;
                    align-items: start;
                }
                .poc-col {
                    border: 1px solid #cbd2da;
                    padding: 1.5rem;
                    border-radius: 4px;
                    background: #fafbfc;
                }
                .poc-col.with-attr {
                    border-color: #05c;
                    background: #eef4fb;
                }
                .poc-col h3 {
                    margin: 0 0 0.5rem;
                    font-size: 1.6rem;
                }
                .poc-col p.desc {
                    font-size: 1.3rem;
                    color: #4a4a4a;
                    margin: 0 0 1.5rem;
                }
                .poc-actions {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1.5rem;
                }
                .poc-result {
                    margin-top: 1rem;
                    font-size: 1.3rem;
                    color: #555;
                    min-height: 1.6rem;
                }
                code {
                    background: #e6e9ec;
                    padding: 0.1rem 0.4rem;
                    border-radius: 3px;
                    font-size: 0.9em;
                }
            `,
        ];
    }

    private handleSubmit(e: Event, target: 'default' | 'blur'): void {
        // Native constraint validation blocks submit on invalid forms (browser fires
        // 'invalid' events which FormControl handles). So this handler only runs on valid forms.
        e.preventDefault();
        const result = '✓ geldig, verstuurd';
        if (target === 'default') {
            this.defaultResult = result;
        } else {
            this.blurResult = result;
        }
    }

    private handleReset(target: 'default' | 'blur'): void {
        if (target === 'default') {
            this.defaultResult = '';
        } else {
            this.blurResult = '';
        }
    }

    /** `p` is an id prefix so both forms have unique ids/for couples. `blur` toggles the attribute on every control. */
    private renderControls(p: string, blur: boolean): TemplateResult {
        return html`
            <vl-form-label for="${p}-naam" label="Voornaam *" block></vl-form-label>
            <vl-input-field
                id="${p}-naam"
                name="naam"
                block
                required
                min-length="3"
                pattern="^[a-zA-Z]+$"
                ?blur-validation=${blur}
            ></vl-input-field>
            <vl-form-message for="${p}-naam" state="valueMissing">Gelieve een voornaam in te vullen.</vl-form-message>
            <vl-form-message for="${p}-naam" state="tooShort">Minimum 3 karakters.</vl-form-message>
            <vl-form-message for="${p}-naam" state="patternMismatch">Enkel letters toegestaan.</vl-form-message>

            <vl-form-label for="${p}-land" label="Land *" block></vl-form-label>
            <vl-select
                id="${p}-land"
                name="land"
                block
                required
                .options=${this.landOptions}
                ?blur-validation=${blur}
            ></vl-select>
            <vl-form-message for="${p}-land" state="valueMissing">Gelieve een land te kiezen.</vl-form-message>

            <vl-form-label for="${p}-datum" label="Geboortedatum *" block></vl-form-label>
            <vl-datepicker id="${p}-datum" name="datum" block required ?blur-validation=${blur}></vl-datepicker>
            <vl-form-message for="${p}-datum" state="valueMissing">Gelieve een datum in te vullen.</vl-form-message>

            <vl-checkbox id="${p}-akkoord" name="akkoord" required ?blur-validation=${blur}>
                Ik ga akkoord *
            </vl-checkbox>
            <vl-form-message for="${p}-akkoord" state="valueMissing">Gelieve te bevestigen.</vl-form-message>
        `;
    }

    render(): TemplateResult {
        return html`
            <h1>POC: <code>blur-validation</code> attribuut</h1>
            <p>
                Twee identieke form-sets (vl-input-field, vl-select, vl-datepicker, vl-checkbox, allen
                <strong>required</strong>), elk in een eigen form met eigen submit/reset. Enkel de rechtse set
                heeft <code>blur-validation</code> aan, zodat je het verschil per control-type kan vergelijken.
            </p>
            <p>
                Probeer per control: (1) interageer en verlaat zonder geldige waarde; (2) corrigeer en kijk wanneer
                de fout verdwijnt; (3) klik Verstuur. Links verschijnt feedback pas op submit, rechts al op blur.
            </p>
            <div class="poc-grid">
                <form class="poc-col" @submit=${(e: Event) => this.handleSubmit(e, 'default')} @reset=${() => this.handleReset('default')}>
                    <h3>Zonder attribute (default)</h3>
                    <p class="desc">Validatie pas op submit. Tijdens interactie / blur: geen feedback.</p>
                    ${this.renderControls('default', false)}
                    <div class="poc-actions">
                        <vl-button type="submit">Verstuur</vl-button>
                        <vl-button type="reset" secondary>Reset</vl-button>
                    </div>
                    <div class="poc-result">${this.defaultResult}</div>
                </form>

                <form class="poc-col with-attr" @submit=${(e: Event) => this.handleSubmit(e, 'blur')} @reset=${() => this.handleReset('blur')}>
                    <h3>Met <code>blur-validation</code></h3>
                    <p class="desc">
                        Op blur (na focus, ook zonder mutatie): toon fout. Daarna: live re-validate tot geldig. Submit blijft
                        autoritatief.
                    </p>
                    ${this.renderControls('blur', true)}
                    <div class="poc-actions">
                        <vl-button type="submit">Verstuur</vl-button>
                        <vl-button type="reset" secondary>Reset</vl-button>
                    </div>
                    <div class="poc-result">${this.blurResult}</div>
                </form>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'form-blur-poc': FormBlurPocComponent;
    }
}
