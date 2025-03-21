import { TYPES } from '@domg-wc/common-storybook';
import { ArgTypes } from '@storybook/web-components';

export const vlContentBlockArgs = {
    contentBlock: true,
};

export const vlContentBlockArgTypes: ArgTypes<typeof vlContentBlockArgs> = {
    contentBlock: {
        name: 'vl-content-block-next',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: 'block style',
            defaultValue: { summary: false },
        },
        description: 'Verplichte root style.',
    },
};
