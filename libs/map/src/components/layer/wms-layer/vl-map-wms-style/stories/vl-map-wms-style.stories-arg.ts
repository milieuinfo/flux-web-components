import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components';

export const mapWmsStyleArgs = {
    ...defaultArgs,
    sld: '',
};

export const mapWmsStyleArgTypes: ArgTypes<typeof mapWmsStyleArgs> = {
    ...defaultArgTypes,
    sld: {
        name: 'sld',
        description:
            'Bepaalt de Styled Layer Descriptor body van een WMS kaartlaag.<br>Deze XML kan gebruikt worden om de WMS kaartlaag server side te stijlen.<br>Zie http://schemas.opengis.net/sld/1.1.0/StyledLayerDescriptor.xsd<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.XML },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapWmsStyleArgs.sld },
        },
    },
};
