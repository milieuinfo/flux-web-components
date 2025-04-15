import { ArgTypes } from '@storybook/web-components';
import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@domg-wc/common-storybook';
import { searchFilterDefaults } from '../vl-search-filter.defaults';

export const searchFilterArgs = {
    ...defaultArgs,
    ...searchFilterDefaults,
};

export const searchFilterArgTypes: ArgTypes<typeof searchFilterArgs> = {
    ...defaultArgTypes(true),
    filterTitle: {
        name: 'filter-title',
        description: 'De titel van deze zoekfilter.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: searchFilterArgs.filterTitle },
        },
    },
    alt: {
        name: 'alt',
        description: 'Alternatieve (transparante) achtergrond.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: searchFilterArgs.alt },
        },
    },
    mobileModal: {
        name: 'mobile-modal',
        description:
            'Activeert geoptimaliseerde weergave voor mobiele apparaten.<br>Dit wordt ook geactiveerd als de viewport kleiner is dan 768px.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: searchFilterArgs.mobileModal },
        },
    },
    mobileModalTitle: {
        name: 'mobile-modal-title',
        description:
            'Stelt de titel in van deze zoekfilter op mobiele apparaten.<br> Als die niet gedeclareerd is, wordt de waarde van filter-title gebruikt.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: searchFilterArgs.mobileModalTitle },
        },
    },
};
