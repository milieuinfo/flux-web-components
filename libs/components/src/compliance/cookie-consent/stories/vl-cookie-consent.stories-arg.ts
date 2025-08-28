import { ArgTypes } from '@storybook/web-components-vite';
import { CATEGORIES, TYPES } from '@resources/utils-storybook';
import { action } from 'storybook/actions';

export const cookieConsentArgs = {
    analytics: false,
    autoOpenDisabled: false,
    autoOptInFunctionalDisabled: false,
    owner: '',
    link: '',
    matomoId: '',
    matomoUrl: '',
    onClose: action('vl-close'),
};

export const cookieConsentArgTypes: ArgTypes<typeof cookieConsentArgs> = {
    analytics: {
        name: 'analytics',
        description: 'Attribuut wordt gebruikt om het verwerken van gebruikersstatistieken te activeren.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(cookieConsentArgs.analytics) },
        },
    },
    autoOpenDisabled: {
        name: 'auto-open-disabled',
        description:
            'Attribuut wordt gebruikt om te voorkomen dat de cookie consent modal onmiddellijk geautomatiseerd geopend wordt.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(cookieConsentArgs.autoOpenDisabled) },
        },
    },
    autoOptInFunctionalDisabled: {
        name: 'auto-opt-in-functional-disabled',
        description: 'Attribuut wordt gebruikt om de niet wijzigbare functionele opt-in optie te deactiveren.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(cookieConsentArgs.autoOptInFunctionalDisabled) },
        },
    },
    owner: {
        name: 'owner',
        description:
            "['Departement Omgeving'] - Attribuut wordt gebruikt om in de content tekst de eigenaar te specifiëren.",
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: cookieConsentArgs.owner },
        },
    },
    link: {
        name: 'link',
        description:
            "['https://www.omgevingvlaanderen.be/privacy'] - Attribuut wordt gebruikt om in de content tekst de privacy link te specifiëren.",
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: cookieConsentArgs.link },
        },
    },
    matomoId: {
        name: 'matomo-id',
        description:
            'Bepaald matomo id. Dit moet in combinatie met `matomo-url` gebruikt worden. Wanneer deze 2 properties ingesteld zijn, wordt niet meer `window.location.host` gekeken om de matomo id & url te bepalen.',
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: cookieConsentArgs.matomoId },
        },
    },
    matomoUrl: {
        name: 'matomo-url',
        description:
            'Bepaald matomo url. Dit moet in combinatie met `matomo-id` gebruikt worden. Wanneer deze 2 properties ingesteld zijn, wordt niet meer `window.location.host` gekeken om de matomo id & url te bepalen.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: cookieConsentArgs.matomoUrl },
        },
    },
    onClose: {
        name: 'vl-close',
        description: 'Afgevuurd nadat het cookie-consent modal gesloten wordt.',
        table: {
            category: CATEGORIES.EVENTS,
        },
    },
};
