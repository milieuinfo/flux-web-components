import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { VlFieldsetComponent } from '../vl-fieldset.component';
import { fieldsetArgs, fieldsetArgTypes } from './vl-fieldset.stories-arg';
import fieldsetDocs from './vl-fieldset.stories-doc.mdx';

registerWebComponents([VlFieldsetComponent]);

export default {
    id: 'components-form-fieldset',
    title: 'Components - Form/fieldset',
    tags: ['autodocs'],
    args: fieldsetArgs,
    argTypes: fieldsetArgTypes,
    parameters: {
        docs: {
            page: fieldsetDocs,
        },
    },
} as Meta<typeof fieldsetArgs>;

export const FieldsetDefault = story(fieldsetArgs, ({ border, horizontal, legend, defaultSlot }) => {
    return html`<vl-fieldset ?border=${border} ?horizontal=${horizontal} legend="${legend}">${unsafeHTML(defaultSlot)}</vl-fieldset>`;
});
FieldsetDefault.storyName = 'vl-fieldset - default';
FieldsetDefault.args = {
    border: false,
    horizontal: false,
    legend: 'Volledige naam',
    defaultSlot: `
        <div class="vl-group">
            <vl-input-field name="voornaam" id="voornaam" placeholder="Voornaam" label="Voornaam"></vl-input-field>
            <vl-input-field name="naam" id="naam" placeholder="Naam" label="Naam"></vl-input-field>
        </div>
    `,
};

export const FieldsetWithBorder = story(fieldsetArgs, ({ border, horizontal, legend, defaultSlot }) => {
    return html`<vl-fieldset ?border=${border} ?horizontal=${horizontal} legend="${legend}">${unsafeHTML(defaultSlot)}</vl-fieldset>`;
});
FieldsetWithBorder.storyName = 'vl-fieldset - with border';
FieldsetWithBorder.args = {
    border: true,
    horizontal: false,
    legend: 'Volledige naam',
    defaultSlot: `
        <div class="vl-grid">
            <vl-form-label for="voornaam" class="vl-column vl-column--3 vl-column--s-12">Voornaam</vl-form-label>
            <vl-input-field name="voornaam" id="voornaam" placeholder="Voornaam" label="Voornaam" class="vl-column vl-column--9 vl-column--s-12"></vl-input-field>
            <vl-form-label for="naam" class="vl-column vl-column--3 vl-column--s-12">Naam</vl-form-label>
            <vl-input-field name="naam" id="naam" placeholder="Naam" label="Naam" class="vl-column vl-column--9 vl-column--s-12"></vl-input-field>
        </div>
    `,
};

export const FieldsetHorizontal = story(fieldsetArgs, ({ border, horizontal, legend, legendClasses, defaultSlot }) => {
    return html`<vl-fieldset ?border=${border} ?horizontal=${horizontal} legend="${legend}" legend-classes="${legendClasses}">${unsafeHTML(defaultSlot)}</vl-fieldset>`;
});
FieldsetHorizontal.storyName = 'vl-fieldset - horizontal';
FieldsetHorizontal.args = {
    border: false,
    horizontal: true,
    legend: 'Volledige naam',
    legendClasses: 'vl-column--6',
    defaultSlot: `
        <div class="vl-column vl-column--6 vl-column--s-12 vl-group">
            <vl-input-field name="voornaam" id="voornaam" placeholder="Voornaam" label="Voornaam"></vl-input-field>
            <vl-input-field name="naam" id="naam" placeholder="Naam" label="Naam"></vl-input-field>
        </div>
    `,
};  
