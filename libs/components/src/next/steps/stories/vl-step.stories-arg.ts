import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@domg-wc/common-storybook';
import { action } from '@storybook/addon-actions';
import { ArgTypes } from '@storybook/web-components';

export const stepArgs = {
    ...defaultArgs,
    toggleable: false,
    type: null,
    onToggle: action('vl-on-toggle'),
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
    onToggle: {
        name: 'vl-on-toggle',
        description:
            'Afgevuurd bij het openen of sluiten van de toggleable vl-step.<br>Het event bevat of de vl-step geopend of gesloten is.',
        table: {
            type: { summary: '{ open: boolean }' },
            category: CATEGORIES.EVENTS,
        },
    },
};
