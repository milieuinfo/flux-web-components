import { registerWebComponents, webComponent } from '@domg-wc/common';
import { vlGridStyles, vlLegacyStyles } from '@domg-wc/styles';
import { VlButtonComponent, VlTextComponent } from '@domg-wc/components/atom';
import {
    parseFormData,
    VlFormMessageComponent,
    VlFormLabelComponent,
    VlInputFieldComponent,
    type CompositeValues,
} from '@domg-wc/components/form';
import { CompositeInputComponent } from './vl-composite-input.component';
import { css, CSSResult, html, LitElement, PropertyDeclarations } from 'lit';

// Validator voor het samengestelde veld: krijgt per `name` van elk kind de waarde, als tekst.
// Geef een string terug om af te keuren, die tekst wordt de foutmelding; geef null terug als alles in orde is.
// Hij loopt pas wanneer alle velden ingevuld zijn: onvolledige invoer handelt `required` af.
const inBelgium = ({ 'coordinaten-lon': lon, 'coordinaten-lat': lat }: CompositeValues): string | null => {
    const longitude = parseFloat(lon);
    const latitude = parseFloat(lat);
    if (longitude < 2.5 || longitude > 6.5 || latitude < 49.5 || latitude > 51.6) {
        return `(lon=${lon}, lat=${lat}) ligt buiten België`;
    }
    return null;
};

@webComponent('vl-form-composite-input')
export class VlFormCompositeInputComponent extends LitElement {
    private parsedFormData: Record<string, FormDataEntryValue> | null = null;

    static {
        registerWebComponents([
            CompositeInputComponent,
            VlInputFieldComponent,
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
                        <vl-form-label for="coordinaten" label="Coördinaten (lon, lat) *" block></vl-form-label>
                    </div>
                    <div class="vl-column vl-column--8">
                        <!-- De composite heeft geen name: ze dient zelf geen waarde in, ze valideert de velden samen.
                             Haar id gebruik je in vl-form-label[for] en in de meldingen voor het samengestelde veld.
                             required betekent hier dat alle velden ingevuld moeten zijn. -->
                        <vl-composite-input
                            id="coordinaten"
                            label="Coördinaten (lon, lat)"
                            required
                            .customValidator=${inBelgium}
                        >
                            <!-- Een veld is een direct kind met een value en een name. Die name is de sleutel in de
                                 FormData en in de validator hierboven; het id gebruik je enkel om er een eigen
                                 vl-form-message aan te koppelen. Veldspecifieke constraints (hier min/max) zet je
                                 op het kind, niet op de composite. -->
                            <vl-input-field
                                id="lon"
                                name="coordinaten-lon"
                                label="Longitude"
                                type="number"
                                min="-180"
                                max="180"
                            ></vl-input-field>
                            <vl-input-field
                                id="lat"
                                name="coordinaten-lat"
                                label="Latitude"
                                type="number"
                                min="-90"
                                max="90"
                            ></vl-input-field>
                        </vl-composite-input>
                        <vl-text annotation small
                            >Vul de longitude en latitude in graden in (bv. Brussel: 4,35 en 50,85). Enkel punten
                            binnen België zijn geldig.</vl-text
                        >
                        <!-- De meldingen voor het samengestelde veld hangen aan de composite. Laat je ze leeg, dan
                             vult de composite ze zelf in: valueMissing met een opsomming van de nog lege velden (op
                             basis van hun label), customError met de string uit de validator. Eigen tekst wint. -->
                        <vl-form-message for="coordinaten" state="valueMissing"></vl-form-message>
                        <vl-form-message for="coordinaten" state="customError"></vl-form-message>
                        <!-- Een melding per veld verwijst naar het id van dat kind, met eigen tekst per staat. -->
                        <vl-form-message for="lon" state="rangeUnderflow"
                            >Longitude moet minstens -180 zijn.</vl-form-message
                        >
                        <vl-form-message for="lon" state="rangeOverflow"
                            >Longitude mag maximaal 180 zijn.</vl-form-message
                        >
                        <vl-form-message for="lat" state="rangeUnderflow"
                            >Latitude moet minstens -90 zijn.</vl-form-message
                        >
                        <vl-form-message for="lat" state="rangeOverflow"
                            >Latitude mag maximaal 90 zijn.</vl-form-message
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

    // Bij een gewone submit valideert de browser eerst, dus hier is de invoer zeker volledig. Lees je elders zelf
    // new FormData(form) uit, controleer dan eerst form.checkValidity(): de composite houdt onvolledige invoer tegen
    // met validatie, ze laat de waarden wel in de FormData staan.
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
        'vl-form-composite-input': VlFormCompositeInputComponent;
    }
}
