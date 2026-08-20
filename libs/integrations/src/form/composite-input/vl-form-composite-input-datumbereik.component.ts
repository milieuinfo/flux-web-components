import { registerWebComponents, webComponent } from '@domg-wc/common';
import { vlGridStyles, vlLegacyStyles } from '@domg-wc/styles';
import { VlButtonComponent, VlTextComponent } from '@domg-wc/components/atom';
import {
    parseFormData,
    VlDatepickerComponent,
    VlFormLabelComponent,
    VlFormMessageComponent,
} from '@domg-wc/components/form';
import { VlCompositeInputComponent, type CompositeValues } from '@domg-wc/components/form/next';
import { css, CSSResult, html, LitElement, PropertyDeclarations } from 'lit';

// Elke datum is op zich geldig; enkel de volgorde kan fout zijn.
// De datepickers geven hun waarde als ISO-datum, dus Date.parse volstaat om ze te vergelijken.
const beginVoorEinde = ({ 'periode-begin': begin, 'periode-einde': einde }: CompositeValues): string | null => {
    const beginTijd = Date.parse(begin);
    const eindeTijd = Date.parse(einde);
    if (Number.isNaN(beginTijd) || Number.isNaN(eindeTijd)) return null;
    return beginTijd > eindeTijd ? 'De begindatum ligt na de einddatum.' : null;
};

@webComponent('vl-form-composite-input-datumbereik')
export class VlFormCompositeInputDatumbereikComponent extends LitElement {
    private parsedFormData: Record<string, FormDataEntryValue> | null = null;

    static {
        registerWebComponents([
            VlCompositeInputComponent,
            VlDatepickerComponent,
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
                        <vl-form-label for="periode" label="Periode *" block></vl-form-label>
                    </div>
                    <div class="vl-column vl-column--8">
                        <vl-composite-input-next
                            id="periode"
                            label="Periode"
                            required
                            .customValidator=${beginVoorEinde}
                        >
                            <vl-datepicker
                                id="begin"
                                name="periode-begin"
                                label="Begindatum"
                                type="date"
                                format="d-m-Y"
                                anchor-positioning
                            ></vl-datepicker>
                            <vl-datepicker
                                id="einde"
                                name="periode-einde"
                                label="Einddatum"
                                type="date"
                                format="d-m-Y"
                                anchor-positioning
                            ></vl-datepicker>
                        </vl-composite-input-next>
                        <vl-text annotation small
                            >Kies een begin- en einddatum (dd-mm-jjjj). De begindatum mag niet na de einddatum
                            liggen.</vl-text
                        >
                        <vl-form-message for="periode" state="valueMissing"
                            >Begin- en einddatum zijn verplicht.</vl-form-message
                        >
                        <vl-form-message for="periode" state="customError"></vl-form-message>
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
        'vl-form-composite-input-datumbereik': VlFormCompositeInputDatumbereikComponent;
    }
}
