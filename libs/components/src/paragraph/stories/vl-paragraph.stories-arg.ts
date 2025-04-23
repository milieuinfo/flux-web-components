import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components';
import { paragraphDefaults } from '../vl-paragraph.defaults';

type ParagraphArgs = typeof defaultArgs & typeof paragraphDefaults & { defaultSlot: string };

export const paragraphArgs: ParagraphArgs = {
    ...defaultArgs,
    ...paragraphDefaults,
    defaultSlot: '',
};

export const paragraphArgTypes: ArgTypes<ParagraphArgs> = {
    ...defaultArgTypes,
    bold: {
        name: 'bold',
        description: 'Toont de paragraaf in het vet.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: paragraphDefaults.bold },
        },
    },
    introduction: {
        name: 'introduction',
        description: 'Toont de paragraaf in de introductie stijl.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: paragraphDefaults.introduction },
        },
    },
    defaultSlot: {
        name: '[default]',
        description: 'De inhoud van de paragraaf.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: paragraphArgs.defaultSlot },
        },
    },
};
