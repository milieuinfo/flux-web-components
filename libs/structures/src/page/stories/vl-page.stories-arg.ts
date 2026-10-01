import { CATEGORIES, defaultArgs, defaultArgTypes } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';

export const pageArgs = {
    ...defaultArgs,
    center: false,
    stretch: false,
};

export const pageArgTypes: ArgTypes<typeof pageArgs> = {
    ...defaultArgTypes,
    center: {
        name: 'v-center',
        description: 'Attribuut wordt gebruikt om ervoor te zorgen dat de content verticaal gecentreerd wordt.',
        table: {
            type: { summary: 'boolean' },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: 'false' },
        },
    },
    stretch: {
        name: 'v-stretch',
        description: 'Attribuut wordt gebruikt om ervoor te zorgen dat de content 100% zal innemen.',
        table: {
            type: { summary: 'boolean' },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: 'false' },
        },
    },
};
