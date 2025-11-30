import {
    CATEGORIES,
    CONTROLS,
    defaultArgs,
    defaultArgTypes,
    getSelectControlOptions,
    TYPES,
} from '@domg-wc/common-storybook';
import { action } from '@storybook/addon-actions';
import { ArgTypes } from '@storybook/web-components';
import { INFO_TILE_SIZE } from '../vl-info-tile.model';

export const infoTileArgs = {
    ...defaultArgs,
    autoOpen: false,
    center: false,
    clickable: false,
    clickableLabel: '',
    toggleable: false,
    contentSlot: '',
    subtitleSlot: '',
    titleSlot: '',
    menuSlot: '',
    size: '',
    onVlClickInfoTile: action('vl-click-info-tile'),
};

export const infoTileArgTypes: ArgTypes<typeof infoTileArgs> = {
    ...defaultArgTypes(),
    autoOpen: {
        name: 'data-vl-auto-open',
        description:
            'Opent de info-tile automatisch bij de eerste render.<br>Alleen bruikbaar indien data-vl-toggleable aanstaat.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: infoTileArgs.autoOpen },
        },
    },
    center: {
        name: 'data-vl-center',
        description: 'Centreert de tekst van de info-tile.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: infoTileArgs.center },
        },
    },
    clickable: {
        name: 'data-vl-clickable',
        description: 'Maakt de info-tile aanklikbaar. <br>Werkt niet in combinatie met `data-vl-toggleable`-attribuut',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: infoTileArgs.clickable },
        },
    },
    clickableLabel: {
        name: 'data-vl-clickable-label',
        description:
            'Stelt de aria-label in van de button die de info-tile aanklikbaar maakt. ' +
            '<br>Van belang voor WCAG wanneer het `data-vl-clickable`-attribuut aanstaat.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.STRING },
            defaultValue: { summary: infoTileArgs.clickableLabel },
        },
    },
    toggleable: {
        name: 'data-vl-toggleable',
        description: 'Maakt de info-tile openklapbaar.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: infoTileArgs.toggleable },
        },
    },
    contentSlot: {
        name: 'content',
        description: 'De content van de info-tile.',
        table: {
            category: CATEGORIES.SLOTS,
            type: { summary: TYPES.HTML },
            defaultValue: { summary: infoTileArgs.contentSlot },
        },
    },
    subtitleSlot: {
        name: 'subtitle',
        description: 'De subtitel van de info-tile.',
        table: {
            category: CATEGORIES.SLOTS,
            type: { summary: TYPES.HTML },
            defaultValue: { summary: infoTileArgs.subtitleSlot },
        },
    },
    titleSlot: {
        name: 'title',
        description: 'De titel van de info-tile.',
        table: {
            category: CATEGORIES.SLOTS,
            type: { summary: TYPES.HTML },
            defaultValue: { summary: infoTileArgs.titleSlot },
        },
    },
    menuSlot: {
        name: 'menu',
        description: 'Slotelement om menu item toe te voegen in rechterbovenhoek.',
        table: {
            category: CATEGORIES.SLOTS,
            type: { summary: TYPES.HTML },
            defaultValue: { summary: infoTileArgs.menuSlot },
        },
    },
    size: {
        name: 'data-vl-size',
        description:
            'Grootte van de info tile. Dit attribuut past de padding van het component aan. Standaard is dit "small". De andere opties zijn "medium" en "large".',
        control: { type: CONTROLS.SELECT },
        options: Object.values(INFO_TILE_SIZE),
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: getSelectControlOptions(Object.values(INFO_TILE_SIZE)) },
            defaultValue: { summary: infoTileArgs.size },
        },
    },
    onVlClickInfoTile: {
        name: 'vl-click-info-tile',
        description: 'Event dat afgevuurd wordt als er op de info-tile wordt geklikt.',
        table: {
            category: CATEGORIES.EVENTS,
        },
    },
};
