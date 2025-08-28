import { CATEGORIES, CONTROLS, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';

export const mapLayerArgs = {
    ...defaultArgs,
    hidden: false,
    opacity: 1,
    maxResolution: Infinity,
    minResolution: 0,
    name: '',
};

export const mapLayerArgTypes: ArgTypes<typeof mapLayerArgs> = {
    ...defaultArgTypes,
    hidden: {
        name: 'hidden',
        description: 'Bepaalt of de kaartlaag zichtbaar is.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(mapLayerArgs.hidden) },
        },
    },
    opacity: {
        name: 'opacity',
        description: 'De opacity van de kaartlaag. Getal tussen 0 en 1.',
        control: { type: CONTROLS.RANGE, min: 0, max: 1, step: 0.01 },
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(mapLayerArgs.opacity) },
        },
    },
    maxResolution: {
        name: 'max-resolution',
        description:
            'De maximum resolutie (exclusief) waaronder de kaartlaag zichtbaar is.<br>Dit attribuut is niet reactief.',
        type: { name: TYPES.NUMBER },
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(mapLayerArgs.maxResolution) },
        },
    },
    minResolution: {
        name: 'min-resolution',
        description:
            'De minimum resolutie (inclusief) waarboven de kaartlaag zichtbaar is.<br>Dit attribuut is niet reactief.',
        type: { name: TYPES.NUMBER },
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(mapLayerArgs.minResolution) },
        },
    },
    name: {
        name: 'name',
        description: 'De naam van de kaartlaag.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapLayerArgs.name },
        },
    },
};
