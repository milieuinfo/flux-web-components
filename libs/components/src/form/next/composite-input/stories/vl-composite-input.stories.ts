import { registerWebComponents } from '@domg-wc/common';
import {
    VlInputFieldComponent,
    VlFormMessageComponent,
    VlSelectComponent,
    VlDatepickerComponent,
} from '@domg-wc/components/form';
import { CompositeValues } from '@domg-wc/components/form/next';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { VlCompositeInputComponent } from '../vl-composite-input.component';
import { compositeInputArgs, compositeInputArgTypes, CompositeInputArgs } from './vl-composite-input.stories-arg';
import compositeInputDoc from './vl-composite-input.stories-doc.mdx';

export default {
    id: 'components-form-next-composite-input',
    title: 'Components - Form/next/composite-input',
    tags: ['autodocs'],
    args: compositeInputArgs,
    argTypes: compositeInputArgTypes,
    parameters: {
        docs: {
            page: compositeInputDoc,
        },
    },
} as Meta<typeof compositeInputArgs>;

registerWebComponents([
    VlCompositeInputComponent,
    VlInputFieldComponent,
    VlFormMessageComponent,
    VlSelectComponent,
    VlDatepickerComponent,
]);

export const CompositeInputDefault = story(
    compositeInputArgs,
    ({ id, name, label, required, disabled, error, success, firstSlot, secondSlot, onVlChange }: CompositeInputArgs) =>
        html`
            <form @submit=${(e: SubmitEvent) => e.preventDefault()}>
                <vl-composite-input-next
                    id="${ifDefined(id || undefined)}"
                    name="${ifDefined(name || undefined)}"
                    label="${ifDefined(label || undefined)}"
                    ?required=${required}
                    ?disabled=${disabled}
                    ?error=${error}
                    ?success=${success}
                    @vl-change=${onVlChange}
                >
                    ${unsafeHTML(firstSlot)}${unsafeHTML(secondSlot)}
                </vl-composite-input-next>
                <vl-form-message for="${ifDefined(id || undefined)}" state="valueMissing">
                    Beide velden zijn verplicht.
                </vl-form-message>
                <vl-form-message for="${ifDefined(id || undefined)}" state="rangeUnderflow">
                    Een van de waarden ligt onder het minimum.
                </vl-form-message>
                <vl-form-message for="${ifDefined(id || undefined)}" state="rangeOverflow">
                    Een van de waarden ligt boven het maximum.
                </vl-form-message>
                <br />
                <button type="submit" is="vl-button">Verzenden</button>
            </form>
        `
);
CompositeInputDefault.storyName = 'vl-composite-input-next - default';

export const CompositeInputCustomValidator = story(
    compositeInputArgs,
    ({ onVlChange }: CompositeInputArgs) => html`
        <form @submit=${(e: SubmitEvent) => e.preventDefault()}>
            <vl-composite-input-next
                id="geo"
                name="geo"
                label="Coördinaten (lon, lat)"
                required
                .customValidator=${({ first, second }: CompositeValues) => {
                    const lon = parseFloat(first);
                    const lat = parseFloat(second);
                    return lon < 2.5 || lon > 6.5 || lat < 49.5 || lat > 51.6
                        ? `(lon=${first}, lat=${second}) ligt buiten België`
                        : null;
                }}
                @vl-change=${onVlChange}
            >
                <vl-input-field slot="first" label="Longitude" type="number" min="-180" max="180"></vl-input-field>
                <vl-input-field slot="second" label="Latitude" type="number" min="-90" max="90"></vl-input-field>
            </vl-composite-input-next>
            <vl-form-message for="geo" state="valueMissing"> Beide velden zijn verplicht. </vl-form-message>
            <vl-form-message for="geo" state="customError"></vl-form-message>
            <br />
            <button type="submit" is="vl-button">Verzenden</button>
        </form>
    `
);
CompositeInputCustomValidator.storyName = 'vl-composite-input-next - custom validator (België)';

export const CompositeInputDateRange = story(
    compositeInputArgs,
    ({ onVlChange }: CompositeInputArgs) => html`
        <form @submit=${(e: SubmitEvent) => e.preventDefault()}>
            <vl-composite-input-next
                id="range"
                name="range"
                label="Periode"
                required
                .customValidator=${({ first, second }: CompositeValues) => {
                    const from = Date.parse(first);
                    const to = Date.parse(second);
                    if (Number.isNaN(from) || Number.isNaN(to)) return null;
                    return from > to ? `Begindatum (${first}) ligt na einddatum (${second}).` : null;
                }}
                @vl-change=${onVlChange}
            >
                <vl-datepicker slot="first" label="Begindatum" type="date" format="d-m-Y"></vl-datepicker>
                <vl-datepicker slot="second" label="Einddatum" type="date" format="d-m-Y"></vl-datepicker>
            </vl-composite-input-next>
            <vl-form-message for="range" state="valueMissing"> Begin- en einddatum zijn verplicht. </vl-form-message>
            <vl-form-message for="range" state="customError"></vl-form-message>
            <br />
            <button type="submit" is="vl-button">Verzenden</button>
        </form>
    `
);
CompositeInputDateRange.storyName = 'vl-composite-input-next - datumbereik (vl-datepicker)';

