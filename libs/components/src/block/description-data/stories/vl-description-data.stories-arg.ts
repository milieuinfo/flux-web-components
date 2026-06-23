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
        description: 'Voegt een rand toe aan de description-data.',
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
            'Kolombreedte (teller van het 12-kolomsysteem) voor elk item op grote schermen, typisch desktop.',
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: '12 / aantal items' },
        },
    },
    mediumSize: {
        name: 'items-medium-size',
        type: { name: TYPES.NUMBER },
        description:
            'Kolombreedte (teller van het 12-kolomsysteem) voor elk item op middelgrote schermen, typisch tablet.',
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
            'Kolombreedte (teller van het 12-kolomsysteem) voor elk item op kleine schermen, typisch mobiel.',
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
            'Kolombreedte (teller van het 12-kolomsysteem) voor elk item op zeer kleine schermen.',
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: undefined },
        },
    },
};
