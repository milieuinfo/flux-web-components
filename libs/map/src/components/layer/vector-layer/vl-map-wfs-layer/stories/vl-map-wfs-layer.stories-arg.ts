import { CATEGORIES, TYPES } from '@resources/utils-storybook';
import { mapLayerArgs, mapLayerArgTypes } from '../../../stories/vl-map-layer.stories-arg';
import { ArgTypes } from '@storybook/web-components';

export const mapWfsLayerArgs = {
    ...mapLayerArgs,
    layers: '',
    url: '',
};

export const mapWfsLayerArgTypes: ArgTypes<typeof mapWfsLayerArgs> = {
    ...mapLayerArgTypes,
    layers: {
        name: 'layers',
        description: 'De layers van de WFS.<br>Dit attribuut is niet reactief.',
        type: { name: TYPES.STRING, required: true },
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapWfsLayerArgs.layers },
        },
    },
    url: {
        name: 'url',
        description: 'De WFS url.<br>Dit attribuut is niet reactief.',
        type: { name: TYPES.STRING, required: true },
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapWfsLayerArgs.url },
        },
    },
};
