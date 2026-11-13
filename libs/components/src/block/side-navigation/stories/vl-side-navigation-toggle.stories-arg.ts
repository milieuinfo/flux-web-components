import { CATEGORIES, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';

export const sideNavigationToggleArgs = {
    href: '',
    child: '',
};

export const sideNavigationToggleArgTypes: ArgTypes<typeof sideNavigationToggleArgs> = {
    href: {
        name: 'href',
        description: 'Het anker (`#id`) van de sectie waar de toggle naartoe scrollt.',
        type: { name: TYPES.STRING, required: true },
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: sideNavigationToggleArgs.href },
        },
    },
    child: {
        name: 'child',
        description:
            'Koppelt de toggle aan de child links met dezelfde waarde in `parent`, bv. `content-1`. Bij het scrollen naar een child link klapt de toggle open.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: sideNavigationToggleArgs.child },
        },
    },
};
