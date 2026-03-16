import { ArgTypes } from '@storybook/web-components-vite';
import { CATEGORIES, CONTROLS, defaultArgs, defaultArgTypes, getSelectControlOptions, TYPES } from '@resources/utils-storybook';

export const sideSheetArgs = {
    ...defaultArgs,
    absolute: false,
    customIcon: '',
    enableSwipe: false,
    hideToggleButton: false,
    iconPlacement: 'before',
    left: false,
    right: false,
    open: false,
    top: '43px',
    toggleText: '',
    tooltipText: '',
    shadow: 'default',
};

export const sideSheetArgTypes: ArgTypes<typeof sideSheetArgs> = {
    ...defaultArgTypes,
    enableSwipe: {
        name: 'enable-swipe',
        description: 'Attribute wordt gebruikt om aan te duiden dat swipe functie toegelaten is.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(sideSheetArgs.enableSwipe) },
        },
    },
    left: {
        name: 'left',
        description: 'Attribute om de side-sheet aan de linkerrand te positioneren.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(sideSheetArgs.left) },
        },
    },
    right: {
        name: 'right',
        description: 'Attribute om de side-sheet aan de rechterrand te positioneren. Dit is de standaard instelling.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(sideSheetArgs.right) },
        },
    },
    absolute: {
        name: 'absolute',
        description: 'Attribute wordt gebruikt om aan te duiden dat de side-sheet absoluut gepositioneerd wordt.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(sideSheetArgs.absolute) },
        },
    },
    open: {
        name: 'open',
        description: 'Duidt aan dat de side-sheet open is.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(sideSheetArgs.open) },
        },
    },
    top: {
        name: 'top',
        description:
            'Attribute wordt gebruikt om de padding-top van de side-sheet aan te passen. Dit staat standaard' +
            ' op 43px ingesteld om de hoogte van de sticky vl-header te compenseren. Indien er extra sticky elementen' +
            ' op de pagina voorkomen, kan je deze waarde aanpassen.',
        table: {
            type: { summary: TYPES.STRING },
            defaultValue: { summary: sideSheetArgs.top },
        },
    },
    toggleText: {
        name: 'toggle-text',
        description: 'Attribute wordt gebruikt om de toggle knop tekst te wijzigen.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: sideSheetArgs.toggleText },
        },
    },
    tooltipText: {
        name: 'tooltip-text',
        description: 'Attribute wordt gebruikt om de native tooltip te bepalen.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: sideSheetArgs.tooltipText },
        },
    },
    customIcon: {
        name: 'custom-icon',
        description:
            'Dit vervangt zowel open & close icon door 1 custom icon. \n Standaard wordt afhankelijk van de positie' +
            ' van de side-sheet een pijltje getoond dat aanduidt of de side-sheet open of dicht is.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: sideSheetArgs.customIcon },
        },
    },
    iconPlacement: {
        name: 'icon-placement',
        description: 'Positie van icon bepalen. Standaard bevindt die zich voor de tekst.',
        control: { type: CONTROLS.SELECT },
        options: ['before', 'after'],
        table: {
            type: { summary: getSelectControlOptions(['before', 'after']) },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: sideSheetArgs.iconPlacement },
        },
    },
    hideToggleButton: {
        name: 'hide-toggle-button',
        description: 'Toggle knop verbergen.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(sideSheetArgs.hideToggleButton) },
        },
    },
    shadow: {
        name: 'shadow',
        description:
            'Schaduw van de side sheet. Gebruik "large" voor side sheets die een hoger contrast nodig hebben met de' +
            ' onderliggende pagina.',
        control: { type: CONTROLS.SELECT },
        options: ['default', 'large'],
        table: {
            type: { summary: getSelectControlOptions(['default', 'large']) },
            defaultValue: { summary: 'default' },
        },
    },
};
