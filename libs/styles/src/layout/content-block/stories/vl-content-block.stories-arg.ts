import { TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components';

export const vlContentBlockArgs = {
    contentBlock: true,
};

export const vlContentBlockArgTypes: ArgTypes<typeof vlContentBlockArgs> = {
    contentBlock: {
        name: 'vl-content-block',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: 'block style',
            defaultValue: { summary: false },
        },
        description: 'Verplichte root style.',
    },
};
