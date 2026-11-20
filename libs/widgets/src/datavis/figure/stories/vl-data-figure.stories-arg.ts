import { ArgTypes } from '@storybook/web-components-vite';
// de import is bewust op deze manier om voor de web-types.generator 'binnen' de monorepo geen side-effect te geven
import { CATEGORIES, CONTROLS, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { dataFigureDefaults, HEADLINE_LEVELS } from '../vl-data-figure.defaults';

export const dataFigureArgs = {
    ...defaultArgs,
    ...dataFigureDefaults,
    controlsSlot: '',
    filtersSlot: '',
    defaultSlot: '',
    explanationsSlot: '',
};

export const dataFigureArgTypes: ArgTypes<typeof dataFigureArgs> = {
    ...defaultArgTypes,
    headline: {
        name: 'headline',
        description:
            'De kop van de figuur: wat de lezer in de grafiek moet zien.<br>Ook de bestandsnaam van de PNG en CSV, en de titel op de PNG.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: dataFigureDefaults.headline },
        },
    },
    headlineLevel: {
        name: 'headline-level',
        description: 'Het niveau van de kop in de pagina. Het uitzicht is altijd dat van een `h3`.',
        control: { type: CONTROLS.INLINE_RADIO },
        options: HEADLINE_LEVELS,
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: dataFigureDefaults.headlineLevel },
        },
    },
    subtitle: {
        name: 'subtitle',
        description: 'De ondertitel: wat, waar en wanneer, bv. "Jaargemiddelde, 2018-2024".',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: dataFigureDefaults.subtitle },
        },
    },
    controlsSlot: {
        name: 'controls',
        description: 'Extra controls naast de kop. Ze worden vóór de standaardknoppen getoond.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: dataFigureArgs.controlsSlot },
        },
    },
    filtersSlot: {
        name: 'filters',
        description:
            'De componenten die bepalen welke data de grafiek toont, bv. `vl-data-period`.<br>Ze worden onder de kop getoond.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: dataFigureArgs.filtersSlot },
        },
    },
    defaultSlot: {
        name: '[default]',
        description: 'De grafiek.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: dataFigureArgs.defaultSlot },
        },
    },
    explanationsSlot: {
        name: 'explanations',
        description:
            'De uitleg onder de grafiek, bv. `vl-data-reading-guide`, `vl-data-about` of een eigen `vl-data-table`.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: dataFigureArgs.explanationsSlot },
        },
    },
};
