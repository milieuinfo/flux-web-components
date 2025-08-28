import { CATEGORIES, CONTROLS, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { action } from 'storybook/actions';
import { ArgTypes } from '@storybook/web-components-vite';

export const wizardArgs = {
    ...defaultArgs,
    activeStep: 0,
    hideLabels: false,
    numeric: false,
    title: '',
    header: '',
    onClickStep: action('vl-click-step'),
};

export const wizardArgTypes: ArgTypes<typeof wizardArgs> = {
    ...defaultArgTypes,
    activeStep: {
        name: 'active-step',
        description: 'Zet de actieve stap.',
        control: { type: CONTROLS.RANGE, min: 1, max: 2, step: 1 },
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(wizardArgs.activeStep) },
        },
    },
    hideLabels: {
        name: 'hide-labels',
        description: 'Bepaalt of de labels van de stappen verborgen moeten worden.',
        control: { type: CONTROLS.BOOLEAN },
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(wizardArgs.hideLabels) },
        },
    },
    numeric: {
        name: 'numeric',
        description: 'Voorziet numerieke indicatoren bij de stappen.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(wizardArgs.numeric) },
        },
    },
    title: {
        description: 'Slot voor de titel.',
        table: {
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: wizardArgs.title },
        },
    },
    header: {
        description: 'Slot voor de header.',
        table: {
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: wizardArgs.header },
        },
    },
    onClickStep: {
        name: 'vl-click-step',
        description:
            'Afgevuurd wanneer er op een stap geklikt wordt. In het event wordt het nummer en de naam vermeld.',
        table: {
            category: CATEGORIES.EVENTS,
            defaultValue: { summary: String(wizardArgs.onClickStep()) },
        },
    },
};
