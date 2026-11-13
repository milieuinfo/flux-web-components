import { CATEGORIES, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';

export const tabArgs = {
    href: '',
    disableLink: false,
    withinFunctionalHeader: false,
};

export const tabArgTypes: ArgTypes<typeof tabArgs> = {
    href: {
        name: 'href',
        description:
            'De URL van de tab-link. `vl-tabs` vult `<pagina-url>#<tab-id>` in. Wordt ook, met de suffix `-pane`, in `aria-controls` gezet.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: tabArgs.href },
        },
    },
    disableLink: {
        name: 'disable-link',
        description: 'Zet geen `href` op de link van de tab.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(tabArgs.disableLink) },
        },
    },
    withinFunctionalHeader: {
        name: 'within-functional-header',
        description:
            'Duidt aan dat de tab in een functional header staat. Wordt gezet door `vl-tabs` met `within-functional-header`.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(tabArgs.withinFunctionalHeader) },
        },
    },
};
