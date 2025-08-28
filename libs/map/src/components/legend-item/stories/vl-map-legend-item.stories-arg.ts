import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';

export const mapLegendItemArgs = {
    ...defaultArgs,
    layer: '',
    iconText: '',
    iconSlot: '',
    labelSlot: '',
};

export const mapLegendItemArgTypes: ArgTypes<typeof mapLegendItemArgs> = {
    ...defaultArgTypes,
    layer: {
        name: 'layer',
        description:
            'Laagnaam van de laag waarvoor het custom lengende item van toepassing is.<br>Indien geen icon en label slot toegevoegd is zal het default icon en label van deze laag gebruikt worden.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapLegendItemArgs.layer },
        },
    },
    iconText: {
        name: 'icon-text',
        description:
            'Text die in het icon wordt toegevoegd. Niet van toepassing bij het custom toevoegen van icon en label via de slots.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapLegendItemArgs.layer },
        },
    },
    iconSlot: {
        name: 'icon',
        description: 'Element dat als icon van het legend item getoond wordt.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: mapLegendItemArgs.iconSlot },
        },
    },
    labelSlot: {
        name: 'label',
        description: 'Element dat als label van het legend item getoond wordt.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: mapLegendItemArgs.labelSlot },
        },
    },
};
