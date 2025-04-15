import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@domg-wc/common-storybook';
import { ArgTypes } from '@storybook/web-components';
import { propertiesDefaults } from '../vl-properties.defaults';

type PropertiesArgs = typeof defaultArgs & typeof propertiesDefaults;

export const propertiesArgs: PropertiesArgs = {
    ...defaultArgs,
    ...propertiesDefaults,
};

export const propertiesArgTypes: ArgTypes<PropertiesArgs> = {
    ...defaultArgTypes(true),
    labelWidth: {
        name: 'label-width',
        description: "De breedte van de labels, in %. Heeft geen impact als de properties 'collapsed' worden.",
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: propertiesArgs.labelWidth },
        },
    },
    props: {
        name: 'props',
        description: 'De props in JSON formaat.',
        table: {
            type: { summary: TYPES.ARRAY },
            category: CATEGORIES.PROPERTIES,
            defaultValue: { summary: propertiesArgs.props },
        },
    },
};
