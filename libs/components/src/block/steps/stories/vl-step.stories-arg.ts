import { CATEGORIES, CONTROLS, defaultArgs, defaultArgTypes, ICON_PLACEMENT, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { accordionArgs } from '../../accordion/stories/vl-accordion.stories-arg';

export const stepArgs = {
    ...defaultArgs,
    defaultOpen: false,
    toggleable: false,
    type: null,
};

export const stepArgTypes: ArgTypes<typeof stepArgs> = {
    ...defaultArgTypes,
    toggleable: {
        name: 'toggleable',
        description: 'Beeldt een stap af als een accordion.',
        control: false,
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(stepArgs.toggleable) },
        },
    },
    type: {
        name: 'type',
        description: 'Beeldt een stap af in een bepaalde staat.',
        control: false,
        table: {
            type: { summary: 'highlighted | disabled | success | warning | error' },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(stepArgs.type) },
        },
    },
    defaultOpen: {
        name: 'default-open',
        description: 'Indien gezet zal de step standaard geopend zijn. Werkt enkel in combinatie met ' +
            'het `toggleable` attribuut. <br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(stepArgs.defaultOpen) },
        },
    },
};
