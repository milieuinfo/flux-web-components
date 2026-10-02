import {
    CATEGORIES,
    CONTROLS,
    defaultArgs,
    defaultArgTypes,
    getSelectControlOptions,
    TYPES,
} from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { action } from 'storybook/actions';
import { EVENT, SCALE_POSITION } from '../vl-map.model';

export const mapArgs = {
    ...defaultArgs,
    allowFullscreen: false,
    allowInvalidGeometry: false,
    disableEscape: false,
    disableKeyboard: false,
    disableMousewheelZoom: false,
    disableRotation: false,
    hideScale: false,
    fullHeight: false,
    lambert2008: false,
    noBorder: false,
    scalePosition: SCALE_POSITION.BOTTOM_LEFT,
    activeActionChange: action(EVENT.ACTIVE_ACTION_CHANGED),
    layerVisibleChange: action(EVENT.LAYER_VISIBLE_CHANGED),
};

export const mapArgTypes: ArgTypes<typeof mapArgs> = {
    ...defaultArgTypes,
    allowFullscreen: {
        name: 'allow-fullscreen',
        description:
            'Laat de map toe afgebeeld te worden in fullscreen.<br>Dit kan niet gebruikt worden op mobile.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(mapArgs.allowFullscreen) },
        },
    },
    allowInvalidGeometry: {
        name: 'allow-invalid-geometry',
        description:
            'Standaard worden ongeldige geometrieën gemarkeerd met een rode "invalid" stijl. Je kan dit attribuut gebruiken om dit gedrag uit te zetten.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(mapArgs.allowInvalidGeometry) },
        },
    },
    disableEscape: {
        name: 'disable-escape-key',
        description: 'Schakelt de escape-key uit.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(mapArgs.disableEscape) },
        },
    },
    disableRotation: {
        name: 'disable-rotation',
        description: 'Schakelt het roteren van de map uit.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(mapArgs.disableRotation) },
        },
    },
    disableMousewheelZoom: {
        name: 'disable-mouse-wheel-zoom',
        description: 'Schakelt het zoomen van de map via het muiswiel uit.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(mapArgs.disableMousewheelZoom) },
        },
    },
    disableKeyboard: {
        name: 'disable-keyboard',
        description: 'Schakelt de keyboard input uit voor de map.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(mapArgs.disableKeyboard) },
        },
    },
    hideScale: {
        name: 'hide-scale',
        description:
            'Verbergt de schaal (ScaleLine) van de map.<br>Standaard toont de map een schaal linksonder.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(mapArgs.hideScale) },
        },
    },
    fullHeight: {
        name: 'full-height',
        description:
            'De map neemt de volledige beschikbare hoogte in van zijn parent.<br>Zie de docs pagina voor meer informatie over het gebruik van dit attribuut.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(mapArgs.fullHeight) },
        },
    },
    lambert2008: {
        name: 'lambert2008',
        description:
            'Indien aanwezig wordt de kaart in het coördinatenstelsel Lambert 2008 weergegeven (EPSG:3812).<br>Indien niet aanwezig wordt de kaart in het coördinatenstelsel Lambert 72 weergegeven (EPSG:31370).<br>Dit attribuut is niet reactief. In de toekomst wordt Lambert 2008 de default.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(mapArgs.lambert2008) },
        },
    },
    noBorder: {
        name: 'no-border',
        description: 'De border rond de map wordt niet afgebeeld.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(mapArgs.noBorder) },
        },
    },
    scalePosition: {
        name: 'scale-position',
        description: 'Bepaalt de hoek waarin de schaal (ScaleLine) op de map staat.<br>Dit attribuut is reactief.',
        control: { type: CONTROLS.SELECT },
        options: Object.values(SCALE_POSITION),
        table: {
            type: { summary: getSelectControlOptions(Object.values(SCALE_POSITION)) },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapArgs.scalePosition },
        },
    },
    activeActionChange: {
        name: EVENT.ACTIVE_ACTION_CHANGED,
        description: 'Afgevuurd als de actieve map-actie verandert.',
        table: {
            type: { summary: '{ previous?: VlMapAction, current?: VlMapAction }' },
            category: CATEGORIES.EVENTS,
        },
    },
    layerVisibleChange: {
        name: EVENT.LAYER_VISIBLE_CHANGED,
        description: 'Afgevuurd als de visible state van een map-layer verandert.',
        table: {
            type: { summary: '{ layer: VlMapLayer, visible: boolean }' },
            category: CATEGORIES.EVENTS,
        },
    },
};
