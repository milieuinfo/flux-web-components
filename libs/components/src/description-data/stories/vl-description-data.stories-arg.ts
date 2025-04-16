import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';

export const descriptionDataArgs = {
    ...defaultArgs,
    bordered: false,
    size: undefined,
    mediumSize: undefined,
    smallSize: undefined,
    extraSmallSize: undefined,
};

export const descriptionDataArgTypes = {
    ...defaultArgTypes(),
    bordered: {
        name: 'data-vl-bordered',
        description: 'Adds a border.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: descriptionDataArgs.bordered },
        },
    },
    size: {
        name: 'data-vl-items-size',
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
        name: 'data-vl-items-medium-size',
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
        name: 'data-vl-items-small-size',
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
        name: 'data-vl-items-extra-small-size',
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
