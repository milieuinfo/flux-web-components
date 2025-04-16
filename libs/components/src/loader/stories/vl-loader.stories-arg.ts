import { defaultArgs, defaultArgTypes } from '@resources/utils-storybook';

export const loaderArgs = {
    ...defaultArgs,
    light: false,
    text: 'Pagina is aan het laden',
    single: false,
};

export const loaderArgTypes = {
    ...defaultArgTypes(),
    light: {
        name: 'data-vl-light',
        description: 'Attribute is used to obtain an alternative rendering in combination with a dark background. ',
        table: {
            type: { summary: 'boolean' },
            category: 'Attributes',
            defaultValue: { summary: 'false' },
        },
    },
    text: {
        name: 'data-vl-text',
        description: 'Attribute is used to display an informative text during loading. ',
        table: {
            type: { summary: 'string' },
            category: 'Attributes',
            defaultValue: { summary: '' },
        },
    },
    single: {
        name: 'data-vl-single',
        description: 'Attribute is used to indicate that no text should be displayed. ',
        table: {
            type: { summary: 'boolean' },
            category: 'Attributes',
            defaultValue: { summary: 'false' },
        },
    },
};
