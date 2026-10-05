import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';

export const pageArgs = {
    ...defaultArgs,
    center: false,
    stretch: false,
};

export const pageArgTypes: ArgTypes = {
    ...defaultArgTypes,
    center: {
        name: 'v-center',
        description:
            'Centreert de main content verticaal in de ruimte tussen de header en de footer.<br>Heeft enkel effect als `vl-page` hoger is dan zijn inhoud, zie Hoogte in de documentatie.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: pageArgs.center },
        },
    },
    stretch: {
        name: 'v-stretch',
        description:
            'Laat de main content de volledige ruimte tussen de header en de footer innemen.<br>Heeft enkel effect als `vl-page` hoger is dan zijn inhoud, zie Hoogte in de documentatie.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: pageArgs.stretch },
        },
    },
    headerSlot: {
        name: 'header',
        description:
            'De header van de pagina, gewoonlijk een `vl-header-next`. Die rendert zijn header zelf vooraan in de `body`.',
        control: false,
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
        },
    },
    mainSlot: {
        name: 'main',
        description: 'De main content van de pagina. Komt in het `main` landmark terecht.',
        control: false,
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
        },
    },
    footerSlot: {
        name: 'footer',
        description:
            'De footer van de pagina, gewoonlijk een `vl-footer-next`. Die rendert zijn footer zelf achteraan in de `body`.',
        control: false,
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
        },
    },
};
