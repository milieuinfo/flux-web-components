import { CATEGORIES, CONTROLS, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { action } from 'storybook/actions';

export const progressIndicatorArgs = {
    ...defaultArgs,
    activeStep: 0,
    showLabels: false,
    focusOnChange: false,
    numeric: false,
    steps: [''],
    onClickStep: action('vl-click-step'),
};

export const progressIndicatorArgTypes: ArgTypes<typeof progressIndicatorArgs> = {
    ...defaultArgTypes,
    activeStep: {
        name: 'active-step',
        description: 'Markeert een stap als de actieve.',
        control: { type: CONTROLS.RANGE, min: 1, max: 3, step: 1 },
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(progressIndicatorArgs.activeStep) },
        },
    },
    showLabels: {
        name: 'show-labels',
        description: 'Bepaalt of de labels van de stappen altijd zichtbaar zijn.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(progressIndicatorArgs.showLabels) },
        },
    },
    focusOnChange: {
        name: 'focus-on-change',
        description: 'Bepaalt of een stap de focus krijgt na een wijziging.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(progressIndicatorArgs.focusOnChange) },
        },
    },
    numeric: {
        name: 'numeric',
        description: 'Voorziet numerieke indicatoren bij de stappen.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(progressIndicatorArgs.numeric) },
        },
    },
    steps: {
        description: 'Lijst met omschrijvingen per stap.',
        control: { type: CONTROLS.OBJECT, required: true },
        table: {
            type: { summary: TYPES.ARRAY },
            category: CATEGORIES.PROPERTIES,
            defaultValue: { summary: String(progressIndicatorArgs.steps) },
        },
    },
    onClickStep: {
        name: 'vl-click-step',
        description:
            'Afgevuurd na het klikken op een stap.<br>Het event bevat de omschrijving en het nummer van de stap.',
        table: {
            type: { summary: '{ step: string, number: number }' },
            category: CATEGORIES.EVENTS,
        },
    },
};
