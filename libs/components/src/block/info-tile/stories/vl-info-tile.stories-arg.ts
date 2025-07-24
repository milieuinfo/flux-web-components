import {
    CATEGORIES,
    CONTROLS,
    defaultArgs,
    defaultArgTypes,
    getSelectControlOptions,
    TYPES,
} from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components';
import { INFO_TILE_SIZE, INFO_TILE_TYPE } from '../vl-info-tile.model';

export const infoTileArgs = {
    ...defaultArgs,
    autoOpen: false,
    center: false,
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
};

export const infoTileArgTypes: ArgTypes<typeof infoTileArgs> = {
    ...defaultArgTypes,
    autoOpen: {
        name: 'auto-open',
        description:
            'Opent de info tile automatisch bij de eerste render.<br>Alleen bruikbaar indien toggleable aanstaat.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: infoTileArgs.autoOpen },
        },
    },
    center: {
        name: 'center',
        description: 'Centreert de tekst van de info tile.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: infoTileArgs.center },
        },
    },
    fullHeight: {
        name: 'full-height',
        description: 'Strekt de info tile verticaal uit om de volledige hoogte van de container te vullen.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: infoTileArgs.fullHeight },
        },
    },
    toggleable: {
        name: 'toggleable',
        description: 'Maakt de info tile openklapbaar.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: infoTileArgs.toggleable },
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
            defaultValue: { summary: infoTileArgs.iconAsBadge },
        },
    },
};
