import { html } from 'lit-html';
import '../vl-description-data-item.component';
import '../vl-description-data.component';
import { descriptionDataArgs, descriptionDataArgTypes } from './vl-description-data.stories-arg';
import { Meta } from '@storybook/web-components-vite';

export default {
    id: 'components-block-description-data-description-data',
    title: 'Components - Block/description-data/description-data',
    tags: ['autodocs'],
    args: descriptionDataArgs,
    argTypes: descriptionDataArgTypes,
} as Meta<typeof descriptionDataArgs>;

export const descriptionDataDefault = ({
    bordered,
    size,
    mediumSize,
    smallSize,
    extraSmallSize,
}: typeof descriptionDataArgs) =>
    html`
        <vl-description-data
            ?bordered=${bordered}
            items-size=${size}
            items-medium-size=${mediumSize}
            items-small-size=${smallSize}
            items-extra-small-size=${extraSmallSize}
            data-cy="description-data"
        >
            <vl-description-data-item
                label="Uitgever"
                value="Kind en Gezin"
                data-cy="description-data-item-1"
            ></vl-description-data-item>
            <vl-description-data-item
                label="Publicatiedatum"
                value="Augustus 2018"
                data-cy="description-data-item-2"
            ></vl-description-data-item>
            <vl-description-data-item
                label="Publicatietype"
                value="Brochure"
                data-cy="description-data-item-3"
            ></vl-description-data-item>
            <vl-description-data-item
                label="Categorie"
                value="Kinderen en jongeren"
                data-cy="description-data-item-4"
            ></vl-description-data-item
        ></vl-description-data>
    `;
descriptionDataDefault.storyName = 'vl-description-data - default';
descriptionDataDefault.args = {
    size: 2,
    mediumSize: 3,
    smallSize: 6,
    extraSmallSize: 12,
};

export const descriptionDataWithSpanner = () => html`
    <vl-description-data items-size="3" items-small-size="6" items-extra-small-size="12">
        <vl-description-data-item label="Uitgever" value="Kind en Gezin"></vl-description-data-item>
        <vl-description-data-item label="Publicatiedatum" value="Augustus 2018"></vl-description-data-item>
        <vl-description-data-item label="Publicatietype" value="Brochure"></vl-description-data-item>
        <vl-description-data-item label="Categorie" value="Kinderen en jongeren"></vl-description-data-item>
        <vl-description-data-item
            items-size="12"
            label="Omschrijving"
            value="Een uitgebreide beschrijving van de publicatie die de volledige breedte inneemt."
        ></vl-description-data-item>
    </vl-description-data>
`;
descriptionDataWithSpanner.storyName = 'vl-description-data - with full-width item';
