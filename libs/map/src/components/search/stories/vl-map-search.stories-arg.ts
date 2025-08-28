import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';

export const mapSearchArgs = {
    ...defaultArgs,
    placeholder: 'Zoeken op kaart',
    searchEmptyText: 'Geen adres gevonden',
    searchNoResultsText: 'Geen adres gevonden',
    searchPlaceholder: 'Zoeken op adres of coördinaat',
    withOffset: false,
};

export const mapSearchArgTypes: ArgTypes<typeof mapSearchArgs> = {
    ...defaultArgTypes,
    placeholder: {
        name: 'placeholder',
        description: 'De placeholder van het select element.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapSearchArgs.placeholder },
        },
    },
    searchEmptyText: {
        name: 'search-empty-text',
        description: 'De tekst wanneer er geen zoekresultaten zijn.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapSearchArgs.searchEmptyText },
        },
    },
    searchNoResultsText: {
        name: 'search-no-results-text',
        description: 'De tekst wanneer er geen zoekresultaten zijn.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapSearchArgs.searchNoResultsText },
        },
    },
    searchPlaceholder: {
        name: 'search-placeholder',
        description: 'De placeholder van het input element.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapSearchArgs.searchPlaceholder },
        },
    },
    withOffset: {
        name: 'with-offset',
        description:
            'Beeldt de search-bar af met een linkse offset.<br>Wordt gebruikt als er een map-side-sheet is aan de linkerkant zodat de toggle van de map-side-sheet niet afgebeeld wordt over de search-bar.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(mapSearchArgs.withOffset) },
        },
    },
};
