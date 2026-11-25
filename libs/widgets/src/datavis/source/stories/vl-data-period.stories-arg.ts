import { ArgTypes } from '@storybook/web-components-vite';
// de import is bewust op deze manier om voor de web-types.generator 'binnen' de monorepo geen side-effect te geven
import { CATEGORIES, defaultArgs, defaultArgTypes } from '@resources/utils-storybook';
import { action } from 'storybook/actions';

export const dataPeriodArgs = {
    ...defaultArgs,
    onPeriodChange: action('vl-period-change'),
};

export const dataPeriodArgTypes: ArgTypes<typeof dataPeriodArgs> = {
    ...defaultArgTypes,
    onPeriodChange: {
        name: 'vl-period-change',
        description:
            'Afgevuurd als de gebruiker een andere periode kiest. De `data-source` haalt dan de nieuwe data op.<br>' +
            'Je kan ook zelf naar dit event luisteren, bv. om de periode in de URL te bewaren.',
        table: {
            type: { summary: "{ duration: '24h' | '7d' | '30d' | '1y', end: Date }" },
            category: CATEGORIES.EVENTS,
        },
    },
};
