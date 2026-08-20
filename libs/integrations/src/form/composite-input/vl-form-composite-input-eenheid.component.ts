import { registerWebComponents, webComponent } from '@domg-wc/common';
import { vlGridStyles, vlLegacyStyles } from '@domg-wc/styles';
import { VlButtonComponent, VlTextComponent } from '@domg-wc/components/atom';
import {
    parseFormData,
    SelectOption,
    VlFormLabelComponent,
    VlFormMessageComponent,
    VlInputFieldComponent,
    VlSelectComponent,
} from '@domg-wc/components/form';
import { VlCompositeInputComponent, type CompositeValues } from '@domg-wc/components/form/next';
import { css, CSSResult, html, LitElement, PropertyDeclarations } from 'lit';

const EENHEDEN: SelectOption[] = [
    { value: 'cm', label: 'centimeter (cm)' },
    { value: 'dm', label: 'decimeter (dm)' },
    { value: 'm', label: 'meter (m)' },
];

const METER_PER_EENHEID: Record<string, number> = { cm: 0.01, dm: 0.1, m: 1 };

const MIN_METER = 0.01;
const MAX_METER = 100;

// Het getal alleen kan je niet nakijken: 50 is pas een lengte samen met zijn eenheid.
// Daarom rekent deze validator beide waarden om naar meter en kijkt hij dan pas of ze binnen het bereik vallen.
const binnenBereik = ({ 'lengte-waarde': waarde, 'lengte-eenheid': eenheid }: CompositeValues): string | null => {
    const factor = METER_PER_EENHEID[eenheid];
    const getal = parseFloat(waarde);

    if (!factor || Number.isNaN(getal)) {
        return null;
    }

    const meter = getal * factor;

    if (meter < MIN_METER || meter > MAX_METER) {
        return `${waarde} ${eenheid} is ${meter.toFixed(2)} m; de lengte moet tussen ${MIN_METER} m en ${MAX_METER} m liggen.`;
    }

    return null;
};

@webComponent('vl-form-composite-input-eenheid')
export class VlFormCompositeInputEenheidComponent extends LitElement {
    private parsedFormData: Record<string, FormDataEntryValue> | null = null;

    static {
        registerWebComponents([
            VlCompositeInputComponent,
            VlInputFieldComponent,
            VlSelectComponent,
            VlFormLabelComponent,
            VlFormMessageComponent,
            VlButtonComponent,
            VlTextComponent,
        ]);
    }

    static override get properties(): PropertyDeclarations {
        return {
            parsedFormData: { type: Object, state: true },
        };
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
                    font-size: 1rem;
                }
            `,
        ];
    }

    override render() {
        return html`
            <form class="vl-form" @submit=${this.onSubmit} @reset=${this.onReset}>
                <div class="vl-grid">
                    <div class="vl-column vl-column--4">
                        <vl-form-label for="lengte" label="Lengte *" block></vl-form-label>
                    </div>
                    <div class="vl-column vl-column--8">
                        <vl-composite-input-next id="lengte" label="Lengte" required .customValidator=${binnenBereik}>
                            <vl-input-field
                                id="waarde"
                                name="lengte-waarde"
                                label="Waarde"
                                type="number"
                                min="0"
                            ></vl-input-field>
                            <vl-select
                                id="eenheid"
                                name="lengte-eenheid"
                                label="Eenheid"
                                placeholder="Kies een eenheid"
                                .options=${EENHEDEN}
                            ></vl-select>
                        </vl-composite-input-next>
                        <vl-text annotation small
                            >Het getal betekent niets zonder de eenheid: samen vormen ze één lengte. Enkel lengtes
                            tussen ${MIN_METER} m en ${MAX_METER} m zijn geldig, dus 5000 cm mag wel en 5000 m
                            niet.</vl-text
                        >
                        <vl-form-message for="lengte" state="valueMissing"
                            >Zowel de waarde als de eenheid zijn verplicht.</vl-form-message
                        >
                        <vl-form-message for="lengte" state="customError"></vl-form-message>
                        <vl-form-message for="waarde" state="rangeUnderflow"
                            >De waarde mag niet negatief zijn.</vl-form-message
                        >
                    </div>
                    <div class="vl-column vl-column--8 vl-column--start-5">
                        <div class="form-buttons">
                            <vl-button type="submit">Verstuur</vl-button>
                            <vl-button type="reset" secondary>Reset</vl-button>
                        </div>
                    </div>
                    ${this.parsedFormData
                        ? html`
                              <div class="vl-column vl-column--4">
                                  <vl-form-label class="vl-form__label">Formulier data</vl-form-label>
                              </div>
                              <div class="vl-column vl-column--8">
                                  <pre>${JSON.stringify(this.parsedFormData, null, 4)}</pre>
                              </div>
                          `
                        : ''}
                </div>
            </form>
        `;
    }

    private onSubmit(event: Event) {
        event.preventDefault();
        this.parsedFormData = parseFormData(event.target as HTMLFormElement) as Record<string, FormDataEntryValue>;
    }

    private onReset() {
        this.parsedFormData = null;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-form-composite-input-eenheid': VlFormCompositeInputEenheidComponent;
    }
}
