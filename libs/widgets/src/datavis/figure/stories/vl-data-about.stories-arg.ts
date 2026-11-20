import { ArgTypes } from '@storybook/web-components-vite';
// de import is bewust op deze manier om voor de web-types.generator 'binnen' de monorepo geen side-effect te geven
import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';

export const dataAboutArgs = {
    ...defaultArgs,
    defaultSlot: '',
};

export const dataAboutArgTypes: ArgTypes<typeof dataAboutArgs> = {
    ...defaultArgTypes,
    defaultSlot: {
        name: '[default]',
        description: 'Eigen uitleg over de data, bv. hoe of waar er gemeten werd.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: dataAboutArgs.defaultSlot },
        },
    },
};
