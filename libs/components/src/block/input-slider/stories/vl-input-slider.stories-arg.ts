import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { action } from 'storybook/actions';

export const inputSliderArgs = {
    ...defaultArgs,
    maxValue: 100,
    minValue: 0,
    value: 0,
    onChangeValue: action('vl-change-value'),
};

export const inputSliderArgTypes: ArgTypes<typeof inputSliderArgs> = {
    ...defaultArgTypes,
    maxValue: {
        name: 'max-value',
        description: 'De maximumwaarde die geselecteerd kan worden.',
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(inputSliderArgs.maxValue) },
        },
    },
    minValue: {
        name: 'min-value',
        description: 'De minimumwaarde die geselecteerd kan worden.',
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(inputSliderArgs.minValue) },
        },
    },
    value: {
        name: 'value',
        description:
            'De waarde van de input. Wordt gecorrigeerd indien deze zich onder de minValue of boven de maxValue begeeft.',
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(inputSliderArgs.value) },
        },
    },
    onChangeValue: {
        name: 'vl-change-value',
        description: 'Afgevuurd na het aanpasssen van de waarde.<br>Het event bevat de huidige waarde.',
        table: {
            type: { summary: '{ value: number }' },
            category: CATEGORIES.EVENTS,
        },
    },
};
