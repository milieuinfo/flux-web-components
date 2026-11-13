import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';

export const tabLinkNextArgs = {
    ...defaultArgs,
    href: '',
    external: false,
    selected: false,
};

export const tabLinkNextArgTypes: ArgTypes<typeof tabLinkNextArgs> = {
    ...defaultArgTypes,
    href: {
        name: 'href',
        description: 'De URL waar de tab link naartoe navigeert.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: tabLinkNextArgs.href },
        },
    },
    external: {
        name: 'external',
        description: 'Opent de link in een nieuw venster.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(tabLinkNextArgs.external) },
        },
    },
    selected: {
        name: 'selected',
        description: 'Duidt aan dat deze tab link de huidige pagina is.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(tabLinkNextArgs.selected) },
        },
    },
};
