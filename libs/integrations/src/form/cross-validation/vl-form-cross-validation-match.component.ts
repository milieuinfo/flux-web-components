import { registerWebComponents, webComponent } from '@domg-wc/common';
import { vlGridStyles, vlLegacyStyles } from '@domg-wc/styles';
import { VlButtonComponent } from '@domg-wc/components/atom';
import {
    VlFormMessageComponent,
    VlFormLabelComponent,
    VlInputFieldComponent,
    CrossValidationMixin,
    type ValidatorWithDeps,
} from '@domg-wc/components/form';
import { css, CSSResult, html, LitElement } from 'lit';

@webComponent('vl-input-field-with-match-validator')
export class VlInputFieldWithMatchValidatorComponent extends CrossValidationMixin(VlInputFieldComponent) {
    static override formControlValidators: ValidatorWithDeps[] = [
        ...VlInputFieldComponent.formControlValidators,
        {
            key: 'customError',
            message: 'De e-mailadressen komen niet overeen.',
            dependencySelectors: ['#email'],
            isValid(instance: HTMLElement, value: string): boolean {
                if (!value) return true;

                const form = (instance as HTMLElement & { form: HTMLFormElement | null }).form;
                if (!form) return true;

                const email = form.querySelector<HTMLElement & { value: string }>('#email')?.value;
                return value === email;
            },
        },
    ];
}

@webComponent('vl-form-cross-validation-match')
export class VlFormCrossValidationMatchComponent extends LitElement {
    static {
        registerWebComponents([
            VlInputFieldWithMatchValidatorComponent,
            VlFormLabelComponent,
            VlFormMessageComponent,
            VlInputFieldComponent,
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

    override render() {
        return html`
            <form class="vl-form" @submit=${this.onSubmit}>
                <div class="vl-grid">
                    <div class="vl-column vl-column--4">
                        <vl-form-label for="email" label="E-mailadres *" block></vl-form-label>
                    </div>
                    <div class="vl-column vl-column--8">
                        <vl-input-field id="email" name="email" block required></vl-input-field>
                        <vl-form-message for="email" state="valueMissing"
                            >Gelieve een e-mailadres in te vullen.</vl-form-message
                        >
                    </div>
                    <div class="vl-column vl-column--4">
                        <vl-form-label for="bevestig-email" label="Bevestig e-mailadres *" block></vl-form-label>
                    </div>
                    <div class="vl-column vl-column--8">
                        <vl-input-field-with-match-validator
                            id="bevestig-email"
                            name="bevestigEmail"
                            block
                            required
                        ></vl-input-field-with-match-validator>
                        <vl-form-message for="bevestig-email" state="valueMissing"
                            >Gelieve het e-mailadres te bevestigen.</vl-form-message
                        >
                        <vl-form-message for="bevestig-email" state="customError"
                            >De e-mailadressen komen niet overeen.</vl-form-message
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
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-input-field-with-match-validator': VlInputFieldWithMatchValidatorComponent;
        'vl-form-cross-validation-match': VlFormCrossValidationMatchComponent;
    }
}
