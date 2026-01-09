import { ArgTypes } from '@storybook/web-components-vite';
// de import is bewust op deze manier om voor de web-types.generator 'binnen' de monorepo geen side-effect te geven
import {
    CATEGORIES,
    CONTROLS,
    defaultArgs,
    defaultArgTypes,
    getSelectControlOptions,
    PADDINGS,
    TYPES,
} from '@resources/utils-storybook';
import { action } from 'storybook/actions';

export const accordionArgs = {
    ...defaultArgs,
    bold: false,
    closeToggleText: '',
    contentPadding: null,
    disabled: false,
    defaultOpen: false,
    icon: '',
    openToggleText: '',
    toggleText: '',
    defaultSlot: '',
    titleSlot: '',
    subtitleSlot: '',
    menuSlot: '',
    headingLevel: '',
    onToggle: action('vl-on-toggle'),
};

export const accordionArgTypes: ArgTypes<typeof accordionArgs> = {
    ...defaultArgTypes,
    bold: {
        name: 'bold',
        description: 'Beeldt de toggle-text van de accordion af in bold.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(accordionArgs.bold) },
        },
    },
    closeToggleText: {
        name: 'close-toggle-text',
        description:
            'Tekst waarop de gebruiker kan klikken om de accordion te sluiten.<br>Kan niet in combinatie gebruikt worden met:<br>• toggle-text attribuut<br>• title slot',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(accordionArgs.closeToggleText) },
        },
    },
    contentPadding: {
        name: 'content-padding',
        description:
            'De grootte van de padding van de content.<br>Deze padding wordt toegepast op zowel desktop als mobile.',
        control: { type: CONTROLS.SELECT },
        options: [...Object.keys(PADDINGS)],
        table: {
            type: { summary: getSelectControlOptions(Object.keys(PADDINGS)) },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(accordionArgs.contentPadding) },
        },
    },
    disabled: {
        name: 'disabled',
        description: 'Schakelt het openen en het sluiten van de accordion uit.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(accordionArgs.disabled) },
        },
    },
    defaultOpen: {
        name: 'default-open',
        description: 'Indien gezet zal de accordion standaard geopend zijn.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(accordionArgs.defaultOpen) },
        },
    },
    icon: {
        name: 'icon',
        description: 'Icoon dat getoond wordt voor de tekst van de toggle.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: accordionArgs.icon },
        },
    },
    openToggleText: {
        name: 'open-toggle-text',
        description:
            'Tekst waarop de gebruiker kan klikken om de accordion te openen.<br>Kan niet in combinatie gebruikt worden met:<br>• toggle-text attribuut<br>• title slot',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: accordionArgs.openToggleText },
        },
    },
    toggleText: {
        name: 'toggle-text',
        description:
            'Tekst waarop de gebruiker kan klikken om de accordion te openen of te sluiten.<br>Kan niet in combinatie gebruikt worden met:<br>• close-toggle-text attribuut<br>• open-toggle-text attribuut<br>• title slot',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: accordionArgs.toggleText },
        },
    },
    defaultSlot: {
        name: '[default]',
        description: 'Element dat getoond en verborgen wordt wanneer de gebruiker de accordion opent of sluit.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: accordionArgs.defaultSlot },
        },
    },
    titleSlot: {
        name: 'title',
        description:
            'Element waarop de gebruiker kan klikken om de accordion te openen of te sluiten.<br>Kan niet in combinatie gebruikt worden met:<br>Kan niet in combinatie gebruikt worden met:<br>• close-toggle-text attribuut<br>• open-toggle-text attribuut<br>• toggle-text attribuut',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: accordionArgs.titleSlot },
        },
    },
    subtitleSlot: {
        name: 'subtitle',
        description: 'Subtitel slotelement. Wordt getoond in open en gesloten toestand.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: accordionArgs.subtitleSlot },
        },
    },
    menuSlot: {
        name: 'menu',
        description: 'Slotelement om menu item toe te voegen in rechterbovenhoek.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: accordionArgs.menuSlot },
        },
    },
    headingLevel: {
        name: 'heading-level',
        description: 'Bepaalt het heading level (h1, h2, h3, ...) van de titel van de accordion.',
        control: { type: CONTROLS.SELECT },
        options: ['1', '2', '3', '4', '5', '6'],
        table: {
            type: { summary: '1 | 2 | 3 | 4 | 5 | 6' },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: '' },
        },
    },
    onToggle: {
        name: 'vl-on-toggle',
        description:
            'Afgevuurd bij het openen of sluiten van de accordion.<br>Het event bevat of de accordion geopend of gesloten is.',
        table: {
            type: { summary: '{ open: boolean }' },
            category: CATEGORIES.EVENTS,
        },
    },
};
