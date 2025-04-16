import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components';

export const tabsPaneArgs = {
    ...defaultArgs,
    id: '',
    title: '',
    observeTitle: false,
};

export const tabsPaneArgTypes: ArgTypes<typeof tabsPaneArgs> = {
    ...defaultArgTypes(),
    id: {
        name: 'id',
        description: 'De id van de tabs-pane.',
        control: false,
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
    title: {
        name: 'title',
        description: 'De titel van de tabs-pane.',
        control: false,
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
    observeTitle: {
        name: 'observe-title',
        description: 'Duidt aan of de titel van de tabs-pane geobserveerd wordt.',
        control: false,
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: tabsPaneArgs.observeTitle },
        },
    },
};
