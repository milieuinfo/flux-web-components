import { defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';

export const descriptionDataItemArgs = {
    ...defaultArgs,
    label: 'Uitgever',
    value: 'Kind en Gezin',
    labelSlotText: 'Uitgever',
    valueSlotText: 'Kind en Gezin',
};

export const descriptionDataItemArgTypes = {
    ...defaultArgTypes,
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
