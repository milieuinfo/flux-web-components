import {
    CATEGORIES,
    CONTROLS,
    defaultArgs,
    defaultArgTypes,
    getSelectControlOptions,
    PADDINGS,
    TYPES,
} from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { action } from 'storybook/actions';
import { accordionDefaults } from '../vl-accordion.defaults';

export type AccordionArgs = typeof accordionDefaults &
    typeof defaultArgs & {
        triggerSlot: string;
        subtitleSlot: string;
        actionsSlot: string;
        contentSlot: string;
        onVlToggle: (detail: unknown) => void;
        onVlOpen: () => void;
        onVlClose: () => void;
    };

export const accordionArgs: AccordionArgs = {
    ...defaultArgs,
    ...accordionDefaults,
    triggerSlot: '',
    subtitleSlot: '',
    actionsSlot: '',
    contentSlot: '',
    onVlToggle: action('vl-toggle'),
    onVlOpen: action('vl-open'),
    onVlClose: action('vl-close'),
};

export const accordionArgTypes: ArgTypes<AccordionArgs> = {
    ...defaultArgTypes,
    open: {
        name: 'open',
        description:
            'Of de accordion open is. Zet de begintoestand en volgt daarna de huidige toestand, ook na een klik.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(accordionArgs.open) },
        },
    },
    toggleText: {
        name: 'toggle-text',
        description:
            'Tekst van de toggle-knop.<br>Niet combineren met `open-toggle-text`, `close-toggle-text` of de `trigger` slot.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: accordionArgs.toggleText },
        },
    },
    openToggleText: {
        name: 'open-toggle-text',
        description: 'Tekst van de toggle-knop als de accordion gesloten is.<br>Gebruik samen met `close-toggle-text`.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: accordionArgs.openToggleText },
        },
    },
    closeToggleText: {
        name: 'close-toggle-text',
        description: 'Tekst van de toggle-knop als de accordion open is.<br>Gebruik samen met `open-toggle-text`.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: accordionArgs.closeToggleText },
        },
    },
    contentPadding: {
        name: 'content-padding',
        description: 'De padding van de inhoud, op desktop en mobiel.',
        control: { type: CONTROLS.SELECT },
        options: ['', ...Object.keys(PADDINGS)],
        table: {
            type: { summary: getSelectControlOptions(Object.keys(PADDINGS)) },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: accordionArgs.contentPadding },
        },
    },
    headingLevel: {
        name: 'heading-level',
        description:
            'Zet de toggle-knop in een heading van niveau 1 tot 6.<br>Zonder of met een ongeldige waarde staat de knop niet in een heading.',
        control: { type: CONTROLS.SELECT },
        options: ['', '1', '2', '3', '4', '5', '6'],
        table: {
            type: { summary: '1 | 2 | 3 | 4 | 5 | 6' },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: accordionArgs.headingLevel },
        },
    },
    icon: {
        name: 'icon',
        description: 'Icoon voor de tekst van de toggle-knop.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: accordionArgs.icon },
        },
    },
    altBackground: {
        name: 'alt-background',
        description: 'Toont de accordion met een alternatieve grijze achtergrond.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(accordionArgs.altBackground) },
        },
    },
    bold: {
        name: 'bold',
        description: 'Toont de tekst van de toggle-knop vetgedrukt.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(accordionArgs.bold) },
        },
    },
    disabled: {
        name: 'disabled',
        description: 'Schakelt de accordion uit. Hij blijft gesloten en zijn inhoud is niet vindbaar.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(accordionArgs.disabled) },
        },
    },
    triggerSlot: {
        name: 'trigger',
        description:
            'Tekst of elementen in de toggle-knop.<br>Niet combineren met `toggle-text`, `open-toggle-text` of `close-toggle-text`.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: accordionArgs.triggerSlot },
        },
    },
    subtitleSlot: {
        name: 'subtitle',
        description: 'Tekst onder de toggle-knop, zichtbaar in open en gesloten toestand.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: accordionArgs.subtitleSlot },
        },
    },
    actionsSlot: {
        name: 'actions',
        description: 'Knoppen of links naast de toggle-knop, bijvoorbeeld een menu.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: accordionArgs.actionsSlot },
        },
    },
    contentSlot: {
        name: 'content',
        description: 'De inhoud die open- en dichtklapt.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: accordionArgs.contentSlot },
        },
    },
    onVlToggle: {
        name: 'vl-toggle',
        description: 'Afgevuurd bij elke wijziging van de open-toestand. Bubbelt.',
        table: {
            type: { summary: '{ expanded: boolean }' },
            category: CATEGORIES.EVENTS,
        },
    },
    onVlOpen: {
        name: 'vl-open',
        description: 'Afgevuurd wanneer de accordion opent. Bubbelt.',
        table: {
            category: CATEGORIES.EVENTS,
        },
    },
    onVlClose: {
        name: 'vl-close',
        description: 'Afgevuurd wanneer de accordion sluit. Bubbelt.',
        table: {
            category: CATEGORIES.EVENTS,
        },
    },
};
