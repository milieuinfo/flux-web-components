import { CATEGORIES, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components';
import { richDataArgs, richDataArgTypes } from '../../rich-data/stories/vl-rich-data.stories-arg';

export const richDataTableArgs = {
    ...richDataArgs,
    collapsedM: false,
    collapsedS: false,
    collapsedXS: false,
};

export const richDataTableArgTypes: ArgTypes<typeof richDataTableArgs> = {
    ...richDataArgTypes,
    collapsedM: {
        name: 'data-vl-collapsed-m',
        description: 'Vanaf medium schermgrootte, cellen per rij onder elkaar ipv naast elkaar',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: richDataTableArgs.collapsedM },
        },
    },
    collapsedS: {
        name: 'data-vl-collapsed-s',
        description: 'Vanaf een small schermgrootte, cellen per rij onder elkaar ipv naast elkaar',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: richDataTableArgs.collapsedS },
        },
    },
    collapsedXS: {
        name: 'data-vl-collapsed-xs',
        description: 'Vanaf een extra small schermgrootte, cellen per rij onder elkaar ipv naast elkaar',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: richDataTableArgs.collapsedXS },
        },
    },
};
