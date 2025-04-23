import { CATEGORIES, TYPES } from '@resources/utils-storybook';
import { action } from '@storybook/addon-actions';
import { ArgTypes } from '@storybook/web-components';
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
        description: 'Geeft aan dat de AIV ontwikkel servers gebruikt moeten worden.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: headerArgs.development },
        },
    },
    identifier: {
        name: 'identifier',
        description: 'De identifier die gebruikt wordt om bij AIV de footer op te halen.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: headerArgs.identifier },
        },
    },
    loginRedirectUrl: {
        name: 'login-redirect-url',
        description:
            'De redirect url die gebruikt wordt bij het aanmelden.<br>Bij het aanpassen van dit attribuut wordt achterliggend de session.configure() methode van DV opnieuw aangeroepen.',
        table: {
            type: { summary: TYPES.URL },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: headerArgs.loginRedirectUrl },
        },
    },
    loginUrl: {
        name: 'login-url',
        description:
            'De url die gebruikt wordt bij het aanmelden.<br>Bij het aanpassen van dit attribuut wordt achterliggend de session.configure() methode van DV opnieuw aangeroepen.',
        table: {
            type: { summary: TYPES.URL },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: headerArgs.loginUrl },
        },
    },
    logoutUrl: {
        name: 'logout-url',
        description:
            'De url die wordt opgeroepen wanneer men zich wil afmelden.<br>Bij het aanpassen van dit attribuut wordt achterliggend de session.configure() methode van DV opnieuw aangeroepen.',
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
            defaultValue: { summary: headerArgs.simple },
        },
    },
    skeleton: {
        name: 'skeleton',
        description: 'Geeft aan of de header een skeleton moet tonen voordat het rendert.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: headerArgs.skeleton },
        },
    },
    switchCapacityUrl: {
        name: 'switch-capacity-url',
        description:
            'De url die wordt opgeroepen wanneer men van organisatie wil wisselen.<br>Bij het aanpassen van dit attribuut wordt achterliggend de session.configure() methode van DV opnieuw aangeroepen.',
        table: {
            type: { summary: TYPES.URL },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: headerArgs.switchCapacityUrl },
        },
    },
    rejectLogout: {
        name: 'reject-logout',
        description:
            'Geeft aan of het logout request moet worden afgewezen.<br/>Een logout request door de gebruiker wordt nooit afgewezen.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: headerArgs.rejectLogout },
        },
    },
    logoutCallback: {
        name: 'logoutCallback',
        description: `De callback die aangeroepen wordt bij een logout request.<br/>De logout reason wordt meegegeven aan de callback, door een boolean promise terug te geven kan je het logout request accepteren of afwijzen.<br/>De mogelijke reasons zijn: 'inactivity' en 'expired'.<br/>Een logout request door de gebruiker wordt nooit afgewezen.`,
        control: false,
        table: {
            type: { summary: '(reason: string) => Promise<boolean>' },
            category: CATEGORIES.PROPERTIES,
            defaultValue: { summary: headerArgs.logoutCallback },
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
