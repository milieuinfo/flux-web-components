import { CATEGORIES, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { action } from 'storybook/actions';
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
        description:
            'De identifier die gebruikt wordt om bij Digitaal Vlaanderen de header op te halen. Deze' +
            ' identifier kan aangevraagd worden bij Team Infra van Departement Omgeving of' +
            ' via het stappenplan van Digitaal Vlaanderen.' +
            ' <a href="https://www.vlaanderen.be/digitaal-vlaanderen/onze-diensten-en-platformen/mijn-burgerprofiel/global-header-en-footer#stappenplan-koppeling-met-de-global-header-en-footer" target="_blank" rel="noopener noreferrer" aria-label="Ga naar het stappenplan van Digitaal Vlaanderen (opent in een nieuw venster)">Ga naar het stappenplan van Digitaal Vlaanderen.</a>',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: headerArgs.identifier },
        },
    },
    loginUrl: {
        name: 'login-url',
        description:
            'De url die gebruikt wordt bij het aanmelden.<br>Bij het aanpassen van dit attribuut wordt' +
            ' achterliggend de `window.globalHeaderClient.accessMenu.setProfile()` methode van Digitaal' +
            ' Vlaanderen opnieuw aangeroepen.',
        table: {
            type: { summary: TYPES.URL },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: headerArgs.loginUrl },
        },
    },
    logoutUrl: {
        name: 'logout-url',
        description:
            'De url die wordt opgeroepen wanneer men zich wil afmelden.<br>Bij het aanpassen van dit' +
            ' attribuut wordt achterliggend de `window.globalHeaderClient.accessMenu.setProfile()` methode' +
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
        description:
            'De url die wordt opgeroepen wanneer men van organisatie wil wisselen.<br>Bij het aanpassen' +
            ' van dit attribuut wordt achterliggend de `window.globalHeaderClient.accessMenu.setProfile()`' +
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
    profileTokenUrl: {
        name: 'profile-token-url',
        description:
            'De url die opgeroepen wordt om het PAPI profile token op te halen. Het token wordt' +
            ' achterliggend doorgegeven aan `window.globalHeaderClient.accessMenu.setProfile()` als' +
            ' `idpProfileToken`. Standaard `/sso/papi_token` (endpoint van de Cumuli security lib);' +
            ' zet leeg om geen token op te halen. Het token wordt nooit' +
            ' in de DOM opgenomen (om die reden is er geen `idp-profile-token` attribuut).<br/>' +
            'Zie de documentatie pagina voor de verwachte response.',
        table: {
            type: { summary: TYPES.URL },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: headerArgs.profileTokenUrl },
        },
    },
    idpDataUrl: {
        name: 'idp-data-url',
        description:
            'De url die opgeroepen wordt om manueel IdpData op te halen (handig voor mock users via' +
            ' lokale Keycloak). De response wordt doorgegeven aan' +
            ' `window.globalHeaderClient.accessMenu.setProfile()` als `idpData`.',
        table: {
            type: { summary: TYPES.URL },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: headerArgs.idpDataUrl },
        },
    },
    idpProfileToken: {
        name: 'idpProfileToken',
        description:
            'Het PAPI profile token, te zetten via JavaScript (geen attribuut omdat het token niet' +
            ' in de DOM mag belanden). Heeft voorrang op `profile-token-url`. Wordt enkel meegestuurd' +
            ' wanneer de gebruiker is aangemeld.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.PROPERTIES,
            defaultValue: { summary: 'undefined' },
        },
    },
    idpData: {
        name: 'idpData',
        description:
            'Manuele override voor de IdpData. Heeft voorrang op `idp-data-url`. Handig voor mock' +
            ' users via lokale Keycloak.<br/>Zie de documentatie pagina voor het type.',
        table: {
            type: { summary: 'IDPData' },
            category: CATEGORIES.PROPERTIES,
            defaultValue: { summary: 'undefined' },
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
