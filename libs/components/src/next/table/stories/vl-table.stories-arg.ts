import { CATEGORIES, TYPES } from '@domg-wc/common-storybook';
import { ArgTypes } from '@storybook/web-components';
import { tableDefaults } from '../vl-table.defaults';

export const tableArgs = {
    ...tableDefaults,
};

export const tableArgTypes: ArgTypes<typeof tableArgs> = {
    hover: {
        name: 'hover',
        description:
            'Attribuut wordt gebruikt om een rij te highlighten wanneer de gebruiker erover hovert met muiscursor.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: tableArgs.hover },
        },
    },
    matrix: {
        name: 'matrix',
        description:
            'Attribuut wordt gebruikt om data in 2 dimensies te tonen. Zowel de rijen als de kolommen krijgen ' +
            'een titel. Deze titels worden gescheiden door een dikke lijn.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: tableArgs.matrix },
        },
    },
    grid: {
        name: 'grid',
        description: 'Variant met een lijn tussen elke rij en kolom.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: tableArgs.grid },
        },
    },
    zebra: {
        name: 'zebra',
        description:
            'Variant waarin de rijen afwisselend een andere achtergrondkleur krijgen. Dit maakt de tabel makkelijker ' +
            'leesbaar. Deze zebra werkt niet voor tabellen met detail rijen, gebruik hiervoor uig-zebra.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: tableArgs.zebra },
        },
    },
    uigZebra: {
        name: 'uig-zebra',
        description:
            'Variant waarin de rijen afwisselend een andere achtergrondkleur krijgen. Dit maakt de tabel makkelijker' +
            ' leesbaar. Deze zebra werkt voor tabellen met en zonder detail rijen.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: tableArgs.uigZebra },
        },
    },
    collapsedM: {
        name: 'collapsed-m',
        description:
            'Vanaf een medium schermgrootte zullen de cellen van elke rij onder elkaar ipv naast elkaar getoond worden.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: tableArgs.collapsedM },
        },
    },
    collapsedS: {
        name: 'collapsed-s',
        description:
            'Vanaf een small schermgrootte zullen de cellen van elke rij onder elkaar ipv naast elkaar getoond worden.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: tableArgs.collapsedS },
        },
    },
    collapsedXS: {
        name: 'collapsed-xs',
        description:
            'Vanaf een extra small schermgrootte zullen de cellen van elke rij onder elkaar ipv naast elkaar getoond ' +
            'worden.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: tableArgs.collapsedXS },
        },
    },
};
