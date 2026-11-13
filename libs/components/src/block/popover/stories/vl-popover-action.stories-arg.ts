import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';

export const popoverActionArgs = {
    ...defaultArgs,
    action: '',
    href: '',
    icon: '',
    rel: '',
    selected: false,
    target: '',
};

export const popoverActionArgTypes: ArgTypes<typeof popoverActionArgs> = {
    ...defaultArgTypes,
    selected: {
        name: 'selected',
        description: 'Duidt aan dat de actie geselecteerd is.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(popoverActionArgs.selected) },
        },
    },
    action: {
        name: 'action',
        description:
            'Vrije waarde om de actie te herkennen, bv. in een click-handler. De component doet er zelf niets mee.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: popoverActionArgs.action },
        },
    },
    href: {
        name: 'href',
        description: 'Maakt van de actie een link naar deze URL. Zonder `href` is de actie een button.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: popoverActionArgs.href },
        },
    },
    icon: {
        name: 'icon',
        description: 'De naam van het icoon dat voor de tekst getoond wordt.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: popoverActionArgs.icon },
        },
    },
    rel: {
        name: 'rel',
        description: 'De `rel` van de link. Enkel van toepassing met `href`.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: popoverActionArgs.rel },
        },
    },
    target: {
        name: 'target',
        description: 'De `target` van de link, bv. `_blank`. Enkel van toepassing met `href`.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: popoverActionArgs.target },
        },
    },
};
