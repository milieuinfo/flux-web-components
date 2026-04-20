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
import { INFO_TILE_SIZE, INFO_TILE_TYPE } from '../vl-info-tile.model';

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
    footerSlot: '',
    menuSlot: '',
    badgeSlot: '',
    size: '',
    icon: '',
    iconAsBadge: false,
    type: '',
    fullHeight: false,
    onVlClickInfoTile: action('vl-click-info-tile'),
    headingLevel: '',
    highlight: false,
    highlightLeft: false,
};

export const infoTileArgTypes: ArgTypes<typeof infoTileArgs> = {
    headingLevel: {
        name: 'heading-level',
        description:
            'Het heading-level van de titel (h1 t.e.m. h6).' +
            ' Indien niet opgegeven of ongeldig, wordt standaard h3 gebruikt.',
        control: { type: CONTROLS.SELECT },
        options: ['1', '2', '3', '4', '5', '6'],
        table: {
            type: { summary: '1 | 2 | 3 | 4 | 5 | 6' },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: '' },
        },
    },
    ...defaultArgTypes,
    autoOpen: {
        name: 'auto-open',
        description:
            'Opent de info tile automatisch bij de eerste render.<br>Alleen bruikbaar indien toggleable aanstaat.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: String(infoTileArgs.autoOpen) },
        },
    },
    center: {
        name: 'center',
        description: 'Centreert de tekst van de info tile.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: String(infoTileArgs.center) },
        },
    },
    fullHeight: {
        name: 'full-height',
        description: 'Strekt de info tile verticaal uit om de volledige hoogte van de container te vullen.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: String(infoTileArgs.fullHeight) },
        },
    },

    clickable: {
        name: 'clickable',
        description: 'Maakt de info-tile aanklikbaar. <br>Werkt niet in combinatie met `toggleable`-attribuut',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: String(infoTileArgs.clickable) },
        },
    },
    clickableLabel: {
        name: 'clickable-label',
        description:
            'Stelt de aria-label in van de button die de info-tile aanklikbaar maakt. ' +
            '<br>Van belang voor WCAG wanneer het `clickable`-attribuut aanstaat.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.STRING },
            defaultValue: { summary: infoTileArgs.clickableLabel },
        },
    },
    toggleable: {
        name: 'toggleable',
        description: 'Maakt de info tile openklapbaar.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: String(infoTileArgs.toggleable) },
        },
    },
    highlight: {
        name: 'highlight',
        description: 'Voegt een accent toe aan de bovenkant van de info tile.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: String(infoTileArgs.highlight) },
        },
    },
    highlightLeft: {
        name: 'highlight-left',
        description: 'Voegt een accent toe aan de linkerkant van de info tile.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: String(infoTileArgs.highlightLeft) },
        },
    },
    contentSlot: {
        name: 'content',
        description: 'De content van de info tile.',
        table: {
            category: CATEGORIES.SLOTS,
            type: { summary: TYPES.HTML },
            defaultValue: { summary: infoTileArgs.contentSlot },
        },
    },
    subtitleSlot: {
        name: 'subtitle',
        description: 'De subtitel van de info tile.',
        table: {
            category: CATEGORIES.SLOTS,
            type: { summary: TYPES.HTML },
            defaultValue: { summary: infoTileArgs.subtitleSlot },
        },
    },
    titleSlot: {
        name: 'title',
        description: 'De titel van de info tile.',
        table: {
            category: CATEGORIES.SLOTS,
            type: { summary: TYPES.HTML },
            defaultValue: { summary: infoTileArgs.titleSlot },
        },
    },
    footerSlot: {
        name: 'footer',
        description: 'De footer van de info tile. Dit is de plaats waar actieknoppen toegevoegd kunnen worden.',
        table: {
            category: CATEGORIES.SLOTS,
            type: { summary: TYPES.HTML },
            defaultValue: { summary: infoTileArgs.footerSlot },
        },
    },
    menuSlot: {
        name: 'menu',
        description: 'Slot-element om een popover menu toe te voegen in de rechterbovenhoek.',
        table: {
            category: CATEGORIES.SLOTS,
            type: { summary: TYPES.HTML },
            defaultValue: { summary: infoTileArgs.menuSlot },
        },
    },
    badgeSlot: {
        name: 'badge',
        description: 'Slot-element om een badge toe te voegen. Dit werkt niet in combinatie met het "icon" attribuut.',
        table: {
            category: CATEGORIES.SLOTS,
            type: { summary: TYPES.HTML },
            defaultValue: { summary: infoTileArgs.badgeSlot },
        },
    },
    size: {
        name: 'size',
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
    type: {
        name: 'type',
        description:
            'Type van de info tile. Dit bepaalt de stijl en het uiterlijk van de tile. Standaard is dit "default". De andere opties zijn "alt", "error", "success", en "warning".',
        control: { type: CONTROLS.SELECT },
        options: Object.values(INFO_TILE_TYPE),
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: getSelectControlOptions(Object.values(INFO_TILE_TYPE)) },
            defaultValue: { summary: infoTileArgs.type },
        },
    },
    icon: {
        name: 'icon',
        description: 'Beeldt een icoon af in de info tile. Dit werkt niet in combinatie met het "badge" slot.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.STRING },
            defaultValue: { summary: infoTileArgs.icon },
        },
    },
    iconAsBadge: {
        name: 'icon-as-badge',
        description:
            'Geeft aan het icoon de "badge" stijl. Het "icon" attribuut is in dit geval vereist. Dit werkt niet in combinatie met het "badge" slot.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: String(infoTileArgs.iconAsBadge) },
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
