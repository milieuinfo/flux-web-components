import { CATEGORIES, CONTROLS, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components';

export const mapBaselayerArgs = {
    ...defaultArgs,
    backgroundLayer: false,
    layer: '',
    title: '',
    type: '',
    url: '',
};

export const mapBaselayerArgTypes: ArgTypes<typeof mapBaselayerArgs> = {
    ...defaultArgTypes(),
    backgroundLayer: {
        name: 'data-vl-background-layer',
        description:
            'Geeft de gekozen base-layer een achtergrond-laag.<br>Dit zal kaartlagen tonen van het Nationaal Geografisch Instituut.<br>Voor meer info [zie hier](https://www.ngi.be/website/aanbod/digitale-geodata/cartoweb-be/).<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapBaselayerArgs.backgroundLayer },
        },
    },
    layer: {
        name: 'data-vl-layer',
        description: 'De identifier van de kaartlaag.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
    title: {
        name: 'data-vl-title',
        description: 'De titel van de kaartlaag.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
    type: {
        name: 'data-vl-type',
        description: 'Het type van de kaartlaag.<br>Dit attribuut is niet reactief.',
        control: { type: CONTROLS.SELECT },
        options: ['wmts', 'wfs'],
        table: {
            type: { summary: 'wmts | wfs' },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
    url: {
        name: 'data-vl-url',
        description: 'De URL die gebruikt wordt om de kaartlaag op te halen.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
};
