import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';

export const descriptionDataArgs = {
    ...defaultArgs,
    bordered: false,
    size: undefined,
    mediumSize: undefined,
    smallSize: undefined,
    extraSmallSize: undefined,
};

export const descriptionDataArgTypes: ArgTypes<typeof descriptionDataArgs> = {
    ...defaultArgTypes,
    bordered: {
        name: 'bordered',
        description: 'Adds a border.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(descriptionDataArgs.bordered) },
        },
    },
    size: {
        name: 'items-size',
        type: { name: TYPES.NUMBER },
        description:
            'The number (numerator) of the maximum (denominator) that will be taken for each data item on large screens, typically desktop.',
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: '12 / number of data items' },
        },
    },
    mediumSize: {
        name: 'items-medium-size',
        type: { name: TYPES.NUMBER },
        description:
            'The number (numerator) of the maximum (denominator) that will be taken for each data item on medium screens, typically tablet.',
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: undefined },
        },
    },
    smallSize: {
        name: 'items-small-size',
        type: { name: TYPES.NUMBER },
        description:
            'The number (numerator) of the maximum (denominator) that will be taken for each data item on small screens, typically mobile.',
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: undefined },
        },
    },
    extraSmallSize: {
        name: 'items-extra-small-size',
        type: { name: TYPES.NUMBER },
        description:
            'The number (numerator) of the maximum (denominator) that will be taken for each data item on very small screens.',
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: undefined },
        },
    },
};
