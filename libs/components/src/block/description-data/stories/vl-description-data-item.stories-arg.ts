import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';

export const descriptionDataItemArgs = {
    ...defaultArgs,
    label: 'Uitgever',
    value: 'Kind en Gezin',
    labelSlotText: 'Uitgever',
    valueSlotText: 'Kind en Gezin',
    itemsSize: undefined,
    itemsMediumSize: undefined,
    itemsSmallSize: undefined,
    itemsExtraSmallSize: undefined,
};

export const descriptionDataItemArgTypes: ArgTypes<typeof descriptionDataItemArgs> = {
    ...defaultArgTypes,
    itemsSize: {
        name: 'items-size',
        type: { name: TYPES.NUMBER },
        description:
            'Kolombreedte van dit item op grote schermen. Overschrijft het `items-size` attribuut van de parent `vl-description-data`.',
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: undefined },
        },
    },
    itemsMediumSize: {
        name: 'items-medium-size',
        type: { name: TYPES.NUMBER },
        description:
            'Kolombreedte van dit item op middelgrote schermen. Overschrijft het `items-medium-size` attribuut van de parent `vl-description-data`.',
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: undefined },
        },
    },
    itemsSmallSize: {
        name: 'items-small-size',
        type: { name: TYPES.NUMBER },
        description:
            'Kolombreedte van dit item op kleine schermen. Overschrijft het `items-small-size` attribuut van de parent `vl-description-data`.',
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: undefined },
        },
    },
    itemsExtraSmallSize: {
        name: 'items-extra-small-size',
        type: { name: TYPES.NUMBER },
        description:
            'Kolombreedte van dit item op zeer kleine schermen. Overschrijft het `items-extra-small-size` attribuut van de parent `vl-description-data`.',
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: undefined },
        },
    },
    label: {
        name: 'label',
        description: 'Changes the label of the data item.',
        table: {
            type: { summary: TYPES.STRING },
            category: 'Attributes',
            defaultValue: { summary: '' },
        },
    },
    value: {
        name: 'value',
        description: 'Changes the value of the data item.',
        table: {
            type: { summary: TYPES.STRING },
            category: 'Attributes',
            defaultValue: { summary: '' },
        },
    },
    labelSlotText: {
        name: 'label',
        description: 'Changes the label of the data item.',
        table: {
            type: { summary: TYPES.STRING },
            category: 'Slots',
            defaultValue: { summary: '' },
        },
        control: {
            disable: true,
        },
    },
    valueSlotText: {
        name: 'value',
        description: 'Changes the value of the data item.',
        table: {
            type: { summary: TYPES.STRING },
            category: 'Slots',
            defaultValue: { summary: '' },
        },
        control: {
            disable: true,
        },
    },
};
