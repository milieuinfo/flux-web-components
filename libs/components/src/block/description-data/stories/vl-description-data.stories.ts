import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../vl-description-data-item.component';
import '../vl-description-data.component';
import { descriptionDataArgs, descriptionDataArgTypes } from './vl-description-data.stories-arg';

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
