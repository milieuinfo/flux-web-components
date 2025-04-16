import { ArgTypes } from '@storybook/web-components';
import { CATEGORIES, TYPES } from '@resources/utils-storybook';
import { action } from '@storybook/addon-actions';

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
        name: 'data-vl-analytics',
        description: 'Attribuut wordt gebruikt om het verwerken van gebruikersstatistieken te activeren.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: cookieConsentArgs.analytics },
        },
    },
    autoOpenDisabled: {
        name: 'data-vl-auto-open-disabled',
        description:
            'Attribuut wordt gebruikt om te voorkomen dat de cookie consent modal onmiddellijk geautomatiseerd geopend wordt.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: cookieConsentArgs.autoOpenDisabled },
        },
    },
    autoOptInFunctionalDisabled: {
        name: 'data-vl-auto-opt-in-functional-disabled',
        description: 'Attribuut wordt gebruikt om de niet wijzigbare functionele opt-in optie te deactiveren.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: cookieConsentArgs.autoOptInFunctionalDisabled },
        },
    },
    owner: {
        name: 'data-vl-owner',
        description:
            "['Departement Omgeving'] - Attribuut wordt gebruikt om in de content tekst de eigenaar te specifiëren.",
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: cookieConsentArgs.owner },
        },
    },
    link: {
        name: 'data-vl-link',
        description:
            "['https://www.omgevingvlaanderen.be/privacy'] - Attribuut wordt gebruikt om in de content tekst de privacy link te specifiëren.",
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: cookieConsentArgs.link },
        },
    },
    matomoId: {
        name: 'data-vl-matomo-id',
        description:
            'Bepaald matomo id. Dit moet in combinatie met `matomo-url` gebruikt worden. Wanneer deze 2 properties ingesteld zijn, wordt niet meer `window.location.host` gekeken om de matomo id & url te bepalen.',
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: cookieConsentArgs.matomoId },
        },
    },
    matomoUrl: {
        name: 'data-vl-matomo-url',
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
