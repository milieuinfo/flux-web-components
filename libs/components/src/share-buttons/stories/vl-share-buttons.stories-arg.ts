import { defaultArgs, defaultArgTypes } from '@resources/utils-storybook';

export const shareButtonsArgs = {
    ...defaultArgs,
    alt: false,
};

export const shareButtonsArgTypes = {
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
