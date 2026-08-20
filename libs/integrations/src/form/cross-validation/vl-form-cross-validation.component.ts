import { registerWebComponents, webComponent } from '@domg-wc/common';
import { vlGridStyles, vlLegacyStyles } from '@domg-wc/styles';
import { VlButtonComponent } from '@domg-wc/components/atom';
import {
    parseFormData,
    VlFormMessageComponent,
    VlFormLabelComponent,
    VlInputFieldComponent,
    VlSelectComponent,
    type SelectOption,
    CrossValidationMixin,
    type ValidatorWithDeps,
} from '@domg-wc/components/form';
import { css, CSSResult, html, LitElement, PropertyDeclarations } from 'lit';

@webComponent('vl-input-field-with-cross-validator')
export class VlInputFieldWithCrossValidatorComponent extends CrossValidationMixin(VlInputFieldComponent) {
    static override formControlValidators: ValidatorWithDeps[] = [
        ...VlInputFieldComponent.formControlValidators,
        {
            key: 'customError',
            message: `Bij de strikte procedure moet de code 'ABC-123' zijn.`,
            dependencySelectors: ['#procedure'],
            isValid(instance: HTMLElement, value: string): boolean {
                if (!value) return true;

                const form = (instance as HTMLElement & { form: HTMLFormElement | null }).form;
                if (!form) return true;

                const procedure = form.querySelector<HTMLElement & { value: string }>('#procedure')?.value;
                return procedure !== 'strikt' || value === 'ABC-123';
            },
        },
    ];
}

@webComponent('vl-form-cross-validation')
export class VlFormCrossValidationComponent extends LitElement {
    private formData: { [key: string]: FormDataEntryValue[] | File | string } | null = null;

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

                pre {
                    margin-top: 1rem;
                    padding: 0.75rem;
                    background: #f5f5f5;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 0.875rem;
                }
            `,
        ];
    }

    static override get properties(): PropertyDeclarations {
        return {
            formData: { state: true },
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
            ${this.formData ? html`<pre>${JSON.stringify(this.formData, null, 2)}</pre>` : ''}
        `;
    }

    private onSubmit(e: Event) {
        e.preventDefault();
        this.formData = parseFormData(e.target as HTMLFormElement);
    }

    private onReset() {
        this.formData = null;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-input-field-with-cross-validator': VlInputFieldWithCrossValidatorComponent;
        'vl-form-cross-validation': VlFormCrossValidationComponent;
    }
}
