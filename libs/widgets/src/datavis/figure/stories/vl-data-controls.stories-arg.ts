import { ArgTypes } from '@storybook/web-components-vite';
// de import is bewust op deze manier om voor de web-types.generator 'binnen' de monorepo geen side-effect te geven
import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';

export const dataControlsArgs = {
    ...defaultArgs,
    defaultSlot: '',
};

export const dataControlsArgTypes: ArgTypes<typeof dataControlsArgs> = {
    ...defaultArgTypes,
    defaultSlot: {
        name: '[default]',
        description:
            'De knoppen, bv. `vl-data-download` en `vl-data-fullscreen`.<br>Ze worden getoond in de volgorde van de HTML.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: dataControlsArgs.defaultSlot },
        },
    },
};
