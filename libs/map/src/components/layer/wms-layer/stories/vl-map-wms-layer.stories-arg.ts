import { CATEGORIES, TYPES } from '@resources/utils-storybook';
import { mapLayerArgs, mapLayerArgTypes } from '../../stories/vl-map-layer.stories-arg';
import { ArgTypes } from '@storybook/web-components';

export const mapWmsLayerArgs = {
    ...mapLayerArgs,
    layers: '',
    styles: '',
    url: '',
    version: '1.3.0',
};

export const mapWmsLayerArgTypes: ArgTypes<typeof mapWmsLayerArgs> = {
    ...mapLayerArgTypes,
    layers: {
        name: 'data-vl-layers',
        description: 'De WMS layers.',
        type: { name: TYPES.STRING, required: true },
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapWmsLayerArgs.layers },
        },
    },
    styles: {
        name: 'data-vl-styles',
        description: 'De WMS stijlen.',
        type: { name: TYPES.STRING },
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapWmsLayerArgs.styles },
        },
    },
    url: {
        name: 'data-vl-url',
        description: 'De WMS url.',
        type: { name: TYPES.STRING, required: true },
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapWmsLayerArgs.url },
        },
    },
    version: {
        name: 'data-vl-version',
        description: 'De WMS versie.',
        type: { name: TYPES.STRING },
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapWmsLayerArgs.version },
        },
    },
};
