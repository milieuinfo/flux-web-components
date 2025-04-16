import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { CascaderItemArgs, cascaderItemArgs, cascaderItemArgTypes } from './vl-cascader-item.stories-arg';
import '../vl-cascader.component';

export default {
    id: 'components-cascader-cascader-item',
    title: 'Components/cascader/cascader-item',
    tags: ['autodocs'],
    args: cascaderItemArgs,
    argTypes: cascaderItemArgTypes,
} as Meta<CascaderItemArgs>;

export const CascaderItemSlots = story(cascaderItemArgs, ({ annotation, contentSlot, label, labelSlot }) => {
    return html`
        <vl-cascader>
            <p slot="home">Vlaanderen</p>
            <vl-breadcrumb slot="breadcrumb-placeholder">
                <vl-breadcrumb-item>Vlaanderen</vl-breadcrumb-item>
            </vl-breadcrumb>
            <vl-cascader-item label=${label} annotation=${annotation}>
                ${unsafeHTML(labelSlot)} ${unsafeHTML(contentSlot)}
                <vl-cascader-item label="Gemeente">
                    <vl-cascader-item label="Stad"></vl-cascader-item>
                </vl-cascader-item>
            </vl-cascader-item>
        </vl-cascader>
    `;
});
CascaderItemSlots.storyName = 'vl-cascader-item - slots';
CascaderItemSlots.args = {
    contentSlot:
        '<p slot="content"> Het is de meest westelijk gelegen provincie van Vlaanderen en België en is de enige Belgische provincie die aan de Noordzee ligt. De provincie heeft een oppervlakte van 3.197 km² en telt ruim 1,2 miljoen inwoners. De hoofdstad van West-Vlaanderen is Brugge. </p>',
    label: 'West-Vlaanderen',
    labelSlot: `<vl-title type="h5" underline="" alt="" no-space-bottom="" slot="label">Provincie: West-Vlaanderen</vl-title>`,
};
