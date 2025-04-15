import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@domg-wc/common-storybook';
import { ArgTypes } from '@storybook/web-components';

export const stepArgs = {
    ...defaultArgs,
    toggleable: false,
    type: null,
};

export const stepArgTypes: ArgTypes = {
    ...defaultArgTypes(),
    toggleable: {
        name: 'data-vl-toggleable',
        description: 'Beeldt een stap af als een accordion.',
        control: false,
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: stepArgs.toggleable },
        },
    },
    type: {
        name: 'data-vl-type',
        description: 'Beeldt een stap af in een bepaalde staat.',
        control: false,
        table: {
            type: { summary: ['highlighted', 'disabled', 'success', 'warning', 'error'] },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: stepArgs.type },
        },
    },
};
