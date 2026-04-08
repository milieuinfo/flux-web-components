import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { propertiesDefaults } from '../vl-properties.defaults';

type PropertiesArgs = typeof defaultArgs & typeof propertiesDefaults;

export const propertiesArgs: PropertiesArgs = {
    ...defaultArgs,
    ...propertiesDefaults,
};

export const propertiesArgTypes: ArgTypes<PropertiesArgs> = {
    ...defaultArgTypes,
    labelWidth: {
        name: 'label-width',
        description: "De breedte van de labels, in %. Heeft geen impact als de properties 'collapsed' worden.",
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(propertiesArgs.labelWidth) },
        },
    },
    noClone: {
        name: 'no-clone',
        description:
            'Default wordt de inhoud van label en data ge-cloned: van de Light DOM naar de shadow DOM,' +
            ' met no-clone actief wordt de inhoud verplaatst.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(propertiesArgs.noClone) },
        },
    },
    props: {
        name: 'props',
        description: 'De props in JSON formaat.',
        table: {
            type: { summary: TYPES.ARRAY },
            category: CATEGORIES.PROPERTIES,
            defaultValue: { summary: String(propertiesArgs.props) },
        },
    },
    noPaddingBottom: {
        name: 'no-padding-bottom',
        description:
            'Haalt de witruimte onder het laatste item weg. Gebruik dit indien er via stacking al witruimte' +
            ' aanwezig is.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(propertiesArgs.noPaddingBottom) },
        },
    },
};
