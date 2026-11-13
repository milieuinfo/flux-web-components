import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';

export const tabNextArgs = {
    ...defaultArgs,
    panel: '',
    selected: false,
};

export const tabNextArgTypes: ArgTypes<typeof tabNextArgs> = {
    ...defaultArgTypes,
    panel: {
        name: 'panel',
        description: 'De id van de `vl-tab-panel-next` die bij deze tab hoort.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: tabNextArgs.panel },
        },
    },
    selected: {
        name: 'selected',
        description:
            'Duidt aan dat deze tab geselecteerd is. `vl-tabs-next` zet dit attribuut zelf bij een klik of bij navigatie met het toetsenbord.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(tabNextArgs.selected) },
        },
    },
};
