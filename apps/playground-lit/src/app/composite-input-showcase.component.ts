import { registerWebComponents } from '@domg-wc/common';
import { VlFormMessageComponent, VlInputFieldComponent } from '@domg-wc/components/form';
import { VlCompositeInputComponent, CompositeValues } from '@domg-wc/integrations/form';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

const BELGIUM_LON = [2.5, 6.5] as const;
const BELGIUM_LAT = [49.5, 51.6] as const;

const inBelgium = ({ first, second }: CompositeValues): string | null => {
    const lon = parseFloat(first);
    const lat = parseFloat(second);
    if (lon < BELGIUM_LON[0] || lon > BELGIUM_LON[1] || lat < BELGIUM_LAT[0] || lat > BELGIUM_LAT[1]) {
        return `(lon=${first}, lat=${second}) ligt buiten België`;
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
            <section class="vl-section" style="padding: 2rem; display:flex; flex-direction:column; gap:2rem;">
                <div>
                    <h2 class="vl-h2">vl-composite-input: slotted, generiek (0-100)</h2>
                    <p>
                        Ouder bezit de aggregate validiteit + form-participatie. Kinderen dragen hun eigen
                        <code>min</code>/<code>max</code> via standaard HTML-attributen. Geen <code>name</code> op de
                        kinderen: de ouder dient in als <code>coords-first</code> + <code>coords-second</code>.
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

                        <vl-composite-input id="coords" name="coords" label="Coördinaten" required>
                            <vl-input-field slot="first" label="X" type="number" min="0" max="100"></vl-input-field>
                            <vl-input-field slot="second" label="Y" type="number" min="0" max="100"></vl-input-field>
                        </vl-composite-input>

                        <vl-form-message for="coords" state="valueMissing">
                            Beide velden zijn verplicht.
                        </vl-form-message>
                        <vl-form-message for="coords" state="rangeUnderflow">
                            Een van de waarden ligt onder het minimum (0).
                        </vl-form-message>
                        <vl-form-message for="coords" state="rangeOverflow">
                            Een van de waarden ligt boven het maximum (100).
                        </vl-form-message>

                        <div style="margin-top: 1rem; display:flex; gap:.5rem;">
                            <button type="submit" class="vl-button">Submit</button>
                            <button type="reset" class="vl-button vl-button--secondary">Reset</button>
                        </div>
                    </form>
                    ${this.renderEcho(this.submittedA)}
                </div>

                <div>
                    <h2 class="vl-h2">vl-composite-input: slotted, custom validator (België)</h2>
                    <p>
                        Zelfde ouder; kinderen schakelen over naar lon/lat. <code>.customValidator</code> op de ouder
                        geeft een dynamische foutboodschap wanneer het punt buiten België valt. Probeer
                        <code>lon=4.35, lat=50.85</code> (Brussel): geldig. Daarna <code>lon=7.5, lat=48</code>.
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

                        <vl-composite-input
                            id="geo"
                            name="geo"
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

                        <vl-form-message for="geo" state="valueMissing">
                            Zowel longitude als latitude zijn verplicht.
                        </vl-form-message>
                        <vl-form-message for="geo" state="rangeUnderflow">
                            Coördinaat ligt onder het geldige lon/lat-bereik.
                        </vl-form-message>
                        <vl-form-message for="geo" state="rangeOverflow">
                            Coördinaat ligt boven het geldige lon/lat-bereik.
                        </vl-form-message>
                        <vl-form-message for="geo" state="customError"></vl-form-message>

                        <div style="margin-top: 1rem; display:flex; gap:.5rem;">
                            <button type="submit" class="vl-button">Submit</button>
                            <button type="reset" class="vl-button vl-button--secondary">Reset</button>
                        </div>
                    </form>
                    ${this.renderEcho(this.submittedB)}
                </div>
            </section>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'composite-input-showcase': CompositeInputShowcase;
    }
}
