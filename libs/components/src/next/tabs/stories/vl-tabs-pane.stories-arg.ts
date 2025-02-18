import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@domg-wc/common-storybook';
import { ArgTypes } from '@storybook/web-components';

export const tabsPaneNextArgs = {
    ...defaultArgs,
    id: '',
    title: '',
    observeTitle: false,
};

export const tabsPaneNextArgTypes: ArgTypes<typeof tabsPaneNextArgs> = {
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
            defaultValue: { summary: tabsPaneNextArgs.observeTitle },
        },
    },
};
