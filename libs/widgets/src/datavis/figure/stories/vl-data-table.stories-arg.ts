import { ArgTypes } from '@storybook/web-components-vite';
// de import is bewust op deze manier om voor de web-types.generator 'binnen' de monorepo geen side-effect te geven
import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { dataTableDefaults } from '../vl-data-table.defaults';

export const dataTableArgs = {
    ...defaultArgs,
    ...dataTableDefaults,
};

export const dataTableArgTypes: ArgTypes<typeof dataTableArgs> = {
    ...defaultArgTypes,
    rowsPerPage: {
        name: 'rows-per-page',
        description: 'Het aantal rijen per pagina. Heeft de tabel meer rijen, dan verschijnt er een pager onder.',
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(dataTableDefaults.rowsPerPage) },
        },
    },
};
