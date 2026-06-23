import { CATEGORIES, CONTROLS, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { titleDefaults } from '../vl-title.defaults';

export type TitleArgs = typeof defaultArgs & typeof titleDefaults & { defaultSlot: string };

export const titleArgs: TitleArgs = {
    ...defaultArgs,
    ...titleDefaults,
    defaultSlot: '',
};

export const titleArgTypes: ArgTypes<TitleArgs> = {
    ...defaultArgTypes,
    type: {
        name: 'type',
        description: 'Het type van de titel.',
        control: { type: CONTROLS.INLINE_RADIO },
        options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: titleArgs.type },
        },
    },
    underline: {
        name: 'underline',
        description: 'Voegt een subtiele lijn toe onder de titel.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(titleArgs.underline) },
        },
    },
    alt: {
        name: 'alt',
        description: 'Zet alle letters om in uppercase en zal altijd een lijn toevoegen onder de titel.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(titleArgs.alt) },
        },
    },
    noSpaceBottom: {
        name: 'no-space-bottom',
        description: 'Vermindert ruimte onder de titel.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(titleArgs.noSpaceBottom) },
        },
    },
    appearance: {
        name: 'appearance',
        description:
            'Bepaalt de visuele stijl van de titel, onafhankelijk van het semantische type. ' +
            'Handig voor het behouden van semantiek terwijl je een andere stijl wilt toepassen.',
        control: { type: CONTROLS.INLINE_RADIO },
        options: ['(none)', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: titleArgs.appearance || "''" },
        },
    },
    defaultSlot: {
        name: '[default]',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
        },
    },
};
