import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';

export const richDataArgs = {
    ...defaultArgs,
    filterClosable: false,
    filterClosed: false,
    filterMaxWidth: '',
};

export const richDataArgTypes: ArgTypes<typeof richDataArgs> = {
    ...defaultArgTypes,
    filterClosable: {
        name: 'filter-closable',
        description:
            'Maakt de filter sluitbaar en toont een knop om de zichtbaarheid van de filter te togglen.\n * Op een klein scherm verschijnt de filter als modal ipv naast de inhoud.\n\n * Om in de "modal"-variant elementen van de filter te verbergen, kan het attribuut `hidden-in-modal` toegevoegd worden.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(richDataArgs.filterClosable) },
        },
    },
    filterClosed: {
        name: 'filter-closed',
        description: 'Verbergt de filter.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(richDataArgs.filterClosed) },
        },
    },
    filterMaxWidth: {
        name: 'filter-max-width',
        description: 'Maximum breedte (CSS value, bv. "300px") die de filter kan innemen in een full-width layout, op grote resolutie.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: richDataArgs.filterMaxWidth },
        }
    }
};
