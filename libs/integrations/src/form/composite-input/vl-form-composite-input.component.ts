import { registerWebComponents, webComponent } from '@domg-wc/common';
import { vlGridStyles, vlLegacyStyles } from '@domg-wc/styles';
import { VlButtonComponent } from '@domg-wc/components/atom';
import { VlFormMessageComponent, VlFormLabelComponent, VlInputFieldComponent } from '@domg-wc/components/form';
import { css, CSSResult, html, LitElement } from 'lit';
import { VlCompositeInputComponent } from './vl-composite-input.component';
import { CompositeValues } from './validators';

const inBelgium = ({ first, second }: CompositeValues): string | null => {
    const lon = parseFloat(first);
    const lat = parseFloat(second);
    if (lon < 2.5 || lon > 6.5 || lat < 49.5 || lat > 51.6) {
        return `(lon=${first}, lat=${second}) ligt buiten België`;
    }
    return null;
};

@webComponent('vl-form-composite-input')
export class VlFormCompositeInputComponent extends LitElement {
    static {
        registerWebComponents([
            VlCompositeInputComponent,
            VlInputFieldComponent,
            VlFormLabelComponent,
            VlFormMessageComponent,
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
                        <vl-form-label for="coordinaten" label="Coördinaten (lon, lat) *" block></vl-form-label>
                    </div>
                    <div class="vl-column vl-column--8">
                        <vl-composite-input
                            id="coordinaten"
                            name="coordinaten"
                            label="Coördinaten (lon, lat)"
                            required
                            .customValidator=${inBelgium}
                        >
                            <vl-input-field
                                slot="first"
                                label="Longitude"
                                type="number"
                                min="-180"
                                max="180"
                            ></vl-input-field>
                            <vl-input-field
                                slot="second"
                                label="Latitude"
                                type="number"
                                min="-90"
                                max="90"
                            ></vl-input-field>
                        </vl-composite-input>
                        <vl-form-message for="coordinaten" state="valueMissing"
                            >Zowel longitude als latitude zijn verplicht.</vl-form-message
                        >
                        <vl-form-message for="coordinaten" state="rangeUnderflow"
                            >Een coördinaat ligt onder het geldige bereik.</vl-form-message
                        >
                        <vl-form-message for="coordinaten" state="rangeOverflow"
                            >Een coördinaat ligt boven het geldige bereik.</vl-form-message
                        >
                        <vl-form-message for="coordinaten" state="customError"></vl-form-message>
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

    private onSubmit(event: Event) {
        event.preventDefault();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-form-composite-input': VlFormCompositeInputComponent;
    }
}
