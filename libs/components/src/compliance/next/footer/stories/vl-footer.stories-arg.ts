import { CATEGORIES, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { action } from 'storybook/actions';

export const footerArgs = {
    development: false,
    identifier: '',
    onReady: action('ready'),
};

export const footerArgTypes: ArgTypes<typeof footerArgs> = {
    development: {
        name: 'development',
        description: 'Geeft aan dat de ontwikkel-servers van Digitaal Vlaanderen gebruikt moeten worden.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(footerArgs.development) },
        },
    },
    identifier: {
        name: 'identifier',
        description:
            'De identifier die gebruikt wordt om bij Digitaal Vlaanderen de footer op te halen. Deze' +
            ' identifier kan aangevraagd worden bij Team Infra van Departement Omgeving of' +
            ' via het stappenplan van Digitaal Vlaanderen.' +
            ' <a href="https://www.vlaanderen.be/digitaal-vlaanderen/onze-diensten-en-platformen/mijn-burgerprofiel/global-header-en-footer#stappenplan-koppeling-met-de-global-header-en-footer" target="_blank" rel="noopener noreferrer" aria-label="Ga naar het stappenplan van Digitaal Vlaanderen (opent in een nieuw venster)">Ga naar het stappenplan van Digitaal Vlaanderen.</a>',
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
