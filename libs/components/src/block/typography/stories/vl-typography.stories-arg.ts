import { CATEGORIES, defaultArgs, defaultArgTypes } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';

export const typographyArgs = {
    ...defaultArgs,
    parameters: '{"key1": "tempus" , "key2": "ipsum" }',
    updateUrlHash: false,
};

export const typographyArgTypes: ArgTypes<typeof typographyArgs> = {
    ...defaultArgTypes,
    parameters: {
        name: 'parameters',
        description: 'De key/value parameters die verwerkt en getoond zullen worden in het content element.',
        control: {
            disable: true,
        },
        table: {
            type: { summary: 'string' },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
    updateUrlHash: {
        name: 'update-url-hash',
        description:
            'Werkt bij een klik op een same-page anchor de URL-hash bij via history.pushState. Default' +
            ' wordt de hash niet aangepast (kan botsen met bv. een SPA-router).',
        control: {
            disable: true,
        },
        table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: 'false' },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
};
