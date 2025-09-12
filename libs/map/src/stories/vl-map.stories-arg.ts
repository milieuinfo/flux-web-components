import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@domg-wc/common-storybook';
import { action } from '@storybook/addon-actions';
import { ArgTypes } from '@storybook/web-components';
import { EVENT } from '../vl-map.model';

export const mapArgs = {
    ...defaultArgs,
    allowFullscreen: false,
    disableEscape: false,
    disableRotation: false,
    disableMousewheelZoom: false,
    disableKeyboard: false,
    fullHeight: false,
    noBorder: false,
    activeActionChange: action(EVENT.ACTIVE_ACTION_CHANGED),
    layerVisibleChange: action(EVENT.LAYER_VISIBLE_CHANGED),
    lambert2008: false,
};

export const mapArgTypes: ArgTypes<typeof mapArgs> = {
    ...defaultArgTypes(),
    allowFullscreen: {
        name: 'data-vl-allow-fullscreen',
        description:
            'Laat de map toe afgebeeld te worden in fullscreen.<br>Dit kan niet gebruikt worden op mobile.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapArgs.allowFullscreen },
        },
    },
    disableEscape: {
        name: 'data-vl-disable-escape-key',
        description: 'Schakelt de escape-key uit.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapArgs.disableEscape },
        },
    },
    disableRotation: {
        name: 'data-vl-disable-rotation',
        description: 'Schakelt het roteren van de map uit.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapArgs.disableRotation },
        },
    },
    disableMousewheelZoom: {
        name: 'data-vl-disable-mouse-wheel-zoom',
        description: 'Schakelt het zoomen van de map via het muiswiel uit.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapArgs.disableMousewheelZoom },
        },
    },
    disableKeyboard: {
        name: 'data-vl-disable-keyboard',
        description: 'Schakelt de keyboard input uit voor de map.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapArgs.disableKeyboard },
        },
    },
    fullHeight: {
        name: 'data-vl-full-height',
        description:
            'De map neemt de volledige beschikbare hoogte in van zijn parent.<br>Zie de docs pagina voor meer informatie over het gebruik van dit attribuut.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapArgs.fullHeight },
        },
    },
    lambert2008: {
        name: 'lambert2008',
        description:
            'Indien aanwezig wordt de kaart in het coördinatenstelsel Lambert 2008 weergegeven (EPSG:3812).<br>Indien niet aanwezig wordt de kaart in het coördinatenstelsel Lambert 72 weergegeven (EPSG:31370).<br>Dit attribuut is niet reactief. In de toekomst wordt Lambert 2008 de default.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapArgs.lambert2008 },
        },
    },
    noBorder: {
        name: 'data-vl-no-border',
        description: 'De border rond de map wordt niet afgebeeld.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapArgs.noBorder },
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
