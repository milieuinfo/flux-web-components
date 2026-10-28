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
import { INFO_TILE_SIZE, INFO_TILE_TYPE } from '../../../info-tile/vl-info-tile.model';
import { infoTileDefaults } from '../vl-info-tile.defaults';

export type InfoTileArgs = typeof infoTileDefaults &
    typeof defaultArgs & {
        triggerSlot: string;
        titleLabelSlot: string;
        subtitleSlot: string;
        badgeSlot: string;
        actionsSlot: string;
        contentSlot: string;
        footerSlot: string;
        onVlClickInfoTile: () => void;
        onVlToggle: (detail: unknown) => void;
        onVlOpen: () => void;
        onVlClose: () => void;
    };

export const infoTileArgs: InfoTileArgs = {
    ...defaultArgs,
    ...infoTileDefaults,
    triggerSlot: '',
    titleLabelSlot: '',
    subtitleSlot: '',
    badgeSlot: '',
    actionsSlot: '',
    contentSlot: '',
    footerSlot: '',
    onVlClickInfoTile: action('vl-click-info-tile'),
    onVlToggle: action('vl-toggle'),
    onVlOpen: action('vl-open'),
    onVlClose: action('vl-close'),
};

export const infoTileArgTypes: ArgTypes<InfoTileArgs> = {
    ...defaultArgTypes,
    open: {
        name: 'open',
        description:
            'Of een `toggleable` info tile open is. Zet de begintoestand en volgt daarna de huidige toestand, ook na een klik.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(infoTileArgs.open) },
        },
    },
    toggleable: {
        name: 'toggleable',
        description: 'Maakt de inhoud van de info tile open- en dichtklapbaar.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(infoTileArgs.toggleable) },
        },
    },
    clickable: {
        name: 'clickable',
        description: 'Maakt de hele info tile aanklikbaar.<br>Niet combineren met `toggleable`.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(infoTileArgs.clickable) },
        },
    },
    clickableLabel: {
        name: 'clickable-label',
        description: 'Toegankelijke naam van een `clickable` info tile. Verplicht samen met `clickable`.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: infoTileArgs.clickableLabel },
        },
    },
    center: {
        name: 'center',
        description: 'Centreert de inhoud van de info tile.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(infoTileArgs.center) },
        },
    },
    fullHeight: {
        name: 'full-height',
        description: 'Geeft de info tile een hoogte van 100%. Werkt enkel als de container een vaste hoogte heeft.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(infoTileArgs.fullHeight) },
        },
    },
    size: {
        name: 'size',
        description: 'De grootte van de padding.',
        control: { type: CONTROLS.SELECT },
        options: ['', ...Object.values(INFO_TILE_SIZE)],
        table: {
            type: { summary: getSelectControlOptions(Object.values(INFO_TILE_SIZE)) },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: infoTileArgs.size },
        },
    },
    type: {
        name: 'type',
        description: 'Het type van de info tile.',
        control: { type: CONTROLS.SELECT },
        options: ['', ...Object.values(INFO_TILE_TYPE)],
        table: {
            type: { summary: getSelectControlOptions(Object.values(INFO_TILE_TYPE)) },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: infoTileArgs.type },
        },
    },
    icon: {
        name: 'icon',
        description: 'Icoon naast de titel.<br>Niet combineren met de `badge` slot.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: infoTileArgs.icon },
        },
    },
    iconAsBadge: {
        name: 'icon-as-badge',
        description: 'Toont het icoon in een ronde badge.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(infoTileArgs.iconAsBadge) },
        },
    },
    headingLevel: {
        name: 'heading-level',
        description: 'Het niveau van de heading van de titel, 1 tot 6.<br>Zonder of met een ongeldige waarde: 3.',
        control: { type: CONTROLS.SELECT },
        options: ['', '1', '2', '3', '4', '5', '6'],
        table: {
            type: { summary: '1 | 2 | 3 | 4 | 5 | 6' },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: infoTileArgs.headingLevel },
        },
    },
    highlight: {
        name: 'highlight',
        description: 'Voegt een accent toe aan de bovenkant van de info tile.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(infoTileArgs.highlight) },
        },
    },
    highlightLeft: {
        name: 'highlight-left',
        description: 'Voegt een accent toe aan de linkerkant van de info tile.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(infoTileArgs.highlightLeft) },
        },
    },
    triggerSlot: {
        name: 'trigger',
        description: 'De titel van de info tile. Bij een `toggleable` info tile staat hij in de toggle-knop.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: infoTileArgs.triggerSlot },
        },
    },
    titleLabelSlot: {
        name: 'title-label',
        description: 'Label naast de titel, bijvoorbeeld een pill.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: infoTileArgs.titleLabelSlot },
        },
    },
    subtitleSlot: {
        name: 'subtitle',
        description:
            'De subtitel van de info tile.<br>Bij een `toggleable` info tile blijft de subtitel zichtbaar als de tile gesloten is.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: infoTileArgs.subtitleSlot },
        },
    },
    badgeSlot: {
        name: 'badge',
        description: 'Een eigen badge naast de titel.<br>Niet combineren met `icon`.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: infoTileArgs.badgeSlot },
        },
    },
    actionsSlot: {
        name: 'actions',
        description: 'Knoppen of links in de rechterbovenhoek, bijvoorbeeld een popover menu.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: infoTileArgs.actionsSlot },
        },
    },
    contentSlot: {
        name: 'content',
        description: 'De inhoud van de info tile. Bij een `toggleable` info tile klapt die open en dicht.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: infoTileArgs.contentSlot },
        },
    },
    footerSlot: {
        name: 'footer',
        description: 'De footer van de info tile, bijvoorbeeld voor actieknoppen.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: infoTileArgs.footerSlot },
        },
    },
    onVlClickInfoTile: {
        name: 'vl-click-info-tile',
        description: 'Afgevuurd bij een klik op een `clickable` info tile. Bubbelt.',
        table: {
            category: CATEGORIES.EVENTS,
        },
    },
    onVlToggle: {
        name: 'vl-toggle',
        description: 'Afgevuurd bij elke wijziging van de open-toestand van een `toggleable` info tile. Bubbelt.',
        table: {
            type: { summary: '{ expanded: boolean }' },
            category: CATEGORIES.EVENTS,
        },
    },
    onVlOpen: {
        name: 'vl-open',
        description: 'Afgevuurd wanneer een `toggleable` info tile opent. Bubbelt.',
        table: {
            category: CATEGORIES.EVENTS,
        },
    },
    onVlClose: {
        name: 'vl-close',
        description: 'Afgevuurd wanneer een `toggleable` info tile sluit. Bubbelt.',
        table: {
            category: CATEGORIES.EVENTS,
        },
    },
};
