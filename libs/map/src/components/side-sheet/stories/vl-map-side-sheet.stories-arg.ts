import {
    CATEGORIES,
    CONTROLS,
    defaultArgs,
    defaultArgTypes,
    getSelectControlOptions,
    TYPES,
} from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components';

export const mapSideSheetArgs = {
    ...defaultArgs,
    customIcon: '',
    enableSwipe: false,
    hideToggleButton: false,
    open: false,
    iconPlacement: 'before',
    right: false,
    toggleText: '',
    tooltipText: '',
    defaultSlot: '',
};

export const mapSideSheetArgTypes: ArgTypes<typeof mapSideSheetArgs> = {
    ...defaultArgTypes,
    customIcon: {
        name: 'custom-icon',
        description: 'Het icoon van de toggle button.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapSideSheetArgs.customIcon },
        },
    },
    enableSwipe: {
        name: 'enable-swipe',
        description: 'Het zijpaneel kan gesloten worden door te swipen.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapSideSheetArgs.enableSwipe },
        },
    },
    hideToggleButton: {
        name: 'hide-toggle-button',
        description: 'Verbergt de toggle button.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapSideSheetArgs.hideToggleButton },
        },
    },
    iconPlacement: {
        name: 'icon-placement',
        description: 'De positie van het icoon van de toggle button.<br>Dit attribuut is niet reactief.',
        control: { type: CONTROLS.SELECT },
        options: ['before', 'after'],
        table: {
            type: { summary: getSelectControlOptions(['before', 'after']) },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapSideSheetArgs.iconPlacement },
        },
    },
    open: {
        name: 'open',
        description: 'Duidt aan dat het zijpaneel open is.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapSideSheetArgs.open },
        },
    },
    right: {
        name: 'right',
        description: 'Positioneert het zijpaneel aan de rechterrand.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapSideSheetArgs.right },
        },
    },
    toggleText: {
        name: 'toggle-text',
        description: 'De tekst van de toggle button.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapSideSheetArgs.toggleText },
        },
    },
    tooltipText: {
        name: 'tooltip-text',
        description: 'De tooltip van de toggle button.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapSideSheetArgs.tooltipText },
        },
    },
    defaultSlot: {
        name: '[default]',
        description: 'Element dat afgebeeld wordt in het zijpaneel.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
        },
    },
};
