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
import { css, CSSResult, html, LitElement, PropertyDeclarations } from 'lit';

@webComponent('vl-form-cross-validation-conditional')
export class VlFormCrossValidationConditionalComponent extends LitElement {
    private reden = '';

    static {
        registerWebComponents([
            VlInputFieldComponent,
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
            reden: { type: String, state: true },
        };
    }

    private redenOpties: SelectOption[] = [
        { label: 'Verlenging', value: 'verlenging' },
        { label: 'Andere', value: 'andere' },
    ];

    private get verduidelijkingVerplicht(): boolean {
        return this.reden === 'andere';
    }

    override render() {
        return html`
            <form class="vl-form" @submit=${this.onSubmit} @reset=${this.onReset} @vl-change=${this.onChange}>
                <div class="vl-grid">
                    <div class="vl-column vl-column--4">
                        <vl-form-label for="reden" label="Reden aanvraag *" block></vl-form-label>
                    </div>
                    <div class="vl-column vl-column--8">
                        <vl-select
                            id="reden"
                            name="reden"
                            block
                            required
                            placeholder="Kies een reden"
                            .options=${this.redenOpties}
                        ></vl-select>
                        <vl-form-message for="reden" state="valueMissing">Gelieve een reden te kiezen.</vl-form-message>
                    </div>
                    <div class="vl-column vl-column--4">
                        <vl-form-label
                            for="verduidelijking"
                            label=${this.verduidelijkingVerplicht ? 'Verduidelijking *' : 'Verduidelijking'}
                            block
                        ></vl-form-label>
                    </div>
                    <div class="vl-column vl-column--8">
                        <vl-input-field
                            id="verduidelijking"
                            name="verduidelijking"
                            block
                            ?required=${this.verduidelijkingVerplicht}
                        ></vl-input-field>
                        <vl-form-message for="verduidelijking" state="valueMissing"
                            >Gelieve de reden te verduidelijken.</vl-form-message
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

    private onReset() {
        this.reden = '';
    }

    private onChange() {
        this.reden = this.shadowRoot?.querySelector<HTMLElement & { value: string }>('#reden')?.value ?? '';
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-form-cross-validation-conditional': VlFormCrossValidationConditionalComponent;
    }
}
