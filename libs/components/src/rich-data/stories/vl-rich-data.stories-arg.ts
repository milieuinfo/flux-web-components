import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@domg-wc/common-storybook';
import { ArgTypes } from '@storybook/web-components';

export const richDataArgs = {
    ...defaultArgs,
    filterClosable: false,
    filterClosed: false,
};

export const richDataArgTypes: ArgTypes<typeof richDataArgs> = {
    ...defaultArgTypes(),
    filterClosable: {
        name: 'data-vl-filter-closable',
        description:
            'Filter sluitbaar maken en knop tonen om de filter te tonen en terug te verbergen.\n * Op een klein scherm wordt een modal geopend bij het klikken op de filter knop ipv een de filter naast de tabel te tonen.\n\n * Om elementen van de filter te verbergen enkel in de modal, kan het attribuut `data-vl-hidden-in-modal` gezet worden.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: richDataArgs.filterClosable },
        },
    },
    filterClosed: {
        name: 'data-vl-filter-closed',
        description: 'Verbergt de filter',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: richDataArgs.filterClosed },
        },
    },
};
