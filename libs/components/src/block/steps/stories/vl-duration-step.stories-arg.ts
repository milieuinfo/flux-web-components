import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';

export const durationStepArgs = {
    ...defaultArgs,
    interactive: false,
    selected: false,
};

export const durationStepArgTypes: ArgTypes<typeof durationStepArgs> = {
    ...defaultArgTypes,
    interactive: {
        name: 'interactive',
        description:
            'Geeft de indicator van de duurstap de actiekleur. Enkel visueel: de component wordt er niet klikbaar of focusbaar door.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(durationStepArgs.interactive) },
        },
    },
    selected: {
        name: 'selected',
        description: 'Duidt de huidige duurstap aan en zet `aria-current="true"` op de component.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(durationStepArgs.selected) },
        },
    },
};
