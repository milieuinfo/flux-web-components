import { CATEGORIES, TYPES } from '@resources/utils-storybook';
import { mapLayerArgs, mapLayerArgTypes } from '../../../stories/vl-map-layer.stories-arg';
import { ArgTypes } from '@storybook/web-components-vite';

export const mapWfsLayerArgs = {
    ...mapLayerArgs,
    layers: '',
    projectionCode: '',
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
    projectionCode: {
        name: 'projection-code',
        description: `Indien je Lambert 72 coördinaten gebruikt op een Lambert 2008 kaart, moet je de projectie code
EPSG:31370 meegeven als projection-code. Geef je dit niet mee, dan zal de kaartlaag de projectie code van
de kaart overnemen.<br>Dit attribuut is niet reactief.`,
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapWfsLayerArgs.projectionCode },
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
