import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';

export const mapLayerSwitcherArgs = {
    ...defaultArgs,
    title: 'Kaartlagen',
    layers: null,
};

export const mapLayerSwitcherArgTypes: ArgTypes<typeof mapLayerSwitcherArgs> = {
    ...defaultArgTypes,
    title: {
        name: 'title',
        description: 'De titel bovenaan de layer-switcher.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapLayerSwitcherArgs.title },
        },
    },
    layers: {
        name: 'layers',
        description:
            'Kan gebruikt worden om een subselectie van kaartlagen te tonen.<br>Geef hier de name attributen van de kaartlagen mee.<br>Kaartlagen worden niet langer automatisch toegevoegd of verwijderd in de layer-switcher.',
        table: {
            type: { summary: `${TYPES.STRING}[]` },
            category: CATEGORIES.PROPERTIES,
            defaultValue: { summary: mapLayerSwitcherArgs.layers },
        },
    },
};
