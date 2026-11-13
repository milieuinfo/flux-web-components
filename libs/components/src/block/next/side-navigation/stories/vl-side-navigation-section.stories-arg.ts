import { CATEGORIES, CONTROLS, getSelectControlOptions, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';

export const sideNavigationSectionArgs = {
    type: 'custom',
    sectionTitle: '',
    headingRootSelector: '',
    minLevel: undefined as number | undefined,
    maxLevel: undefined as number | undefined,
    maxDepth: undefined as number | undefined,
    excludeSelectors: '',
};

export const sideNavigationSectionArgTypes: ArgTypes<typeof sideNavigationSectionArgs> = {
    type: {
        name: 'type',
        description:
            'Met `auto` bouwt de sectie haar inhoudstafel op uit de headings binnen `heading-root-selector`. Met `custom` lever je zelf een `<ul>` met `vl-link`s.',
        control: { type: CONTROLS.SELECT },
        options: ['custom', 'auto'],
        table: {
            type: { summary: getSelectControlOptions(['custom', 'auto']) },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: sideNavigationSectionArgs.type },
        },
    },
    sectionTitle: {
        name: 'section-title',
        description: 'De titel van de sectie, getoond als label boven haar links.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: sideNavigationSectionArgs.sectionTitle },
        },
    },
    headingRootSelector: {
        name: 'heading-root-selector',
        description:
            'CSS selector van de container waarin een `auto`-sectie naar headings zoekt. Zonder waarde geldt de waarde van `vl-side-navigation-next`.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: sideNavigationSectionArgs.headingRootSelector },
        },
    },
    minLevel: {
        name: 'min-level',
        description:
            'Het laagste headingniveau (1 tot 6) voor een `auto`-sectie. Zonder waarde geldt de waarde van `vl-side-navigation-next`.',
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: 'undefined' },
        },
    },
    maxLevel: {
        name: 'max-level',
        description:
            'Het hoogste headingniveau (1 tot 6) voor een `auto`-sectie. Zonder waarde geldt de waarde van `vl-side-navigation-next`.',
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: 'undefined' },
        },
    },
    maxDepth: {
        name: 'max-depth',
        description:
            'Maximum diepte voor shadow DOM traversal bij het scannen van een `auto`-sectie. Zonder waarde geldt de waarde van `vl-side-navigation-next`.',
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: 'undefined' },
        },
    },
    excludeSelectors: {
        name: 'exclude-selectors',
        description:
            'Comma-separated CSS selectors van elementen die een `auto`-sectie overslaat bij het scannen. Zonder waarde geldt de waarde van `vl-side-navigation-next`.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: sideNavigationSectionArgs.excludeSelectors },
        },
    },
};
