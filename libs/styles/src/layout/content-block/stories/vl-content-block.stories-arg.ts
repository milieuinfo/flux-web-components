import { TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';

export const vlContentBlockArgs = {
    contentBlock: false,
    contentBlockFullWidth: false,
};

export const vlContentBlockArgTypes: ArgTypes<typeof vlContentBlockArgs> = {
    contentBlock: {
        name: 'vl-content-block',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: 'block style',
            defaultValue: { summary: String(false) },
        },
        description: 'Verplichte root style.',
    },
    contentBlockFullWidth: {
        name: 'vl-content-block--full-width',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: 'block style',
            defaultValue: { summary: String(false) },
        },
        description: 'Optionele style voor full width layout.',
    },
};
