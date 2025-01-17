import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@domg-wc/common-storybook';
import { ArgTypes } from '@storybook/web-components';

type SearchResultArgs = typeof defaultArgs & { defaultSlot: string };

export const searchResultArgs: SearchResultArgs = {
    ...defaultArgs,
    defaultSlot: '',
};

export const searchResultArgTypes: ArgTypes<SearchResultArgs> = {
    ...defaultArgTypes(true),
    defaultSlot: {
        name: '[default]',
        description: 'De inhoud van het zoekresultaat',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: searchResultArgs.defaultSlot },
        },
    },
};
