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
import type { DownloadFormat } from '../vl-data-download.component';
import { dataDownloadDefaults } from '../vl-data-download.defaults';

const FORMATS: DownloadFormat[] = ['png', 'csv'];

export const dataDownloadArgs = {
    ...defaultArgs,
    ...dataDownloadDefaults,
};

export const dataDownloadArgTypes: ArgTypes<typeof dataDownloadArgs> = {
    ...defaultArgTypes,
    format: {
        name: 'format',
        description:
            'Het formaat van het bestand.<br>`png`: de grafiek met de kop, de eenheid en de bron.<br>`csv`: de cijfers zonder afronding.',
        control: { type: CONTROLS.INLINE_RADIO },
        options: FORMATS,
        table: {
            type: { summary: getSelectControlOptions(FORMATS) },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: dataDownloadArgs.format },
        },
    },
    showLabel: {
        name: 'show-label',
        description: 'Toont de naam van de knop naast het icoon.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(dataDownloadArgs.showLabel) },
        },
    },
};
