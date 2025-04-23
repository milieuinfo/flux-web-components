import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components';

export const mapDrawActionStyleArgs = {
    ...defaultArgs,
    color: '',
    borderColor: '',
    borderSize: '',
    circleColor: '',
    circleBorderColor: '',
    circleBorderSize: '',
    circleSize: '',
};

export const mapDrawActionStyleArgTypes: ArgTypes<typeof mapDrawActionStyleArgs> = {
    ...defaultArgTypes,
    color: {
        name: 'color',
        description: 'Bepaalt de fill kleur bij het tekenen van een polygoon.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapDrawActionStyleArgs.color },
        },
    },
    borderColor: {
        name: 'border-color',
        description: 'Bepaalt de kleur van de rand bij de teken actie.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapDrawActionStyleArgs.borderColor },
        },
    },
    borderSize: {
        name: 'border-size',
        description: 'Bepaalt de breedte van de rand bij de teken actie.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapDrawActionStyleArgs.borderSize },
        },
    },
    circleColor: {
        name: 'circle-color',
        description: 'Bepaalt de fill kleur van de punten tijdens het tekenen.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapDrawActionStyleArgs.circleColor },
        },
    },
    circleBorderColor: {
        name: 'circle-border-color',
        description: 'Bepaalt de kleur van de rand van de cirkels tijdens het tekenen.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapDrawActionStyleArgs.circleBorderColor },
        },
    },
    circleBorderSize: {
        name: 'circle-border-size',
        description: 'Bepaalt de breedte van de rand van de cirkels tijdens het tekenen.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapDrawActionStyleArgs.circleBorderSize },
        },
    },
    circleSize: {
        name: 'circle-size',
        description: 'Bepaalt de grootte van de cirkels tijdens het tekenen.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapDrawActionStyleArgs.circleSize },
        },
    },
};
