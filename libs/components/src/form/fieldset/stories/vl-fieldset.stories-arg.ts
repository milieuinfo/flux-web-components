import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { fieldsetDefaults } from '../vl-fieldset.defaults';

type FieldsetArgs = typeof defaultArgs & { defaultSlot: string } & typeof fieldsetDefaults;

export const fieldsetArgs: FieldsetArgs = {
    ...defaultArgs,
    ...fieldsetDefaults,
    defaultSlot: '',
};

export const fieldsetArgTypes: ArgTypes<FieldsetArgs> = {
    ...defaultArgTypes,
    border: {
        name: 'border',
        description: 'Duidt aan of de fieldset een rand moet tonen.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: String(fieldsetArgs.border) },
        },
    },
    horizontal: {
        name: 'horizontal',
        description: 'Duidt aan of de inhoud van de fieldset horizontaal moet worden uitgelijnd.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: String(fieldsetArgs.horizontal) },
        },
    },
    legend: {
        name: 'legend (vereist)',
        description: 'De legend van de fieldset.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.STRING },
            defaultValue: { summary: String(fieldsetArgs.legend) },
        },
    },
    legendClasses: {
        name: 'legend-classes',
        description: 'Extra CSS-classes voor de legend van de fieldset (space-separated).',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.STRING },
            defaultValue: { summary: String(fieldsetArgs.legendClasses) },
        },
    },
    defaultSlot: {
        name: 'default slot',
        description: 'De inhoud van de fieldset.',
        table: {
            category: CATEGORIES.SLOTS,
            type: { summary: TYPES.STRING },
            defaultValue: { summary: String(fieldsetArgs.defaultSlot) },
        },
    },
};
