import { ArgTypes } from '@storybook/web-components';
import { CATEGORIES, TYPES } from '@domg-wc/common-storybook';

export const searchFilterArgs = {
    title: '',
    alt: false,
    mobileModal: false,
    mobileModalTitle: '',
    maxWidth: '800px',
};

export const searchFilterArgTypes: ArgTypes<typeof searchFilterArgs> = {
    title: {
        name: 'data-vl-title',
        description: 'The title of this search filter.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: searchFilterArgs.title },
        },
    },
    alt: {
        name: 'data-vl-alt',
        description: 'Alternative (transparent) background.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: searchFilterArgs.alt },
        },
    },
    mobileModal: {
        name: 'data-vl-mobile-modal',
        description: 'Activates optimized display for mobile devices.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: searchFilterArgs.mobileModal },
        },
    },
    mobileModalTitle: {
        name: 'data-vl-mobile-modal-title',
        description:
            'The title of this search filter on mobile devices. If not declared, the value of data-vl-title will be used.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: searchFilterArgs.mobileModalTitle },
        },
    },
    maxWidth: {
        table: {
            disable: true,
        },
    },
};
