import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
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

export const FieldsetDefault = story(fieldsetArgs, ({ border, horizontal, legendSlot, contentSlot }) => {
    return html`<vl-fieldset ?border=${border} ?horizontal=${horizontal}
        ><span slot="legend">${unsafeHTML(legendSlot)}</span>${unsafeHTML(contentSlot)}</vl-fieldset
    >`;
});
FieldsetDefault.storyName = 'vl-fieldset - default';
FieldsetDefault.args = {
    legendSlot: 'Volledige naam',
    contentSlot: `
        <div class="vl-group vl-group--collapse-xs">
            <vl-input-field name="voornaam" id="voornaam" placeholder="Voornaam" label="Voornaam"></vl-input-field>
            <vl-input-field name="naam" id="naam" placeholder="Naam" label="Naam"></vl-input-field>
        </div>
    `,
};

export const FieldsetWithBorder = story(fieldsetArgs, ({ border, horizontal, legendSlot, contentSlot }) => {
    return html`<vl-fieldset ?border=${border} ?horizontal=${horizontal}
        ><span slot="legend">${unsafeHTML(legendSlot)}</span>${unsafeHTML(contentSlot)}</vl-fieldset
    >`;
});
FieldsetWithBorder.storyName = 'vl-fieldset - with border';
FieldsetWithBorder.args = {
    border: true,
    legendSlot: 'Volledige naam',
    contentSlot: `
        <div class="vl-grid">
            <vl-form-label for="voornaam" class="vl-column vl-column--3 vl-column--s-12">Voornaam</vl-form-label>
            <vl-input-field name="voornaam" id="voornaam" placeholder="Voornaam" label="Voornaam" class="vl-column vl-column--9 vl-column--s-12"></vl-input-field>
            <vl-form-label for="naam" class="vl-column vl-column--3 vl-column--s-12">Naam</vl-form-label>
            <vl-input-field name="naam" id="naam" placeholder="Naam" label="Naam" class="vl-column vl-column--9 vl-column--s-12"></vl-input-field>
        </div>
    `,
};

export const FieldsetHorizontal = story(
    fieldsetArgs,
    ({ border, horizontal, legendSlot, legendClasses, contentSlot }) => {
        return html`<vl-fieldset ?border=${border} ?horizontal=${horizontal} legend-classes="${legendClasses}"
            ><span slot="legend">${unsafeHTML(legendSlot)}</span>${unsafeHTML(contentSlot)}</vl-fieldset
        >`;
    }
);
FieldsetHorizontal.storyName = 'vl-fieldset - horizontal';
FieldsetHorizontal.args = {
    horizontal: true,
    legendSlot: 'Volledige naam',
    legendClasses: 'vl-column--6',
    contentSlot: `
        <div class="vl-column vl-column--6 vl-column--s-12 vl-group vl-group--collapse-xs">
            <vl-input-field name="voornaam" id="voornaam" placeholder="Voornaam" label="Voornaam"></vl-input-field>
            <vl-input-field name="naam" id="naam" placeholder="Naam" label="Naam"></vl-input-field>
        </div>
    `,
};  
