import { ArgTypes } from '@storybook/web-components-vite';
import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { action } from 'storybook/actions';
import { searchFilterDefaults } from '../vl-search-filter.defaults';

export const searchFilterArgs = {
    ...defaultArgs,
    ...searchFilterDefaults,
    onVlClose: action('vl-close'),
};

export const searchFilterArgTypes: ArgTypes<typeof searchFilterArgs> = {
    ...defaultArgTypes,
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
            defaultValue: { summary: String(searchFilterArgs.alt) },
        },
    },
    mobileModal: {
        name: 'mobile-modal',
        description:
            'Activeert geoptimaliseerde weergave voor mobiele apparaten.<br>Dit wordt ook geactiveerd als de viewport kleiner is dan 768px.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(searchFilterArgs.mobileModal) },
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
    mobileModalClosable: {
        name: 'mobile-modal-closable',
        description:
            'Toont in de mobiele weergave een knop "Filter sluiten" naast de titel. Die verbergt de zoekfilter en vuurt' +
            ' `vl-close` af.<br>vl-rich-data zet dit attribuut zelf.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(searchFilterArgs.mobileModalClosable) },
        },
    },
    onVlClose: {
        name: 'vl-close',
        description: 'Event dat afgevuurd wordt wanneer de sluitknop van de mobiele weergave de zoekfilter verbergt.',
        table: {
            category: CATEGORIES.EVENTS,
        },
    },
};
