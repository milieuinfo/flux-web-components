import { CATEGORIES, TYPES } from '@resources/utils-storybook';
import { mapLayerArgs, mapLayerArgTypes } from '../../../stories/vl-map-layer.stories-arg';
import { ArgTypes } from '@storybook/web-components-vite';

export const mapFeaturesLayerArgs = {
    ...mapLayerArgs,
    autoExtent: false,
    autoExtentMaxZoom: '',
    cluster: false,
    clusterDistance: null as number,
    features: '',
    featuresProp: null,
    projectionCode: '',
};

export const mapFeaturesLayerArgTypes: ArgTypes<typeof mapFeaturesLayerArgs> = {
    ...mapLayerArgTypes,
    autoExtent: {
        name: 'auto-extent',
        description: 'Automatisch zoomen op de kaartlaag zodat al de features zichtbaar zijn.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(mapFeaturesLayerArgs.autoExtent) },
        },
    },
    autoExtentMaxZoom: {
        name: 'auto-extent-max-zoom',
        description: 'Het maximum niveau tot waar er automatisch gezoomd wordt bij een extent.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapFeaturesLayerArgs.autoExtentMaxZoom },
        },
    },
    cluster: {
        name: 'cluster',
        description: 'Geeft aan of de features geclusterd moeten worden of niet.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(mapFeaturesLayerArgs.cluster) },
        },
    },
    clusterDistance: {
        name: 'cluster-distance',
        description: 'De afstand vanaf er tussen features geclusterd mag worden.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(mapFeaturesLayerArgs.clusterDistance) },
        },
    },
    features: {
        name: 'features',
        description: 'Attribuut dat de kaartlaag bevat.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapFeaturesLayerArgs.features },
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
            defaultValue: { summary: mapFeaturesLayerArgs.projectionCode },
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
