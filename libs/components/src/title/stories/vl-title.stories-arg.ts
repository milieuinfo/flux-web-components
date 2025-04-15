import { CATEGORIES, CONTROLS, defaultArgs, defaultArgTypes, TYPES } from '@domg-wc/common-storybook';
import { ArgTypes } from '@storybook/web-components';
import { titleDefaults } from '../vl-title.defaults';

export type TitleArgs = typeof defaultArgs & typeof titleDefaults & { defaultSlot: string };

export const titleArgs: TitleArgs = {
    ...defaultArgs,
    ...titleDefaults,
    defaultSlot: '',
};

export const titleArgTypes: ArgTypes<TitleArgs> = {
    ...defaultArgTypes(true),
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
            defaultValue: { summary: titleArgs.underline },
        },
    },
    alt: {
        name: 'alt',
        description: 'Zet alle letters om in uppercase en zal altijd een lijn toevoegen onder de titel.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: titleArgs.alt },
        },
    },
    noSpaceBottom: {
        name: 'no-space-bottom',
        description: 'Vermindert ruimte onder de titel.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: titleArgs.noSpaceBottom },
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
