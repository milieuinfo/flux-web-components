import { registerWebComponents, webComponent } from '@domg-wc/common';
import { vlGridStyles, vlLegacyStyles } from '@domg-wc/styles';
import { VlButtonComponent } from '@domg-wc/components/atom';
import { VlErrorMessageComponent, VlFormLabelComponent, VlInputFieldComponent } from '@domg-wc/components/form';
import { Validator } from '@open-wc/form-control';
import { css, CSSResult, html, LitElement, PropertyDeclarations } from 'lit';

const fooValidator: Validator = {
    key: 'customError',
    message: `Value does not equal 'foo'`,
    isValid(_instance: HTMLElement, value: string): boolean {
        if (!value) {
            return true;
        }

        if (value !== 'foo') {
            return false;
        }

        return true;
    },
};

@webComponent('vl-input-field-with-foo-validator')
export class VlInputFieldWithFooValidatorComponent extends VlInputFieldComponent {
    static override formControlValidators = [...VlInputFieldComponent.formControlValidators, fooValidator];
}

@webComponent('vl-form-custom-validation')
export class VlFormCustomValidationComponent extends LitElement {
    private success = false;

    static {
        registerWebComponents([
            VlInputFieldWithFooValidatorComponent,
            VlFormLabelComponent,
            VlErrorMessageComponent,
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

    override render() {
        return html`
            <form class="vl-form" @submit=${this.onSubmit} @reset=${this.onReset}>
                <div class="vl-grid">
                    <div class="vl-column vl-column--4">
                        <vl-form-label for="waarde" label="Waarde *" block></vl-form-label>
                    </div>
                    <div class="vl-column vl-column--8">
                        <vl-input-field-with-foo-validator
                            id="waarde"
                            name="waarde"
                            block
                            required
                            ?success=${this.success}
                            @invalid=${() => {
                                this.success = false;
                            }}
                        ></vl-input-field-with-foo-validator>
                        <vl-error-message for="waarde" state="valueMissing"
                            >Gelieve een waarde in te vullen.</vl-error-message
                        >
                        <vl-error-message for="waarde" state="customError"
                            >Gelieve 'foo' als waarde in te vullen.</vl-error-message
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
        'vl-input-field-with-foo-validator': VlInputFieldWithFooValidatorComponent;
        'vl-form-custom-validation': VlFormCustomValidationComponent;
    }
}
