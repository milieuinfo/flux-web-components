import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { dashboardHeaderDefaults } from '../vl-dashboard-header.defaults';

export const dashboardHeaderArgs = {
    ...defaultArgs,
    ...dashboardHeaderDefaults,
    headerActionsSlot: '',
};

export const dashboardHeaderArgTypes: ArgTypes = {
    ...defaultArgTypes,
    pageIcon: {
        name: 'page-icon',
        description: 'Een icoon voor de `page-title`.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: dashboardHeaderDefaults.pageIcon },
        },
    },
    pageSubtitle: {
        name: 'page-subtitle',
        description: 'Een ondertitel van de pagina, naast de `page-title`.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: dashboardHeaderDefaults.pageSubtitle },
        },
    },
    pageTitle: {
        name: 'page-title',
        description:
            'De titel van de pagina, als `h1` met het vaste id `vl-dashboard-page-title`.<br>Is het doel van de skip links van `vl-dashboard` en `vl-header-next`.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: dashboardHeaderDefaults.pageTitle },
        },
    },
    headerActionsSlot: {
        name: 'header-actions',
        description: 'Acties bij de pagina, zoals knoppen en een zoekveld. Mag leeg blijven.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
        },
    },
};
