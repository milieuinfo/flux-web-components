import { ArgTypes } from '@storybook/web-components-vite';
// de import is bewust op deze manier om voor de web-types.generator 'binnen' de monorepo geen side-effect te geven
import { CATEGORIES, CONTROLS, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { chartReferenceDefaults } from '../vl-chart-reference.defaults';

export const chartReferenceArgs = {
    ...defaultArgs,
    ...chartReferenceDefaults,
};

export const chartReferenceArgTypes: ArgTypes<typeof chartReferenceArgs> = {
    ...defaultArgTypes,
    value: {
        name: 'value',
        description:
            'De waarde op de waarde-as, in de eenheid van de data, bv. `0.4` voor 0,4 µT.<br>' +
            'Zonder geldige waarde wordt er geen lijn getekend en verschijnt er een waarschuwing in de console.',
        control: { type: CONTROLS.NUMBER },
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: '' },
        },
    },
    label: {
        name: 'label',
        description:
            'Beschrijft wat de waarde betekent, bv. "Vlaamse streefwaarde".<br>Het label wordt linksboven de lijn getoond, samen met de waarde.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: chartReferenceArgs.label },
        },
    },
    inView: {
        name: 'in-view',
        description:
            'Verlengt de waarde-as tot de referentielijn zichtbaar is.<br>' +
            'Indien niet aanwezig en de lijn ligt buiten de data, wordt ze als notitie boven de grafiek getoond, bv. "↑ EU-referentieniveau: 100 µT".',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(chartReferenceArgs.inView) },
        },
    },
};
