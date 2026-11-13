import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';

export const tabPanelNextArgs = {
    ...defaultArgs,
    hidden: true,
};

export const tabPanelNextArgTypes: ArgTypes<typeof tabPanelNextArgs> = {
    ...defaultArgTypes,
    hidden: {
        name: 'hidden',
        description:
            'Verbergt het panel. `vl-tabs-next` beheert dit attribuut: enkel het panel van de geselecteerde tab is zichtbaar.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(tabPanelNextArgs.hidden) },
        },
    },
};
