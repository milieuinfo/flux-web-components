import { action } from '@storybook/addon-actions';
import { CATEGORIES, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components';

export const footerArgs = {
    development: false,
    identifier: '',
    onReady: action('ready'),
};

export const footerArgTypes: ArgTypes<typeof footerArgs> = {
    development: {
        name: 'development',
        description: 'Geeft aan dat de ontwikkel servers van Digitaal Vlaanderen gebruikt moeten worden.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: footerArgs.development },
        },
    },
    identifier: {
        name: 'identifier',
        description: 'De identifier die gebruikt wordt om bij Digitaal Vlaanderen de footer op te halen.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: footerArgs.identifier },
        },
    },
    onReady: {
        name: 'ready',
        description: 'Afgevuurd nadat de widget toegevoegd is aan de DOM.',
        table: {
            type: { summary: '-' },
            category: CATEGORIES.EVENTS,
        },
    },
};
