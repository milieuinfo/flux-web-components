import { ArgTypes } from '@storybook/web-components';
import { mapActionArgs, mapActionArgTypes } from '../../../stories/vl-map-action.stories-arg';
import { CATEGORIES, TYPES } from '@resources/utils-storybook';

export const mapSelectActionArgs = {
    ...mapActionArgs,
    cluster: false,
};

export const mapSelectActionArgTypes: ArgTypes<typeof mapSelectActionArgs> = {
    ...mapActionArgTypes,
    cluster: {
        name: 'data-vl-cluster',
        description: 'Geeft aan de de features geclustered worden.',
        control: false,
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapSelectActionArgs.cluster },
        },
    },
};
