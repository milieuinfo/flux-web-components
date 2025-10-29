import { CATEGORIES, TYPES } from '@resources/utils-storybook';
import { action } from 'storybook/actions';
import { ArgTypes } from '@storybook/web-components-vite';
import { headerDefaults } from '../vl-header.defaults';

type HeaderArgs = typeof headerDefaults & { onReady: () => void };

export const headerArgs: HeaderArgs = {
    ...headerDefaults,
    onReady: action('ready'),
};

export const headerArgTypes: ArgTypes<HeaderArgs> = {
    authenticatedUserUrl: {
        name: 'authenticated-user-url',
        description: 'De url die wordt opgeroepen om te zien of een gebruiker is ingelogd.',
        table: {
            type: { summary: TYPES.URL },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: headerArgs.authenticatedUserUrl },
        },
    },
    development: {
        name: 'development',
        description: 'Geeft aan dat de ontwikkel-servers van Digitaal Vlaanderen gebruikt moeten worden.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(headerArgs.development) },
        },
    },
    identifier: {
        name: 'identifier',
        description: 'De identifier die gebruikt wordt om bij Digitaal Vlaanderen de header op te halen. Deze' +
            ' identifier kan aangevraagd worden bij Team Infra van Departement Omgeving of via dit' +
            ' <vl-link external href="https://www.vlaanderen.be/digitaal-vlaanderen/onze-diensten-en-platformen/mijn-burgerprofiel/global-header-en-footer#stappenplan-koppeling-met-de-global-header-en-footer">stappenplan</vl-link>' +
            ' van Digitaal Vlaanderen.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: headerArgs.identifier },
        },
    },
    loginUrl: {
        name: 'login-url',
        description: 'De url die gebruikt wordt bij het aanmelden.<br>Bij het aanpassen van dit attribuut wordt' +
            ' achterliggend de \`window.globalHeaderClient.accessMenu.setProfile()\` methode van Digitaal' +
            ' Vlaanderen opnieuw aangeroepen.',
        table: {
            type: { summary: TYPES.URL },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: headerArgs.loginUrl },
        },
    },
    logoutUrl: {
        name: 'logout-url',
        description: 'De url die wordt opgeroepen wanneer men zich wil afmelden.<br>Bij het aanpassen van dit' +
            ' attribuut wordt achterliggend de \`window.globalHeaderClient.accessMenu.setProfile()\` methode' +
            ' van Digitaal Vlaanderen opnieuw aangeroepen.',
        table: {
            type: { summary: TYPES.URL },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: headerArgs.logoutUrl },
        },
    },
    simple: {
        name: 'simple',
        description: 'Indien true wordt het configureren van de sessie overgeslagen.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(headerArgs.simple) },
        },
    },
    skeleton: {
        name: 'skeleton',
        description: 'Geeft aan of de header een skeleton moet tonen voordat het rendert.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(headerArgs.skeleton) },
        },
    },
    switchCapacityUrl: {
        name: 'switch-capacity-url',
        description: 'De url die wordt opgeroepen wanneer men van organisatie wil wisselen.<br>Bij het aanpassen' +
            ' van dit attribuut wordt achterliggend de \`window.globalHeaderClient.accessMenu.setProfile()\`' +
            ' methode van Digitaal Vlaanderen opnieuw aangeroepen.',
        table: {
            type: { summary: TYPES.URL },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: headerArgs.switchCapacityUrl },
        },
    },
    applicationLinks: {
        name: 'applicationLinks',
        description: 'De links die getoond worden in de header.<br/>Zie de documentatie pagina voor meer informatie.',
        table: {
            type: { summary: 'ApplicationLink[]' },
            category: CATEGORIES.PROPERTIES,
            defaultValue: { summary: '[]' },
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
