import { CATEGORIES, CONTROLS, defaultArgs, defaultArgTypes, TYPES } from '@domg-wc/common-storybook';
import { ArgTypes } from '@storybook/web-components';
import { doormatDefaults } from '../vl-doormat.defaults';

export type DoormatArgs = typeof defaultArgs & typeof doormatDefaults & { titleSlot: string; textSlot: string };

export const doormatArgs: DoormatArgs = {
    ...defaultArgs,
    ...doormatDefaults,
    titleSlot: '',
    textSlot: '',
};

export const doormatArgTypes: ArgTypes<DoormatArgs> = {
    ...defaultArgTypes(true),
    href: {
        name: 'href',
        description: 'De url waar de link naar verwijst.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: doormatArgs.href },
        },
    },
    external: {
        name: 'external',
        description: 'Opent de link in een nieuw tabblad.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: doormatArgs.external },
        },
    },
    alt: {
        name: 'alt',
        description: 'Beeldt de doormat af in een alternatieve stijl.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: doormatArgs.alt },
        },
    },
    imageSrc: {
        name: 'image-src',
        description: 'De url van de afbeelding.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: doormatArgs.imageSrc },
        },
    },
    imageAlt: {
        name: 'image-alt',
        description: 'De alt tekst van de afbeelding.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: doormatArgs.imageAlt },
        },
    },
    imageWidth: {
        name: 'image-width',
        description:
            'Past de breedte van de afbeelding aan.<br/>De maximum toegelaten breedte is 150px.<br/>Niet van toepassing als `graphic` op `true` staat.',
        control: { type: CONTROLS.NUMBER },
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: doormatArgs.imageWidth },
        },
    },
    imageHeight: {
        name: 'image-height',
        description: 'Past de hoogte van de afbeelding aan.<br/>Niet van toepassing als `graphic` op `true` staat.',
        control: { type: CONTROLS.NUMBER },
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: doormatArgs.imageHeight },
        },
    },
    graphic: {
        name: 'graphic',
        description:
            'Beeldt de afbeelding af als een graphic.<br/>Zorg ervoor dat de afbeelding die je meegeeft de correcte afmetingen heeft.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: doormatArgs.graphic },
        },
    },
    titleSlot: {
        name: 'title',
        description: 'De titel van de doormat.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: doormatArgs.titleSlot },
        },
    },
    textSlot: {
        name: 'text',
        description: 'De tekst van de doormat.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: doormatArgs.textSlot },
        },
    },
};
