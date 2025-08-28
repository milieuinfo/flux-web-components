import { CATEGORIES, CONTROLS, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';

export const mapBaselayerArgs = {
    ...defaultArgs,
    backgroundLayer: false,
    backgroundOptions: '',
    backgroundType: '',
    layer: '',
    title: '',
    type: '',
    url: '',
};

export const mapBaselayerArgTypes: ArgTypes<typeof mapBaselayerArgs> = {
    ...defaultArgTypes,
    backgroundLayer: {
        name: 'background-layer',
        description:
            'Geeft de gekozen base-layer een achtergrond-laag.<br>Dit zal kaartlagen tonen van het Nationaal Geografisch Instituut.<br>Voor meer info [zie hier](https://www.ngi.be/website/aanbod/digitale-geodata/cartoweb-be/).<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(mapBaselayerArgs.backgroundLayer) },
        },
    },
    backgroundType: {
        name: 'background-type',
        description:
            'Met background-type en background-options kan je zelf een achtergrond-laag instellen.<br>Dit attribuut is niet reactief.',
        control: { type: CONTROLS.SELECT },
        options: ['xyz', 'wms', 'wmts', 'vector'],
        table: {
            type: { summary: 'xyz | wms | wmts | vector' },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
    backgroundOptions: {
        name: 'background-options',
        description:
            'Met background-type en background-options kan je zelf een achtergrond-laag instellen. Geef de background-options mee als JSON string.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapBaselayerArgs.backgroundOptions },
        },
    },
    layer: {
        name: 'layer',
        description: 'De identifier van de kaartlaag.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
    title: {
        name: 'title',
        description: 'De titel van de kaartlaag.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
    type: {
        name: 'type',
        description: 'Het type van de kaartlaag.<br>Dit attribuut is niet reactief.',
        control: { type: CONTROLS.SELECT },
        options: ['wmts', 'wfs'],
        table: {
            type: { summary: 'wmts | wfs' },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
    url: {
        name: 'url',
        description: 'De URL die gebruikt wordt om de kaartlaag op te halen.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
};
