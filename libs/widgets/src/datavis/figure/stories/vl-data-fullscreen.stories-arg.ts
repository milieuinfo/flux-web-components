import { ArgTypes } from '@storybook/web-components-vite';
// de import is bewust op deze manier om voor de web-types.generator 'binnen' de monorepo geen side-effect te geven
import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { dataFullscreenDefaults } from '../vl-data-fullscreen.defaults';

export const dataFullscreenArgs = {
    ...defaultArgs,
    ...dataFullscreenDefaults,
};

export const dataFullscreenArgTypes: ArgTypes<typeof dataFullscreenArgs> = {
    ...defaultArgTypes,
    showLabel: {
        name: 'show-label',
        description: 'Toont de naam van de knop naast het icoon.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(dataFullscreenArgs.showLabel) },
        },
    },
};