export const CompositeInputSelects = story(
    compositeInputArgs,
    ({ onVlChange }: CompositeInputArgs) => {
        const countries = [
            { value: 'be', label: 'België' },
            { value: 'nl', label: 'Nederland' },
            { value: 'fr', label: 'Frankrijk' },
        ];
        const regions: Record<string, string[]> = {
            be: ['Antwerpen', 'Oost-Vlaanderen', 'West-Vlaanderen', 'Limburg', 'Vlaams-Brabant'],
            nl: ['Noord-Holland', 'Zuid-Holland', 'Utrecht', 'Gelderland'],
            fr: ['Île-de-France', 'Provence', 'Bretagne'],
        };
        const regionOptions = Object.values(regions)
            .flat()
            .map((r) => ({ value: r, label: r }));
        return html`
            <form @submit=${(e: SubmitEvent) => e.preventDefault()}>
                <vl-composite-input-next
                    id="loc"
                    name="loc"
                    label="Locatie"
                    required
                    .customValidator=${({ first, second }: CompositeValues) => {
                        const allowed = regions[first] || [];
                        return allowed.includes(second)
                            ? null
                            : `'${second}' is geen geldige regio voor '${first.toUpperCase()}'.`;
                    }}
                    @vl-change=${onVlChange}
                >
                    <vl-select slot="first" label="Land" placeholder="Kies een land" .options=${countries}></vl-select>
                    <vl-select
                        slot="second"
                        label="Regio"
                        placeholder="Kies een regio"
                        .options=${regionOptions}
                    ></vl-select>
                </vl-composite-input-next>
                <vl-form-message for="loc" state="valueMissing"> Land en regio zijn verplicht. </vl-form-message>
                <vl-form-message for="loc" state="customError"></vl-form-message>
                <br />
                <button type="submit" is="vl-button">Verzenden</button>
            </form>
        `;
    }
);
CompositeInputSelects.storyName = 'vl-composite-input-next - afhankelijke selects (vl-select)';

export const CompositeInputMixed = story(
    compositeInputArgs,
    ({ onVlChange }: CompositeInputArgs) => {
        const currencies = [
            { value: 'EUR', label: 'EUR' },
            { value: 'USD', label: 'USD' },
            { value: 'GBP', label: 'GBP' },
        ];
        const minByCurrency: Record<string, number> = { EUR: 1, USD: 1, GBP: 1 };
        const maxByCurrency: Record<string, number> = { EUR: 10000, USD: 10000, GBP: 8000 };
        return html`
            <form @submit=${(e: SubmitEvent) => e.preventDefault()}>
                <vl-composite-input-next
                    id="price"
                    name="price"
                    label="Prijs"
                    required
                    .customValidator=${({ first, second }: CompositeValues) => {
                        const amount = parseFloat(first);
                        if (Number.isNaN(amount)) return null;
                        const min = minByCurrency[second] ?? 0;
                        const max = maxByCurrency[second] ?? Infinity;
                        if (amount < min) return `Bedrag moet minstens ${min} ${second} zijn.`;
                        if (amount > max) return `Bedrag mag maximaal ${max} ${second} zijn.`;
                        return null;
                    }}
                    @vl-change=${onVlChange}
                >
                    <vl-input-field
                        slot="first"
                        label="Bedrag"
                        type="number"
                        min="0"
                        max="10000"
                        placeholder="0"
                    ></vl-input-field>
                    <vl-select
                        slot="second"
                        label="Munteenheid"
                        placeholder="Kies een munt"
                        .options=${currencies}
                    ></vl-select>
                </vl-composite-input-next>
                <vl-form-message for="price" state="valueMissing"> Bedrag en munt zijn verplicht. </vl-form-message>
                <vl-form-message for="price" state="customError"></vl-form-message>
                <br />
                <button type="submit" is="vl-button">Verzenden</button>
            </form>
        `;
    }
);
CompositeInputMixed.storyName = 'vl-composite-input-next - gemengd (input-field + vl-select)';
