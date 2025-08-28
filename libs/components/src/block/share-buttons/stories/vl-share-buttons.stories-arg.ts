import { defaultArgs, defaultArgTypes } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';

export const shareButtonsArgs = {
    ...defaultArgs,
    alt: false,
};

export const shareButtonsArgTypes: ArgTypes<typeof shareButtonsArgs> = {
    ...defaultArgTypes,
    alt: {
        name: 'alt',
        description: 'Removes the gray border top.',
        table: {
            category: 'Attributes',
            type: { summary: 'Boolean' },
            defaultValue: { summary: 'false' },
        },
    },
};
