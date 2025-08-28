import { CATEGORIES, CONTROLS, TYPES } from '@resources/utils-storybook';
import { mapLayerStyleArg, mapLayerStyleArgTypes } from '../../stories/vl-map-layer-style.stories-arg';
import { ArgTypes } from '@storybook/web-components-vite';

export const mapLayerCircleStyleArg = {
    ...mapLayerStyleArg,
    borderColor: 'rgba(0, 0, 0, 0)',
    clusterColor: 'rgba(2, 85, 204, 1)',
    clusterTextColor: '#FFF',
    clusterMultiplier: 1,
    size: 5,
};

export const mapLayerCircleStyleArgTypes: ArgTypes<typeof mapLayerCircleStyleArg> = {
    ...mapLayerStyleArgTypes,
    borderColor: {
        name: 'border-color',
        description: 'De kleur van de rand van de kaartlaagstijl.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapLayerCircleStyleArg.borderColor },
        },
    },
    clusterColor: {
        name: 'cluster-color',
        description: 'De kleur bij het clusteren van features.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapLayerCircleStyleArg.clusterColor },
        },
    },
    clusterMultiplier: {
        name: 'cluster-multiplier',
        description: 'Bepaalt de verhouding van de vergroting voor clusters tegenover ingestelde `size`.',
        control: { type: CONTROLS.NUMBER, step: 0.1 },
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(mapLayerCircleStyleArg.clusterMultiplier) },
        },
    },
    clusterTextColor: {
        name: 'cluster-text-color',
        description: 'De kleur van de tekst bij het clusteren van features.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapLayerCircleStyleArg.clusterTextColor },
        },
    },
    size: {
        name: 'size',
        description: 'De grootte van de cirkels.',
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(mapLayerCircleStyleArg.size) },
        },
    },
};
