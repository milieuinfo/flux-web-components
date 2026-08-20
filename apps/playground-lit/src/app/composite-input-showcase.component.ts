import { registerWebComponents } from '@domg-wc/common';
import {
    VlFormMessageComponent,
    VlInputFieldComponent,
} from '@domg-wc/components/form';
import { VlCompositeInputComponent, type CompositeValues } from '@domg-wc/components/form/next';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

const BELGIUM_LON = [2.5, 6.5] as const;
const BELGIUM_LAT = [49.5, 51.6] as const;

const inBelgium = ({ 'geo-lon': lon, 'geo-lat': lat }: CompositeValues): string | null => {
    const longitude = parseFloat(lon);
    const latitude = parseFloat(lat);
    if (
        longitude < BELGIUM_LON[0] ||
        longitude > BELGIUM_LON[1] ||
        latitude < BELGIUM_LAT[0] ||
        latitude > BELGIUM_LAT[1]
    ) {
        return `(lon=${lon}, lat=${lat}) ligt buiten België`;
    }
    return null;
};

@customElement('composite-input-showcase')
export class CompositeInputShowcase extends LitElement {
    static {
        registerWebComponents([VlCompositeInputComponent, VlInputFieldComponent, VlFormMessageComponent]);
    }

    @state() private submittedA: Record<string, FormDataEntryValue> | null = null;
    @state() private submittedB: Record<string, FormDataEntryValue> | null = null;

    protected createRenderRoot() {
        return this;
    }

    private onSubmit = (which: 'A' | 'B') => (event: SubmitEvent) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const data: Record<string, FormDataEntryValue> = {};
        new FormData(form).forEach((v, k) => (data[k] = v));
        if (which === 'A') this.submittedA = data;
        else this.submittedB = data;
    };

    private onReset = (which: 'A' | 'B') => () => {
        if (which === 'A') this.submittedA = null;
        else this.submittedB = null;
    };

    private renderEcho(data: Record<string, FormDataEntryValue> | null) {
        if (!data) return '';
        return html`<pre style="margin-top:1rem;background:#f3f5f6;padding:.75rem;">
${JSON.stringify(data, null, 2)}</pre
        >`;
    }

    render() {
        return html`
            <div style="padding: 2rem; display:flex; flex-direction:column; gap:2rem;">
                <h1 class="vl-h1">Samengesteld invoerveld (vl-composite-input-next)</h1>
                <section aria-labelledby="showcase-a-title">
                    <h2 id="showcase-a-title" class="vl-h2">vl-composite-input-next: kind-name = sleutel (0-100)</h2>
                    <p>
                        De kinderen dienen zichzelf in via hun <code>name</code> (<code>coords-x</code> +
                        <code>coords-y</code>); de composite bezit geen waarde, ze valideert cross-veld en bewaakt
                        <code>required</code> over alle velden. Elk kind draagt een <code>name</code> (FormData- én
                        validator-sleutel) plus zijn eigen <code>min</code>/<code>max</code>; het <code>id</code> dient
                        enkel als <code>vl-form-message[for]</code>-doelwit. De composite heeft geen <code>name</code>,
                        enkel een <code>id</code>.
                    </p>

                    <form
                        @submit=${this.onSubmit('A')}
                        @reset=${this.onReset('A')}
                        style="padding:1.5rem;border:1px solid #cbd2da;border-radius:4px;display:flex;flex-direction:column;gap:.75rem;"
                    >
                        <vl-input-field id="label-a" name="label" label="Label" required></vl-input-field>
                        <vl-form-message for="label-a" state="valueMissing">
                            Label is verplicht.
                        </vl-form-message>

                        <vl-composite-input-next id="coords" label="Coördinaten" required>
                            <vl-input-field id="x" name="coords-x" label="X" type="number" min="0" max="100"></vl-input-field>
                            <vl-input-field id="y" name="coords-y" label="Y" type="number" min="0" max="100"></vl-input-field>
                        </vl-composite-input-next>

                        <vl-form-message for="coords" state="valueMissing">
                            Beide velden zijn verplicht.
                        </vl-form-message>
                        <vl-form-message for="x" state="rangeUnderflow">X moet minstens 0 zijn.</vl-form-message>
                        <vl-form-message for="x" state="rangeOverflow">X mag maximaal 100 zijn.</vl-form-message>
                        <vl-form-message for="y" state="rangeUnderflow">Y moet minstens 0 zijn.</vl-form-message>
                        <vl-form-message for="y" state="rangeOverflow">Y mag maximaal 100 zijn.</vl-form-message>

                        <div style="margin-top: 1rem; display:flex; gap:.5rem;">
                            <button type="submit" class="vl-button">Verstuur</button>
                            <button type="reset" class="vl-button vl-button--secondary">Reset</button>
                        </div>
                    </form>
                    ${this.renderEcho(this.submittedA)}
                </section>

                <section aria-labelledby="showcase-b-title">
                    <h2 id="showcase-b-title" class="vl-h2">vl-composite-input-next: custom validator (België)</h2>
                    <p>
                        Zelfde composite; de kinderen dienen zichzelf in als <code>geo-lon</code> + <code>geo-lat</code>
                        (via hun <code>name</code>). De <code>.customValidator</code> op de composite leest de waarden
                        per <code>name</code> (<code>geo-lon</code>, <code>geo-lat</code>) en geeft een dynamische
                        foutboodschap wanneer het punt buiten België valt. Probeer <code>lon=4.35, lat=50.85</code>
                        (Brussel): geldig. Daarna <code>lon=7.5, lat=48</code>.
                    </p>

                    <form
                        @submit=${this.onSubmit('B')}
                        @reset=${this.onReset('B')}
                        style="padding:1.5rem;border:1px solid #cbd2da;border-radius:4px;display:flex;flex-direction:column;gap:.75rem;"
                    >
                        <vl-input-field id="label-b" name="place-name" label="Plaatsnaam" required></vl-input-field>
                        <vl-form-message for="label-b" state="valueMissing">
                            Plaatsnaam is verplicht.
                        </vl-form-message>

                        <vl-composite-input-next
                            id="geo"
                            label="Coördinaten (lon, lat)"
                            required
                            .customValidator=${inBelgium}
                        >
                            <vl-input-field
                                id="lon"
                                name="geo-lon"
                                label="Longitude"
                                type="number"
                                min="-180"
                                max="180"
                            ></vl-input-field>
                            <vl-input-field
                                id="lat"
                                name="geo-lat"
                                label="Latitude"
                                type="number"
                                min="-90"
                                max="90"
                            ></vl-input-field>
                        </vl-composite-input-next>

                        <vl-form-message for="geo" state="valueMissing">
                            Zowel longitude als latitude zijn verplicht.
                        </vl-form-message>
                        <vl-form-message for="geo" state="customError"></vl-form-message>
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

                        <div style="margin-top: 1rem; display:flex; gap:.5rem;">
                            <button type="submit" class="vl-button">Verstuur</button>
                            <button type="reset" class="vl-button vl-button--secondary">Reset</button>
                        </div>
                    </form>
                    ${this.renderEcho(this.submittedB)}
                </section>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'composite-input-showcase': CompositeInputShowcase;
    }
}
