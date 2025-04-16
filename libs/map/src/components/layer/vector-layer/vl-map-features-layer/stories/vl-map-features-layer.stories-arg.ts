import { CATEGORIES, TYPES } from '@resources/utils-storybook';
import { mapLayerArgs, mapLayerArgTypes } from '../../../stories/vl-map-layer.stories-arg';
import { ArgTypes } from '@storybook/web-components';

export const mapFeaturesLayerArgs = {
    ...mapLayerArgs,
    autoExtent: false,
    autoExtentMaxZoom: '',
    cluster: false,
    clusterDistance: null as number,
    features: '',
    featuresProp: null,
};

export const mapFeaturesLayerArgTypes: ArgTypes<typeof mapFeaturesLayerArgs> = {
    ...mapLayerArgTypes,
    autoExtent: {
        name: 'data-vl-auto-extent',
        description: 'Automatisch zoomen op de kaartlaag zodat al de features zichtbaar zijn.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapFeaturesLayerArgs.autoExtent },
        },
    },
    autoExtentMaxZoom: {
        name: 'data-vl-auto-extent-max-zoom',
        description: 'Het maximum niveau tot waar er automatisch gezoomd wordt bij een extent.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapFeaturesLayerArgs.autoExtentMaxZoom },
        },
    },
    cluster: {
        name: 'data-vl-cluster',
        description: 'Geeft aan of de features geclusterd moeten worden of niet.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapFeaturesLayerArgs.cluster },
        },
    },
    clusterDistance: {
        name: 'data-vl-cluster-distance',
        description: 'De afstand vanaf er tussen features geclusterd mag worden.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapFeaturesLayerArgs.clusterDistance },
        },
    },
    features: {
        name: 'data-vl-features',
        description: 'Attribuut dat de kaartlaag bevat.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapFeaturesLayerArgs.features },
        },
    },
    featuresProp: {
        name: 'features',
        description: 'Property die de kaartlaag bevat.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.PROPERTIES,
            defaultValue: { summary: mapFeaturesLayerArgs.featuresProp },
        },
    },
};
