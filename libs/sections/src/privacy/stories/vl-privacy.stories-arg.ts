import { CATEGORIES, TYPES } from '@resources/utils-storybook';
import { action } from '@storybook/addon-actions';
import { ArgTypes } from '@storybook/web-components';
import { privacyDefaults } from '../vl-privacy.defaults';

export const privacyArgs = {
    ...privacyDefaults,
    onClickBack: action('vl-click-back'),
};

export const privacyArgTypes: ArgTypes<typeof privacyArgs> = {
    date: {
        name: 'date',
        description: 'De datum waarop de pagina werd uitgegeven.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: privacyArgs.date },
        },
    },
    disableBackLink: {
        name: 'disable-back-link',
        description: 'Zet de terug-link uit.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: privacyArgs.disableBackLink },
        },
    },
    hideBackLink: {
        name: 'hide-back-link',
        description: 'Verwijdert de terug-link.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: privacyArgs.hideBackLink },
        },
    },
    version: {
        name: 'version',
        description: 'De pagina versie.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: privacyArgs.version },
        },
    },
    onClickBack: {
        name: 'vl-click-back',
        description: 'Afgevuurd na het klikken op de terug-link.',
        table: {
            type: { summary: '-' },
            category: CATEGORIES.EVENTS,
        },
    },
    headerSlot: {
        name: 'header',
        description: 'Hiermee kan je de standaard functional header vervangen door een header naar keuze.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: privacyArgs.headerSlot,
        },
    },
    versionSlot: {
        name: 'version',
        description: 'Hiermee kan je de standaard versie sectie vervangen door een sectie naar keuze.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: privacyArgs.versionSlot,
        },
    },
    contentSlot: {
        name: 'content',
        description: 'Hiermee kan je de standaard content sectie vervangen door een sectie naar keuze.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: privacyArgs.contentSlot,
        },
    },
    bottomSlot: {
        name: 'bottom',
        description: 'Hiermee kan je de standaard footer sectie vervangen door een sectie naar keuze.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: privacyArgs.bottomSlot,
        },
    },
};
