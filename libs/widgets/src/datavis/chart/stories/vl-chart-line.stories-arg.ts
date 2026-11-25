import { ArgTypes } from '@storybook/web-components-vite';
// de import is bewust op deze manier om voor de web-types.generator 'binnen' de monorepo geen side-effect te geven
import { CATEGORIES, defaultArgs, defaultArgTypes } from '@resources/utils-storybook';
import { action } from 'storybook/actions';
import type { ChartModel } from '../../models/chart.model';

export const chartLineArgs = {
    ...defaultArgs,
    data: undefined as ChartModel | undefined,
    onDataChange: action('vl-data-change'),
};

export const chartLineArgTypes: ArgTypes<typeof chartLineArgs> = {
    ...defaultArgTypes,
    data: {
        name: 'data',
        description:
            'De data die de grafiek toont. Een object met `meta` (de bronnen, de assen en de eenheid) en `series` (per reeks een naam en de x- en y-waarden).<br>Deze property kan je enkel via JavaScript instellen, niet als attribuut.',
        control: false,
        table: {
            type: { summary: 'ChartModel' },
            category: CATEGORIES.PROPERTIES,
        },
    },
    onDataChange: {
        name: 'vl-data-change',
        description:
            'Afgevuurd als de toestand van de grafiek verandert: bij het laden, bij nieuwe data, als er geen data is of bij een fout.',
        table: {
            type: { summary: "{ status: 'loading' | 'data' | 'partial' | 'empty' | 'error' }" },
            category: CATEGORIES.EVENTS,
        },
    },
};
