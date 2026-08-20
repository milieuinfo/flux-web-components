import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { VlFormMessageComponent } from '../../../form-message';
import { VlInputFieldComponent } from '../../../input-field';
import { VlCompositeInputComponent } from '../vl-composite-input.component';
import { CompositeValues } from '../validators';
import { compositeInputArgs, compositeInputArgTypes } from './vl-composite-input.stories-arg';
import compositeInputDocs from './vl-composite-input.stories-doc.mdx';

registerWebComponents([VlCompositeInputComponent, VlInputFieldComponent, VlFormMessageComponent]);

const inBelgium = ({ 'coordinaten-lon': lon, 'coordinaten-lat': lat }: CompositeValues): string | null => {
    const longitude = parseFloat(lon);
    const latitude = parseFloat(lat);
    if (longitude < 2.5 || longitude > 6.5 || latitude < 49.5 || latitude > 51.6) {
        return `(lon=${lon}, lat=${lat}) ligt buiten België`;
    }
    return null;
};

export default {
    id: 'components-form-next-composite-input',
    title: 'Components - Form/next/composite-input',
    tags: ['autodocs'],
    args: compositeInputArgs,
    argTypes: compositeInputArgTypes,
    parameters: {
        docs: {
            page: compositeInputDocs,
        },
    },
} as Meta<typeof compositeInputArgs>;

export const CompositeInputDefault = story(
    compositeInputArgs,
    ({ id, label, required, disabled, success, defaultSlot }) => html`
        <form>
            <vl-composite-input
                id=${id}
                label=${label}
                ?required=${required}
                ?disabled=${disabled}
                ?success=${success}
                .customValidator=${inBelgium}
            >
                ${unsafeHTML(defaultSlot)}
            </vl-composite-input>
            <vl-form-message for=${id} state="valueMissing"></vl-form-message>
            <vl-form-message for=${id} state="customError"></vl-form-message>
            <button type="submit" class="vl-button">Verstuur</button>
        </form>
    `
);
CompositeInputDefault.storyName = 'vl-composite-input-next - default';
CompositeInputDefault.args = {
    id: 'coordinaten',
    label: 'Coördinaten (lon, lat)',
    required: true,
    defaultSlot: `
        <vl-input-field id="lon" name="coordinaten-lon" label="Longitude" type="number"></vl-input-field>
        <vl-input-field id="lat" name="coordinaten-lat" label="Latitude" type="number"></vl-input-field>
    `,
};
