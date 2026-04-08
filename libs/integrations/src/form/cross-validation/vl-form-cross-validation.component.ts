import { registerWebComponents, webComponent } from '@domg-wc/common';
import { vlGridStyles, vlLegacyStyles } from '@domg-wc/styles';
import { VlButtonComponent } from '@domg-wc/components/atom';
import {
    VlFormMessageComponent,
    VlFormLabelComponent,
    VlInputFieldComponent,
    VlSelectComponent,
    type SelectOption,
} from '@domg-wc/components/form';
import { Validator } from '@open-wc/form-control';
import { css, CSSResult, html, LitElement, PropertyDeclarations } from 'lit';

/**
 * Cross-field validator: valideert het code-veld afhankelijk van de waarde van het procedure-veld.
 *
 * - Bij procedure "strikt" moet de code exact "ABC-123" zijn.
 * - Bij alle andere procedures is elke waarde geldig.
 */
const crossFieldValidator: Validator = {
    key: 'customError',
    message: `Bij de strikte procedure moet de code 'ABC-123' zijn.`,
    isValid(instance: HTMLElement, value: string): boolean {
        if (!value) {
            return true;
        }

        const form = (instance as HTMLElement & { form: HTMLFormElement | null }).form;
        if (!form) {
            return true;
        }

        const procedureSelect = form.querySelector<HTMLElement & { value: string }>('#procedure');
        const procedureValue = procedureSelect?.value;

        if (procedureValue !== 'strikt') {
            return true;
        }

        return value === 'ABC-123';
    },
};

@webComponent('vl-input-field-with-cross-validator')
export class VlInputFieldWithCrossValidatorComponent extends VlInputFieldComponent {
    static override formControlValidators = [...VlInputFieldComponent.formControlValidators, crossFieldValidator];
}

@webComponent('vl-form-cross-validation')
export class VlFormCrossValidationComponent extends LitElement {
    private success = false;

    static {
        registerWebComponents([
            VlInputFieldWithCrossValidatorComponent,
            VlFormLabelComponent,
            VlFormMessageComponent,
            VlSelectComponent,
            VlButtonComponent,
        ]);
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

    static override get properties(): PropertyDeclarations {
        return {
            success: { type: Boolean, state: true },
        };
    }

    private procedureOpties: SelectOption[] = [
        { label: 'Standaard', value: 'standaard' },
        { label: 'Strikt (vereist code "ABC-123")', value: 'strikt' },
    ];

    override render() {
        return html`
            <form class="vl-form" @submit=${this.onSubmit} @reset=${this.onReset}>
                <div class="vl-grid">
                    <div class="vl-column vl-column--4">
                        <vl-form-label for="procedure" label="Procedure *" block></vl-form-label>
                    </div>
                    <div class="vl-column vl-column--8">
                        <vl-select
                            id="procedure"
                            name="procedure"
                            block
                            required
                            placeholder="Kies een procedure"
                            .options=${this.procedureOpties}
                            @vl-change=${this.onProcedureChange}
                        ></vl-select>
                        <vl-form-message for="procedure" state="valueMissing"
                            >Gelieve een procedure te kiezen.</vl-form-message
                        >
                    </div>
                    <div class="vl-column vl-column--4">
                        <vl-form-label for="code" label="Code *" block></vl-form-label>
                    </div>
                    <div class="vl-column vl-column--8">
                        <vl-input-field-with-cross-validator
                            id="code"
                            name="code"
                            block
                            required
                            ?success=${this.success}
                            @invalid=${() => {
                                this.success = false;
                            }}
                        ></vl-input-field-with-cross-validator>
                        <vl-form-message for="code" state="valueMissing"
                            >Gelieve een code in te vullen.</vl-form-message
                        >
                        <vl-form-message for="code" state="customError"
                            >Bij de strikte procedure moet de code 'ABC-123' zijn.</vl-form-message
                        >
                    </div>
                    <div class="vl-column vl-column--8 vl-column--start-5">
                        <div class="form-buttons">
                            <vl-button type="submit">Verstuur</vl-button>
                            <vl-button type="reset" secondary>Reset</vl-button>
                        </div>
                    </div>
                </div>
            </form>
        `;
    }

    /**
     * Wanneer de procedure wijzigt, hervalideer het code-veld.
     * Dit is nodig omdat de validator van het code-veld afhankelijk is van de procedure-waarde.
     */
    private onProcedureChange() {
        const codeField =
            this.shadowRoot?.querySelector<VlInputFieldWithCrossValidatorComponent>('#code');
        if (codeField) {
            codeField.setValue(codeField.value);
        }
    }

    private onSubmit(e: Event) {
        e.preventDefault();
        this.success = true;
    }

    private onReset() {
        this.success = false;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-input-field-with-cross-validator': VlInputFieldWithCrossValidatorComponent;
        'vl-form-cross-validation': VlFormCrossValidationComponent;
    }
}
