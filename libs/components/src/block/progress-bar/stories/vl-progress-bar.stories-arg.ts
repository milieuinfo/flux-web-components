import { CATEGORIES, CONTROLS, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { progressBarDefaults, ProgressBarDefaults } from '../vl-progress-bar.defaults';

export type ProgressBarArgs = typeof defaultArgs & ProgressBarDefaults;

export const progressBarDefaultArgs: ProgressBarArgs = {
    ...defaultArgs,
    ...progressBarDefaults,
};

export const progressBarArgTypes: ArgTypes<typeof progressBarDefaultArgs> = {
    ...defaultArgTypes,
    value: {
        name: 'value',
        description: 'De voortgang (0% - 100%).',
        control: { type: CONTROLS.RANGE, min: 0, max: 100, step: 1 },
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(progressBarDefaultArgs.value) },
        },
    },
    label: {
        name: 'label',
        description: 'Stelt het `aria-label` attribuut van de progress bar in.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: progressBarDefaultArgs.label },
        },
    },
    labelledby: {
        name: 'labelledby',
        description:
            'Stelt het `aria-labelledby` attribuut van de progress bar in. Dit moet de ID zijn van het HTML element dat dient als label voor de progress bar.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: progressBarDefaultArgs.labelledby },
        },
    },
    indeterminate: {
        name: 'indeterminate',
        description:
            'Bepaalt of de progress bar een "indeterminate" animatie zal tonen. Gebruik dit indien de voortgang niet exact bepaald kan worden.',
        control: { type: CONTROLS.BOOLEAN },
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(progressBarDefaultArgs.indeterminate) },
        },
    },
    error: {
        name: 'error',
        description: 'Past de "error" stijl toe.',
        control: { type: CONTROLS.BOOLEAN },
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(progressBarDefaultArgs.indeterminate) },
        },
    },
    success: {
        name: 'success',
        description: 'Past de "success" stijl toe.',
        control: { type: CONTROLS.BOOLEAN },
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(progressBarDefaultArgs.success) },
        },
    },
};
