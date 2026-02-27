import { CATEGORIES, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { richDataArgs, richDataArgTypes } from '../../rich-data/stories/vl-rich-data.stories-arg';

export const richDataTableArgs = {
    ...richDataArgs,
    collapsedM: false,
    collapsedS: false,
    collapsedXS: false,
    zebra: false,
    fluxZebra: false,
    multiSort: false,
    label: '',
    caption: '',
};

export const richDataTableArgTypes: ArgTypes<typeof richDataTableArgs> = {
    ...richDataArgTypes,
    collapsedM: {
        name: 'collapsed-m',
        description: 'Vanaf medium schermgrootte, cellen per rij onder elkaar ipv naast elkaar',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: String(richDataTableArgs.collapsedM) },
        },
    },
    collapsedS: {
        name: 'collapsed-s',
        description: 'Vanaf een small schermgrootte, cellen per rij onder elkaar ipv naast elkaar',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: String(richDataTableArgs.collapsedS) },
        },
    },
    collapsedXS: {
        name: 'collapsed-xs',
        description: 'Vanaf een extra small schermgrootte, cellen per rij onder elkaar ipv naast elkaar',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: String(richDataTableArgs.collapsedXS) },
        },
    },
    zebra: {
        name: 'zebra',
        description:
            'Variant waarin de rijen afwisselend een andere achtergrondkleur krijgen. Dit maakt de tabel makkelijker ' +
            'leesbaar. Deze zebra werkt niet voor tabellen met detail rijen, gebruik hiervoor flux-zebra.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: String(richDataTableArgs.zebra) },
        },
    },
    fluxZebra: {
        name: 'flux-zebra',
        description:
            'Variant waarin de rijen afwisselend een andere achtergrondkleur krijgen. Dit maakt de tabel makkelijker' +
            ' leesbaar. Deze zebra werkt voor tabellen met en zonder detail rijen.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: String(richDataTableArgs.fluxZebra) },
        },
    },
    multiSort: {
        name: 'multi-sort',
        description: 'Maakt het mogelijk om op meerdere kolommen te sorteren.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: String(richDataTableArgs.multiSort) },
        },
    },
    label: {
        name: 'label',
        description:
            'Wordt gebruikt als aria-label voor de tabel. Optioneel indien er een caption gedefinieerd is.' +
            ' Voor screenreaders heeft label voorrang op caption als beide aanwezig zijn,' +
            ' maar het is aanbevolen om caption te gebruiken als er een zichtbare titel voor de tabel gewenst is.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.STRING },
            defaultValue: { summary: richDataTableArgs.label },
        },
    },
    caption: {
        name: 'caption',
        description: 'Caption van de tabel. Optioneel indien er een label gedefinieerd is.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.STRING },
            defaultValue: { summary: '' },
        },
    },
};
