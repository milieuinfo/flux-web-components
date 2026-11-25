import { ArgTypes } from '@storybook/web-components-vite';
// de import is bewust op deze manier om voor de web-types.generator 'binnen' de monorepo geen side-effect te geven
import {
    CATEGORIES,
    CONTROLS,
    defaultArgs,
    defaultArgTypes,
    getSelectControlOptions,
    TYPES,
} from '@resources/utils-storybook';
import { PERIOD_DURATIONS } from '../period';
import { dataSourceDefaults } from '../vl-data-source.defaults';

const SOURCE_FORMATS = ['sample-data', 'sensorthings'] as const;

export const dataSourceArgs = {
    ...defaultArgs,
    ...dataSourceDefaults,
};

export const dataSourceArgTypes: ArgTypes<typeof dataSourceArgs> = {
    ...defaultArgTypes,
    src: {
        name: 'src',
        description: 'De URL waar de data opgehaald wordt.<br>Bij `sensorthings` is dit een meetpunt of een meetreeks.',
        table: {
            type: { summary: TYPES.URL },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: dataSourceArgs.src },
        },
    },
    period: {
        name: 'period',
        description: 'De periode die standaard getoond wordt bij het laden van de pagina.',
        control: { type: CONTROLS.SELECT },
        options: [...PERIOD_DURATIONS],
        table: {
            type: { summary: getSelectControlOptions([...PERIOD_DURATIONS]) },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: dataSourceArgs.period },
        },
    },
    end: {
        name: 'end',
        description: 'De laatste dag van de getoonde periode, bv. "2026-08-28".<br>Standaard is dit vandaag.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: dataSourceArgs.end },
        },
    },
    format: {
        name: 'format',
        description: 'Het formaat van de data.<br>Zie de docs pagina voor meer informatie over de formaten.',
        control: { type: CONTROLS.SELECT },
        options: [...SOURCE_FORMATS],
        table: {
            type: { summary: getSelectControlOptions([...SOURCE_FORMATS]) },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: dataSourceArgs.format },
        },
    },
};
